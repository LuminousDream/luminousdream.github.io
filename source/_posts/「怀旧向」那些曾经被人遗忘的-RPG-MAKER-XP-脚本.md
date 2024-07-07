---
title: 「怀旧向」那些曾经被人遗忘的 RPG MAKER XP 脚本
categories: 技术分享
tags:
  - RPG MAKER
abbrlink: 536e38d0
date: 2022-06-08 21:13:00
---
#### First.前言
在现在的2022年，RPG Maker Mv/Mz<del datetime="2022-06-08T13:14:20+00:00">(基于HTML/JavaScript)</del>的出现让某些单机游戏拥有了新的转机，玩家们可以自己制作属于自己的单机RPG<del datetime="2022-06-08T13:26:26+00:00">(角色扮演)</del>游戏。
<del datetime="2022-06-08T12:35:52+00:00">(或许单机正在被手机网游替代)</del>，但这些发展都离不开曾经被众人遗忘的 RPG Maker XP
<div class="mdui-hoverable shortcodestyle" style="background: #9dd7e8 !important;color: #03536b !important;text-indent: 0 !important;"><i class="fa fa-check-square"></i>&nbsp;&nbsp;曾经的代表作： 《热血物语RM》 《口袋妖怪重生》《迷宫———阿尔西斯的末日》等</div>
那来讲讲以前的RGSS 1代脚本(基于Ruby，暗梦我还记得以前的66rpg的Rpg Maker论坛，现在好像已经关闭了十几年了来着，嗯...... ，还是挺喜欢它 RGSS-RTP 自带的音乐)
<div class="mdui-hoverable shortcodestyle" style="background: #9dd7e8 !important;color: #03536b !important;text-indent: 0 !important;"><i class="fa fa-check-square"></i>&nbsp;&nbsp;使用方法：<br>
(I). 打开脚本编辑器，右键左侧菜单插入空白脚本，输入名称并复制以下脚本 <del datetime="2022-06-08T13:20:28+00:00">(不适用单条语句运行)</del><br>
(II). 编辑模式调到事件(按下F8)，点击执行内容，第三页最后一排脚本，输入你想调用的语句 <del datetime="2022-06-08T13:20:28+00:00">(不适用整段脚本运行)</del>
</div>

#### I.跳过标题画面直接开始游戏

