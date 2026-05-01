






// dropdown js

document.addEventListener("DOMContentLoaded", function () {

    const arrow = document.querySelector(".dropdown-arrow");
    const dropdown = document.querySelector(".dropdown");

    arrow.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle("show");
    });

});


document.addEventListener("click", function () {
    dropdown.classList.remove("show");
});









const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', handleResize);
handleResize();

let particles = [];
for(let i=0; i<60; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(255, 107, 0, 0.15)';
    
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    for(let i=0; i<particles.length; i++) {
        for(let j=i+1; j<particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            if(Math.sqrt(dx*dx + dy*dy) < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}
animate();







const speedPath = document.getElementById('speed-path');
const speedNumber = document.getElementById('speed-number');

// Animate gauge on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            speedPath.style.strokeDashoffset = "63"; // Represents 1Gbps
            let count = 0;
            let interval = setInterval(() => {
                count += 10;
                speedNumber.textContent = count;
                if (count >= 1000) clearInterval(interval);
            }, 20);
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('#speed-section'));







const statsTrigger = document.querySelector('#stats-trigger');
const statNumbers = document.querySelectorAll('.stat-number');
const progressFills = document.querySelectorAll('.progress-fill');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate Numbers
            statNumbers.forEach(num => {
                const target = parseFloat(num.getAttribute('data-target'));
                animateCount(num, target);
            });

            // Animate Progress Bars
            progressFills.forEach(fill => {
                fill.style.transform = 'translateX(0)';
            });

            statsObserver.unobserve(statsTrigger);
        }
    });
}, { threshold: 0.5 });

function animateCount(el, target) {
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smoother finish
        const value = progress === 1 ? target : (start + (target - start) * (1 - Math.pow(1 - progress, 3)));
        
        el.textContent = target % 1 === 0 ? Math.floor(value) : value.toFixed(2);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

statsObserver.observe(statsTrigger);






setInterval(() => {
    const points = document.querySelectorAll('.pulse-point');
    const random = Math.floor(Math.random() * points.length);
    points[random].style.opacity = '0.3';
    setTimeout(() => { points[random].style.opacity = '1'; }, 500);
}, 2000);





let currentIndex = 0;
const items = document.querySelectorAll('.testimonial-item');
const speedDisplay = document.getElementById('live-speed');
const progressBar = document.getElementById('ui-progress');

function updateUI() {
    items.forEach(item => item.classList.remove('active'));
    items[currentIndex].classList.add('active');

    // Update Progress Bar
    const percent = ((currentIndex + 1) / items.length) * 100;
    progressBar.style.width = `${percent}%`;

    // Animate Speed Number
    const targetSpeed = parseInt(items[currentIndex].getAttribute('data-speed'));
    animateNumber(speedDisplay, targetSpeed);
}

function animateNumber(obj, end) {
    let start = parseInt(obj.innerText);
    let duration = 800;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % items.length;
    updateUI();
}

function prevTestimonial() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateUI();
}

// Initial Run
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});






document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        parent.classList.toggle('active');
        
        // Optional: Close other items when one opens
        document.querySelectorAll('.faq-item').forEach(child => {
            if (child !== parent) child.classList.remove('active');
        });
    });
});






function handleCtaSubmit(event) {
    event.preventDefault();
    const btn = event.target.querySelector('.btn-cta');
    const text = btn.querySelector('.btn-text');
    
    // Premium Loading State
    btn.style.pointerEvents = 'none';
    text.innerHTML = 'Checking Nodes...';
    btn.style.width = btn.offsetWidth + 'px'; // Maintain width
    
    setTimeout(() => {
        text.innerHTML = '<i class="fas fa-check"></i> High Speed Available!';
        btn.style.background = 'var(--success)';
        
        // Optional: Redirect after success
        setTimeout(() => {
            window.location.href = "./plans.html";
        }, 1500);
    }, 2000);
}






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
