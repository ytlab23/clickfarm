// Function to load header and footer
function loadHeaderAndFooter() {
    // Load header
    fetch('includes/header.html')
        .then(response => response.text())
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.outerHTML = data;
            } else {
                document.body.insertAdjacentHTML('afterbegin', data);
            }
            // Initialize mobile menu after header is loaded
            initMobileMenu();
        });

    // Load footer
    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.outerHTML = data;
            } else {
                document.body.insertAdjacentHTML('beforeend', data);
            }
        });
}

// Initialize mobile menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            if (navLinks) {
                navLinks.classList.toggle('active');
            }
        });
    }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadHeaderAndFooter();
});
