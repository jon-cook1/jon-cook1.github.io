document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('#main-nav a');
    const pages = document.querySelectorAll('.page');
    const getStartedBtn = document.getElementById('get-started');
    const stepLinks = document.querySelectorAll('.step-details');
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Initialize on page load
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Function to switch pages
    function switchPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        const selectedPage = document.getElementById(pageId);
        if (selectedPage) {
            selectedPage.classList.add('active');
            
            // Update navigation
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === pageId) {
                    link.classList.add('active');
                }
            });
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
    }
    
    // Set up navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
        });
    });
    
    // Set up "Get Started" button
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            switchPage('overview');
        });
    }
    
    // Set up step detail links
    stepLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
        });
    });
    
    // Set up theme toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        // Update icon
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Code highlighting with line numbers
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        // Add line numbers
        const lines = block.textContent.split('\n');
        let numberedLines = '';
        
        lines.forEach((line, index) => {
            if (index < lines.length - 1 || line.trim() !== '') {
                numberedLines += `<span class="line-number">${index + 1}</span>${line}\n`;
            }
        });
        
        block.innerHTML = numberedLines;
    });
    
    // Interactive elements for test cases
    const testCaseRows = document.querySelectorAll('table tbody tr');
    testCaseRows.forEach(row => {
        row.addEventListener('click', function() {
            this.classList.toggle('highlighted');
        });
    });
    
    // Animated progress indicator for 4-step approach
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            // Highlight current step and previous steps
            steps.forEach((s, i) => {
                if (i <= index) {
                    s.style.borderLeft = '4px solid var(--accent-color)';
                } else {
                    s.style.borderLeft = '4px solid transparent';
                }
            });
        });
        
        step.addEventListener('mouseleave', function() {
            // Reset all steps
            steps.forEach(s => {
                s.style.borderLeft = '4px solid transparent';
            });
        });
    });
    
    // Show the initial page (home)
    switchPage('home');
});