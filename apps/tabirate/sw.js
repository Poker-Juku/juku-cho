// TABI-RATE — Service Worker
// キャッシュ名を変えるとアップデートが全端末に配布されます。
// index.html や manifest.json、アイコンを更新した際は必ず数字を1つ上げてください。
const CACHE_NAME = 'tabirate-v2';

// tabirate/ 直下からの相対パス。ファイル名にスペースがある場合はそのまま書けばOK
// (Cache API はエンコード前のパスで保存されるため、HTML側の %20 と混在しても動作します)
const APP_SHELL = [
  './',
  './index.html',
  './privacy.html',
  './manifest.json',
  './Fabicon.png',
  './Apple touch Icon.png',
  './Icon 192.png',
  './Icon 512.png',
  './Icon 512 maskable.png'
];

// インストール時: アプリ本体一式をキャッシュに保存
self.addEventListener('install', function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(
        APP_SHELL.map(function (url) {
          return cache.add(url).catch(function (err) {
            // 1ファイル失敗しても全体を止めない(ファイル名違い等の事故防止)
            console.warn('[sw] cache failed:', url, err);
          });
        })
      );
    })
  );
});

// 有効化時: 古いバージョンのキャッシュを削除
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
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

  event.respondWith(
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
          return cached;
        });

      // キャッシュがあれば即返す。無ければネットワークの結果を待つ
      return cached || fetchPromise;
    })
  );
});
