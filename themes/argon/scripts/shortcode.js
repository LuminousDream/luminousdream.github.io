//Hexo 短代码解析

function note (args, content) {
    var text = content;
    var format = args[0];
    var title = args[1];
    var fontawesome_icon = args[2];
    if(!title) {title = "";} else {text = '<strong>'+title+'：</strong>&nbsp;'+content;}
    if(!fontawesome_icon) {fontawesome_icon = "";} else {text = '<i class="'+fontawesome_icon+'"></i>&nbsp;'+text;}

    if(!format){
  	  return '<div class="alert alert-primary"><span class="alert-inner--text">' + text + '</span></div>';
      }else if( format == "default" ){
  	    return '<div class="alert alert-primary"><span class="alert-inner--text">' + text + '</span></div>';
      }else if( format == "blue" ){
  	    return '<div class="alert alert-primary"><span class="alert-inner--text">' + text + '</span></div>';
      }else if( format == "green" ){
  	    return '<div class="alert alert-success"><span class="alert-inner--text">' + text + '</span></div>';
      }else if( format == "red" ){
  	    return '<div class="alert alert-danger"><span class="alert-inner--text">' + text + '</span></div>';
      }else if( format == "skyblue" ){
  	    return '<div class="alert alert-info"><span class="alert-inner--text">' + text + '</span></div>';
      }else if( format == "orange" ){
  	    return '<div class="alert alert-warning"><span class="alert-inner--text">' + text + '</span></div>';
      }else if( format == "black" ){
  	    return '<div class="alert alert-default"><span class="alert-inner--text">' + text + '</span></div>';
      }else if( format == "themecolor" ){
      return '<div class="alert alert-themecolor"><span class="alert-inner--text">' + text + '</span></div>';
  }
}

function notebox (args, content) {
    var text = content;
    var format = args[0];
    var title = args[1];
    var title_fontawesome_icon = args[2];
    if(!title) {title = "";} else {title = '<div class="admonition-title">'+args[1]+'</div>'}
    if(!title_fontawesome_icon) {title_fontawesome_icon = "";} else { if(!title){title = "";} else {title = '<div class="admonition-title"><i class="'+title_fontawesome_icon+'"></i>&nbsp;'+args[1]+'</div>'} } //当未指定 title 时，此项失效。

    if(!format){
  	  return '<div class="admonition shadow-sm admonition-primary">'+title+'<div class="admonition-body">' + text + '</div></div>';
      }else if( format == "default" ){
  	    return '<div class="admonition shadow-sm admonition-primary">'+title+'<div class="admonition-body">' + text + '</div></div>';
      }else if( format == "blue" ){
  	    return '<div class="admonition shadow-sm admonition-primary">'+title+'<div class="admonition-body">' + text + '</div></div>';
      }else if( format == "green" ){
  	    return '<div class="admonition shadow-sm admonition-success">'+title+'<div class="admonition-body">' + text + '</div></div>';
      }else if( format == "red" ){
  	    return '<div class="admonition shadow-sm admonition-danger">'+title+'<div class="admonition-body">' + text + '</div></div>';
      }else if( format == "skyblue" ){
  	    return '<div class="admonition shadow-sm admonition-info">'+title+'<div class="admonition-body">' + text + '</div></div>';
      }else if( format == "orange" ){
  	    return '<div class="admonition shadow-sm admonition-warning">'+title+'<div class="admonition-body">' + text + '</div></div>';
      }else if( format == "black" ){
  	    return '<div class="admonition shadow-sm admonition-black">'+title+'<div class="admonition-body">' + text + '</div></div>';
      }else if( format == "themecolor" ){
      return '<div class="admonition shadow-sm admonition-themecolor">'+title+'<div class="admonition-body">' + text + '</div></div>';
  }
}

function todo_checkbox (args, content) {
  var text = args[0];
  var checked = args[1];
  if(checked)
  {
    return `<div class="shortcode-todo custom-control custom-checkbox">
    <input class="custom-control-input" type="checkbox" checked>
    <label class="custom-control-label">
    <span>`+text+`</span>
    </label>
    </div>`;
  }else{
    return `<div class="shortcode-todo custom-control custom-checkbox">
    <input class="custom-control-input" type="checkbox">
    <label class="custom-control-label">
    <span>`+text+`</span>
    </label>
    </div>`;
  }
}

function hidetext (args, content) {
  var text = content;
  var format = args[0];
  var mouse_tip = args[1];
  if(!mouse_tip){mouse_tip = "";}

  if(!format){
    return `<span class="argon-hidden-text argon-hidden-text-blur" title="`+mouse_tip+`">`+text+`</span>`;
  }else if(format == "default"){
    return `<span class="argon-hidden-text argon-hidden-text-blur" title="`+mouse_tip+`">`+text+`</span>`;
  }else if(format == "blackbar"){
    return `<span class="argon-hidden-text argon-hidden-text-background" title="`+mouse_tip+`">`+text+`</span>`;
  }
}

