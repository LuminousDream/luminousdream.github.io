---
title: Re. 从零开始的 Linux SSH Term Blog 搭建
categories: 技术分享
tags:
  - Linux
  - Python
abbrlink: 6c7cded
date: 2022-06-17 13:29:00
---
### First.前言
<div class="mdui-hoverable shortcodestyle" style="background: #9dd7e8 !important;color: #03536b !important;text-indent: 0 !important;"><i class="fa fa-check-square"></i>&nbsp;&nbsp;
2022年上半年后，又迎来暑假的炎热，来讲讲如何搭建一个属于自己的TermBlog
<del datetime="2022-06-15T12:46:30+00:00">其实它是利用获取feed/atom订阅的原理哈，不一定能获取所有的文章。</del>
至于暗梦我为什么会这样想呢，因为在90年代那个时候互联网不发达的时候，某些高校会使用Telnet Term来作为在线BBS论坛，但是对于以前的Telnet属于明文传输，现在的SSH的加密传输方式也替代了Telnet，对于那些站点也被Web端所替代，作为经典的话也值得去怀念。
</div>

### I. OpenSSH服务端配置
首先你的ssh服务端由密码登录变更为密钥登录，然后呢

来参考下列的流程哈，诶嘿~

  + (I).使用 ssh-keygen 生成密钥 *(tip:前提是先创建一个单独的用户作为TermBlog的登录用户)*
  + (II). 修改 /etc/ssh/sshd_config 配置文件禁止密码登录
    + Ex:
    ```ini
    RSAAuthentication yes
    PubkeyAuthentication yes
    PermitRootLogin yes
    PasswordAuthentication no
    ```
  + (III).将指定用户和root的密钥下载到设备上之后重启ssh服务端
  + (IV). 测试root用户和指定用户的密钥登录 *(tip:root用户的密钥请妥善保管)*
    + [I]. 如果无法登录ssh，则需要回到 (I) 登录Vnc/tty重新配置密钥/配置
    + [II]. 如果成功使用密钥免密登录ssh，则继续下列流程 ...
      + {I}. 修改 /etc/passwd 或者使用 usermod 修改默认shell为你的shell批处理脚本
      Ex:
        + (I) /etc/passwd文件格式：`[用户名]:x:[uid]:[gid]::[根目录]:[默认shell/shell批处理脚本]`
        +  (II) usermod -s `[默认shell/shell批处理脚本]` `[用户名]`
        *(Tip：usermod仅能通过su或者tty登录到root用户才能使用，直接通过ssh登录到root用户会提示未找到命令)*
      + {II}. 禁止指定用户对sudo的使用 (visudo)
        + Ex: 禁止用户sudo到root `[用户名] ALL=(ALL:ALL) ALL,!/bin/su`
      + {III}. 开始编写TermBlog脚本 *(Tip: 如果想要调用Python脚本则也需要创建一个单独的shell批处理脚本作为默认shell)*
        + Ex:
        ```bash
        #!/bin/bash
        clear 
        python3 ~/termblog.py
        ```
      + {IV}. 测试SSH Term Blog
        + (I). 脚本报错则回到其 {III} 修改
        + (II). 若无问题，则搭建成功

