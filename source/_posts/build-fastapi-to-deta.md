---
title: Re. 从零开始的 FastAPI 探索之旅 の Deta 篇
tags:
  - Python
categories: 技术分享
abbrlink: 9a15a626
date: 2023-06-28 21:45:39
---

### First. 前言
Hi，I'm 暗梦，自从暗梦我用 Deta 搭建了博客留言板的评论系统之后
突然想着 Deta 除了能部署 Waline 这种使用 Node.js 开发的评论系统，而且还可以部署使用 Python 开发的程序。
无妨，就来讲讲如何在 Deta 搭建 FastAPI 这个测试项目哈~

### I.使用 Space-CLI 搭建项目
首先需要在 [Deta](https://deta.space) 登录 Canvan (Tip: 可以把 Deta 的 Canvan 理解为 Deta 的后台就好了嘛，诶嘿~)，然后点击 Builder，最后点击 “Get started Building” 之后，根据提示下载 Space-CLI 即可。

根据官网的提示，总共有三个步骤
  + 下载 & 安装 Space-CLI 
  + 新建项目 (键入 space new 之后再输入项目名称即可。)
  + 部署项目 (准备好项目文件之后键入 space push 即可。)

{% note orange 'Tip' 'fa fa-info-circle'%}
不过最近发现在 Deta 的 Canvan 退出登录之后，访问项目域名会重定向到 Deta 的登录页面，登录后才能访问项目。<br>
这么说吧，如果根据上述三个步骤部署的话嘛，那么这个项目的类型为 Dev，还必须在终端键入 space publish 公开才能访问。<br>
但这里说的公开是，你的项目会出现在 Deta 的 Discovery 上面，让任何人都可以部署你的项目，是这样的意思。<br>
好吧，作为测试的话，每次访问项目的时候，还是要自己在 Deta 登录才行呢 [梦之无奈] ╮(๑•́ ₃•̀๑)╭ <br>
<i>当然，如果旅行者们确实需要搭建一个自用的 API 接口在自己的博客使用的话嘛。<br>
可以在项目文件夹中 Spacefile 文件的 micros 项里面添加一行 `public: true` 即可。</i>
{% endnote %}

虽说如此简单，但在部署之前，还需要进入项目文件夹修改下 Spacefile 文件哈 (Tip: 没有这个文件也可以自己创建一个。)：

```yaml
micros:
  - name: fastapi-deta # Tip: 此处需要与新建的项目名称相同。
    src: .
    engine: python3.9
    run: uvicorn main:app
    public: true # Tip: 如果是需要搭建自用的 API 接口的话则需要加上此项。
```

然后按照以下格式准备好 main.py & requirements.txt 文件，最后部署即可。
```python
from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "你好，亲爱的旅行者，I'm 暗梦，这里是正在测试中的 FastAPI 项目。"}

@app.get("/items/{item_id}")
def read_item(item_id):
    return {"item_id": item_id}
```

```txt
fastapi
uvicorn[standard]
```

### II. 测试 FastAPI
然后在终端键入 space push，等待部署完成后会看到一个 Deta 生成的项目域名，在浏览器访问会看到一段 Json 数据：

```json
{"message": "你好，亲爱的旅行者，I'm 暗梦，这里是正在测试中的 FastAPI 项目。"}
```

如此以来就搭建成功啦，不过 FastAPI 还有一些进阶的用法。

### III. FastAPI 的进阶用法
#### (I). FastAPI の 路径参数
先来说路径参数哈，比如说，暗梦我如果说在项目域名后面添加 `/items/5` ，则会看到这段 Json 数据：
```json
{"item_id":5}
```

但如果暗梦我将 items 改为非 int 类的值，比方说 `/items/anmeng` 也会显示对应的 `item_id` 。
但如果 main.py 的 `read_item(item_id)` 函数定义 `item_id`  为 `int` ，则会报错，因为它有数据校验功能，会得到这段 Json 数据：
```json
{
    "detail": [
        {
            "loc": [
                "path",
                "item_id"
            ],
            "msg": "value is not a valid integer",
            "type": "type_error.integer"
        }
    ]
}
```

#### (II). FastAPI の 查询参数
然后嘛，暗梦我再讲最后一个功能，就是 FastAPI 的查询函数，关于其他的可以自行查看 FastAPI 的官方文档。
那查询函数又是怎么实现的呢？ 暗梦我来举个例子，先改一下 main.py 文件：

```python
from fastapi import FastAPI
app = FastAPI()
# 一段存储 Json 的数组
items_db = [{"name": "暗梦先生呀~","desc":"人生如戏，故事如诗。"}, {"name": "Vinking","desc":"一个安静的地方"}, ... ]

@app.get("/")
def read_root():
    return {"message": "你好，亲爱的旅行者，I'm 暗梦，这里是正在测试中的 FastAPI 项目。"}

@app.get("/items/{item_id}")
def read_item(item_id):
    return {"item_id": item_id}

@app.get("/items/")
async def read_item(skip: int = 0, limit: int = 10):
    return items_db[skip : skip + limit]
```

然后重新部署，最后在项目域名后面添加 `/items` 即可查询数据，会得到一段 Json 数据：
```python
{
  {
   {"name": "暗梦先生呀~","desc":"人生如戏，故事如诗。"},
   {"name": "Vinking","desc":"一个安静的地方"},
    ...
  }
}
```

### Last. 结语
<div class="post-outdated-info"><i class="fa fa-info-circle" aria-hidden="true"></i> 
Tip: 本结语由 AI 生成，请各位旅行者们注意甄别。
</div>

通过本文的介绍，我们了解到了如何在 Deta 上搭建 FastAPI 项目，并实现了基础的功能以及进阶的用法。
FastAPI 是一个高性能的 Python Web 框架，它的出现让 Python 开发者可以在 Web 开发中获得更好的体验和性能。
希望本文章能够帮助读者更好地了解和使用 FastAPI 和 Deta，让开发更加高效和愉快。

<div class="post-outdated-info"><i class="fa fa-info-circle" aria-hidden="true"></i> 
Tip: 以下结语的续写由暗梦亲自撰写。
</div>
{% note red 'Tip' 'fa fa-warning' %}
em ...... ，虽然暗梦我也才刚了解 Deta 没有多久的时间，<strong>但还是跟旅行者们说一下哈，搭建的项目不能违反法律法规，切记！</strong>
{% endnote %}
好啦，暗梦我就去陪猫猫玩咯，各位旅行者们，再会，并祝旅行者们暑假快乐~