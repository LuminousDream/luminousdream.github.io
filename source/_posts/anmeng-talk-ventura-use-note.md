---
title: 「随心说」浅谈使用 macOS Ventura (Hackintosh) 的感受
tags:
  - 随心说
  - Hackintosh
categories:
  - 暗梦 の 随心说
thumbnail: /static/20240419_13236.webp
excerpt: >-
  Macintosh 价格太高花销不起，Windows 的广告 & 软件捆绑不习惯，也不追求于大型游戏的体验，现在暗梦我只想安安静静地折腾
  Hackintosh，只求在最纯净的地方写下属于自己的诗与远方~
abbrlink: 9f498195
date: 2024-04-16 21:11:43
---

{% tip %}
在此仅仅是作为暗梦我的个人使用感受，请旅行者们对此作为参考。
{% endtip %}
### First.前言
Hi，又是我，你们的都市看客兼吟游诗人暗梦，em......
最近工作太忙，想不起来写什么文章，还是来和旅行者们浅谈一下暗梦我对 macOS 13 的使用感受 ~~来水一下~~ 哈，诶嘿~

### I.都市看客暗梦 の Hackintosh 台式机配置
> Tip: 暗梦我是用的 OpenCore Patcher 实现的 NVIDIA Kepler 显卡驱动，可以来看暗梦我这台 Hackintosh 台式机的配置。
>*em...... 本来没什么好写的，毕竟这配置非常老，也不怎么玩游戏，不过嘛实际功率也仅有 150w 左右*
> *如果旅行者们不介意的话嘛，那就可以接着看吧，价格就不说了。*

| 类型 | 型号 |
| ---- | ---- |
| 主板 | 华硕 H81M-E |
| CPU | Intel Core i3-4150 (Haswell 架构) |
| 内存 | Kingston DDR3 内存条 <sup>[8 GB & 1600Mhz 单通道]</sup>|
| 显卡 | ~~七彩虹 GT 730k 黄金版~~ NVIDIA GT 730 <sup>[1 GB，在 macOS 12 以上需要使用 OpenCore Patcher 安装 NVIDIA Kepler 驱动]</sup> |
| 硬盘 | ST1000DM003-1ER162 <sup>[1 TB]</sup>
| OpenCore 引导版本 | 0.9.4 |
| 系统版本 | macOS Ventura 13.5 <sup>[22G74]</sup> |

### II. 都市看客暗梦 の 使用 macOS Ventura 的感受
em...... 怎么说呢，先来说 macOS Ventura 的台前调度嘛，也不算是很多人说的那样不好用，毕竟萝卜白菜各有所爱嘛。
> Tip: 这些新功能暗梦我也不想多说什么，一般也就打开 VSCode 写博客 & 代码之类方便切换窗口罢了，不仅如此
> 暗梦我也会打开这个功能管理桌面文件，不过暗梦我电脑桌面里没有文件，就正希望暗梦我的烦恼也会如此，每天开开心心哒~
> *但在一个月内，有极少机率会出现卡屏，然后就跳到了电脑密码输入界面*
>*输入密码进入后上次运行的软件会重新启动，不是的话就是轻微花屏的出现。*

关键的是，macOS Ventura 的底层更新有点多 *(Tip：也有可能是 Hackintosh 本身的问题)* 
导致暗梦我原来在 macOS BigSur (11.2) 使用的旧软件都没办法运行
比方说我没办法用 Crossover 打开 RPG MAKER <sup>[基于 RGSS (Ruby Game Scripting System) 的游戏制作工具]</sup>  制作游戏
~~好在的是，后续选择了 Wineskin 作为打开 RPG MAKER 的替代方案，不过游戏做的不好，这里就不给旅行者们放出来哈，抱歉 (o-ωｑ)).oO~~

最后一个，就是 macOS Ventura 的新应用「无边记」，一般写技术文章的时候，暗梦我会用这个工具做原理图
比方说 [关于 Vinking 2024 新年游戏的解析](/6958ef11/) 这篇文章，先不说在作图太大 & 太多的情况下，会导致「无边记」没有响应
它也不能直接保存为图片，只能先导出为 PDF 格式后截图 & 转换为 WebP 才行 φ(-ω-*) 

