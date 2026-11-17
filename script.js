(() => {
  const params = new URLSearchParams(location.search);
  const themes = {
    neon: { label: 'A ネオン', color: '#f3ff49' },
    navy: { label: 'B ネイビー', color: '#d8ff42' },
    graphite: { label: 'C ゴールド', color: '#f6c64f' }
  };
  const activeTheme = themes[params.get('theme')] ? params.get('theme') : 'neon';
  document.documentElement.dataset.theme = activeTheme;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', themes[activeTheme].color);

  if (params.get('preview') === 'themes') {
    const preview = document.createElement('div');
    preview.className = 'theme-preview';
    preview.setAttribute('aria-label', '配色プレビュー');
    Object.entries(themes).forEach(([key, theme]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = theme.label;
      button.setAttribute('aria-pressed', String(key === activeTheme));
      button.addEventListener('click', () => {
        const next = new URL(location.href);
        next.searchParams.set('theme', key);
        next.searchParams.set('preview', 'themes');
        location.href = next.toString();
      });
      preview.append(button);
    });
    document.body.append(preview);
  }

  const canvas = document.getElementById('wave-canvas');
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let frame = 0;
  let animationId;
  let heroVisible = true;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const resizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const drawWave = () => {
    ctx.clearRect(0, 0, width, height);
    const originX = width * 0.72;
    const originY = height * 0.45;
    for (let row = -24; row < 32; row += 1) {
      ctx.beginPath();
      const hue = 170 - row * 0.55;
      ctx.strokeStyle = `hsla(${hue}, 88%, ${58 + row * 0.2}%, ${0.16 + (row + 24) * 0.004})`;
      ctx.lineWidth = row % 5 === 0 ? 1.2 : 0.7;
      for (let col = -40; col < 48; col += 1) {
        const xBase = col * 19;
        const z = row * 18;
        const wave = Math.sin(col * 0.22 + row * 0.1 + frame * 0.012) * 70 + Math.cos(row * 0.18 - frame * 0.008) * 28;
        const perspective = 1 + (z + 450) / 1050;
        const x = originX + xBase * perspective + wave;
        const y = originY + z * 0.8 + Math.sin(col * .11 + frame * .01) * 35 + (xBase * xBase) / 3600;
        if (col === -40) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    frame += 1;
    if (!reduceMotion && heroVisible) animationId = requestAnimationFrame(drawWave);
  };

  resizeCanvas();
  drawWave();
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    cancelAnimationFrame(animationId);
    if (heroVisible && !reduceMotion) animationId = requestAnimationFrame(drawWave);
  }).observe(canvas);
  window.addEventListener('resize', () => {
    cancelAnimationFrame(animationId);
    resizeCanvas();
    drawWave();
  }, { passive: true });

  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const cards = [...document.querySelectorAll('.tool-card')];
  const search = document.getElementById('tool-search');
  const noResults = document.getElementById('no-results');
  let activeFilter = 'all';

  // 掲載数・カテゴリー件数をカードから自動で数える
  const pad = (n) => String(n).padStart(2, '0');
  const setCount = (key, n) => document.querySelectorAll(`[data-count="${key}"]`).forEach((el) => { el.textContent = pad(n); });
  const soonCount = document.querySelectorAll('.release-list p').length;
  setCount('live', cards.length);
  setCount('soon', soonCount);
  setCount('all', cards.length + soonCount);
  setCount('all-filter', cards.length);
  ['utility', 'hobby'].forEach((cat) => setCount(cat, cards.filter((c) => c.dataset.category === cat).length));

  const updateTools = () => {
    const query = search.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach((card) => {
      const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
      const matchesSearch = !query || card.dataset.search.toLowerCase().includes(query);
      const visible = matchesCategory && matchesSearch;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    noResults.hidden = shown !== 0;
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      updateTools();
    });
  });
  search.addEventListener('input', updateTools);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
})();
