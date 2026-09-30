/* Shared return path for every guide article. */
(function () {
  if (document.body.dataset.siteNavReady) return;
  document.body.dataset.siteNavReady = 'true';
  var path = location.pathname.split('/').pop() || 'index.html';
  if (path === 'index.html') return;

  var nav = document.createElement('a');
  nav.className = 'site-home-link';
  nav.href = 'index.html';
  nav.innerHTML = '<span aria-hidden="true">←</span> 海外旅行準備室トップ';
  nav.setAttribute('aria-label', '海外旅行準備室トップへ戻る');
  document.body.appendChild(nav);
})();
