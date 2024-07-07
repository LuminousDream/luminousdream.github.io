---
title: 「Hackintosh」解决升级到 macOS 12 之后 Xcode Simulator 黑屏的那些事
categories: 技术分享
tags:
  - Hackintosh
abbrlink: db0daa9f
date: 2022-09-29 21:36:00
---
Hi，I'm 暗梦，最近呢在升级到 macOS 12 之后在打开 Xcode Simulator 时遇到黑屏的问题，当然，不只是在Xcode中会有这个问题，在打开一些其他的软件<del>(比如说 TouchBarServer 中 Touch Bar 也是黑屏)</del>，最后再经过一段时间的探索，终于发现了一部分原因，是出在Nvidia的显卡驱动补丁上。

>I.是使用 OpenCore Legacy Patcher 安装的 Nvidia Kepler Patcher [但它不适用于 Clover]
>II.OpenCore/Clover的启动参数不正确而无法正常启动显卡驱动补丁。

<font color="orange">tip:当然，如果你觉得很麻烦的话，好吧，就当暗梦我没说，最好呢，还是去买一台Mac比较好，毕竟Hackintosh呢，相对于Mac mini或者MacBook Pro来说，并不稳定，升级版本的时候也会出现一些驱动上的问题。</font>

好吧，先来说说解决方法 （´-`）.｡oO（ 。

#### I.重新安装 Nvidia Kepler Patcher
这次呢先不要直接在OpenCore Legacy Patcher上直接安装，因为有可能那上面的显卡补丁不完整，先直接到 <a href="https://github.com/chris1111/Geforce-Kepler-patcher" target="_blank">[Nvidia Kepler Patcher]</a> 的 GitHub 页面下载显卡补丁，然后按照提示安装。

#### II.关于在 OpenCore/Clover 上的启动参数配置
在 Opencore Configurator添加以下启动项 <del>[NVRAM 随机访问存储器中左边的uuid慢慢找，直到出现在右面的boot-args后面的启动参数最末尾添加启动项即可]</del>
>nvda_drv_vrl=1 & nvda_drv=1 //这两个二选一，不是叫你都选哈。

那么，在clover嘛......
抱歉，你没法直接从Clover Configurator里自定义添加引导参数，但你可以直接在bbedit或者vscode打开efi配置文件进行修改，找到名为Arguments的key字段的内容下面的string修改即可。

```markdown
<key>Arguments</key>
<string>-v debug=0x100 dart=0 keepsyms=1 -no_compat_check slide=0 -lilubetaall nvda_drv=1</string>
```

最后重启电脑即可，还祝大家国庆节快乐哈 (…^-^…)
