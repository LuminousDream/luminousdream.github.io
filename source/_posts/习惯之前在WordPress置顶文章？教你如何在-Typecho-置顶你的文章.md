---
title: 习惯之前在WordPress置顶文章？教你如何在 Typecho 置顶你的文章
categories: 技术分享
tags:
  - Typecho
abbrlink: 7f22a087
date: 2022-10-27 15:09:00
---
Hi，I'm 暗梦，em......
这种开场白不知道说了多少遍了啦 (-.-;)y-~~~
记得去年的时候用的WordPress有那个置顶文章的选项，自从迁移到Typecho之后就没有这个选项了，那么如何给你的Typecho博客置顶你的文章呢？

#### I.设置置顶文章
编辑你想要置顶的文章，并在下面的自定义字段中新建一个名为toppost的，类型调到整数，字段值设为1保存即可，但是如此一来却没有出现在首页最顶端，那怎么办呢？

这里需要修改下index.php，这里是原来的结构。

```php
<?php 
  if ($this->have()): 
  while($this->next()): ?>
   ... <!-- 不同的主题在这里的内容都不同哈 -->
  <?php endwhile; ?>
  <?php endif; ?>
```

然而呢，先复制原来的结构，在粘贴到原来结构的上面去修改，那以暗梦我用的morecho主题为例

```php
<?php
//此处显示已置顶的文章
  if ($this->have()): 
  while($this->next()):
  if($this->fields->toppost == 1){  //在此处加入if语句，此处判断是否为置顶文章。?> 
  <div class="card card-post-list">
    <a href="<?php $categories->permalink(); ?>">
        <div class="post-title">
        <?php $this->title(); ?>
        </div>
        <?php if($this->fields->foldInIndex !== "true"): ?>
        <?php if(isset($this->fields->subtitle)): ?>
        <div class="post-subtitle">
            <?php $this->fields->subtitle(); ?>
        </div>
        <?php endif ?>
        <div class="post-content-preview">
            <?php $this->excerpt(100 , '...'); ?>
        </div>
        <div class="post-meta">
            <i data-feather="edit-3"></i> <?php $this->author(); ?>
            <i data-feather="calendar"></i> <?php $this->date('Y年m月d日'); ?>
            <i data-feather="clock"></i> <?php echo (string)mb_strlen(str_replace(PHP_EOL,'',strip_tags(preg_replace('/(<code.*?>[\s|\S]*?<\/code>)/', '', $this->content))),'utf-8'); echo ' 字' ?>
          </div>
        <?php endif ?>
    </a>
</div>
<?php }else{echo "";} //if语句末 ?> 
<?php endwhile; ?>
<?php endif; ?>

<?php 
//这里显示后面没有置顶的文章
  if ($this->have()): 
  while($this->next()):
  if($this->fields->toppost != 1){ //过滤置顶文章，防止后面显示的文章与首页最前面的文章重复 ?> 
  <div class="card card-post-list">
    <a href="<?php $categories->permalink(); ?>">
        <div class="post-title">
        <?php $this->title(); ?>
        </div>
        <?php if($this->fields->foldInIndex !== "true"): ?>
        <?php if(isset($this->fields->subtitle)): ?>
        <div class="post-subtitle">
            <?php $this->fields->subtitle(); ?>
        </div>
        <?php endif ?>
        <div class="post-content-preview">
            <?php $this->excerpt(100 , '...'); ?>
        </div>
        <div class="post-meta">
            <i data-feather="edit-3"></i> <?php $this->author(); ?>
            <i data-feather="calendar"></i> <?php $this->date('Y年m月d日'); ?>
            <i data-feather="clock"></i> <?php echo (string)mb_strlen(str_replace(PHP_EOL,'',strip_tags(preg_replace('/(<code.*?>[\s|\S]*?<\/code>)/', '', $this->content))),'utf-8'); echo ' 字' ?>
          </div>
        <?php endif ?>
    </a>
</div>
<?php }else{echo "";} //if语句末 ?> 
<?php endwhile; ?>
<?php endif; ?>
```

不过呢，如果你是让以前的文章置顶的话，你需要手动翻页到后面才能看到置顶的文章，这时候呢，你可以这样让你的置顶文章显示在首页第1页最前面，再来以暗梦我用的morecho主题为例哈 ♪( ´▽｀) 。

```php
<?php 
//此处显示已置顶的文章
  if ($this->_currentPage == 1){ // 判断是否在第1页的位置，是的话显示置顶文章。
  Typecho_Widget::widget('Widget_Contents_Post_Recent','pageSize=999')->to($categories);
  if ($categories->have()): 
  while($categories->next()):
  if($categories->fields->toppost == 1){ //判断是否为置顶文章 ?> 
  <div class="card card-post-list">
    <a href="<?php $categories->permalink(); ?>">
        <div class="post-title">
        <?php。$categories->title(); ?>
        </div>
        <?php if($categories->fields->foldInIndex !== "true"): ?>
        <?php if(isset($this->fields->subtitle)): ?>
        <div class="post-subtitle">
            <?php $categories->fields->subtitle(); ?>
        </div>
        <?php endif ?>
        <div class="post-content-preview">
            <?php。$categories->excerpt(100 , '...'); ?>
        </div>
        <div class="post-meta">
            <i data-feather="edit-3"></i> <?php $this->author(); ?>
            <i data-feather="calendar"></i> <?php $this->date('Y年m月d日'); ?>
            <i data-feather="clock"></i> <?php echo (string)mb_strlen(str_replace(PHP_EOL,'',strip_tags(preg_replace('/(<code.*?>[\s|\S]*?<\/code>)/', '', $categories->content))),'utf-8'); echo ' 字' ?>
          </div>
        <?php endif ?>
    </a>
</div>
<?php }else{echo "";} ?>
<?php endwhile; ?>
<?php endif; ?>
<?php }else{echo "";} ?>

<?php 
//这里显示后面没有置顶的文章
  if ($this->have()): 
  while($this->next()):
  if($this->fields->toppost != 1){ //过滤在首页最前面的置顶文章，防止翻页到后面显示的文章与首页最前面的文章重复?> 
  <div class="card card-post-list">
    <a href="<?php $categories->permalink(); ?>">
        <div class="post-title">
        <?php $this->title(); ?>
        </div>
        <?php if($this->fields->foldInIndex !== "true"): ?>
        <?php if(isset($this->fields->subtitle)): ?>
        <div class="post-subtitle">
            <?php $this->fields->subtitle(); ?>
        </div>
        <?php endif ?>
        <div class="post-content-preview">
            <?php $this->excerpt(100 , '...'); ?>
        </div>
        <div class="post-meta">
            <i data-feather="edit-3"></i> <?php $this->author(); ?>
            <i data-feather="calendar"></i> <?php $this->date('Y年m月d日'); ?>
            <i data-feather="clock"></i> <?php echo (string)mb_strlen(str_replace(PHP_EOL,'',strip_tags(preg_replace('/(<code.*?>[\s|\S]*?<\/code>)/', '', $this->content))),'utf-8'); echo ' 字' ?>
          </div>
        <?php endif ?>
    </a>
</div>
<?php }else{echo "";} ?>
<?php endwhile; ?>
<?php endif; ?>
```
