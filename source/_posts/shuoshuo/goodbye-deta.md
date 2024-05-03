---
title: 愿星辰皆因你而璀璨，Deta，后会有期~
type: shuoshuo
abbrlink: shuoshuo/ddda5d0e
date: 2023-09-30 14:17:45
---

最近看了看 Deta 的网站，发现出现了一个公告，上面写着可能会关闭服务
当然，暗梦我也在关闭之前的几个月看了看最下面的 Limits & Pricing ，虽然表明每月请求限制为 100w 左右，但在 Deta 的文档中也说道，Deta Base ~~(Tip: Deta 自带的 NoSQL，在 Waline 评论系统中，需要用其存储评论数据)~~，可能是基于非关系型数据库 の 键值数据库来着，em...... ，虽说本身没有存储限制，但一般个人博客的评论也没有多少，好吧，但是每一行数据最大限制在 400kb。<br><br>

毕竟嘛，暗梦我认为也够用了 *(Tip: 毕竟目前也只在留言板开放评论，而没有在每一篇文章都开放评论，~~不过暗梦我也不放心在 Deta Base 上面放太多评论数据，即便如上述所讲，没有存储限制~~，虽然之前 [@Vinking](https://vinking.top) 也在留言板提醒过我 [梦之无奈] [╮(╯▽╰)╭ ] )* ，好吧，可以来看暗梦我在电脑上的截图：<br><br>

![Deta 即将关闭服务的公告](/static/20230930_12167.webp)<br><br>

{% note 'orange' 'Tip' 'fa fa-warning' %}
<del>后续的话可能原来的评论系统将无法使用，到时候暗梦我会将留言板的评论系统迁移到 Twikoo (MongoDB + Vercel) 并恢复备份好的评论数据，还请旅行者们见谅哈~</del><br>
<i>现在已经迁移好留言板的评论系统啦，诶嘿，只是 Twikoo 的作者没有添加 Waline 评论数据迁移功能，就先将备份下来的评论数据，<del>暂时归档在暗梦我的电脑里哈</del><br>
em...... ，暗梦我后来想了一个办法，可以将 Waline 的评论数据迁移到 Twikoo，但首先需要在本机部署 Waline <i>(Tip: 尽量使用 SQLite 数据库，毕竟只是在本机搭建用于迁移评论数据)</i>，进入 Waline 管理面板之后，导入之前备份的 Waline 评论数据 (JSON) ，然后使用 Artalk 的 Artransfer CLI 工具对 SQLite 数据库文件进行转换，然后再将转换好的 Artrans 文件导入 Twikoo 即可。</i><br>
{% hidetext default "你知道的太多了" %} <strong>虽然，Vercel 也有和 Netlify 一样，有每月 100 GB 的流量限制，不过，只是在留言板放评论也够用了，好吧。 </strong>{% endhidetext %}<br>
{% endnote %}

{% note 'default' '暗梦' 'fa fa-commenting-o' %}
最后祝愿旅行者们在中秋节假期 & 国庆节假期相遇之时，能够有一个惬意而快乐的假期，再到假期结束的时候能够回归状态好好学习 & 工作哈，再会 (=￣ω￣=)~
{% endnote %}