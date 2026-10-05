/**
 * First Mag - Light Cosmos & IT Constellation Canvas
 * Lightweight (<3KB), performant, Zero-CDN Vanilla JS
 * Handles high-DPI canvas, drifting nodes, twinkling microstars,
 * constellation vectors, and automatic pause on tab blur (visibilitychange).
 */
(function() {
  'use strict';

  var canvas, ctx;
  var width = 0, height = 0, dpr = 1;
  var stars = [];
  var nodes = [];
  var animationId = null;
  var isVisible = true;
  var mouse = { x: -1000, y: -1000, active: false };

  var CONFIG = {
    starCount: 65,
    nodeCount: 42,
    maxDistance: 130,
    nodeSpeed: 0.35,
    starTwinkleSpeed: 0.02,
    colorNode: 'rgba(59, 130, 246, 0.45)',       // Blue-500
    colorCyan: 'rgba(6, 182, 212, 0.45)',        // Cyan-500
    colorLine: 'rgba(59, 130, 246, 0.12)',       // Hairline connector
    colorLineNear: 'rgba(6, 182, 212, 0.22)',   // Closer connector
    colorStar: 'rgba(99, 102, 241, 0.35)'        // Indigo microstar
  };

  function init() {
    canvas = document.getElementById('space-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'space-canvas';
      document.body.insertBefore(canvas, document.body.firstChild);
    }

    ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    resize();
    createParticles();

    window.addEventListener('resize', debounce(resize, 150), { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    window.addEventListener('mousemove', function(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', function() {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    }, { passive: true });

    startLoop();
  }

  function debounce(fn, ms) {
    var timer;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(fn, ms);
    };
  }

  function resize() {
    if (!canvas) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);
  }

  function createParticles() {
    stars = [];
    nodes = [];

    // Scale counts gently for very large screens
    var densityFactor = Math.max(1, (width * height) / (1920 * 1080));
    var totalStars = Math.floor(CONFIG.starCount * densityFactor);
    var totalNodes = Math.floor(CONFIG.nodeCount * densityFactor);

    for (var i = 0; i < totalStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        twinklePhase: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1)
      });
    }

    for (var j = 0; j < totalNodes; j++) {
      var isCyan = Math.random() > 0.5;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * CONFIG.nodeSpeed,
        vy: (Math.random() - 0.5) * CONFIG.nodeSpeed,
        radius: Math.random() * 1.8 + 1.2,
        color: isCyan ? CONFIG.colorCyan : CONFIG.colorNode
      });
    }
  }

  function onVisibilityChange() {
    if (document.hidden) {
      isVisible = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    } else {
      isVisible = true;
      startLoop();
    }
  }

  function startLoop() {
    if (!animationId && isVisible) {
      animationId = requestAnimationFrame(render);
    }
  }

  function render() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw twinkling microstars
    for (var s = 0; s < stars.length; s++) {
      var star = stars[s];
      star.twinklePhase += star.speed;
      var curAlpha = star.alpha + Math.sin(star.twinklePhase) * 0.25;
      if (curAlpha < 0.1) curAlpha = 0.1;
      if (curAlpha > 0.8) curAlpha = 0.8;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99, 102, 241, ' + curAlpha + ')';
      ctx.fill();
    }

    // 2. Update and draw constellation nodes
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      // Gentle bounds wrap
      if (n.x < -10) n.x = width + 10;
      else if (n.x > width + 10) n.x = -10;
      if (n.y < -10) n.y = height + 10;
      else if (n.y > height + 10) n.y = -10;

      // Mouse gentle interaction
      if (mouse.active) {
        var mdx = mouse.x - n.x;
        var mdy = mouse.y - n.y;
        var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 140 && mDist > 0) {
          var force = (140 - mDist) / 140 * 0.08;
          n.x -= (mdx / mDist) * force * 5;
          n.y -= (mdy / mDist) * force * 5;
        }
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();
    }

    // 3. Draw constellation connections
    var maxD = CONFIG.maxDistance;
    var maxDSq = maxD * maxD;

    for (var a = 0; a < nodes.length; a++) {
      for (var b = a + 1; b < nodes.length; b++) {
        var dx = nodes[a].x - nodes[b].x;
        var dy = nodes[a].y - nodes[b].y;
        var dSq = dx * dx + dy * dy;

        if (dSq < maxDSq) {
          var dist = Math.sqrt(dSq);
          var opacity = (1 - dist / maxD) * 0.22;
          ctx.beginPath();
          ctx.moveTo(nodes[a].x, nodes[a].y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
          ctx.strokeStyle = opacity > 0.12 ? CONFIG.colorLineNear : CONFIG.colorLine;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(render);
  }

  // Global control interface
  window.SpaceCanvas = {
    setSpeed: function(s) {
      CONFIG.nodeSpeed = s;
      createParticles();
    },
    setDensity: function(count) {
      CONFIG.nodeCount = count;
      createParticles();
    },
    toggleParticles: function(enabled) {
      if (enabled) {
        isVisible = true;
        startLoop();
      } else {
        isVisible = false;
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
        if (ctx) ctx.clearRect(0, 0, width, height);
      }
    },
    setBackgroundMode: function(mode) {
      var body = document.body;
      body.classList.remove('bg-mode-canvas', 'bg-mode-space1', 'bg-mode-space2');
      if (mode === 'space1') {
        body.classList.add('bg-mode-space1');
      } else if (mode === 'space2') {
        body.classList.add('bg-mode-space2');
      } else {
        body.classList.add('bg-mode-canvas');
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