function color_tag (args, content) {
  var text = args[0];
  var color = args[1];
  var format = args[2];
  if(!format){format = "";}else{format="badge-pill";}

  if(!color){
    return `<span class="badge badge-primary `+format+`">`+text+`</span>`;
  }else if(color == "default"){
    return `<span class="badge badge-primary `+format+`">`+text+`</span>`;
  }else if(color == "green"){
    return `<span class="badge badge-success `+format+`">`+text+`</span>`;
  }else if(color == "red"){
    return `<span class="badge badge-danger `+format+`">`+text+`</span>`;
  }else if(color == "blue"){
    return `<span class="badge badge-info `+format+`">`+text+`</span>`;
  }else if(color == "orange"){
    return `<span class="badge badge-warning `+format+`">`+text+`</span>`;
  }
}

function color_progressbar (args, content) {
  var text = args[0];
  var value = args[1];
  var color = args[2];
  if(!color){
    return `<div class="progress-wrapper"><div class="progress-info"><div class="progress-label"><span>`+text+`</span></div><div class="progress-percentage"><span>`+value+`%</span></div></div><div class="progress"><div class="progress-bar bg-primary" style="width: `+value+`%;"></div></div></div>`;
  }else if(color == "default"){
    return `<div class="progress-wrapper"><div class="progress-info"><div class="progress-label"><span>`+text+`</span></div><div class="progress-percentage"><span>`+value+`%</span></div></div><div class="progress"><div class="progress-bar bg-primary" style="width: `+value+`%;"></div></div></div>`;
  }else if(color == "green"){
    return `<div class="progress-wrapper"><div class="progress-info"><div class="progress-label"><span>`+text+`</span></div><div class="progress-percentage"><span>`+value+`%</span></div></div><div class="progress"><div class="progress-bar bg-success" style="width: `+value+`%;"></div></div></div>`;
  }else if(color == "red"){
    return `<div class="progress-wrapper"><div class="progress-info"><div class="progress-label"><span>`+text+`</span></div><div class="progress-percentage"><span>`+value+`%</span></div></div><div class="progress"><div class="progress-bar bg-danger" style="width: `+value+`%;"></div></div></div>`;
  }else if(color == "blue"){
    return `<div class="progress-wrapper"><div class="progress-info"><div class="progress-label"><span>`+text+`</span></div><div class="progress-percentage"><span>`+value+`%</span></div></div><div class="progress"><div class="progress-bar bg-info" style="width: `+value+`%;"></div></div></div>`;
  }else if(color == "orange"){
    return `<div class="progress-wrapper"><div class="progress-info"><div class="progress-label"><span>`+text+`</span></div><div class="progress-percentage"><span>`+value+`%</span></div></div><div class="progress"><div class="progress-bar bg-warning" style="width: `+value+`%;"></div></div></div>`;
  }else if(color == "themecolor"){
    return `<div class="progress-wrapper"><div class="progress-info"><div class="progress-label"><span>`+text+`</span></div><div class="progress-percentage"><span>`+value+`%</span></div></div><div class="progress"><div class="progress-bar bg-themecolor" style="width: `+value+`%;"></div></div></div>`;
  }
}

