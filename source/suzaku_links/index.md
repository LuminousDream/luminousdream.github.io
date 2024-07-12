---
title: 友人帐
layout: friends
fontawesome_iconname: fa-address-book
english_name: "Suzaku · Links"
---

{% note %}
<i class="fa fa-star"></i>&nbsp;&nbsp;诶嘿，旅行者，要来一起去探索世界吗，欢迎您，来自异乡的旅行者。
{% endnote %}

<div class="mdui-progress">
  <div class="mdui-progress-indeterminate mdui-follow-argon-color"></div>
</div>
</br>

<div class="mdui-tab mdui-tab-full-width mdui-theme-pink-accent" mdui-tab>
  <a href="#suzaku_addlink_rule" class="mdui-ripple"><span><i class="fa fa-sticky-note-o"></i>&nbsp;&nbsp;友链申请条件</span></a>
  <a href="#fantasyland_info" class="mdui-ripple"><span><i class="fa fa-address-card-o"></i>&nbsp;&nbsp;本站信息</span></a>
  <a href="#friends_list" class="mdui-ripple"><span><i class="fa fa-user"></i>&nbsp;&nbsp;友人帐 · 正篇 </span></a>
</div>

<div id="suzaku_addlink_rule" class="mdui-p-a-2">

{% note default %}<i>I.&nbsp;<i class="fa fa-link"></i>&nbsp;&nbsp;需已添加本站为友链，且贵站类型为个人博客。</i>{% endnote %}
{% note red %}<strong>II.&nbsp;<i class="fa fa-gavel"></i>&nbsp;&nbsp;站内无低俗色情、政治敏感内容，且内容没有违反中国法律法规。<br><i>em ...... ，暗梦我会不定期抽查通过友链申请的旅行者们，不符合要求的友链将会被删除，且恕不另行通知。<br></i></strong>{% endnote %}
{% note green %}III.&nbsp;<i class="fa fa-github"></i>&nbsp;&nbsp;可添加 Github(Gitee / Coding) Pages / Vercel / Netlify 托管的静态站点，但请贵站使用 HTTPS，谢谢。{% endnote %}
{% note orange %}IV.&nbsp;<i class="fa fa-pencil"></i>&nbsp;&nbsp;修改 / 申请友链请移步 <a href="/liuyanban" style="color:white;">留言板</a>，或者发送新友链到我的邮箱，标题为 “修改博客友链 / 申请博客友链”。{% endnote %}

</div>

<div id="fantasyland_info" class="mdui-p-a-2">

<blockquote>
<ul>
        <li>Name: FantasyLand の 暗梦</li>
        <li>Link: https://anmeng.asia </li>
        <li>description: 人生如戏，故事如诗。</li>
        <li><strong>avatar: https://anmeng.asia/icon.jpg</strong></li>
        <li><i><strong>siteshot <span class="badge badge-warning badge-pill">可选</span> : https://anmeng.asia/mineblog_siteshot.png</strong></li></i>
<ul>
</blockquote>
</div>

<div id="friends_list" class="mdui-p-a-2">
<div class="admonition shadow-sm admonition-info"><div class="admonition-title"><i class="fa fa-address-book"></i>&nbsp;&nbsp;Suzaku · Harem
<a onclick="goto_random_blog_link(blogLinks);" id="goto_random_blog_link_button" style="float:right;font-size:14px;"><i class="fa fa-random"></i>&nbsp;&nbsp;随机访问</a>
</div><div class="admonition-body">
<div class="friend-links-simple">
<div class="row" id="suzaku_harem">
<!-- 友链列表 -->

</div>
</div>
</div>

</div>

<div class="admonition shadow-sm admonition-grey"><div class="admonition-title"><i class="fa fa-eject"></i>&nbsp;&nbsp;Missing · Traveler</div><div class="admonition-body">

<div class="friend-links-simple">
<div class="row" id="missing_traveler" style="filter: grayscale(.6);">
<!-- 失联友链列表 -->
<ul>
<li>暂无失联友链</li>
</ul>
</div>
</div>
</div></div>

</div>


<style>
.lazyload-style-1
{
  height:100%;
  width:100%;
}

.friend-links
{
  margin:auto;
}

.friend-link-description,
.friend-link-tags
{
  font-size: 14px;
  color:#000000;
}

html.darkmode .friend-link-description,
html.darkmode .friend-link-tags
{
  font-size: 14px;
  color:#ffffff;
}

</style>

<!-- 友链列表 -->
<script>
var blogLinks = [
  {
    name: "FantasyLand の 暗梦",
    link: "https://anmeng.asia",
    description: "人生如戏，故事如诗。",
    avatar: "/icon.jpg",
    type: "tech + life",
    linkstatus: "ok"
  },
  {
    name: "Kira Blog",
    link: "https://kira.cool",
    description: "大概会有你感兴趣的",
    avatar: "/static/avatar/kira.cool.webp",
    type: "tech",
    linkstatus: "ok"
  },
  {
    name: "Vinking",
    link: "https://vinking.top",
    description: "一个安静的地方",
    avatar: "/static/avatar/vinking.top.webp",
    type: "tech + life",
    linkstatus: "ok"
  },
  {
    name: "Pinpe 的云端",
    link: "https://pinpe.top",
    description: "一个属于自己的云朵。",
    avatar: "/static/avatar/pinpe.top.webp",
    type: "tech + life",
    linkstatus: "ok"
  },
  {
    name: "竹春廿柒",
    link: "https://mojinxi.cn",
    description: "相视而笑，莫逆于心。",
    avatar: "/static/avatar/mojinxi.cn.webp",
    type: "life",
    linkstatus: "ok"
  },
  {
    name: "半截の诗",
    link: "https://sweetjing.cc",
    description: "保持热爱，奔赴山海。",
    avatar: "https://q1.qlogo.cn/g?b=qq&amp;nk=1486823198&amp;s=640",
    type: "life",
    linkstatus: "ok"
  },
  {
    name: "梦落の小屋",
    link: "https://blog.dreamfall.cn",
    description: "因为不可能，所以才值得相信",
    avatar: "/static/avatar/mengluo.webp",
    type: "tech",
    linkstatus: "ok"
  }
];

