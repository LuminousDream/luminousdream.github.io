/**
 * 暗梦的天空之琴 键盘演奏
 *
 * Author:暗梦先生呀~ 
 * My Blog:https://anmeng.asia
 * 
 */

 var src="";
 var pcdn="/piano"

// 初始化 & 预加载钢琴旋律 & 键位
const notes = [["01","Q","1."],["02","W","2."],["03","E","3."],["04","R","4."],["05","T","5."],["06","Y","6."],["07","U","7."],
                  ["1","A","1"],["2","S","2"],["3","D","3"],["4","F","4"],["5","G","5"],["6","H","6"],["7","J","7"],
                  ["10","Z",".1"],["20","X",".2"],["30","C",".3"],["40","V",".4"],["50","B",".5"],["60","N",".6"],["70","M",".7"]
                  ];
const audioFiles = {};
var is_HasButton_SuzakuPiano_Page = false;
var audio;

function load_piano_sound(folder,volume){
   notes.forEach(note => {
      audio = new Audio(folder+`/${note[0]}.mp3`);
      audio.volume = volume;
      audioFiles[note[0]] = audio;
      audio.load();
    });
}

if(localStorage['FantasyLand_DarkDream_Piano_Sound'] == "8bit_square_ware"){
   load_piano_sound("/piano_8bit",0.3);
}else{
   load_piano_sound(pcdn,1);
   localStorage['FantasyLand_DarkDream_Piano_Sound'] = "default"; 
}

// 键盘弹奏
var keypiano_keyup = (e) => {
   if (e.keyCode == 81) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_Q").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 87) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_W").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 69) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_E").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 82) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_R").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 84) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_T").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 89) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_Y").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 85) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_U").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 65) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_A").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 83) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_S").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 68) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_D").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 70) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_F").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 71) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_G").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 72) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_H").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 74) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_J").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 90) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_Z").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 88) {
     if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_X").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 67) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_C").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 86) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_V").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 66) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_B").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 78) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_N").removeClass("suzaku_piano_button_pressed");}
   }if (e.keyCode == 77) {
      if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_M").removeClass("suzaku_piano_button_pressed");}
   }
}

