// ====================================================
// 文件代码：b_init.js
// 文件名称：初始化模块
// 文件作用：根据b_gconfig.js配置的页面路径，预加载所有内容
// ====================================================
document.addEventListener('DOMContentLoaded', () => {
    const initAndPreload = () => {
        // 01-预加载所有内容
        if (typeof PAGE_PATH_MAP !== 'undefined' && typeof loadPage === 'function') {
            console.log("📦 [b_init.js-初始化预加载-initAndPreload] 后台预加载所有页面...");
            let tagMark="b_init.js";
            Object.keys(PAGE_PATH_MAP).forEach(id => loadPage(tagMark, id, true));
        }
        updateActiveLink('myHome', "b_init.js-初始化触发myHome高亮状态");
    };
    // 延迟100ms执行，确保DOM已经加载完毕
    setTimeout(initAndPreload, 100);    
});