```ruby
#==============================================================================
# ■ Scene_Title
#------------------------------------------------------------------------------
# 　处理标题画面的类。
#==============================================================================
class Scene_Title
#--------------------------------------------------------------------------
# ● 主处理
#--------------------------------------------------------------------------
def main
# 战斗测试的情况下
if $BTEST
battle_test
return
end
# 载入数据库
$data_actors = load_data("Data/Actors.rxdata")
$data_classes = load_data("Data/Classes.rxdata")
$data_skills = load_data("Data/Skills.rxdata")
$data_items = load_data("Data/Items.rxdata")
$data_weapons = load_data("Data/Weapons.rxdata")
$data_armors = load_data("Data/Armors.rxdata")
$data_enemies = load_data("Data/Enemies.rxdata")
$data_troops = load_data("Data/Troops.rxdata")
$data_states = load_data("Data/States.rxdata")
$data_animations = load_data("Data/Animations.rxdata")
$data_tilesets = load_data("Data/Tilesets.rxdata")
$data_common_events = load_data("Data/CommonEvents.rxdata")
$data_system = load_data("Data/System.rxdata")
# 生成系统对像
$game_system = Game_System.new
# 调用新游戏的内容
command_new_game
# 生成标题图形
#@sprite = Sprite.new
#@sprite.bitmap = RPG::Cache.title($data_system.title_name)
# 生成命令窗口
s1 = "新游戏"
s2 = "继续"
s3 = "退出"
@command_window = Window_Command.new(192, [s1, s2, s3])
@command_window.back_opacity = 160
@command_window.x = 500 - @command_window.width / 2
@command_window.y = 500
# 判定继续的有效性
# 存档文件一个也不存在的时候也调查
# 有効为 @continue_enabled 为 true、无效为 false
@continue_enabled = false
for i in 0..3
if FileTest.exist?("Save#{i+1}.rxdata")
@continue_enabled = true
end
end
# 继续为有效的情况下、光标停止在继续上
# 无效的情况下、继续的文字显示为灰色
if @continue_enabled
@command_window.index = 1
else
@command_window.disable_item(1)
end
# 演奏标题 BGM
#$game_system.bgm_play($data_system.title_bgm)
# 停止演奏 ME、BGS
Audio.me_stop
Audio.bgs_stop
# 执行过渡
Graphics.transition
# 主循环
loop do
# 刷新游戏画面
Graphics.update
# 刷新输入信息
Input.update
# 刷新画面
update
# 如果画面被切换就中断循环
if $scene != self
break
end
end
# 装备过渡
Graphics.freeze
# 释放命令窗口
@command_window.dispose
# 释放标题图形
#@sprite.bitmap.dispose
#@sprite.dispose
end
#--------------------------------------------------------------------------
# ● 刷新画面
#--------------------------------------------------------------------------
def update
# 刷新命令窗口
@command_window.update
# 按下 C 键的情况下
if Input.trigger?(Input::C)
# 命令窗口的光标位置的分支
case @command_window.index
when 0 # 新游戏
command_new_game
when 1 # 继续
command_continue
when 2 # 退出
command_shutdown
end
end
end
#--------------------------------------------------------------------------
# ● 命令 : 新游戏
#--------------------------------------------------------------------------
def command_new_game
# 演奏确定 SE
#$game_system.se_play($data_system.decision_se)
# 停止 BGM
Audio.bgm_stop
# 重置测量游戏时间用的画面计数器
Graphics.frame_count = 0
# 生成各种游戏对像
$game_temp = Game_Temp.new
$game_system = Game_System.new
$game_switches = Game_Switches.new
$game_variables = Game_Variables.new
$game_self_switches = Game_SelfSwitches.new
$game_screen = Game_Screen.new
$game_actors = Game_Actors.new
$game_party = Game_Party.new
$game_troop = Game_Troop.new
$game_map = Game_Map.new
$game_player = Game_Player.new
# 设置初期同伴位置
$game_party.setup_starting_members
# 设置初期位置的地图
$game_map.setup($data_system.start_map_id)
# 主角向初期位置移动
$game_player.moveto($data_system.start_x, $data_system.start_y)
# 刷新主角
$game_player.refresh
# 执行地图设置的 BGM 与 BGS 的自动切换
$game_map.autoplay
# 刷新地图 (执行并行事件)
$game_map.update
# 切换地图画面
$scene = Scene_Map.new
end
#--------------------------------------------------------------------------
# ● 命令 : 继续
#--------------------------------------------------------------------------
def command_continue
# 继续无效的情况下
unless @continue_enabled
# 演奏无效 SE
$game_system.se_play($data_system.buzzer_se)
return
end
# 演奏确定 SE
$game_system.se_play($data_system.decision_se)
# 切换到读档画面
$scene = Scene_Load.new
end
#--------------------------------------------------------------------------
# ● 命令 : 退出
#--------------------------------------------------------------------------
def command_shutdown
# 演奏确定 SE
$game_system.se_play($data_system.decision_se)
# BGM、BGS、ME 的淡入淡出
Audio.bgm_fade(800)
Audio.bgs_fade(800)
Audio.me_fade(800)
# 退出
$scene = nil
end
#--------------------------------------------------------------------------
# ● 战斗测试
#--------------------------------------------------------------------------
def battle_test
# 载入数据库 (战斗测试用)
$data_actors = load_data("Data/BT_Actors.rxdata")
$data_classes = load_data("Data/BT_Classes.rxdata")
$data_skills = load_data("Data/BT_Skills.rxdata")
$data_items = load_data("Data/BT_Items.rxdata")
$data_weapons = load_data("Data/BT_Weapons.rxdata")
$data_armors = load_data("Data/BT_Armors.rxdata")
$data_enemies = load_data("Data/BT_Enemies.rxdata")
$data_troops = load_data("Data/BT_Troops.rxdata")
$data_states = load_data("Data/BT_States.rxdata")
$data_animations = load_data("Data/BT_Animations.rxdata")
$data_tilesets = load_data("Data/BT_Tilesets.rxdata")
$data_common_events = load_data("Data/BT_CommonEvents.rxdata")
$data_system = load_data("Data/BT_System.rxdata")
# 重置测量游戏时间用的画面计数器
Graphics.frame_count = 0
# 生成各种游戏对像
$game_temp = Game_Temp.new
$game_system = Game_System.new
$game_switches = Game_Switches.new
$game_variables = Game_Variables.new
$game_self_switches = Game_SelfSwitches.new
$game_screen = Game_Screen.new
$game_actors = Game_Actors.new
$game_party = Game_Party.new
$game_troop = Game_Troop.new
$game_map = Game_Map.new
$game_player = Game_Player.new
# 设置战斗测试用同伴
$game_party.setup_battle_test_members
# 设置队伍 ID、可以逃走标志、战斗背景
$game_temp.battle_troop_id = $data_system.test_troop_id
$game_temp.battle_can_escape = true
$game_map.battleback_name = $data_system.battleback_name
# 演奏战斗开始 BGM
$game_system.se_play($data_system.battle_start_se)
# 演奏战斗 BGM
$game_system.bgm_play($game_system.battle_bgm)
# 切换到战斗画面
$scene = Scene_Battle.new
end
end
```

