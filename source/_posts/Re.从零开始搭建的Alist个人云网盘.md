---
title: Re.从零开始搭建的Alist个人云网盘
categories: 技术分享
tags:
  - Linux
abbrlink: 583256b2
date: 2022-07-26 22:06:00
---
有的小伙伴呢，想保存自己家的美好照片，却苦于手机空间不足而止步于此。

<blockquote>tip:其实暗梦我从来都不用什么宝塔面板之类的哈
因为不是很习惯
[☆⌒(*＾-゜)v THX!! ]</blockquote>

那这次呢讲一下手动安装及配置服务的方法

I.安装及配置Alist
先根据您设备的架构下载Alist <a href="https://ghproxy.com/https://github.com/Xhofe/alist/releases/latest/download/alist-linux-musl-amd64.tar.gz">x86-64</a> | <a href="https://ghproxy.com/https://github.com/Xhofe/alist/releases/latest/download/alist-linux-musl-arm64.tar.gz">arm64 (Termux & Raspberry PI用)</a>
解压完成后会得到一个二进制可执行文件，您需要手动给予权限后放置于/bin目录中，并运行一次Alist，运行完毕后配置data目录中生成的config.json文件。


    {
      "force": false,
      "address": "0.0.0.0",
      "port": 5244, //Alist端口号
      "assets": "/",
      "local_assets": "",
      "sub_folder": "",
      "database": {
        "type": "sqlite3",
        "host": "",
        "port": 0,
        "user": "",
        "password": "",
        "name": "",
        "db_file": "[data文件夹中自动生成的sqlite3数据库文件，此处改为绝对路径]",
        "table_prefix": "x_",
        "ssl_mode": ""
      },
      "scheme": {
        "https": false, //true即为开启https
        "cert_file": "[ssl证书位置]",
        "key_file": "[ssl证书私钥/证书链位置]"
      },
      "cache": {
        "expiration": 60,
        "cleanup_interval": 120
      },
      "temp_dir": "[缓存文件夹，此处改为绝对路径，不存在则自动生成]"
    }
</pre>

II.创建系统服务
```ini
# cat >/etc/systemd/system/alist.service
# -----------------------------------------
[Unit]
Description=Alist service
Wants=network.target
After=network.target network.service

[Service]
Type=simple
WorkingDirectory=/usr/bin
ExecStart=/usr/bin/alist -conf [您原先在指定根目录下data文件夹中的config.json文件位置]
KillMode=process

[Install]
WantedBy=multi-user.target

# -----------------------------------------
# systemctl daemon-reload
# systemctl start alist //启动Alist服务
```

III.修改管理员密码 & 挂载服务器本地资源 
(I). 第一次运行Alist会在终端输出提示初始密码 <em>[Your password: u0****u7]</em>，进入管理页面输入密码后，进入后端设置，修改[密码 & WebDAV password] 值为您的新密码，然后保存即可修改管理员密码。
(II). 进入管理页面 -> 帐号设置 -> 添加本地类型 -> 虚拟路径 *[您的网盘出现的根目录，可自定义] -> 根目录路径 *[保存文件的根目录] -> 保存即可挂载服务器本地资源

IV.Alist优化设置
(I). 进入管理页面 -> 前端设置 -> 关闭动画减少加载速度
(II). 进入管理页面 -> 图标颜色 -> 十六进制颜色代码修改强调色

<div class="mdui-hoverable shortcodestyle" style="background: #9dd7e8 !important;color: #03536b !important;text-indent: 0 !important;"><i class="fa fa-check-square"></i>&nbsp;&nbsp;
文件上传方法：登录管理页面后回到个人云网盘首页进入指定目录即可上传。
目录私密方法：进入管理页面 -> 添加元数据 -> 路径 *[您需要设置密码的虚拟路径] -> 密码 *[您想设置的密码] -> 即可私密目录
最后愿君水到渠成，加油。</div>
