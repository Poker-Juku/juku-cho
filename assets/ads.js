/* =========================================================
   Juku-Cho 広告ローダー  assets/ads.js
   ---------------------------------------------------------
   【AdSense承認後にやること】
     1. ENABLED を true にする
     2. CLIENT に自分の「ca-pub-」から始まるIDを入れる
     3. SLOTS の各項目に、AdSense管理画面で作った
        広告ユニットのスロットIDを入れる
   このファイル1つを直せば、全ページに反映されます。
   ========================================================= */

const AD_CONFIG = {
  ENABLED: false,
  CLIENT : "ca-pub-XXXXXXXXXXXXXXXX",

  SLOTS: {
    // 記事の途中・ページ下部に置く汎用ディスプレイ広告
    display  : "XXXXXXXXXX",
    // 記事本文の段落間に馴染ませる「記事内広告」
    inarticle: "XXXXXXXXXX"
  }
};

(function initAds () {
  const slots = document.querySelectorAll("[data-ad]");
  if (!slots.length) return;

  // 未承認・未設定のあいだは枠ごと非表示にする
  // （空の広告枠を放置すると審査でマイナスになるため）
  if (!AD_CONFIG.ENABLED || AD_CONFIG.CLIENT.includes("XXXX")) {
    slots.forEach(el => el.style.display = "none");
    return;
  }

  // AdSense本体を1回だけ読み込む
  const loader = document.createElement("script");
  loader.async = true;
  loader.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + AD_CONFIG.CLIENT;
  loader.crossOrigin = "anonymous";
  loader.onerror = () => slots.forEach(el => el.style.display = "none");
  document.head.appendChild(loader);

  slots.forEach(box => {
    const type = box.dataset.ad;                 // "display" or "inarticle"
    const slotId = AD_CONFIG.SLOTS[type];
    if (!slotId || slotId.includes("XXXX")) { box.style.display = "none"; return; }

    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", AD_CONFIG.CLIENT);
    ins.setAttribute("data-ad-slot", slotId);

    if (type === "inarticle") {
      // 記事本文に自然に溶け込むフォーマット
      ins.style.textAlign = "center";
      ins.setAttribute("data-ad-layout", "in-article");
      ins.setAttribute("data-ad-format", "fluid");
    } else {
      // レスポンシブ。画面幅に応じてサイズが自動調整される
      ins.setAttribute("data-ad-format", "auto");
      ins.setAttribute("data-full-width-responsive", "true");
    }

    box.querySelector(".ad-ph")?.remove();
    box.appendChild(ins);

    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); }
    catch (e) { box.style.display = "none"; }
  });
})();
