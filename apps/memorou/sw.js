// 試作版アプリ（トップページ）をオフラインでも開けるようにする。index.html を変えたら VERSION を上げる
const VERSION="memorou-proto-15";
const FILES=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-192-maskable.png","./icon-512-maskable.png","./apple-touch-icon.png","./favicon.ico"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);
  const isApp=u.origin===location.origin&&(u.pathname==="/"||u.pathname==="/index.html");
  // サポート・規約などのページは、いつも最新をネットから読む（キャッシュしない）
  if(u.origin===location.origin&&!isApp&&!FILES.includes("."+u.pathname))return;
  if(u.origin!==location.origin)return; // 外部への通信は扱わない（試作版は外部のフォントなどを読み込まない）
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)).catch(()=>isApp?caches.match("./index.html"):Response.error()));
});