#### II.地图名显示脚本
```ruby
#==============================================================================
# ■ Window_Map_Name
#------------------------------------------------------------------------------
# マップ名を表示するウィンドウです。
#==============================================================================
class Window_Map_Name < Window_Base
#--------------------------------------------------------------------------
# ● オブジェクト初期
#--------------------------------------------------------------------------
def initialize
super(460, 0, 180, 64)
self.contents = Bitmap.new(width-32, height-32)
@showing_time = 0
@text_color = Color.new(255,255,255,255) # 地名：描写文字色
end
#--------------------------------------------------------------------------
# ● テキスト设定
# text : ウィンドウに表示する文字列
# align : アラインメント (0..左揃え、1..中央揃え、2..右揃え)
#--------------------------------------------------------------------------
def set_text(text, align = 2)
# テキストとアラインメントの少なくとも一方が前回と违っている场合
if text != @text or align != @align
# テキストを再描画
self.contents.clear
@showing_time = 100
@text = text
@align = align
@actor = nil
self.contents_opacity = 255
x = 4
y = 0
self.contents.font.color = Color.new( 0, 0, 0, 192)
self.contents.draw_text(x+2, y+2, self.width - 40, 32, "-"+text+"-",align=1)
self.contents.font.color = Color.new( 64, 64, 64, 192)
self.contents.draw_text(x-1, y-1, self.width - 40, 32, "-"+text+"-", align=1)
self.contents.draw_text(x+1, y-1, self.width - 40, 32, "-"+text+"-", align=1)
self.contents.draw_text(x-1, y+1, self.width - 40, 32, "-"+text+"-", align=1)
self.contents.draw_text(x+1, y+1, self.width - 40, 32, "-"+text+"-", align=1)
self.contents.font.color = @text_color
self.contents.draw_text(x, y, self.width - 40, 32, "-"+text+"-", align=1)
else
@showing_time -= 1
if @showing_time < 100
# フェードアウトしはじめる
self.contents_opacity = @showing_time * 100
elsif @showing_time <= 0
# 一定时间経过したので表示を消す
self.contents.clear
end
end
self.visible = true
end
end
#==============================================================================
# ■ Scene_Map
#==============================================================================
class Scene_Map
#--------------------------------------------------------------------------
# ● メイン処理
#--------------------------------------------------------------------------
alias xrxs20_main main
def main
# 地名ウィンドウを作成
@map_name_window = Window_Map_Name.new
@map_name_window.opacity = 0
# 戻す
xrxs20_main
# 地名ウィンドウを解放
@map_name_window.dispose
end
#--------------------------------------------------------------------------
# ● フレーム更新
#--------------------------------------------------------------------------
alias xrxs20_update update
def update
# 地名ウィンドウの更新
@map_name_window.set_text($game_map.name,1)
xrxs20_update
end
end
#==============================================================================
# ■ Scene_Title
#==============================================================================
class Scene_Title
#--------------------------------------------------------------------------
# ● メイン処理
#--------------------------------------------------------------------------
alias xrxs20_main main
def main
$map_infos = load_data("Data/MapInfos.rxdata")
for key in $map_infos.keys
$map_infos[key] = $map_infos[key].name
end
xrxs20_main
end
end
#==============================================================================
# ■ Game_Map
#==============================================================================
class Game_Map
#--------------------------------------------------------------------------
# ● マップ名を取得
#--------------------------------------------------------------------------
def name
$map_infos[@map_id]
end
end
```

