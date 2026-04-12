document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    const themeToggle = document.getElementById('theme-toggle');

    let currentLang = localStorage.getItem('lang') || 'fr';
    let currentTheme = localStorage.getItem('theme') || 'light';

    const setTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeToggle) themeToggle.textContent = '☀️';
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (themeToggle) themeToggle.textContent = '🌙';
        }
        localStorage.setItem('theme', theme);
    };

    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update all elements with data attributes for translations
        document.querySelectorAll('[data-fr][data-ar]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        if (lang === 'ar') {
            if (langToggle) langToggle.textContent = 'Français';
            document.body.style.fontFamily = "'Tajawal', 'Inter', sans-serif";
        } else {
            if (langToggle) langToggle.textContent = 'عربي';
            document.body.style.fontFamily = "'Inter', 'Tajawal', sans-serif";
        }
        
        localStorage.setItem('lang', lang);
    };

    // Initialize theme
    setTheme(currentTheme);
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(currentTheme);
        });
    }

    // Initialize language
    if (langToggle) {
        setLanguage(currentLang);
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'fr' ? 'ar' : 'fr';
            setLanguage(currentLang);
        });
    }
});
