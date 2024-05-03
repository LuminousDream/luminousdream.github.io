---
title: Linux搭建PPSSPP外网联机服务器
categories: 技术分享
tags:
  - Linux
  - 电子游戏
abbrlink: '29682406'
date: 2022-05-29 14:00:00
---
有的时候很多小伙伴在手机上用小鸡模拟器之类的模拟器进行PSP外网或局域网联机，但这样的话必须登录他们的帐号才能联机，那暗梦我来将一讲如何在自己的服务器上搭建一个基于AdHoc的PPSSPP模拟器联机服务器。

#### I.克隆github项目
<blockquote>git clone https://github.com/JeffBobbo/AdhocServerPro
</blockquote>

#### II.配置并编译项目
进入它的配置文件进行配置 (config.h)

    //Adhoc服务器端口号
    #define SERVER_PORT 27312

    // Listener Connection Backlog (保持在默认值)
    #define SERVER_LISTEN_BACKLOG 128

    // 服务器最大连接
    #define SERVER_USER_MAXIMUM 1024

    // 服务器联机超时(毫秒，如果看不见好友可以稍微设置大一点)
    #define SERVER_USER_TIMEOUT 15

    // 配置sqlite3数据库文件(必须和编译后的文件放在同一路径，并安装sqlite3开发包)
    #define SERVER_DATABASE "database.db"

    // 输出状态文件的路径
    #define SERVER_STATUS_XMLOUT "/www/ adhoc_status.xml"

    // Adhoc服务器关闭的提示
    #define SERVER_SHUTDOWN_MESSAGE "PROMETHEUS HUB IS SHUTTING DOWN!"

然后make一下<del datetime="2022-05-28T15:02:35+00:00">(tip:编译出来的文件为编译端的CPU架构)</del>，编译的时候会有几条警告，不必理会
生成出来的文件运行即可。


#### III.PPSSPP模拟器设置
进入网络设置 -> 启用联网通信 -> 更改PRO Ad Hoc服务器，输入您服务器的IP地址 -> 关闭内置Ad Hoc服务器 -> 然后在端口偏移设置为0即可

<div class="mdui-hoverable shortcodestyle" style="background: #9dd7e8 !important;color: #03536b !important;text-indent: 0 !important;"><i class="fa fa-check-square"></i>&nbsp;&nbsp;tips:</br>I.这个服务端在同一个局域网运行多台设备联机时可能会导致和同一个公网IP产生冲突，提示错误码32，所以在同一个公网IP下只能在线一台设备。</br>II.目前对于一部分游戏并不是很友好，会有一部分bug，比如《怪物猎人系列》可能在集会所房间会看不见好友，但还是能用PPSSPP最新版自带的聊天功能。</div>
