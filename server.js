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
  console.log(`[PHP-Web.Info 2026] Server running at http://0.0.0.0:${PORT}`);
});

function renderWordPressTheme(view, urlObj) {
  const isSingle = view === 'single';
  const isArchive = view === 'archive';
  const isHome = view === 'home' || (!isSingle && !isArchive);

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${isSingle ? 'ТАУРИДЫ 2026: ХЭЛЛОУИНСКИЕ БОЛИДЫ КОМЕТЫ ЭНКЕ — PHP-Web.Info' : (isArchive ? 'Космос — PHP-Web.Info' : 'PHP-Web.Info — Полезные статьи и новости')}</title>
  
  <!-- Autonomous Local Stylesheets (Zero External CDN) -->
  <link rel="stylesheet" href="/css/bootstrap.css">
  <link rel="stylesheet" href="/css/font-awesome.min.css">
  <link rel="stylesheet" href="/style.css">

  <style>
    /* Demo switcher bar */
    #demo-bar {
      position: sticky;
      top: 0;
      z-index: 9999;
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      color: #f8fafc;
      padding: 6px 16px;
      font-family: var(--font-sans);
      font-size: 13px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    #demo-bar a.demo-tab {
      color: #94a3b8;
      text-decoration: none;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: 500;
      transition: all 0.15s ease;
    }
    #demo-bar a.demo-tab:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
    }
    #demo-bar a.demo-tab.active {
      color: #ffffff;
      background: #ea580c;
    }
    .demo-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #cbd5e1;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      cursor: pointer;
    }
    .demo-btn:hover {
      background: rgba(255, 255, 255, 0.16);
      color: #ffffff;
    }
  </style>
