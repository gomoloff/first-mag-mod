import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const pathname = urlObj.pathname;
  const view = urlObj.searchParams.get('view') || 'home';

  // 1. Static asset serving
  if (pathname !== '/' && !pathname.endsWith('.html') && pathname.includes('.')) {
    const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
    const filePath = path.join(__dirname, safePath);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      fs.createReadStream(filePath).pipe(res);
    });
    return;
  }

  // 2. Dynamic WordPress Theme Preview Renderer
  const html = renderWordPressTheme(view, urlObj);
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[First Mag 2026] WordPress Theme Preview Server running at http://0.0.0.0:${PORT}`);
});

function renderWordPressTheme(view, urlObj) {
  const isSingle = view === 'single';
  const isArchive = view === 'archive';
  const is404 = view === '404';
  const isHome = view === 'home' || (!isSingle && !isArchive && !is404);

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${isSingle ? 'Квантовая лазерная связь лунной станции Gateway на скорости 100 Гбит/с' : (isArchive ? 'Архив рубрики: Орбитальные технологии' : (is404 ? 'Ошибка 404: Координаты не найдены' : 'First Mag — Информационный IT & Space портал 2026'))}</title>
  
  <!-- Autonomous Local Stylesheets (Zero External CDN) -->
  <link rel="stylesheet" href="/css/bootstrap.css">
  <link rel="stylesheet" href="/css/font-awesome.min.css">
  <link rel="stylesheet" href="/style.css">

  <style>
    /* Inspector / Demo Bar for Live Reviewer */
    #demo-bar {
      position: sticky;
      top: 0;
      z-index: 9999;
      background: rgba(15, 23, 42, 0.94);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      color: #f8fafc;
      padding: 8px 18px;
      font-family: var(--font-sans);
      font-size: 13px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
    #demo-bar a.demo-tab {
      color: #94a3b8;
      text-decoration: none;
      padding: 4px 10px;
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    #demo-bar a.demo-tab:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
    }
    #demo-bar a.demo-tab.active {
      color: #ffffff;
      background: #3b82f6;
      box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
    }
    .demo-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .demo-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #cbd5e1;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .demo-btn:hover {
      background: rgba(255, 255, 255, 0.16);
      color: #ffffff;
    }
    .demo-badge {
      font-family: var(--font-mono);
      font-size: 11px;
      color: #06b6d4;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .demo-badge span.dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #06b6d4;
      box-shadow: 0 0 8px #06b6d4;
    }
    /* Simulation Container width switcher */
    .rsrc-container.w-1200 { max-width: 1200px !important; }
    .rsrc-container.w-1440 { max-width: 1400px !important; }
    .rsrc-container.w-1740 { max-width: 1740px !important; }
    .rsrc-container.w-full { max-width: 98% !important; }
  </style>
