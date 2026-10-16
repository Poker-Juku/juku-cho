/* Shared return path for every guide article. */
(function () {
  var tabirateUrl = 'https://tabirate.juku-cho.com/';
  if (document.body.dataset.siteNavReady) return;
  document.body.dataset.siteNavReady = 'true';
  var path = location.pathname.split('/').pop() || 'index.html';
  var topNav = document.querySelector('nav');
  var navLinks = document.querySelector('nav span');
  var brand = document.querySelector('nav .brand');
  if (brand) {
    brand.innerHTML = '<a href="index.html" aria-label="塾シリーズ、海外旅行準備室のトップへ戻る">塾シリーズ、海外旅行準備室</a>';
  } else if (topNav && navLinks) {
    Array.prototype.slice.call(topNav.childNodes).forEach(function (node) {
      if (node !== navLinks) topNav.removeChild(node);
    });
    var titleLink = document.createElement('a');
    titleLink.href = 'index.html';
    titleLink.textContent = '塾シリーズ、海外旅行準備室';
    titleLink.setAttribute('aria-label', '塾シリーズ、海外旅行準備室のトップへ戻る');
    topNav.insertBefore(titleLink, navLinks);
  }

  var tabirate = document.querySelector('nav a[href*="tabirate"]');
  if (tabirate) {
    tabirate.textContent = 'TABI-RATE アプリを開く';
    tabirate.href = tabirateUrl;
  } else {
    if (navLinks) {
      var separator = document.createTextNode('　');
      var appLink = document.createElement('a');
      appLink.href = tabirateUrl;
      appLink.textContent = 'TABI-RATE アプリを開く';
      navLinks.append(separator, appLink);
    }
  }

  document.querySelectorAll('a[href*="apps/tabirate"]').forEach(function (link) {
    link.href = tabirateUrl;
  });

  if (path === 'index.html') return;

  var nav = document.createElement('a');
  nav.className = 'site-home-link';
  nav.href = 'index.html';
  nav.innerHTML = '<span aria-hidden="true">←</span> 塾シリーズ、海外旅行準備室トップ';
  nav.setAttribute('aria-label', '塾シリーズ、海外旅行準備室トップへ戻る');
  document.body.appendChild(nav);
})();