#### III.「实用向」RPG Maker XP 新手脚本函数讲解

```ruby
#--------------------------------------------------------------------------
# ● Zero. Ruby 基础语句
#--------------------------------------------------------------------------

#---------------------------------------------
# ▸ (I). 类 & 函数定义
#---------------------------------------------
class [类名称] < [父类名称 (可选)]
  def [函数名称]
    ...
    return [Objejct] # 函数返回值 (可选)
  end
end

#----------------------------------------------
# ▸ (II). 条件判断
#----------------------------------------------
if [条件(没有括号)]
 ...
elsif [条件2 (没有括号)]
  ...
else
  ...
end

#--------------------------------------------------------------------------
# ● I. RGSS 基础语句
#--------------------------------------------------------------------------
$game_temp.message_text = "[您要输出的内容]" # 显示引号中的文字内容
$game_temp.common_event_id = [公共事件 ID] # 调用指定 ID 的公共事件
@wait_count = x # 等待x帧
print("[你要输出的内容]") # 弹出一个提示框 (MessageBox)
exit # 退出
$game_system.bgm_play([filename]) # 播放 BGM (BackGround Music)
$game_system.bgs_play([filename]) # 播放 BGS (BackGround Sound)
$game_system.me_play([filename]) # 播放 ME (Musicial Effect) 音效
$game_system.se_play([sesound]) # 播放 SE (Sound Effect) 音效
# sesound = [
#  $data_system.decision_se (确定音效)
#  $data_system.buzzer_se (冻结/禁止音效)
#  $data_system.cursor_se (方向键光标音效)
#  $data_system.cancel_se (取消音效)
#  ... (其它文件名)
#]

bitmap = RPG::Cache.icon([iconname]) # 创建图标缓存

#--------------------------------------------------------------------------
# ● II. RGSS 游戏数据操作
#--------------------------------------------------------------------------

#-----------------------------------------
# ▸ (I). 只读属性
#-----------------------------------------
$game_party.gold # 获取金钱数量
$game_actors[角色ID].[Actions] # 获取指定角色信息(此处只能是读取，不能直接赋值)
# Tip: Actions=[
#  hp(生命值[相当于HP值])
#  sp(魔力值[相当于现在的MP(Magic Point)值])
#  ext(经验)
#  level(等级)
#  maxhp(最大生命值)
#  maxsp(最大魔力值)
#  name(角色名字)
# ]

#-----------------------------------------
# ▸ (II). 可读写属性
#-----------------------------------------
$game_switches[开关ID] = true/false # 开关值取值(true/false为小写)
$game_switches[开关ID] = (not $game_switches[开关ID(也可以是另一个开关ID)]) # 开关值取反
$game_variables[变量ID] = 0 # 指定变量ID操作

# 运算符提示：减去或递加运算符不能为
# ( $game_variables[变量ID] = $game_variables[变量ID] +/- x )
# 或 ( $game_variables[变量ID] ++/-- )
# 应使用 ( $game_variables[变量ID] +=/-= x ) 代替

#--------------------------------------------------------------------------
# ● III. RGSS 系统调用
#--------------------------------------------------------------------------
# 调出调试界面
$scene = Scene_Debug.new 
# 调出存档画面 (Tip: 需在游戏中运行)
$scene = Scene_Save.new
# 调出读档画面
$scene = Scene_Load.new
# 返回标题画面
$scene = Scene_Title.new

#--------------------------------------------------------------------------
# ● V. 注释块
#--------------------------------------------------------------------------
# 单行注释内容

=begin
多行注释内容，哈哈，博主很懒，什么都没写。
=end
```