</head>
<body id="blog" class="logged-in ${isHome ? 'home' : ''}">

  <!-- Reviewer bar -->
  <div id="demo-bar">
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="font-weight: 700; color: #f97316; font-size: 12px;">PHP-Web.Info // 2026 Light Cyber Space</span>
      <div style="display: flex; gap: 4px;">
        <a href="/?view=home" class="demo-tab ${isHome ? 'active' : ''}">Главная страница</a>
        <a href="/?view=single" class="demo-tab ${isSingle ? 'active' : ''}">Страница статьи</a>
        <a href="/?view=archive" class="demo-tab ${isArchive ? 'active' : ''}">Рубрика Космос</a>
      </div>
    </div>
    
    <div style="display: flex; align-items: center; gap: 6px;">
      <span style="font-size: 11px; color: #94a3b8;">Ширина:</span>
      <button class="demo-btn" onclick="setWidth('1200')">1200px</button>
      <button class="demo-btn" onclick="setWidth('1440')">1440px</button>
      <button class="demo-btn" onclick="setWidth('full')">Full</button>
      <span style="font-size: 11px; color: #94a3b8; margin-left: 6px;">Фон:</span>
      <button class="demo-btn" onclick="toggleCanvas()">Созвездия вкл/выкл</button>
    </div>
  </div>

  <!-- Left Sticky Social Share Bar (Exact as live site) -->
  <div id="vertical-share-bar">
    <a href="#" class="share-vk" title="ВКонтакте"><i class="fa fa-vk"></i></a>
    <a href="#" class="share-ok" title="Одноклассники"><i class="fa fa-odnoklassniki"></i></a>
    <a href="#" class="share-mailru" title="Мой Мир"><i class="fa fa-at"></i></a>
    <a href="#" class="share-gplus" title="Google+"><i class="fa fa-google-plus"></i></a>
    <a href="#" class="share-twitter" title="Twitter/X"><i class="fa fa-twitter"></i></a>
    <a href="#" class="share-linkedin" title="LinkedIn"><i class="fa fa-linkedin"></i></a>
    <a href="#" class="share-viber" title="Viber"><i class="fa fa-phone"></i></a>
    <a href="#" class="share-whatsapp" title="WhatsApp"><i class="fa fa-whatsapp"></i></a>
    <a href="#" class="share-skype" title="Skype"><i class="fa fa-skype"></i></a>
    <a href="#" class="share-telegram" title="Telegram"><i class="fa fa-paper-plane"></i></a>
  </div>

  <!-- Light Cosmos Background Canvas & Backdrop Layer -->
  <canvas id="space-canvas" aria-hidden="true"></canvas>
  <div id="space-backdrop" aria-hidden="true"></div>

  <!-- Main WordPress Layout Container -->
  <div id="main-container" class="container rsrc-container" role="main">
    
    <!-- Header (template-part-head.php) -->
    <header id="site-header" class="row rsrc-header" role="banner">
      <!-- Left: Site Title & Tagline -->
      <div class="rsrc-header-text col-md-4 col-sm-6 col-xs-12">
        <h1 class="site-title">
          <a href="/?view=home" rel="home">PHP-Web.Info</a>
        </h1>
        <h2 class="site-desc">Полезные статьи и новости</h2>
      </div>

      <!-- Center: Header QR Code -->
      <div class="col-md-4 col-sm-6 hidden-xs text-left" style="overflow: hidden; padding-top: 10px; display: flex; align-items: center;">
        <div class="header-qrcode-wrap">
          <img src="/img/qr-code.svg" width="90" height="90" alt="QR-код" style="border: 1px solid var(--border-tech); border-radius: var(--radius-sm); padding: 4px; background: #ffffff;">
        </div>
      </div>

      <!-- Right: Search Form -->
      <div class="header-ad col-md-4 col-xs-12">
        <div class="header-search-box">
          <div class="header-search-title">ПОИСКАТЬ</div>
          <form role="search" method="get" action="/" class="header-search-form">
            <input type="text" name="s" class="form-control" placeholder="Поиск...">
            <button type="submit" class="btn btn-primary">Поиск</button>
          </form>
        </div>
      </div>
    </header>

    <!-- Top Navigation Bar (template-part-topnav.php) -->
    <div class="row rsrc-top-menu">
      <nav id="site-navigation" class="navbar" role="navigation" aria-label="Главное меню">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-1-collapse" aria-expanded="false" aria-label="Переключить меню">
            <span class="sr-only">Меню</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>

          <div class="home-icon front_page_on">
            <a href="/?view=home" title="PHP-Web.Info">
              <i class="fa fa-home" aria-hidden="true"></i>
              <span class="sr-only">Главная</span>
            </a>
          </div>
        </div>

        <div class="collapse navbar-collapse navbar-1-collapse in">
          <ul class="nav navbar-nav">
            <li class="${isHome ? 'active' : ''}"><a href="/?view=home">СТАТЬИ</a></li>
            <li><a href="#contacts">КОНТАКТЫ</a></li>
            <li><a href="#gallery">ГАЛЕРЕЯ</a></li>
            <li><a href="#art">ИСКУССТВО</a></li>
            <li><a href="#profile">МОЙ ПРОФИЛЬ</a></li>
          </ul>
        </div>
      </nav>
    </div>

    ${renderViewBody(view)}

    <!-- Footer (footer.php) -->
    <footer id="colophon" class="rsrc-footer" role="contentinfo">
      <div class="row rsrc-author-credits">
        <div class="col-sm-12 text-center">
          <div class="ya-share2" style="display: flex; justify-content: center; gap: 8px; margin-bottom: 12px;"></div>
          <div class="footer-copyright" style="font-weight: 600; letter-spacing: 0.04em;">
            COPYRIGHT &copy; GOMOLOFF
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
    function setWidth(w) {
      var c = document.getElementById('main-container');
      if (w === 'full') {
        c.style.maxWidth = '98%';
      } else {
        c.style.maxWidth = w + 'px';
      }
    }
    var canvasOn = true;
    function toggleCanvas() {
      canvasOn = !canvasOn;
      if (window.SpaceCanvas) {
        window.SpaceCanvas.toggleParticles(canvasOn);
      }
    }
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
  }
  return renderHomeView();
}

