/*
  保证实效性，每次加载资源时文件名最新，保证不会被缓存
  这样在每次更新代码，都会触发 activate 进行激活
*/
window.onload = () => {
  var script = document.createElement('script');
  var firstScript = document.getElementsByTagName('script')[0]
  script.type = 'text/javascript';
  script.async = true;
  script.src = '/sw-register.js?v=' + Date.now()
  firstScript.parentNode.insertBefore(script, firstScript)
}

/*
  如果可以安装 service workder ，在安装这个服务器前将提供生成桌面程序按钮
*/
let deferredPrompt;
const addBtn = document.getElementById('add-button')
addBtn.style.display = 'none';

// 安装动作之前，如果点击取消也会触发
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('安装之前', e);
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});



