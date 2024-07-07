---
title: WordPress主题Sakurairo移动端页面菜单美化
categories: 技术分享
tags:
  - WordPress
abbrlink: 3c3f650c
date: 2022-08-08 15:25:00
---
这次又来来聊聊关于Sakurairo的那些事，就是暗梦我认为呢
em...... 
总觉得这个主题在移动端的菜单稍稍有点单调。

好吧，这次呢来给Sakurairo的移动端菜单做个美化，不过这里呢需要引入MDUI这个框架。

首先找到页尾的那个文件 <del>(footer.php)</del>，修改id为mo-nav的那个div。
```php
    <div id="mo-nav" style="overflow-y: scroll;opacity:0.85;">
    <!-- tip:给菜单设置透明度和滚动条 -->

    <link rel="stylesheet" href="https://unpkg.com/mdui@1.0.2/dist/css/mdui.min.css"/>
    <script src="https://unpkg.com/mdui@1.0.2/dist/js/mdui.min.js"></script>
    <!-- 引入MDUI -->

	
    <ul class="mdui-list">
      <li class="mdui-list-item mdui-ripple">
         <!-- 圆角头像 -->
         <center><img style="border-radius:100%;overflow:hidden;" width="50%" src="icon.jpg"/></center> 
      </li>
    </ul>
			<!-- 搜索框美化 -->
			<form class="m-search-form" method="get" action="<?php echo home_url(); ?>" role="search">
			<div class="m-search">
				<input class="mdui-textfield-input" type="search" name="s" placeholder="想要找点什么呢？" required />
			</div>
			</form>
			
			<!-- 添加图标按钮 (每行最多可以添加6个) -->
			<center>
			<?php if (current_user_can('level_10')) { ?> <!-- 登录后的图标 (你也可以替换为MDUI的 Material图标，你可以去看看开发文档) -->
				<button class="mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple">
					<a class="mdui-icon material-icons fa fa-book" title="撰写文章" href="/wp-admin/edit.php"></a>
				</button>
				<button class="mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple">
					<a class="mdui-icon material-icons fa fa-link" title="添加友链" href="/wp-admin/link-add.php"></a>
				<button class="mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple">
					<a class="mdui-icon material-icons fa fa-coffee" title="进入后台" href="/wp-admin"></a>
				</button>
				<button class="mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple">
					<a class="mdui-icon material-icons fa fa-server" title="PhpMyAdmin" href="/mysql"></a>
				</button>
				<button class="mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple">
					<a class="mdui-icon material-icons fa fa-rss" title="Feed订阅" href="/?feed=atom"></a>
				</button>
				<button class="mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple">
					<a class="mdui-icon material-icons fa fa-key" title="登出" href="/wp-login.php?action=logout"></a>
				</button>
			<?php } else { ?> <!-- 访客的图标 (你又也可以替换为MDUI的 Material图标，等等，暗梦是不是刚说过？) -->
				<button class="mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple">
					<a class="mdui-icon material-icons fa fa-rss" title="Feed订阅" href="/?feed=atom"></a>
				</button>
				<button class="mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple">
					<a class="mdui-icon material-icons fa fa-user" title="登录后台" href="/wp-admin"></a>
				</button>
			<?php } ?>

			</center>
			
			<div class="mdui-divider"></div>
			<!-- 添加公告组件 -->
			<?php if (iro_opt('bulletin_board_icon', 'true')): ?>
			<div class="mdui-ripple" style="border-style: dotted;margin:20px;border-radius:5px;overflow: hidden;white-space: normal;">
			<h4>&nbsp;·&nbsp;公告</h4>
			&nbsp;<?php echo iro_opt('bulletin_text'); ?>
			</div>
			<?php endif ?>
			<!-- 美化菜单 -->
                       <div class="mdui-ripple" style="border-style: dotted;margin:20px;border-radius:5px;overflow: hidden;white-space: normal;"><?php wp_nav_menu( array( 'depth' => 2, 'theme_location' => 'primary', 'container' => false ) ); ?></div>
			<!-- 后面呢你可以添加自定义组件 -->
                        <div class="mdui-ripple" style="border-style: dotted;margin:20px;border-radius:5px;overflow: hidden;white-space: normal;">
                        <h4>&nbsp;&nbsp;[自定义组件标题]</h4> <!--此处前面添加两个空格避免标题位置输出到最左侧边缘-->
                        [组件内容，你可以在这里输入你自定义的HTML/PHP代码段]
                        </div>
			
			<!-- tip:此处为了美观，添加换行符 -->
			</br>
			
	</div><!-- m-nav-center end -->
```

<div class="mdui-hoverable shortcodestyle" style="background: #9dd7e8 !important;color: #03536b !important;text-indent: 0 !important;"><i class="fa fa-check-square"></i>&nbsp;&nbsp;最后稍微调整一下即可，祝好运。</div>
[MDUI开发文档](https://mdui.org/docs)
