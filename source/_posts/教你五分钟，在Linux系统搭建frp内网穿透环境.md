---
title: 教你五分钟，在Linux系统搭建frp内网穿透环境
categories: 技术分享
tags:
  - Linux
abbrlink: 8f034b5
date: 2021-09-07 20:57:00
---
我们都知道，家里面的网络都是一个内部的局域网，但是在外面，急需要访问家里的设备时，又该怎么办呢？

就有人说用Sakurafrp这个东西，但可惜现在隧道变少了许多

那这次就来讲讲，如何自己搭建一个内网穿透环境

首先，你得要有个服务器，进入后输入指令下载服务端和客户端
    wget https://github.com/fatedier/frp/releases/download/v0.37.1/frp_0.37.1_linux_amd64.tar.gz
    wget https://github.com/fatedier/frp/releases/download/v0.37.1/frp_0.37.1_linux_386.tar.gz #32位Linux用这个
然后新建目录 /usr/local/frp 把下载的tar.gz文件解压到那里 (切记别把frpc文件删了，这个是后面要用到的客户端,除非家里的电脑CPU架构不同需要另外下载)
(或许，要不新建文件夹，直接解压后把里面的frps移动到 /usr/bin 也可以)
然后在你自己的用户目录[cd /root 或者 cd ~ ]里新建一个配置文件(frps.ini)，可以根据需求配置，也可以不写这个配置文件
因为暗梦我就懒得写 (⌒∇⌒)

但是frp的监听端口就被默认设定为7000。

    # 编辑配置文件 
    # frps.ini
    #通用设置
    [common]
    # frp 监听地址
    bind_port = 7000
 
    #frp 控制面板
    dashboard_port = 7500
 
    # dashboard 用户名密码可选，默认都为 admin
    dashboard_user = admin
    dashboard_pwd = admin
 
    # 开启 ssh 穿透(可通过外网链接内网 ssh)
    [ssh]
    type = tcp
    listen_port = 6000 #到时候通过 ssh @x.x.x.x -p 6000 连接到PC1
    auth_token = 123 # client端的auth_token 需要和这一致，相当于一个隧道的密码，不需要可以去掉这一行
 
    # 内网的多台主机 都可以通过一个公网服务器进行映射
    [ssh_1]
    type = tcp
    listen_port = 6001 
    auth_token = 1231

编辑好配置文件后，按下esc，:wq，搞定，输入 frps &，启动服务端，就成功了一半
然后再把服务器上面的frpc客户端传输到家里的设备上(可能CPU架构不同，所以要是真不同的话，可以自行单独下载）

然后写配置文件(frpc.ini)

    #设置基础参数
    [common]
    server_addr = 123.5.57.118 #服务端ip（你服务器的公网IP，或者你的域名）
    server_port = 7000         #服务端设定的监听端口
 
    [ssh] #ssh为您的隧道名称，可以改的
    type = tcp #隧道类型为tcp隧道
    local_ip = 127.0.0.1  #本机ip
    local_port = 22       #要穿透的本机端口
    remote_port = 6000    #外网服务器请求过来的端口(这句可以注释，会随机分配端口）

保存完毕后关闭程序，然后运行 ./frpc(./frpc_windows.exe) -c ./frpc.ini

最后就可以了，访问方法：服务器IP:生成的端口，愿君顺利。
