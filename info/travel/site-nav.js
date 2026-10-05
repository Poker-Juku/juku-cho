/* すべてのガイド記事に共通する戻り先パス。*/
（関数 （） {
  if (document.body.dataset.siteNavReady) return;
  document.body.dataset.siteNavReady = 'true';
  var path = location.pathname.split('/').pop() || 'index.html';
  var brand = document.querySelector('nav .brand');
  もし（ブランド）ならば
    brand.innerHTML = '<a href="index.html" aria-label="塾シリーズ・海外旅行準備室のトップへ戻る">塾シリーズ・海外旅行準備室</a>';
  }

  var tabirate = document.querySelector('nav a[href*="tabirate"]');
  if (tabirate) {
    tabirate.textContent = 'TABI-RATE アプリを開く';
    tabirate.href = 'https://juku-cho.com/apps/tabirate/';
  } それ以外 {
    var navLinks = document.querySelector('ナビゲーション スパン');
    if (navLinks) {
      var separator = document.createTextNode(' ');
      var appLink = document.createElement('a');
      appLink.href = 'https://juku-cho.com/apps/tabirate/';
      appLink.textContent = '旅レートアプリを開く';
      navLinks.append(separator, appLink);
    }
  }

  document.querySelectorAll('a[href*="apps/tabirate"]').forEach(function (link) {
    link.href = 'https://juku-cho.com/apps/tabirate/';
  });

  if (path === 'index.html') return;

  var nav = document.createElement('a');
  nav.className = 'site-home-link';
  nav.href = 'index.html';
  nav.innerHTML = '<span aria-hidden="true">←</span> 塾シリーズ・海外旅行準備室トップ';
  nav.setAttribute('aria-label', '塾シリーズ・海外旅行準備室トップへ戻る');
  document.body.appendChild(nav);
})();
