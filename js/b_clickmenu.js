// ==========================================
// 【点击菜单按钮触发事件b_hightlight.js代码实现智能高亮
// 文件代码：b_clickmenu.js
// 文件名称：点击菜单触发模块
// 文件作用：点击菜单后，通过b_hightlight.js代码实现智能高亮
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    //获取导航项
    let navItems = document.querySelectorAll(".nav li");

    navItems.forEach((item) => {
        item.addEventListener("click", function(e) {
            console.log(`🔗 [b_init.js-点击菜单] 点击导航项: ${this.querySelector('a').innerText}`);
            // 忽略友情链接
            if (this.classList.contains('friend-links-container')) return;
            //1. 获取当前点击的 <a> 标签:<a href="#..."> other code </a>
            let link = this.querySelector('a');
            //2. 如果没有获取到相关内容，则直接返回
            if (!link) return;
            //3.此时已经获取到a标签的完整内容，此时在获取href属性值
            let href = link.getAttribute('href');
            //4. 如果没有href属性，或者不是以'#'开头，则直接返回
            if (!href || !href.startsWith('#')) return;
            //5. 截取href属性值中的'#'后面的内容作为目标ID
            let targetId = href.substring(1);
            //6. 找到对应的板块元素,此时targetSection 就是我们要操作的板块元素
            let targetSection = document.getElementById(targetId);
            //7. 如果没有找到对应的板块元素，则直接返回
            if (!targetSection) return;
            //8. 修改 URL 的 Hash 部分，但不触发页面滚动
            e.preventDefault(); 
            //9. 更新高亮状态，此处调用外部函数实现高亮逻辑
            updateActiveLink(targetId,"b_init.js-点击菜单事件触发更新高亮状态");  
            console.log(`🔗 [b_init.js-点击菜单] 已激活导航项: ${targetId}`);
            // 11. 直接修改 URL Hash
            window.location.hash = href;
        });
    });
});