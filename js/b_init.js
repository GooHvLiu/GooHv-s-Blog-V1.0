// ==========================================
// 【初始化模块】最终版 (支持长内容 + 磁铁吸附)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("⚡ [Init] 系统初始化 (支持长内容模式)...");

    let navItems = document.querySelectorAll(".nav li");
    let sections = document.querySelectorAll("section");

    // --- 功能 1: 点击菜单 -> 仅修改 Hash，完全交给 CSS 处理滚动 ---
    navItems.forEach((item) => {
        item.addEventListener("click", function(e) {
            
            // 忽略友情链接
            if (this.classList.contains('friend-links-container')) return;

            const link = this.querySelector('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (!targetSection) return;

            e.preventDefault(); 
            
            // 1. 更新高亮状态
            navItems.forEach((i) => i.classList.remove("active"));
            this.classList.add("active");
            
            // 2. 直接修改 URL Hash
            // CSS scroll-behavior: smooth 负责平滑移动
            // CSS scroll-snap-type: mandatory 负责最终精准吸附
            window.location.hash = href;
        });
    });

    // --- 功能 2: 滚动监听 -> 智能高亮 (适配长内容) ---
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveLinkByScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    function updateActiveLinkByScroll() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY;
        // 【关键优化】使用视口中心点作为判断基准
        // 这样即使板块很高（比如 3 屏），只要中心点还在该板块内，高亮就不会变
        const viewportCenter = scrollPosition + (window.innerHeight / 2);

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;

            // 逻辑：如果视口中心点 落在该板块的 [Top, Bottom] 范围内
            if (viewportCenter >= sectionTop && viewportCenter < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId && typeof updateActiveLink === 'function') {
            updateActiveLink(currentSectionId);
        }
    }

    // --- 功能 3: 初始化预加载 & 初始定位 ---
    const initAndPreload = () => {
        // 1. 静默预加载所有内容
        if (typeof PAGE_PATH_MAP !== 'undefined' && typeof loadPage === 'function') {
            console.log("📦 [Preload] 后台预加载所有页面...");
            Object.keys(PAGE_PATH_MAP).forEach(id => loadPage(id, true));
        }

        // 2. 处理页面加载时的初始 Hash
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                setTimeout(() => {
                    // 触发一次 scroll 事件以更新高亮
                    window.dispatchEvent(new Event('scroll'));
                    
                    // 如果浏览器没有自动滚动到位置，强制瞬间跳转
                    if (Math.abs(window.scrollY - targetSection.offsetTop) > 10) {
                        window.scrollTo({
                            top: targetSection.offsetTop,
                            behavior: 'auto'
                        });
                    }
                }, 200);
            }
        } else {
            setTimeout(() => window.dispatchEvent(new Event('scroll')), 200);
        }
    };

    setTimeout(initAndPreload, 100);
    console.log("✅ [Init] 初始化完成。长内容也能完美吸附！");
});