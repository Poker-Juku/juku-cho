/* ============================================================
   Juku-Cho 共通ナビ  /assets/nav.js
   各ページの </body> 直前に次の1行を入れるだけ：
     <script src="/assets/nav.js" defer></script>
   ------------------------------------------------------------
   ▼ リンク先はここだけ直せばOK（全ページに反映）
   ※ href はサイト内の実在URLに合わせてください。
     ポーカー塾のトップURLが違う場合（例 /dictionary/ など）は
     下の poker の href / match を書き換えてください。
   ============================================================ */
(function () {
  "use strict";

  var JC = {
    brand: { mark: "塾", label: "Juku-Cho", href: "/" },
    links: [
      { label: "ポーカー塾", href: "/poker/",       match: "/poker"       },
      { label: "ギター塾",   href: "/info/guitar/", match: "/info/guitar" },
      { label: "旅行",       href: "/info/travel/", match: "/info/travel" }
      // { label: "ツール", href: "/apps/", match: "/apps" } // ← /apps/ に一覧ページを作ったら有効化
    
    ]
  };

  if (window.__jcNavLoaded) return;      // 二重読み込み防止
  window.__jcNavLoaded = true;

  function build() {
    if (document.querySelector(".jc-nav-wrap")) return;

    // --- styles（.jc- 接頭辞でページ側と衝突しない / テーマ変数を拾う）---
    var css = ""
      + ".jc-nav-wrap{border-bottom:1px solid var(--line2,rgba(255,255,255,.12));"
      +   "background:var(--bg,#0A0C10);font-family:inherit}"
      + ".jc-nav{display:flex;align-items:center;gap:14px;max-width:960px;margin:0 auto;padding:10px 20px}"
      + ".jc-brand{display:flex;align-items:center;gap:9px;margin-right:auto;text-decoration:none;"
      +   "font-weight:800;font-size:15px;letter-spacing:-.01em;color:var(--text,#E9EBEF)}"
      + ".jc-brand .jc-mark{width:26px;height:26px;border-radius:7px;display:grid;place-items:center;"
      +   "background:var(--accent,#E0A860);color:var(--accent-ink,#1A130A);font-size:14px;font-weight:800}"
      + ".jc-links{display:flex;align-items:center;gap:4px;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}"
      + ".jc-links::-webkit-scrollbar{display:none}"
      + ".jc-link{text-decoration:none;color:var(--muted,#98A0AD);font-size:13.5px;font-weight:600;"
      +   "white-space:nowrap;padding:6px 12px;border-radius:999px;transition:color .15s,background .15s}"
      + ".jc-link:hover{color:var(--text,#E9EBEF)}"
      + ".jc-link.jc-cur{color:var(--accent,#E0A860);background:var(--accent-soft,rgba(224,168,96,.14))}";
    var style = document.createElement("style");
    style.setAttribute("data-jc-nav", "");
    style.textContent = css;
    document.head.appendChild(style);

    // --- markup ---
    var path = location.pathname;
    var linksHtml = JC.links.map(function (l) {
      var cur = l.match && path.indexOf(l.match) === 0 ? " jc-cur" : "";
      return '<a class="jc-link' + cur + '" href="' + l.href + '">' + l.label + "</a>";
    }).join("");

    var wrap = document.createElement("div");
    wrap.className = "jc-nav-wrap";
    wrap.innerHTML =
      '<nav class="jc-nav" aria-label="サイト共通ナビ">' +
        '<a class="jc-brand" href="' + JC.brand.href + '">' +
          '<span class="jc-mark">' + JC.brand.mark + "</span>" +
          "<span>" + JC.brand.label + "</span>" +
        "</a>" +
        '<div class="jc-links">' + linksHtml + "</div>" +
      "</nav>";

    document.body.insertBefore(wrap, document.body.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
