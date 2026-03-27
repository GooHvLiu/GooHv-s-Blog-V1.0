// ==========================================
// 文件代码：b_load.js
// 文件名称：加载页面模块
// 文件作用：加载指定需要的单元模块
// ==========================================
/**
 * @param {string} sectionId - 板块ID
 * @param {boolean} isSilent - 是否为静默加载模式 (true=静默预加载不显示Loading，false=显示loading...)
 */

//当前从b_init.js中调用loadPage()，isSilent默认为true,即默认静默加载，不显示Loading...
function loadPage(tagMark, sectionId, isSilent = false) {
    console.error(`[b_loader.js] 正在被${tagMark}调用。`);

    // 如果已经加载过，直接返回，防止重复 (可选优化)
    let section = document.getElementById(sectionId);
    if (section && section.dataset.loaded === 'true') {
        return; 
    }

    // 【路径映射】获取对应的文件路径，默认为默认页面内容
    let filePath = PAGE_PATH_MAP[sectionId] || DEFAULT_PAGE_PATH;

    // 【安全检查】确保能找到对应的 section 元素
    if (!section) {
        console.error(`❌ [Loader] 错误: 找不到 ID 为 "${sectionId}" 的 section 元素。`);
        return;
    }

    //如果我false,则显示Loading...
    if (!isSilent) {
        section.innerHTML = '<div class="loading-text">🔄 Loading the Text...</div>';
    } 

    // 【加载内容】使用 Fetch API 异步获取 HTML 内容，并注入到对应的 section 中
    fetch(filePath, { cache: 'no-store' }) 
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Stutas Code: ${response.status}`);
        }
        return response.text();
    })
    .then(html => {
        // 【注入内容】
        section.innerHTML = html;
        
        // 标记为已加载
        section.dataset.loaded = 'true'; 
        
        console.log(`📥 [b_load.js-静默加载] ${isSilent ? '(静默)' : '(用户触发)'} 成功加载: ${filePath}`);
        
        // // 更新高亮
        // if (typeof updateActiveLink === 'function') {
        //     updateActiveLink(sectionId, "b_load.js-静默加载触发更新高亮状态");
        // }
        
    })
    .catch(error => {
        console.error(`💥 [b_loader.js] Loading Fail:`, error);
        // 只有在非静默模式下，或者即使静默加载失败了，才显示错误提示给用户看
        section.innerHTML = `
            <div style="text-align:center; color:red; padding:50px; border: 2px dashed red;">
                <h3>😢 Loading Fail.</h3>
                <p><strong>Error Information:</strong> ${error.message}</p>
                <p>Target FilePath: ${filePath}</p>
            </div>
        `;
    });

}