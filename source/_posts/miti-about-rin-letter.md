---
title: 一枚 2024 暑期解谜游戏 · 远坂凛给你的一封祝福信
tags: Linux
categories: 技术分享
excerpt: 受到 Vinking & 电脑星人 的启发，设计的一枚 2024 暑期解谜游戏~
abbrlink: bdcdc9f9
date: 2024-07-06 15:52:51
---
### First. 前言
Hi，I'm 暗梦，em...... 最近想不起来要写什么文章，没什么要分享的日常还是有点冷场呢 [梦之无奈] 
索性给旅行者们设计一个不同的解谜游戏哈  ( ,,´･ω･)ﾉ"~ *(Tip: 毕竟也是受到了 [@Vinking](https://vinking.top) & [@电脑星人](https://imkero.net/) 的启发呢，诶嘿~)*
>暗梦：<font color="#F05B85">✦ **不过先说明一件事儿，解谜后没有什么红包，不过也不会让旅行者们失望啦，还是有一封祝福信哒~** ✦</font>
> em，~~也不知道有没有人来解题呢，要说不感兴趣的话嘛也没有关系~~ 旅行者们就当是练习好了啦  (๑´•ω•)~

### I.可以公开的线索
  + I. 解谜的线索及起点都在这张图片里，且该谜题为多流程解谜，不过难度会比 [@Vinking](https://vinking.top)  的新年游戏简单一点，只为博君一笑~
  + II. **<font color="#F05B85">✦  另外，在 Windows 解谜的时候，可能会出现问号乱码的问题，还请旅行者们在 Linux 系统解题哈~ ✦</font>**
  + III. 最后她给予旅行们的祝福信被藏在一个 GPG 文件里 <sup>(该文件仅使用对称密文加密)</sup>，而打开这封祝福信的密码是纯英文字母。
  + IV. em...... 在这里你可能需要一个 [十六进制编辑器](https://hexed.it)，不过暗梦我给你准备好啦，诶嘿~

### II. 都市看客暗梦 の 谜题图片 
<center>
<img width="50%" src="/static/fate_rin.webp" alt="《Fate Stay/Night》女主角 远坂凛" />
</center>

### III. 都市看客暗梦 の 谜题解析
#### (I). 谜题之序章 · 十六进制图片分析
> 暗梦：~~em...... 可能暗梦我这道谜题，会简单到 <a href="https://imkero.net/" target="_blank">@电脑星人</a> 大佬也不太可能会写出这道谜题的题解呢~~

首先这张图片格式为 WebP，和在 Vinking 的新年游戏一样，文件末尾有提示：
`[The binary Data Want walk]` ，此时打开 binwalk 对图片进行分析，得出以下结果：

|DECIMAL|HEXADECIMAL|DESCRIPTION|
| ---- | ---- | ---- |
|70736|0x11450|Zip archive data, at least v2.0 to extract, compressed size: 3924, uncompressed size: 4170, name: <font color="#F05B85">fate_pswdqr.webp</font>|
|74734|0x123EE|Zip archive data, at least v1.0 to extract, compressed size: 737, uncompressed size: 737, name: <font color="#F05B85">letter.txt.gpg</font>|
|75543|0x12717|Zip archive data, at least v2.0 to extract, compressed size: 1418, uncompressed size: 5347, name: <font color="#F05B85">snowstory.txt</font>|
|77285|0x12DE5|End of Zip archive, footer length: 22|

em...... ，那暗梦 · 杜其米亚我说简单点，**这张图片其实还是一个压缩包，解压后即可得到上述三个文件**

#### (II). 即便只有一望无际的冰雪，也终会遇见美好的奇遇~
从 snowstory.txt 可以看到远坂凛与阿尔托利亚 · 潘德拉贡二人在咖啡馆的对话，这都不重要了啦，嘿嘿
关键在于 `...[不知道等了多久，远坂凛的拿铁始终没做好，她只好望着窗外，观赏那片一望无际的冰雪] ...`
根据这句话之后的空格与制表符 & `观赏那片一望无际的冰雪` 这一段作为线索，可以推断出为 snow 隐写
>Tip: 暗梦我给它一个文雅的叫法 《往昔的雪城街景》，原理是在不影响文本内容的情况下，往后面添加空格及制表符
>不过与零宽不同的是，字符是可见的，也能被打印出来 <sup>[就好比你先输入了很多空格，然后再往空格后面撰写文字后打印，会发现前面有很多空白内容]</sup>

不过嘛，阅读隐写的内容需要密码，无妨，回头看上面的 `[此处无法显示，位于 fate_pswdqr.webp]`，发现是一张扫不出来的二维码，em......
其实旅行者们，只需要修复好位于二维码三个角的定位点，再扫描即可得出 `[Snow Pswd: anmeng_like_cat]` 啦~

{% tip %}
TIp: 根据线索之其 II，暗梦我在 snowstory.txt 里面隐写的信息 <sup>[Message Encode: UTF-8]</sup> 在 Windows 系统的命令提示符 <sup> [基于点阵字符]</sup><br>
会导致问号乱码，还请旅行者们在 Linux 系统使用 stegsnow <sup>[Arch Linux 需要自行通过 AUR Helper 安装]</sup> 进行解谜哈，诶嘿~
{% endtip %}

#### (III). 谜题的帷幕 · 金针菇培根炒饭
```bash
[root@anmeng ~ ] # stegsnow -p anmeng_like_cat ./rin/snowstory.txt
暗梦：(^-^) Hi~ 亲爱的旅行者，你还是挺不错哒，诶嘿~
不过我有点饿，还是去厨房做一份金针菇培根炒饭好了
[暗梦吃完饭后，帮猫猫数羊好让它睡好午觉]
一只羊，2只羊，3只羊,...... 21 只羊，我也休息会儿吧，反正今天放假

wvvwvwvwwvvvwvvvvwvvwvvwwwvvvwvwwwvwvvwvvvwvv
```
...[梦之无语]...，这么说吧，金针菇培根炒饭，按道理来说下面这段本应是培根密码 <sup>[只有一堆含有a和b这两个字母的组合]</sup> ，但似乎字母被偏移了几位
貌似是使用了凯撒密码，通过最后数羊的只数，在此暗梦我也不再过多阐述了，最终得到祝福信密码 `sweetrose`，就此告一段落~

### (Special). 远坂凛给予旅行者们的祝福信
```bash
[root@anmeng ~ ] # gpg -d  ./rin/letter.txt.gpg
gpg: AES256.CFB 已加密的数据
gpg: 以 1 个密码加密

-致最热爱生活的你
	你好呀，你可能还在为生活的花销而苦恼吧，但有时
钱也换不来善良与友爱，相信你在每天上下班的地铁车厢里
轻声唱着没有听众的歌曲，至少你不愿打扰别人，而给你自己
带来一丝慰籍，当你一个人在外务工苦恼的时候，可以想象一下
我就在你旁边，一直默默地鼓励你，而我也不要你太富有
也不需要你成为人生赢家，而是能够做一个堂堂正正
充满个性的你，这样一来，就算这个城市无法再容纳你
我也无法帮助你实质上的问题，相信我，暂时回到家乡
你的家人也终会为你重新打开继续前行的道路，再开启新的旅途


最后一定要答应我，好好守护他们，不要让其寒心，好吗？
愿你作为人世间的一枚奇瑰~



                           - 在二次元鼓励你的伙伴  远坂凛
                                      《Fate Stay/Night》
```
### Last. 结语
{% note 'themecolor' '暗梦' 'fa fa-commenting-o' %}
em......，这次的暑期解谜游戏再次正式落下了帷幕 ，虽然暗梦我说过解谜之后没有什么红包<br>
要说这其中的原因嘛，不是说像在 <a href="https://vinking.top" style="color:white;" target="_blank">@Vinking</a> 那边参与每年的新年游戏一样，解题后还有红包<br>
<strong><i>而是给旅行者们感受到拼搏后来自生活之外的静怡~ <sup>[毕竟祝福信里面也写到过，钱也换不来善良与友爱，好吧]</sup></i></strong><br>
Oray，暗梦我得继续制作我的游戏 《都市挚爱者物语》 啦，有些剧情及移动端适配还没做呢 <sup>[另外测试版里面的些许 Bug 也在修复中......]</sup>，那亲爱的旅行者们，回见咯~
{% endnote %}