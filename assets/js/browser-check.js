(function () {
  var isSupported =
    typeof CSS !== 'undefined' &&
    CSS.supports &&
    CSS.supports('color', 'var(--c)') &&        // CSS custom properties
    CSS.supports('display', 'grid') &&           // CSS Grid
    CSS.supports('width', 'clamp(1px,1vw,2px)'); // CSS clamp()

  if (isSupported) return;

  document.documentElement.classList.add('browser-legacy');

  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'browser-banner';
    banner.setAttribute('role', 'alert');
    banner.innerHTML =
      '<span>你的浏览器版本过旧，部分样式与功能可能无法正常显示。' +
      '建议升级至 <a href="https://www.google.com/chrome/" target="_blank" rel="noopener">Chrome</a>、' +
      '<a href="https://www.mozilla.org/firefox/" target="_blank" rel="noopener">Firefox</a> 或 ' +
      '<a href="https://www.apple.com/safari/" target="_blank" rel="noopener">Safari</a> 最新版本。</span>' +
      '<button onclick="document.getElementById(\'browser-banner\').remove()" ' +
      'aria-label="关闭提示">×</button>';

    if (document.body) {
      document.body.insertBefore(banner, document.body.firstChild);
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        document.body.insertBefore(banner, document.body.firstChild);
      });
    }
  }

  showBanner();
})();
