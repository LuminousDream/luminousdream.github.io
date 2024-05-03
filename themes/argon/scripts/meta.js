hexo.extend.generator.register('meta', function(locals) {
  var meta = {
    siteinfo: [],
    tags: [],
    tags_count: [],
    categories: [],
    categories_count: []
  }
  // 生成博客元数据
  meta.siteinfo.push({
    title: this.config.title,
    author: "暗梦先生呀~",
    url: this.config.url,
  })

  locals.tags.sort('name').each(function(tag) {
    meta.tags.push(tag.name)
  })
  locals.tags.sort('name').each(function(tag) {
    meta.tags_count.push(tag.length)
  })
  locals.categories.sort('name').each(function(category) {
    meta.categories.push(category.name)
  })
  locals.categories.sort('name').each(function(category) {
    meta.categories_count.push(category.length)
  })
  return {path: 'meta.json', data: JSON.stringify(meta)}
})
