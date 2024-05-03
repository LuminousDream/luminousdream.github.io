---
title: 暗梦的天空之琴
layout: piano
permalink: suzaku_piano.html
fontawesome_iconname: fa-music
english_name: "Suzaku · Piano"
---

<div class="mdui-tab mdui-tab-full-width" mdui-tab="">
  <a href="#info" class="mdui-ripple mdui-tab-active"><span><i class="fa fa-flag-o"></i>&nbsp;&nbsp;说明</span></a>
  <a href="#update-info" class="mdui-ripple"><span><i class="fa fa-sticky-note-o"></i>&nbsp;&nbsp;更新日志</span></a>
  <a href="#suzaku-piano-settings" class="mdui-ripple"><span><i class="fa fa-cog"></i>&nbsp;&nbsp;天空之琴设置</span></a>
</div>

<div id="info" class="mdui-p-a-2" style="">
        <font>注意：第一次加载界面时，预加载声音需要时间，等待预加载完成后即可按下琴键弹奏，谢谢~</font>
        <br>
        <del>或者使用FreePiano的小伙伴可以尝试下列键盘配置哈<br>em...... 就是在博客上放一个钢琴是不是觉得有点冷门 [o(*////▽////*)q] 。</del><br>
    <br>
    <button class="mdui-btn mdui-ripple mdui-ripple-white" onclick="mdui.snackbar({message:'<strong>天空之琴弹奏教程</strong><br>Q-U 表示1-7低音<br>A-J 表示1-7普通音高<br>Z-M 表示1-7高音<br><br><i>但在游戏《原神》的风物之诗琴中<br>Q-U则表示高音<br>Z-M表示低音，侵权删。</i><br><br><i><strong>tip:在暗梦写的天空之琴乐谱中<br>[中括号]包含的字母需要一起按。</i></strong>',buttonText: '知道啦～',timeout:0,position:'right-top'});"><i class="fa fa-sticky-note-o"></i> 弹奏说明</button>&nbsp;&nbsp;<button class="mdui-btn mdui-ripple mdui-ripple-white" onclick="window.open('/PianoConfig.html');"><i class="fa fa-keyboard-o"></i> FreePiano键盘配置</button>&nbsp;&nbsp;<button class="mdui-btn mdui-ripple mdui-ripple-white" onclick="window.open('/categories/天空之琴乐谱分享');"><i class="fa fa-music"></i> 暗梦的天空之琴乐谱分享</button>
</div>

<div id="update-info" class="mdui-p-a-2">

{% tl %}
{% tlnode "2023-12-17" "" %}
em...... 暗梦我再次优化了一下天空之琴代码 & 样式，并添加了一个小特性哈，诶嘿~<br>
<i>暗梦：这个特性嘛，就是在 “暗梦的天空之琴” 的页面，键盘弹奏按下的按键，在页面最底部的按键区域，对应的按键会高亮显示。<br><del>就是暗梦我觉得嘛，这个特性，是不是有点冷门呢 [梦之无语] (╯_╰) </del>。</i>
{% endtlnode %}

{% tlnode "2023-10-30" "" %}
这次暗梦我添加了一个 8bit 旋律，各位旅行者们可以在天空之琴设置中设置哈，诶嘿~<br>
<i>暗梦: em...... 其实是通过 Python 生成 21 个不同频率的 8 位方波数据 ，然后输出到声音文件，最后再对声音进行转换 & 压缩即可。</i>
{% endtlnode %}

{% tlnode "2023-07-09" "" %}
em......<br>
暗梦我优化了一下天空之琴的代码，声音会在按下琴键弹奏之前预加载，还美化了按钮的布局。
{% endtlnode %}

{% tlnode "2022-09-27" "" %}
抱歉，有时暗梦我会找一些钢琴简谱来弹奏，和天空之琴的乐谱有点不同哈 (˶‾ ⁻̫ ‾˵)，所以在天空之琴设置中添加了一个开关，可以在这个页面让下列的字母按钮变为传统简谱的按钮样式。
{% endtlnode %}

{% tlnode "2022-09-23" "" %}
将键盘弹奏的代码单独放在了一个js文件中，可以直接引入js文件到文章页面直接使用键盘弹奏。
{% endtlnode %}

{% tlnode "2022-08-25" "" %}
将声音压缩了一部分大小，解决了声音加载速度慢的问题，至于为什么不用对象存储或者 CDN 的话，很抱歉，真的不好用。
{% endtlnode %}

{% tlnode "2021-09-04" "" %}
在这里放了一个钢琴，就是这个，天空之琴<del>(事情回溯到 2021 年，当时暗梦我之前在国内搭建了我的第一个博客，并且在做 ICP 备案之前就写好了代码，就是按下按钮有延迟，加载声音会有点慢。)
{% endtlnode %}

{% endtl %}
</div>
<div id="suzaku-piano-settings" class="mdui-p-a-2" style="">
<i class="fa fa-music"></i> 天空之琴旋律 &nbsp;
<select class="mdui-select" id="select_piano_sound" mdui-select onchange="change_piano_sound();">
  <option value="1" selected>钢琴旋律 (默认)</option>
  <option value="2">复古 8bit 方波旋律</option>
</select>
<br>
<label class="mdui-switch">
  <input type="checkbox" id="legacy_piano_button" onchange="change_legacy_piano_button();">
  <i class="mdui-switch-icon"></i>
  &nbsp;<i class="fa fa-pencil"></i> 传统简谱按钮样式
</label>
</div>

<script>

  // 判断 & 设置天空之琴旋律
  if(localStorage['FantasyLand_DarkDream_Piano_Sound'] == "8bit_square_ware"){
    $("#select_piano_sound").val(2)
  }else{
    $("#select_piano_sound").val(1)
  }

  function change_piano_sound()
  {
    if($("#select_piano_sound").val() == 1)
    {
      load_piano_sound("/piano",1);
      localStorage['FantasyLand_DarkDream_Piano_Sound'] = "default"; 
    }else{
      load_piano_sound("/piano_8bit",0.3);
      localStorage['FantasyLand_DarkDream_Piano_Sound'] = "8bit_square_ware"; 
    }
  }

  // 设置天空之琴按钮样式
  function change_legacy_piano_button()
  {
    if(document.getElementById("legacy_piano_button").checked)
    {
      echo_suzaku_piano_button("number","piano_btn");
    }else{
      echo_suzaku_piano_button("char","piano_btn");
    }
  }
</script>

<div class="fliter_line"></div>
<div id="piano_btn">
</div>
<script>
  echo_suzaku_piano_button("char","piano_btn");
	enable_keypiano();
</script>
