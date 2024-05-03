---
title: 在 Termux / Raspberry Pi 的 Linux 下编译安装 Rime 输入法框架
tags:
  - Linux
categories: 技术分享
abbrlink: 78c6ea47
date: 2023-03-19 18:19:45
---
### First.前言
Hi，旅行者们好，又是我，你们的都市看客兼吟游诗人暗梦 q(≧▽≦q) ~

然而呢，暗梦我最近在用手机上的 Linux 写博客的时候
总是要电脑通过 SSH 连接 & 手机上的 Termux App 来打字，在手机上的 VNC 上用自带键盘输入中文的话嘛
虽然能打出来，但也没完全打出来，打几个不同的字之后嘛，就打不出来了，很令人焦虑。

如此一来，只能在 Linux 系统上安装输入法，但是令暗梦我没想到的是，直接通过软件包管理器
安装 Rime，则告诉我无论是 fcitx5 & rime 都只有 x86_64 的桌面级 CPU 架构。
~~(tip: 因为暗梦我用的是 Arch + Ibus 的方案，当然，毕竟有的发行版也确实有arm架构的软件包，就可以不用编译安装啦~ )~~
无妨，暗梦我跟旅行者们讲讲如何自己编译源代码安装。

### I.克隆源代码 & 安装编译依赖

首先先安装好依赖包，可以对照一下不同发行版对于依赖包的名字。
>tip: 此处仅供参考，如有不同，可查看在 ibus-rime & librime 仓库内的 issues 。

