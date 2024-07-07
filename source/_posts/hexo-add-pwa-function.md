---
title: 都市看客暗梦 の 给 Hexo 添加 PWA 支持的新思路
tags:
  - Hexo
categories:
  - 技术分享
abbrlink: 60bb5b1a
date: 2023-11-15 17:17:23
---

### First.前言
Hi，I'm 暗梦，最近了解到 PWA (Progressive Web App)，说是可以在离线的状态也能看博客，em......
> 暗梦：说它是 App 也不像是 App，它需要依赖 Chrome 使用，倒是和现在的微信小程序有点相似，但实际上 PWA 比微信小程序的出场时间还要早。

其实也就是改进用户体验的一种方案嘛，要说实现它的办法嘛，可以这么说：

  + <font color="orange">(Zero). 博客需要支持 HTTPS 协议 (使用 SSL 证书)，否则无法实现离线访问</font>
  + (I). 转换博客头像到 256x256 的大小且为 png 格式的图片
  + (II). 在博客根目录 (/[hexo_blog]/source 文件夹) 创建 mainfest.json 及 pwa_sw.js (用于实现 PWA Service Worker)
  + (III). 在 `<head>` 的前面及 `</body>` 的后面添加 PWA 加载函数

本以为暗梦我也认为这篇文章没什么好写的，但是后来暗梦我自己想到一条思路出来
可以通过 Hexo 的 生成器 (API) [[官方文档]](https://hexo.io/zh-cn/api/generator) 来自动生成 PWA 所需的文件，然后修改主题来加载 PWA
如此一来，只需要在主题的配置文件决定 PWA 的参数就行了，诶嘿~
那就讲讲暗梦我是这么做的吧，旅行者们在这里也可以有一个参考。

### I.修改主题的 _config.yml 文件
首先修改 /themes/[主题名称]/_config.yml 或者博客源文件的 _config.[主题名称].yml 文件，添加下列参数，各位旅行者们可以根据需求修改

```yml
pwa:
    enable: true
    pwa_offline_resource_list:
        - “/”
        - "/style.css"
        ... # 在这里可以自定义其他的静态文件用于离线缓存
    name: "博客名称"
    description: "博客描述"
    theme_color: "#000000"
    background_color: "#000000"
    start_url: "/"
    pwa_icon: /pwa_icon.png
    pwa_icon_size: "256x256"
```

### II.创建 pwa.js 文件
然后在 /themes/[主题名称]/scripts 中新建一个名为 pwa.js 的文件，并添加下列代码
用于在 pwa.enable 为 true 的前提下，每次生成静态文件的时候生成 PWA 所需的文件

```js
hexo.extend.generator.register('pwa_manifest', function(locals) {
    // PWA Mainfest (/manifest.json)
    const pwa_mf = {
            "lang": "zh-CN",
            "name": this.theme.config.pwa.name,
            "short_name": this.theme.config.pwa.name,
            "description": this.theme.config.pwa.description,
            "theme_color": this.theme.config.pwa.theme_color, 
            "background_color": this.theme.config.pwa.background_color,
            "start_url": this.theme.config.pwa.start_url,
            "Scope": "/",
            "display": "standalone",
            "orientation": "any",
            "icons": [{
                "src": this.theme.config.pwa.pwa_icon,
                "type": "image/png",
                "sizes": this.theme.config.pwa.pwa_icon_size,
            }]
    };
    if(this.theme.config.pwa.enable){return {path: 'manifest.json', data: JSON.stringify(pwa_mf)}}
})

hexo.extend.generator.register('pwa_sw', function(locals) {
    // 随机生成 PWA Service Worker 十六进制标识符
    var version_hex = '';
    var characters = '0123456789abcdef';
    for (var i = 0; i < 7; i++) {
        version_hex  += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // PWA Service Worker (/pwa_sw.js)
    const pwa_sw = `
    const version = "offline-cache-`+version_hex+`";
    const urlsToCache = `+JSON.stringify(this.theme.config.pwa.pwa_offline_resource_list)+`

    self.addEventListener('install', e => {
        e.waitUntil(
          caches.open(version).then(cache => {
            return cache.addAll(urlsToCache)
              .then(() => self.skipWaiting());
          })
        );
      });
      
      self.addEventListener('activate', function (e) {
        e.waitUntil(
          caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
              if (key !== version) {
                return caches.delete(key);
              }
            }));
          })
        );
        return self.clients.claim();
      });
      
      self.addEventListener('fetch', event => {
        event.respondWith(
          caches.open(version)
            .then(cache => cache.match(event.request, {ignoreSearch: true}))
            .then(response => {
              return response || fetch(event.request);
            })
        );
      });`;
    if(this.theme.config.pwa.enable){return {path: "/pwa_sw.js", data: pwa_sw}}
})
```

