---
title: Re. 从零开始在 Deta Space 部署 Twikoo 评论系统的过程
categories: 技术分享
thumbnail: /static/20240601_07596.webp
excerpt: >-
  给旅行者们从零讲述部署 Twikoo 评论系统到 Deta Space 的过程哈，诶嘿~<br><br><font
  color="#F05B85"><strong>✦ 此部署方式涉及终端操作等高级操作，如果部分旅行者们对这些不太了解，还请不要参照此方式部署
  Twikoo，谢谢~ ✦</strong></font>
abbrlink: cad9d0fd
date: 2024-06-02 14:31:22
tags:
---


### First. 前言
{% tip %}em...... 这次暗梦我也不想写前言啦，当初给作者 <a href="https://www.imaegoo.com/" target="_blank">@iMaeGoo</a> 提交 PR <sup><a href="https://github.com/twikoojs/twikoo/pull/659" target="_blank">[Github PR #659]</a></sup> 的经历见 <a href="/c34131c8">暗梦我之前写的文章</a> 之其 I<br>
<strong>✦ 另外，此部署方式涉及终端操作等高级操作，如果部分旅行者们对这些不太了解，还请不要参照此方式部署 Twikoo，谢谢~ ✦</strong>{% endtip %}

### I. 注册 Deta 帐号 & 配置命令行工具
> Tip: 在这之前请确保旅行者你已注册好 MongoDB Atlas 账号，并获取 MongoDB 连接字符串以便存储评论数据哈，见 [Twikoo 官方文档](https://twikoo.js.org/mongodb-atlas.html)。
然后在 https://deta.space/signup 注册一个 Deta Space 帐号，然后嘛，在首页 <sup>[又称 Horizon]</sup> 底部如下图操作：

<center style="margin-bottom:10px;">
<img src="/static/20240601_20584.webp" />
</center>

em...... 在上图第 2 步键入 Setting 进入帐号设置，点击 `Generate Token` 添加一个 Token Key 以便使用命令行工具
><font color="#F05B85"><strong>✦ Tip: 在这里提醒下旅行者们，此 Token Key 仅出现一次，请妥善保管。✦</strong></font> 
最后打开终端 <sup>[Linux / macOS]</sup> 进行如下操作配置即可啦，诶嘿~

```bash
# 安装 space-cli 工具 
# Tip: 此安装脚本会在 Github Release 下载 space-cli 并安装，速度可能会有点慢。
curl -fsSL https://get.deta.dev/space-cli.sh | sh 

# 执行此命令后键入 Token Key 登录 space-cli 工具
space login 
```

### II. 部署 Twikoo 评论系统 & 添加自定义域名
然后嘛，先 clone 项目 <sup>[ git clone https://github.com/twikoojs/twikoo ]</sup>，在 /src/server/deta 中执行 `space new`，按下回车后命名 twikoo_deta
<font color="#F05B85"><strong>✦ 不过这里注意的是 package.json 的 twikoo-vercel 请修改为具体版本，以便在第 III <sup>(Tip: 指的是罗马数字的 3)</sup> 步更新云函数 ✦</strong></font>
最后执行 `space push` *(Tip: 部署过程会有点慢，请旅行者们谅解)* ，等待部署完毕后回到浏览器，在 Deta Space 首页进行配置
重复第 I <sup>(Tip: 指的是罗马数字的 1)</sup> 步，但此时在图中第 2 步键入 Builder 后回车，再选择你 push 的项目
em......，后续暗梦我就不过多阐述了，按照下图指示即可。

<center>
<img src="/static/20240601_06488.webp" />
</center>

### III. 云函数更新相关
这个很简单啦，在上次你已经 clone 项目的 /src/server/deta/ 中修改 package.json 的 twikoo-vercel 版本后保存，执行 `space push` 即可~
> Tip: 请确保 pwd 显示的目录为 /[Twikoo 项目文件夹]/src/server/deta，否则会提示 Failed to parse Spacefile: Spacefile not found.

### Last. 结语
em...... 使用这种方式访问会有一点点慢，另外，目前暗梦我还没有测试评论邮箱提醒功能， 还请旅行者们谅解哈 (o-ωｑ)).oO [梦之无奈]
最后旅行者们在使用此方式部署 Twikoo 遇到了问题，可以在暗梦我的这篇文章留言 <sup>(Tip: 暗梦我也没什么时间看评论啦，一般都是在晚上的时候才会来看 & 回复)</sup>
到时候再给旅行者们解决问题 <sup>(Tip: 如果说是代码问题，暗梦我还是 debug 后再提交 PR 好了啦\~)</sup> ，我先去喂猫猫了 ，亲爱的旅行者们，再会~