| 软件包原名 | Arch Linux (pacman) 包名 | Ubuntu / Debian (apt-get) 包名 | 是否需要自行编译 | 备注 |
| --- | --- | --- | --- | --- |
| [librime](https://github.com/rime/librime) | 无 | 无 | 是 | Rime 的核心框架 |
| [plum](https://github.com/rime/plum) | 无 | 无 | 是 | Rime 配置管理工具 |
| capnproto | capnproto | capnproto | 否 | 序列化 RPC 工具，但是这个暗梦我也不知道是用来做什么的，但它依赖于 librime。|
| libglog | google-glog | libglog | 否 | Google Logging library for C++ |
| cmake>=2.8 | cmake | cmake | 否 | C++ 编译工具 *(tip: em...... 有的时候也需同样需要 gcc 。)* |
| gcc | gcc | gcc | 否 | C++ 编译工具 |
| make | make | make | 否 | Makefile 解析 & 编译工具 |
| libboost>=1.48 | boost | libboost-all-dev | 否 | C++ 源代码库 |
| libleveldb | leveldb | libleveldb & libleveldb-dev | 否 | C++ 存储库 |
| libmarisa | marisa | libmarisa & libmarisa-dev | 否 | C++ web server framework |
| libopencc>=1.0.2 | opencc | libopencc & libopencc-dev | 否 | 面向 C++ 的 Opencc 库 |
| libyaml-cpp>=0.5 | yaml-cpp | libyaml-cpp & libyaml-cpp-dev | 否 | C++ YAML parser |
| libgtest (optional) | gtest | libgtest & libgtest-dev | 否 | Google 测试框架 |

可以根据自身需求选择适合的 Rime 版本 (tip: em...... 以前有过fcitx的版本，现在没有了，所以只能编译安装 IBus 版本的 Rime)
{% githubrepo "rime" "ibus-rime" "mini" %}

### II.编译源代码 & 配置 Rime 输入法
首先看到项目根目录中没有Markfile的话嘛，可以先用 cmake . 来生成 Makefile，然后再使用 make -j4 && make install 即可，编译顺序如下
> librime > plum > ibus-rime

Oray，接下来暗梦我就可以在告诉各位旅行者们如何配置在 Linux 上的 Rime 输入法。

#### (Zero). 配置 IBus 自启动
在位于 ~/.bashrc & /etc/bash.bashrc 前面添加以下代码，保存重启即可
```bash
export GTK_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
export QT_IM_MODULE=ibus

# 判断 IBus 是否启动
ibus_isrunning = `ps -ef | grep ibus-daemon | grep -v grep | wc -l`
if [ $ibus_isrunning -eq 0 ]; then
  # 若没有启动 IBus 则自动启动
  ibus-start &
fi
```

#### (I). 简体字输入
如果在 VNC 的手机上无法通过快捷键 (Ctrl + \~) 调到简体字，则可以通过修改配置文件 ~~(~/.config/ibus/rime/user.yaml)~~ 然后重新部署后解决。
```yaml
var:
  last_build_time: 1679155261
  previously_selected_schema: luna_pinyin_simp
  schema_access_time:
    luna_pinyin_simp: 1679154546
```
>Tip: em...... 如果旅行者们怕麻烦的话嘛，其实也可以用电脑通过 VNC 连接手机上的 Linux 容器来呼出输入方案菜单，再按方向键选中[朙月拼音 · 简化字]就可以了。

#### (II). Rime 外观主题配置
可以在 IBus 选项中可以进行设置，这和暗梦我之前在 Windows 讲的小狼毫完全不同，怎么说呢？
原先暗梦我写过关于小狼毫的文章，在昨年5月份的时，那时候暗梦我的博客还没开始迁移，用的依然是国内的云服务器。
因为服务器的数据库崩溃了，导致博客数据丢失，而当时我也没有做备份
所以之前那篇小狼毫的文章就这样从暗梦我的博客中消失了 (._.`)。

自行选择 横排 / 竖排，及自定义主题即可。

#### (III). 自定义短语 & 词库
##### [I]. 自定义短语
可以通过创建自定义短语文件 ~~(~/.config/ibus/rime/custom_phrase.txt)~~ 然后每一行按照如下格式填写后保存
```yaml
# tip： 这里的空格换作Tab键，否则Rime将无法读取自定义短语文件。
[短语内容]	[短语字母 / 拼音 字符]	[短语后面的注释 (可选) ]	[候选词排名ID]

# Example
暗梦	anmeng 	都市看客兼吟游诗人	1
人生如戏故事如诗	rsrxgsrs	1
```
然后重新部署即可。

##### [II]. 自定义词库
首先在 ~/.config/ibus/rime/build/ 目录下新建一个自定义词库文件 [词库名称].dict.yaml
然后按照如下格式填写好后保存 ~
```yaml
---
name: [词库名称]
version: 0.7
sort: by_weight
usr_preset_vocabulary: true
---
# tip： 这里的空格换作Tab键 (除了多个字符的拼音字符需要用空格隔开)，否则Rime将无法读取自定义词库文件。
[词语内容]	[词语字母 / 拼音字符 (每一字的拼音要打一个空格)]	[候选词排名ID]

# Example
暗梦	an meng	1
人生如戏故事如诗	ren sheng ru xi gu shi ru shi	1
```

最后在 ~/.config/ibus/rime/build/luna_pinyin_simp.schema.yaml 的 translator 后面添加您自定义的词库后重新部署即可。
```yaml
  translators:
    - punct_translator
    - "table_translator@custom_phrase"
    - reverse_lookup_translator
    - script_translator
    - [词库名称 (tip:不要加上后缀，如 .dist.yaml ) ]
```

### III. 都市看客暗梦 の 给旅行者们的一些小提示
如果是在手机上用的 proot / chroot 容器内，有时候使用 make install 会给安装到 /data/data/com.termux/usr/...
则需要将里面的内容移动到容器的主目录 (tip: 因为此目录在容器的文件系统中无用，需旅行者们自行甄别)。
> cp -rv /data/data/com.termux/usr/share/ibus-rime /usr/share/ibus-rime
> cp -rv /data/data/com.termux//usr/share/ibus/component/ /usr/share/ibus-rime
> cp -rv /data/data/com.termux/usr/lib/ibus-rime /usr/lib/ibus-rime

### Last.结语
Oray，祝各位旅行者们能够水到渠成，愿君顺利哈 (*^▽^*)。

<div class="alert alert-warning"><span class="alert-inner--text">
至于暗梦我为什么会选择 Rime 作为输入法呢？<br>
因为多数输入法都有云联想的功能，这么说吧<br>
就有那种被窃取个人隐私的风险，所以暗梦我都不喜欢用那些输入法<br>
好吧，我又忘记喂猫猫了， 得去给它倒猫粮去咯，各位旅行者们再会~<br>
</span></div>