function renderHomeView() {
  return `
    <div class="row rsrc-content">
      
      <!-- Primary Main Column (front-page.php) -->
      <main id="primary" class="col-md-9 col-sm-12 rsrc-main" role="main">
        
        <!-- 6 Main Articles Grid (content.php loop) -->
        <div class="front-page-content row">
          
          <!-- Post 1: Тауриды -->
          <article class="rsrc-archive col-md-6 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single">
                  <img src="/img/demo/taurids.svg" alt="Тауриды 2026: Хэллоуинские болиды кометы Энке">
                </a>
              </div>
              <div class="home-header">
                <h2 class="page-header">
                  <a href="/?view=single"><span class="drop-initial">Т</span>АУРИДЫ 2026: ХЭЛЛОУИНСКИЕ БОЛИДЫ КОМЕТЫ ЭНКЕ</a>
                </h2>
                <div class="post-meta">
                  <i class="fa fa-clock-o"></i> <time>05.10.2026</time>
                  <i class="fa fa-user"></i> <span>gomoloff</span>
                  <i class="fa fa-comment"></i> <span>0</span>
                  <i class="fa fa-folder-open"></i> <span>Космос</span>
                </div>
                <div class="entry-summary">
                  В конце октября и первой половине ноября 2026 года Земля снова пересекает широкий пылевой шлейф кометы Энке...
                </div>
              </div>
            </div>
          </article>

          <!-- Post 2: Геминиды -->
          <article class="rsrc-archive col-md-6 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single">
                  <img src="/img/demo/geminids.svg" alt="Геминиды 2026: Главный звездопад декабря">
                </a>
              </div>
              <div class="home-header">
                <h2 class="page-header">
                  <a href="/?view=single"><span class="drop-initial">Г</span>ЕМИНИДЫ 2026: ГЛАВНЫЙ ЗВЕЗДОПАД ДЕКАБРЯ И ПЫЛЬ АСТЕРОИДА ФАЭТОН</a>
                </h2>
                <div class="post-meta">
                  <i class="fa fa-clock-o"></i> <time>04.10.2026</time>
                  <i class="fa fa-user"></i> <span>gomoloff</span>
                  <i class="fa fa-comment"></i> <span>0</span>
                  <i class="fa fa-folder-open"></i> <span>Космос</span>
                </div>
                <div class="entry-summary">
                  В середине декабря ночное небо северного полушария снова наполнится короткими яркими вспышками. Это Геминиды —...
                </div>
              </div>
            </div>
          </article>

          <!-- Post 3: Леониды -->
          <article class="rsrc-archive col-md-6 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single">
                  <img src="/img/demo/leonids.svg" alt="Леониды 2026: Самый быстрый метеорный поток">
                </a>
              </div>
              <div class="home-header">
                <h2 class="page-header">
                  <a href="/?view=single"><span class="drop-initial">Л</span>ЕОНИДЫ 2026: САМЫЙ БЫСТРЫЙ МЕТЕОРНЫЙ ПОТОК НОЯБРЯ</a>
                </h2>
                <div class="post-meta">
                  <i class="fa fa-clock-o"></i> <time>03.10.2026</time>
                  <i class="fa fa-user"></i> <span>gomoloff</span>
                  <i class="fa fa-comment"></i> <span>0</span>
                  <i class="fa fa-folder-open"></i> <span>Космос</span>
                </div>
                <div class="entry-summary">
                  В середине ноября ночное небо северного полушария снова пересекает пылевой шлейф кометы 55P/Темпеля — Таттля....
                </div>
              </div>
            </div>
          </article>

          <!-- Post 4: Дракониды -->
          <article class="rsrc-archive col-md-6 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single">
                  <img src="/img/demo/draconids.svg" alt="Дракониды 2026: Метеорный поток">
                </a>
              </div>
              <div class="home-header">
                <h2 class="page-header">
                  <a href="/?view=single"><span class="drop-initial">Д</span>РАКОНИДЫ 2026: МЕТЕОРНЫЙ ПОТОК КОМЕТЫ ДЖАКОБИНИ-ЦИННЕР</a>
                </h2>
                <div class="post-meta">
                  <i class="fa fa-clock-o"></i> <time>03.10.2026</time>
                  <i class="fa fa-user"></i> <span>gomoloff</span>
                  <i class="fa fa-comment"></i> <span>0</span>
                  <i class="fa fa-folder-open"></i> <span>Космос</span>
                </div>
                <div class="entry-summary">
                  В первую декаду октября 2026 года Земля снова пройдёт сквозь пылевой шлейф кометы 21P/Джакобини-Циннер. Для...
                </div>
              </div>
            </div>
          </article>

          <!-- Post 5: Ориониды -->
          <article class="rsrc-archive col-md-6 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single">
                  <img src="/img/demo/orionids.svg" alt="Ориониды 2026">
                </a>
              </div>
              <div class="home-header">
                <h2 class="page-header">
                  <a href="/?view=single"><span class="drop-initial">О</span>РИОНИДЫ 2026: МЕТЕОРНЫЙ ПОТОК КОМЕТЫ ГАЛЛЕЯ В ОКТЯБРЕ</a>
                </h2>
                <div class="post-meta">
                  <i class="fa fa-clock-o"></i> <time>02.10.2026</time>
                  <i class="fa fa-user"></i> <span>gomoloff</span>
                  <i class="fa fa-comment"></i> <span>0</span>
                  <i class="fa fa-folder-open"></i> <span>Космос</span>
                </div>
                <div class="entry-summary">
                  В первые дни октября небо над средней полосой уже темнеет рано, и именно в эту пору метеоры потока Ориониды...
                </div>
              </div>
            </div>
          </article>

          <!-- Post 6: Сатурн -->
          <article class="rsrc-archive col-md-6 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail">
                <a href="/?view=single">
                  <img src="/img/demo/saturn.svg" alt="Сатурн в противостоянии 4 октября 2026">
                </a>
              </div>
              <div class="home-header">
                <h2 class="page-header">
                  <a href="/?view=single"><span class="drop-initial">С</span>АТУРН В ПРОТИВОСТОЯНИИ 4 ОКТЯБРЯ 2026: ЛУЧШЕЕ ВРЕМЯ УВИДЕТЬ КОЛЬЦА ПЛАНЕТЫ</a>
                </h2>
                <div class="post-meta">
                  <i class="fa fa-clock-o"></i> <time>01.10.2026</time>
                  <i class="fa fa-user"></i> <span>gomoloff</span>
                  <i class="fa fa-comment"></i> <span>0</span>
                  <i class="fa fa-folder-open"></i> <span>Космос, Природа</span>
                </div>
                <div class="entry-summary">
                  Уже через несколько дней, 4 октября 2026 года, наступит одно из самых удобных событий осеннего неба — противостояние Сатурна...
                </div>
              </div>
            </div>
          </article>

        </div>

        <!-- Pagination (Exact from live site: 1, 2, ..., 26, Далее) -->
        <div class="footer-pagination">
          <nav class="navigation pagination" aria-label="Пагинация">
            <div class="nav-links">
              <span class="current">1</span>
              <a href="#">2</a>
              <span style="border:none; background:transparent;">...</span>
              <a href="#">26</a>
              <a href="#">Далее</a>
            </div>
          </nav>
        </div>

        <!-- Shortcodes Ultimate Teaser Loop Section (Exact from live site) -->
        <div class="su-custom-posts-row">
          <div class="row">
            
            <div class="col-md-6 col-sm-6 su-teaser-item">
              <div class="su-teaser-desc" style="font-size: 13px; line-height: 1.5; margin-bottom: 8px;">
                сетевые накопители NAS (Network Attached Storage) - автономные устройства небольшого размера со встроенными жесткими дисками
              </div>
            </div>

            <div class="col-md-6 col-sm-6 su-teaser-item">
              <div class="su-teaser-desc" style="font-size: 13px; line-height: 1.5; margin-bottom: 8px;">
                Универсальное средство связи в играх на любой платформе: Discord (Дискорд)
              </div>
            </div>

            <div class="col-md-6 col-sm-6 su-teaser-item" style="margin-top: 14px;">
              <h3 class="su-teaser-title">
                <a href="#"><span class="drop-initial">У</span>НИВЕРСАЛЬНОЕ СРЕДСТВО СВЯЗИ В ИГРАХ НА ЛЮБОЙ ПЛАТФОРМЕ: DISCORD (ДИСКОРД)</a>
              </h3>
            </div>

            <div class="col-md-6 col-sm-6 su-teaser-item" style="margin-top: 14px;">
              <h3 class="su-teaser-title">
                <a href="#"><span class="drop-initial">С</span>ЕТЕВОЙ ПРОИГРЫВАТЕЛЬ</a>
              </h3>
            </div>

            <div class="col-md-6 col-sm-6 su-teaser-item" style="margin-top: 14px;">
              <h3 class="su-teaser-title">
                <a href="#"><span class="drop-initial">П</span>ЕРЕПАЙКА ПЛАТ: ЧТО ЭТО ЗА ОПЕРАЦИЯ, ДЛЯ ЧЕГО И КАК ОНА ВЫПОЛНЯЕТСЯ</a>
              </h3>
            </div>

            <div class="col-md-6 col-sm-6 su-teaser-item" style="margin-top: 14px;">
              <h3 class="su-teaser-title">
                <a href="#"><span class="drop-initial">Л</span>ИЧНЫЕ УСТРОЙСТВА И IT-БЕЗОПАСНОСТЬ</a>
              </h3>
            </div>

          </div>
        </div>

      </main>

      <!-- Right Sidebar (Exact from live site) -->
      <aside id="sidebar" class="col-md-3 col-sm-12 rsrc-right" role="complementary">
        
        <!-- Widget 1: ДОНАТ: -->
        <div class="widget widget-donate">
          <h3 class="widget-title"><span class="title-text">ДОНАТ:</span></h3>
          <div style="padding: 10px 0;">
            <img src="/img/qr-code.svg" width="180" height="180" alt="Донат QR-код">
          </div>
        </div>

        <!-- Widget 2: РАЗДЕЛЫ И РУБРИКИ -->
        <div class="widget">
          <h3 class="widget-title"><span class="title-text">РАЗДЕЛЫ И РУБРИКИ</span></h3>
          <ul class="widget-cat-tree">
            <li>
              <a href="#">Статьи</a>
              <ul>
                <li><a href="#">Рецепты</a></li>
                <li><a href="#">Видео Инфо</a></li>
                <li><a href="#">Компьютер и Закон</a></li>
                <li><a href="#">Разное</a></li>
              </ul>
            </li>
            <li>
              <a href="#">Искусство</a>
              <ul>
                <li><a href="#">Музыка</a></li>
              </ul>
            </li>
            <li>
              <a href="#">Галерея</a>
              <ul>
                <li><a href="#">Curiosity</a></li>
                <li><a href="#">Смешные животные</a></li>
                <li><a href="#">Фотомодели крысы</a></li>
                <li><a href="#">Вьетнам. Туан Чау и Ханой</a></li>
              </ul>
            </li>
            <li>
              <a href="#">Контакты, информация о сайте, связь</a>
              <ul>
                <li><a href="#">Обратная связь с администрацией сайта</a></li>
                <li><a href="#">Сопровождение и Разработка сайтов</a></li>
              </ul>
            </li>
            <li><a href="#">Мой профиль</a></li>
            <li><a href="#">Elite Force Academy (Empire & Puzzle alliance)</a></li>
          </ul>
        </div>

        <!-- Widget 3: Рубрики с точным числом статей -->
        <div class="widget">
          <ul class="widget-tax-list">
            <li><a href="/?view=archive">Hardware</a> <span class="count">(32)</span></li>
            <li><a href="/?view=archive">Software</a> <span class="count">(13)</span></li>
            <li><a href="/?view=archive">Без рубрики</a> <span class="count">(2)</span></li>
            <li><a href="/?view=archive">Безопасность</a> <span class="count">(12)</span></li>
            <li><a href="/?view=archive">Видео</a> <span class="count">(7)</span></li>
            <li><a href="/?view=archive">Гаджеты</a> <span class="count">(21)</span></li>
            <li><a href="/?view=archive">Здоровье</a> <span class="count">(2)</span></li>
            <li><a href="/?view=archive">Игры</a> <span class="count">(12)</span></li>
            <li><a href="/?view=archive">Интересные товары и продукты</a> <span class="count">(3)</span></li>
            <li><a href="/?view=archive">Интернет</a> <span class="count">(19)</span></li>
            <li><a href="/?view=archive">Кино Театр</a> <span class="count">(2)</span></li>
            <li><a href="/?view=archive">Космос</a> <span class="count">(24)</span></li>
            <li><a href="/?view=archive">Музыка</a> <span class="count">(4)</span></li>
            <li><a href="/?view=archive">Новости</a> <span class="count">(40)</span></li>
            <li><a href="/?view=archive">Обзоры</a> <span class="count">(1)</span></li>
            <li><a href="/?view=archive">Обучение</a> <span class="count">(1)</span></li>
            <li><a href="/?view=archive">Природа</a> <span class="count">(8)</span></li>
            <li><a href="/?view=archive">Смартфоны</a> <span class="count">(1)</span></li>
            <li><a href="/?view=archive">Техника</a> <span class="count">(17)</span></li>
          </ul>
        </div>

      </aside>

    </div>
  `;
}

