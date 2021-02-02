const cacheName = 'fox-store'

/*
  安装服务 缓存文件
*/
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) =>
        cache.addAll(["./index.html", "./icon/wx_head.jpg"])
      )
  );

  self.skipWaiting() //立即更新客户端，不进行等待
});

/* 
  激活，删除缓存
  激活的过程中，删除除了这次缓存文件外的其他文件
  这里，激活成功后将发送给存在的所有客户端一个消息
*/
self.addEventListener('activate', e => {
  console.log('开始激活');
  caches.keys().then((keys) =>
    Promise.all(
      keys.map(key => {
        if (![cacheName].includes(key)) {
          return caches.delete(key);
        }
      })
    ).then(() => {
      console.log('激活完成');

      // clients 是所有本项目开启的服务端
      return self.clients.matchAll()
        .then((clients) => {
          if (clients && clients.length) {
            clients.forEach(client => {
              // 向所有客户端发送更新提示
              client.postMessage('请刷新客户端')
            })
          }
        })
    })
  )
})

// 监听注册的文件
self.addEventListener("fetch", (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});