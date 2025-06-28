document.addEventListener('DOMContentLoaded', () => {

    // --- PWA Manifest (與原版相同) ---
    const manifest = {
        name: "xxx - 資訊工程師履歷",
        short_name: "xxx履歷",
        description: "資訊工程師履歷 - xxx",
        start_url: "/",
        display: "standalone",
        background_color: "#0f172a",
        theme_color: "#3b82f6",
        icons: [{
            src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%233b82f6'/%3E%3Ctext x='50' y='60' text-anchor='middle' fill='white' font-size='40' font-family='Arial'%3E履%3C/text%3E%3C/svg%3E",
            sizes: "192x192", type: "image/svg+xml"
        }, {
            src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%233b82f6'/%3E%3Ctext x='50' y='60' text-anchor='middle' fill='white' font-size='40' font-family='Arial'%3E履%3C/text%3E%3C/svg%3E",
            sizes: "512x512", type: "image/svg+xml"
        }]
    };
    const manifestBlob = new Blob([JSON.stringify(manifest)], {type: 'application/json'});
    const manifestURL = URL.createObjectURL(manifestBlob);
    const manifestLink = document.getElementById('manifest-placeholder');
    if (manifestLink) {
        manifestLink.href = manifestURL;
    }

    // --- 背景與粒子效果 (與原版相同) ---
    function createMeteorsAndParticles() {
        const particles = document.getElementById('particles');
        if (!particles) return;
        
        const existingMeteors = particles.querySelectorAll('.meteor');
        if (existingMeteors.length === 0) {
            for (let i = 1; i <= 4; i++) {
                const meteor = document.createElement('div');
                meteor.className = `meteor meteor-${i}`;
                particles.appendChild(meteor);
            }
        }
        
        const particleCount = window.innerWidth < 768 ? 15 : 30;
        const existingParticles = particles.querySelectorAll('.particle');
        if(existingParticles.length === 0) {
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particles.appendChild(particle);
            }
        }
    }

    // --- 讀取動畫 (與原版相同) ---
    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading');
        if(loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500); // 縮短延遲以加快載入感
        }
    });

    // --- PWA 安裝 (與原版相同) ---
    let deferredPrompt;
    const installBtn = document.getElementById('installBtn');
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if(installBtn) installBtn.classList.add('show');
    });

    if(installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    installBtn.classList.remove('show');
                }
                deferredPrompt = null;
            }
        });
    }

    // --- **新增**：左側導覽列功能 ---
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('main-wrapper');
    const body = document.body;

    if (sidebarToggle && sidebar && mainWrapper) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止事件冒泡
            sidebar.classList.toggle('open');
            body.classList.toggle('sidebar-open');
        });

        // 點擊頁面其他地方可以關閉導覽列
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('open') && !sidebar.contains(e.target)) {
                 sidebar.classList.remove('open');
                 body.classList.remove('sidebar-open');
            }
        });
    }

    // --- **更新**：平滑滾動至錨點 ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                     top: offsetPosition,
                     behavior: 'smooth'
                });

                // 在小螢幕上點擊連結後自動關閉導覽列
                if (window.innerWidth <= 900 && sidebar && sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                    body.classList.remove('sidebar-open');
                }
            }
        });
    });

    // --- Intersection Observer 動畫 (與原版相同) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // 觸發後即停止觀察
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // 初始化背景
    createMeteorsAndParticles();
});
