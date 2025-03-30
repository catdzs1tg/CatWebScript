
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-toggle-icon');
    let isDarkTheme = true;

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        isDarkTheme = !isDarkTheme;
        
        if (isDarkTheme) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    // Copy script functionality
    const copyBtn = document.getElementById('copy-btn');
    const scriptCode = document.getElementById('script-code');
    const copyNotification = document.getElementById('copy-notification');

    copyBtn.addEventListener('click', function() {
        const textArea = document.createElement('textarea');
        textArea.value = scriptCode.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show notification
        copyNotification.classList.add('show');
        setTimeout(function() {
            copyNotification.classList.remove('show');
        }, 3000);
    });

    // Syntax highlighting for the script
    function highlightSyntax() {
        let code = scriptCode.innerHTML;
        
        // Highlight comments
        code = code.replace(/(--(\/\/.*$|\/\*[\s\S]*?\*\/))/gm, '<span class="comment">$1</span>');
        
        // Highlight keywords
        const keywords = ['true', 'false', 'getgenv', 'loadstring', 'game'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            code = code.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
        
        // Highlight strings
        code = code.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
        
        // Highlight numbers
        code = code.replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
        
        // Highlight function calls
        code = code.replace(/\b(\w+)\(/g, '<span class="function">$1</span>(');
        
        scriptCode.innerHTML = code;
    }
    
    highlightSyntax();

    // Simulate script execution status
    const executionStatus = document.getElementById('execution-status');
    const statusMessages = [
        'Ready to execute',
        'Connected to Roblox',
        'Farming chests...',
        'Found rare item!',
        'Server hopping...'
    ];
    
    let currentIndex = 0;
    
    function updateStatus() {
        currentIndex = (currentIndex + 1) % statusMessages.length;
        executionStatus.textContent = statusMessages[currentIndex];
    }
    
    // Change status every 5 seconds for demo purposes
    setInterval(updateStatus, 5000);

    // Add animation to feature cards
    const configCards = document.querySelectorAll('.config-card');
    configCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });

    // Easter egg - cat emoji follows mouse on logo hover
    const logo = document.querySelector('.logo');
    const container = document.querySelector('.container');
    
    logo.addEventListener('mouseover', function() {
        const catEmoji = document.createElement('div');
        catEmoji.textContent = '🐱';
        catEmoji.style.position = 'absolute';
        catEmoji.style.fontSize = '24px';
        catEmoji.style.pointerEvents = 'none';
        catEmoji.style.transition = 'all 0.1s ease';
        catEmoji.style.zIndex = '1000';
        container.appendChild(catEmoji);
        
        function moveEmoji(e) {
            catEmoji.style.left = `${e.clientX + 10}px`;
            catEmoji.style.top = `${e.clientY + 10}px`;
        }
        
        document.addEventListener('mousemove', moveEmoji);
        
        logo.addEventListener('mouseout', function() {
            container.removeChild(catEmoji);
            document.removeEventListener('mousemove', moveEmoji);
        }, { once: true });
    });
});