### III.都市看客暗梦 の 当初选择 Hackintosh 的原因
整个世界也算清净了，直到现在，也不想再回想起那两年前，用 Windows 的那个时候的那些软件广告和捆绑软件的困扰
> Tip: 先不说 2345 浏览器 & 输入法这些软件会存在页游广告 & 篡改浏览器首页
> 有的时候装个 RPG MAKER XP / VX 都还有捆绑软件才让暗梦我无言以对 (。-ω-)......

在一次次重装系统 & 备份数据速度慢的困扰下，突然想到 macOS 的生态没什么广告 & 捆绑软件的困扰。

>暗梦：要说为了电脑不受恶意程序的威胁 & 垃圾清理的话也完全没必要装很多杀毒软件来拖慢电脑速度
>如果说因为工作不得不使用 Windows，那系统自带的 Microsoft Defender 也就足够了 *(Tip: 毕竟它会随着系统更新而更新)* ，好吧。

但最终因为没钱购入 Macbook & Mac Mini 的情况下，作出一个选择，尝试折腾下 Hackintosh，也就是所谓的黑苹果嘛。

### IV.都市看客暗梦 の 当初首次折腾 Hackintosh 的经历
当时用的还是 Clover 作为引导来启动 macOS Catalina (10.15.7)，卡进度条无法进入系统
最后进入 Windows PE 之后在 EFI 文件添加了 -v 参数之后再重启，通过输出才得知 & 解决了问题。

在然后更新到了 macOS BigSur (11.2) ，声卡 & 有线网络无法使用，于是买了一个 comfast 的 USB 免驱网卡，可后来在系统卡顿时检查配置的时候
发现原来的 Clover 配置不对，也找不到此电脑适配这个新版本系统的 EFI 配置文件，于是找了下和 4 代 Intel 平台其他 CPU 的配置
使用 [OCAuxiliaryTools](https://github.com/ic005k/OCAuxiliaryTools) 对其优化 & 手动配置 Kext，......

> 暗梦：直到万事俱备，重启解决问题后，我也觉得我买的这个 comfast 的网卡没什么用，因为当时还没发货，最终选择退货 (o-ωｑ)).oO

到了最后，暗梦我也慢慢习惯了 macOS 的那些用法，并升级到了 macOS Ventura (13.5)，往回看去，也不怎么再习惯用 Windows 了，好吧。
现在折腾不动了，也不想升 macOS Sonoma (14.x) 体验了，就这样普普通通的用下去，万一又会有驱动问题就无可奈何了呢。

<font color="#F05B85"><strong>✦ 如果说之后 macOS 的程序不再支持 Intel 平台，到时候再买一台二手的老款 Mac Mini <sup>[最多选择 Apple M1]</sup> 吧  (Smile)（*＾-＾*）✦</strong></font>
>Tip: 具体看情况，关键的是没钱买，或者说价格仍然偏高 ...(o′ω`o) [梦之无奈]
>***看着正在努力工作的暗梦 · 杜其米亚，为了自己的兴趣 & 生活而努力拼搏，在这一刻，也使你充满了决心，并决定带着这份信念继续远航。***

>*到时候要实在不想买的话嘛，暗梦我后续也有可能会回到我曾经用 LFS <sup>[Linux From Scratch]</sup> 制作的 Linux 发行版 「樱花之诗」中，只是有点不完美*
>*em...... 还需要连夜 打造 <sup>[build & compile]</sup> 一些 工具 <sup>[raw code]</sup> 才能满足日常使用呢，~~不过目前 Visual Studio Code 是可以运行了~~。*

### Last. 结语
{% note 'themecolor' '暗梦' 'fa fa-commenting-o' %}
Oray，明天还要继续工作呢，那暗梦我就先早点休息去了，愿旅行者们晚安哈，诶嘿~
{% endnote %}