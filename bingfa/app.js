/* 应用逻辑：路由 / 目录 / 渲染 / 检索 */
(function () {
  const view = document.getElementById('view');
  const nav = document.getElementById('nav');
  const q = document.getElementById('q');
  const sidebar = document.getElementById('sidebar');
  const scrim = document.getElementById('scrim');

  const pad = n => (n < 10 ? '0' + n : '' + n);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  /* ---------- 目录 ---------- */
  function buildNav() {
    let h = '';
    h += '<a class="navlink" href="#/" data-k="home"><span class="no">◇</span><span class="nm">总览</span></a>';
    h += '<div class="navgroup"><a href="#/36" data-k="36">三十六计</a><b>36</b></div>';
    SETS.forEach((s, si) => {
      h += '<div class="navsub">' + s.i + ' · ' + s.nm + '</div>';
      JI.filter(j => j.set === si).forEach(j => {
        h += '<a class="navlink" href="#/36/' + j.n + '" data-k="36-' + j.n + '"><span class="no">' + pad(j.n) + '</span><span class="nm">' + j.nm + '</span></a>';
      });
    });
    h += '<div class="navgroup"><a href="#/13" data-k="13">孙子兵法</a><b>13</b></div>';
    PIAN.forEach(p => {
      h += '<a class="navlink" href="#/13/' + p.n + '" data-k="13-' + p.n + '"><span class="no">' + pad(p.n) + '</span><span class="nm">' + p.nm + '</span></a>';
    });
    nav.innerHTML = h;
  }

  function markNav(k) {
    nav.querySelectorAll('[data-k]').forEach(a => a.classList.toggle('on', a.dataset.k === k));
  }

  /* ---------- 卡片 ---------- */
  function cardJI(j) {
    const first = j.orig.split(/[，。；、]/)[0];
    return '<a class="card" href="#/36/' + j.n + '">' +
      '<span class="no">' + pad(j.n) + '</span>' +
      '<span class="nm">' + j.nm + '</span>' +
      '<span class="sub">' + esc(first) + '</span>' +
      '<span class="tag">' + SETS[j.set].nm + '</span></a>';
  }

  function cardPIAN(p) {
    return '<a class="card" href="#/13/' + p.n + '">' +
      '<span class="no">' + pad(p.n) + '</span>' +
      '<span class="nm">' + p.nm + '</span>' +
      '<span class="sub">' + esc(p.key) + '</span>' +
      '<span class="tag">孙子兵法</span></a>';
  }

  function setsHTML() {
    return SETS.map((s, si) => {
      const items = JI.filter(j => j.set === si);
      return '<div class="setsec" id="set-' + si + '">' +
        '<div class="sethead"><span class="idx">' + s.i + '</span><h2>' + s.nm + '</h2><p>' + s.d + '</p></div>' +
        '<div class="grid">' + items.map(cardJI).join('') + '</div></div>';
    }).join('');
  }

  const FOOT = '<footer>' +
    '<p><b>关于内容</b>　三十六计据通行本（1941 年成都兴华印刷所翻印本）三十六条计名与解语；孙子兵法据十三篇通行篇序。战例以正史为主，出自《史记》《左传》《三国志》及裴注等；《三国演义》等文学作品中的情节已在文中标明「演义」，不与史实混同。</p>' +
    '<p>本页为学习与检索用途整理，释读部分为编者撰述，非唯一解。快捷键：详情页 ← → 切换上一条 / 下一条。</p>' +
    '</footer>';

  /* ---------- 视图 ---------- */
  function homeHTML() {
    return '<div class="wrap">' +
      '<div class="hero">' +
      '<div class="kicker">中国古典谋略 · 原文与战例</div>' +
      '<h1>三十六计<span>·</span>孙子兵法</h1>' +
      '<p>三十六计按「胜战、敌战、攻战、混战、并战、败战」六套编排，讲的是具体处境下的应对手法；孙子兵法十三篇讲的是战争的底层逻辑——庙算、形势、虚实、用间。两者一为术、一为道，合看才完整。每一条都配原文、释义与经典战例，点击即跳转。</p>' +
      '<div class="stats"><div class="stat"><b>36</b><span>条计谋 · 六套</span></div>' +
      '<div class="stat"><b>13</b><span>篇兵法</span></div>' +
      '<div class="stat"><b>49</b><span>条原文全录</span></div>' +
      '<div class="stat"><b>49</b><span>则战例解析</span></div></div>' +
      '</div>' +
      setsHTML() +
      '<div class="setsec"><div class="sethead"><span class="idx">其七</span><h2>孙子兵法十三篇</h2><p>从庙算到用间，一套完整的战争方法论</p></div>' +
      '<div class="grid">' + PIAN.map(cardPIAN).join('') + '</div></div>' +
      FOOT + '</div>';
  }

  function index36HTML() {
    return '<div class="wrap">' +
      '<div class="crumb"><a href="#/">总览</a><span>/</span>三十六计</div>' +
      '<div class="titleblock" style="border-bottom-width:1px"><div class="seal">卅六</div>' +
      '<div class="tb"><h1>三十六计</h1><div class="meta">六套 · 每套六计 · 共三十六条</div></div></div>' +
      '<div class="section" style="margin-top:28px"><p>前三套（胜战、敌战、攻战）用于我强或势均之时，后三套（混战、并战、败战）用于混乱、并立与不利之时。计无优劣，只看是否合于当下之势。</p></div>' +
      setsHTML() + FOOT + '</div>';
  }

  function index13HTML() {
    return '<div class="wrap">' +
      '<div class="crumb"><a href="#/">总览</a><span>/</span>孙子兵法</div>' +
      '<div class="titleblock" style="border-bottom-width:1px"><div class="seal">十三</div>' +
      '<div class="tb"><h1>孙子兵法</h1><div class="meta">十三篇 · 春秋 孙武 撰</div></div></div>' +
      '<div class="section" style="margin-top:28px"><p>前六篇（始计至虚实）讲战略与用兵原则，第七至九篇（军争、九变、行军）讲机动与治军，后四篇（地形、九地、火攻、用间）讲具体条件下的处置。十三篇可顺序读，也可按问题查。</p></div>' +
      '<div class="grid">' + PIAN.map(cardPIAN).join('') + '</div>' + FOOT + '</div>';
  }

  function pager(cur, arr, base) {
    const i = arr.findIndex(x => x.n === cur.n);
    const prev = arr[i - 1], next = arr[i + 1];
    const l = prev ? '<a href="#/' + base + '/' + prev.n + '"><span>上一条</span><span class="pn">' + prev.nm + '</span></a>'
      : '<a style="visibility:hidden"><span>上一条</span><span class="pn">—</span></a>';
    const r = next ? '<a class="right" href="#/' + base + '/' + next.n + '"><span>下一条</span><span class="pn">' + next.nm + '</span></a>' : '';
    return '<div class="pager">' + l + r + '</div>';
  }

  function detail36HTML(j) {
    const s = SETS[j.set];
    return '<div class="wrap">' +
      '<div class="crumb"><a href="#/">总览</a><span>/</span><a href="#/36">三十六计</a><span>/</span>' + s.i + ' ' + s.nm + '</div>' +
      '<div class="titleblock"><div class="seal">' + pad(j.n) + '</div>' +
      '<div class="tb"><h1>' + j.nm + '</h1>' +
      '<div class="meta"><b>' + s.i + '</b>　' + s.nm + '　·　第 ' + j.n + ' 计　·　共 36 计</div></div></div>' +
      '<div class="section"><h2>原文</h2><div class="orig"><p>' + esc(j.orig) + '</p></div></div>' +
      '<div class="section"><h2>释义</h2><p>' + esc(j.mean) + '</p></div>' +
      '<div class="section"><h2>解语</h2><p>' + esc(j.note) + '</p></div>' +
      '<div class="section"><h2>战例</h2><div class="case"><h3>' + esc(j.c.t) + '</h3>' +
      '<div class="src">' + esc(j.c.src) + '</div><p>' + esc(j.c.txt) + '</p></div></div>' +
      '<div class="section"><h2>今用</h2><p>' + esc(j.use) + '</p></div>' +
      pager(j, JI, '36') + '</div>';
  }

  function detail13HTML(p) {
    return '<div class="wrap">' +
      '<div class="crumb"><a href="#/">总览</a><span>/</span><a href="#/13">孙子兵法</a><span>/</span>' + p.nm + '</div>' +
      '<div class="titleblock"><div class="seal">' + pad(p.n) + '</div>' +
      '<div class="tb"><h1>' + p.nm + '</h1>' +
      '<div class="meta"><b>孙武</b>　十三篇　·　第 ' + p.n + ' 篇　·　要旨：' + p.key + '</div></div></div>' +
      '<div class="section"><h2>名句</h2><div class="quoteblock">' + p.quotes.map(t => '<p>' + esc(t) + '</p>').join('') + '</div></div>' +
      '<div class="section"><h2>要旨</h2><ul class="pts">' + p.core.map(t => '<li>' + esc(t) + '</li>').join('') + '</ul></div>' +
      '<div class="section"><h2>战例</h2><div class="case"><h3>' + esc(p.c.t) + '</h3>' +
      '<div class="src">' + esc(p.c.src) + '</div><p>' + esc(p.c.txt) + '</p></div></div>' +
      '<div class="section"><h2>今用</h2><p>' + esc(p.use) + '</p></div>' +
      pager(p, PIAN, '13') + '</div>';
  }

  function searchHTML(term) {
    const k = term.trim();
    if (!k) return '';
    const inJI = JI.filter(j => (j.nm + j.orig + j.mean + j.note + j.c.t + j.c.txt + j.use).indexOf(k) > -1);
    const inP = PIAN.filter(p => (p.nm + p.key + p.quotes.join('') + p.core.join('') + p.c.t + p.c.txt + p.use).indexOf(k) > -1);
    let h = '<div class="wrap"><div class="crumb"><a href="#/">总览</a><span>/</span>检索</div>' +
      '<div class="sethead" style="border-bottom:2px solid var(--ink)"><span class="idx">检索</span><h2>「' + esc(k) + '」</h2><p>共 ' + (inJI.length + inP.length) + ' 条</p></div>';
    if (!inJI.length && !inP.length) {
      return h + '<div class="empty">没有找到「' + esc(k) + '」相关内容。<br>试试：围魏、虚实、用间、粮、火攻、赤壁。</div></div>';
    }
    if (inJI.length) h += '<div class="setsec"><div class="sethead"><span class="idx">三十六计</span><h2>' + inJI.length + ' 条</h2></div><div class="grid">' + inJI.map(cardJI).join('') + '</div></div>';
    if (inP.length) h += '<div class="setsec"><div class="sethead"><span class="idx">孙子兵法</span><h2>' + inP.length + ' 篇</h2></div><div class="grid">' + inP.map(cardPIAN).join('') + '</div></div>';
    return h + '</div>';
  }

  /* ---------- 路由 ---------- */
  let lastDetail = null;

  function route() {
    const raw = location.hash.replace(/^#\/?/, '');
    const parts = raw.split('/').filter(Boolean);
    q.value = '';
    lastDetail = null;
    window.scrollTo(0, 0);

    if (!parts.length) { view.innerHTML = homeHTML(); markNav('home'); document.title = '三十六计 · 孙子兵法｜原文 · 释义 · 案例'; return; }
    if (parts[0] === '36' && parts.length === 1) { view.innerHTML = index36HTML(); markNav('36'); document.title = '三十六计 · 全目录'; return; }
    if (parts[0] === '13' && parts.length === 1) { view.innerHTML = index13HTML(); markNav('13'); document.title = '孙子兵法 · 十三篇'; return; }
    if (parts[0] === '36') {
      const j = JI.find(x => x.n === Number(parts[1]));
      if (j) { view.innerHTML = detail36HTML(j); markNav('36-' + j.n); document.title = j.nm + ' · 三十六计'; lastDetail = { arr: JI, cur: j, base: '36' }; return; }
    }
    if (parts[0] === '13') {
      const p = PIAN.find(x => x.n === Number(parts[1]));
      if (p) { view.innerHTML = detail13HTML(p); markNav('13-' + p.n); document.title = p.nm + ' · 孙子兵法'; lastDetail = { arr: PIAN, cur: p, base: '13' }; return; }
    }
    view.innerHTML = homeHTML(); markNav('home');
  }

  /* ---------- 交互 ---------- */
  window.addEventListener('hashchange', route);

  q.addEventListener('input', function () {
    const v = this.value;
    if (v.trim()) {
      view.innerHTML = searchHTML(v);
      nav.querySelectorAll('[data-k]').forEach(a => a.classList.remove('on'));
      window.scrollTo(0, 0);
    } else {
      route();
    }
  });

  document.getElementById('random').addEventListener('click', function () {
    const n = 1 + Math.floor(Math.random() * 36);
    location.hash = '#/36/' + n;
  });

  const burger = document.getElementById('burger');
  burger.addEventListener('click', () => { sidebar.classList.toggle('open'); scrim.classList.toggle('on'); });
  scrim.addEventListener('click', () => { sidebar.classList.remove('open'); scrim.classList.remove('on'); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) { sidebar.classList.remove('open'); scrim.classList.remove('on'); } });

  document.addEventListener('keydown', function (e) {
    if (!lastDetail || document.activeElement === q) return;
    const i = lastDetail.arr.findIndex(x => x.n === lastDetail.cur.n);
    if (e.key === 'ArrowLeft' && i > 0) location.hash = '#/' + lastDetail.base + '/' + lastDetail.arr[i - 1].n;
    if (e.key === 'ArrowRight' && i < lastDetail.arr.length - 1) location.hash = '#/' + lastDetail.base + '/' + lastDetail.arr[i + 1].n;
    if (e.key === 'Escape') { sidebar.classList.remove('open'); scrim.classList.remove('on'); }
  });

  buildNav();
  route();
})();