</head>
<body id="blog" class="logged-in ${isHome ? 'home' : ''}">

  <!-- Live Review Inspector Controls -->
  <div id="demo-bar">
    <div style="display: flex; align-items: center; gap: 14px;">
      <span class="demo-badge">
        <span class="dot"></span>
        WP 6.x THEME REFACTOR [LIGHT CYBER & SPACE]
      </span>
      <div style="display: flex; gap: 4px;">
        <a href="/?view=home" class="demo-tab ${isHome ? 'active' : ''}">Главная (Front Page)</a>
        <a href="/?view=single" class="demo-tab ${isSingle ? 'active' : ''}">Статья (Single Article)</a>
        <a href="/?view=archive" class="demo-tab ${isArchive ? 'active' : ''}">Архив (Archive)</a>
        <a href="/?view=404" class="demo-tab ${is404 ? 'active' : ''}">404 Страница</a>
      </div>
    </div>
    
    <div class="demo-controls">
      <span style="font-size: 11px; color: #94a3b8;">Ширина экрана:</span>
      <button class="demo-btn" onclick="setWidth('1200')">1200px</button>
      <button class="demo-btn" onclick="setWidth('1440')">1440px</button>
      <button class="demo-btn" onclick="setWidth('1740')">1740px (Wide)</button>
      <button class="demo-btn" onclick="setWidth('full')">Full</button>

      <span style="font-size: 11px; color: #94a3b8; margin-left: 8px;">Фон:</span>
      <button class="demo-btn" onclick="setBg('canvas')">Canvas Созвездия</button>
      <button class="demo-btn" onclick="setBg('space1')">Space Nebula 1</button>
      <button class="demo-btn" onclick="setBg('space2')">Deep Space 2</button>
    </div>
  </div>

  <!-- Autonomous Light Cosmos Background Canvas & Backdrop Layer -->
  <canvas id="space-canvas" aria-hidden="true"></canvas>
  <div id="space-backdrop" aria-hidden="true"></div>

  <!-- Main WordPress Layout Frame -->
  <div id="main-container" class="container rsrc-container w-1440" role="main">
    
    <!-- Header (template-part-head.php) -->
    <header id="site-header" class="rsrc-header" role="banner">
      <div class="rsrc-header-text">
        <h1 class="site-title">
          <a href="/?view=home" rel="home">FIRST MAG</a>
        </h1>
        <h2 class="site-desc">ПОРТАЛ КОСМИЧЕСКИХ МИССИЙ & IT-ТЕХНОЛОГИЙ 2026</h2>
      </div>

      <div class="header-telemetry hidden-xs">
        <span class="telemetry-pulse" aria-hidden="true"></span>
        <span>ORBITAL TELEMETRY // 100% AUTONOMOUS ZERO-CDN</span>
      </div>

      <div class="header-ad">
        <div id="header-ad-section" class="clearfix">
          <div style="background: var(--space-surface-muted); border: 1px solid var(--border-tech); padding: 8px 16px; border-radius: var(--radius-sm); font-size: 12px; color: var(--text-muted); display: inline-flex; align-items: center; gap: 8px;">
            <i class="fa fa-bullhorn" style="color: var(--accent-primary);"></i>
            <span>[first-mag-header-top-section]: Инфо-виджет шапки</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Top Fullwidth Ad Banner Section (first-mag-top-ad-section) -->
    <div id="top-ad-banner" class="top-ad-section">
      <div style="padding: 6px 12px; border: 1px dashed var(--border-tech); border-radius: var(--radius-sm); font-size: 12px; color: var(--text-muted); display: inline-flex; align-items: center; gap: 8px;">
        <i class="fa fa-satellite" style="color: var(--accent-cyan);"></i>
        <span>Зона [first-mag-top-ad-section]: Спонсор выпуска — Федеральная космическая обсерватория «Спектр»</span>
      </div>
    </div>

    <!-- Navigation Bar (template-part-topnav.php) -->
    <div class="row rsrc-top-menu">
      <nav id="site-navigation" class="navbar" role="navigation" aria-label="Главное меню">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-1-collapse" aria-expanded="false" aria-label="Переключить меню">
            <span class="sr-only">Меню</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>

          <div class="home-icon ${isHome ? 'front_page_on' : ''}">
            <a href="/?view=home" title="FIRST MAG">
              <i class="fa fa-home" aria-hidden="true"></i>
              <span class="sr-only">Главная</span>
            </a>
          </div>
        </div>

        <div class="collapse navbar-collapse navbar-1-collapse in">
          <ul class="nav navbar-nav">
            <li class="${isHome ? 'active' : ''}"><a href="/?view=home">Главная лента</a></li>
            <li class="${isArchive ? 'active' : ''}"><a href="/?view=archive">Орбитальные технологии</a></li>
            <li class="${isSingle ? 'active' : ''}"><a href="/?view=single">Глубокий космос & AI</a></li>
            <li><a href="/?view=archive">Квантовые вычисления</a></li>
            <li><a href="/?view=single">Астрофизика</a></li>
            <li><a href="/?view=404">Лаборатория 404</a></li>
          </ul>
        </div>
      </nav>
    </div>

    ${renderViewBody(view)}

    <!-- Footer (footer.php) -->
    <footer id="colophon" class="rsrc-footer" role="contentinfo">
      <div class="row rsrc-author-credits">
        <div class="col-sm-12 text-center">
          <div class="ya-share2" style="display: flex; justify-content: center; gap: 10px; margin-bottom: 16px;">
            <span style="font-size: 12px; color: var(--text-muted); align-self: center; margin-right: 6px;">Поделиться:</span>
            <span class="btn outline" style="padding: 4px 10px; font-size: 12px;"><i class="fa fa-vk" style="margin-right:4px;"></i> VK</span>
            <span class="btn outline" style="padding: 4px 10px; font-size: 12px;"><i class="fa fa-paper-plane" style="margin-right:4px;"></i> Telegram</span>
            <span class="btn outline" style="padding: 4px 10px; font-size: 12px;"><i class="fa fa-twitter" style="margin-right:4px;"></i> Twitter/X</span>
            <span class="btn outline" style="padding: 4px 10px; font-size: 12px;"><i class="fa fa-linkedin" style="margin-right:4px;"></i> LinkedIn</span>
          </div>

          <div class="footer-copyright">
            Copyright &copy; ${new Date().getFullYear()} GOMOLOFF | <a href="/?view=home">First Mag</a> — ультрасовременный IT & Cosmos портал 2026. Полная автономность Zero-CDN.
          </div>
        </div>
      </div>
    </footer>

    <!-- Back to Top Float Button -->
    <div id="back-top" style="display:none;">
      <a href="#blog" aria-label="Наверх"></a>
    </div>

  </div> <!-- End rsrc-container -->

  <!-- Local Theme Scripts -->
  <script src="/js/space-canvas.js"></script>
  <script>
    // Live Review Helpers
    function setWidth(w) {
      var c = document.getElementById('main-container');
      c.classList.remove('w-1200', 'w-1440', 'w-1740', 'w-full');
      c.classList.add('w-' + w);
    }
    function setBg(mode) {
      if (window.SpaceCanvas) {
        window.SpaceCanvas.setBackgroundMode(mode);
      }
    }

    // Vanilla interactive handlers
    document.addEventListener('DOMContentLoaded', function() {
      var backTop = document.getElementById('back-top');
      window.addEventListener('scroll', function() {
        if (window.scrollY > 160) {
          backTop.style.display = 'block';
        } else {
          backTop.style.display = 'none';
        }
      });
      backTop.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  </script>
</body>
</html>`;
}

function renderViewBody(view) {
  if (view === 'single') {
    return renderSingleView();
  } else if (view === 'archive') {
    return renderArchiveView();
  } else if (view === '404') {
    return render404View();
  }
  return renderHomeView();
}

function renderHomeView() {
  return `
    <!-- Hero Slider Showcase (template-part-slider.php) -->
    <section id="slider" class="flexslider" style="margin: 20px 24px 0 24px;">
      <ul class="slides" style="padding: 0; margin: 0; list-style: none;">
        <li style="position: relative; overflow: hidden; border-radius: var(--radius-lg); background: #ffffff; border: 1px solid var(--border-tech); box-shadow: var(--shadow-sm);">
          <div class="flex-img" style="aspect-ratio: 21/9; overflow: hidden; background: #e2e8f0;">
            <img src="/img/demo/image_1.jpg" alt="Лунная орбитальная станция Gateway" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="flex-caption">
            <div class="flex-title home-header" style="padding: 0;">
              <header>
                <div class="post-meta" style="margin-bottom: 6px;">
                  <span>Орбитальная группировка</span>
                  <span aria-hidden="true">·</span>
                  <time>05 Октября 2026</time>
                  <span aria-hidden="true">·</span>
                  <span>14 комментариев</span>
                </div>
                <h2 class="page-header" style="margin: 0 0 8px 0; font-size: 1.75rem;">
                  <a href="/?view=single">Квантовая лазерная связь лунной станции Gateway переведена на канал 100 Гбит/с</a>
                </h2>
              </header>
              <div class="entry-summary hidden-xs" style="margin: 0;">
                Международный экипаж завершил юстировку интерферометрического терминала оптической связи. Скорость передачи телеметрических данных на Землю выросла в 40 раз.
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <!-- Main Content Container with Sidebars -->
    <div class="row rsrc-content">
      
      <!-- Primary Main Column (front-page.php) -->
      <main id="primary" class="col-md-8 rsrc-main" role="main">
        
        <!-- Category Widget 1: Featured Post + 4 Grid Articles (lib/widgets.php) -->
        <div class="widget first-mag-widget" style="padding: 24px; margin-bottom: 28px;">
          <h3 class="widget-title">
            <span class="title-text">ГЛАВНЫЕ ТЕМЫ: АСТРОИНФОРМАТИКА & AI</span>
          </h3>
          
          <div class="row">
            <!-- First Large Post -->
            <div class="first-post col-md-6 col-sm-12">
              <article class="card-inner" style="background: #ffffff; border: 1px solid var(--border-tech); border-radius: var(--radius-md); overflow: hidden;">
                <div class="featured-thumbnail" style="aspect-ratio: 16/9;">
                  <a href="/?view=single">
                    <img src="/img/demo/image_2.jpg" alt="Нейроморфные чипы" style="width: 100%; height: 100%; object-fit: cover;">
                  </a>
                </div>
                <div class="home-header">
                  <header>
                    <h3 class="page-header" style="font-size: 1.15rem;">
                      <a href="/?view=single">Нейроморфные процессоры 2026 года для автономных зондов в поясе Койпера</a>
                    </h3>
                    <div class="post-meta">
                      <time>04 Октября 2026</time>
                      <span>Алексей Смирнов</span>
                    </div>
                  </header>
                  <div class="entry-summary">
                    Новая кремниево-фотонная архитектура потребляет всего 1.2 Ватта при вычислительной плотности 45 TOPS, что позволяет зондам принимать навигационные решения в реальном времени.
                  </div>
                </div>
              </article>
            </div>

            <!-- Small Posts Stream -->
            <div class="small-post col-md-6 col-sm-12">
              <div style="display: flex; flex-direction: column; gap: 14px;">
                <article style="display: flex; gap: 12px; align-items: center; padding-bottom: 12px; border-bottom: 1px solid var(--border-tech-subtle);">
                  <div style="width: 90px; height: 68px; flex-shrink: 0; border-radius: 8px; overflow: hidden; background: #e2e8f0;">
                    <img src="/img/demo/image_3.jpg" style="width:100%; height:100%; object-fit: cover;">
                  </div>
                  <div>
                    <h4 style="margin: 0 0 4px 0; font-size: 0.9375rem; font-weight: 700; line-height: 1.3;">
                      <a href="/?view=single" style="color: var(--text-main); text-decoration: none;">Телескоп «Спектр-УФ» подтвердил обнаружение водяных шлейфов Европы</a>
                    </h4>
                    <div class="post-meta" style="margin: 0; font-size: 0.75rem;">
                      <time>03 Октября 2026</time>
                    </div>
                  </div>
                </article>

                <article style="display: flex; gap: 12px; align-items: center; padding-bottom: 12px; border-bottom: 1px solid var(--border-tech-subtle);">
                  <div style="width: 90px; height: 68px; flex-shrink: 0; border-radius: 8px; overflow: hidden; background: #e2e8f0;">
                    <img src="/img/demo/image_4.jpg" style="width:100%; height:100%; object-fit: cover;">
                  </div>
                  <div>
                    <h4 style="margin: 0 0 4px 0; font-size: 0.9375rem; font-weight: 700; line-height: 1.3;">
                      <a href="/?view=single" style="color: var(--text-main); text-decoration: none;">Стандарт сотовой связи 6G интегрирован в низкоорбитальные аппараты связи</a>
                    </h4>
                    <div class="post-meta" style="margin: 0; font-size: 0.75rem;">
                      <time>02 Октября 2026</time>
                    </div>
                  </div>
                </article>

                <article style="display: flex; gap: 12px; align-items: center;">
                  <div style="width: 90px; height: 68px; flex-shrink: 0; border-radius: 8px; overflow: hidden; background: #e2e8f0;">
                    <img src="/img/demo/image_5.jpg" style="width:100%; height:100%; object-fit: cover;">
                  </div>
                  <div>
                    <h4 style="margin: 0 0 4px 0; font-size: 0.9375rem; font-weight: 700; line-height: 1.3;">
                      <a href="/?view=single" style="color: var(--text-main); text-decoration: none;">Сверхпроводящие магниты нового поколения для термоядерных двигателей</a>
                    </h4>
                    <div class="post-meta" style="margin: 0; font-size: 0.75rem;">
                      <time>01 Октября 2026</time>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        <!-- Two-Column Magazine Grid Cards (content.php loop) -->
        <h3 class="page-header" style="margin-bottom: 20px;">
          <span class="title-text">СВЕЖИЕ МАТЕРИАЛЫ И ИССЛЕДОВАНИЯ</span>
        </h3>
        
        <div class="front-page-content row">
          
          <article class="rsrc-archive col-md-6 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single">
                  <img src="/img/demo/image_6.jpg" alt="Марсианский ровер">
                </a>
              </div>
              <div class="home-header">
                <header>
                  <h2 class="page-header">
                    <a href="/?view=single">Автономный бур ровера «Марс-2026» достиг подповерхностного льда на глубине 4 метров</a>
                  </h2>
                  <div class="post-meta">
                    <time>30 Сентября 2026</time>
                    <span aria-hidden="true">·</span>
                    <span>Елена Романова</span>
                    <span aria-hidden="true">·</span>
                    <span>Геология</span>
                  </div>
                </header>
                <div class="entry-summary">
                  Образцы кристаллизованного льда законсервированы в герметичных титановых капсулах для предстоящей доставки на станцию орбитальной лаборатории.
                </div>
              </div>
            </div>
          </article>

          <article class="rsrc-archive col-md-6 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single">
                  <img src="/img/demo/image_1.jpg" alt="Квантовые репитеры">
                </a>
              </div>
              <div class="home-header">
                <header>
                  <h2 class="page-header">
                    <a href="/?view=single">Квантовые репитеры на алмазных NV-центрах выдержали годичный тест в открытом космосе</a>
                  </h2>
                  <div class="post-meta">
                    <time>29 Сентября 2026</time>
                    <span aria-hidden="true">·</span>
                    <span>Дмитрий Соколов</span>
                    <span aria-hidden="true">·</span>
                    <span>Кванты</span>
                  </div>
                </header>
                <div class="entry-summary">
                  Радиационная стойкость кристаллов позволила сохранить квантовую запутанность на дистанции свыше 1200 километров между микроспутниками.
                </div>
              </div>
            </div>
          </article>

          <article class="rsrc-archive col-md-6 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single">
                  <img src="/img/demo/image_2.jpg" alt="Орбитальная верфь">
                </a>
              </div>
              <div class="home-header">
                <header>
                  <h2 class="page-header">
                    <a href="/?view=single">На околоземной орбите развёрнут первый роботизированный станок 3D-печати углепластиком</a>
                  </h2>
                  <div class="post-meta">
                    <time>28 Сентября 2026</time>
                    <span aria-hidden="true">·</span>
                    <span>Игорь Васильев</span>
                    <span aria-hidden="true">·</span>
                    <span>Инженерия</span>
                  </div>
                </header>
                <div class="entry-summary">
                  Конструкция позволяет собирать солнечные фермы километрового масштаба без необходимости транспортировки массивных ферменных узлов с Земли.
                </div>
              </div>
            </div>
          </article>

          <article class="rsrc-archive col-md-6 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single">
                  <img src="/img/demo/image_3.jpg" alt="Радиоастрономия">
                </a>
              </div>
              <div class="home-header">
                <header>
                  <h2 class="page-header">
                    <a href="/?view=single">Обратная сторона Луны: завершён монтаж первого сектора радиоинтерферометра низкой частоты</a>
                  </h2>
                  <div class="post-meta">
                    <time>27 Сентября 2026</time>
                    <span aria-hidden="true">·</span>
                    <span>Мария Кузнецова</span>
                    <span aria-hidden="true">·</span>
                    <span>Астрономия</span>
                  </div>
                </header>
                <div class="entry-summary">
                  Зона радиотишины за лунным горизонтом открывает уникальное окно для наблюдения эпохи первичной реионизации Вселенной без земных радиопомех.
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Shortcodes Ultimate Simulation Module -->
        <div class="su-custom-posts-row" style="background: #ffffff; border: 1px solid var(--border-tech); border-radius: var(--radius-md); padding: 20px; margin-top: 14px; margin-bottom: 28px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <h4 style="margin: 0; font-size: 0.9375rem; font-weight: 700; text-transform: uppercase; color: var(--accent-primary); letter-spacing: 0.04em;">
              ШОРТКОД [su_posts template="templates/teaser-loop_mod.php"]
            </h4>
            <span style="font-size: 11px; font-family: var(--font-mono); color: var(--text-muted);">Shortcodes Ultimate Compatible</span>
          </div>
          <div class="row">
            <div class="col-md-3 col-sm-6" style="margin-bottom: 10px;">
              <div style="font-size: 13px; font-weight: 600;"><a href="/?view=single" style="color:var(--text-main); text-decoration:none;">01. Программа Artemis VII</a></div>
              <div style="font-size: 11px; color: var(--text-muted);">Монтаж жилого шлюза</div>
            </div>
            <div class="col-md-3 col-sm-6" style="margin-bottom: 10px;">
              <div style="font-size: 13px; font-weight: 600;"><a href="/?view=single" style="color:var(--text-main); text-decoration:none;">02. Спутник «Метеор-МП»</a></div>
              <div style="font-size: 11px; color: var(--text-muted);">Радар с фазированной решёткой</div>
            </div>
            <div class="col-md-3 col-sm-6" style="margin-bottom: 10px;">
              <div style="font-size: 13px; font-weight: 600;"><a href="/?view=single" style="color:var(--text-main); text-decoration:none;">03. Защита от микрометеоритов</a></div>
              <div style="font-size: 11px; color: var(--text-muted);">Самозатягивающиеся гели</div>
            </div>
            <div class="col-md-3 col-sm-6" style="margin-bottom: 10px;">
              <div style="font-size: 13px; font-weight: 600;"><a href="/?view=single" style="color:var(--text-main); text-decoration:none;">04. Квантовый гироскоп</a></div>
              <div style="font-size: 11px; color: var(--text-muted);">Точность 10^-8 град/час</div>
            </div>
          </div>
        </div>

        <!-- Modern Pagination (the_posts_pagination()) -->
        <div class="footer-pagination">
          <nav class="navigation pagination" aria-label="Пагинация записей">
            <div class="nav-links">
              <span class="current">1</span>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">Далее →</a>
            </div>
          </nav>
        </div>

      </main>

      <!-- Right Sidebar (first-mag-right-sidebar) -->
      <aside id="sidebar" class="col-md-4 rsrc-right" role="complementary">
        
        <!-- Search Widget -->
        <div class="widget">
          <h3 class="widget-title"><span class="title-text">ПОИСК ПО БАЗЕ ДАННЫХ</span></h3>
          <form role="search" method="get" action="/">
            <div style="display: flex; gap: 8px;">
              <input type="text" class="form-control" placeholder="Поиск миссий, статей, спутников..." name="s">
              <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
            </div>
          </form>
        </div>

        <!-- Orbital Telemetry Status Widget -->
        <div class="widget">
          <h3 class="widget-title"><span class="title-text">ОРБИТАЛЬНЫЙ МОНИТОРИНГ</span></h3>
          <div style="display: flex; flex-direction: column; gap: 10px; font-size: 13px;">
            <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--border-tech-subtle);">
              <span style="color: var(--text-muted);">МКС (Высота / Скорость):</span>
              <span style="font-family: var(--font-mono); font-weight: 600;">418.2 км / 7.66 км/с</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--border-tech-subtle);">
              <span style="color: var(--text-muted);">Gateway (L2 гало-орбита):</span>
              <span style="font-family: var(--font-mono); font-weight: 600; color: #16a34a;">● СТАТУС: ШТАТНО</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--border-tech-subtle);">
              <span style="color: var(--text-muted);">Солнечная активность:</span>
              <span style="font-family: var(--font-mono); font-weight: 600; color: #ea580c;">KP-INDEX 2 (Спокойная)</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px 0;">
              <span style="color: var(--text-muted);">Лазерный линк Земля-Луна:</span>
              <span style="font-family: var(--font-mono); font-weight: 600; color: #0284c7;">102.4 Гбит/с [АКТИВЕН]</span>
            </div>
          </div>
        </div>

        <!-- Categories Widget -->
        <div class="widget">
          <h3 class="widget-title"><span class="title-text">РАЗДЕЛЫ ПОРТАЛА</span></h3>
          <ul>
            <li><a href="/?view=archive"><i class="fa fa-angle-right" style="margin-right:8px; color: var(--accent-primary);"></i> Орбитальные технологии <span style="float: right; color: var(--text-muted);">(42)</span></a></li>
            <li><a href="/?view=archive"><i class="fa fa-angle-right" style="margin-right:8px; color: var(--accent-primary);"></i> Глубокий космос & AI <span style="float: right; color: var(--text-muted);">(38)</span></a></li>
            <li><a href="/?view=archive"><i class="fa fa-angle-right" style="margin-right:8px; color: var(--accent-primary);"></i> Квантовые вычисления <span style="float: right; color: var(--text-muted);">(29)</span></a></li>
            <li><a href="/?view=archive"><i class="fa fa-angle-right" style="margin-right:8px; color: var(--accent-primary);"></i> Астрофизика & Телескопы <span style="float: right; color: var(--text-muted);">(51)</span></a></li>
            <li><a href="/?view=archive"><i class="fa fa-angle-right" style="margin-right:8px; color: var(--accent-primary);"></i> Ракетно-космические двигатели <span style="float: right; color: var(--text-muted);">(19)</span></a></li>
          </ul>
        </div>

        <!-- Tag Cloud Widget -->
        <div class="widget">
          <h3 class="widget-title"><span class="title-text">КЛЮЧЕВЫЕ ТЕГИ</span></h3>
          <div class="post-tags" style="border: none; margin: 0; padding: 0;">
            <span><a href="/?view=archive">Gateway</a></span>
            <span><a href="/?view=archive">6G связи</a></span>
            <span><a href="/?view=archive">Нейроморфные чипы</a></span>
            <span><a href="/?view=archive">NV-центры</a></span>
            <span><a href="/?view=archive">Спектр-УФ</a></span>
            <span><a href="/?view=archive">Artemis VII</a></span>
            <span><a href="/?view=archive">Ионные двигатели</a></span>
          </div>
        </div>

      </aside>

    </div>
  `;
}

function renderSingleView() {
  return `
    <div class="row rsrc-content">
      
      <!-- Single Article Main Content (content-single.php) -->
      <main id="primary" class="col-md-8 rsrc-main" role="main">
        
        <!-- Breadcrumbs (first_mag_breadcrumb()) -->
        <nav id="breadcrumbs" aria-label="Хлебные крошки">
          <div class="breadcrumbs-inner text-left">
            <span><a href="/?view=home"><i class="fa fa-home"></i> <span>Главная</span></a></span>
            <span class="crumb-separator"> &raquo; </span>
            <span><a href="/?view=archive"><span>Орбитальные технологии</span></a></span>
            <span class="crumb-separator"> &raquo; </span>
            <span class="current-crumb">Квантовая лазерная связь лунной станции Gateway</span>
          </div>
        </nav>

        <article id="post-101" class="rsrc-post-content" style="background: #ffffff; border: 1px solid var(--border-tech); border-radius: var(--radius-lg); padding: 36px 32px; box-shadow: var(--shadow-card);">
          
          <header class="single-entry-header">
            <h1 class="entry-title page-header" style="font-size: 2.15rem; line-height: 1.25; margin-bottom: 16px;">
              Квантовая лазерная связь лунной станции Gateway переведена на рабочий канал 100 Гбит/с
            </h1>
            
            <!-- Zero-Pill Metadata Discipline -->
            <div class="post-meta" style="margin-bottom: 24px;">
              <span class="meta-date">
                <i class="fa fa-clock-o"></i>
                <time datetime="2026-10-05">05 Октября 2026</time>
              </span>
              <span class="meta-author">
                <i class="fa fa-user-o"></i>
                <span class="author-link">Михаил Романов (Главный инженер миссии)</span>
              </span>
              <span class="meta-comments">
                <i class="fa fa-comment-o"></i>
                <span>12 комментариев</span>
              </span>
              <span class="meta-cat">
                <i class="fa fa-folder-o"></i>
                <a href="/?view=archive">Орбитальные технологии</a>, <a href="/?view=archive">Лазерная связь</a>
              </span>
            </div>
          </header>

          <!-- Featured Image Frame -->
          <div class="single-thumbnail" style="margin-bottom: 32px;">
            <img src="/img/demo/image_1.jpg" alt="Оптический терминал Gateway" style="width: 100%; border-radius: var(--radius-md);">
          </div>

          <!-- Strictly Constrained Reading Width (.entry-content max-width: 820px) -->
          <div class="entry-content">
            <p>
              Международная группа астроинженеров и связистов орбитального комплекса <strong>Lunar Gateway</strong> подтвердила успешный переход экспериментального фотонного канала на регулярную круглосуточную эксплуатацию. Скорость стабильного потока между ретрансляционным модулем станции и наземным приёмным комплексом в высокогорной обсерватории Тейде (Канарские острова) превысила 104.2 Гбит/с при битовой вероятности ошибки менее 10<sup>-9</sup>.
            </p>

            <blockquote style="margin: 28px 0; padding: 18px 24px; background: var(--space-surface-muted); border-left: 4px solid var(--accent-primary); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-style: italic;">
              «Мы больше не ограничены узкими радиочастотными полосами S- и Ka-диапазонов. Теперь высокодетальные спектрографические карты лунного грунта и 8K 3D-видеопотоки операций на поверхности Луны передаются на Землю практически без задержки и сжатия».
            </blockquote>

            <h2>Интерферометрическая юстировка и компенсация атмосферных искажений</h2>
            <p>
              Ключевой технологической трудностью оптической связи на лунных дистанциях (около 384 400 км) традиционно являлась атмосферная турбулентность вблизи земных терминалов и микродрожания корпуса станции от работы маховиков ориентации. В решении 2026 года применены адаптивные деформируемые зеркала с пьезоприводами частотой коррекции 20 кГц и квантово-запутанный опорный маяк с длиной волны 1550 нм.
            </p>

            <div style="background: var(--space-surface-muted); border: 1px solid var(--border-tech); border-radius: var(--radius-md); padding: 18px 24px; margin: 24px 0; font-family: var(--font-mono); font-size: 0.8125rem;">
              <div style="color: var(--accent-primary); font-weight: 700; margin-bottom: 8px;">// ТЕЛЕМЕТРИЯ ОПТИЧЕСКОГО ТЕРМИНАЛА GATEWAY-LLT</div>
              <div>ПРОТОКОЛ: DP-QPSK (Квантовое уплотнение фазы)</div>
              <div>МОЩНОСТЬ ЛАЗЕРА: 5.4 Вт (непрерывный полупроводниковый массив)</div>
              <div>ДИАМЕТР ПРИЁМНОЙ АПЕРТУРЫ: 80 см (бериллиевое внеосевое зеркало)</div>
              <div>ДОПУСТИМОЕ ОТКЛОНЕНИЕ ЛУЧА: ±0.15 угловой микросекунды</div>
            </div>

            <h2>Перспективы внедрения на марсианских аппаратах</h2>
            <p>
              Следующим этапом испытаний станет тестирование релейной передачи на зонды, готовящиеся к отправке к точкам Лагранжа системы Солнце-Марс. Переход к оптической связи позволит увеличить совокупную пропускную способность межпланетного интернета на четыре порядка величины к 2030 году.
            </p>
          </div>

          <!-- Tags List (template-part-posttags.php) -->
          <div class="post-tags" style="margin-top: 36px;">
            <i class="fa fa-tags"></i>
            <span>
              <a href="/?view=archive">Gateway</a>
              <a href="/?view=archive">Оптическая связь</a>
              <a href="/?view=archive">Квантовая криптография</a>
              <a href="/?view=archive">Фотонные репитеры</a>
            </span>
          </div>

          <!-- Post Navigation -->
          <nav class="post-navigation">
            <div class="post-previous">
              <span class="meta-nav">← Предыдущий материал</span>
              <a href="/?view=single" class="nav-title">Развёртывание криогенных детекторов «Спектр-УФ»</a>
            </div>
            <div class="post-next text-right">
              <span class="meta-nav">Следующий материал →</span>
              <a href="/?view=single" class="nav-title">Нейроморфные чипы для автономных зондов</a>
            </div>
          </nav>

          <!-- Post Author Box (template-part-postauthor.php) -->
          <section class="postauthor-container">
            <div class="postauthor-title">
              <h4>Об авторе публикации</h4>
            </div>
            <div class="postauthor-content">
              <img src="/img/demo/image_6.jpg" class="img-circle" style="width: 64px; height: 64px; object-fit: cover;">
              <div class="author-details">
                <h5 class="vcard fn"><a href="#">Михаил Романов</a></h5>
                <p>Кандидат физико-математических наук, ведущий специалист по космическим оптическим системам связи, постоянный автор аналитических колонок First Mag.</p>
              </div>
            </div>
          </section>

          <!-- Related Posts (template-part-related.php) -->
          <section class="related-posts">
            <div class="related-posts-title">
              <h3>Похожие материалы по теме</h3>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div style="background: #ffffff; border: 1px solid var(--border-tech); border-radius: var(--radius-md); overflow: hidden; padding: 12px;">
                  <h4 style="font-size: 1rem; margin: 0 0 6px 0;"><a href="/?view=single" style="color:var(--text-main); text-decoration:none;">Низкоорбитальная сеть связи 6G завершила межспутниковые тесты</a></h4>
                  <p style="font-size: 12px; color: var(--text-muted); margin: 0;">Анализ первых протоколов прямого подключения смартфонов через спутники.</p>
                </div>
              </div>
              <div class="col-sm-6">
                <div style="background: #ffffff; border: 1px solid var(--border-tech); border-radius: var(--radius-md); overflow: hidden; padding: 12px;">
                  <h4 style="font-size: 1rem; margin: 0 0 6px 0;"><a href="/?view=single" style="color:var(--text-main); text-decoration:none;">Алмазные NV-репитеры в условиях космической радиации</a></h4>
                  <p style="font-size: 12px; color: var(--text-muted); margin: 0;">Результаты радиационных тестов квантовых ячеек памяти на геостационаре.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Comments Section (comments.php) -->
          <section id="comments" class="rsrc-comments">
            <h4 class="comments-title">Обсуждение публикации (3 комментария)</h4>
            
            <ol class="commentlist list-unstyled">
              <li class="comment">
                <div class="comment-author">
                  <span style="display:inline-flex; width:36px; height:36px; border-radius:50%; background:var(--accent-subtle); color:var(--accent-primary); align-items:center; justify-content:center; font-weight:700;">СВ</span>
                  <span>Сергей Васильев (Лаборатория радиофизики)</span>
                </div>
                <div class="comment-meta">05 Октября 2026 в 11:42</div>
                <div class="comment-body">
                  <p>Впечатляющий показатель по битовой вероятности ошибки. Интересно, как система справляется с прохождением плотных перистых облаков на Тейде?</p>
                </div>
              </li>
              <li class="comment">
                <div class="comment-author">
                  <span style="display:inline-flex; width:36px; height:36px; border-radius:50%; background:var(--accent-cyan-subtle); color:var(--accent-cyan); align-items:center; justify-content:center; font-weight:700;">МР</span>
                  <span>Михаил Романов (Автор)</span>
                </div>
                <div class="comment-meta">05 Октября 2026 в 12:15</div>
                <div class="comment-body">
                  <p>Сергей, спасибо за вопрос! При облачности более 4 баллов поток автоматически перенаправляется на резервные наземные станции на Гавайях (Мауна-Кеа) и в Чили (Серро-Параналь) через геостационарный интерконнект.</p>
                </div>
              </li>
            </ol>

            <div class="well comment-respond-box">
              <h4 style="margin-top:0; margin-bottom:16px;">Оставить комментарий</h4>
              <form id="commentform">
                <p>
                  <label for="author">Ваше имя *</label>
                  <input type="text" id="author" name="author" class="form-control" required>
                </p>
                <p>
                  <label for="email">Электронная почта *</label>
                  <input type="email" id="email" name="email" class="form-control" required>
                </p>
                <p>
                  <label for="comment">Текст комментария *</label>
                  <textarea id="comment" name="comment" rows="4" class="form-control" required></textarea>
                </p>
                <p style="margin-bottom:0;">
                  <button type="button" class="btn btn-primary" onclick="alert('Комментарий успешно отправлен на модерацию.')">Отправить комментарий</button>
                </p>
              </form>
            </div>
          </section>

        </article>
      </main>

      <!-- Right Sidebar (sidebar-right.php) -->
      <aside id="sidebar" class="col-md-4 rsrc-right" role="complementary">
        <div class="widget">
          <h3 class="widget-title"><span class="title-text">СПЕЦИФИКАЦИЯ МИССИИ</span></h3>
          <div style="font-size: 13px; line-height: 1.6;">
            <div><strong>Объект:</strong> Lunar Orbital Platform</div>
            <div><strong>Дистанция:</strong> 384,400 км</div>
            <div><strong>Статус канала:</strong> 104.2 Gbps [UP]</div>
            <div><strong>Задержка (RTT):</strong> 2.56 секунды</div>
          </div>
        </div>

        <div class="widget">
          <h3 class="widget-title"><span class="title-text">ДРУГИЕ МАТЕРИАЛЫ АВТОРА</span></h3>
          <ul>
            <li><a href="/?view=single">Оптимизация ретрансляторов L2 точки Лагранжа</a></li>
            <li><a href="/?view=single">Анализ помехоустойчивости DP-QPSK в атмосфере</a></li>
            <li><a href="/?view=single">Радиационные эффекты в полупроводниковых лазерах</a></li>
          </ul>
        </div>
      </aside>

    </div>
  `;
}

function renderArchiveView() {
  return `
    <div class="row rsrc-content">
      <main id="primary" class="col-md-12 rsrc-main" role="main">
        
        <nav id="breadcrumbs" aria-label="Хлебные крошки">
          <div class="breadcrumbs-inner text-left">
            <span><a href="/?view=home"><i class="fa fa-home"></i> <span>Главная</span></a></span>
            <span class="crumb-separator"> &raquo; </span>
            <span class="current-crumb">Архив рубрики: Орбитальные технологии</span>
          </div>
        </nav>

        <div class="archive-header text-center" style="margin-bottom: 32px;">
          <h1 class="page-title" style="font-size: 2.2rem; font-weight: 800; margin-bottom: 8px;">Орбитальные технологии</h1>
          <div class="taxonomy-description" style="max-width: 720px; margin: 0 auto; color: var(--text-muted);">
            Все материалы, технические отчеты и новости создания околоземных и лунных инфраструктурных объектов в 2026 году.
          </div>
        </div>

        <!-- 3-Column Responsive Grid Cards on Wide Screens -->
        <div class="front-page-content row">
          
          <article class="rsrc-archive col-md-4 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single"><img src="/img/demo/image_1.jpg"></a>
              </div>
              <div class="home-header">
                <h3 class="page-header"><a href="/?view=single">Квантовая лазерная связь лунной станции Gateway</a></h3>
                <div class="post-meta"><time>05 Окт 2026</time><span>14 коммент.</span></div>
                <div class="entry-summary">Переход фотонного релейного терминала на регулярную эксплуатацию со скоростью 100 Гбит/с.</div>
              </div>
            </div>
          </article>

          <article class="rsrc-archive col-md-4 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single"><img src="/img/demo/image_2.jpg"></a>
              </div>
              <div class="home-header">
                <h3 class="page-header"><a href="/?view=single">Нейроморфные процессоры для зондов пояса Койпера</a></h3>
                <div class="post-meta"><time>04 Окт 2026</time><span>8 коммент.</span></div>
                <div class="entry-summary">Кремниево-фотонная логика с ультранизким энергопотреблением для глубокого космоса.</div>
              </div>
            </div>
          </article>

          <article class="rsrc-archive col-md-4 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single"><img src="/img/demo/image_3.jpg"></a>
              </div>
              <div class="home-header">
                <h3 class="page-header"><a href="/?view=single">Испытания детекторов обсерватории «Спектр-УФ»</a></h3>
                <div class="post-meta"><time>03 Окт 2026</time><span>22 коммент.</span></div>
                <div class="entry-summary">Криогенные матрицы подтвердили высокую чувствительность при регистрации паров воды.</div>
              </div>
            </div>
          </article>

          <article class="rsrc-archive col-md-4 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single"><img src="/img/demo/image_4.jpg"></a>
              </div>
              <div class="home-header">
                <h3 class="page-header"><a href="/?view=single">Низкоорбитальная сеть связи стандарта 6G</a></h3>
                <div class="post-meta"><time>02 Окт 2026</time><span>5 коммент.</span></div>
                <div class="entry-summary">Межспутниковые линии миллиметрового диапазона интегрированы с наземными вышками.</div>
              </div>
            </div>
          </article>

          <article class="rsrc-archive col-md-4 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single"><img src="/img/demo/image_5.jpg"></a>
              </div>
              <div class="home-header">
                <h3 class="page-header"><a href="/?view=single">Сверхпроводящие магниты для плазменных двигателей</a></h3>
                <div class="post-meta"><time>01 Окт 2026</time><span>11 коммент.</span></div>
                <div class="entry-summary">Магнитная ловушка удерживает высокотемпературную дейтериевую плазму при 20 Тесла.</div>
              </div>
            </div>
          </article>

          <article class="rsrc-archive col-md-4 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single"><img src="/img/demo/image_6.jpg"></a>
              </div>
              <div class="home-header">
                <h3 class="page-header"><a href="/?view=single">Роботизированный 3D-принтер для сборки солнечных ферм</a></h3>
                <div class="post-meta"><time>30 Сен 2026</time><span>19 коммент.</span></div>
                <div class="entry-summary">Печать углепластиковых конструкций непосредственно в условиях космического вакуума.</div>
              </div>
            </div>
          </article>

        </div>

        <div class="footer-pagination">
          <nav class="navigation pagination">
            <div class="nav-links">
              <span class="current">1</span>
              <a href="#">2</a>
              <a href="#">3</a>
            </div>
          </nav>
        </div>

      </main>
    </div>
  `;
}

function render404View() {
  return `
    <div class="row rsrc-content">
      <main id="primary" class="col-md-12 rsrc-main text-center" role="main" style="padding: 60px 20px;">
        <div style="font-size: 6rem; font-weight: 900; letter-spacing: -0.05em; color: var(--accent-primary); line-height: 1;">404</div>
        <p class="site-desc" style="color: var(--accent-cyan); font-weight: 700; margin: 10px 0 20px;">ТЕЛЕМЕТРИЧЕСКИЙ СИГНАЛ ПОТЕРЯН // ORBIT 404</p>
        
        <h2 class="page-header" style="max-width: 600px; margin: 0 auto 20px;">
          Запрашиваемый космический модуль или научная публикация не обнаружены в базе данных.
        </h2>

        <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto 30px;">
          Возможно, космический аппарат сменил траекторию либо публикация была перемещена в архив миссий.
        </p>

        <div style="max-width: 440px; margin: 0 auto 30px;">
          <form role="search" method="get" action="/">
            <div style="display: flex; gap: 8px;">
              <input type="text" class="form-control" placeholder="Поиск в бортовом журнале...">
              <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
            </div>
          </form>
        </div>

        <a href="/?view=home" class="btn btn-primary" style="padding: 12px 28px;">
          <i class="fa fa-home" style="margin-right: 8px;"></i> Вернуться на главную станцию
        </a>
      </main>
    </div>
  `;
}
