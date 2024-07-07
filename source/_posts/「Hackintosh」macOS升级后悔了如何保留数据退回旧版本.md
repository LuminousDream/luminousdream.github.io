---
title: 「Hackintosh」macOS升级后悔了如何保留数据退回旧版本
categories: 技术分享
tags:
  - Hackintosh
abbrlink: 8020d73a
date: 2022-09-16 11:17:00
---
这次来讲讲Hackintosh的那些事 ~~(也就是我们所说的黑苹果嘛，有时需要写代码或者剪辑视频时需要用到它，最主要的是没钱买Mac (≡￣﹏￣≡) )~~ ，说实话，这也是我第一次写这个文章。

那如果真的不习惯新版本或者升级会出现问题的话，怎么回滚旧版本系统呢 （︶︿︶）

#### tips
>在你的电脑上有旧版本的镜像(当然，如果你早就有了旧版本的安装U盘，你可以跳转到第II步了。)
>不需要Windows的PE，直接使用macOS自带的恢复模式即可，也不需要Time Machine保留您的数据回滚旧版本。

#### I.制作旧版本启动盘
(如果你的U盘是新版的启动盘的话)
进入磁盘自带的恢复模式(不要进入U盘里面的恢复模式)
>OpenCore按下空格出现 Recovery(dmg)为磁盘自带的恢复模式。
>Clover按下F3显示隐藏选项，出现 Recovery的那个磁盘即为恢复模式。

再打开实用工具的终端，挂载镜像文件。
>hdiutil attach [你的镜像文件位置]
等待效验完成后会出现挂载点，这里以暗梦我以前用的Catalina(10.15)为例，进入它的安装包内容
>cd "/Volumes/Install macOS Catalina/Install macOS Catalina.app/Contents/Resources"
然后开始写入启动盘
>diskutil list(查看你要写入磁盘的Volume)
等等，在这之前先备份好EFI文件。
>mkdir /Volumes/efibackup
>cp -R "/Volumes/[您U盘里的EFI文件的Volume，请到diskutil list中查看]" "/Volumes/efibackup/"
然后开始制作启动盘
>createinstallmedia --volume [你要写入启动盘的Volume]
按下y确定，会先格式化您的U盘，开始写入，等待写入完毕后，还原EFI文件到U盘，重新启动即可。

#### II.安装旧版macOS
这次可以从您的U盘启动了，先打开磁盘工具，抹除升级后的系统盘(不要抹除末尾是数据的盘，因为您之前的数据都在里面)，然后重新安装副本到刚才抹除的磁盘中。

#### III.恢复你的数据
(不用Time Machine)
进入桌面后，打开Finder，在左侧点进你没有抹除的数据盘，恢复数据。
>/Users/[你以前的用户名] -> 移动到你现在的用户名文件夹
>/应用程序 -> 移动到你现在的应用程序文件夹
最后进入磁盘工具，你会发现会多了个Update的分区和第二个数据盘，确认你的数据恢复完毕后删除以前的数据盘(注意磁盘图标不带小屋的图标是你以前的数据盘，也就是刚才在Finder左侧显示的磁盘)和Update分区后即可。
