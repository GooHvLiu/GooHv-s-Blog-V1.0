// 简单的滚动显现脚本
//   1-造一个观察员 (new IntersectionObserver)。
//   2-规定触发条件 (threshold: 0.1)。
//   3-告诉观察员盯着谁 (observer.observe)。
//   4-一旦看到目标，就给目标加个 CSS 类名 (classList.add)，让 CSS 去负责播放动画。

// 1. 创建一个“观察员”对象 var observer = new IntersectionObserver(function(entries) { ... }, { threshold: 0.1 });
var observer = new IntersectionObserver(function(entries) {
    // 2. 当观察员发现变化时，执行这个函数,entries.forEach(function(entry) { ... });
    entries.forEach(function(entry) {
        // 3. 判断：目标元素是不是真的进入了屏幕？
        if (entry.isIntersecting) {
            // 4. 如果是，就给这个元素添加一个 class 叫 'visible'
            entry.target.classList.add('visible');
        }
    });
}, { 
    // 5. 配置选项：只要露出 10% 就算看见了
    threshold: 0.1 
});

// 6. 找到页面上所有的板块
var blocks = document.querySelectorAll('.importPage-section-block');

// 7. 告诉观察员：你要盯着这些板块看
blocks.forEach(function(block) {
    observer.observe(block);
});