/* Shared return path for every guide article. */
(function () {
  if (document.body.dataset.siteNavReady) return;
  document.body.dataset.siteNavReady = 'true';
  var path = location.pathname.split('/').pop() || 'index.html';
  var brand = document.querySelector('nav .brand');
  if (brand) {
    brand.innerHTML = '<a href="index.html" aria-label="塾シリーズ・海外旅行準備室のトップへ戻る">塾シリーズ・海外旅行準備室</a>';
  }

  var tabirate = document.querySelector('nav a[href*="tabirate"]');
  if (tabirate) {
    tabirate.textContent = 'TABI-RATE アプリを開く';
  } else {
    var navLinks = document.querySelector('nav span');
    if (navLinks) {
      var separator = document.createTextNode('　');
      var appLink = document.createElement('a');
      appLink.href = 'apps/tabirate/index.html';
      appLink.textContent = 'TABI-RATE アプリを開く';
      navLinks.append(separator, appLink);
    }
  }

  if (path === 'index.html') return;

  var nav = document.createElement('a');
  nav.className = 'site-home-link';
  nav.href = 'index.html';
  nav.innerHTML = '<span aria-hidden="true">←</span> 塾シリーズ・海外旅行準備室トップ';
  nav.setAttribute('aria-label', '塾シリーズ・海外旅行準備室トップへ戻る');
  document.body.appendChild(nav);
})();
