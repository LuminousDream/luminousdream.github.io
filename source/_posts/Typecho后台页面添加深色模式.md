---
title: Typecho后台页面添加深色模式
categories: 技术分享
tags:
  - Typecho
abbrlink: 9edfc8c7
date: 2022-09-06 19:32:00
---
Hi ， 你们的都市看客兼吟游诗人暗梦又来啦，祝大家中秋节快乐哈。
em.....
总觉得Typecho自带的后台有点点不美观。
那这次还是来讲讲怎么给Typecho博客后台添加深色模式吧。

#### I.添加层叠样式表
首先呢，修改后台页面的目录添加一个深色模式的层叠样式表文件，先创建好原来层叠样式表的副本
> *(cp /admin/css/style.css /admin/css/style_dark.css)*

不过呢，要想让它实现深色模式的话呢......
这里需要修改一部分参数，请根据指定行数修改。

```css
  //深色模式背景 [位于文档开头]
  body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; background: #444; color: #fff; font-size: 87.5%; line-height: 1.5; }

  //网站概要深色模式优化 [位于第 249 ~ 251 行]
  .welcome-board { color: #999; font-size: 1.15em; }

  .welcome-board em { color: #fff; font-size: 2em; font-style: normal; font-family: Georgia, serif; }

  //Typecho Warp(列表表格)深色模式优化 [位于第 2326 行]
  .typecho-table-wrap { background:#444;color:#fff; padding: 30px;}

  //Typecho Warp(列表表格) 选中项 深色模式优化 [位于第 234 ~ 237 行]
  .typecho-list-table tbody tr:hover td { background-color: #6666; }
  .typecho-list-table tbody tr.checked td { background-color: #6666; }

  //按钮下拉菜单深色模式优化
  [位于第 105 行] -> .dropdown-menu { list-style: none; position: absolute; z-index: 2; left: 0; margin: 0; padding: 0; border: 1px solid #D9D9D6; background: #444;color:#fff; text-align: left; min-width: 108px; display: none; }

  [位于第 111 行] -> .dropdown-menu a { display: block; padding: 5px 12px; color: #666;color:#fff; }

  [位于第 113 行] -> .dropdown-menu a:hover { background: #6666; text-decoration: none !important; }

  //文章撰写页面深色模式优化 
  [位于第 459 行] -> .category-option ul { list-style: none; border: 1px solid #D9D9D6; padding: 6px 12px; max-height: 240px; overflow: auto; background: #444;color:#fff; border-radius: 2px; }

  [位于第 904 行] -> ul.token-input-list { list-style: none; margin: 0; padding: 0 4px; min-height: 32px; border: 1px solid #D9D9D6; cursor: text; z-index: 999; background: #444;color:#fff; clear: left; border-radius: 2px; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; }

  [位于第 909 行] -> li.token-input-token { padding: 0 6px; height: 27px; line-height: 27px;background: #444;color:#fff; cursor: default; font-size: .92857em; text-align: right; white-space: nowrap; }

  [位于第 431 行] -> #custom-field { border: 1px solid #D9D9D6;margin: 1em 0; padding: 10px 15px;background: #444;color:#fff;  }

  //深色模式编辑框 [位于第 24 行]
  input[type=text], input[type=password], input[type=email], textarea { background: #444;color:#fff; border: 1px solid #D9D9D6; padding: 7px; border-radius: 2px; box-sizing: border-box; }

  // 选择框深色模式底色优化 [位于第 58 行]
  select { background:#444;color:#fff;border: 1px solid #CCC; height: 28px; border: 1px solid #D9D9D6; }

  //部分按钮的深色模式优化

  [位于第 24 行] -> a.button:hover, a.balloon-button:hover { background-color: #6666; color: #fff; text-decoration: none; }

  [位于第 64 行] -> .btn, #ui-datepicker-div .ui-datepicker-current, #ui-datepicker-div .ui-datepicker-close { border: none; background:#444; cursor: pointer; border-radius: 2px; display: inline-block; padding: 0 12px; height: 32px; color: #666; vertical-align: middle; zoom: 1;border: 1px solid #CCC; color:#fff;}
```

#### II.添加深色模式切换按钮

**tip:切换 深色模式&浅色模式 需要刷新页面，请先保存好正在编辑的草稿 (文章/页面)。**

位于 /admin/menu.php 中的所有内容替换为以下内容

```php
<?php if (!defined('__TYPECHO_ADMIN__')) exit; ?>

<script>
function switchmode()
{
  const getCookie = (name) => document.cookie.match(`[;\s+]?${name}=([^;]*)`)?.pop();
  if(getCookie("admin_darkmode") !== "true")
  {
    document.cookie="admin_darkmode=true";
    location.reload();
  }else{
    document.cookie="admin_darkmode=false";
    location.reload();
  }
}
</script>

<div class="typecho-head-nav clearfix" role="navigation">
    <button class="menu-bar"><?php _e('菜单'); ?></button>
    <nav id="typecho-nav-list">
        <?php $menu->output(); ?>
    </nav>
    <div class="operate">
        <?php \Typecho\Plugin::factory('admin/menu.php')->navBar(); ?>
        <a class="darkmode_switch" onclick="switchmode();" id="darkmode_switch">深色模式切换</a>
        <a title="<?php
        if ($user->logged > 0) {
            $logged = new \Typecho\Date($user->logged);
            _e('最后登录: %s', $logged->word());
        }
        ?>" href="<?php $options->adminUrl('profile.php'); ?>" class="author"><?php $user->screenName(); ?></a>
         <a class="exit" href="<?php $options->logoutUrl(); ?>"><?php _e('登出'); ?></a>
         <a href="<?php $options->siteUrl(); ?>"><?php _e('网站'); ?></a>
    </div>    
</div>
```

#### III.实现深色模式切换
最后在位于 /admin/header.php 的 $header 进行修改
```php
<?php

if($_COOKIE["admin_darkmode"] == "true"){
    $header = '<link rel="stylesheet" href="' . $options->adminStaticUrl('css', 'normalize.css', true) . '">
    <link rel="stylesheet" href="' . $options->adminStaticUrl('css', 'grid.css', true) . '">
    <link rel="stylesheet" href="' . $options->adminStaticUrl('css', 'style_dark.css', true) . '">';
    }else{
    $header = '<link rel="stylesheet" href="' . $options->adminStaticUrl('css', 'normalize.css', true) . '">
    <link rel="stylesheet" href="' . $options->adminStaticUrl('css', 'grid.css', true) . '">
    <link rel="stylesheet" href="' . $options->adminStaticUrl('css', 'style.css', true) . '">';
}

?>
```

>这样一来，你的Typecho后台就可以支持深色模式啦。