function fold_notebox (args, content) {
  var text = content;
  var title = args[0];
  var color = args[1];
  var fontawesome_icon = args[2];
  if(!fontawesome_icon){fontawesome_icon = "";}else{title = "<i class='"+fontawesome_icon+"'></i>&nbsp;&nbsp;"+title;}
  var collapse_id = (Math.round(Math.random()*(99999999-10000000)+10000000)).toString();
  var style;

  if(!color){
    return `<div class="collapse-block shadow-sm collapse-block-transparent collapsed hide-border-left" collapse-id="`+collapse_id+`"><div class="collapse-block-title" collapse-id="`+collapse_id+`"><span class="collapse-block-title-inner">`+title+`</span><i class="collapse-icon fa fa-angle-down"></i></div><div class="collapse-block-body" style="display:none;">`+text+`</div></div>`;
  }else if(color == "default"){
    return `<div class="collapse-block shadow-sm collapse-block-transparent collapsed hide-border-left" collapse-id="`+collapse_id+`"><div class="collapse-block-title" collapse-id="`+collapse_id+`"><span class="collapse-block-title-inner">`+title+`</span><i class="collapse-icon fa fa-angle-down"></i></div><div class="collapse-block-body" style="display:none;">`+text+`</div></div>`;
  }else if(color == "default_legacy"){
    return `<div class="collapse-block shadow-sm collapse-block-primary collapsed hide-border-left" collapse-id="`+collapse_id+`"><div class="collapse-block-title" collapse-id="`+collapse_id+`"><span class="collapse-block-title-inner">`+title+`</span><i class="collapse-icon fa fa-angle-down"></i></div><div class="collapse-block-body" style="display:none;">`+text+`</div></div>`;
  }else if(color == "green"){
    return `<div class="collapse-block shadow-sm collapse-block-success collapsed hide-border-left" collapse-id="`+collapse_id+`"><div class="collapse-block-title" collapse-id="`+collapse_id+`"><span class="collapse-block-title-inner">`+title+`</span><i class="collapse-icon fa fa-angle-down"></i></div><div class="collapse-block-body" style="display:none;">`+text+`</div></div>`;
  }else if(color == "red"){
    return `<div class="collapse-block shadow-sm collapse-block-danger collapsed hide-border-left" collapse-id="`+collapse_id+`"><div class="collapse-block-title" collapse-id="`+collapse_id+`"><span class="collapse-block-title-inner">`+title+`</span><i class="collapse-icon fa fa-angle-down"></i></div><div class="collapse-block-body" style="display:none;">`+text+`</div></div>`;
  }else if(color == "blue"){
    return `<div class="collapse-block shadow-sm collapse-block-info collapsed hide-border-left" collapse-id="`+collapse_id+`"><div class="collapse-block-title" collapse-id="`+collapse_id+`"><span class="collapse-block-title-inner" collapse-id="`+collapse_id+`">`+title+`</span><i class="collapse-icon fa fa-angle-down"></i></div><div class="collapse-block-body" style="display:none;">`+text+`</div></div>`;
  }else if(color == "orange"){
    return `<div class="collapse-block shadow-sm collapse-block-warning collapsed hide-border-left" collapse-id="`+collapse_id+`"><div class="collapse-block-title" collapse-id="`+collapse_id+`"><span class="collapse-block-title-inner">`+title+`</span><i class="collapse-icon fa fa-angle-down"></i></div><div class="collapse-block-body" style="display:none;">`+text+`</div></div>`;
  }else if(color == "black"){
    return `<div class="collapse-block shadow-sm collapse-block-default collapsed hide-border-left" collapse-id="`+collapse_id+`"><div class="collapse-block-title" collapse-id="`+collapse_id+`"><span class="collapse-block-title-inner">`+title+`</span><i class="collapse-icon fa fa-angle-down"></i></div><div class="collapse-block-body" style="display:none;">`+text+`</div></div>`;
  }else if(color == "gray"){
    return `<div class="collapse-block shadow-sm collapse-block-grey collapsed hide-border-left" collapse-id="`+collapse_id+`"><div class="collapse-block-title" collapse-id="`+collapse_id+`"><span class="collapse-block-title-inner">`+title+`</span><i class="collapse-icon fa fa-angle-down"></i></div><div class="collapse-block-body" style="display:none;">`+text+`</div></div>`;
  }else if(color == "themecolor"){
    return `<div class="collapse-block shadow-sm collapse-block-themecolor collapsed hide-border-left" collapse-id="`+collapse_id+`"><div class="collapse-block-title" collapse-id="`+collapse_id+`"><span class="collapse-block-title-inner">`+title+`</span><i class="collapse-icon fa fa-angle-down"></i></div><div class="collapse-block-body" style="display:none;">`+text+`</div></div>`;
  }
}

function timeline (args, content) {
return `<div class="argon-timeline">`;
}

function end_timeline (args, content) {
return `</div>`;
}

function timeline_node (args, content) {
  var time = args[0];
  var title = args[1];
  var text = content;

  if(!time){time = "";} else {time = '<div class="argon-timeline-time">'+time+'</div>'}
  if(!title){title = "";} else {title = '<div class="argon-timeline-title">'+title+'</div>'}

  return `<div class="argon-timeline-node">`+time+`<div class="argon-timeline-card card bg-gradient-secondary shadow-sm"> `+title+` <div class="argon-timeline-content">`+text+`</div></div></div>`;
}