function renderSingleView() {
  return `
    <div class="row rsrc-content">
      <main id="primary" class="col-md-9 col-sm-12 rsrc-main" role="main">
        
        <nav id="breadcrumbs" aria-label="Хлебные крошки" style="background:#f1f5f9; padding:8px 14px; border-radius:6px; margin-bottom:18px; font-size:13px;">
          <div class="breadcrumbs-inner text-left">
            <span><a href="/?view=home" style="color:#0f172a; text-decoration:none;"><i class="fa fa-home"></i> Главная</a></span>
            <span class="crumb-separator"> &raquo; </span>
            <span><a href="/?view=archive" style="color:#0f172a; text-decoration:none;">Космос</a></span>
            <span class="crumb-separator"> &raquo; </span>
            <span style="color:#64748b;">ТАУРИДЫ 2026: ХЭЛЛОУИНСКИЕ БОЛИДЫ КОМЕТЫ ЭНКЕ</span>
          </div>
        </nav>

        <article id="post-1" class="rsrc-post-content" style="background: #ffffff; border: 1px solid var(--border-tech); border-radius: var(--radius-md); padding: 32px; box-shadow: var(--shadow-sm);">
          
          <header class="single-entry-header">
            <h1 class="entry-title page-header" style="font-size: 1.85rem; line-height: 1.3; margin-bottom: 14px;">
              <span class="drop-initial">Т</span>АУРИДЫ 2026: ХЭЛЛОУИНСКИЕ БОЛИДЫ КОМЕТЫ ЭНКЕ
            </h1>
            
            <div class="post-meta" style="margin-bottom: 20px;">
              <i class="fa fa-clock-o"></i> <time>05.10.2026</time>
              <i class="fa fa-user"></i> <span>gomoloff</span>
              <i class="fa fa-comment"></i> <span>0 комментариев</span>
              <i class="fa fa-folder-open"></i> <span>Космос</span>
            </div>
          </header>

          <div class="single-thumbnail" style="margin-bottom: 24px; border-radius: 8px; overflow: hidden;">
            <img src="/img/demo/taurids.svg" alt="Тауриды 2026" style="width: 100%;">
          </div>

          <!-- Constrained Reading Width -->
          <div class="entry-content">
            <p>
              В конце октября и первой половине ноября 2026 года Земля снова пересекает широкий пылевой шлейф короткопериодической кометы Энке (2P/Encke). Этот метеорный поток известен астрономам и любителям звёздного неба как <strong>Тауриды</strong>, разделяющиеся на две ветви — Южные и Северные Тауриды.
            </p>

            <p>
              Особенностью Таурид является не рекордное число метеоров в час (обычно зенитное часовое число ZHR составляет около 5–10), а их впечатляющая яркость. Из-за относительно высокой плотности и крупных размеров космических крупинок поток порождает исключительно яркие болиды, прочерчивающие ночной небосвод медленными оранжево-жёлтыми полосами.
            </p>

            <blockquote>
              «Тауриды нередко называют "хэллоуинскими болидами", поскольку их пиковая активность как раз приходится на рубеж октября и ноября, озаряя созвездия Тельца и Плеяд ярчайшими вспышками».
            </blockquote>

            <h2>Условия наблюдения осенью 2026 года</h2>
            <p>
              В 2026 году Луна в фазе близкой к новолунию создаёт оптимальные условия для наблюдения вдали от городской засветки. Радиант потока поднимается высоко над горизонтом уже после 22:00 по местному времени, что делает наблюдения комфортными в течение всей ночи.
            </p>
          </div>

          <div class="post-tags" style="margin-top: 28px; padding-top: 14px; border-top: 1px solid var(--border-tech);">
            <i class="fa fa-tags"></i>
            <span>
              <a href="#">Астрономия</a>
              <a href="#">Болиды</a>
              <a href="#">Звездопад</a>
              <a href="#">Комета Энке</a>
              <a href="#">Тауриды</a>
            </span>
          </div>

        </article>
      </main>

      <!-- Right Sidebar -->
      <aside id="sidebar" class="col-md-3 col-sm-12 rsrc-right" role="complementary">
        <div class="widget widget-donate">
          <h3 class="widget-title"><span class="title-text">ДОНАТ:</span></h3>
          <img src="/img/qr-code.svg" width="180" height="180" alt="Донат QR-код">
        </div>

        <div class="widget">
          <h3 class="widget-title"><span class="title-text">РАЗДЕЛЫ И РУБРИКИ</span></h3>
          <ul class="widget-cat-tree">
            <li><a href="#">Статьи</a></li>
            <li><a href="#">Искусство</a></li>
            <li><a href="#">Галерея</a></li>
            <li><a href="#">Контакты</a></li>
          </ul>
        </div>
      </aside>
    </div>
  `;
}

