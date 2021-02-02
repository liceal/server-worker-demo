// 注册
console.log(navigator);
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js') // .sw.js?v=1.0 刷新缓存
    .then(() => {
      console.log('注册完成');
    });

  //接受消息
  navigator.serviceWorker.addEventListener('message', e => {
    console.log('接受消息', e);
    if (e.data === '请刷新客户端') {
      // 收到客户端更新消息，选择刷新页面
      if (confirm(e.data)) {
        window.location.reload();
      }
    }
  })
}