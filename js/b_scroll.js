// ==========================================
// 文件代码：b_scroll.js
// 文件名称：滚动响应模块
// 文件作用：滚动滑轮后菜单通过b_hightlight.js高亮及更新页面模块
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    //获取板块元素
    let sections = document.querySelectorAll("section");
    //1：ticking只有在false时，才会执行后面的代码块
    //2：window.requestAnimationFrame(() => {}) 会在浏览器下一次重绘之前调用回调函数，确保滚动事件不会频繁触发更新逻辑。
    //3: ticking = true; 表示已经开始处理滚动事件，避免重复触发。
    //4: 此时用户不管怎么操作都没有用，目前ticking是true，后面的代码块不会执行。
    //5：直到下一次滚动事件触发，ticking才会变为false。
    //6：passive: true 表示滚动事件不会被阻止，允许浏览器进行默认的滚动行为。这对于提升用户体验很重要，特别是在移动端设备上。
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveLinkByScroll();//requestAnimationFrame实现上锁后，在没有执行完之前，后面的代码块不会执行。
                ticking = false;
                console.log(`🔗 [b_init.js-滚动监听事件]已执行`);
            });
            ticking = true;
        }
    }, { passive: true });

    function updateActiveLinkByScroll() {
        // 创建变量，用于存储当前视图中处于中心的板块 ID，先默认设定为空字符串
        let currentSectionId = '';
        // 获取当前滚动位置
        let scrollPosition = window.scrollY;
        // 使用视口中心点作为判断基准，这样即使板块很高（比如 3 屏），只要中心点还在该板块内，高亮就不会变
        let viewportCenter = scrollPosition + (window.innerHeight / 2);

        // 遍历所有板块，找到当前视图中处于中心的板块 ID
        sections.forEach(section => {
            // 获取板块的顶部位置
            let sectionTop = section.offsetTop;
            // 获取板块的高度
            let sectionHeight = section.offsetHeight;
            // 获取板块的底部位置
            let sectionBottom = sectionTop + sectionHeight;

            // 逻辑：如果视口中心点 落在该板块的 [Top, Bottom] 范围内
            if (viewportCenter >= sectionTop && viewportCenter < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId && typeof updateActiveLink === 'function') {
            updateActiveLink(currentSectionId,"b_hightlight.js-滚动监听触发更新高亮状态");
        }
    }
});