// Fisher-Yates shuffle 算法打乱数组 (用于随机顺序显示友链)
function shuffle_bloglinks() {
  for (var i = blogLinks.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    if (j === 0) { //指定位置数组不打乱，而是放回原位。
      continue;
    }
    var temp = blogLinks[i];
    blogLinks[i] = blogLinks[j];
    blogLinks[j] = temp;
  }
}



// 访问随机友链
function goto_random_blog_link(arr)
{
  var randomNumber = Math.floor(Math.random() * (arr.length));
  var randomBlog = arr[randomNumber];
  while(randomBlog.name == "FantasyLand の 暗梦")
  {
      randomNumber = Math.floor(Math.random() * (arr.length));
      randomBlog = arr[randomNumber];
  }

  while(randomBlog.linkstatus == "missing"){
    randomNumber = Math.floor(Math.random() * (arr.length));
    randomBlog = arr[randomNumber];
  }

  mdui.snackbar({message: '各位旅行者注意了，梦之幻想 列车即将进站......<br>本次列车前往&nbsp;『&nbsp;'+randomBlog.name+'&nbsp;』&nbsp;，我是你们的临时列车长暗梦~ <br><br>关于这个地方的描述为：<br>『 '+randomBlog.description+' 』 <br><br>请各位旅行者们对号入座，最后祝您旅途愉快~<br><br><i>Tip: 如果此友链有违规内容，请联系暗梦我删除。</i>',position: 'right-top',buttonText: 'GO',onButtonClick: function(){
	window.open(randomBlog.link);
  },});
}

// 显示友链
function show_blog_links()
{
  //通过 Fisher-Yates shuffle 算法来打乱数组，可以达到随机顺序显示友链的效果。
  shuffle_bloglinks();
  $("#suzaku_harem").html("");
  //$("#missing_traveler").html("");
  blogLinks.forEach((item) => {
    var bloglinks_list; //友链列表
    var missing_bloglinks_list; //失联友链列表
    var blogtype; // 博客类型 (技术 or 生活?)
    switch (item.type){
      case "tech":
        blogtype = '<span class="badge badge-warning badge-pill" style="margin-right:5px;"><i class="fa fa-code" aria-hidden="true" /></i>技术</span>';
        break;
      case "life":
        blogtype = '<span class="badge badge-success badge-pill" style="margin-right:5px;"><i class="fa fa-envira" aria-hidden="true" /></i>生活</span>';
        break;
      case "tech + life":
        blogtype = '<span class="badge badge-primary badge-pill" style="margin-right:5px;"><i class="fa fa-book" aria-hidden="true" /></i>技术 & 生活</span>';
        break;
    }
    if(item.linkstatus == "ok"){
    bloglinks_list = `
          <div class="link mb-2 col-lg-4 col-md-6">
				  <div class="card shadow-sm">
					<div class="d-flex">
						<div class="friend-link-avatar">
							<img src="${item.avatar}" class="icon bg-gradient-secondary rounded-circle text-white no-fancybox" style="pointer-events: none;">
						</div>
						<div class="pl-3" style="width:100%;">
							<div class="friend-link-title title text-primary"><a target="_blank" href="${item.link}">${item.name}</a>
              <p class="friend-link-description">${item.description}</p>
              <div style="display:flex;justify-content: space-between;">
              <a style="float:right; margin-left: 10px;">${blogtype}<span class="badge badge-success badge-pill"><i class="fa fa-lock" aria-hidden="true" /></i>SSL</span></a>
              <a href="${item.link}" target="_blank" style="float:right; margin: 0px 10px;">
              <i class="fa fa-angle-right" style="font-weight: bold;"></i></a>
              </div>
						</div>
						</div>
					</div>
				</div>
			</div>
    `;
    }else{
      missing_bloglinks_list = `
          <div class="link mb-2 col-lg-4 col-md-6">
				  <div class="card shadow-sm">
					<div class="d-flex">
						<div class="friend-link-avatar">
							<img src="${item.avatar}" class="icon bg-gradient-secondary rounded-circle text-white no-fancybox" style="pointer-events: none;">
						</div>
						<div class="pl-3" style="width:100%;">
							<div class="friend-link-title title text-primary"><a target="_blank" href="${item.link}">${item.name}</a>
              <p class="friend-link-description">${item.description}<br><span style="color:#666666"><i class="fa fa-clock-o"></i><i>${item.missing_info}</i></span></p>
              <a href="${item.link}" target="_blank" style="float:right; margin-right: 10px;">
              <i class="fa fa-angle-right" style="font-weight: bold;"></i></a>
						</div>
						</div>
					</div>
				</div>
			</div>
    `;
    }
    $("#suzaku_harem").append(bloglinks_list);
    $("#missing_traveler").append(missing_bloglinks_list);
  });
}
show_blog_links();
</script>
