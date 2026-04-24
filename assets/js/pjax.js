(function () {
  'use strict';

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  var cache = new Map();
  var MAX_CACHE_SIZE = 20;
  var navVersion = 0;

  function trackPageview(url) {
    // Google Analytics — gtag queue is available immediately
    if (typeof window.gtag === 'function' && window.gaMeasurementId) {
      window.gtag('config', window.gaMeasurementId, {
        page_path: url,
        page_title: document.title
      });
    }
    // Umami — available after its script loads
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track({ url: url, title: document.title });
    }
  }

  var progressBar = document.createElement('div');
  progressBar.className = 'nav-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progressBar);

  function progressStart() {
    progressBar.classList.remove('is-complete');
    progressBar.style.width = '';
    progressBar.classList.add('is-loading');
  }

  function progressDone() {
    progressBar.classList.remove('is-loading');
    progressBar.classList.add('is-complete');
  }

  async function fetchPage(url) {
    if (cache.has(url)) return cache.get(url);
    var res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    var doc = new DOMParser().parseFromString(await res.text(), 'text/html');

    if (cache.size >= MAX_CACHE_SIZE) {
      var firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(url, doc);
    return doc;
  }

  function showError(message) {
    var toast = document.createElement('div');
    toast.className = 'pjax-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { toast.classList.add('is-visible'); });
    });
    setTimeout(function () {
      toast.classList.remove('is-visible');
      setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
  }

  async function navigate(url, push) {
    if (push === undefined) push = true;
    var version = ++navVersion;

    progressStart();

    var incoming;
    try { incoming = await fetchPage(url); }
    catch (e) {
      progressDone();
      showError('页面加载失败，正在跳转...');
      location.href = url;
      return;
    }

    if (version !== navVersion) return;

    var current = document.querySelector('main');
    if (!current) return;

    current.style.transition = 'opacity 180ms ease, transform 180ms ease';
    current.style.opacity = '0';
    current.style.transform = 'translateY(6px)';
    await new Promise(function (r) { setTimeout(r, 180); });

    if (version !== navVersion) return;

    var nextNode = incoming.querySelector('main');
    if (!nextNode) { location.href = url; return; }
    var next = nextNode.cloneNode(true);

    // Swap page-specific CSS (Hugo fingerprints it as page-post.min.{hash}.css)
    var curStyle = document.head.querySelector('link[href*="page-"]');
    var nextStyle = incoming.querySelector('link[href*="page-"]');
    if (curStyle && nextStyle) curStyle.href = nextStyle.getAttribute('href');

    if (typeof window._lenisCleanup === 'function') {
      window._lenisCleanup();
      window._lenisCleanup = null;
    }
    current.replaceWith(next);
    next.setAttribute('tabindex', '-1');
    next.focus();
    document.title = incoming.title;

    // Post pages use a minimal spine sidebar; other pages use the full nav sidebar
    var currentSidebar = document.querySelector('aside.sidebar');
    var nextSidebar = incoming.querySelector('aside.sidebar');
    if (currentSidebar && nextSidebar) {
      currentSidebar.replaceWith(nextSidebar.cloneNode(true));
    }

    var targetPath = new URL(url, location.origin).pathname;
    document.querySelectorAll('.site-nav a').forEach(function (a) {
      var aPath = new URL(a.href, location.origin).pathname;
      var extraPrefix = a.getAttribute('data-match-prefix');
      // Normalize trailing slashes for exact match
      var exactMatch = aPath === targetPath
        || aPath === targetPath.replace(/\/$/, '')
        || aPath + '/' === targetPath;
      // data-match-prefix: archive page matches /tags/* paths
      var prefixMatch = extraPrefix && targetPath.indexOf(extraPrefix) === 0;
      // Root path must be exact — otherwise it matches every page
      var match = aPath === '/' ? exactMatch : (exactMatch || prefixMatch);
      a.classList.toggle('active', match);
      if (match) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });

    if (push) history.pushState({ url: url }, '', url);

    // Double RAF: Safari needs two frames to separate "set initial value" from "trigger transition"
    next.style.transition = 'none';
    next.style.opacity = '0';
    next.style.transform = 'translateY(6px)';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        window.scrollTo(0, 0);
        next.style.transition = 'opacity 380ms ease, transform 380ms ease';
        next.style.opacity = '1';
        next.style.transform = 'translateY(0)';
        progressDone();
      });
    });

    // Notify analytics of SPA navigation
    trackPageview(url);

    // Delay Lenis reinit until fade-in animation completes
    setTimeout(function () {
      if (typeof window._lenisReinit === 'function') {
        window._lenisReinit();
      }
    }, 420);
  }

  // Intercept all same-origin link clicks
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    if (a.target === '_blank') return;
    if (a.hasAttribute('download')) return;
    if (a.getAttribute('data-no-pjax') !== null) return;
    var href;
    try { href = new URL(a.href, location.origin); } catch (_) { return; }
    if (href.origin !== location.origin) return;
    // Anchor links scroll within the page — let the browser handle them
    if (href.pathname === location.pathname && href.hash) return;
    if (href.pathname === location.pathname) return;
    e.preventDefault();
    navigate(a.href);
  });

  window.addEventListener('popstate', function (e) {
    navigate((e.state && e.state.url) || location.href, false);
  });
})();
