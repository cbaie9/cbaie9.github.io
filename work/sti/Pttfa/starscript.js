  const canvas = document.getElementById('starCanvas');
  const ctx = canvas.getContext('2d');
  
  // Gestion du redimensionnement HD
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Configuration des étoiles
  const config = {
    starCount: 8,
    minSize: 12,
    maxSize: 20,
    minSpeed: 1,
    maxSpeed: 3,
    brightness: 0.9
  };

  // Fonction de dessin d'étoile précise
  function drawStar(ctx, x, y, size, opacity, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size * 0.38;
    
    ctx.beginPath();
    let rot = Math.PI/2*3;
    
    for(let i = 0; i < spikes; i++) {
      // Branche extérieure
      ctx.lineTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius);
      rot += Math.PI/spikes;
      
      // Branche intérieure
      ctx.lineTo(Math.cos(rot) * innerRadius, Math.sin(rot) * innerRadius);
      rot += Math.PI/spikes;
    }
    
    ctx.closePath();
    
    // Dégradé doré
    const gradient = ctx.createRadialGradient(0, 0, size*0.1, 0, 0, size);
    gradient.addColorStop(0, `rgba(255, 255, 210, ${opacity})`);
    gradient.addColorStop(0.7, `rgba(255, 255, 150, ${opacity*0.8})`);
    gradient.addColorStop(1, `rgba(255, 200, 50, ${opacity*0.2})`);
    
    ctx.fillStyle = gradient;
    ctx.shadowColor = `rgba(255, 255, 200, ${opacity*0.4})`;
    ctx.shadowBlur = size * 0.6;
    ctx.fill();
    
    // Centre brillant
    ctx.beginPath();
    ctx.arc(0, 0, size*0.12, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity*0.9})`;
    ctx.fill();
    
    ctx.restore();
  }

  class ShootingStar {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width * 0.3 + canvas.width;
      this.y = Math.random() * canvas.height * 0.3 - 50;
      this.size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
      this.speed = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;
      this.opacity = 0;
      this.maxOpacity = Math.random() * 0.2 + config.brightness;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.008;
    }
    
    update() {
      this.x -= this.speed;
      this.y += this.speed * 0.35;
      this.rotation += this.rotationSpeed;
      
      // Fade in progressif
      if(this.opacity < this.maxOpacity) {
        this.opacity += 0.006;
      }
      
      // Réinitialisation si hors écran
      if(this.x < -100 || this.y > canvas.height + 100) {
        this.reset();
      }
    }
    
    draw() {
      // Étoile principale
      drawStar(ctx, this.x, this.y, this.size, this.opacity, this.rotation);
      
      // Traînée (seulement si assez visible)
      if (this.opacity > 0.3) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.speed * 6, this.y - this.speed * 2.1);
        ctx.strokeStyle = `rgba(255, 255, 180, ${this.opacity*0.15})`;
        ctx.lineWidth = this.size * 0.35;
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  // Initialisation des étoiles
  const stars = Array(config.starCount).fill().map(() => new ShootingStar());

  function animate() {
    // Nettoyage du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Animation des étoiles
    stars.forEach(star => {
      star.update();
      star.draw();
    });
    
    requestAnimationFrame(animate);
  }

  // Démarrer l'animation
  animate();