var keypiano = (e) => {
  if (e.keyCode == 81) {
    audioFiles['01'].currentTime = 0;
    audioFiles['01'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_Q").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 87) {
    audioFiles['02'].currentTime = 0;
    audioFiles['02'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_W").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 69) {
    audioFiles['03'].currentTime = 0;
    audioFiles['03'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_E").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 82) {
    audioFiles['04'].currentTime = 0;
    audioFiles['04'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_R").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 84) {
    audioFiles['05'].currentTime = 0;
    audioFiles['05'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_T").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 89) {
    audioFiles['06'].currentTime = 0;
    audioFiles['06'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_Y").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 85) {
    audioFiles['07'].currentTime = 0;
    audioFiles['07'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_U").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 65) {
    audioFiles['1'].currentTime = 0;
    audioFiles['1'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_A").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 83) {
    audioFiles['2'].currentTime = 0;
    audioFiles['2'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_S").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 68) {
    audioFiles['3'].currentTime = 0;
    audioFiles['3'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_D").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 70) {
    audioFiles['4'].currentTime = 0;
    audioFiles['4'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_F").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 71) {
    audioFiles['5'].currentTime = 0;
    audioFiles['5'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_G").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 72) {
    audioFiles['6'].currentTime = 0;
    audioFiles['6'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_H").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 74) {
    audioFiles['7'].currentTime = 0;
    audioFiles['7'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_J").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 90) {
    audioFiles['10'].currentTime = 0;
    audioFiles['10'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_Z").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 88) {
   audioFiles['20'].currentTime = 0;
   audioFiles['20'].play();
   if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_X").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 67) {
    audioFiles['30'].currentTime = 0;
    audioFiles['30'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_C").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 86) {
    audioFiles['40'].currentTime = 0;
    audioFiles['40'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_V").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 66) {
    audioFiles['50'].currentTime = 0;
    audioFiles['50'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_B").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 78) {
    audioFiles['60'].currentTime = 0;
    audioFiles['60'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_N").addClass("suzaku_piano_button_pressed");}
 }if (e.keyCode == 77) {
    audioFiles['70'].currentTime = 0;
    audioFiles['70'].play();
    if(is_HasButton_SuzakuPiano_Page){$(".suzaku_pianokey_M").addClass("suzaku_piano_button_pressed");}
 }
}

function disable_keypiano(){
  $(window).unbind("keyup",keypiano_keyup)
  $(window).unbind("keydown",keypiano)
}

function enable_keypiano(){
   $(window).bind("keyup",keypiano_keyup)
   $(window).bind("keydown",keypiano)
}
 
 function echo_inject_tips()
 {
     var tips = `
     <div class="suzaku_piano_card" style="padding:10px 10px 10px 10px;margin-bottom:15px;">
       诶嘿，你好，亲爱的旅行者 (^-^)<br>
       <span style="font-size:14px;opacity: 0.54;">tip:暗梦的天空之琴已引入到此页面，可以在这个页面使用键盘弹奏乐曲啦<br>
       <a id="piano_info" style="color: var(--themecolor-light) !important;"><i class="fa fa-flag"></i>&nbsp;&nbsp;弹奏说明</a><i> | </i>&nbsp;<a href="/suzaku_piano#update-info" style="color: var(--themecolor-light) !important;"><i class="fa fa-sticky-note-o"></i>&nbsp;&nbsp;更新日志</a></span>
     </div>
       `; 
     document.getElementById("darkdream_inject_tips").innerHTML = tips;
     document.getElementById("piano_info").onclick=function() {mdui.snackbar({message:'<strong>天空之琴弹奏教程</strong><br>Q-U 表示1-7低音<br>A-J 表示1-7普通音高<br>Z-M 表示1-7高音<br><br><i>但在游戏《原神》的风物之诗琴中<br>Q-U则表示高音<br>Z-M表示低音，侵权删。</i><br><br><i><strong>tip:在暗梦写的天空之琴乐谱中<br>[中括号]包含的字母需要一起按。</i></strong>',buttonText: '知道啦～',timeout:0,position:'right-top'});};
     is_HasButton_SuzakuPiano_Page = false;
 }
 
 function echo_suzaku_piano_button(button_id,elementid)
 {
   var suzaku_piano_lowsound_buttons_group = document.createElement("p");
   var suzaku_piano_normalsound_buttons_group = document.createElement("p");
   var suzaku_piano_highsound_buttons_group = document.createElement("p");
   if(button_id == "char")
   {
     document.getElementById(elementid).innerHTML = "";
     notes.slice(0, 7).forEach(note => { suzaku_piano_lowsound_buttons_group.innerHTML += `<input class="btn btn-primary pianosinglebtn suzaku_pianokey_`+note[1]+`" type="button" style="width:55px;" value="`+note[1]+`" onclick="audioFiles['`+note[0] +`'].currentTime = 0;audioFiles['`+note[0]+`'].play();">`; });
     notes.slice(7, 14).forEach(note => { suzaku_piano_normalsound_buttons_group.innerHTML += `<input class="btn btn-primary pianosinglebtn suzaku_pianokey_`+note[1]+`" type="button" style="width:55px;" value="`+note[1]+`" onclick="audioFiles['`+note[0]+`'].currentTime = 0;audioFiles['`+note[0]+`'].play();">`; });
     notes.slice(14, 21).forEach(note => { suzaku_piano_highsound_buttons_group.innerHTML += `<input class="btn btn-primary pianosinglebtn suzaku_pianokey_`+note[1]+`" type="button" style="width:55px;" value="`+note[1]+`" onclick="audioFiles['`+note[0]+`'].currentTime = 0;audioFiles['`+note[0]+`'].play();">`; });
     document.getElementById(elementid).innerHTML = "<p>"+suzaku_piano_lowsound_buttons_group.innerHTML + "</p>" +"<p>" + suzaku_piano_normalsound_buttons_group.innerHTML + "</p>" +"<p>" + suzaku_piano_highsound_buttons_group.innerHTML+ "</p>"
   } else if(button_id == "number") {
      document.getElementById(elementid).innerHTML = "";
      notes.slice(0, 7).forEach(note => { suzaku_piano_lowsound_buttons_group.innerHTML += `<input class="btn btn-primary pianosinglebtn suzaku_pianokey_`+note[1]+`" type="button" style="width:55px;" value="`+note[2]+`" onclick="audioFiles['`+note[0]+`'].currentTime = 0;audioFiles['`+note[0]+`'].play();">`; });
      notes.slice(7, 14).forEach(note => { suzaku_piano_normalsound_buttons_group.innerHTML += `<input class="btn btn-primary pianosinglebtn suzaku_pianokey_`+note[1]+`" type="button" style="width:55px;" value="`+note[2]+`" onclick="audioFiles['`+note[0]+`'].currentTime = 0;audioFiles['`+note[0]+`'].play();">`; });
      notes.slice(14, 21).forEach(note => { suzaku_piano_highsound_buttons_group.innerHTML += `<input class="btn btn-primary pianosinglebtn suzaku_pianokey_`+note[1]+`" type="button" style="width:55px;" value="`+note[2]+`" onclick="audioFiles['`+note[0]+`'].currentTime = 0;audioFiles['`+note[0]+`'].play();">`; });
      document.getElementById(elementid).innerHTML += "<p>"+suzaku_piano_lowsound_buttons_group.innerHTML + "</p>" +"<p>" + suzaku_piano_normalsound_buttons_group.innerHTML + "</p>" +"<p>" + suzaku_piano_highsound_buttons_group.innerHTML+ "</p>"
   }
   is_HasButton_SuzakuPiano_Page = true;
 }