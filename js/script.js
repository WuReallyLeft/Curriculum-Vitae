// PWA Manifest
        const manifest = {
            name: "張小明 - 資訊工程師履歷",
            short_name: "張小明履歷",
            description: "資訊工程師履歷 - 張小明",
            start_url: "/",
            display: "standalone",
            background_color: "#0f172a",
            theme_color: "#3b82f6",
            icons: [
                {
                    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%233b82f6'/%3E%3Ctext x='50' y='60' text-anchor='middle' fill='white' font-size='40' font-family='Arial'%3E履%3C/text%3E%3C/svg%3E",
                    sizes: "192x192",
                    type: "image/svg+xml"
                },
                {
                    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%233b82f6'/%3E%3Ctext x='50' y='60' text-anchor='middle' fill='white' font-size='40' font-family='Arial'%3E履%3C/text%3E%3C/svg%3E",
                    sizes: "512x512",
                    type: "image/svg+xml"
                }
            ]
        };

        // Create and inject manifest
        const manifestBlob = new Blob([JSON.stringify(manifest)], {type: 'application/json'});
        const manifestURL = URL.createObjectURL(manifestBlob);
        document.getElementById('manifest-placeholder').href = manifestURL;

        // Create meteors and particles
        function createMeteorsAndParticles() {
            const particles = document.getElementById('particles');
            
            // Create meteors
            for (let i = 1; i <= 4; i++) {
                const meteor = document.createElement('div');
                meteor.className = `meteor meteor-${i}`;
                particles.appendChild(meteor);
            }
            
            // Create particles
            const particleCount = window.innerWidth < 768 ? 15 : 30;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particles.appendChild(particle);
            }
        }

        // Loading animation
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1500);
        });

        // PWA Install
        let deferredPrompt;
        const installBtn = document.getElementById('installBtn');

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBtn.classList.add('show');
        });

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

        // Service Worker Registration (disabled in sandboxed environment)
        // Note: Service Worker functionality is not available in this environment
        // When you deploy this to your own server, uncomment the following code:
        /*
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('Service Worker registered successfully');
                })
                .catch((error) => {
                    console.log('Service Worker registration failed');
                });
        }
        */

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Apply animation to sections
        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

        // Initialize meteors and particles
        createMeteorsAndParticles();

        // Add typing effect to name
        const nameElement = document.querySelector('.name');
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        setTimeout(typeWriter, 2000);

        // Add parallax effect to background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            document.querySelector('.bg-animation').style.transform = `translateY(${rate}px)`;
        });

        // Mobile menu toggle (if needed)
        const handleResize = () => {
            if (window.innerWidth < 768) {
                document.body.classList.add('mobile');
            } else {
                document.body.classList.remove('mobile');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        // Add click effect to skill tags
        document.querySelectorAll('.skill-tag, .tech-tag').forEach(tag => {
            tag.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        // Add hover effect to contact items
        document.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.color = 'var(--primary)';
            });
            item.addEventListener('mouseleave', function() {
                this.style.color = '';
            });
        });

        // Performance optimization: Reduce particles on mobile
        if (window.innerWidth < 768) {
            document.querySelectorAll('.particle').forEach((particle, index) => {
                if (index > 20) {
                    particle.remove();
                }
            });
        }

        // Add download CV functionality (placeholder)
        const downloadCV = () => {
            // This would typically generate or download a PDF version
            alert('履歷下載功能將在未來版本中實現');
        };

        // Add print styles
        const printStyles = `
            @media print {
                .bg-animation, .particles, .install-btn, .loading {
                    display: none !important;
                }
                .section {
                    box-shadow: none;
                    border: 1px solid #ccc;
                    background: white !important;
                    color: black !important;
                }
                .name {
                    -webkit-text-fill-color: unset !important;
                    color: black !important;
                }
                .skill-tag, .tech-tag {
                    background: #f0f0f0 !important;
                    color: black !important;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = printStyles;
        document.head.appendChild(styleSheet);