function github_repo_card (args, content) {
  var user = args[0];
  var reponame = args[1];
  var format = args[2];

  if(!format){
    return (`<div class="github-info-card github-info-card-full card shadow-sm" data-author="`+user+`" data-project="`+reponame+`" data-getdata="frontend" data-description="" data-stars="" data-forks=""><div class="github-info-card-header"><a href="https://github.com/" ref="nofollow" target="_blank" title="Github" no-pjax=""><span><i class="fa fa-github"></i> GitHub</span></a></div><div class="github-info-card-body"><div class="github-info-card-name-a">
<a href="https://github.com/`+user+`/`+reponame+`" target="_blank" no-pjax=""><span class="github-info-card-name">`+user+`/`+reponame+`</span></a></div><div class="github-info-card-description"></div></div><div class="github-info-card-bottom"><span class="github-info-card-meta github-info-card-meta-stars"><i class="fa fa-star"></i> <span class="github-info-card-stars"></span></span><span class="github-info-card-meta github-info-card-meta-forks"><i class="fa fa-code-fork"></i> <span class="github-info-card-forks"></span></span></div></div>`);
  }else if (format == "default"){
    return (`<div class="github-info-card github-info-card-full card shadow-sm" data-author="`+user+`" data-project="`+reponame+`" data-getdata="frontend" data-description="" data-stars="" data-forks=""><div class="github-info-card-header"><a href="https://github.com/" ref="nofollow" target="_blank" title="Github" no-pjax=""><span><i class="fa fa-github"></i> GitHub</span></a></div><div class="github-info-card-body"><div class="github-info-card-name-a">
<a href="https://github.com/`+user+`/`+reponame+`" target="_blank" no-pjax=""><span class="github-info-card-name">`+user+`/`+reponame+`</span></a></div><div class="github-info-card-description"></div></div><div class="github-info-card-bottom"><span class="github-info-card-meta github-info-card-meta-stars"><i class="fa fa-star"></i> <span class="github-info-card-stars"></span></span><span class="github-info-card-meta github-info-card-meta-forks"><i class="fa fa-code-fork"></i> <span class="github-info-card-forks"></span></span></div></div>`);
  }else if (format == "mini"){
    return (`<div class="wp-block-argon-github github-info-card card shadow-sm github-info-card-mini is-style-github-info-card-mini" data-author="`+user+`" data-project="`+reponame+`"><div class="github-info-card-header"><a href="https://github.com/" target="_blank" title="Github" rel="noopener"><span><i class="fa fa-github"></i>&nbsp;GitHub</span></a></div><div class="github-info-card-body"><div class="github-info-card-name-a"><a href="https://github.com/`+user+`/`+reponame+`" target="_blank" rel="noopener"><span class="github-info-card-name">`+user+`/`+reponame+`</span></a></div><div class="github-info-card-description"></div></div><div class="github-info-card-bottom"><span class="github-info-card-meta github-info-card-meta-stars"><i class="fa fa-star"></i>&nbsp;<span class="github-info-card-stars"></span></span><span class="github-info-card-meta github-info-card-meta-forks"><i class="fa fa-code-fork"></i>&nbsp;<span class="github-info-card-forks"></span></span></div></div>`);
  }
}

function tip_message_bar (args,content) {
  var text = content;
  return(`<div class="post-outdated-info"><i class="fa fa-info-circle" aria-hidden="true"></i> `+text+`</div>`)
}

function anmeng_talk (args,content) {
  var float = args[0];
  var text = content;
  if(float == "right"){
    return(`<div class="anmeng_conversations_row_reverse"><div class="card">`+text+`</div>
    <img src="/icon.jpg" class="anmeng_conversations_avatar no-fancybox"/></div>`)
  }else{
    return(`<div class="anmeng_conversations"><img src="/icon.jpg" class="anmeng_conversations_avatar no-fancybox"/><div class="card">`+text+`</div></div>`)
  }
}

function conversations (args,content) {
  var icon = args[0]
  var float = args[1];
  var text = content;
  if(float == "right"){
    return(`<div class="anmeng_conversations_row_reverse"><div class="card">`+text+`</div>
    <img src="`+icon+`" class="anmeng_conversations_avatar no-fancybox"/></div>`)
  }else{
    return(`<div class="anmeng_conversations"><img src="`+icon+`" class="anmeng_conversations_avatar no-fancybox"/><div class="card">`+text+`</div></div>`)
  }
}

function conversations_info (args,content) {
  var text = args[0];
  return(`<div class="anmeng_conversations_info"><div class="card">`+text+`</div></div>`)
}

// 定义自定义短代码
hexo.extend.tag.register('note', note, {ends: true});
hexo.extend.tag.register('notebox', notebox, {ends: true});
hexo.extend.tag.register('todo',todo_checkbox, {ends: false});
hexo.extend.tag.register('hidetext',hidetext, {ends: true});
hexo.extend.tag.register('ctag',color_tag, {ends: false});
hexo.extend.tag.register('cprogressbar',color_progressbar, {ends: false});
hexo.extend.tag.register('foldnotebox',fold_notebox, {ends: true});
hexo.extend.tag.register('tl',timeline, {ends: false});
hexo.extend.tag.register('endtl',end_timeline, {ends: false});
hexo.extend.tag.register('tlnode',timeline_node, {ends: true});
hexo.extend.tag.register('githubrepo',github_repo_card, {ends: false});
hexo.extend.tag.register('tip',tip_message_bar, {ends: true});
hexo.extend.tag.register('anmeng_talk',anmeng_talk, {ends: true});
hexo.extend.tag.register('conversations',conversations, {ends: true});
hexo.extend.tag.register('conversations_info',conversations_info, {ends: false});