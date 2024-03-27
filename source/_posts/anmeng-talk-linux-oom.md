---
title: 都市看客暗梦 の 浅谈曾经在 Linux 遇到的 OOM 机制
tags:
  - Linux
categories: 技术分享
abbrlink: d5bff76b
date: 2023-10-23 21:12:55
---

### First. 前言
Hi，各位旅行者们，你们好，I'm 暗梦，在个人博客的运行过程中，我们有时，或许会出现因为内存不足而造成 OOM 机制<sup> [OOM (Out Of Memory) Killer]</sup>，然而造成这种现象的主要原因嘛，还是来讲暗梦我以前 *(Tip: 大概是 2 年前博客还没有迁移到 Github 之前)* 在国内的云服务器遇到的：

  + 服务器所运行的 MySQL & PHP 占用内存过大，当然，暗梦我也遇到过这样的事儿，我记得当时发现的时候是在下午来着，当时博客打不开，于是折腾了几十分钟才解决问题。
  + 使用 [code-server](https://github.com/cdr/code-server) 在低配服务器进行运维时造成的占用内存过大 *(Tip: 毕竟习惯用 VS Code 写代码 & 博客文章啦，不过因为 node 会使用多个进程 & 内存空间，毕竟嘛，暗梦我也不喜欢用宝塔面板之类的 Linux 管理面板，好吧，但事实证明，依旧会如此，所以暗梦我通常都在 SSH 上面完成的运维。)*

### I. 解决 MySQL & PHP 占用内存过大的问题
首先是第一个问题，暗梦我还是选择修改一下变量 *( Tip: em...... ，暗梦我之前在国内的云服务器嘛 ，它的配置是 1核2G1M，不过各位旅行者们可以根据自己云服务器的配置作出修改，可以参考一下 [MySQL Memory Calculator](https://www.mysqlcalculator.com/) 。)* 来做一下简单的优化：

```ini
max_connections = 30 # 限制最大连接数
query_cache_size = 32M # 限制查询缓存大小，但在 MySQL8.0 却已被弃用。
innodb_buffer_pool_size=268435456 # 限制 InnoDB 缓冲池大小
innodb_log_buffer_size=16777216 # 限制 InnoDB 日志大小
```

Oray，接下来是解决 PHP 占用内存过大的问题，修改一下 `/etc/php-fpm.d/www.conf` 文件：

```ini
memory_limit=128M # 限制最大占用内存大小
```

最后改完之后重启下服务即可。

### II. 从零开始浅谈 Linux 内核 の OOM 机制
这件事儿非常简单，就以 MySQL 说个简单的例子吧：
> **暗梦：如果 MySQL 占用的内存过大，Linux 内核检测到物理内存 & 交换分区空间不足，且内存回收失败的情况下，会触发 OOM Killer 终止 MySQL，以此释放内存。**

em......
暗梦我还是来讲解一下 OOM Killer 实现的 out_of_memory 函数给旅行者们作为参考吧 *(Tip: 也就只是讲一个大概哈 ʕ̢̣·͡˔·ོ )* ：
> [root@DarkAce] ~ # `cat ~/linux_kernel/mm/oom_kill.c`
```c
...

bool out_of_memory(struct oom_control *oc)
{
	unsigned long freed = 0;
  	/* 检测是否为冻结的进程，如果是的话则不会触发。 */
	if (oom_killer_disabled)
		return false;

	if (!is_memcg_oom(oc)) {
		blocking_notifier_call_chain(&oom_notify_list, 0, &freed);
		if (freed > 0 && !is_sysrq_oom(oc))
			return true;
	}

   	/* 判断是否还有足够的内存以支撑其他应用程序使用 */
	if (task_will_free_mem(current)) {
		mark_oom_victim(current);
		queue_oom_reaper(current);
		return true;
	}

	if (!(oc->gfp_mask & __GFP_FS) && !is_memcg_oom(oc))
		return true;

   /*
   * 触发 check_panic_on_oom 函数以判断是选择触发 OOM Killer 还是 Kernel Panic，em......
   * 各位旅行者们可以参考 Linux 内核源代码的文件，暗梦我就不过多讲述了。 
   */
	oc->constraint = constrained_alloc(oc);
	if (oc->constraint != CONSTRAINT_MEMORY_POLICY)
		oc->nodemask = NULL;
	check_panic_on_oom(oc);

  	/* 根据进程的 oom_score_adj 评分触发 OOM Killer，后面暗梦我会讲解哒~ */
	if (!is_memcg_oom(oc) && sysctl_oom_kill_allocating_task &&
	    current->mm && !oom_unkillable_task(current) &&
	    oom_cpuset_eligible(current, oc) &&
	    current->signal->oom_score_adj != OOM_SCORE_ADJ_MIN) {
		get_task_struct(current);
		oc->chosen = current;
		oom_kill_process(oc, "Out of memory (oom_kill_allocating_task)");
		return true;
	}

    /*
    查找内存占用过大的程序
   */
	select_bad_process(oc);
  	/* 如果找不到内存占用过大的程序，且 out_of_memory 并非由 SysRQ 或者内存控制组 (memcg) 触发的嘛，此时内存也表示无可奈何，就会触发内核崩溃，即 Kernel Panic */
	if (!oc->chosen) {
		dump_header(oc, NULL);
		pr_warn("Out of memory and no killable processes...\n");
		if (!is_sysrq_oom(oc) && !is_memcg_oom(oc))
			panic("System is deadlocked on memory\n");
	}
  	/* em...... 好吧，找到了内存占用过大的程序呢，此时会调用 oom_kill_process 函数终止该程序 */
	if (oc->chosen && oc->chosen != (void *)-1UL)
		oom_kill_process(oc, !is_memcg_oom(oc) ? "Out of memory" :
				 "Memory cgroup out of memory");
	return !!oc->chosen;
}

...
```
> em......
> 暗梦: 至于其他的函数实现，各位旅行者可以参考一下 Linux 内核源代码中的 mm/oom_kill.c 文件哈，诶嘿~
一般来说，这个 OOM Killer 这种机制一般情况下在内核参数 `vm.overcommit_memory = 0` & `vm.panic_on_oom = 0` 是默认开启的，这两个内核函数嘛，都有以下三种情况：

{% notebox default "(I). vm.overcommit_memory" "fa fa-code" %}
<ul>
  <li> <code>vm.overcommit_memory = 0</code> (默认值，内核会检测物理内存 & 交换空间是否可供应用程序使用，当如果内存充足的情况下，内存申请成功，反之则申请失败，此时会进行内存回收，但若是内存回收失败，则会直接触发 OOM Killer 终止占用大的程序。)</li>
  <li> <code>vm.overcommit_memory = 1</code> (这种情况下和上述差不多，此时 OOM Killer 也会被触发，但是也有一部分却不会触发 OOM Killer，而是会触发系统重启。)</li>
  <li> <code>vm.overcommit_memory = 2</code> (在这种情况下会始终限制内存，大概的可用内存公式如下： <strong><code>[内存限制大小] = ( [物理内存大小] *  [/proc/sys/vm/overcmmit_ratio] / 100 )+ [交换分区大小]</code></strong> ，如果 mem_limit 已经使用完毕，则后续的内存申请也会失败，换句话说吧，就是没办法再运行新的程序了，但不会触发 OOM Killer ] )</li>
  <blockquote> Tip: 其中 `/proc/sys/vm/overcmmit_ratio` 这里面代表的是系数，默认值为 50，可以根据情况适当修改。</blockquote>
</ul>
{% endnotebox %}

{% notebox skyblue "(II). vm.panic_on_oom" "fa fa-code" %}
<ul>
  <li> <code>vm.panic_on_oom = 0</code> (默认值，通常在内存不足时，会触发 OOM Killer。)</li>
  <li> <code>vm.panic_on_oom = 1</code> (在这种情况下，内存不足时，多数会触发 Kernel Panic ，不过嘛，也有可能仍会触发 OOM Killer)</li>
  <li> <code>vm.panic_on_oom = 2</code> (在这种情况下，若内存不足，则直接触发 Kernel Panic)</li>
</ul>
{% endnotebox %}

### III. OOM 机制如何选择 & 终止内存占用高的程序
这个嘛，也就犹如划分好的一个排行榜，好吧。
> [root@DarkAce] ~ # `ps`
>    PID TTY          TIME CMD
> ...
> 4514 pts/0 0:08.68  hexo
> ...
> [root@DarkAce] ~ # `cat /proc/4514/oom_score_adj`
> 0

这个评分也有一定规律，就比方说:

| 总物理内存 | 实际使用物理内存 | oom_score_adj 评分 | oom_score_adj 评分说明 |
| ---- | ---- | ---- | ---- |
| 8GB | 8GB | 1000 | 最高分，占总内存的 100%，通常在此分数的进程会被 OOM Killer 终止 |
| 8GB | 4GB | 500 | 占总内存的 50% |
| 8GB | < 4GB | 0 | 最低分，通常占总内存的 50% 以下，或者说是更低。 |

关于这种评分的规律嘛，有2个因素可以直接联系着 oom_score_adj 评分：

| 因素 | 描述 |
| ---- | ---- |
| 系统评分 | 通常会根据上述规律，对 task 所实际占用内存空间的使用情况而评分。 |
| 用户评分 | 通常可以在 `echo  -1000 > /proc/{pid}/oom_score_adj` 设置其进程不要被 OOM Killer 终止。

### Last. 结语
在这里暗梦我也不希望旅行者们能够太明白，毕竟嘛，有的人可能在服务器搭建的不止博客，还有自己做的个人云网盘之类的，好吧
***但请旅行者们记住，不论博客还是个人云网盘之类的，内容一定要符合法律法规哈，诶嘿~***
{% note orange 'Tip' 'fa fa-warning' %}
总而言之，在服务器运行的程序不要太多，也要记得定期重启服务器哈，诶嘿~
{% endnote %}
最后祝愿各位旅行者们能够以乐观的心态好好生活，在工作 & 学习中顺利，再会~

　∧＿∧
 （｡･ω･｡)つ━☆・*。
 ⊂　　 ノ 　　　・゜+.
　しーＪ　　　°。+ *´¨)
　　　 　　 .· ´¸.·*´¨) ¸.·*¨)
　　　　　　　 　(¸.·´ (¸.·’*

