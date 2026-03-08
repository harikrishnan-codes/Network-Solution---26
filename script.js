
        const slides = document.querySelectorAll(".hero-slide");

        let index = 0;

        function changeSlide() {

            slides[index].classList.remove("active");

            index++;

            if (index >= slides.length) {
                index = 0;
            }

            slides[index].classList.add("active");

        }

        setInterval(changeSlide, 5000);

        // Speed Gauge Animation
        const speedObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const path = document.getElementById('speed-path');
                    if (path) {
                        path.style.strokeDashoffset = "25";

                        const numDisplay = document.getElementById('speed-number');
                        if (numDisplay) {
                            let count = 0;
                            const target = 999;
                            const duration = 2000;
                            const increment = target / (duration / 16);

                            const updateCount = () => {
                                count += increment;
                                if (count < target) {
                                    numDisplay.innerText = Math.ceil(count);
                                    requestAnimationFrame(updateCount);
                                } else {
                                    numDisplay.innerText = target;
                                }
                            };
                            updateCount();
                        }
                    }
                    speedObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const speedSection = document.getElementById('speed-section');
        if (speedSection) {
            speedObserver.observe(speedSection);
        }

        // Mobile Menu
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.getElementById('nav-menu');

        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Counter Animation on Scroll
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.coverage-stat').forEach(stat => {
            counterObserver.observe(stat);
        });
