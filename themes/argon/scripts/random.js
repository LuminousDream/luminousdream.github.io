hexo.extend.filter.register('after_render:html', function (data) {
  if(hexo.theme.config.enable_randompost) {
    const posts = []
    hexo.locals.get('posts').map(function (post) {if (post.random !== false) posts.push(post.path)})

    data += `<!-- 随机文章功能 -->
             <script>
              var posts=${JSON.stringify(posts.filter(item => !/shuoshuo/.test(item)))};
	      posts.splice(posts.indexOf(/shuoshuo/g),1)
             function toRandomPost() {
               $.pjax({
         　　    url: '/'+posts[Math.floor(Math.random() * posts.length)]
                })
              }</script>
    `
    return data
  }
})
