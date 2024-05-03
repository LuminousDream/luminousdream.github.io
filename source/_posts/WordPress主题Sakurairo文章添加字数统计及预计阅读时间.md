---
title: WordPress主题Sakurairo文章添加字数统计及预计阅读时间
categories: 技术分享
tags:
  - WordPress
abbrlink: f9910d43
date: 2022-07-07 21:00:00
---
Hi，暗梦我又来咯，说真的，最近呢天气太热，让我们难以静下心来思考，都不知道写什么
除非有空调嘛，空调能带来徐徐凉爽的同时电表也在飞速运转着，虽然没汽车发动机的转速那么夸张。

Oray，这次又是Sakurairo主题的美化教程哈，嘻嘻，来讲讲在文章顶部如何添加当前文章的总字数及预计阅读时间

先进入主题根目录修改php文件，但这个文件分为两个部分。
./tpl/content-single.php [设置特色图片，在新版本已失效，转为 ./inc/theme_plus.php]
./tpl/single-image.php [不设置特色图片]

    <?php
    // 在 ./tpl/single-image.php 中添加下列两个函数
    //文章字数统计
    function count_words ($text) {  
        global $post;  
        if ( '' == $text ) {  
            $text = $post->post_content;  
            if (mb_strlen($output, 'UTF-8') < mb_strlen($text, 'UTF-8')) $output .= ' 本文章字数 ' . 
    mb_strlen(preg_replace('/\s/','',html_entity_decode(strip_tags($post->post_content))),'UTF-8') . ' 字';  
            return $output;  
        }  
    }
    // 计算文章预计阅读时间
    function lmsim_read_time($content){
        $text = trim(strip_tags( get_the_content()));
        $text_num = mb_strlen($text, 'UTF-8');
        $read_time_min = ceil($text_num/400);
        $read_time_hour = read_time_min / 60; //计算小时
        $content = "";
        if(read_time_hour >= 1) //除非不足小时仅显示分钟
        {
          $content = '预计阅读时间 <span>' . $read_time_hour . '</span> 小时' .'<span>' . $read_time_min . '</span> 分钟' . $content;
        }
        else
        {
          $content = '预计阅读时间 <span>' . $read_time_min . '</span> 分钟' . $content;
        }
        return $content;
    }
    ?>

    <!--  修改entry-census这一行 -->
    <p class="entry-census">Writer By <f onclick='window.open("' . 
    esc_url(get_author_posts_url(get_the_author_meta('ID'),get_the_author_meta( 'user_nicename' ))) . '");'><?php the_author($post->post_author);echo "</f>"; ?>&nbsp;·&nbsp;<?php echo poi_time_since(strtotime($post->post_date_gmt)); ?> &nbsp;·&nbsp; <?php echo get_post_views(get_the_ID()).' '. _n('View','Views',get_post_views(get_the_ID()),'sakurairo')/*次阅读*/?> &nbsp;·&nbsp; <?php echo count_words($text); ?> &nbsp;·&nbsp; <?php echo lmsim_read_time($content);?></p>

    <!-- -------------------------------------------------------------------------------------------------------------------------------------------------------- -->
    <!--  [./inc/theme_plus.php] 需要覆盖 the_headPattern 函数，不能添加外部函数 -->

    <?php
    function the_headPattern(){
      $t = ''; // 标题
      $op=""; //本文章总字数
      $readtime=""; //预计阅读时间

      //获取本文章总字数
      global $post;  
      if ( '' == $text ) {  
        $text = $post->post_content;  
        if (mb_strlen($op, 'UTF-8') < mb_strlen($text, 'UTF-8')) $op .= ' 本文章字数 ' . mb_strlen(preg_replace('/\s/','',html_entity_decode(strip_tags($post->post_content))),'UTF-8') . ' 字';          
      }  
  
      //获取预计阅读时间
      //$text = trim(strip_tags( get_the_content())); 此语句无效，无法获取预计阅读时间
      $text = $post->post_content; //修改为此函数获取预计阅读时间
      $text_num = mb_strlen($text, 'UTF-8');
      $read_time_min = ceil($text_num/400);
      $read_time_hour = read_time_min / 60; //计算小时
      $readtime = "";
      if(read_time_hour >= 1) //除非不足小时仅显示分钟
      {
        $readtime = '预计阅读时间 <span>' . $read_time_hour . '</span> 小时' .'<span>' . $read_time_min . '</span> 分钟' . $readtime;   
      }
      else
      {
        $readtime = '预计阅读时间 <span>' . $read_time_min . '</span> 分钟' . $readtime;
      }
  
      $full_image_url = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'full');
      if(is_single()){
    $full_image_url = !empty($full_image_url) ? $full_image_url[0] : null;
    if (have_posts()) : while (have_posts()) : the_post();
    $center = 'single-center';
    $header = 'single-header';
    //$ava = iro_opt('personal_avatar', '') ? iro_opt('personal_avatar', '') : get_avatar_url(get_the_author_meta('user_email'));
        $edit_this_post_link = get_edit_html();
    $t .= the_title( '<h1 class="entry-title">', '</h1>', false);
    $t .= '<span class="toppic-line"></span><p class="entry-census"><span><a href="'. esc_url(get_author_posts_url(get_the_author_meta('ID'),get_the_author_meta( 'user_nicename' ))) .'"><img src="https://darkace.xyz/icon.jpg"></a></span><span><a href="'. esc_url(get_author_posts_url(get_the_author_meta('ID'),get_the_author_meta( 'user_nicename' ))) .'">'. get_the_author() .'</a></span><span class="bull">·</span>'. poi_time_since(get_post_time('U', true),false,true) .'<span class="bull">·</span>'. get_post_views(get_the_ID()) .' '._n("View","Views",get_post_views(get_the_ID()),"sakurairo")/*次阅读*/.' · '.$op.' · '.$readtime.$edit_this_post_link.'</p>';
	endwhile; endif;
      }elseif(is_page()){
    $full_image_url = !empty($full_image_url) ? $full_image_url[0] : null;
    $t .= the_title( '<h1 class="entry-title">', '</h1>', false);
      }elseif(is_archive()){
    $full_image_url = z_taxonomy_image_url();
    $des = category_description() ? category_description() : ''; // 描述
    $t .= '<h1 class="cat-title">'.single_cat_title('', false).'</h1>';
    $t .= ' <span class="cat-des">'.$des.'</span>';
      }elseif(is_search()){
    $full_image_url = get_random_bg_url();
    $t .= '<h1 class="entry-title search-title"> '.sprintf( __( "Search results for \" %s \"","sakurairo" ), get_search_query()) ./*关于“ '.get_search_query().' ”的搜索结果*/'</h1><p>在本站没找到你所需要的答案？</br>点这里找<a href="http://bama.baidu.com/s?wd='.get_search_query().'" target="_blank">度娘</a></p>';
     }
      if(!iro_opt('patternimg')) $full_image_url = false;
      if(!is_home() && $full_image_url) : ?>
      <div class="pattern-center-blank"></div>
      <div class="pattern-center <?php if(is_single()){echo $center;} ?>">
        <div class="pattern-attachment bg lazyload" style="background-image: url(<?php echo iro_opt('load_out_svg'); ?>)" data-src="<?php echo $full_image_url; ?>"> </div>
        <header class="pattern-header <?php if(is_single()){echo $header;} ?>"><?php echo $t; ?></header>
      </div>
      <?php else:
    echo '<div class="blank"></div>';
      endif;
    }
    ?>