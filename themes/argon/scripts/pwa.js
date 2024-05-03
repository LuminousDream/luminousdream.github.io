hexo.extend.generator.register('pwa_manifest', function(locals) {
    // PWA Mainfest (/manifest.json)
    const pwa_mf = {
            "lang": "zh-CN",
            "name": this.theme.config.pwa.name,
            "short_name": this.theme.config.pwa.name,
            "description": this.theme.config.pwa.description,
            "theme_color": this.theme.config.pwa.theme_color, 
            "background_color": this.theme.config.pwa.background_color,
            "start_url": this.theme.config.pwa.start_url,
            "Scope": "/",
            "display": "standalone",
            "orientation": "any",
            "icons": [{
                "src": this.theme.config.pwa.pwa_icon,
                "type": "image/png",
                "sizes": this.theme.config.pwa.pwa_icon_size,
            }]
    };
    if(this.theme.config.pwa.enable){return {path: 'manifest.json', data: JSON.stringify(pwa_mf)}}
})

hexo.extend.generator.register('pwa_sw', function(locals) {
    // 随机生成 PWA Service Worker 十六进制标识符
    var version_hex = '';
    var characters = '0123456789abcdef';
    for (var i = 0; i < 7; i++) {
        version_hex  += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // PWA Service Worker (/pwa_sw.js)
    const pwa_sw = `
    const version = "offline-cache-`+version_hex+`";
    const urlsToCache = `+JSON.stringify(this.theme.config.pwa.pwa_offline_resource_list)+`

    self.addEventListener('install', e => {
        e.waitUntil(
          caches.open(version).then(cache => {
            return cache.addAll(urlsToCache)
              .then(() => self.skipWaiting());
          })
        );
      });
      
      self.addEventListener('activate', function (e) {
        e.waitUntil(
          caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
              if (key !== version) {
                return caches.delete(key);
              }
            }));
          })
        );
        return self.clients.claim();
      });
      
      self.addEventListener('fetch', event => {
        event.respondWith(
          caches.open(version)
            .then(cache => cache.match(event.request, {ignoreSearch: true}))
            .then(response => {
              return response || fetch(event.request);
            })
        );
      });`;
    if(this.theme.config.pwa.enable){return {path: "/pwa_sw.js", data: pwa_sw}}
})