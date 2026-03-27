// ==========================================
// 文件代码：b_hightlight.js
// 文件名称：高亮响应模块
// 文件作用：更新菜单高亮状态的全局工具函数
// ==========================================

function updateActiveLink(targetId,useFunctionName) {

    console.log("🎨 [b_highlight.js] 更新高亮，目标ID:"+ targetId+";"+"被"+useFunctionName+"调取使用");
    
    // 【获取元素】选中导航栏 (.nav) 下所有的 <li> 标签
    let navItems = document.querySelectorAll(".nav li");
    
    // 【步骤1：清场】移除所有 active 类
    navItems.forEach(item => item.classList.remove("active"));

    // 【步骤2：定位】寻找对应的 <a> 标签
    let activeLink = document.querySelector(`.nav li a[href="#${targetId}"]`);
    
    // 【安全检查 & 特殊过滤】
    //找到了对应菜单栏&非友情链接的菜单项，则添加 active 类
    if (activeLink && !activeLink.parentElement.classList.contains('friend-links-container')) {
        activeLink.parentElement.classList.add("active");
    }
}