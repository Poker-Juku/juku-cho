// TABI-RATE — サービス業従事者
// キャッシュ名を変更するとアップデートが全端末に配布されます。
//index.htmlやmanifest.json、アイコンを更新した際は必ず数字を1つ上げてください。
const CACHE_NAME = 'tabirate-preview-v70';

// tabirate/ 直下からの相対パス。ファイル名にスペースがある場合はそのまま書けばOK
// (キャッシュ API はエンコード前のパスで保存されるため、HTML 側の %20 と長くても動作します)
const APP_SHELL = [
  './'、
  './index.html'、
  './privacy.html'、
  './contact.html'、
  './manifest.json'、
  './header.png'、
  './header-wide.png'、
  './favicon.png'、
  './apple-touch-icon.png'、
  './icon-192.png'、
  './icon-512.png'、
  './icon-512-maskable.png'、
  './icon-512-splash.png'
];

// インストール時:アプリ本体一式をキャッシュに保存
self.addEventListener('install', function (event) {
  self.skipWaiting();
  イベントを待機(
    caches.open(CACHE_NAME).then(function (cache) {
      Promise.all を返します(
        APP_SHELL.map(function (url) {
          return cache.add(url).catch(function (err) {
            // 1ファイル失敗しても全体を止めない(ファイル名違い等の事故防止)
            console.warn('[sw] キャッシュ失敗:', url, err);
          });
        })
      );
    })
  );
});

// 有効化時: 古いバージョンのキャッシュを削除
self.addEventListener('activate', function (event) {
  イベントを待機(
    caches.keys().then(function (keys) {
      Promise.all を返します(
        キー
          .filter(function (k) { return k !== CACHE_NAME; })
          .map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// リクエスト時: キャッシュ優先で即座に返す(オフライン最優先)
// 同時にネットワークから取りに行き、成功したら裏でキャッシュを更新する(stale-while-revalidate)
self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  イベント.respondWith(
    caches.match(event.request).then(function (cached) {
      const fetchPromise = fetch(event.request)
        .then(function (networkResponse) {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, clone);
            });
          }
          return networkResponse;
        })
        .catch(function () {
          // オフラインでキャッシュも無いケース(初回未訪問ページ等)
          キャッシュされたデータを返す。
        });

      // キャッシュがあればすぐに戻ります。無ければネットワークの結果を待ちます
      キャッシュされたデータを返す || fetchPromise;
    })
  );
});