### II.基于Python3 Feed阅读/过滤html标签部分代码
```python
    ## -*- coding:utf-8 -*-
    # Feed Reader By DarkDream
    # site:https://anmeng.asia
    import feedparser

    # 输出 Linux 终端颜色
    def PrintColor(color):
      if(color == "red"):
        return("\033[31m")
      elif(color == "green"):
        return("\033[32m")
      elif(color == "blue"):
        return("\033[34m")
      elif(color == "pup"):
        return("\033[35m")
      elif(color == "skyblue"):
        return("\033[36m")
      elif(color == "white"):
        return("\033[0m")

    ##过滤HTML中的标签
    # 将HTML中标签等信息去掉
    # @param htmlstr HTML字符串.
    def filter_tags(htmlstr):
      # 先过滤CDATA
      re_cdata = re.compile("//<!CDATA\[[>]∗//\]>", re.I) #匹配CDATA
      re_script = re.compile('<\s*script[^>]*>[^<]*<\s*/\s*script\s*>', re.I) # Script
      re_style = re.compile('<\s*style[^>]*>[^<]*<\s*/\s*style\s*>', re.I) # style
      re_br = re.compile('<br\s*?/?>') # 处理换行
      re_h = re.compile('</?\w+[^>]*>') # HTML标签
      re_comment = re.compile('<!--[^>]*-->') # HTML注释
      s = re_cdata.sub('', htmlstr) # 去掉CDATA
      s = re_script.sub('', s) # 去掉SCRIPT
      s = re_style.sub('', s) # 去掉style
      s = re_br.sub('\n', s) # 将br转换为换行
      s = re_h.sub('', s) # 去掉HTML 标签
      s = re_comment.sub('', s) # 去掉HTML注释
      # 去掉多余的空行
      blank_line = re.compile('\n+')
      s = blank_line.sub('\n', s)
      s = replaceCharEntity(s) # 替换实体
      return s

    ##替换常用HTML字符实体.
    # 使用正常的字符替换HTML中特殊的字符实体.
    # 你可以添加新的实体字符到CHAR_ENTITIES中,处理更多HTML字符实体.
    # @param htmlstr HTML字符串.
    def replaceCharEntity(htmlstr):
      CHAR_ENTITIES = {'nbsp': ' ', '160': ' ',
               'lt': '<', '60': '<',
               'gt': '>', '62': '>',
               'amp': '&', '38': '&',
               'quot': '"''"', '34': '"', }
      re_charEntity = re.compile(r'&#?(?P<name>\w+);')
      sz = re_charEntity.search(htmlstr)
      while sz:
        entity = sz.group() # entity全称，如>
        key = sz.group('name') # 去除&;后entity,如>为gt
        try:
          htmlstr = re_charEntity.sub(CHAR_ENTITIES[key], htmlstr, 1)
          sz = re_charEntity.search(htmlstr)
        except KeyError:
          # 以空串代替
          htmlstr = re_charEntity.sub('', htmlstr, 1)
          sz = re_charEntity.search(htmlstr)
      return htmlstr

    def repalce(s, re_exp, repl_string):
      return re_exp.sub(repl_string, s)


    def feedview(feedurl): #支持rss/rss2/atom等feed
      feed=feedparser.parse(feed)
      feed["feed"]["title"]
      topic=0
      while(True):
        i=os.system("clear")
        print(feed.feed.title)
        print(feed.feed.subtitle)
        print(PrintColor("red")+"本站共"+str(len(feed.entries))+"篇文章 | 您正在阅读第"+str(topic+1)+"篇文章"+PrintColor("white"))
        print("*-----------------------------------------------------------------------*")
        #print("标题："+feed.entries[topic].title)
        #print("URL："+feed.entries[topic].id)
        #print("发布时间："+feed.entries[topic].published)
        #print("作者："+feed.entries[topic].author)
        content=feed.entries[topic].content[0]['value']
        content = filter_tags(content) # 获取文章内容并去掉html标签
        #获取文章字数
        num_regex = re.compile(r'[0-9]')
        zimu_regex = re.compile(r'[a-zA-z]')
        hanzi_regex = re.compile(r'[\u4E00-\u9FA5]')
        num_list = num_regex.findall(content)
        zimu_list = zimu_regex.findall(content)
        hanzi_list = hanzi_regex.findall(content)
        total_num = len(num_list) + len(zimu_list) + len(hanzi_list)
        # 输出文章信息
        print(PrintColor("blue")+"["+feed.entries[topic].title+"] \n"+PrintColor("skyblue")+"[Writer In "+str(feed.entries[topic].published)+" By "+feed.entries[topic].author+"]"+PrintColor("pup")+" [总字数："+str(total_num)+" 字]"+PrintColor("white"))
        print()
        dyh="'"
        syh='"'
        #content=str(content).replace(dyh,syh)
        print(content)
        print("*--------------------------------EOF------------------------------------*")
        # 显示版权信息
        print(PrintColor("pup")+"*-----------------------------------------------------------------------*")
        print("# 商业转载请联系作者获得授权，非商业转载请注明出处。")
        print("# For commercial use, please contact the author for authorization. For non-commercial use, please indicate the source.")
        print("# 协议(License)：署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)")
        print("# 作者(Author)："+feed.entries[topic].author)
        print("# 链接(URL)："+feed.entries[topic].id)
        print("# 来源(Source)："+feed.feed.title)
        print("*-----------------------------------------------------------------------*"+PrintColor("white"))
        # 阅读器shell指令，不过你也可以像暗梦我那样用大写字母来表示，毕竟，有的时候也为了更方便简单。
        print("*[请键入字母] P(上一篇) / N(下一篇) R/Q(退出SSHTerm)*")
        print(PrintColor("green"))
        shell=input("[TermBlog]$ ")
        shell=shell.lower()
        print(PrintColor("white"))
        if(shell == "p"):
          if(topic &lt; 1): topic=0 print("提示：这已经是第一篇文章了！") Pause_PressAnyKey() i=os.system("clear") else: topic=topic-1 i=os.system("clear") elif(shell == "n"): if(topic &gt;= len(feed.entries)-1):
            topic=len(feed.entries)-1
           	print("提示：这已经是最后一篇文章了！")
           	Pause_PressAnyKey()
            i=os.system("clear")
          else:
            topic=topic+1
            i=os.system("clear")
        elif(shell == "r" or shell == "q"):
            i=os.system("clear")
            break # 退出阅读器
        else:
           	print("提示：无效指令！")
                i=os.system("clear")
```
...至于其他功能自由发挥，比如说IP记录功能，或者在终端上的小游戏都可以。
毕竟，代码在于折腾，只要有点bug，就接着折腾，在折腾的路途上领悟在其中，最后也能折腾出属于自己的璀璨星空。

em......

但如果您的代码以奇怪的方式，正常地运行了起来，就建议不要再动它了，好吗？毕竟你已经成功了。

### Last.结语

<div class="mdui-hoverable shortcodestyle" style="background: #9dd7e8 !important;color: #03536b !important;text-indent: 0 !important;"><i class="fa fa-check-square"></i>&nbsp;&nbsp;然后保存好先调试一下，没有问题再开放即可，另外也可以使用echo在shell批处理文件加入一段提示语，能让指定用户无法通过sftp进行文件传输<del datetime="2022-06-17T05:17:11+00:00">(会提示 Received message too long / Received too long packet length)</del>，建议和Web端同时开放，将密钥放在Web端提供下载。</div>
