---
title: Hexo主题Nexmoe添加公告小工具组件及自定义社交区域图标
categories: 技术分享
tags:
  - Hexo
abbrlink: 3d8e3836
date: 2022-08-01 21:53:00
---
Hi，暗梦我又来咯。这次又来讲讲关于博客主题的美化教程
不过这次呢不讲WordPress，来讲讲Nexmoe这个简洁化的主题
<div class="mdui-hoverable shortcodestyle" style="background: #9dd7e8 !important;color: #03536b !important;text-indent: 0 !important;"><i class="fa fa-check-square"></i>&nbsp;&nbsp;tips:这是Hexo上的版本。并非是Typecho的那种哈。
<del> [em...... 暗梦我记得，我那一个朋友(来到这里就是旅行者啦)<a href="https://vinking.top" target="_blank">Vinking</a> 以前用过的，现在他换主题了]</del></div>


### I.添加公告小工具组件

首先新建一个文件为 /themes/nexmoe/layout/_widget/gonggao.ejs
```javascript
    <% if (site.posts.length){ %>
      <div class="nexmoe-widget-wrap">
        <h3 class="nexmoe-widget-title">公告</h3>
        <div class="nexmoe-widget">
          <!-- 此处作为列表方式输出，避免公告内容样式会输出到边框最左侧。-->
          <ul><li><%- options.tip %></li></ul>
        </div>
      </div>
    <% } %>
```
然后在 /config.nexmoe.yml 调用即可。
```yaml
    - name: gonggao
      enable: true
      options: 
        tip: '[公告内容，你也可以输入HTML代码]'
```
### II.自定义社交区域图标
#### (I).原版方案 [css图标]
```javascript
  -  位于 config.nexmoe.yml 中修改 
     iconlib: [此处修改为您的附加图标库链接，图标库其实就是你的css图标库链接]
  -  位于 social 小工具组件中添加一项自定义社交区域图标
     options: 
        social:
            [自定义社交区域名称]:
                - [自定义社交区域图标链接]
                - icon-QQ #您的自定义附加图标名称
                - rgb(255, 0, 0) #自定义图标颜色
                - rgba(255, 0, 0, .1) #自定义图标背景颜色 (默认与图标颜色相同)
```

#### (II). 修改 /themes/nexmoe/layout/_widget/social.ejs [<em>如果需要用图片作为图标的话...</em>]
```javascript
    <div class="nexmoe-widget-wrap">
   	<div class="nexmoe-widget nexmoe-social">
		<% for (name in options.social) { %><a
			class="mdui-ripple"
			href="<%- url_for(options.social[name][0]) -%>"
			target="_blank"
			mdui-tooltip="{content: '<%= name %>'}"
			style="
				color: <%= options.social[name][2] %>;
				background-color: <%= options.social[name][3] %>;
			"
		>
			<i class="nexmoefont <% if (options.social[name][1]){ %><%= options.social[name][1] %><%} else{ %><%= 'icon-unorderedlist' %><% } %>">
                        </i></a>
                <% } %>

                        <!-- 此处添加您自己的社交图标 -->
                        <a
			href="[自定义社交区域图标链接]"
			target="_blank"
			mdui-tooltip="{content: '[自定义社交区域图标名称]'}"
		        >
			<img class="mdui-chip-icon" src="[您的 jpg/png 图标路径]">
                        </i></a>

	</div>
```
然后保存并重新部署即可。
加油吧，旅行者们，愿你们在都市中都能拥有属于自己并让你们自己感到惬意的生活。
