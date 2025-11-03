/**
 * Main JavaScript file for Merox portfolio site
 * Handles navigation, animations, form submission, and interactive features
 */

// ============================================
// Navigation Scroll Effect
// ============================================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// Smooth Scrolling
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Contact Form Handler
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const form = this;
        const submitBtn = form.querySelector('.form-submit');
        const formData = new FormData(form);
        
        // Get form values
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Add loading state
        form.classList.add('loading');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // ============================================
            // BACKEND INTEGRATION OPTIONS:
            // ============================================
            
            // Option 1: FormSpree (Easiest - No backend needed)
            // Uncomment and replace YOUR_FORMSPREE_ID:
            /*
            const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            */
            
            // Option 2: EmailJS (Free tier available)
            // Uncomment and configure with your EmailJS credentials:
            /*
            emailjs.init('YOUR_PUBLIC_KEY');
            const response = await emailjs.send(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                data
            );
            */
            
            // Option 3: Custom Backend API
            // Uncomment and replace with your API endpoint:
            /*
            const response = await fetch('YOUR_API_ENDPOINT/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            */
            
            // Option 4: Netlify Forms (If hosting on Netlify)
            // Add data-netlify="true" to form in HTML
            // Then this will work automatically
            
            // ============================================
            // Temporary simulation for demo
            // Remove this when implementing real backend
            // ============================================
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Error sending message:', error);
            showNotification('Something went wrong. Please try again or email me directly at contact@merox.dev', 'error');
        } finally {
            // Remove loading state
            form.classList.remove('loading');
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        border: `1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
        borderRadius: '12px',
        color: type === 'success' ? '#10b981' : '#ef4444',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '400px'
    });
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .notification-icon {
            font-weight: bold;
            font-size: 1.25rem;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ============================================
// Intersection Observer for Animations
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .stat-card, .infra-text, .infra-visual, .contact-form'
    );
    
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // Add stagger effect to service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// ============================================
// Form Validation
// ============================================
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }
    
    if (isValid) {
        field.classList.remove('invalid');
        field.style.borderColor = 'var(--border)';
    } else {
        field.classList.add('invalid');
        field.style.borderColor = '#ef4444';
    }
    
    return isValid;
}

// ============================================
// Performance: Lazy Loading Images
// ============================================
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
}

// ============================================
// Analytics (Optional)
// ============================================
function initAnalytics() {
    // Google Analytics
    // Uncomment and add your GA4 tracking ID:
    /*
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
    */
    
    // Plausible Analytics (Privacy-friendly alternative)
    // Uncomment if using Plausible:
    /*
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = 'merox.dev';
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
    */
}

// ============================================
// Easter Egg: Konami Code
// ============================================
function initEasterEgg() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    showNotification('🎉 You found the secret! K8s master level unlocked!', 'success');
    document.body.style.animation = 'rainbow 2s linear';
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Initialize All Functions
// ============================================
function init() {
    // Core functionality
    initNavbarScroll();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initFormValidation();
    
    // Optional features
    initLazyLoading();
    initEasterEgg();
    
    // Uncomment when ready to use:
    // initAnalytics();
    
    console.log('%c⚡ Merox Portfolio Loaded', 'color: #06b6d4; font-size: 16px; font-weight: bold;');
    console.log('%cBuilt with ❤️ and lots of ☕', 'color: #94a3b8; font-size: 12px;');
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for external use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavbarScroll,
        initSmoothScroll,
        initContactForm,
        showNotification
    };
}
