document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Initialize FAQ functionality
    function initFAQ() {
        // Initialize tabs
        const tabs = document.querySelectorAll('.faq-tab');
        const faqContainers = document.querySelectorAll('.faq-container');
        
        // Show first tab by default and hide all others
        faqContainers.forEach(container => {
            container.style.display = 'none';
        });
        
        if (tabs.length > 0) {
            tabs[0].classList.add('active');
            const firstFaqContainer = document.getElementById('service-faq');
            if (firstFaqContainer) {
                firstFaqContainer.classList.add('active');
                firstFaqContainer.style.display = 'block';
            }
        }
        
        // Tab switching
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and hide all containers
                tabs.forEach(t => t.classList.remove('active'));
                faqContainers.forEach(c => {
                    c.classList.remove('active');
                    c.style.display = 'none';
                });
                
                // Add active class to clicked tab and show corresponding container
                tab.classList.add('active');
                const tabTarget = tab.getAttribute('data-tab');
                const targetContainer = document.getElementById(`${tabTarget}-faq`);
                if (targetContainer) {
                    targetContainer.classList.add('active');
                    targetContainer.style.display = 'block';
                }
            });
        });
        
        // FAQ Toggle
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Toggle current item
                const isActive = item.classList.contains('active');
                
                // Close all items first
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const answer = otherItem.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = '0';
                        answer.style.padding = '0 25px';
                    }
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        answer.style.padding = '0 25px 25px';
                    }
                }
            });
        });
    }
    
    // Initialize FAQ functionality
    initFAQ();
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Enhanced testimonial slider with smooth transitions
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialContainer = document.querySelector('.testimonial-slider');
    
    // Set initial state
    testimonials.forEach((testimonial, index) => {
        testimonial.style.opacity = '0';
        testimonial.style.position = 'absolute';
        testimonial.style.width = 'calc(100% - 40px)';
        testimonial.style.transition = 'opacity 0.5s ease-in-out';
        if (index === 0) {
            testimonial.style.opacity = '1';
            testimonial.style.position = 'relative';
        }
    });
    
    function showTestimonial(index) {
        // Hide current testimonial
        testimonials[currentTestimonial].style.opacity = '0';
        testimonials[currentTestimonial].style.position = 'absolute';
        
        // Show new testimonial
        testimonials[index].style.opacity = '1';
        testimonials[index].style.position = 'relative';
        
        currentTestimonial = index;
    }
    
    // Auto-rotate testimonials
    if (testimonials.length > 1) {
        setInterval(() => {
            const nextTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(nextTestimonial);
        }, 8000);
    }
    
    // Add navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';
    dotsContainer.style.textAlign = 'center';
    dotsContainer.style.marginTop = '30px';
    
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'testimonial-dot';
        dot.style.display = 'inline-block';
        dot.style.width = '12px';
        dot.style.height = '12px';
        dot.style.borderRadius = '50%';
        dot.style.background = index === 0 ? 'var(--primary-color)' : '#ddd';
        dot.style.margin = '0 5px';
        dot.style.cursor = 'pointer';
        dot.style.transition = 'background 0.3s';
        
        dot.addEventListener('click', () => {
            showTestimonial(index);
            updateDots(index);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    testimonialContainer.parentNode.insertBefore(dotsContainer, testimonialContainer.nextSibling);
    
    function updateDots(activeIndex) {
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            dot.style.background = index === activeIndex ? 'var(--primary-color)' : '#ddd';
            dot.style.transform = index === activeIndex ? 'scale(1.2)' : 'scale(1)';
        });
    }
    
    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .pricing-card, .step');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.feature-card, .pricing-card, .step').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run once on page load
    setTimeout(animateOnScroll, 100);
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-spinner">
            <div class="spinner"></div>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    // Remove preloader after page loads
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Add preloader styles
const preloaderStyles = document.createElement('style');
preloaderStyles.textContent = `
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .preloader-spinner {
        width: 50px;
        height: 50px;
    }
    
    .spinner {
        width: 100%;
        height: 100%;
        border: 5px solid #f3f3f3;
        border-top: 5px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

document.head.appendChild(preloaderStyles);
