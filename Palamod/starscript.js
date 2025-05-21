document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) {
      console.error("Canvas element not found!");
      return;
  }
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
      console.error("Could not get canvas context!");
      return;
  }

  // Fonction de redimensionnement
  function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      console.log("Canvas resized to:", canvas.width, canvas.height);
  }

  // Configuration
  const config = {
      starCount: 8,
      minSize: 12,
      maxSize: 20,
      minSpeed: 1,
      maxSpeed: 3,
      brightness: 0.9
  };

  // ... (le reste de votre code starscript.js existant) ...

  // Initialisation
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas(); // Appel initial
  
  const stars = Array(config.starCount).fill().map(() => new ShootingStar());
  animate(); // Démarrer l'animation directement
});