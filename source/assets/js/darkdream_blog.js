function comment_info()
{
   	const info =`
		<h5><i class="fa fa-warning"></i>&nbsp;本站评论特别声明</h5>
	   <div class="fliter_line"></div>
       <strong>Hi，我是你们的都市看客兼吟游诗人暗梦<br>
	   Tip: 您提交的评论将会记录下您的 IP 地址。</strong><br><br>
       根据《计算机信息网络国际联网安全保护管理办法》（公安部令第33号）指导精神<br>
       本站郑重承诺不含以下内容：<br>
	   <ul>
       <li>1. 反对宪法所确定的基本原则的；</li>
       <li>2. 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</li>
       <li>3. 损害国家荣誉和利益的；</li>
       <li>4. 煽动民族仇恨、民族歧视，破坏民族团结的；</li>
       <li>5. 破坏国家宗教政策，宣扬邪教和封建迷信的；</li>
       <li>6. 散布谣言，扰乱社会秩序，破坏社会稳定的；</li>
       <li>7. 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</li>
       <li>8. 侮辱或者诽谤他人，侵害他人合法权益的；</li>
       <li>9. 含有法律、行政法规禁止的其他内容的。</li>
	   </ul>
       欢迎社会大众以及网安部门监督，如有疏忽之处，请回复本人邮箱 dreamstar906@126.com，将从快从严处理，谢谢~
       `;
	   var swal_comment_info_dom_tree = document.createElement("div");
	   swal_comment_info_dom_tree.style.textAlign = "left";
	   swal_comment_info_dom_tree.innerHTML = info;
       swal({
			content: swal_comment_info_dom_tree,
			className: "comment_info_dialog",
			closeOnClickOutside: false,
			closeOnEsc: false,
		})
}

function checkblogpush_and_print_lastmessage() {
	const username = "LuminousDream";
	const repoName = "luminousdream.github.io";
	const apiUrl = `https://api.github.com/repos/${username}/${repoName}`;
	fetch(apiUrl)
	.then(response => {
		if (!response.ok) {
			throw new Error(`Github API 请求失败，无法读取此博客仓库状态，状态码：${response.status}。`);
		}
		return response.json();
	})
	.then(data => {
	  const lastPush = new Date(data.pushed_at); // 获取最近指定的 Github 仓库的推送时间
	  const now = new Date();
	  const YearsAgo = new Date(now.getFullYear() - 1, now.getMonth() - 6, now.getDate()); 
	  if (lastPush <= YearsAgo) { // 判断最近指定的 Github 仓库的推送时间是否距离今天，等于或者超过 1 年半，如果是则显示留言，如果不是则显示欢迎问候语。
	      $("html").addClass('filter-grayscale');
	      $("#blog_setting_filter_off").removeClass('active');
	      $("#blog_setting_filter_grayscale").addClass('active');
	      const lastmessage = "暗梦： 生命如花，虽然短暂，但也有绚烂的时刻，希望旅行者们珍惜每一个瞬间，愿旅行者们也能够好好生活，不要留下遗憾。";
	      const lastmessage_poetry = " 梦回 昨宵闲庭外，庭外悲歌复又来，风刀霜剑摧花败，红落香消与鸟埋~ ";
              mdui.snackbar({message: '<strong>'+lastmessage+'</strong><br><br><i>'+lastmessage_poetry+'</i> ',buttonText: '知道啦～',timeout: 0,position: 'right-top'});
	      console.log("%c "+lastmessage+" \n"+lastmessage_poetry,"margin:5px;color:#F05B85;padding:5px;background-color:rgba(250, 114, 152, 0.25);border-radius:15px;");
	  }else{
	      console.log("%c Hello，来自异乡的旅行者，欢迎你来到暗梦我的寒舍~ ","margin:5px;color:#F05B85;padding:5px;background-color:rgba(250, 114, 152, 0.25);border-radius:15px;");
	  }
	})
	.catch(error => {
		console.warn(`Github API 请求失败：${error}，无法读取此博客仓库状态。`);
	});
}