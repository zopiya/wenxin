(function () {
  'use strict';

  // Feature detection over UA sniffing: pointer:coarse reliably identifies touch devices
  var isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initLenis() {
    if (isTouchDevice || prefersReducedMotion || typeof Lenis === 'undefined') return;

    var lenis = new Lenis({
      duration: 1.25,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      wheelMultiplier: 0.85,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 0
    });

    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    var resizeObserver;
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(function () { lenis.resize(); });
      resizeObserver.observe(document.body);
    }

    // Once Lenis owns scroll, it re-asserts its own tracked position every
    // raf tick — so a native same-page #hash jump (footnote refs, heading
    // permalinks, the skip link) gets silently overridden a frame after it
    // happens, because Lenis never learns the scroll moved. Route those
    // clicks through lenis.scrollTo() instead so it stays in sync.
    // -32 offset ≈ --space-8, giving the target a little headroom instead
    // of landing flush against the viewport edge.
    function scrollToHash(hash) {
      if (!hash || hash === '#') return;
      var target;
      try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch (_) { return; }
      if (!target) return;
      // Lenis resyncs its own tracked scroll position from the native
      // `scroll` event, but that event is async — if something moved the
      // page natively just before this click (keyboard paging, a
      // scrollbar drag, scroll restoration) and hasn't been processed
      // yet, Lenis would compute this scrollTo's target from a stale
      // remembered position. Force the resync synchronously first.
      lenis.scrollTo(window.scrollY, { immediate: true });
      lenis.scrollTo(target, { offset: -32 });
      // Preserve native anchor-jump behavior: move focus to the target so
      // keyboard/AT users continue from there (e.g. the skip link into
      // <main tabindex="-1">). preventScroll avoids the browser's own
      // focus-triggered scroll fighting the Lenis animation above; targets
      // without tabindex (headings, footnote items) simply ignore focus().
      target.focus({ preventScroll: true });
    }

    function onHashLinkClick(e) {
      var a = e.target.closest('a[href*="#"]');
      if (!a) return;
      var url;
      try { url = new URL(a.href, location.href); } catch (_) { return; }
      if (url.pathname !== location.pathname || !url.hash) return;
      e.preventDefault();
      if (url.hash !== location.hash) history.pushState(null, '', url.hash);
      scrollToHash(url.hash);
    }
    document.addEventListener('click', onHashLinkClick);

    // Land on the right spot when a page is loaded with a hash already in
    // the URL (e.g. a shared link straight to a footnote).
    if (location.hash) {
      requestAnimationFrame(function () { scrollToHash(location.hash); });
    }

    window.lenis = lenis;
    window._lenisCleanup = function () {
      document.removeEventListener('click', onHashLinkClick);
      if (resizeObserver) resizeObserver.disconnect();
      lenis.destroy();
    };
  }

  // Sidebar fade-out on scroll — desktop article pages only
  var _sidebarScrollCleanup = null;

  function initSidebarScrollEffect() {
    // Clean up listeners from the previous PJAX page
    if (_sidebarScrollCleanup) {
      _sidebarScrollCleanup();
      _sidebarScrollCleanup = null;
    }

    // Mobile sidebar becomes a top bar — no fade needed
    if (window.matchMedia('(max-width: 639px)').matches) return;
    // Detect article pages by presence of .article-container
    var articleContainer = document.querySelector('.article-container');
    if (!articleContainer) return;

    var sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    var lastScrollY = window.scrollY || 0;
    var ticking = false;
    var scrollPeakY = window.scrollY || 0;
    var SCROLL_UP_THRESHOLD = 150; // restore opacity after scrolling up 150px from peak
    var targetOpacity = 1;

    function updateSidebarOpacity() {
      var currentScrollY = window.scrollY || 0;
      var scrollingDown = currentScrollY > lastScrollY;

      if (scrollingDown && currentScrollY > 50) {
        if (currentScrollY > scrollPeakY) {
          scrollPeakY = currentScrollY;
        }
        if (targetOpacity !== 0.3) {
          targetOpacity = 0.3;
          sidebar.style.transition = 'opacity 0.4s ease';
          sidebar.style.opacity = '0.3';
        }
      } else if (!scrollingDown) {
        var scrollUpDistance = scrollPeakY - currentScrollY;
        if (scrollUpDistance > SCROLL_UP_THRESHOLD) {
          if (targetOpacity !== 1) {
            targetOpacity = 1;
            sidebar.style.transition = 'opacity 0.2s ease';
            sidebar.style.opacity = '1';
          }
          // Reset peak so the next downward scroll triggers fade again
          scrollPeakY = currentScrollY;
        }
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateSidebarOpacity);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    _sidebarScrollCleanup = function () {
      window.removeEventListener('scroll', onScroll);
      if (sidebar) sidebar.style.opacity = '';
    };
  }

  // Wait for Lenis library if not yet loaded
  if (typeof Lenis !== 'undefined') {
    initLenis();
  } else {
    window.addEventListener('load', initLenis);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebarScrollEffect);
  } else {
    initSidebarScrollEffect();
  }

  // Expose reinit for PJAX navigation
  window._lenisReinit = function () {
    if (typeof window._lenisCleanup === 'function') {
      window._lenisCleanup();
      window._lenisCleanup = null;
    }
    if (typeof Lenis === 'undefined') return;
    initLenis();
    initSidebarScrollEffect();
  };
})();
