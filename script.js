document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 0);
    });
    
    // Pricing Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const priceCards = document.querySelectorAll('.price-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all price cards
            priceCards.forEach(card => card.classList.remove('show'));
            
            // Show selected price card
            const tabName = this.getAttribute('data-tab');
            document.querySelector(`.price-card.${tabName}`).classList.add('show');
        });
    });
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(n) {
        // Hide all slides
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Handle wrap around
        if (n >= testimonialSlides.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = testimonialSlides.length - 1;
        } else {
            currentSlide = n;
        }
        
        // Show current slide
        testimonialSlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Next slide
    nextBtn.addEventListener('click', function() {
        showSlide(currentSlide + 1);
    });
    
    // Previous slide
    prevBtn.addEventListener('click', function() {
        showSlide(currentSlide - 1);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto slide change
    setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show an alert
            alert(`Terima kasih ${name}! Pesan Anda tentang "${subject}" telah terkirim. Kami akan segera menghubungi Anda melalui email ${email}.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Initialize first slide and price tab
    showSlide(0);
    document.querySelector('.tab-btn.active').click();
});