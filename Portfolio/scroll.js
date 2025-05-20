// Système de changement de couleur de la navbar selon le contraste
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.box, .box2, .card');
    const originalNavbarClass = 'navbar-dark';
    const contrastNavbarClass = 'navbar-light bg-light';
    
    function checkContrast() {
        let shouldChange = false;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Si la navbar chevauche cette section
            if (rect.top <= 70 && rect.bottom >= 0) {
                // Vérifier si la section a un fond clair
                const bgColor = window.getComputedStyle(section).backgroundColor;
                const isLight = isColorLight(bgColor);
                
                if (isLight) {
                    shouldChange = true;
                }
            }
        });
        
        if (shouldChange) {
            navbar.classList.remove(...originalNavbarClass.split(' '));
            navbar.classList.add(...contrastNavbarClass.split(' '));
        } else {
            navbar.classList.remove(...contrastNavbarClass.split(' '));
            navbar.classList.add(...originalNavbarClass.split(' '));
        }
    }
    
    // Fonction pour déterminer si une couleur est claire
    function isColorLight(color) {
        // Convertir rgb/rgba en valeurs numériques
        const rgb = color.match(/\d+/g);
        if (!rgb || rgb.length < 3) return false;
        
        const r = parseInt(rgb[0]);
        const g = parseInt(rgb[1]);
        const b = parseInt(rgb[2]);
        
        // Formule de luminance (W3C)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5;
    }
    
    // Écouter le scroll
    window.addEventListener('scroll', checkContrast);
    // Vérifier au chargement
    checkContrast();
});