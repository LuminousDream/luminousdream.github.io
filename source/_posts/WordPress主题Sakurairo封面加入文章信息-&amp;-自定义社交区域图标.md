---
title: WordPress主题Sakurairo封面加入文章信息 &amp; 自定义社交区域图标
categories: 技术分享
tags:
  - WordPress
abbrlink: c3464ddc
date: 2022-06-05 21:57:00
---
<center><h3>I.封面加入文章信息</h3></center>
打开网站主题根目录，在 ./layouts/imgbox.php 文件中
<?php if (iro_opt('infor_bar_style') === 'v2') : ?>前添加以下代码

    <?php
    $count_tag=wp_count_terms('post_tag'); //获取现有标签云数量

    //通过所有分类目录遍历循环获取分类目录数量
    $cat = get_categories(); 
    $count_cat="";
    foreach ($cat as $c)
    {
    $count_cat = $count_cat + 1;
    }

    $count = wp_count_posts()->publish; //获取已发布的文章数量
    ?>

    <section class="finfo" style="overflow-x: scroll;"><?php
    echo "<font>文章</br>".$count."</font>";
    echo "<font>分类目录</br>".$count_cat."</font>";
    echo "<font>标签云</br>".$count_tag."</font>";

    //获取站点总阅读量(有必要的话可以添加)
    $x = 0;
    for($x = 0;$x < count(get_posts('numberposts='.$count));$x++)
    {
    $read_total = $read_total + get_post_views(get_posts('numberposts='.$count)[$x]->ID);
    }
    $read_total = fans_format($read_total); 
    echo "<font>总阅读量</br>".$read_total."</font>";

    //tip: get_lastpostdate('server',[post => 文章 ,shuoshuo => 说说]);
    $last_date = date('Y-n-j',strtotime(get_lastpostdate('server','post'))); //获取文章最后发布时间
    echo "<font>最近一次更新</br>".$last_date."</font>";
    ?>
    </section>
    </pre>

然后保存好文件，刷新下看效果
Em......
是不是少了什么东西？
对了，暗梦我好像把样式表给忘了 ∑(°Д°；≡；°д°)


    <style>
      .finfo font{
      margin: 10px;
      background-image: linear-gradient( 135deg, #FAB2FF 10%, #1904E5 100%); 
      //渐变色布局，你可以修改自己的十六进制颜色码
      border: none;
      color: white;
      padding: 10px;
      font-size:10px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.6s;
      outline: none;
    }

    .finfo font:hover{
      box-shadow: 0 10px 20px 0 rgba(47,55,213,0.3);
      background-position: right;
      transform: scale(1.05);
    }
    </style>

放到代码前面就可以了。

II.自定义社交区域图标
自从Jsdelivr在国内无法在正常使用时，在上面的一些资源都不能正常显示(它们官方的社交区域图标包也是在jsdelivr里面的)，或者有部分人觉得官方提供的社交区域图标包不美观，想要自己换一个图标，那，暗梦来带你们看看是怎么自己更换图标的。

首先在网站根目录里准备好你自己准备的图标(格式为png，对图片大小没有什么限制)
    |
    *--- prearrow.png (左箭头图标)
    *--- nextarrow.png (右箭头图标)
    *--- qq.png (QQ图标)
    *--- wangyiyun.png (网易云图标)
    *--- [其他可用的图标 Ex:github,csdn,bilibili等]
<del datetime="2022-06-05T13:55:59+00:00">[当然，你也可以自己放一些自定义名字的图标。]</del>

然后打开主题的根目录内，修改 ./layouts/all_opt.php ，将 social_display_icon值改为您图标包的路径
```php
$social_display_icon = 'https://[你的域名]/[图标包文件夹]/';

//下列是旧版主题的方案，因为在新版的Sakurairo中此方案失效

$all_opt = [
    'bili' => [
        'link' => iro_opt('bili', ''),
        'icon' => '[html img标签]',
        'title' => 'bilibili',
    ], ...
```
在新版Sakurairo中，也有办法自定义自己的社交区域图标包，位于 ./layouts/imgbox.php
将img标签中src参数<?=$social_display_icon?>中的内容进行修改

<del datetime="2022-06-05T13:39:20+00:00">或者你也可以不必理会，因为我们呢已经提前改了这个值，所以可以这样
Ex: <?=$social_display_icon?>/xx.png
</del>

    <?php
    include(get_stylesheet_directory().'/layouts/all_opt.php');
    $text_logo = iro_opt('text_logo');
    $print_social_zone = function() use ($all_opt,$social_display_icon):void{
    // 左箭头
    if (iro_opt('cover_random_graphs_switch', 'true')):?>
        <li id="bg-pre"><img src="[您图标包中单独的图标位置]" loading="lazy" alt="<?=__('Previous','sakurairo')?>"/></li>
    <!-- 注意不是图标包的目录，这里是指单独的图标文件，Ex:/iro[根据您自己的图标包路径的为主]/prearrow.png -->
    <?php
    endif;
    // 微信
    if (iro_opt('wechat')):?>
        <li class="wechat"><a href="#" title="WeChat"><img loading="lazy" src="[您图标包中单独的图标位置 (Ex:/iro/wechat.png)]" /></a>
            <div class="wechatInner">
                <img loading="lazy" src="<?=iro_opt('wechat', '')?>" alt="WeChat">
            </div>
        </li>
    <?php
    endif;
    // 大体(all_opt.php)
    foreach ($all_opt as $key => $value):
        if (!empty($value['link'])):
            // 显然 这里的逻辑可以看看all_opt的结构（
            $img_url = $value['img'] ?? ($social_display_icon . ($value['icon'] ?? $key) . '.png');
            $title = $value['title'] ?? $key;
            ?>
            <li><a href="<?=$value['link'];?>" target="_blank" class="social-<?=$value['class'] ?? $key?>" title="<?=$title?>"><img alt="<?=$title?>" loading="lazy" src="<?=$img_url?>" /></a></li> //这里会根据您设置里的信息自动获取图标包中的图标，这里不需要去修改，只要先前修改了$social_display_icon这个值，Ex:QQ图标 => /图标包目录/qq.png。
        <?php
        endif;
    endforeach;
    // 邮箱
    if (iro_opt('email_name') && iro_opt('email_domain')):?>
        <li><a onclick="mail_me()" class="social-wangyiyun" title="E-mail"><img loading="lazy"
        alt="E-mail"
                    src="[您图标包中单独的图标位置 (Ex:/iro[根据您自己的图标包路径的为主]/mail.png)]" /></a></li>
    <?php
    endif;

    // 此处为您自己的自定义社交方式按钮(tip:推荐不要再用自带设置里的自定义社交方式，因为它不支持JavaScript/PHP语法，比如要用SweetAlert作为提示)
        <li>
        <!-- 在此处填写您的JavaScript/PHP语句(a标签触发事件) Ex: -->
        <a onclick="JavaScript语句"  title="[您的自定义社交方式标题]">
        <img loading="lazy" alt="self_social" src="[您图标包中单独的图标位置 (Ex:/iro[根据您自己的图标包路径的为主]/everysocial.png)]" />
        </a></li>

    // 右箭头
    if (iro_opt('cover_random_graphs_switch', 'true')):?>
        <li id="bg-next"><img loading="lazy" src="[您图标包中单独的图标位置 (Ex:/iro[根据您自己的图标包路径的为主]/nextarrow.png)]" alt="<?=__('Next','sakurairo')?>"/></li>
    <?php endif;
    }
    ?>
