// Product Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Module accordion functionality (for software page)
    const moduleHeaders = document.querySelectorAll('.module-header');
    
    if (moduleHeaders.length > 0) {
        moduleHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const moduleItem = this.parentElement;
                const icon = this.querySelector('i');
                
                // Toggle active class
                moduleItem.classList.toggle('active');
                
                // Toggle icon
                if (moduleItem.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
                
                // Toggle content visibility
                const content = this.nextElementSibling;
                if (moduleItem.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0';
                }
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Product image zoom effect
    const productImages = document.querySelectorAll('.product-image img');
    
    productImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add active class to current product in related products
    const currentPage = window.location.pathname.split('/').pop();
    const relatedProductLinks = document.querySelectorAll('.related-products .learn-more');
    
    relatedProductLinks.forEach(link => {
        const linkHref = link.getAttribute('href').split('/').pop();
        if (linkHref === currentPage) {
            link.closest('.product-item').classList.add('active-related');
        }
    });

    // Initialize specification tabs if they exist
    const specTabs = document.querySelectorAll('.spec-tabs .tab');
    
    if (specTabs.length > 0) {
        specTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                document.querySelectorAll('.spec-tabs .tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all tab content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show selected tab content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Activate first tab by default
        specTabs[0].click();
    }

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
