// ==========================================
// 【动态加载模块】支持静默预加载
// ==========================================

/**
 * @param {string} sectionId - 板块ID
 * @param {boolean} isSilent - 是否为静默模式 (true=预加载不显示Loading，false=正常加载)
 */
function loadPage(sectionId, isSilent = false) {
    // 如果已经加载过，直接返回，防止重复 (可选优化)
    const section = document.getElementById(sectionId);
    if (section && section.dataset.loaded === 'true') {
        return; 
    }

    var filePath = PAGE_PATH_MAP[sectionId] || DEFAULT_PAGE_PATH;

    if (!section) {
        console.error(`❌ [Loader] 错误: 找不到 ID 为 "${sectionId}" 的 section 元素。`);
        return;
    }

    // 【关键修改】如果是静默模式，不修改 innerHTML，保持原样 (或者是空的)，直到加载完成
    // 如果不是静默模式 (用户点击触发)，才显示 Loading
    if (!isSilent) {
        section.innerHTML = '<div class="loading-text">🔄 Loading the Text...</div>';
    } else {
        // 静默模式下，可以选择保留原有的 "...Loading Pages..." 文本，或者留空
        // 建议留空或保持原样，避免闪烁
        // section.innerHTML = ''; 
    }

    fetch(filePath, { cache: 'no-store' }) 
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP 错误! 状态码: ${response.status}`);
        }
        return response.text();
    })
    .then(html => {
        // 【注入内容】
        section.innerHTML = html;
        
        // 标记为已加载
        section.dataset.loaded = 'true'; 
        
        console.log(`📥 [Loader] ${isSilent ? '(静默)' : '(用户触发)'} 成功加载: ${filePath}`);
        
        // 更新高亮
        if (typeof updateActiveLink === 'function') {
            updateActiveLink(sectionId);
        }
        
        // 静默模式下，通常不需要修改地址栏哈希，除非是用户主动点击
        if (!isSilent) {
            if (window.location.hash !== '#' + sectionId) {
                window.location.hash = sectionId;
            }
        }
    })
    .catch(error => {
        console.error(`💥 [Loader] 加载失败:`, error);
        // 只有在非静默模式下，或者即使静默加载失败了，才显示错误提示给用户看
        section.innerHTML = `
            <div style="text-align:center; color:red; padding:50px; border: 2px dashed red;">
                <h3>😢 加载失败</h3>
                <p><strong>错误信息:</strong> ${error.message}</p>
                <p>目标文件: ${filePath}</p>
            </div>
        `;
    });
}