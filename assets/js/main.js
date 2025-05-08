document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('#main-nav a');
    const pages = document.querySelectorAll('.page');
    const getStartedBtn = document.getElementById('get-started');
    const expandButtons = document.querySelectorAll('.expand-details');
    const closeButtons = document.querySelectorAll('.section-close');
    const sectionContents = document.querySelectorAll('.section-content');
    
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
        // First, hide any expanded sections
        sectionContents.forEach(section => {
            section.classList.add('hidden');
        });
        
        // Remove expandable-sections-active class from all pages
        pages.forEach(page => {
            page.classList.remove('expandable-sections-active');
        });
        
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
    
    // Function to show a section
    function showSection(sectionId) {
        // Hide all sections first
        sectionContents.forEach(section => {
            section.classList.add('hidden');
        });
        
        // Show the selected section
        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
            sectionToShow.classList.remove('hidden');
            // Scroll to the section
            sectionToShow.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Add expandable-sections-active class to the parent container
            const parentContainer = sectionToShow.closest('.expandable-sections').parentElement;
            if (parentContainer) {
                parentContainer.classList.add('expandable-sections-active');
            }
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
    
    // Set up "See It In Action" button
    const seeInActionBtn = document.getElementById('see-in-action');
    if (seeInActionBtn) {
        seeInActionBtn.addEventListener('click', function() {
            switchPage('example1');
        });
    }
    
    // Set up "See Implementation" button
    const seeImplementationBtn = document.getElementById('see-implementation');
    if (seeImplementationBtn) {
        seeImplementationBtn.addEventListener('click', function() {
            switchPage('advanced');
        });
    }
    
    // Set up "Next Example" buttons
    const nextExampleBtns = document.querySelectorAll('.next-example');
    nextExampleBtns.forEach(button => {
        button.addEventListener('click', function() {
            const nextPage = this.getAttribute('data-next');
            switchPage(nextPage);
        });
    });
    
    // Set up expand buttons
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Set up close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the parent section
            const section = this.closest('.section-content');
            // Hide the section
            section.classList.add('hidden');
            
            // Remove expandable-sections-active class from the page container
            const expandableSections = section.closest('.expandable-sections');
            if (expandableSections && expandableSections.parentElement) {
                expandableSections.parentElement.classList.remove('expandable-sections-active');
            }
            
            // Scroll back to the top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });
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