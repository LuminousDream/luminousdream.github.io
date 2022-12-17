/**
 * 暗梦的天空之琴 键盘演奏
 *
 * Author:暗梦先生呀~ 
 * My Blog:https://darkace.xyz
 * 
 */

var src="";
var audio="";
//var pcdn="https://cdn.jsdelivr.net/gh/LuminousDream/DarkDreamZone/audio/";
var pcdn="/"

window.addEventListener("keydown", function(e) {
             if (e.keyCode == 81) {
              src=pcdn+"piano/01.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 87) {
              src=pcdn+"piano/02.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 69) {
              src=pcdn+"piano/03.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 82) {
              src=pcdn+"piano/04.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 84) {
              src=pcdn+"piano/05.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 89) {
              src=pcdn+"piano/06.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 85) {
              src=pcdn+"piano/07.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 65) {
              src=pcdn+"piano/1.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 83) {
              src=pcdn+"piano/2.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 68) {
              src=pcdn+"piano/3.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 70) {
              src=pcdn+"piano/4.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 71) {
              src=pcdn+"piano/5.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 72) {
              src=pcdn+"piano/6.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 74) {
              src=pcdn+"piano/7.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 90) {
              src=pcdn+"piano/10.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 88) {
              src=pcdn+"piano/20.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 67) {
              src=pcdn+"piano/30.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 86) {
              src=pcdn+"piano/40.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 66) {
              src=pcdn+"piano/50.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 78) {
              src=pcdn+"piano/60.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }if (e.keyCode == 77) {
              src=pcdn+"piano/70.mp3";
              audio = src;
              audio = new Audio(audio);
              audio.play();
            }
        }, false);

function echo_inject_tips()
{
    var tips = `
<ul class="mdui-list">
  <li class="mdui-list-item mdui-ripple">
    <div class="mdui-list-item-content">
      <div class="mdui-list-item-title mdui-list-item-one-line">诶嘿，你好，亲爱的旅行者 (^-^)</div>
      <div class="mdui-list-item-text mdui-list-item-two-line">
      tip:暗梦的天空之琴已引入到此页面，可以在这个页面使用键盘弹奏乐曲啦<br>
      <a id="piano_info" style="color:blue;">弹奏说明</a><i> | </i><a href="https://darkace.xyz/suzaku_piano.html#update-info" style="color:blue;">更新日志</a>
      </div>
    </div>
  </li>
</ul>
    `;
    document.write(tips);
    document.getElementById("piano_info").onclick=function() {mdui.snackbar({message:'<strong>天空之琴弹奏教程</strong><br>Q-U 表示1-7低音<br>A-J 表示1-7普通音高<br>Z-M 表示1-7高音<br><br><i>但在游戏《原神》的风物之诗琴中<br>Q-U则表示高音<br>Z-M表示低音，侵权删。</i><br><br><i><strong>tip:在暗梦写的天空之琴乐谱中<br>[中括号]包含的字母需要一起按。</i></strong>',buttonText: '知道啦～',timeout:0,position:'right-top'});};
}