### III.修改主题以加载 PWA
#### (I). 对于 EJS 模板主题的修改方法
后续嘛就是其他博主的做法了，在 `<head>` 的前面 ~~(Tip:通常在 header.ejs 文件中)~~添加下列代码，但暗梦我用的博客主题嘛，因为主题的作者是用 EJS 模板制作的，所以嘛...

```php
<% if(theme.pwa.enable) { %>
		<link rel="manifest" href="/manifest.json">
<% } %>
```

最后在 `</body>` 的后面 ~~(Tip:通常在 footer.ejs 文件中)~~添加以下代码即可

```php
<% if(theme.pwa.enable) { %>
<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register("/pwa_sw.js")
                .then(function (registration) {
                    console.log('PWA Service Worker 注册成功 ');
                })
                .catch(function (err) {
                    console.log('PWA Service Worker 注册失败 ');
                });
         });
    }
</script>
<% } %>
```

#### (II). 对于 PUG 模板主题的修改方法
em...... 如果说是部分旅行者用的是 Butterfly 或者其他基于 PUG 模板制作的主题，则需要根据情况在 layout.pug 文件中添加下列代码的指定内容
> Tip: 实际情况需要旅行者们自行根据代码的结构，添加 / 删除代码的空格缩进，而不是 Tab 缩进。

```js
doctype html
html(lang=config.language)
...
  //- ▲ 载入 manifest.json 文件
  - if(theme.pwa.enable)
    link(rel='manifest', href='/manifest.json')
  //- ▲ EOF
  head
    ...
  body
    ...
    //- body 末尾
    //- ▲ 载入 PWA Service Worker (pwa_sw.js)
    - if (theme.pwa.enable)
      script.
        if ('serviceWorker' in navigator)
          window.addEventListener('load', function ()
            navigator.serviceWorker.register("/pwa_sw.js")
              .then(function (registration)
                console.log('PWA Service Worker 注册成功 ')
              )
              .catch(function (err)
                console.log('PWA Service Worker 注册失败 ')
              )
        )
    //- ▲ EOF
...
```
### IV.测试 PWA 功能
最后在终端键入 `hexo clean & hexo s` 指令进行测试 ，然后到这里要注意一个细节，测试的时候浏览器不要打开无痕模式，打开博客之后在地址栏会显示一个加号，如此一来就成功了，好吧。

> Tip: 如果想测试离线访问功能的话嘛，则可以在浏览器打开 开发者选项，然后在 Application -> Service workers 中，点开 Offline 复选框，然后刷新即可。
### Last.结语
em...... 
到这里之后，暗梦我也没什么可以跟旅行者们讲述的，那就可以 ~~直接部署~~ `hexo clean & hexo g & hexo d` 了 ，剩下的事儿，就交给星辰带来的奇迹吧，诶嘿~

>暗梦：不过说实在的，也没有多少个人博客在使用 PWA 这种功能
> *毕竟个人博客本来就需要有网络才能访问，即使是 PWA，也需要得到缓存之后才能说离线加载，好吧*

Oray，那暗梦我去给家里的猫猫做猫饭咯，亲爱的旅行者们，再会 |´・ω・)ノ