function renderArchiveView() {
  return `
    <div class="row rsrc-content">
      <main id="primary" class="col-md-9 col-sm-12 rsrc-main" role="main">
        
        <nav id="breadcrumbs" aria-label="Хлебные крошки" style="background:#f1f5f9; padding:8px 14px; border-radius:6px; margin-bottom:18px; font-size:13px;">
          <div class="breadcrumbs-inner text-left">
            <span><a href="/?view=home" style="color:#0f172a; text-decoration:none;"><i class="fa fa-home"></i> Главная</a></span>
            <span class="crumb-separator"> &raquo; </span>
            <span style="color:#64748b;">Рубрика: Космос</span>
          </div>
        </nav>

        <div class="archive-header text-center" style="margin-bottom: 24px;">
          <h1 class="page-title" style="font-size: 1.85rem; font-weight: 800;">Рубрика: Космос</h1>
        </div>

        <div class="front-page-content row">
          <!-- 6 Cards from the category -->
          <article class="rsrc-archive col-md-6 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail"><a href="/?view=single"><img src="/img/demo/taurids.svg"></a></div>
              <div class="home-header">
                <h2 class="page-header"><a href="/?view=single"><span class="drop-initial">Т</span>АУРИДЫ 2026: ХЭЛЛОУИНСКИЕ БОЛИДЫ КОМЕТЫ ЭНКЕ</a></h2>
                <div class="post-meta"><time>05.10.2026</time><span>gomoloff</span></div>
              </div>
            </div>
          </article>
          <article class="rsrc-archive col-md-6 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail"><a href="/?view=single"><img src="/img/demo/geminids.svg"></a></div>
              <div class="home-header">
                <h2 class="page-header"><a href="/?view=single"><span class="drop-initial">Г</span>ЕМИНИДЫ 2026: ГЛАВНЫЙ ЗВЕЗДОПАД ДЕКАБРЯ</a></h2>
                <div class="post-meta"><time>04.10.2026</time><span>gomoloff</span></div>
              </div>
            </div>
          </article>
          <article class="rsrc-archive col-md-6 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail"><a href="/?view=single"><img src="/img/demo/leonids.svg"></a></div>
              <div class="home-header">
                <h2 class="page-header"><a href="/?view=single"><span class="drop-initial">Л</span>ЕОНИДЫ 2026: САМЫЙ БЫСТРЫЙ МЕТЕОРНЫЙ ПОТОК</a></h2>
                <div class="post-meta"><time>03.10.2026</time><span>gomoloff</span></div>
              </div>
            </div>
          </article>
          <article class="rsrc-archive col-md-6 col-sm-6">
            <div class="card-inner">
              <div class="featured-thumbnail"><a href="/?view=single"><img src="/img/demo/draconids.svg"></a></div>
              <div class="home-header">
                <h2 class="page-header"><a href="/?view=single"><span class="drop-initial">Д</span>РАКОНИДЫ 2026: МЕТЕОРНЫЙ ПОТОК КОМЕТЫ ДЖАКОБИНИ</a></h2>
                <div class="post-meta"><time>03.10.2026</time><span>gomoloff</span></div>
              </div>
            </div>
          </article>
        </div>

      </main>

      <aside id="sidebar" class="col-md-3 col-sm-12 rsrc-right" role="complementary">
        <div class="widget widget-donate">
          <h3 class="widget-title"><span class="title-text">ДОНАТ:</span></h3>
          <img src="/img/qr-code.svg" width="180" height="180" alt="Донат QR-код">
        </div>
      </aside>
    </div>
  `;
}