function change_echo_suzaku_piano_button(button_id,elementid)
{
  if(button_id == "char")
  {
    document.getElementById(elementid).innerHTML = "";
    document.getElementById(elementid).innerHTML = `
    <div id="pianobtn">
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="Q" onclick="new Audio('/piano/01.mp3').play()">
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="W" onclick="new Audio('/piano/02.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="E" onclick="new Audio('/piano/03.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="R" onclick="new Audio('/piano/04.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="T" onclick="new Audio('/piano/05.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="Y" onclick="new Audio('/piano/06.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="U" onclick="new Audio('/piano/07.mp3').play()"/>
<div>
&nbsp;<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="A" onclick="new Audio('/piano/1.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="S" onclick="new Audio('/piano/2.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="D" onclick="new Audio('/piano/3.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="F" onclick="new Audio('/piano/4.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="G" onclick="new Audio('/piano/5.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="H" onclick="new Audio('/piano/6.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="J" onclick="new Audio('/piano/7.mp3').play()"/>
</div>
<div>
&nbsp;<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="Z" onclick="new Audio('/piano/10.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="X" onclick="new Audio('/piano/20.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="C" onclick="new Audio('/piano/30.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="V" onclick="new Audio('/piano/40.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="B" onclick="new Audio('/piano/50.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="N" onclick="new Audio('/piano/60.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="M" onclick="new Audio('/piano/70.mp3').play()"/>
</br>
</br>
</div>
    `;
  } else if(button_id == "number")
  {
    document.getElementById(elementid).innerHTML = "";
    document.getElementById(elementid).innerHTML = `
    <div id="pianobtn">
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="1." onclick="new Audio('/piano/01.mp3').play()">
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="2." onclick="new Audio('/piano/02.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="3." onclick="new Audio('/piano/03.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="4." onclick="new Audio('/piano/04.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="5." onclick="new Audio('/piano/05.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="6." onclick="new Audio('/piano/06.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="7." onclick="new Audio('/piano/07.mp3').play()"/>
<div>
&nbsp;<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="1" onclick="new Audio('/piano/1.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="2" onclick="new Audio('/piano/2.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="3" onclick="new Audio('/piano/3.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="4" onclick="new Audio('/piano/4.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="5" onclick="new Audio('/piano/5.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="6" onclick="new Audio('/piano/6.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="7" onclick="new Audio('/piano/7.mp3').play()"/>
</div>
<div>
&nbsp;<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value=".1" onclick="new Audio('/piano/10.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value=".2" onclick="new Audio('/piano/20.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value=".3" onclick="new Audio('/piano/30.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value=".4" onclick="new Audio('/piano/40.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value=".5" onclick="new Audio('/piano/50.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value=".6" onclick="new Audio('/piano/60.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value=".7" onclick="new Audio('/piano/70.mp3').play()"/>
</br>
</br>
</div>
    `;
  }
}

function echo_suzaku_piano_button(button_id)
{
  if(button_id == "char")
  {
    document.write(`
    <div id="pianobtn">
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="Q" onclick="new Audio('/piano/01.mp3').play()">
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="W" onclick="new Audio('/piano/02.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="E" onclick="new Audio('/piano/03.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="R" onclick="new Audio('/piano/04.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="T" onclick="new Audio('/piano/05.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="Y" onclick="new Audio('/piano/06.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="U" onclick="new Audio('/piano/07.mp3').play()"/>
<div>
&nbsp;<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="A" onclick="new Audio('/piano/1.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="S" onclick="new Audio('/piano/2.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="D" onclick="new Audio('/piano/3.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="F" onclick="new Audio('/piano/4.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="G" onclick="new Audio('/piano/5.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="H" onclick="new Audio('/piano/6.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="J" onclick="new Audio('/piano/7.mp3').play()"/>
</div>
<div>
&nbsp;<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="Z" onclick="new Audio('/piano/10.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="X" onclick="new Audio('/piano/20.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="C" onclick="new Audio('/piano/30.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="V" onclick="new Audio('/piano/40.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="B" onclick="new Audio('/piano/50.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="N" onclick="new Audio('/piano/60.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="M" onclick="new Audio('/piano/70.mp3').play()"/>
</br>
</br>
</div>
    `
    );
  } else if(button_id == "number")
  {
    document.write(`
    <div id="pianobtn">
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="1." onclick="new Audio('/piano/01.mp3').play()">
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="2." onclick="new Audio('/piano/02.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="3." onclick="new Audio('/piano/03.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="4." onclick="new Audio('/piano/04.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="5." onclick="new Audio('/piano/05.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="6." onclick="new Audio('/piano/06.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="7." onclick="new Audio('/piano/07.mp3').play()"/>
<div>
&nbsp;<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="1" onclick="new Audio('/piano/1.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="2" onclick="new Audio('/piano/2.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="3" onclick="new Audio('/piano/3.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="4" onclick="new Audio('/piano/4.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="5" onclick="new Audio('/piano/5.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="6" onclick="new Audio('/piano/6.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value="7" onclick="new Audio('/piano/7.mp3').play()"/>
</div>
<div>
&nbsp;<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value=".1" onclick="new Audio('/piano/10.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value=".2" onclick="new Audio('/piano/20.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value=".3" onclick="new Audio('/piano/30.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value=".4" onclick="new Audio('/piano/40.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value=".5" onclick="new Audio('/piano/50.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value=".6" onclick="new Audio('/piano/60.mp3').play()"/>
<input class="mdui-btn mdui-btn-raised mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple" id="pianosinglebtn" type="button" style="width:11.5%;" value=".7" onclick="new Audio('/piano/70.mp3').play()"/>
</br>
</br>
</div>
    `
    );
  }
}
