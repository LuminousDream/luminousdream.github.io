---
title: 如何给你的 Typecho / Hexo 文章添加短代码支持
categories: 技术分享
tags:
  - Typecho
  - Hexo
abbrlink: 3f5e9913
date: 2022-11-14 16:06:33
---

### I.Typecho 文章添加短代码支持

在之前使用 WordPress 的时候我们习惯于使用短代码来表示一段文字的重点，但是自从没有了 WordPress 的那些短代码插件或者自带短代码功能的插件之后，到了 Typecho 却变得有点不适应，无妨，暗梦我来讲讲如何让你的Typecho文章也支持短代码。

首先我们还是打开你博客的主题根目录，在 functions.php 添加下列代码，各位旅行者可以参考下。

```php
<?php
function myshortcode($text)
{
  $result = "";
  if(strstr($text,"[你指定的短代码1]"))
  {
    $result = str_replace("[你指定的短代码1]","<你要设置的HTML标签开头>",$text);
    $result = str_replace("[/你指定的短代码1]","</你要设置的HTML标签末尾>",$result);
  }
  if(strstr($text,"[你指定的短代码2]"))
  {
    $result = str_replace("[你指定的短代码2]","<你要设置的HTML标签开头>",$text);
    $result = str_replace("[/你指定的短代码2]","</你要设置的HTML标签末尾>",$result);
  }
  ...
  if(strstr($text,"[你指定的短代码n]"))
  {
    $result = str_replace("[你指定的短代码n]","<你要设置的HTML标签开头>",$text);
    $result = str_replace("[/你指定的短代码n]","</你要设置的HTML标签末尾>",$result);
  }
  return($text);
}
```

然后再打开 post.php 修改这一行代码即可。
```php
//<?php $this->context(); ?> 这里是原来的代码段
<?php echo(myshortcode($this->context)); ?> //修改为这一段代码即可
```
### II.Hexo 文章添加短代码支持

那么有旅行者会问暗梦我关于 Hexo 博客如何添加短代码，em ...... ，暗梦我这么说吧
它和 WordPress 的短代码不同，比方说：

```markdown
在 WordPress 的短代码：
[blockquote]
暗梦我是一名都市看客 & 吟游诗人，虽然没钱买域名和服务器，但不论如何，依旧在为自己的幻想之地，也就是为我的博客增添色彩，也是为旅行者们带来快乐。
[/blockquote]

在 Hexo 的短代码：
{% blockquote %}
暗梦我是一名都市看客 & 吟游诗人，虽然没钱买域名和服务器，但不论如何，依旧在为自己的幻想之地，也就是为我的博客增添色彩，也是为旅行者们带来快乐。
{% endblockquote %}
```
这段短代码的渲染结果如下：
{% blockquote %}
暗梦我是一名都市看客 & 吟游诗人，虽然没钱买域名和服务器，但不论如何，依旧在为自己的幻想之地，也就是为我的博客增添色彩，也是为旅行者们带来快乐。
{% endblockquote %}
那如果你想指定自己的短代码呢，诶嘿，首先我们需要在主题的 scripts 文件夹里面新建 shortcode.js 文件，添加下列代码：

```javascript
function note (args, content) {
    return `<div class="alert alert-primary">
	    <span class="alert-inner--text">` + content + 
	    `</span></div>`;
}

hexo.extend.tag.register('note', note, {ends: true});

/* 那么这个短代码参数设定好之后，就可以使用啦 ( =^_^= )~
比如上面名为 “note” 的短代码，用法是这样的 ......

{% note %}
暗梦我是一名都市看客 & 吟游诗人，虽然没钱买域名和服务器，但不论如何，依旧在为自己的幻想之地，也就是为我的博客增添色彩，也是为旅行者们带来快乐。
{% endnote %}

在文章上写好之后，就可以使用 hexo s 查看效果啦~，以下是渲染结果。 */
```

{% note %}
暗梦我是一名都市看客 & 吟游诗人，虽然没钱买域名和服务器，但不论如何，依旧在为自己的幻想之地，也就是为我的博客增添色彩，也是为旅行者们带来快乐。
{% endnote %}

当然，旅行者们也可以参考以下格式自定义自己的短代码：
```javascript

/*
   content: 短代码里面的文本内容
   args[n]: 短代码标签内的参数
*/
function 函数名 (args, content) {
    return `<h6>` + args[0] + `:` + args[1] + `</h6>
	    <p>` + content + `</p>`; // 各位旅行者们也可以自定义 return 里面的 HTML 代码
}

hexo.extend.tag.register('短代码名称', 函数名, {ends: true});

/* 用法是这样的：

{% 短代码名称 [短代码标签参数1] [短代码标签参数2] %}
em.......
暗梦作为一名都市看客 & 吟游诗人，我不只是在写博客，而且还有一只黑猫陪伴在暗梦我的身边，也许吧，有一只猫猫陪伴着暗梦我也挺开心哒。
{% end短代码名称 %}

*/
```
最后各位旅行者们可以自己对照一下 Hexo 官方文档中的 [标签插件](https://hexo.io/zh-cn/docs/tag-plugins) & [标签插件(API)](https://hexo.io/zh-cn/api/tag) 来自定义想要的短代码效果，愿旅行者们快快乐乐地生活，永远保持开心和积极的心态哈，诶嘿~

