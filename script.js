const AMAZON_ASSOCIATE_TAG = 'jbmt-22';
const ANALYTICS_KEY = 'gamespecLabEvents';
const QUIZ_STATE_PREFIX = 'gamespecLabQuizState:';

function isNightOwlHour() {
  const hour = new Date().getHours();
  return hour >= 1 && hour < 5;
}

function renderNightOwlBadge() {
  if (!isNightOwlHour()) return '';
  return `
    <span class="night-owl-badge" aria-label="深夜帯の診断ボーナス：夜行性ゲーマー">
      ${icon('moon')}<b>NIGHT OWL</b>夜行性ゲーマー
    </span>
  `;
}

function readSavedAnswers(key, expectedLength) {
  try {
    const raw = localStorage.getItem(`${QUIZ_STATE_PREFIX}${key}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((value) => Number(value))
      .filter((value) => Number.isInteger(value) && value >= 0)
      .slice(0, expectedLength);
  } catch (error) {
    return [];
  }
}

function saveQuizAnswers(key, values) {
  try {
    localStorage.setItem(`${QUIZ_STATE_PREFIX}${key}`, JSON.stringify(values));
  } catch (error) {
    // 保存できない環境でも診断自体はそのまま使えるようにします。
  }
}

function clearQuizAnswers(key) {
  try {
    localStorage.removeItem(`${QUIZ_STATE_PREFIX}${key}`);
  } catch (error) {
    // 保存クリアに失敗しても表示処理を止めないための保険です。
  }
}

const traitLabels = {
  micro: 'ミクロ',
  macro: 'マクロ',
  social: '通話温度',
  chill: 'まったり',
  competitive: '勝負欲',
  support: '支援力',
};

const pcNeedLabels = {
  budget: '予算',
  fps: '高FPS',
  quality: '画質',
  stream: '配信',
  portable: '省スペース',
  comfort: '快適性',
};

const senseLabels = {
  awareness: '状況認識',
  prediction: '未来予測',
  pattern: 'パターン認識',
  spatial: '空間把握',
  speed: '判断速度',
  resource: 'リソース管理',
  mindgame: '心理戦',
  adaptation: '学習適応力',
};

const iconPaths = {
  ad: '<path d="M4 6h16v12H4z"/><path d="M8 10h4"/><path d="M8 14h8"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  back: '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>',
  cart: '<path d="M5 6h2l2 10h8l2-7H8"/><path d="M10 20h.01"/><path d="M17 20h.01"/>',
  chart: '<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 15l3-4 3 2 4-7"/>',
  chat: '<path d="M5 6h14v9H9l-4 3z"/><path d="M9 10h6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  cpu: '<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M1 9h3"/><path d="M1 15h3"/><path d="M20 9h3"/><path d="M20 15h3"/>',
  external: '<path d="M8 8h8v8"/><path d="m8 16 8-8"/><path d="M5 5h6"/><path d="M5 5v14h14v-6"/>',
  gamepad: '<path d="M7 10h10l3 5a3 3 0 0 1-5 3l-1-2h-4l-1 2a3 3 0 0 1-5-3z"/><path d="M8 14h4"/><path d="M10 12v4"/><path d="M16 13h.01"/><path d="M18 15h.01"/>',
  gpu: '<path d="M4 7h13v10H4z"/><path d="M17 10h3v4h-3"/><path d="M7 10h5"/><path d="M7 14h3"/><path d="M8 3v4"/><path d="M13 3v4"/>',
  headset: '<path d="M4 13a8 8 0 0 1 16 0"/><path d="M4 13v4h4v-5H4"/><path d="M20 13v4h-4v-5h4"/><path d="M16 19c-1 1-2 2-4 2"/>',
  heart: '<path d="M12 21s-7-4.5-9-9a5 5 0 0 1 8-5 5 5 0 0 1 8 5c-2 4.5-9 9-9 9z"/>',
  link: '<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>',
  list: '<path d="M8 6h12"/><path d="M8 12h12"/><path d="M8 18h12"/><path d="M4 6h.01"/><path d="M4 12h.01"/><path d="M4 18h.01"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  memory: '<path d="M5 8h14v8H5z"/><path d="M7 16v3"/><path d="M11 16v3"/><path d="M15 16v3"/><path d="M8 11h8"/>',
  mic: '<path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/>',
  monitor: '<rect x="4" y="5" width="16" height="11" rx="1"/><path d="M9 20h6"/><path d="M12 16v4"/>',
  mouse: '<path d="M12 3a5 5 0 0 0-5 5v8a5 5 0 0 0 10 0V8a5 5 0 0 0-5-5z"/><path d="M12 3v6"/>',
  keyboard: '<rect x="3" y="7" width="18" height="11" rx="2"/><path d="M6 10h.01"/><path d="M10 10h.01"/><path d="M14 10h.01"/><path d="M18 10h.01"/><path d="M8 14h8"/>',
  mousepad: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M14 8a2.5 2.5 0 0 0-2.5 2.5v3a2.5 2.5 0 0 0 5 0v-3A2.5 2.5 0 0 0 14 8z"/>',
  chair: '<path d="M7 4h10v8H7z"/><path d="M6 12h12"/><path d="M9 12v5"/><path d="M15 12v5"/><path d="M9 17h6"/>',
  desk: '<path d="M3 8h18"/><path d="M4 8v11"/><path d="M20 8v11"/><path d="M4 8l2-3h12l2 3"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  share: '<path d="M8 12h8"/><path d="m13 7 5 5-5 5"/><path d="M5 5v14"/>',
  shield: '<path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z"/><path d="m9 12 2 2 4-5"/>',
  spark: '<path d="M12 2l2 7 7 3-7 3-2 7-2-7-7-3 7-3z"/>',
  storage: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 2 3 3 7 3s7-1 7-3V6"/><path d="M5 12v6c0 2 3 3 7 3s7-1 7-3v-6"/>',
  tag: '<path d="M4 12V5h7l9 9-6 6z"/><path d="M8 8h.01"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/>',
  trophy: '<path d="M8 4h8v4a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 5"/><path d="M16 6h3a3 3 0 0 1-3 5"/><path d="M12 12v5"/><path d="M9 21h6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  x: '<path d="M6 6l12 12"/><path d="M18 6 6 18"/>',
  zap: '<path d="M13 2 4 14h7l-1 8 10-13h-7z"/>',
};

const traitIcons = {
  micro: 'target',
  macro: 'chart',
  social: 'chat',
  chill: 'spark',
  competitive: 'zap',
  support: 'shield',
};

const pcNeedIcons = {
  budget: 'tag',
  fps: 'zap',
  quality: 'monitor',
  stream: 'mic',
  portable: 'cpu',
  comfort: 'shield',
};

const senseIcons = {
  awareness: 'target',
  prediction: 'spark',
  pattern: 'chart',
  spatial: 'monitor',
  speed: 'zap',
  resource: 'storage',
  mindgame: 'chat',
  adaptation: 'trophy',
};

const specIcons = {
  CPU: 'cpu',
  GPU: 'gpu',
  メモリ: 'memory',
  ストレージ: 'storage',
  モニター: 'monitor',
  周辺環境: 'headset',
  ケース: 'cpu',
};

function icon(name, extraClass = '') {
  const body = iconPaths[name] || iconPaths.spark;
  return `<svg class="ui-icon ${extraClass}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`;
}

function hydrateStaticIcons() {
  document.querySelectorAll('[data-icon]').forEach((node) => {
    node.innerHTML = icon(node.dataset.icon);
  });
}

function enhanceLegalCards() {
  const legalIcons = ['shield', 'target', 'ad', 'user', 'chat', 'check'];
  document.querySelectorAll('.legal-card h2').forEach((heading, index) => {
    if (heading.querySelector('.ui-icon')) return;
    heading.insertAdjacentHTML('afterbegin', icon(legalIcons[index % legalIcons.length], 'heading-icon'));
  });
}

function iconForLinkText(text) {
  if (text.includes('PC')) return 'cpu';
  if (text.includes('診断') || text.includes('相性')) return 'link';
  if (text.includes('結果')) return 'list';
  if (text.includes('広告') || text.includes('アフィリエイト')) return 'ad';
  if (text.includes('プライバシー')) return 'shield';
  if (text.includes('免責')) return 'check';
  if (text.includes('運営')) return 'user';
  return 'spark';
}

function enhancePlainLinks() {
  document.querySelectorAll('.site-header nav a, .site-footer nav a').forEach((link) => {
    if (link.querySelector('.ui-icon')) return;
    link.insertAdjacentHTML('afterbegin', icon(iconForLinkText(link.textContent || '')));
  });
}

function setupMenuDrawer() {
  const header = document.querySelector('.site-header');
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-header nav');
  const backdrop = document.querySelector('.menu-backdrop');
  if (!header || !button || !nav || !backdrop) return;

  const setOpen = (open) => {
    document.body.classList.toggle('menu-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    button.innerHTML = `${icon(open ? 'x' : 'menu')}<span>MENU</span>`;
  };

  button.addEventListener('click', () => setOpen(!document.body.classList.contains('menu-open')));
  backdrop.addEventListener('click', () => setOpen(false));
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  setOpen(false);
}

function amazonSearchUrl(query) {
  const params = new URLSearchParams({ k: query, tag: AMAZON_ASSOCIATE_TAG });
  return `https://www.amazon.co.jp/s?${params.toString()}`;
}

function trackEvent(name, detail = {}) {
  const event = {
    name,
    detail,
    path: `${location.pathname}${location.hash}`,
    at: new Date().toISOString(),
  };
  document.documentElement.dataset.gslLastEvent = name;
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: `gsl_${name}`, ...detail });
  }
  try {
    const current = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify([event, ...current].slice(0, 80)));
  } catch (error) {
    window.dispatchEvent(new CustomEvent('gamespec:event', { detail: event }));
    return;
  }
  window.dispatchEvent(new CustomEvent('gamespec:event', { detail: event }));
}

function setResultHash(hash) {
  if (location.hash === hash) return;
  history.replaceState(null, '', `${location.pathname}${location.search}${hash}`);
}

function resultUrl(hash) {
  return `${location.origin}${location.pathname}${hash}`;
}

// シェア用URLはタイプ別の静的ページを指す。
// クローラはハッシュを無視するため、ここで該当ページの og:image
// (タイプ別ドット絵OGPカード) がSNSプレビューに表示される。
function typeShareUrl(path) {
  return `${location.origin}/${path}`;
}

function xShareIntent(text, url, hashtags) {
  const params = new URLSearchParams({ text, url });
  if (hashtags) params.set('hashtags', hashtags);
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

function lineShareIntent(url) {
  return `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
}

function renderShareButtons(kind, variant = '') {
  const suffix = variant ? `-${variant}` : '';
  return `
    <button class="primary-button" type="button" id="share-${kind}-result${suffix}" data-share-kind="${kind}" data-share-role="result">${icon('share')}結果をシェア</button>
    <button class="share-chip share-chip-x" type="button" id="share-${kind}-x${suffix}" data-share-kind="${kind}" data-share-role="x" aria-label="Xでポストする">${icon('x')}Xでポスト</button>
    <button class="share-chip share-chip-line" type="button" id="share-${kind}-line${suffix}" data-share-kind="${kind}" data-share-role="line" aria-label="LINEで送る">${icon('chat')}LINEで送る</button>
  `;
}

function attachShareHandlers(kind, { text, url, hashtags, title, track = {} }) {
  const fullText = `${text}\n${url}`;
  document.querySelectorAll(`[data-share-kind="${kind}"][data-share-role="result"]`).forEach((native) => {
    if (native.dataset.shareBound === 'true') return;
    native.dataset.shareBound = 'true';
    const original = native.innerHTML;
    native.addEventListener('click', async () => {
      trackEvent(`${kind}_share_click`, track);
      try {
        if (navigator.share) {
          await navigator.share({ title, text, url });
          return;
        }
        await navigator.clipboard.writeText(fullText);
        native.innerHTML = `${icon('check')}コピーしました`;
        setTimeout(() => { native.innerHTML = original; }, 2000);
      } catch (error) {
        if (error?.name === 'AbortError') return;
        window.open(xShareIntent(text, url, hashtags), '_blank', 'noopener,noreferrer');
      }
    });
  });
  document.querySelectorAll(`[data-share-kind="${kind}"][data-share-role="x"]`).forEach((btn) => {
    if (btn.dataset.shareBound === 'true') return;
    btn.dataset.shareBound = 'true';
    btn.addEventListener('click', () => {
      trackEvent(`${kind}_share_x`, track);
      window.open(xShareIntent(text, url, hashtags), '_blank', 'noopener,noreferrer');
    });
  });
  document.querySelectorAll(`[data-share-kind="${kind}"][data-share-role="line"]`).forEach((btn) => {
    if (btn.dataset.shareBound === 'true') return;
    btn.dataset.shareBound = 'true';
    btn.addEventListener('click', () => {
      trackEvent(`${kind}_share_line`, track);
      window.open(lineShareIntent(url), '_blank', 'noopener,noreferrer');
    });
  });
}

// ==== 結果カード画像（Canvas生成・保存/シェア） ====
const CARD_COLORS = {
  bg0: '#070c1b',
  bg1: '#0d1730',
  ink: '#f2f7ff',
  muted: '#9badc9',
  cyan: '#72f2ff',
  pink: '#ff4dd2',
  softPink: '#ffb7e9',
  gold: '#ffd76a',
  line: 'rgba(114, 242, 255, 0.28)',
};

const RARITY_CARD_ACCENT = {
  legendary: ['#ff4dd2', '#ffd76a', '#72f2ff'],
  epic: ['#c484ff', '#ff8adf'],
  rare: ['#72f2ff', '#6a7dff'],
  common: ['#9badc9', '#72f2ff'],
};

// 静的タイプページの --type-accent と同じ値（結果カードのタイプ別テーマ色）
const MBTI_CARD_ACCENTS = {
  ISTJ: [139, 163, 216], ISFJ: [199, 206, 221], INFJ: [127, 217, 196], INTJ: [157, 139, 224],
  ISTP: [207, 214, 226], ISFP: [224, 160, 80], INFP: [167, 232, 196], INTP: [165, 148, 230],
  ESTP: [255, 210, 74], ESFP: [255, 224, 122], ENFP: [255, 224, 122], ENTP: [255, 210, 74],
  ESTJ: [224, 185, 74], ESFJ: [255, 155, 192], ENFJ: [255, 210, 74], ENTJ: [224, 185, 74],
};

const SENSE_CARD_ACCENTS = {
  awareness: [127, 224, 240], prediction: [179, 167, 255], pattern: [127, 224, 196],
  spatial: [155, 192, 255], speed: [255, 210, 74], resource: [255, 224, 122],
  mindgame: [255, 155, 214], adaptation: [167, 232, 176],
};

function cardAccentCss(rgb, alpha = 1) {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

const HOLO_FOIL_COLORS = ['#ff4dd2', '#ffd76a', '#72f2ff', '#b8ff6a', '#ff4dd2'];

function drawHoloFrame(ctx, W, H) {
  const foil = ctx.createLinearGradient(0, 0, W, H);
  HOLO_FOIL_COLORS.forEach((color, index) => {
    foil.addColorStop(index / (HOLO_FOIL_COLORS.length - 1), color);
  });
  ctx.strokeStyle = foil;
  ctx.lineWidth = 6;
  roundRectPath(ctx, 26, 26, W - 52, H - 52, 34);
  ctx.stroke();
  return foil;
}

function drawHoloSheen(ctx, W, H) {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.055)';
  [-80, 40].forEach((off) => {
    ctx.beginPath();
    ctx.moveTo(W * 0.15 + off, -50);
    ctx.lineTo(W * 0.42 + off, -50);
    ctx.lineTo(W * 0.05 + off, H + 50);
    ctx.lineTo(-W * 0.22 + off, H + 50);
    ctx.closePath();
    ctx.fill();
  });
  ctx.restore();
}

function drawSparkles(ctx, points) {
  points = points || [[150, 240, 14], [930, 190, 10], [990, 560, 16], [120, 700, 9], [880, 1120, 12], [200, 1180, 8]];
  ctx.save();
  ctx.lineCap = 'round';
  points.forEach(([x, y, r]) => {
    ctx.strokeStyle = CARD_COLORS.gold;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - r, y); ctx.lineTo(x + r, y);
    ctx.moveTo(x, y - r); ctx.lineTo(x, y + r);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - r * 0.5, y - r * 0.5); ctx.lineTo(x + r * 0.5, y + r * 0.5);
    ctx.moveTo(x - r * 0.5, y + r * 0.5); ctx.lineTo(x + r * 0.5, y - r * 0.5);
    ctx.stroke();
  });
  ctx.restore();
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function roundRectPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function wrapCanvasText(ctx, text, maxWidth) {
  const chars = Array.from(text || '');
  const lines = [];
  let line = '';
  chars.forEach((char) => {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = char;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
}

const CARD_FONT = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'Yu Gothic', system-ui, sans-serif";
const CARD_MONO = "ui-monospace, 'SFMono-Regular', Menlo, monospace";

// レーダー部分だけを担当するヘルパー。revealStateを渡すと各頂点を
// 個別の半径で描画できるため、スキャン演出の途中経過をそのまま
// 本番カードと同じ絵作りでコマ撮りできる（省略時＝完成形を一括描画）。
function drawSenseRadarSection(ctx, geo, scores, revealState) {
  const { cx, cy, R, axes, primary, secondary, accentRgb, accentCss } = geo;
  const pt = (i, r) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const radiusFor = (key, index) => {
    if (revealState) {
      const st = revealState.points[index];
      return st ? st.r : R * 0.07;
    }
    return (Math.max(6, scores[key] || 0) / 100) * R;
  };
  const isTriggered = (index) => (revealState ? !!revealState.points[index]?.triggered : true);

  const rGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.35);
  rGlow.addColorStop(0, cardAccentCss(accentRgb, 0.16));
  rGlow.addColorStop(1, cardAccentCss(accentRgb, 0));
  ctx.fillStyle = rGlow;
  ctx.fillRect(cx - R * 1.4, cy - R * 1.4, R * 2.8, R * 2.8);
  for (let ring = 1; ring <= 4; ring++) {
    ctx.beginPath();
    axes.forEach((_, i) => {
      const [x, y] = pt(i, (R * ring) / 4);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = ring === 4 ? cardAccentCss(accentRgb, 0.45) : 'rgba(255, 255, 255, 0.10)';
    ctx.lineWidth = ring === 4 ? 2 : 1;
    ctx.stroke();
  }
  axes.forEach((_, i) => {
    const [x, y] = pt(i, R);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });
  ctx.beginPath();
  axes.forEach((k, i) => {
    const [x, y] = pt(i, radiusFor(k, i));
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.save();
  ctx.shadowColor = accentCss;
  ctx.shadowBlur = 26;
  ctx.fillStyle = cardAccentCss(accentRgb, 0.26);
  ctx.fill();
  ctx.strokeStyle = accentCss;
  ctx.lineWidth = 3.5;
  ctx.stroke();
  ctx.restore();
  axes.forEach((k, i) => {
    const [x, y] = pt(i, radiusFor(k, i));
    ctx.beginPath();
    ctx.arc(x, y, isTriggered(i) ? 6 : 3, 0, Math.PI * 2);
    ctx.fillStyle = (k === primary || k === secondary) ? CARD_COLORS.gold : accentCss;
    ctx.fill();
    ctx.strokeStyle = 'rgba(7, 12, 27, 0.9)';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  axes.forEach((k, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;
    const [x, y] = pt(i, R + 54);
    const isTop = (k === primary || k === secondary);
    ctx.textAlign = Math.abs(Math.cos(a)) < 0.3 ? 'center' : (Math.cos(a) > 0 ? 'left' : 'right');
    ctx.font = `${isTop ? 900 : 700} 26px ${CARD_FONT}`;
    ctx.fillStyle = isTop ? CARD_COLORS.ink : CARD_COLORS.muted;
    ctx.fillText(senseLabels[k], x, y);
    ctx.font = `900 24px ${CARD_MONO}`;
    ctx.fillStyle = isTop ? CARD_COLORS.gold : cardAccentCss(accentRgb, 0.85);
    ctx.fillText(String(scores[k] || 0), x, y + 30);
  });
}

// スイープ線（回転する走査線）を重ね描きする。結果画面のレーダー演出と
// 同じ見た目をCanvas上で再現するための補助関数。
function drawSenseSweepOverlay(ctx, cx, cy, R, sweepDeg) {
  ctx.save();
  for (let k = 14; k >= 0; k--) {
    const trailDeg = sweepDeg - k * 1.6;
    const tr = (trailDeg * Math.PI) / 180;
    const alpha = (1 - k / 14) * 0.22;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(tr) * R, cy + Math.sin(tr) * R);
    ctx.strokeStyle = `rgba(255, 77, 210, ${alpha})`;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  const rad = (sweepDeg * Math.PI) / 180;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(rad) * R, cy + Math.sin(rad) * R);
  ctx.strokeStyle = '#ff4dd2';
  ctx.lineWidth = 3.5;
  ctx.shadowColor = 'rgba(255, 77, 210, 0.9)';
  ctx.shadowBlur = 18;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx + Math.cos(rad) * R, cy + Math.sin(rad) * R, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#ffe1f6';
  ctx.shadowBlur = 22;
  ctx.fill();
  ctx.restore();
}

// GameSense専用：キャラではなくレーダーチャートを主役にした「SCAN REPORT」カード。
// MBTI(=キャラ=人格)とセンス(=能力データ)でシェアの役割を分離する。
// opts.canvasを渡すと新規作成せずそのcanvasに描き直す(スキャン演出の
// コマ撮り用)。opts.revealStateを渡すとレーダーだけ途中経過で描画する。
function drawSenseScanReport(data, opts = {}) {
  const W = 1080;
  const H = 1350;
  const canvas = opts.canvas || document.createElement('canvas');
  if (!opts.canvas) {
    canvas.width = W;
    canvas.height = H;
  }
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  const accentRgb = data.accent || [114, 242, 255];
  const accentCss = cardAccentCss(accentRgb);
  const rarity = data.rarity;
  const isLegendary = rarity.accent === 'legendary';
  const scores = data.scores || {};
  const primary = data.primary;
  const secondary = data.secondary;

  // 背景
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, CARD_COLORS.bg1);
  bg.addColorStop(1, CARD_COLORS.bg0);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  const glowA = ctx.createRadialGradient(W / 2, H * 0.34, 0, W / 2, H * 0.34, W * 0.6);
  glowA.addColorStop(0, cardAccentCss(accentRgb, 0.22));
  glowA.addColorStop(1, cardAccentCss(accentRgb, 0));
  ctx.fillStyle = glowA;
  ctx.fillRect(0, 0, W, H);
  const glowB = ctx.createRadialGradient(W * 0.85, H * 0.85, 0, W * 0.85, H * 0.85, W * 0.5);
  glowB.addColorStop(0, 'rgba(255, 77, 210, 0.10)');
  glowB.addColorStop(1, 'rgba(255, 77, 210, 0)');
  ctx.fillStyle = glowB;
  ctx.fillRect(0, 0, W, H);

  // ドット格子＋スキャンライン
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  for (let gy = 60; gy < H; gy += 44) for (let gx = 60; gx < W; gx += 44) ctx.fillRect(gx, gy, 2, 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let y = 0; y < H; y += 6) ctx.fillRect(0, y, W, 2);
  if (isLegendary) drawHoloSheen(ctx, W, H);

  // 枠
  if (isLegendary) {
    drawHoloFrame(ctx, W, H);
  } else {
    ctx.strokeStyle = accentCss;
    ctx.lineWidth = 4;
    roundRectPath(ctx, 26, 26, W - 52, H - 52, 34);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  roundRectPath(ctx, 40, 40, W - 80, H - 80, 26);
  ctx.stroke();

  // ヘッダー
  ctx.textBaseline = 'alphabetic';
  ctx.font = `800 26px ${CARD_MONO}`;
  ctx.fillStyle = accentCss;
  ctx.textAlign = 'left';
  ctx.fillText('◤ GAMESPEC LAB', 72, 96);
  ctx.fillStyle = CARD_COLORS.softPink;
  ctx.textAlign = 'right';
  ctx.fillText('GAMESENSE SCAN 8', W - 72, 96);

  // SCAN REPORT 見出し＋ID
  ctx.textAlign = 'left';
  ctx.font = `900 44px ${CARD_MONO}`;
  ctx.fillStyle = CARD_COLORS.ink;
  ctx.fillText('SCAN REPORT', 72, 166);
  const scanId = `GSL-${(primary || '').slice(0, 3).toUpperCase()}-${(secondary || '').slice(0, 3).toUpperCase()}`;
  ctx.font = `800 24px ${CARD_MONO}`;
  ctx.fillStyle = CARD_COLORS.muted;
  ctx.textAlign = 'right';
  ctx.fillText(`SCAN ID: ${scanId}`, W - 72, 166);
  ctx.strokeStyle = cardAccentCss(accentRgb, 0.5);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(72, 186);
  ctx.lineTo(W - 72, 186);
  ctx.stroke();

  // レーダーチャート（主役）
  const cx = W / 2;
  const cy = 480;
  const R = 230;
  const axes = Object.keys(senseLabels);
  drawSenseRadarSection(ctx, { cx, cy, R, axes, primary, secondary, accentRgb, accentCss }, scores, opts.revealState);
  if (opts.revealState && opts.revealState.sweepDeg !== undefined) {
    drawSenseSweepOverlay(ctx, cx, cy, R, opts.revealState.sweepDeg);
  }

  // レアリティ
  const rarityY = cy + R + 128;
  ctx.textAlign = 'center';
  ctx.font = `900 34px ${CARD_MONO}`;
  if (isLegendary) {
    const grad = ctx.createLinearGradient(W / 2 - 260, 0, W / 2 + 260, 0);
    HOLO_FOIL_COLORS.forEach((color, index) => grad.addColorStop(index / (HOLO_FOIL_COLORS.length - 1), color));
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = rarity.accent === 'common' ? CARD_COLORS.muted : accentCss;
  }
  ctx.fillText(`${rarity.tier}  ${rarity.label}`, W / 2, rarityY);
  ctx.font = `900 30px ${CARD_FONT}`;
  ctx.fillStyle = CARD_COLORS.gold;
  const senseScoreText = typeof rarity.rating === 'number'
    ? `★ ${rarity.rating.toFixed(1)} / 5.0`
    : '★'.repeat(rarity.stars) + '☆'.repeat(Math.max(0, 5 - rarity.stars));
  ctx.fillText(senseScoreText, W / 2, rarityY + 44);
  ctx.font = `800 26px ${CARD_FONT}`;
  ctx.fillStyle = CARD_COLORS.muted;
  ctx.fillText(rarity.percentLabel, W / 2, rarityY + 86);

  // コールサイン（＝センスの識別名。人格の「〜型」とは器を分ける）
  const ty = rarityY + 188;
  ctx.font = `800 24px ${CARD_MONO}`;
  ctx.fillStyle = cardAccentCss(accentRgb, 0.85);
  ctx.fillText('— CALLSIGN —', W / 2, ty - 60);
  ctx.font = `900 66px ${CARD_MONO}`;
  ctx.fillStyle = CARD_COLORS.ink;
  ctx.fillText(data.callsign || data.name, W / 2, ty);
  ctx.font = `800 27px ${CARD_FONT}`;
  ctx.fillStyle = accentCss;
  ctx.fillText(data.code, W / 2, ty + 46);

  // TOP3 グレードチップ
  const top3 = rankScores(scores).slice(0, 3);
  const chipW = 288;
  const chipH = 92;
  const gap = 22;
  const startX = (W - (chipW * 3 + gap * 2)) / 2;
  const chipY = H - 242;
  top3.forEach(([k, v], i) => {
    const x = startX + i * (chipW + gap);
    ctx.fillStyle = 'rgba(7, 12, 27, 0.85)';
    roundRectPath(ctx, x, chipY, chipW, chipH, 18);
    ctx.fill();
    ctx.strokeStyle = i === 0 ? CARD_COLORS.gold : cardAccentCss(accentRgb, 0.55);
    ctx.lineWidth = i === 0 ? 3 : 2;
    roundRectPath(ctx, x, chipY, chipW, chipH, 18);
    ctx.stroke();
    ctx.textAlign = 'left';
    ctx.font = `900 46px ${CARD_MONO}`;
    ctx.fillStyle = CARD_COLORS.gold;
    ctx.fillText(abilityTierGrade(v), x + 24, chipY + 60);
    ctx.font = `800 24px ${CARD_FONT}`;
    ctx.fillStyle = CARD_COLORS.ink;
    ctx.fillText(senseLabels[k], x + 78, chipY + 40);
    ctx.font = `900 26px ${CARD_MONO}`;
    ctx.fillStyle = accentCss;
    ctx.fillText(`${v} / 100`, x + 78, chipY + 72);
  });

  if (isLegendary) drawSparkles(ctx, [[130, 250, 12], [950, 230, 14], [110, 640, 9], [970, 700, 11], [150, 980, 10], [930, 985, 13]]);

  // フッター
  ctx.textAlign = 'left';
  ctx.font = `800 24px ${CARD_MONO}`;
  ctx.fillStyle = accentCss;
  ctx.fillText('gamespeclab.com', 72, H - 62);
  ctx.textAlign = 'right';
  ctx.fillStyle = CARD_COLORS.muted;
  ctx.fillText('#GameSpecLab で診断結果をシェア', W - 72, H - 62);

  return canvas;
}

async function drawResultCard(data) {
  if (data.kind === 'sense') return drawSenseScanReport(data);

  const W = 1080;
  const H = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const accentRgb = data.accent || [114, 242, 255];
  const accentCss = cardAccentCss(accentRgb);
  const isLegendary = data.rarity.accent === 'legendary';

  // 背景
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, CARD_COLORS.bg1);
  bg.addColorStop(1, CARD_COLORS.bg0);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // タイプ色のネオングロー
  const glowA = ctx.createRadialGradient(W * 0.28, H * 0.22, 0, W * 0.28, H * 0.22, W * 0.62);
  glowA.addColorStop(0, cardAccentCss(accentRgb, 0.26));
  glowA.addColorStop(1, cardAccentCss(accentRgb, 0));
  ctx.fillStyle = glowA;
  ctx.fillRect(0, 0, W, H);
  const glowB = ctx.createRadialGradient(W * 0.85, H * 0.72, 0, W * 0.85, H * 0.72, W * 0.6);
  glowB.addColorStop(0, cardAccentCss(accentRgb, 0.18));
  glowB.addColorStop(1, cardAccentCss(accentRgb, 0));
  ctx.fillStyle = glowB;
  ctx.fillRect(0, 0, W, H);

  // 背景にタイプ絵の透かし（拡大・低透明度）
  if (data.image) {
    const wmImg = await loadImage(data.image);
    if (wmImg && wmImg.width) {
      const wmW = W * 1.15;
      const wmH = wmW * (wmImg.height / wmImg.width);
      ctx.save();
      ctx.globalAlpha = 0.09;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(wmImg, W - wmW + 130, H - wmH + 40, wmW, wmH);
      ctx.imageSmoothingEnabled = true;
      ctx.restore();
    }
  }

  // スキャンライン
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let y = 0; y < H; y += 6) ctx.fillRect(0, y, W, 2);

  // ホロ光沢バンド（LEGENDARYのみ）
  if (isLegendary) drawHoloSheen(ctx, W, H);

  // 枠：LEGENDARYはレインボー箔、それ以外はタイプ色
  if (isLegendary) {
    drawHoloFrame(ctx, W, H);
  } else {
    ctx.strokeStyle = accentCss;
    ctx.lineWidth = 4;
    roundRectPath(ctx, 26, 26, W - 52, H - 52, 34);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  roundRectPath(ctx, 40, 40, W - 80, H - 80, 26);
  ctx.stroke();

  // ヘッダー
  ctx.textBaseline = 'alphabetic';
  ctx.font = `800 26px ${CARD_MONO}`;
  ctx.fillStyle = accentCss;
  ctx.textAlign = 'left';
  ctx.fillText('◤ GAMESPEC LAB', 72, 96);
  ctx.font = `800 24px ${CARD_MONO}`;
  ctx.fillStyle = CARD_COLORS.softPink;
  ctx.textAlign = 'right';
  ctx.fillText(data.label, W - 72, 96);

  // キャラクターオーブ
  const orbSize = 400;
  const orbX = (W - orbSize) / 2;
  const orbY = 150;
  const orbGlow = ctx.createRadialGradient(W / 2, orbY + orbSize * 0.42, 0, W / 2, orbY + orbSize * 0.42, orbSize * 0.7);
  orbGlow.addColorStop(0, cardAccentCss(accentRgb, 0.3));
  orbGlow.addColorStop(1, cardAccentCss(accentRgb, 0));
  ctx.fillStyle = orbGlow;
  ctx.fillRect(orbX - 40, orbY - 40, orbSize + 80, orbSize + 80);
  ctx.save();
  ctx.fillStyle = 'rgba(7, 12, 27, 0.9)';
  roundRectPath(ctx, orbX, orbY, orbSize, orbSize, 56);
  ctx.fill();
  ctx.strokeStyle = accentCss;
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();

  if (data.image) {
    const img = await loadImage(data.image);
    if (img && img.width) {
      const pad = 54;
      const maxW = orbSize - pad * 2;
      const maxH = orbSize - pad * 2;
      const scale = Math.min(maxW / img.width, maxH / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, W / 2 - dw / 2, orbY + orbSize / 2 - dh / 2, dw, dh);
      ctx.imageSmoothingEnabled = true;
    }
  }

  // レアリティ
  const rarityY = orbY + orbSize + 66;
  ctx.textAlign = 'center';
  ctx.font = `900 34px ${CARD_MONO}`;
  if (isLegendary) {
    const rarityGrad = ctx.createLinearGradient(W / 2 - 260, 0, W / 2 + 260, 0);
    HOLO_FOIL_COLORS.forEach((color, index) => rarityGrad.addColorStop(index / (HOLO_FOIL_COLORS.length - 1), color));
    ctx.fillStyle = rarityGrad;
  } else {
    ctx.fillStyle = data.rarity.accent === 'common' ? CARD_COLORS.muted : accentCss;
  }
  ctx.fillText(`${data.rarity.tier}  ${data.rarity.label}`, W / 2, rarityY);
  ctx.font = `900 30px ${CARD_FONT}`;
  ctx.fillStyle = CARD_COLORS.gold;
  const stars = typeof data.rarity.rating === 'number'
    ? `★ ${data.rarity.rating.toFixed(1)} / 5.0`
    : '★'.repeat(data.rarity.stars) + '☆'.repeat(Math.max(0, 5 - data.rarity.stars));
  ctx.fillText(stars, W / 2, rarityY + 44);
  ctx.font = `800 26px ${CARD_FONT}`;
  ctx.fillStyle = CARD_COLORS.muted;
  ctx.fillText(data.rarity.percentLabel, W / 2, rarityY + 88);

  // タイプ名
  let cursorY = rarityY + 168;
  ctx.fillStyle = CARD_COLORS.ink;
  ctx.font = `900 62px ${CARD_FONT}`;
  const nameLines = wrapCanvasText(ctx, data.name, W - 180);
  nameLines.slice(0, 2).forEach((lineText) => {
    ctx.fillText(lineText, W / 2, cursorY);
    cursorY += 74;
  });

  // コード / サブ
  ctx.font = `800 28px ${CARD_MONO}`;
  ctx.fillStyle = accentCss;
  const codeLines = wrapCanvasText(ctx, data.code, W - 180);
  ctx.fillText(codeLines[0] || '', W / 2, cursorY + 6);
  cursorY += 52;

  // キャッチ
  ctx.font = `600 30px ${CARD_FONT}`;
  ctx.fillStyle = CARD_COLORS.softPink;
  const catchLines = wrapCanvasText(ctx, data.catchline, W - 180);
  catchLines.slice(0, 2).forEach((lineText) => {
    ctx.fillText(lineText, W / 2, cursorY + 8);
    cursorY += 42;
  });

  // バー（MBTIは4軸、GameSenseは上位3能力）
  const bars = (data.bars || []).slice(0, 4);
  let barY = Math.max(cursorY + 40, H - 320);
  // フッターに重ならないよう、本数に応じて行間を詰める（3本以下は従来どおり62px）
  const barStep = bars.length > 1
    ? Math.min(62, (H - 140 - barY) / (bars.length - 1))
    : 62;
  const barX = 96;
  const barW = W - barX * 2;
  ctx.textAlign = 'left';
  bars.forEach((bar) => {
    ctx.font = `800 26px ${CARD_FONT}`;
    ctx.fillStyle = CARD_COLORS.ink;
    ctx.fillText(bar.label, barX, barY - 12);
    ctx.textAlign = 'right';
    ctx.fillStyle = accentCss;
    ctx.font = `900 26px ${CARD_MONO}`;
    ctx.fillText(String(bar.value), barX + barW, barY - 12);
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    roundRectPath(ctx, barX, barY, barW, 16, 8);
    ctx.fill();
    const fillW = Math.max(18, (Math.min(100, Math.max(6, bar.value)) / 100) * barW);
    const barGrad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
    barGrad.addColorStop(0, cardAccentCss(accentRgb, 0.75));
    barGrad.addColorStop(1, accentCss);
    ctx.fillStyle = barGrad;
    roundRectPath(ctx, barX, barY, fillW, 16, 8);
    ctx.fill();
    barY += barStep;
  });

  // キラキラ（LEGENDARYのみ、テキスト描画の後に重ねる）
  if (isLegendary) drawSparkles(ctx);

  // フッター
  ctx.textAlign = 'left';
  ctx.font = `800 24px ${CARD_MONO}`;
  ctx.fillStyle = accentCss;
  ctx.fillText('gamespeclab.com', 72, H - 62);
  ctx.textAlign = 'right';
  ctx.fillStyle = CARD_COLORS.muted;
  ctx.fillText('#GameSpecLab で診断結果をシェア', W - 72, H - 62);

  return canvas;
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => {
    if (canvas.toBlob) canvas.toBlob((blob) => resolve(blob), 'image/png');
    else resolve(null);
  });
}

function getMbtiCardData(type, scores) {
  const bars = mbtiAxisPairs.map(([left, right]) => {
    const leftValue = scores[left] || 0;
    const rightValue = scores[right] || 0;
    const winner = leftValue >= rightValue ? left : right;
    const percent = Math.round((Math.max(leftValue, rightValue) / Math.max(1, leftValue + rightValue)) * 100);
    return { label: `${winner} · ${mbtiAxisLabels[winner]}`, value: percent };
  });
  return {
    kind: 'mbti',
    label: 'GAMER MBTI',
    image: mbtiCharImg(type.code),
    code: `参考コード ${type.code}`,
    name: type.title,
    catchline: type.catchline,
    rarity: getMbtiRarity(type.code),
    accent: MBTI_CARD_ACCENTS[type.code],
    bars,
  };
}

function getSenseCardData(archetype, normalizedScores) {
  const top3 = rankScores(normalizedScores).slice(0, 3);
  return {
    kind: 'sense',
    label: 'GAMESENSE SCAN 8',
    image: `assets/types/sense-${archetype.primary}-guide.png?v=2`,
    code: `${senseLabels[archetype.primary]} × ${senseLabels[archetype.secondary]}`,
    name: archetype.callsign,
    callsign: archetype.callsign,
    alias: archetype.alias,
    catchline: archetype.catchline,
    rarity: getSenseRarity(archetype),
    accent: SENSE_CARD_ACCENTS[archetype.primary],
    bars: top3.map(([key, value]) => ({ label: `${abilityTierGrade(value)}・${senseLabels[key]}`, value })),
    scores: normalizedScores,
    primary: archetype.primary,
    secondary: archetype.secondary,
  };
}

function getSavedMbtiResult() {
  const answers = readSavedAnswers('mbti', mbtiQuestions.length);
  if (answers.length !== mbtiQuestions.length) return null;
  const keys = Object.keys(mbtiAxisLabels);
  const scores = getScores(answers, mbtiQuestions, 'mbti', keys);
  return { type: getGamerMbtiResult(scores), scores };
}

function getSavedSenseResult() {
  const answers = readSavedAnswers('sense', senseQuestions.length);
  if (answers.length !== senseQuestions.length) return null;
  const keys = Object.keys(senseLabels);
  const rawScores = getScores(answers, senseQuestions, 'sense', keys);
  const maxScores = getMaxScores(senseQuestions, 'sense', keys);
  const normalizedScores = normalizeScores(rawScores, maxScores, { floor: 38 });
  return { archetype: getSenseArchetype(normalizedScores), normalizedScores };
}

async function drawGamerIdCard(mbtiResult, senseResult) {
  const mbtiCard = getMbtiCardData(mbtiResult.type, mbtiResult.scores);
  const senseCard = getSenseCardData(senseResult.archetype, senseResult.normalizedScores);
  const W = 1200;
  const H = 700;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const leftAcc = mbtiCard.accent || [114, 242, 255];
  const rightAcc = senseCard.accent || [255, 77, 210];
  const leftCss = cardAccentCss(leftAcc);
  const rightCss = cardAccentCss(rightAcc);
  const hasLegendary = mbtiCard.rarity.accent === 'legendary' || senseCard.rarity.accent === 'legendary';
  const starStr = (r) => { const f = Math.round(r); return '★'.repeat(Math.max(0, Math.min(5, f))) + '☆'.repeat(Math.max(0, 5 - f)); };
  const ratingOf = (rar) => typeof rar.rating === 'number' ? rar.rating : (rar.stars || 0);

  // ===== 背景 =====
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, CARD_COLORS.bg1);
  bg.addColorStop(1, CARD_COLORS.bg0);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  // 左＝MBTI色 / 右＝GameSense色のグロー
  const glowA = ctx.createRadialGradient(243, 300, 0, 243, 300, 430);
  glowA.addColorStop(0, cardAccentCss(leftAcc, 0.24));
  glowA.addColorStop(1, cardAccentCss(leftAcc, 0));
  ctx.fillStyle = glowA;
  ctx.fillRect(0, 0, W, H);
  const glowB = ctx.createRadialGradient(830, 430, 0, 830, 430, 470);
  glowB.addColorStop(0, cardAccentCss(rightAcc, 0.2));
  glowB.addColorStop(1, cardAccentCss(rightAcc, 0));
  ctx.fillStyle = glowB;
  ctx.fillRect(0, 0, W, H);
  // ドット格子＋スキャンライン
  ctx.fillStyle = 'rgba(255, 255, 255, 0.045)';
  for (let gy = 70; gy < H - 40; gy += 42) for (let gx = 70; gx < W - 40; gx += 42) ctx.fillRect(gx, gy, 2, 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let y = 0; y < H; y += 6) ctx.fillRect(0, y, W, 2);
  if (hasLegendary) drawHoloSheen(ctx, W, H);

  // ===== 枠 =====
  if (hasLegendary) {
    drawHoloFrame(ctx, W, H);
  } else {
    const frame = ctx.createLinearGradient(0, 0, W, 0);
    frame.addColorStop(0, leftCss);
    frame.addColorStop(1, rightCss);
    ctx.strokeStyle = frame;
    ctx.lineWidth = 4;
    roundRectPath(ctx, 24, 24, W - 48, H - 48, 32);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  roundRectPath(ctx, 38, 38, W - 76, H - 76, 24);
  ctx.stroke();

  // ===== ヘッダー帯 =====
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  ctx.font = `900 25px ${CARD_MONO}`;
  ctx.fillStyle = CARD_COLORS.cyan;
  ctx.fillText('◤ GAMER ID CARD', 66, 92);
  const idCode = `GSL-${mbtiResult.type.code}-${senseResult.archetype.primary.slice(0, 3).toUpperCase()}${senseResult.archetype.secondary.slice(0, 3).toUpperCase()}`;
  ctx.textAlign = 'right';
  ctx.font = `800 22px ${CARD_MONO}`;
  ctx.fillStyle = CARD_COLORS.muted;
  ctx.fillText(`ID: ${idCode}`, W - 66, 92);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(66, 112);
  ctx.lineTo(W - 66, 112);
  ctx.stroke();

  // ===== 左レール：MBTIアバター（人格） =====
  const railCx = 244;
  const orbSize = 226;
  const orbX = railCx - orbSize / 2;
  const orbY = 150;
  const orbCy = orbY + orbSize / 2;
  const orbGlow = ctx.createRadialGradient(railCx, orbCy, 0, railCx, orbCy, orbSize * 0.75);
  orbGlow.addColorStop(0, cardAccentCss(leftAcc, 0.3));
  orbGlow.addColorStop(1, cardAccentCss(leftAcc, 0));
  ctx.fillStyle = orbGlow;
  ctx.fillRect(orbX - 40, orbY - 40, orbSize + 80, orbSize + 80);
  ctx.save();
  ctx.fillStyle = 'rgba(7, 12, 27, 0.92)';
  roundRectPath(ctx, orbX, orbY, orbSize, orbSize, 34);
  ctx.fill();
  if (mbtiCard.rarity.accent === 'legendary') {
    const foil = ctx.createLinearGradient(orbX, orbY, orbX + orbSize, orbY + orbSize);
    HOLO_FOIL_COLORS.forEach((c, i) => foil.addColorStop(i / (HOLO_FOIL_COLORS.length - 1), c));
    ctx.strokeStyle = foil;
  } else {
    ctx.strokeStyle = leftCss;
  }
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();
  const avImg = await loadImage(mbtiCard.image);
  if (avImg && avImg.width) {
    const pad = 26;
    const scale = Math.min((orbSize - pad * 2) / avImg.width, (orbSize - pad * 2) / avImg.height);
    const dw = avImg.width * scale;
    const dh = avImg.height * scale;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(avImg, railCx - dw / 2, orbCy - dh / 2, dw, dh);
    ctx.imageSmoothingEnabled = true;
  }
  // MBTI GAMER ラベル（オーブ上）
  ctx.textAlign = 'center';
  ctx.font = `800 17px ${CARD_MONO}`;
  ctx.fillStyle = leftCss;
  ctx.fillText('GAMER MBTI', railCx, orbY - 14);
  // コード
  ctx.font = `900 30px ${CARD_MONO}`;
  ctx.fillStyle = leftCss;
  ctx.fillText(mbtiResult.type.code, railCx, orbY + orbSize + 52);
  // タイプ名（日本語, 2行まで）
  ctx.font = `900 30px ${CARD_FONT}`;
  ctx.fillStyle = CARD_COLORS.ink;
  drawWrappedCanvasText(ctx, mbtiResult.type.title, railCx, orbY + orbSize + 96, orbSize + 60, 36, 2);
  // レアリティ + 星
  const mR = mbtiCard.rarity;
  ctx.font = `800 19px ${CARD_MONO}`;
  ctx.fillStyle = mR.accent === 'common' ? CARD_COLORS.muted : leftCss;
  ctx.fillText(`${mR.tier} ${mR.label}`, railCx, orbY + orbSize + 176);
  ctx.font = `900 26px ${CARD_FONT}`;
  ctx.fillStyle = CARD_COLORS.gold;
  ctx.fillText(starStr(ratingOf(mR)), railCx, orbY + orbSize + 214);

  // ===== 中央の縦ディバイダ＋× =====
  const divX = 476;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(divX, 150);
  ctx.lineTo(divX, H - 96);
  ctx.stroke();
  ctx.save();
  ctx.fillStyle = 'rgba(7, 12, 27, 0.95)';
  ctx.beginPath();
  ctx.arc(divX, orbCy, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = cardAccentCss(rightAcc, 0.6);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
  ctx.textAlign = 'center';
  ctx.font = `900 34px ${CARD_MONO}`;
  ctx.fillStyle = CARD_COLORS.softPink;
  ctx.fillText('×', divX, orbCy + 12);

  // ===== 右エリア：GameSenseプロフィール＋レーダー（スキル） =====
  const rcx0 = 512;
  ctx.textAlign = 'left';
  ctx.font = `800 18px ${CARD_MONO}`;
  ctx.fillStyle = rightCss;
  ctx.fillText('GAMESENSE SCAN 8', rcx0, 162);
  ctx.font = `900 56px ${CARD_MONO}`;
  ctx.fillStyle = CARD_COLORS.ink;
  ctx.fillText(senseResult.archetype.callsign, rcx0, 216);
  ctx.font = `700 20px ${CARD_FONT}`;
  ctx.fillStyle = CARD_COLORS.muted;
  ctx.fillText(senseCard.code, rcx0, 246);

  // レーダー
  const rx = 824;
  const scores = senseCard.scores || {};
  const primary = senseCard.primary;
  const secondary = senseCard.secondary;
  const axes = Object.keys(senseLabels);
  const cy = 452;
  const R = 118;
  const pt = (i, r) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;
    return [rx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const rGlow = ctx.createRadialGradient(rx, cy, 0, rx, cy, R * 1.4);
  rGlow.addColorStop(0, cardAccentCss(rightAcc, 0.14));
  rGlow.addColorStop(1, cardAccentCss(rightAcc, 0));
  ctx.fillStyle = rGlow;
  ctx.fillRect(rx - R * 1.5, cy - R * 1.5, R * 3, R * 3);
  for (let ring = 1; ring <= 3; ring++) {
    ctx.beginPath();
    axes.forEach((_, i) => { const [x, y] = pt(i, (R * ring) / 3); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
    ctx.closePath();
    ctx.strokeStyle = ring === 3 ? cardAccentCss(rightAcc, 0.45) : 'rgba(255, 255, 255, 0.09)';
    ctx.lineWidth = ring === 3 ? 2 : 1;
    ctx.stroke();
  }
  axes.forEach((_, i) => { const [x, y] = pt(i, R); ctx.beginPath(); ctx.moveTo(rx, cy); ctx.lineTo(x, y); ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)'; ctx.lineWidth = 1; ctx.stroke(); });
  ctx.beginPath();
  axes.forEach((k, i) => { const [x, y] = pt(i, (Math.max(6, scores[k] || 0) / 100) * R); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
  ctx.closePath();
  ctx.save();
  ctx.shadowColor = rightCss;
  ctx.shadowBlur = 22;
  ctx.fillStyle = cardAccentCss(rightAcc, 0.28);
  ctx.fill();
  ctx.strokeStyle = rightCss;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();
  axes.forEach((k, i) => {
    const [x, y] = pt(i, (Math.max(6, scores[k] || 0) / 100) * R);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = (k === primary || k === secondary) ? CARD_COLORS.gold : rightCss;
    ctx.fill();
    ctx.strokeStyle = 'rgba(7, 12, 27, 0.9)';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  // ラベル＋スコア
  axes.forEach((k, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;
    const near = k === primary || k === secondary;
    const top = Math.sin(a) < -0.3;
    const [x, y] = pt(i, R + (top ? 44 : 34));
    ctx.textAlign = Math.abs(Math.cos(a)) < 0.3 ? 'center' : (Math.cos(a) > 0 ? 'left' : 'right');
    ctx.font = `${near ? 900 : 700} 18px ${CARD_FONT}`;
    ctx.fillStyle = near ? CARD_COLORS.ink : CARD_COLORS.muted;
    ctx.fillText(senseLabels[k], x, y + (top ? -6 : 14));
    ctx.font = `900 16px ${CARD_MONO}`;
    ctx.fillStyle = near ? CARD_COLORS.gold : cardAccentCss(rightAcc, 0.85);
    ctx.fillText(String(scores[k] || 0), x, y + (top ? 14 : 34));
  });
  // GameSenseレアリティ＋星（右上に寄せる）
  ctx.textAlign = 'right';
  const sR = senseCard.rarity;
  ctx.font = `800 18px ${CARD_MONO}`;
  ctx.fillStyle = sR.accent === 'common' ? CARD_COLORS.muted : rightCss;
  ctx.fillText(`${sR.tier} ${sR.label}`, W - 66, 168);
  ctx.font = `900 24px ${CARD_FONT}`;
  ctx.fillStyle = CARD_COLORS.gold;
  ctx.fillText(starStr(ratingOf(sR)), W - 66, 200);

  if (hasLegendary) {
    drawSparkles(ctx, [[96, 300, 11], [96, 520, 12], [1156, 300, 10], [1156, 620, 13]]);
  }

  // ===== フッター =====
  ctx.textAlign = 'left';
  ctx.font = `800 22px ${CARD_MONO}`;
  ctx.fillStyle = CARD_COLORS.cyan;
  ctx.fillText('gamespeclab.com', 66, H - 46);
  ctx.textAlign = 'right';
  ctx.fillStyle = CARD_COLORS.muted;
  ctx.fillText('#GameSpecLab で名刺をシェア', W - 66, H - 46);

  return canvas;
}
function renderGamerIdCardPanel() {
  const panel = document.querySelector('#gamer-id-card-panel');
  if (!panel) return;
  const mbtiResult = getSavedMbtiResult();
  const senseResult = getSavedSenseResult();

  if (mbtiResult && senseResult) {
    panel.innerHTML = `
      <div class="id-card-copy">
        <span>${icon('tag')}GAMER ID CARD</span>
        <strong>両方の診断が完了しました。ゲーマー名刺を作れます</strong>
        <p>${mbtiResult.type.title}(${mbtiResult.type.code}) × ${senseResult.archetype.name} を1枚の名刺にまとめます。</p>
      </div>
      <div class="id-card-body">
        <button class="primary-button" type="button" id="gamer-id-card-generate">${icon('share')}ゲーマー名刺を作成</button>
      </div>
    `;
    const button = panel.querySelector('#gamer-id-card-generate');
    const body = panel.querySelector('.id-card-body');
    button.addEventListener('click', async () => {
      trackEvent('gamer_id_card_generate', { code: mbtiResult.type.code, archetype: senseResult.archetype.name });
      button.disabled = true;
      button.innerHTML = `${icon('spark')}名刺を生成中...`;
      let canvas = null;
      try {
        canvas = await drawGamerIdCard(mbtiResult, senseResult);
      } catch (error) {
        canvas = null;
      }
      if (!canvas) {
        button.disabled = false;
        button.innerHTML = `${icon('share')}もう一度作成`;
        return;
      }
      const blob = await canvasToBlob(canvas);
      const dataUrl = canvas.toDataURL('image/png');
      const filename = `gamespeclab-id-card-${mbtiResult.type.code}`.toLowerCase();
      body.innerHTML = `
        <figure class="card-studio-preview id-card-preview">
          <img src="${dataUrl}" alt="ゲーマー名刺" width="1200" height="700" />
        </figure>
        <div class="card-studio-buttons">
          <button class="primary-button" type="button" id="gamer-id-card-share">${icon('share')}保存・シェア</button>
          <button class="ghost-button" type="button" id="gamer-id-card-redo">${icon('target')}作り直す</button>
        </div>
        <p class="card-studio-hint">${icon('check')}画像を長押し／右クリックでも保存できます。</p>
      `;
      body.querySelector('#gamer-id-card-share')?.addEventListener('click', async () => {
        trackEvent('gamer_id_card_share', { code: mbtiResult.type.code, archetype: senseResult.archetype.name });
        const file = blob ? new File([blob], `${filename}.png`, { type: 'image/png' }) : null;
        const shareText = `ゲーマー名刺できた！${mbtiResult.type.title}(${mbtiResult.type.code}) × ${senseResult.archetype.name}`;
        if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({ files: [file], text: shareText, title: 'ゲーマー名刺' });
            return;
          } catch (error) {
            if (error?.name === 'AbortError') return;
          }
        }
        const url = blob ? URL.createObjectURL(blob) : dataUrl;
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `${filename}.png`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        if (blob) window.setTimeout(() => URL.revokeObjectURL(url), 4000);
      });
      body.querySelector('#gamer-id-card-redo')?.addEventListener('click', () => {
        renderGamerIdCardPanel();
      });
    });
    return;
  }

  const missing = [];
  if (!mbtiResult) missing.push({ href: 'gamermbti.html', label: 'ゲーマーMBTI診断' });
  if (!senseResult) missing.push({ href: 'gamesense.html', label: 'GameSense Scan 8' });
  panel.innerHTML = `
    <div class="id-card-copy">
      <span>${icon('tag')}GAMER ID CARD</span>
      <strong>両方の診断を受けると、ゲーマー名刺が作れます</strong>
      <p>ゲーマーMBTIとGameSense Scan 8、両方の結果を組み合わせた名刺画像を作成できます。${missing.length === 2 ? 'まずはどちらかを診断してみましょう。' : 'あと1つで完成です。'}</p>
    </div>
    <div class="id-card-missing">
      ${missing.map((entry) => `<a class="ghost-link" href="${entry.href}">${icon('arrow')}${entry.label}を受ける</a>`).join('')}
    </div>
  `;
}

function renderResultCardStudio(kind) {
  return `
    <section class="card-studio" data-card-studio="${kind}" aria-label="結果カード画像">
      <div class="card-studio-copy">
        <span>${icon('spark')}SHARE CARD</span>
        <strong>結果をカード画像でシェア</strong>
        <p>スクショより綺麗な公式カードを1枚で作成。保存してSNSにそのまま投稿できます。</p>
      </div>
      <div class="card-studio-body">
        <button class="primary-button" type="button" data-card-generate>${icon('share')}カード画像を作成</button>
      </div>
    </section>
  `;
}

function attachCardStudio(kind, data, shareMeta) {
  const studio = document.querySelector(`[data-card-studio="${kind}"]`);
  if (!studio || studio.dataset.cardBound === 'true') return;
  studio.dataset.cardBound = 'true';
  const body = studio.querySelector('.card-studio-body');
  const generateButton = studio.querySelector('[data-card-generate]');
  if (!body || !generateButton) return;

  generateButton.addEventListener('click', async () => {
    trackEvent(`${kind}_card_generate`, shareMeta.track || {});
    generateButton.disabled = true;
    generateButton.innerHTML = `${icon('spark')}カードを生成中...`;
    let canvas = null;
    try {
      canvas = await drawResultCard(data);
    } catch (error) {
      canvas = null;
    }
    if (!canvas) {
      generateButton.disabled = false;
      generateButton.innerHTML = `${icon('share')}もう一度作成`;
      return;
    }
    const blob = await canvasToBlob(canvas);
    const dataUrl = canvas.toDataURL('image/png');
    const filename = `gamespeclab-${kind}-${(data.code || 'result').replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'card'}`;

    body.innerHTML = `
      <figure class="card-studio-preview">
        <img src="${dataUrl}" alt="${data.name}の結果カード" width="1080" height="1350" />
      </figure>
      <div class="card-studio-buttons">
        <button class="primary-button" type="button" data-card-share>${icon('share')}保存・シェア</button>
        <button class="ghost-button" type="button" data-card-redo>${icon('target')}作り直す</button>
      </div>
      <p class="card-studio-hint">${icon('check')}画像を長押し／右クリックでも保存できます。</p>
    `;

    const shareButton = body.querySelector('[data-card-share]');
    shareButton?.addEventListener('click', async () => {
      trackEvent(`${kind}_card_share`, shareMeta.track || {});
      const file = blob ? new File([blob], `${filename}.png`, { type: 'image/png' }) : null;
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: shareMeta.text, title: shareMeta.title });
          return;
        } catch (error) {
          if (error?.name === 'AbortError') return;
        }
      }
      const url = blob ? URL.createObjectURL(blob) : dataUrl;
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${filename}.png`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      if (blob) window.setTimeout(() => URL.revokeObjectURL(url), 4000);
    });

    body.querySelector('[data-card-redo]')?.addEventListener('click', () => {
      body.innerHTML = `<button class="primary-button" type="button" data-card-generate>${icon('share')}カード画像を作成</button>`;
      studio.dataset.cardBound = 'false';
      attachCardStudio(kind, data, shareMeta);
    });
  });
}

// 結果画面の主役を「シェア用と同じカード」にする。カードを自動生成して表示し、
// 横に見出し・キャッチ・アクションを並べる（キャラが空白に浮く従来レイアウトを廃止）。
function renderResultCardHero(kind, sideHtml) {
  return `
    <div class="result-card-hero">
      <figure class="result-card-figure" data-result-card="${kind}">
        <div class="result-card-loading">${icon('spark')}<span>カードを生成中...</span></div>
      </figure>
      <div class="result-card-side">
        ${sideHtml}
      </div>
    </div>
  `;
}

// SCAN REPORTカードを、結果画面のレーダーと同じ「1周スキャンで確定」演出
// 付きで生成する。演出の最中もfigure内には実物のcanvasが存在するため、
// 完了後にそのままシェア用画像として使い回せる。
function runSenseScanSweepCard(figure, data) {
  return new Promise((resolve) => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const W = 1080;
    const H = 1350;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    canvas.setAttribute('aria-hidden', 'true');
    figure.innerHTML = '';
    const status = document.createElement('p');
    status.className = 'result-card-scan-status';
    status.innerHTML = `<span class="result-card-scan-dot" aria-hidden="true"></span><span data-scan-status-text>SCANNING…</span>`;
    figure.append(status, canvas);

    const R = 230;
    const baseR = R * 0.07;
    const axes = Object.keys(senseLabels);
    const scores = data.scores || {};
    const points = axes.map((key, index) => ({
      key,
      angle: -90 + (index * 360) / axes.length,
      value: Math.max(6, scores[key] || 0),
      r: baseR,
      triggered: false,
      settled: false,
    }));
    const statusText = status.querySelector('[data-scan-status-text]');

    const finish = () => {
      drawSenseScanReport(data, { canvas });
      if (statusText) statusText.textContent = 'SCAN COMPLETE';
      resolve(canvas);
    };

    const runFade = () => {
      const FADE_MS = 260;
      let start = null;
      const frame = (ts) => {
        if (start === null) start = ts;
        const t = Math.min((ts - start) / FADE_MS, 1);
        points.forEach((p) => {
          p.triggered = t > 0;
          p.r = baseR + ((p.value / 100) * R - baseR) * t;
        });
        drawSenseScanReport(data, { canvas, revealState: { points } });
        if (t < 1) window.requestAnimationFrame(frame);
        else finish();
      };
      window.requestAnimationFrame(frame);
    };

    const runSweep = () => {
      const SWEEP_MS = 2200;
      const REVEAL_MS = 420;
      const easeOutBack = (t) => {
        const c1 = 1.7;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      };
      let start = null;
      const frame = (ts) => {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / SWEEP_MS, 1);
        const sweepDeg = -90 + progress * 360;
        points.forEach((p) => {
          if (!p.triggered && sweepDeg >= p.angle) {
            p.triggered = true;
            p.revealStart = ts;
          }
          if (p.triggered && !p.settled) {
            const rt = Math.min((ts - p.revealStart) / REVEAL_MS, 1);
            p.r = baseR + ((p.value / 100) * R - baseR) * easeOutBack(rt);
            if (rt >= 1) p.settled = true;
          }
        });
        drawSenseScanReport(data, { canvas, revealState: { points, sweepDeg: progress < 1 ? sweepDeg : undefined } });
        const stillTweening = points.some((p) => p.triggered && !p.settled);
        if (progress < 1 || stillTweening) window.requestAnimationFrame(frame);
        else finish();
      };
      window.requestAnimationFrame(frame);
    };

    // draw the collapsed starting frame immediately so there's no blank flash
    drawSenseScanReport(data, { canvas, revealState: { points } });

    if (reduced) {
      runFade();
      return;
    }
    // 「診断ログを解析中...」の演出が隠れている間に終わらないよう、
    // それが引っ込むタイミングまで開始を待つ。
    window.setTimeout(runSweep, RESULT_REVEAL_MS);
  });
}

async function attachResultCardHero(kind, data, shareMeta) {
  const figure = document.querySelector(`.result-card-figure[data-result-card="${kind}"]`);
  if (!figure || figure.dataset.cardBound === 'true') return;
  figure.dataset.cardBound = 'true';
  let canvas = null;
  try {
    canvas = kind === 'sense' ? await runSenseScanSweepCard(figure, data) : await drawResultCard(data);
  } catch (error) {
    canvas = null;
  }
  if (!canvas) {
    figure.innerHTML = `<div class="result-card-loading">${icon('target')}<span>カードを表示できませんでした</span></div>`;
    return;
  }
  const blob = await canvasToBlob(canvas);
  const dataUrl = canvas.toDataURL('image/png');
  const filename = `gamespeclab-${kind}-${(data.code || 'result').replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'card'}`;
  figure.innerHTML = `
    <img src="${dataUrl}" alt="${data.name}の結果カード" width="1080" height="1350" />
    ${kind === 'mbti' ? renderCharVariantToggle('is-card') : ''}
    <button class="primary-button result-card-save" type="button" data-card-save>${icon('share')}カードを保存・シェア</button>
    <p class="result-card-hint">${icon('check')}画像を長押し／右クリックでも保存できます。</p>
  `;
  figure.querySelector('[data-card-save]')?.addEventListener('click', async () => {
    trackEvent(`${kind}_card_share`, shareMeta.track || {});
    const file = blob ? new File([blob], `${filename}.png`, { type: 'image/png' }) : null;
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], text: shareMeta.text, title: shareMeta.title });
        return;
      } catch (error) {
        if (error?.name === 'AbortError') return;
      }
    }
    const url = blob ? URL.createObjectURL(blob) : dataUrl;
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${filename}.png`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    if (blob) window.setTimeout(() => URL.revokeObjectURL(url), 4000);
  });
}

function restoreResultScroll(selector, force = false) {
  const hasResultHash = /^#(?:result=|sense=|mbti=)/.test(location.hash);
  if (!force && !hasResultHash) return;
  const target = document.querySelector(selector);
  if (!target) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start' });
    });
  });
}

function setupAffiliateTracking() {
  document.querySelectorAll('[data-affiliate]').forEach((link) => {
    if (link.dataset.tracked === 'true') return;
    link.dataset.tracked = 'true';
    link.addEventListener('click', () => {
      trackEvent('affiliate_click', {
        id: link.dataset.affiliate,
        href: link.href,
        text: link.textContent.trim().replace(/\s+/g, ' '),
      });
    });
  });
}

function weightedValues(values = {}, weight = 1) {
  return Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value * weight]));
}

function scaleOptions(agreeValues, disagreeValues, neutralValues = {}) {
  return [
    { label: 'そう思う', detail: 'かなり自分に近い', scale: 2, traits: weightedValues(agreeValues, 4), mbti: weightedValues(agreeValues, 4) },
    { label: '少しそう思う', detail: 'どちらかといえば近い', scale: 1, traits: weightedValues(agreeValues, 2), mbti: weightedValues(agreeValues, 2) },
    { label: 'わからない', detail: '迷った時の中立回答', scale: 0, traits: neutralValues, mbti: neutralValues },
    { label: 'あまり思わない', detail: 'どちらかといえば違う', scale: -1, traits: weightedValues(disagreeValues, 2), mbti: weightedValues(disagreeValues, 2) },
    { label: '思わない', detail: 'あまり自分には当てはまらない', scale: -2, traits: weightedValues(disagreeValues, 4), mbti: weightedValues(disagreeValues, 4) },
  ];
}

const questions = [
  {
    title: '初対面の相手でも、通話しながら遊ぶほうが調子が出る。',
    axis: '通話温度',
    options: scaleOptions({ social: 2, support: 1 }, { chill: 2, macro: 1 }),
  },
  {
    title: '勝敗を意識できる相手と組むと、いつもより燃える。',
    axis: '勝負温度',
    options: scaleOptions({ competitive: 2, micro: 1 }, { chill: 2, social: 1 }),
  },
  {
    title: '迷った時は、まず自分が前に出て流れを作りたい。',
    axis: '突破力',
    options: scaleOptions({ micro: 2, competitive: 1 }, { support: 2, chill: 1 }),
  },
  {
    title: '遊ぶ前に、役割や作戦を軽く決めておくと安心する。',
    axis: '作戦共有',
    options: scaleOptions({ macro: 2, support: 1 }, { micro: 1, social: 1, chill: 1 }),
  },
  {
    title: 'カバー、回復、準備など、味方が動きやすい役を選びがちだ。',
    axis: '支援スタイル',
    options: scaleOptions({ support: 2, social: 1 }, { micro: 2, competitive: 1 }),
  },
  {
    title: '負けた後は、原因を整理して次の1戦に活かしたい。',
    axis: '振り返り',
    options: scaleOptions({ macro: 2, competitive: 1 }, { social: 2, chill: 1 }),
  },
  {
    title: '沈黙があっても気まずくない相手とは、長く遊べる。',
    axis: '距離感',
    options: scaleOptions({ chill: 2, social: 1 }, { competitive: 1, social: 1 }),
  },
  {
    title: 'ナイスやリアクションを返し合える相手だと、プレイが伸びる。',
    axis: '褒め合い',
    options: scaleOptions({ social: 2, micro: 1 }, { macro: 1, chill: 1 }),
  },
  {
    title: '短時間の対戦より、役割分担してじっくり協力するゲームが好きだ。',
    axis: '遊び方',
    options: scaleOptions({ support: 2, macro: 1, chill: 1 }, { competitive: 2, micro: 1 }),
  },
  {
    title: '新しいゲームでは、触る前に攻略や仕様を少し見ておきたい。',
    axis: '準備',
    options: scaleOptions({ macro: 2, competitive: 1 }, { social: 1, chill: 1, micro: 1 }),
  },
  {
    title: '相手に合わせて、自分の役割を変えるのはわりと得意だ。',
    axis: '適応力',
    options: scaleOptions({ support: 2, social: 1 }, { competitive: 2, micro: 1 }),
  },
  {
    title: '勝負どころでは、最後は自分が決めたいと思う。',
    axis: '決定力',
    options: scaleOptions({ micro: 2, competitive: 2 }, { support: 2, chill: 1 }),
  },
];

const profiles = [
  {
    id: 'clutch-ace',
    name: 'クラッチエース型',
    syncCode: 'PSTB',
    syncCodeLabel: '前に出て、黙々と勝ち筋を拾う勝負相棒',
    catchline: '勝負どころで空気を変える、頼れる突破口タイプ。',
    summary: '大事な場面で一歩前に出られる人です。勢いだけではなく、集中した瞬間に周りを引っ張る力があり、味方に「この人となら勝ち筋が見える」と思わせる魅力があります。',
    strengthNote: '瞬間判断、手元の精度、場を熱くする推進力が強み。見せ場を作れるので、チームの記憶に残りやすいタイプです。',
    growthNote: '熱量が高いぶん、試合後に一言だけ振り返るとさらに伸びます。良かった点を拾ってから次の改善を話すと、あなたの勝負強さがもっと伝わります。',
    syncSignal: '相手が「今のナイス」「次もいける」と短く返してくれるなら好相性。あなたの集中を止めずに、気持ちを上げてくれる相棒です。',
    hookPoint: '勝負どころで前に出る勇気と、決まった瞬間に場を一気に明るくする爆発力。見ている側までテンションが上がるところが沼ポイントです。',
    shineMoment: 'ラスト1v1、延長戦、味方が少し弱気になった場面。空気が止まりそうな瞬間に、あなたの一歩がチームの流れを変えます。',
    inviteTips: ['「短めに1、2戦だけやろう」と誘う', '勝敗よりナイスを拾えるモードから入る', '終わったら良かったプレイを1つ言う'],
    partner: '相性がいいのは「ナイス！」を惜しまない人。あなたの前に出る力を肯定しつつ、終わったあとに空気を整えてくれる相手だと、攻めと安心感のバランスが取れます。',
    chemistry: '初回は短めの対戦か、笑える協力ゲームを1本挟むと自然体が出やすいです。いきなりランクで実力を測るより、褒め合える場面を作るほうが距離が縮まります。',
    games: ['VALORANT', 'Apex Legends', 'THE FINALS', 'Overcooked! 2'],
    gameNotes: [
      ['VALORANT / Apex Legends', '短時間で見せ場が作りやすく、褒め合いのきっかけが増えます。'],
      ['THE FINALS', '撃ち合いだけでなく破壊や立ち回りでも盛り上がれるので、通話向きです。'],
      ['Overcooked! 2', '初回はガチ対戦より協力系を挟むと、熱量の差が出にくくなります。'],
    ],
    pc: '高FPS重視。144Hz以上のモニター、ミドル以上のGPU、軽いマウスを優先。',
    offer: 'おすすめ環境: ゲーミングPC、144Hz/240Hzモニター、マウス、マウスパッド。',
    risks: 'あなたの熱量は大きな魅力です。だからこそ、負けた直後は「次どうする？」の前に「今の惜しかったね」を挟むと、相手も安心して同じ温度でついてきやすくなります。',
    goodPartner: 'あなたの勝負どころを見逃さず、結果だけでなく挑戦した姿勢も褒められる人。短い言葉で気持ちを上げてくれる相手だと、あなたの強みが自然に出ます。',
    toughPartner: '丁寧に振り返りたい相手とは、ペースを先に合わせれば大丈夫。試合直後は軽く、落ち着いてから1つだけ改善点を話す形にすると、お互いの良さが残ります。',
    firstDuo: '最初はVALORANTのカジュアル、Apexのミックステープ、Overcooked! 2のような短め協力がおすすめ。短時間で成功体験を作るほど、あなたの明るい勝負強さが伝わります。',
    duoMemoTitle: 'テンポよく褒めて、すぐ次へ',
    duoMemos: ['良かった撃ち合いは短く拾う', '改善点は1つに絞る', '再戦前に軽い一言で空気を上げる'],
    pipoLine: 'ピポ計算では、ナイスを1回言うごとにチーム温度が2.8度上がります。たぶん。',
    shareLine: '勝負どころで輝くクラッチ型。褒め上手な相棒と組むと一気に伸びる。',
    traits: ['micro', 'competitive'],
  },
  {
    id: 'igl-romance',
    name: 'IGL連携参謀型',
    syncCode: 'PSTL',
    syncCodeLabel: '勝ちに向かって道筋を出す静かな司令塔',
    catchline: '勝ち筋を見つけて、チームを前に進める設計者タイプ。',
    summary: '全体を見て、状況を整理し、次の一手を考えられる人です。あなたの言葉はチームの迷いを減らす力があり、うまく噛み合う相手とは「一緒に考える時間」そのものが楽しくなります。',
    strengthNote: '盤面理解、準備、言語化が強み。目の前の勝敗だけでなく、次に活かせる経験へ変換できます。',
    growthNote: '情報量が多いときほど、結論から短く伝えると魅力が伝わります。作戦を押しつけるのではなく、選択肢を渡す形にすると頼もしさが増します。',
    syncSignal: '相手が「それ試そう」「こっちはこう見るね」と返してくれるなら好相性。作戦会議が会話の楽しさに変わる組み合わせです。',
    hookPoint: 'ただ勝ちたいだけではなく、勝ち筋を一緒に探す時間まで面白くできるところ。話しているうちに「この人と組むと賢くなれる」と感じさせます。',
    shineMoment: '作戦が刺さった瞬間、負け試合の原因が見えた瞬間、次の一手を短く共有できた瞬間。チームの迷いをほどく場面で輝きます。',
    inviteTips: ['「作戦試せるやつやろう」と誘う', '最初に今日の目標を1つだけ決める', '勝ったら分析より先にちゃんと喜ぶ'],
    partner: '相性がいいのは、提案を受け止めつつ自分の意見も返せる人。あなたが道筋を作り、相手が現場感を返してくれると、会話のキャッチボールがそのまま連携力になります。',
    chemistry: '最初は目的が分かりやすい協力ゲームや戦略ゲームが向いています。相談する余白があるゲームほど、あなたの「考える楽しさ」が自然に伝わります。',
    games: ['League of Legends', 'VALORANT', 'Baldur’s Gate 3', 'Monster Hunter: World'],
    gameNotes: [
      ['League of Legends / VALORANT', '作戦を短く共有するほど強みが出ます。反省会まで楽しめる相手向きです。'],
      ['Baldur’s Gate 3', '選択肢を相談しながら進められるので、会話の相性が見えやすいです。'],
      ['Monster Hunter', '役割や準備を話し合えるため、参謀タイプの良さが自然に伝わります。'],
    ],
    pc: '安定性重視。CPU、メモリ32GB、通話しやすいマイク環境を優先。',
    offer: 'おすすめ環境: BTO PC、CPU/メモリ、ゲーミングヘッドセット、マイク。',
    risks: 'あなたの分析力は安心感につながります。さらに「短く共有する」「勝ったらちゃんと喜ぶ」を足すと、知的な頼もしさと遊びの楽しさが両立します。',
    goodPartner: '提案を否定せず受け止め、自分の考えも返してくれる会話キャッチボール型。勝ち負けよりも、試行錯誤を一緒に面白がれる人が合います。',
    toughPartner: 'ノリ重視の相手とも、作戦を1つだけに絞れば噛み合います。全部を整えようとせず「今回はこれだけ試そう」にすると、相手の自由さも活きます。',
    firstDuo: 'Baldur’s Gate 3、Monster Hunter、VALORANTのアンレートなど、相談しながら進めるゲームが向いています。作戦が成功した瞬間を一緒に喜べるタイトルが特におすすめです。',
    duoMemoTitle: '作戦を短く共有すると噛み合う',
    duoMemos: ['結論を先に言う', '合わせるタイミングを言葉にする', '試した作戦は結果より過程を見る'],
    pipoLine: '作戦ログ、保存完了。長文作戦は圧縮して送ると、味方のCPU使用率にやさしいです。',
    shareLine: '盤面を読んで勝ち筋を作る参謀型。作戦会議まで楽しめる相棒と相性抜群。',
    traits: ['macro', 'competitive'],
  },
  {
    id: 'cozy-link',
    name: 'まったり通話リンク型',
    syncCode: 'CVFB',
    syncCodeLabel: '落ち着いた通話で空気をやわらげる相棒',
    catchline: '一緒にいる時間を心地よくする、空気づくりタイプ。',
    summary: '場をやわらかくして、相手が自然体でいられる時間を作れる人です。強い言葉で引っ張るより、気楽さや安心感で関係を続けるのが得意で、「また誘いたい」と思われやすい魅力があります。',
    strengthNote: '雑談力、受け止める空気、緊張をほどく力が強み。勝敗に関係なく、遊んだあとに気持ちが軽くなるタイプです。',
    growthNote: 'まったりした良さを大切にしつつ、最初に遊ぶ温度を共有するとさらに安定します。「今日はゆるめで」など一言あるだけで、相手も安心して合わせられます。',
    syncSignal: '相手が沈黙を急かさず、ちょっとしたハプニングを一緒に笑ってくれるなら好相性。会話の量より、空気の軽さが合図です。',
    hookPoint: '一緒にいるだけで緊張がゆるむところ。勝っても負けても空気を重くしないので、相手がまた誘いやすくなる安心感があります。',
    shineMoment: '初回通話のぎこちなさ、負け続きの空気、ちょっとした沈黙。そういう場面を自然に軽くできるところで輝きます。',
    inviteTips: ['「ゆるめに遊べるやつやろう」と誘う', '短時間で笑えるゲームを選ぶ', '沈黙を埋めようとしすぎない'],
    partner: '相性がいいのは、雑談と沈黙の両方を楽しめる人。気楽な通話がそのまま距離感の良さになり、長く遊ぶほど安心できる関係になりやすいです。',
    chemistry: '短時間で笑えるゲームや、のんびり建築できるゲームが向いています。うまさを見せるより、自然に会話が生まれるタイトルで魅力が伝わります。',
    games: ['Minecraft', 'Stardew Valley', 'PICO PARK', 'Party Animals'],
    gameNotes: [
      ['Minecraft / Stardew Valley', '作業しながら雑談できるので、沈黙も気まずくなりにくいです。'],
      ['PICO PARK', '短時間で笑いが起きやすく、初回通話の緊張をほぐせます。'],
      ['Party Animals', '勝ち負けよりハプニングで盛り上がれるため、ゆるい相性チェックに向きます。'],
    ],
    pc: '静音と快適性重視。白系デスク、静かなファン、軽めのGPUでも満足度が高い構成。',
    offer: 'おすすめ環境: 入門ゲーミングPC、デスク周り、チェア、ヘッドセット。',
    risks: 'あなたの穏やかさは大きな魅力です。相手が勝ちにいきたい日でも、最初に「今日はどのくらい本気で遊ぶ？」と聞けると、空気を守りながら楽しめます。',
    goodPartner: '沈黙も雑談も同じくらい気楽に楽しめて、勝敗より一緒にいる時間を大事にする人。あなたの安心感をちゃんと受け取れる相手です。',
    toughPartner: 'ランクや効率を大事にする相手とも、遊ぶ日を分けると相性が育ちます。今日はゆるく、次は少し本気で、という切り替えができれば十分噛み合います。',
    firstDuo: 'Minecraft、Stardew Valley、PICO PARKなど、話しながらゆるく遊べるタイトルがぴったり。最初は失敗しても笑えるゲームのほうが、あなたの空気づくりが光ります。',
    duoMemoTitle: '勝敗より空気の軽さを優先',
    duoMemos: ['最初に遊ぶ温度を合わせる', '雑談できるゲームを挟む', '面白い事故を拾って安心感に変える'],
    pipoLine: 'ゆるプレイモード起動。勝敗ログより笑いログの保存容量を多めに確保します。',
    shareLine: '勝敗より通話の空気を大事にする癒し型。気楽に誘える相棒と長続きしやすい。',
    traits: ['social', 'chill'],
  },
  {
    id: 'support-hype',
    name: '信頼サポート型',
    syncCode: 'CVTB',
    syncCodeLabel: '声かけと支援でチームを安定させる相棒',
    catchline: '気づいたら一緒に遊びたくなる、信頼づくりタイプ。',
    summary: '味方を活かすのが上手く、相手が動きやすい土台を自然に作れる人です。派手な見せ場だけでなく、細かいフォローや声かけで「この人といると安心する」と思わせる力があります。',
    strengthNote: '観察力、フォロー、相手の良さを引き出す力が強み。チームの安定感を底上げできる、かなり貴重なタイプです。',
    growthNote: '支える力が高いぶん、自分の希望も先に出せるとさらに健全です。「今日はこれ遊びたい」と言うことで、優しさが我慢ではなく魅力として伝わります。',
    syncSignal: '相手が「助かった」「今のありがたい」と返してくれるなら好相性。あなたの見えにくい貢献をちゃんと見てくれる人です。',
    hookPoint: '気づかれにくいところまで見てくれる安心感。派手に目立たなくても、遊び終わったあとに「また一緒にやりたい」と残るタイプです。',
    shineMoment: '味方が焦っている時、誰かがミスを引きずりそうな時、役割が噛み合った時。場を立て直す優しさで輝きます。',
    inviteTips: ['「協力系で役割交代しながらやろう」と誘う', '最初にやりたい役割も伝える', '助かった場面をお互いに言い合う'],
    partner: '相性がいいのは、ありがとうを言える人。あなたが支え、相手が安心して前に出る関係が強く、感謝が循環すると長く続きます。',
    chemistry: '役割分担がはっきりした協力ゲームで魅力が伝わります。カバー、準備、回復、声かけなど、あなたの細やかさが見える場面が多いほど相性チェックしやすいです。',
    games: ['Overwatch 2', 'Monster Hunter: World', 'It Takes Two', 'Deep Rock Galactic'],
    gameNotes: [
      ['Overwatch 2', 'カバーや回復など、支える上手さが伝わりやすいです。'],
      ['Monster Hunter / Deep Rock Galactic', '準備、救助、役割分担で自然に感謝が生まれます。'],
      ['It Takes Two', '会話しながら協力する場面が多く、距離を縮めやすいです。'],
    ],
    pc: 'ボイスチャットと画面共有重視。安定回線、マイク、2画面環境が満足度を上げます。',
    offer: 'おすすめ環境: マイク、ヘッドセット、サブモニター、Wi-Fi/回線比較。',
    risks: 'あなたの優しさは強みです。だからこそ、合わせるだけでなく「自分も楽しむ」選択を入れると、支える力がもっと長持ちします。',
    goodPartner: 'あなたのフォローに気づいて、ちゃんと「助かった」と返してくれる人。感謝を言葉にできる相手ほど、あなたの安心感がさらに輝きます。',
    toughPartner: '甘えるのが得意な相手とも、役割を交代できれば大丈夫。支える日と支えてもらう日を作ると、あなたの優しさが消耗ではなく信頼になります。',
    firstDuo: 'Overwatch 2、Monster Hunter、It Takes Twoなど、役割が見えやすい協力ゲームが向いています。最初から完璧に支えようとせず、交代しながら遊ぶと相性が見えやすいです。',
    duoMemoTitle: 'フォローに気づくほど伸びる',
    duoMemos: ['助かった場面をちゃんと言う', '役割を片方に寄せすぎない', 'あなたの遊びたいゲームも先に出す'],
    pipoLine: 'サポート検知。ありがとう信号を返すと、連携バッテリーが長持ちします。',
    shareLine: '味方を活かす信頼サポート型。ありがとうを言える相棒と組むと一番輝く。',
    traits: ['support', 'social'],
  },
  {
    id: 'builder-duo',
    name: '共創ビルダー型',
    syncCode: 'CSFL',
    syncCodeLabel: '落ち着いて遊びを組み立てる共創リーダー',
    catchline: '小さな進捗を楽しみに変える、共創パートナータイプ。',
    summary: '短期決戦より、少しずつ形にしていく遊びで魅力が深まる人です。作る、育てる、整える時間を楽しめるので、長く遊ぶほど「一緒に積み上げた思い出」が増えていきます。',
    strengthNote: '継続力、工夫、共同作業を楽しむ力が強み。目立つ一撃より、関係を長持ちさせる土台づくりが得意です。',
    growthNote: 'こだわりを言葉にすると、相手も参加しやすくなります。完成形を押しつけるより「ここ一緒に決めたい」と渡すと、共創感が強まります。',
    syncSignal: '相手が小さな進捗を一緒に喜んでくれるなら好相性。完成前の途中経過まで楽しめる人とは、長く遊べます。',
    hookPoint: '一緒に作ったものが思い出として残っていくところ。派手な一戦より、積み上げた時間でじわじわ好きになるタイプです。',
    shineMoment: '拠点が形になった時、素材集めが噛み合った時、昨日より少し便利になった時。小さな進捗を喜びに変える場面で輝きます。',
    inviteTips: ['「小さい目標だけ決めて進めよう」と誘う', '建築・探索・素材集めをゆるく分ける', '途中経過をスクショして共有する'],
    partner: '相性がいいのは、急かさず一緒に試行錯誤できる人。小さな達成を共有できる相手だと、遊ぶたびに関係が少しずつ深まります。',
    chemistry: '共同作業があるゲームで自然に会話が増えます。役割分担、素材集め、建築、育成など、話すきっかけが多いほどあなたの良さが出ます。',
    games: ['Palworld', 'Minecraft', 'Terraria', 'Satisfactory'],
    gameNotes: [
      ['Palworld / Minecraft', '拠点づくりや探索で、自然に役割分担が生まれます。'],
      ['Terraria', '小さな目標を積み重ねやすく、長く遊ぶほど仲が深まります。'],
      ['Satisfactory', '効率化や建築を一緒に考えられるので、共同作業の相性が見えます。'],
    ],
    pc: '長時間快適性重視。冷却、ストレージ、メモリ、座りやすいチェアを優先。',
    offer: 'おすすめ環境: SSD、メモリ、チェア、デスク、長時間向け周辺機器。',
    risks: 'あなたのこだわりは、世界観を豊かにする才能です。最初に役割をゆるく決めておくと、そのこだわりが相手にも伝わりやすくなります。',
    goodPartner: '急かさず、作業や育成の小さな進捗を一緒に喜べる人。完成だけでなく途中の変化を面白がれる相手がぴったりです。',
    toughPartner: '効率重視の相手とも、担当を分ければ良いチームになります。相手に最短ルートを任せ、あなたは拠点や育成を整えると、お互いの得意が活きます。',
    firstDuo: 'Palworld、Minecraft、Terraria、Satisfactoryなど、拠点づくりや育成があるゲームが相性良好。最初は小さな共同目標を作ると、自然に会話が増えます。',
    duoMemoTitle: '小さな進捗を一緒に積み上げる',
    duoMemos: ['今日の目標を小さく決める', '建築・探索・素材集めを分ける', '途中経過をスクショして一緒に喜ぶ'],
    pipoLine: '進捗を検出。完成までの道のりもスクリーンショット対象です。ピポ的には全部名場面。',
    shareLine: '一緒に積み上げるほど仲が深まる共創型。長く遊べる相棒とじわじわ強くなる。',
    traits: ['macro', 'chill'],
  },
  {
    id: 'voice-clutch',
    name: 'ボイスクラッチ型',
    syncCode: 'PVTL',
    syncCodeLabel: '声で流れを作り、勝ちに行くリーダー',
    catchline: '通話の温度で味方の集中を引き上げる、声かけエースタイプ。',
    summary: 'プレイの勢いと声の明るさを両方持っている人です。ナイス、ドンマイ、次いこうを自然に出せるので、勝負どころで味方の気持ちを前に向ける力があります。',
    strengthNote: '瞬間の判断力と、場を明るくする声かけが強み。あなたが反応すると、チーム全体のテンポも上がりやすいです。',
    growthNote: '盛り上げる力があるぶん、相手の集中したいタイミングでは少し短めにするとさらに伝わります。言葉を絞るほど、声の価値が上がります。',
    syncSignal: '相手があなたのリアクションに乗ってくれるなら好相性。笑いながらも勝負どころは締められる組み合わせです。',
    hookPoint: '一緒に遊んでいると、試合の熱量が自然に上がるところ。うまいだけでなく、通話の空気までゲームの一部にできるのが魅力です。',
    shineMoment: 'クラッチ直後、逆転のきっかけ、味方が少し落ち込んだ瞬間。あなたの一言で、次の試合へ向かう空気が戻ります。',
    inviteTips: ['「軽く声出しながらやろう」と誘う', '最初は短めの対戦でテンポを合わせる', '勝った場面はちゃんと一緒に喜ぶ'],
    partner: '相性がいいのは、リアクションを返してくれる人。あなたの声かけを受け止めて、楽しい熱量として返してくれる相手だと連携が伸びます。',
    chemistry: 'テンポの良い対戦ゲームや、笑いながらも見せ場があるタイトルで魅力が伝わります。沈黙よりも軽い掛け合いがあるほど自然体になれます。',
    games: ['Apex Legends', 'VALORANT', 'Overwatch 2', 'Party Animals'],
    gameNotes: [
      ['Apex Legends / VALORANT', '短い声かけと見せ場が噛み合うと、通話の熱量が上がります。'],
      ['Overwatch 2', '良いプレイを拾いやすく、味方を前向きにできます。'],
      ['Party Animals', '初回でも笑いが起きやすく、声の相性が見えやすいです。'],
    ],
    pc: '通話品質と反応速度重視。軽量マウス、低遅延ヘッドセット、聞き取りやすいマイクが合います。',
    offer: 'おすすめ環境: 軽量マウス、低遅延ヘッドセット、USBマイク。',
    risks: 'あなたの明るさは武器です。相手が静かに集中したい時は、声量よりタイミングを合わせると、楽しい空気を保ったまま信頼も増えます。',
    goodPartner: 'リアクションを返してくれて、良いプレイを一緒に喜べる人。軽い冗談と勝負の切り替えができる相手がぴったりです。',
    toughPartner: '静かに集中したい相手とは、最初に通話の温度を合わせれば大丈夫。報告は短く、試合後に盛り上がる形にすると噛み合います。',
    firstDuo: 'Apexのミックステープ、VALORANTのアンレート、Party Animalsなど、短時間で声の相性が見えるゲームがおすすめです。',
    duoMemoTitle: '声で流れを作り、短く締める',
    duoMemos: ['ナイスは惜しまない', '報告は短くする', '相手の集中タイミングを尊重する'],
    pipoLine: '音声ログ良好。ナイス信号が多いほど、チームの再戦ボタンが押されやすくなります。',
    shareLine: '声かけで流れを作るボイスクラッチ型。リアクションが返ってくる相棒と相性抜群。',
    traits: ['micro', 'social'],
  },
  {
    id: 'guard-anchor',
    name: 'ガードアンカー型',
    syncCode: 'CSTB',
    syncCodeLabel: '静かに支えて勝負を安定させる守護相棒',
    catchline: '前に出る味方を支える、安心感のある守護役タイプ。',
    summary: '細かい操作や状況への反応を、味方のカバーに使える人です。自分が目立つより、相手が思い切って動ける土台を作ることで強みが出ます。',
    strengthNote: 'カバー、フォロー、手元の安定感が強み。危ない場面でそっと支えられるので、組んだ相手が挑戦しやすくなります。',
    growthNote: '支える力があるぶん、遠慮しすぎず自分の見せ場も作れるとさらに魅力が出ます。「次は自分が行くね」と言えるとバランスが良くなります。',
    syncSignal: '相手があなたのカバーに気づいて「助かった」と返してくれるなら好相性。見えにくい貢献を大事にしてくれる人です。',
    hookPoint: '一緒にいると安心して攻められるところ。派手な主役ではなくても、気づくとチームに欠かせない存在になっています。',
    shineMoment: '味方のエントリー、救助、カバー、リカバリー。失敗しそうな流れを、あなたの安定感で立て直せます。',
    inviteTips: ['「役割分けてやってみよう」と誘う', '支えるだけでなく自分のやりたい役も出す', '助かった場面を言葉にしてもらう'],
    partner: '相性がいいのは、前に出る力がありつつ感謝も言える人。あなたの支えを当たり前にせず、大事にしてくれる相手だと長続きします。',
    chemistry: '役割が見える協力ゲームやチーム対戦で魅力が伝わります。守る、助ける、合わせる場面が多いほど相性が見えます。',
    games: ['Overwatch 2', 'Monster Hunter: World', 'Apex Legends', 'Deep Rock Galactic'],
    gameNotes: [
      ['Overwatch 2', 'カバーやサポートの上手さが結果に出やすいです。'],
      ['Monster Hunter', '救助や準備で信頼感が積み上がります。'],
      ['Apex Legends', '前に出る味方を安全に支えられると強みが伝わります。'],
    ],
    pc: '安定した通話と入力環境重視。低遅延ヘッドセット、サブモニター、疲れにくいデバイスが合います。',
    offer: 'おすすめ環境: 低遅延ヘッドセット、サブモニター、軽量マウス。',
    risks: 'あなたの支える力は大きな魅力です。合わせすぎて疲れる前に、自分の希望も1つ出すと、優しさがもっと長持ちします。',
    goodPartner: '前に出るけれど、支えてくれる人への感謝を忘れない人。お互いの役割を褒め合える相手が合います。',
    toughPartner: '全部任せてくる相手とは、役割を交代する日を作ると健全です。あなたが支えられる側になる時間も大切です。',
    firstDuo: 'Overwatch 2やMonster Hunterなど、役割分担が自然に生まれるゲームがおすすめ。最初から完璧に支えようとしなくて大丈夫です。',
    duoMemoTitle: '支える力を、我慢にしない',
    duoMemos: ['助かった場面を共有する', '自分のやりたい役割も伝える', '支える日と攻める日を分ける'],
    pipoLine: '防御ログ安定。あなたのカバー範囲、味方の安心エリアとして登録しました。',
    shareLine: '味方が思い切れる土台を作るガードアンカー型。感謝を返せる相棒と強くなる。',
    traits: ['micro', 'support'],
  },
  {
    id: 'relax-aimer',
    name: 'ゆるエイム職人型',
    syncCode: 'PSFB',
    syncCodeLabel: '自然体で見せ場を作るマイペース相棒',
    catchline: '力まず上手い、自然体で見せ場を作るマイペースタイプ。',
    summary: 'ガチガチに気合を入れなくても、手元の感覚で良いプレイを出せる人です。勝負への熱量を押しつけず、軽い空気の中でさらっと上手さが出ます。',
    strengthNote: '自然体の操作感、気楽さ、短い集中が強み。相手にプレッシャーを与えず、遊びやすい雰囲気を作れます。',
    growthNote: 'ゆるさが魅力のぶん、勝ちたい日は最初に温度を少しだけ共有すると安定します。「今日はちょい本気」くらいで十分です。',
    syncSignal: '相手があなたのマイペースさを急かさず楽しんでくれるなら好相性。沈黙やゆるい会話も心地よく続きます。',
    hookPoint: '頑張りすぎていないのに、ふとした瞬間に上手いところ。気楽なのに頼れるギャップが魅力です。',
    shineMoment: 'カジュアルな対戦、短時間の練習、雑談しながらのプレイ。肩の力が抜けている時ほど良い動きが出ます。',
    inviteTips: ['「ゆるく撃ち合い練習しよ」と誘う', '短時間で終われるモードを選ぶ', '勝ち負けより良いプレイを拾う'],
    partner: '相性がいいのは、急かさず一緒に遊べる人。あなたの自然体をそのまま受け止めてくれる相手だと、上手さも楽しさも出やすいです。',
    chemistry: '短時間で遊べるFPSや、気楽なパーティーゲームが向いています。最初から重くしない方が魅力が伝わります。',
    games: ['Apex Legends', 'THE FINALS', 'Party Animals', 'PICO PARK'],
    gameNotes: [
      ['Apex Legends / THE FINALS', '短い見せ場が作りやすく、力まず遊べます。'],
      ['Party Animals', '勝敗が重くなりにくく、自然体の通話に向きます。'],
      ['PICO PARK', '失敗しても笑えるので、初回の緊張がほどけます。'],
    ],
    pc: '軽さと快適性重視。軽量マウス、静音キーボード、疲れにくい椅子が合います。',
    offer: 'おすすめ環境: 軽量マウス、静音キーボード、チェア。',
    risks: 'あなたの気楽さは魅力です。相手が本気の日は、最初に目標を1つだけ合わせると、ゆるさと勝ちたい気持ちが両立します。',
    goodPartner: '気楽に誘えて、短時間でも満足できる人。無理に盛り上げなくても一緒にいられる相手が合います。',
    toughPartner: '常にランク効率を求める相手とは、遊ぶモードを分けると楽です。練習日とゆる日を作ると噛み合います。',
    firstDuo: 'Apexのミックステープ、THE FINALS、Party Animalsなど、短く遊べて笑えるタイトルがおすすめです。',
    duoMemoTitle: '自然体の上手さを大事にする',
    duoMemos: ['短時間で始める', '良いプレイを軽く拾う', '本気度は最初に合わせる'],
    pipoLine: 'ゆるさ検知。肩の力を抜くと命中率が上がる説、ピポはわりと信じています。',
    shareLine: '気楽なのに見せ場を作るゆるエイム職人型。急かさない相棒と相性良好。',
    traits: ['micro', 'chill'],
  },
  {
    id: 'strategy-support',
    name: '作戦サポート型',
    syncCode: 'CSTL',
    syncCodeLabel: '落ち着いて作戦と支援をつなぐ裏方リーダー',
    catchline: '考える力で味方を動きやすくする、裏方リーダータイプ。',
    summary: '全体を見ながら、味方が迷わないように道筋を作れる人です。強く指示するより、必要な情報をそっと渡してチームを整えるのが得意です。',
    strengthNote: '整理力、準備、役割設計が強み。チームの動きがバラけそうな時に、自然と方向を合わせられます。',
    growthNote: '相手を助けたい気持ちが強いぶん、説明が長くなることがあります。結論を先に一言で出すと、あなたの頼もしさが伝わりやすくなります。',
    syncSignal: '相手が「それでいこう」と返してくれるなら好相性。あなたの整理を信頼して、動きに変えてくれる人です。',
    hookPoint: '一緒に遊ぶほど、判断が楽になるところ。派手ではなくても、チームの迷いを減らす知的な安心感があります。',
    shineMoment: '作戦を決める前、役割が曖昧な時、負け筋を減らしたい時。あなたの整理力でチームが動き出せます。',
    inviteTips: ['「役割だけ決めて試そう」と誘う', '作戦は1つだけに絞る', '成功したらまず喜ぶ'],
    partner: '相性がいいのは、提案を試してくれる人。あなたの準備や整理を受け取り、自分の動きで返してくれる相手だと強いです。',
    chemistry: '協力ゲームや戦略性のある対戦で魅力が出ます。相談する余白があるほど、あなたの支える作戦力が伝わります。',
    games: ['League of Legends', 'VALORANT', 'Monster Hunter: World', 'Baldur’s Gate 3'],
    gameNotes: [
      ['League of Legends / VALORANT', '短い作戦共有が勝ち筋につながりやすいです。'],
      ['Monster Hunter', '準備と役割分担で頼もしさが伝わります。'],
      ['Baldur’s Gate 3', '相談しながら進める相性が見えやすいです。'],
    ],
    pc: '情報整理と通話重視。サブモニター、マイク、安定回線が合います。',
    offer: 'おすすめ環境: サブモニター、マイク、安定回線。',
    risks: 'あなたの整理力はチームを助けます。全部を背負わず、相手にも考える余白を渡すと、連携がもっと楽しくなります。',
    goodPartner: '提案を試してくれて、自分の意見も返してくれる人。会話のキャッチボールができる相手が合います。',
    toughPartner: '完全にノリで動きたい相手とは、作戦を短くするのがコツです。「今回はこれだけ」で十分噛み合います。',
    firstDuo: 'VALORANTのアンレート、Monster Hunter、Baldur’s Gate 3など、相談する余白があるゲームがおすすめです。',
    duoMemoTitle: '作戦は短く、成功は大きく喜ぶ',
    duoMemos: ['結論を先に言う', '役割を1つだけ決める', '勝ったら分析より先に喜ぶ'],
    pipoLine: '作戦パケット送信。長文を短文に圧縮すると、味方の受信速度が上がります。',
    shareLine: '味方が動きやすい道筋を作る作戦サポート型。提案を試せる相棒と伸びる。',
    traits: ['macro', 'support'],
  },
  {
    id: 'talk-strategist',
    name: '雑談ストラテジスト型',
    syncCode: 'CVTL',
    syncCodeLabel: '会話しながら勝ち筋を整える作戦トーカー',
    catchline: '会話しながら勝ち筋を整える、作戦トークタイプ。',
    summary: '作戦を考える力と、会話をつなぐ力の両方を持つ人です。分析だけで固くならず、雑談の中で自然に次の一手を共有できます。',
    strengthNote: '言語化、相談、空気づくりが強み。反省会や作戦会議を重くせず、話しているうちに前向きな改善へ持っていけます。',
    growthNote: '話せることが多いぶん、試合中は短く、試合後に深く話すとさらに噛み合います。時間帯で会話の深さを切り替えるのがコツです。',
    syncSignal: '相手が作戦にも雑談にも乗ってくれるなら好相性。真面目な話と軽い会話の行き来が自然にできます。',
    hookPoint: '一緒に考える時間そのものが楽しくなるところ。勝ち負けだけで終わらず、話すほど次も遊びたくなります。',
    shineMoment: '負けた後の空気、作戦を試す前、次のゲームを決める時。会話で前向きな流れを作れます。',
    inviteTips: ['「話しながら作戦試そう」と誘う', '試合中は短く、終わってから深掘りする', '雑談できる協力ゲームも挟む'],
    partner: '相性がいいのは、話しながら考えるのが好きな人。あなたの分析を会話として楽しめる相手だと、長く続きます。',
    chemistry: '戦略性がありつつ会話の余白もあるゲームが向いています。作戦と雑談が両方成立するほど魅力が出ます。',
    games: ['Baldur’s Gate 3', 'League of Legends', 'Minecraft', 'VALORANT'],
    gameNotes: [
      ['Baldur’s Gate 3', '相談と雑談の両方が自然に生まれます。'],
      ['League of Legends / VALORANT', '作戦を短く共有できると強みが出ます。'],
      ['Minecraft', '作業しながら話せるので、関係が続きやすいです。'],
    ],
    pc: '通話と情報表示重視。マイク、サブモニター、静音キーボードが合います。',
    offer: 'おすすめ環境: マイク、サブモニター、静音キーボード。',
    risks: 'あなたの会話力は魅力です。相手がプレイに集中している時は、作戦を一言に絞ると、話しやすさと頼もしさが両立します。',
    goodPartner: '真面目な話も軽い話もできる人。反省会を責め合いではなく、次の楽しみに変えられる相手が合います。',
    toughPartner: '無言集中タイプとは、試合中と試合後で話す量を分けると噛み合います。話す時間を作れば十分相性は育ちます。',
    firstDuo: 'Baldur’s Gate 3、Minecraft、VALORANTのアンレートなど、会話しながら進められるゲームがおすすめです。',
    duoMemoTitle: '話す深さを場面で切り替える',
    duoMemos: ['試合中は短くする', '終わってから深掘りする', '雑談できるゲームを挟む'],
    pipoLine: '会話ログ良好。作戦と雑談の混合パケット、かなり人間らしくてピポ好きです。',
    shareLine: '作戦会議を楽しい会話に変える雑談ストラテジスト型。話しながら伸びる相棒と好相性。',
    traits: ['macro', 'social'],
  },
  {
    id: 'rival-booster',
    name: 'ライバルブースター型',
    syncCode: 'PVTB',
    syncCodeLabel: '熱量を声に出して一緒に伸びる勝負相棒',
    catchline: '競い合うほど相手も自分も伸ばす、熱量共有タイプ。',
    summary: '勝ちたい気持ちを、相手を置いていく力ではなく、一緒に伸びる力に変えられる人です。お互いに刺激し合える相手と組むほど、プレイの熱量が上がります。',
    strengthNote: '向上心、励まし、勝負どころの熱量が強み。相手の挑戦心にも火をつけられます。',
    growthNote: '熱量が高いぶん、相手のペースを見るとさらに強くなります。勝ちたい気持ちを「一緒に上がろう」に変えると魅力が増します。',
    syncSignal: '相手が「もう一回」「次こそ勝とう」と返してくれるなら好相性。同じ方向に熱くなれる相手です。',
    hookPoint: '一緒にいるとやる気が出るところ。負けても終わりではなく、次の挑戦に変えられる前向きな熱があります。',
    shineMoment: 'ランクの連戦、惜敗の直後、目標を決めた練習。相手のやる気を落とさず、次へ進む力があります。',
    inviteTips: ['「目標1つ決めて回そう」と誘う', '勝てた理由を一緒に拾う', '負けた時は改善を1つだけにする'],
    partner: '相性がいいのは、挑戦を楽しめる人。勝ちたい気持ちを共有しつつ、お互いを責めずに伸ばせる相手が合います。',
    chemistry: 'ランクや練習モードなど、成長が見えるゲームで魅力が出ます。目標を共有するほど関係が熱くなります。',
    games: ['VALORANT', 'Apex Legends', 'Street Fighter 6', 'Rocket League'],
    gameNotes: [
      ['VALORANT / Apex Legends', '目標を決めて回すと、熱量が良い方向に出ます。'],
      ['Street Fighter 6', '対戦と振り返りが短く回せて、成長を感じやすいです。'],
      ['Rocket League', '連戦しながら改善が見えやすいです。'],
    ],
    pc: '練習効率と反応重視。高Hzモニター、軽量マウス、録画しやすい環境が合います。',
    offer: 'おすすめ環境: 高Hzモニター、軽量マウス、録画環境。',
    risks: 'あなたの熱量は人を伸ばす力があります。相手が疲れている時は、勝つ話より良かった場面を拾うと、また一緒に挑戦しやすくなります。',
    goodPartner: '勝ちたい気持ちを共有できて、負けても次に向けられる人。挑戦を楽しめる相手がぴったりです。',
    toughPartner: 'まったり遊びたい相手とは、ランク日とゆる日を分けると良いです。熱量を出す場所を決めれば長続きします。',
    firstDuo: 'VALORANTのアンレート、Apexのミックステープ、Street Fighter 6のラウンジなど、短く改善できるゲームがおすすめです。',
    duoMemoTitle: '勝ちたい気持ちを共有する',
    duoMemos: ['目標は1つにする', '良かった点も拾う', '疲れたらゆるいモードへ移る'],
    pipoLine: '熱量ゲージ上昇中。燃えすぎ防止に、ナイス冷却ファンも回しておきます。',
    shareLine: '競い合うほど伸びるライバルブースター型。同じ熱量の相棒と強くなる。',
    traits: ['competitive', 'support'],
  },
  {
    id: 'soft-rival',
    name: 'ゆる勝負メイト型',
    syncCode: 'PVFB',
    syncCodeLabel: '楽しく声を出しながらほどよく勝ちたい相棒',
    catchline: '勝ちたい気持ちを軽やかに楽しむ、ほどよい競争タイプ。',
    summary: '勝負は好きだけれど、空気を重くしすぎないバランス感覚があります。ガチすぎず、でもちゃんと上手くなりたい相手と組むと心地よく続きます。',
    strengthNote: 'ほどよい向上心、切り替え、遊びやすさが強み。勝ち負けを楽しみながら、相手を疲れさせにくいタイプです。',
    growthNote: '軽やかさが魅力のぶん、本気で勝ちたい日は先に目標を共有するとさらに安定します。ゆるさと成長を両方持てます。',
    syncSignal: '相手が「悔しいけど楽しい」と返してくれるなら好相性。勝負と笑いのバランスが近い相手です。',
    hookPoint: '負けても空気が壊れにくいところ。勝ちたい気持ちを持ちながら、また誘いやすい軽さがあります。',
    shineMoment: 'カジュアル対戦、短時間ランク、友だちとの練習。少し悔しいくらいの温度で一番魅力が出ます。',
    inviteTips: ['「軽く勝ちにいく感じでやろう」と誘う', '負けても笑えるモードを混ぜる', '最後に良かった場面を1つ言う'],
    partner: '相性がいいのは、勝負を楽しめるけれど怒りすぎない人。悔しさを次の遊びに変えられる相手が合います。',
    chemistry: '短めの対戦や、パーティー感のある勝負ゲームで魅力が伝わります。重すぎない競争が続くほど相性が見えます。',
    games: ['Rocket League', 'THE FINALS', 'Overcooked! 2', 'Party Animals'],
    gameNotes: [
      ['Rocket League / THE FINALS', '短い試合で勝負感と笑いを両立しやすいです。'],
      ['Overcooked! 2', '失敗しても笑いやすく、ほどよい熱量で遊べます。'],
      ['Party Animals', '勝負しつつ空気が重くなりにくいです。'],
    ],
    pc: '快適性とテンポ重視。高リフレッシュモニター、軽いヘッドセット、静音デバイスが合います。',
    offer: 'おすすめ環境: 高リフレッシュモニター、軽いヘッドセット、静音デバイス。',
    risks: 'あなたの軽やかさは魅力です。相手が本気の日には、少しだけ目標を合わせると、楽しさを残したまま勝負できます。',
    goodPartner: '悔しさを笑いに変えられて、次も誘いやすい人。ほどよい競争を楽しめる相手がぴったりです。',
    toughPartner: '超ガチ勢とは、遊ぶモードを決めておくと楽です。全部をランク基準にしなければ十分噛み合います。',
    firstDuo: 'Rocket League、THE FINALS、Overcooked! 2など、短く勝負できて笑えるゲームがおすすめです。',
    duoMemoTitle: '勝負と笑いを同じくらい大事にする',
    duoMemos: ['本気度を先に合わせる', '負けても軽く切り替える', '最後は良かった場面で終わる'],
    pipoLine: '勝負温度、ちょうどよし。熱すぎず冷たすぎず、ピポの適温ランプが点灯しました。',
    shareLine: 'ほどよく勝ちたいゆる勝負メイト型。悔しさも笑える相棒と長続き。',
    traits: ['competitive', 'chill'],
  },
];

const syncCodeDefinitions = {
  P: ['Push', '前に出て流れを動かす'],
  C: ['Calm', '落ち着いて場を整える'],
  V: ['Voice', '通話やリアクションで連携する'],
  S: ['Silent', '無言でも空気を読んで合わせる'],
  T: ['Tryhard', '勝ち筋や上達を大事にする'],
  F: ['Fun', '楽しさや空気の軽さを大事にする'],
  L: ['Lead', '作戦や進行を出す'],
  B: ['Buddy', '横で並走して支える'],
};

profiles.forEach((profile) => {
  profile.syncCode ||= 'CSFB';
  profile.syncCodeLabel ||= '落ち着いて一緒に遊べる相棒タイプ';
  profile.syncCodeAxes = [...profile.syncCode].map((letter) => {
    const [word, body] = syncCodeDefinitions[letter] || [letter, 'ゲーム中の相性傾向'];
    return { letter, word, body };
  });
});

const senseQuestions = [
  {
    title: '初見マップで最初に見るものは？',
    options: [
      { label: '敵味方の位置と危険エリア', detail: 'まず今の戦況を整理する', sense: { awareness: 3, resource: 1 } },
      { label: 'このあと敵が来そうなルート', detail: '次に起きる展開を読む', sense: { prediction: 3, awareness: 1 } },
      { label: '高低差、射線、逃げ道', detail: '空間の形から動き方を決める', sense: { spatial: 3, awareness: 1 } },
    ],
  },
  {
    title: '負けた直後に一番気になるのは？',
    options: [
      { label: 'どの情報を見落としたか', detail: '視野と報告を見直したい', sense: { awareness: 3, adaptation: 1 } },
      { label: '相手の癖や勝ちパターン', detail: '同じ展開を次は読めるようにする', sense: { pattern: 3, mindgame: 1 } },
      { label: 'スキルや物資を使うタイミング', detail: '残し方と使い方を改善したい', sense: { resource: 3, prediction: 1 } },
    ],
  },
  {
    title: '急に敵と出会った瞬間、近い反応は？',
    options: [
      { label: '先に手が動く', detail: '迷う前に撃つ、避ける、詰める', sense: { speed: 3, spatial: 1 } },
      { label: '遮蔽や逃げ道へ体が向く', detail: '立ち位置を整えてから勝負する', sense: { spatial: 3, speed: 1 } },
      { label: '相手が何を狙っているか見る', detail: 'フェイントや意図を読む', sense: { mindgame: 3, awareness: 1 } },
    ],
  },
  {
    title: '新しいゲームで伸びるきっかけは？',
    options: [
      { label: '上手い人の動きを真似する', detail: '良い型を吸収して更新する', sense: { adaptation: 3, pattern: 1 } },
      { label: '仕様や数値を調べる', detail: '仕組みから強い行動を探す', sense: { resource: 2, pattern: 2 } },
      { label: '何度も試して感覚を作る', detail: '体験から反応を速くする', sense: { speed: 2, adaptation: 2 } },
    ],
  },
  {
    title: 'チーム戦で自然にやりがちなことは？',
    options: [
      { label: '全体の人数差や位置を数える', detail: '今の有利不利を把握する', sense: { awareness: 3, resource: 1 } },
      { label: '次の当たり方を提案する', detail: '未来の勝ち筋を作る', sense: { prediction: 3, resource: 1 } },
      { label: '相手が嫌がる動きを考える', detail: '心理的に選択肢を狭める', sense: { mindgame: 3, prediction: 1 } },
    ],
  },
  {
    title: '強い敵と当たった時に見るポイントは？',
    options: [
      { label: '毎回似ている行動', detail: '癖や型を探す', sense: { pattern: 3, adaptation: 1 } },
      { label: '強気になるタイミング', detail: '心の動きと勝負所を読む', sense: { mindgame: 3, pattern: 1 } },
      { label: 'こちらの資源が足りるか', detail: 'スキル、弾、回復、時間を管理する', sense: { resource: 3, awareness: 1 } },
    ],
  },
  {
    title: '迷いやすい場面で頼りにするものは？',
    options: [
      { label: '画面上の情報量', detail: '見えている事実を集める', sense: { awareness: 3, pattern: 1 } },
      { label: '過去に似た場面の記憶', detail: '経験パターンから決める', sense: { pattern: 3, speed: 1 } },
      { label: '相手なら何を選ぶか', detail: '相手の意図から逆算する', sense: { mindgame: 3, prediction: 1 } },
    ],
  },
  {
    title: 'あなたが気持ちよく勝てる展開は？',
    options: [
      { label: '先回りが刺さる', detail: '来る場所に先にいる', sense: { prediction: 3, awareness: 1 } },
      { label: '瞬間判断で切り返す', detail: '一瞬の判断で勝負を決める', sense: { speed: 3, mindgame: 1 } },
      { label: '地形を使って有利を作る', detail: '位置取りで戦いやすくする', sense: { spatial: 3, resource: 1 } },
    ],
  },
  {
    title: '練習するときのクセは？',
    options: [
      { label: '同じ場面を反復する', detail: '弱点を小さく分解して直す', sense: { adaptation: 3, speed: 1 } },
      { label: 'なぜ負けたか言語化する', detail: '原因を理解して次に活かす', sense: { adaptation: 2, awareness: 2 } },
      { label: '強いテンプレを探す', detail: '勝ちパターンを先に覚える', sense: { pattern: 3, resource: 1 } },
    ],
  },
  {
    title: 'マップ移動中に考えていることは？',
    options: [
      { label: '次の接敵地点', detail: 'どこでぶつかるか予測する', sense: { prediction: 3, spatial: 1 } },
      { label: '射線と遮蔽のつながり', detail: '安全な角度を探す', sense: { spatial: 3, awareness: 1 } },
      { label: '時間や物資の残り', detail: '終盤に足りるように動く', sense: { resource: 3, prediction: 1 } },
    ],
  },
  {
    title: '味方に褒められやすいのは？',
    options: [
      { label: '報告がわかりやすい', detail: '必要な情報を拾って渡せる', sense: { awareness: 3, resource: 1 } },
      { label: '詰める判断が速い', detail: 'チャンスを逃さず動ける', sense: { speed: 3, prediction: 1 } },
      { label: '相手の裏をかくのがうまい', detail: '読み合いで選択肢をずらせる', sense: { mindgame: 3, pattern: 1 } },
    ],
  },
  {
    title: '攻略情報を見るときに重視するのは？',
    options: [
      { label: 'なぜその行動が強いか', detail: '原理がわかると応用できる', sense: { pattern: 3, adaptation: 1 } },
      { label: 'いつ使うべきか', detail: 'タイミングと条件を知りたい', sense: { prediction: 2, resource: 2 } },
      { label: '自分の操作に落とし込めるか', detail: 'すぐ試して調整したい', sense: { adaptation: 3, speed: 1 } },
    ],
  },
  {
    title: '終盤戦で強く意識するのは？',
    options: [
      { label: '残り人数と位置', detail: '情報を整理して事故を減らす', sense: { awareness: 3, prediction: 1 } },
      { label: '相手が焦る瞬間', detail: 'プレッシャーで選択を誘導する', sense: { mindgame: 3, speed: 1 } },
      { label: '使える資源を残すこと', detail: '最後に勝ち筋を残す', sense: { resource: 3, prediction: 1 } },
    ],
  },
  {
    title: '3DアクションやFPSで得意なのは？',
    options: [
      { label: '敵との距離感をつかむ', detail: '近い、遠い、詰められるを判断する', sense: { spatial: 3, awareness: 1 } },
      { label: '見えた瞬間に反応する', detail: '判断までのラグが少ない', sense: { speed: 3, spatial: 1 } },
      { label: '相手の待ち方を読む', detail: '角待ちやフェイントを疑える', sense: { mindgame: 2, prediction: 2 } },
    ],
  },
  {
    title: 'ランクで停滞したときは？',
    options: [
      { label: 'プレイを見返して原因を探す', detail: '改善点を特定する', sense: { adaptation: 3, awareness: 1 } },
      { label: '環境やメタを調べる', detail: '今強い型へ合わせる', sense: { pattern: 2, adaptation: 2 } },
      { label: '得意な勝ち筋に寄せる', detail: '資源を集中して勝率を上げる', sense: { resource: 3, pattern: 1 } },
    ],
  },
  {
    title: '敵の動きで一番気づきやすいのは？',
    options: [
      { label: '人数の寄り方', detail: 'どこに圧が集まるか見える', sense: { awareness: 3, prediction: 1 } },
      { label: '繰り返す癖', detail: '同じ行動を見逃しにくい', sense: { pattern: 3, mindgame: 1 } },
      { label: '迷いや焦り', detail: '判断が揺れる瞬間が見える', sense: { mindgame: 3, awareness: 1 } },
    ],
  },
  {
    title: '限られたアイテムを使うタイミングは？',
    options: [
      { label: '今使えば勝てるなら使う', detail: 'チャンスを逃さない', sense: { speed: 2, resource: 2 } },
      { label: '終盤のために残す', detail: '最後の勝ち筋を守る', sense: { resource: 3, prediction: 1 } },
      { label: '相手に使わせてから動く', detail: '相手の資源を吐かせる', sense: { mindgame: 2, resource: 2 } },
    ],
  },
  {
    title: '味方が混乱しているときは？',
    options: [
      { label: '今わかっていることを整理する', detail: '状況を言葉にする', sense: { awareness: 3, resource: 1 } },
      { label: '次の行動を1つに絞る', detail: '迷いを減らして動き出す', sense: { prediction: 2, speed: 2 } },
      { label: '立ち位置を変えて支える', detail: '空間的にカバーする', sense: { spatial: 2, resource: 2 } },
    ],
  },
  {
    title: 'あなたの「上手くなった感」はどこで出る？',
    options: [
      { label: '見える情報が増えたとき', detail: '前より戦況を拾える', sense: { awareness: 2, adaptation: 2 } },
      { label: '同じミスをしなくなったとき', detail: '学習が行動に反映される', sense: { adaptation: 3, pattern: 1 } },
      { label: '判断が速くなったとき', detail: '迷う時間が短くなる', sense: { speed: 3, adaptation: 1 } },
    ],
  },
  {
    title: '相手の裏をかくなら？',
    options: [
      { label: 'いつもの動きを一度見せて変える', detail: '期待を作って外す', sense: { mindgame: 3, pattern: 1 } },
      { label: '相手が来る前に位置を変える', detail: '予測で先にずらす', sense: { prediction: 3, spatial: 1 } },
      { label: '資源を温存して最後に使う', detail: '相手の計算を崩す', sense: { resource: 2, mindgame: 2 } },
    ],
  },
  {
    title: 'マップを覚えるときの方法は？',
    options: [
      { label: '実際に歩いて距離感を覚える', detail: '体感で空間をつかむ', sense: { spatial: 3, adaptation: 1 } },
      { label: '強ポジや定番ルートを覚える', detail: 'パターンとして整理する', sense: { pattern: 3, spatial: 1 } },
      { label: '敵の出方から逆算する', detail: 'よく起きる展開で覚える', sense: { prediction: 2, awareness: 2 } },
    ],
  },
  {
    title: '大会や配信を見ているときは？',
    options: [
      { label: '選手の判断の速さに目が行く', detail: '反応と決断の質を見る', sense: { speed: 3, pattern: 1 } },
      { label: '作戦やローテーションを見る', detail: '勝ち筋の流れを追う', sense: { prediction: 2, resource: 2 } },
      { label: '心理的な駆け引きを見る', detail: '揺さぶりや読み合いが好き', sense: { mindgame: 3, prediction: 1 } },
    ],
  },
  {
    title: '苦手を克服するときに効くのは？',
    options: [
      { label: 'チェックリスト化する', detail: '忘れやすい情報を仕組みにする', sense: { resource: 2, awareness: 2 } },
      { label: '短い反復練習をする', detail: '反応を体に入れる', sense: { speed: 2, adaptation: 2 } },
      { label: '負けパターンを分類する', detail: '原因を型で整理する', sense: { pattern: 2, adaptation: 2 } },
    ],
  },
  {
    title: '理想のプレイヤー像に近いのは？',
    options: [
      { label: '戦況を読んでチームを導く', detail: '情報と未来予測で勝つ', sense: { awareness: 2, prediction: 2 } },
      { label: '一瞬で勝負を決める', detail: '反応と空間把握で勝つ', sense: { speed: 2, spatial: 2 } },
      { label: 'どんな環境でも伸び続ける', detail: '学習と適応で勝つ', sense: { adaptation: 3, pattern: 1 } },
    ],
  },
];

const senseArchetypes = {
  awareness_prediction: ['戦況預言者', '今を拾い、次の展開まで先回りするタイプ。', 'FPSのIGL、バトロワの安置読み、MOBAのマクロ判断で強みが出ます。'],
  prediction_awareness: ['未来ログ解析官', '起きそうな展開から逆算して、今見るべき情報を選べるタイプ。', '先回りの移動、ローテーション、終盤設計で勝ち筋を作れます。'],
  pattern_adaptation: ['攻略AI', 'ルールや癖を見抜き、短期間で自分の動きへ変換するタイプ。', '新作ゲーム、ローグライク、PvPのメタ変化に強いです。'],
  adaptation_pattern: ['メタ進化ラーナー', '失敗を素材にして、勝ちパターンを更新し続けるタイプ。', '練習量が結果に結びつきやすく、環境変化にも置いていかれにくいです。'],
  speed_spatial: ['瞬間機動エース', '一瞬の判断と立体的な位置取りで勝負を決めるタイプ。', 'FPS、アクション、格闘ゲームなど、反応勝負の場面で輝きます。'],
  spatial_speed: ['立体反応センサー', '距離、角度、高低差をつかみ、すばやく体を動かせるタイプ。', '射線管理、回避、追撃判断で安定した強さが出ます。'],
  resource_awareness: ['勝ち筋マネージャー', '時間、物資、人数差を整理して、勝てる状態を残すタイプ。', 'MOBA、RTS、サバイバル、バトロワ終盤で頼られやすいです。'],
  awareness_resource: ['戦況オペレーター', '見えている情報を整理し、必要な資源配分へ落とし込むタイプ。', 'チームの迷いを減らし、事故を少なくする安定感があります。'],
  mindgame_prediction: ['読み合いメンタリスト', '相手の選択肢を絞り、次の行動を先回りするタイプ。', '格闘ゲーム、人狼系、VALORANTの駆け引きで強みが出ます。'],
  prediction_mindgame: ['先読みフェイカー', '未来予測を使って、相手の読みをずらすタイプ。', 'フェイント、ベイト、裏取りの成功体験が多くなりやすいです。'],
  mindgame_pattern: ['トリックリーダー', '相手の癖や思考パターンを読んで、裏をかくタイプ。', '読み合い、誘導、駆け引きのあるゲームで存在感が出ます。'],
  pattern_mindgame: ['癖読みハッカー', '繰り返される行動を見抜き、相手の次の手を崩すタイプ。', '対人戦で「さっきと同じ」を拾えるほど強くなります。'],
  awareness_mindgame: ['戦場読心センサー', '戦況の変化と相手の意図を同時に拾えるタイプ。', '味方の報告と敵の心理をつなげて、勝負所を見つけられます。'],
  mindgame_awareness: ['駆け引きオペレーター', '相手の心理を軸に、戦況そのものを利用するタイプ。', '相手を動かしてから狩る、待たせて焦らせる動きが得意です。'],
  resource_prediction: ['エンドゲーム設計士', '終盤に必要な資源を残し、勝ち筋を計画できるタイプ。', '長期戦、バトロワ、ストラテジーでじわじわ強さが出ます。'],
  prediction_resource: ['勝ち筋タイムキーパー', '時間の流れを読み、使うべき資源を逆算できるタイプ。', 'いつ攻めるか、いつ残すかの判断がチームを助けます。'],
  adaptation_speed: ['成長スプリンター', '失敗からの修正が速く、次の試合ですぐ動きを変えるタイプ。', 'ランク戦や対戦ゲームで、短期間に伸びる手応えが出やすいです。'],
  speed_adaptation: ['反射アップデーター', '反応の速さに学習力が乗り、プレイ中に最適化していくタイプ。', '何戦か回すほど手が温まり、動きが洗練されていきます。'],
  spatial_awareness: ['マップセンサー', '位置関係、射線、地形、味方の配置をまとめてつかむタイプ。', 'FPS、TPS、3Dアクションで迷いにくく、カバーも上手いです。'],
  awareness_spatial: ['射線レーダー', '戦況認識をベースに、危険な角度や安全な導線を見つけるタイプ。', '前に出る味方を支えたり、事故を減らしたりできます。'],
  awareness_adaptation: ['戦況アップデーター', '見えている情報をもとに、試合中でも動きを更新できるタイプ。', '負け筋に気づいて修正する力があり、連戦するほど安定感が増します。'],
  adaptation_awareness: ['反省ログセンサー', '失敗から拾った情報を、次の認識精度へ変えるタイプ。', '振り返りがうまく、同じ事故を減らしながら着実に強くなれます。'],
  resource_adaptation: ['練習設計ビルダー', '上達に必要な課題と資源を整理して、成長を積み上げるタイプ。', '練習メニュー、設定、デバイス調整まで含めて伸びやすいです。'],
  adaptation_resource: ['効率成長マネージャー', '学習の速さを、時間や練習量の使い方でさらに伸ばすタイプ。', '限られた時間でも強くなるルートを見つけられます。'],
  pattern_prediction: ['メタ読み予報士', '今の流行や敵の型から、次に来る展開を予測するタイプ。', '環境読み、キャラ対策、構成読みで差をつけられます。'],
  prediction_pattern: ['展開パターン預言者', '未来予測の中に、繰り返し起きる型を見つけるタイプ。', '試合の流れをテンプレ化して、安定した判断へつなげます。'],
  speed_resource: ['クラッチ配分エース', '一瞬の判断で、使うべき資源を切れるタイプ。', 'スキルやアイテムを抱え落ちしにくく、勝負どころで出し切れます。'],
  resource_speed: ['テンポ管理アタッカー', '資源を見ながら、攻めるタイミングを逃さないタイプ。', '準備と実行の切り替えがうまく、チャンスを形にできます。'],
  spatial_prediction: ['ルート予測ナビゲーター', '地形や射線から、次に起きる接敵を予測するタイプ。', '先回り、裏取り、退路確保で強みが出ます。'],
  prediction_spatial: ['未来マップ設計士', '次の展開を読み、位置取りで有利を作るタイプ。', '移動判断やエリア取りが噛み合うほどチームを助けます。'],
};

// GameSenseのコールサイン(英語の戦術識別名)。
// 命名の棲み分け: ゲーマーMBTI=日本語「〜型」(プレイ人格) / GameSense=CALLSIGN(能力の識別名)。
// 日本語名はaliasとして残し、意味の補助線に使う。
const SENSE_CALLSIGNS = {
  awareness_prediction: 'ORACLE',
  awareness_pattern: 'ARGUS',
  awareness_spatial: 'SENTINEL',
  awareness_speed: 'FALCON',
  awareness_resource: 'OPERATOR',
  awareness_mindgame: 'PROFILER',
  awareness_adaptation: 'TRACKER',
  prediction_awareness: 'VISIONARY',
  prediction_pattern: 'PROPHET',
  prediction_spatial: 'HORIZON',
  prediction_speed: 'COMET',
  prediction_resource: 'TIMEKEEPER',
  prediction_mindgame: 'GAMBIT',
  prediction_adaptation: 'SAGE',
  pattern_awareness: 'CIPHER',
  pattern_prediction: 'TACTICIAN',
  pattern_spatial: 'ARCHITECT',
  pattern_speed: 'CIRCUIT',
  pattern_resource: 'ENGINEER',
  pattern_mindgame: 'HACKER',
  pattern_adaptation: 'CORTEX',
  spatial_awareness: 'ATLAS',
  spatial_prediction: 'PATHFINDER',
  spatial_pattern: 'MERIDIAN',
  spatial_speed: 'VECTOR',
  spatial_resource: 'WARDEN',
  spatial_mindgame: 'FLANKER',
  spatial_adaptation: 'COMPASS',
  speed_awareness: 'QUICKDRAW',
  speed_prediction: 'INTERCEPTOR',
  speed_pattern: 'REFLEX',
  speed_spatial: 'VANGUARD',
  speed_resource: 'CLUTCH',
  speed_mindgame: 'VIPER',
  speed_adaptation: 'OVERCLOCK',
  resource_awareness: 'QUARTERMASTER',
  resource_prediction: 'ENDGAME',
  resource_pattern: 'BROKER',
  resource_spatial: 'LOGISTICS',
  resource_speed: 'TEMPO',
  resource_mindgame: 'DEALER',
  resource_adaptation: 'FORGE',
  mindgame_awareness: 'PREDATOR',
  mindgame_prediction: 'MENTALIST',
  mindgame_pattern: 'TRICKSTER',
  mindgame_spatial: 'MIRAGE',
  mindgame_speed: 'WILDCARD',
  mindgame_resource: 'POKERFACE',
  mindgame_adaptation: 'PHANTOM',
  adaptation_awareness: 'CHRONICLE',
  adaptation_prediction: 'PIONEER',
  adaptation_pattern: 'DARWIN',
  adaptation_spatial: 'NOMAD',
  adaptation_speed: 'SURGE',
  adaptation_resource: 'ALCHEMIST',
  adaptation_mindgame: 'CHAMELEON',
};

const senseCoreNames = {
  awareness: '戦況',
  prediction: '先読み',
  pattern: '攻略',
  spatial: '立体',
  speed: '瞬間',
  resource: '資源',
  mindgame: '読心',
  adaptation: '進化',
};

const senseStyleNames = {
  awareness: 'センサー',
  prediction: 'プレディクター',
  pattern: 'アナライザー',
  spatial: 'ナビゲーター',
  speed: 'スプリンター',
  resource: 'マネージャー',
  mindgame: 'トリックスター',
  adaptation: 'ラーナー',
};

const senseAbilityProfiles = {
  awareness: {
    gift: '情報の拾い方が丁寧で、周囲の変化に気づける観察力があります。',
    softWeakness: '見える情報が多いぶん、全部を完璧に処理しようとして少し慎重になりやすいところがあります。',
    growth: '見る項目を「人数差・位置・残り時間」のように3つまで絞ると、強みがさらに実戦的になります。',
    role: '索敵、報告、カバー、チームの安全確認で価値を出しやすいです。',
    affirmation: 'あなたの視野の広さは、味方が安心して動くための土台です。',
  },
  prediction: {
    gift: '今だけでなく、このあと起きる展開まで想像できる先読み力があります。',
    softWeakness: '先のことまで見えるぶん、まだ起きていない不安を背負いやすい場面があります。',
    growth: '予測を1つだけ声に出し、外れてもすぐ更新する形にすると、読みの精度が上がります。',
    role: 'ローテーション、待ち伏せ、終盤設計、攻めるタイミング作りで輝きます。',
    affirmation: 'あなたの先読みは、偶然の勝ちを「狙った勝ち」に変える力です。',
  },
  pattern: {
    gift: '繰り返される型や相手の癖を見抜き、攻略へ変える力があります。',
    softWeakness: '法則を探す力が強いぶん、例外が続くと少しリズムを崩しやすいことがあります。',
    growth: '「いつもの型」と「例外だった型」を分けてメモすると、対応力まで一緒に伸びます。',
    role: 'キャラ対策、敵の癖読み、メタ理解、攻略共有でチームに貢献できます。',
    affirmation: 'あなたの分析力は、見えにくい勝ち筋を見える形にする才能です。',
  },
  spatial: {
    gift: '距離感、角度、高低差、射線をつかむ空間センスがあります。',
    softWeakness: '良い位置を探せるぶん、動き出す前に最適解を探しすぎることがあります。',
    growth: '完璧な位置より「今より少し安全な位置」を選ぶ意識で、動きのテンポが上がります。',
    role: '射線管理、カバー位置、逃げ道確保、立体的な攻めで強みが出ます。',
    affirmation: 'あなたの位置取りは、派手ではなくても勝率を静かに押し上げる武器です。',
  },
  speed: {
    gift: '見てから動くまでが速く、チャンスを逃しにくい瞬発力があります。',
    softWeakness: '反応が速いぶん、周りがまだ準備できていない時に一歩先へ出ることがあります。',
    growth: '動く前に一言だけ合図を足すと、あなたの速さがチーム全体の強さになります。',
    role: 'エントリー、切り返し、クラッチ、短いチャンスを拾う場面で輝きます。',
    affirmation: 'あなたの速さは、止まりかけた試合に流れを作るエンジンです。',
  },
  resource: {
    gift: '時間、物資、スキル、体力を整理して、勝ち筋を残す管理力があります。',
    softWeakness: '無駄を減らせるぶん、思い切った勝負を少し温存しすぎる場面があります。',
    growth: '「ここは使っていい場面」を先に決めておくと、管理力と決断力が両立します。',
    role: '終盤管理、スキル配分、準備、長期戦の安定感で頼られやすいです。',
    affirmation: 'あなたは、最後に勝つための余力をチームに残せる人です。',
  },
  mindgame: {
    gift: '相手の意図や迷いを読み、選択肢をずらす駆け引き力があります。',
    softWeakness: '読みが深いぶん、シンプルに来る相手に一瞬だけ考えすぎることがあります。',
    growth: '読み合いに入る前に「素直な選択肢」も1つ残すと、駆け引きの幅が広がります。',
    role: 'フェイント、ベイト、読み合い、心理的なプレッシャー作りで強みが出ます。',
    affirmation: 'あなたの読みは、相手に「やりにくい」と思わせる立派な強さです。',
  },
  adaptation: {
    gift: '失敗を次の行動に変えられる、伸びしろを結果につなげる力があります。',
    softWeakness: '改善点が見えやすいぶん、自分にだけ厳しくなりすぎる場面があります。',
    growth: '反省は1試合1テーマに絞り、できたことも同じ数だけ拾うと成長が続きます。',
    role: '練習、振り返り、新環境への対応、チームの改善提案で価値を出せます。',
    affirmation: 'あなたの本当の強さは、今の実力よりも「更新し続けられること」です。',
  },
};

const mbtiAxisLabels = {
  E: '外向プレイ',
  I: '内向プレイ',
  S: '現場反応',
  N: '未来構想',
  T: 'ロジック重視',
  F: '空気重視',
  J: '計画遂行',
  P: '即興適応',
};

const mbtiAxisPairs = [
  ['E', 'I', 'プレイ温度', '通話や場の熱量で動くか、集中と内省で動くか'],
  ['S', 'N', '認識スタイル', '今見えている情報を拾うか、展開や意味を読むか'],
  ['T', 'F', '判断基準', '勝ち筋や効率を優先するか、空気や納得感を優先するか'],
  ['J', 'P', '進め方', '作戦を決めて進めるか、状況に合わせて変えるか'],
];

const mbtiQuestions = [
  {
    title: '通話で声を出しながら遊ぶほど、プレイの調子が上がる。',
    axis: 'E / I',
    options: scaleOptions({ E: 1 }, { I: 1 }),
  },
  {
    title: '新しいゲームは、まず一人で設定や操作感を確かめたい。',
    axis: 'I / E',
    options: scaleOptions({ I: 1 }, { E: 1 }),
  },
  {
    title: 'チームの空気が落ちた時、自分から声を出して流れを戻しにいく。',
    axis: 'E / I',
    options: scaleOptions({ E: 1 }, { I: 1 }),
  },
  {
    title: '試合後は、みんなで話す前に自分の中で一度整理したい。',
    axis: 'I / E',
    options: scaleOptions({ I: 1 }, { E: 1 }),
  },
  {
    title: '判断するときは、今画面に出ている情報を一番信じる。',
    axis: 'S / N',
    options: scaleOptions({ S: 1 }, { N: 1 }),
  },
  {
    title: '相手の癖や次の展開を読んで、少し先回りするのが好きだ。',
    axis: 'N / S',
    options: scaleOptions({ N: 1 }, { S: 1 }),
  },
  {
    title: '強い武器やキャラは、まず触って体感してから判断したい。',
    axis: 'S / N',
    options: scaleOptions({ S: 1 }, { N: 1 }),
  },
  {
    title: '目の前の正解より、「この後どうなるか」の読みが当たるとうれしい。',
    axis: 'N / S',
    options: scaleOptions({ N: 1 }, { S: 1 }),
  },
  {
    title: 'アドバイスは、感覚よりも「何を直すか」を具体的に言ってほしい。',
    axis: 'T / F',
    options: scaleOptions({ T: 1 }, { F: 1 }),
  },
  {
    title: '勝ち負けと同じくらい、通話の空気や相手の気持ちも大事にしたい。',
    axis: 'F / T',
    options: scaleOptions({ F: 1 }, { T: 1 }),
  },
  {
    title: 'メタ、数値、効率を調べて、理詰めで強くなるのが好きだ。',
    axis: 'T / F',
    options: scaleOptions({ T: 1 }, { F: 1 }),
  },
  {
    title: '味方がミスした時は、まず気持ちを戻す声かけをしたい。',
    axis: 'F / T',
    options: scaleOptions({ F: 1 }, { T: 1 }),
  },
  {
    title: '遊ぶ前に今日の目標や役割を決めると、プレイしやすい。',
    axis: 'J / P',
    options: scaleOptions({ J: 1 }, { P: 1 }),
  },
  {
    title: '予定通り進めるより、その場の流れで動きを変えるほうが得意だ。',
    axis: 'P / J',
    options: scaleOptions({ P: 1 }, { J: 1 }),
  },
  {
    title: 'ランク、練習、装備集めなど、進捗が見える遊び方が好きだ。',
    axis: 'J / P',
    options: scaleOptions({ J: 1 }, { P: 1 }),
  },
  {
    title: '定石から外れた奇策や変な構成を試す時間がかなり好きだ。',
    axis: 'P / J',
    options: scaleOptions({ P: 1 }, { J: 1 }),
  },
];

const gamerMbtiTypes = {
  ISTJ: {
    title: '鉄壁の記録官型',
    catchline: '勝ち筋を崩さない、安定感のある実務派ゲーマー。',
    summary: 'あなたのゲームセンスは「安定と再現性」です。勝てる形を丁寧に積み上げ、細部を雑にしないので事故が少なく、気づけば一番信頼されているタイプです。',
    strength: 'リプレイ確認、定番ルート、役割遂行、資源管理が強みです。昨日の失敗を今日の安定に変えられるので、長く遊ぶほど勝率がじわじわ上がります。',
    growth: '慎重さは弱点ではなく、再現性を大切にできる才能です。予定外の動きが来た時は「まず一回だけ試す」と小さく許可を出すと、鉄壁の安定感に対応力が加わります。',
    role: 'アンカー、サポート、ローテ管理、終盤の資源管理',
    partner: '勢いのあるアタッカーや、感謝を言葉にできるサポート型と好相性。',
    caution: '即興タイプの味方には、全部を管理しようとせず「ここだけ守ろう」と伝えると噛み合います。あなたの堅実さは、相手を縛るためではなく、自由に動ける足場を作るために使うと一番輝きます。',
    games: ['VALORANT', 'Civilization VI', 'RimWorld', 'Against the Storm', 'Monster Hunter: World'],
  },
  ISFJ: {
    title: '誓約の守護騎士型',
    catchline: '気づいたらチームを助けている、安心感の守護役。',
    summary: 'あなたのゲームセンスは「支援と気配り」です。味方の状態を誰より早く察知し、回復やカバーでチームを安心させられる、頼れる守護役タイプです。',
    strength: '回復、カバー、救助、声かけ、空気の修復が丁寧です。目立たない貢献を積み重ねて、チームがもう一戦やりたくなる状態を作れます。',
    growth: '人に合わせられる力は大きな魅力です。ただ、自分の希望を後回しにしすぎると疲れやすいので、「今日はこの役もやってみたい」と先に出すと優しさが長持ちします。',
    role: 'ヒーラー、カバー役、後衛サポート、協力ゲームの調整役',
    partner: '前に出るタイプや、ありがとうを返せる人と組むと強みが伝わります。',
    caution: '強い言い方のT型とは、アドバイスを責めではなく改善案として受け取る合図を作ると楽です。あなたは傷つきやすいのではなく、場の温度を丁寧に受け取れる人です。',
    games: ['Overwatch 2', 'Deep Rock Galactic', 'Helldivers 2', 'It Takes Two', 'PlateUp!'],
  },
  INFJ: {
    title: '静かなる預言者型',
    catchline: '勝ち筋と空気の両方を見て、チームを静かに整えるタイプ。',
    summary: 'あなたのゲームセンスは「先読み」と「気配り」の両立です。試合の潮目と味方の空気を同時に読み、崩れる前に整えられる、固定チームの潤滑油タイプです。',
    strength: '戦術、空気、関係性を同時に見られるのが強みです。勝ち方だけでなく、勝った後もまた組みたいと思える雰囲気を作れます。',
    growth: '読みすぎる力は、疲れやすさではなく深い観察力の裏返しです。全部を一人で抱えず、「一回休憩しよ」「次は軽めでいこう」と短く言えると、あなたの優しさが自分にも向きます。',
    role: 'サポート、IGL補佐、雰囲気調整、長期固定チームの潤滑油',
    partner: '冷静なT型や勢いのあるE型と組むと、あなたの調整力が活きます。',
    caution: '空気を読みすぎて疲れたら、今日は軽めに遊ぶと先に共有すると長続きします。あなたが無理をしないことも、チームを守る行動の一つです。',
    games: ['Final Fantasy XIV', 'Baldur’s Gate 3', 'Disco Elysium', 'Stardew Valley', 'Phasmophobia'],
  },
  INTJ: {
    title: '冷静沈着の軍師型',
    catchline: '試合の先を見て、勝つための構造を組み立てるタイプ。',
    summary: 'あなたのゲームセンスの正体は「先を読む力」です。終盤に何が強いか、どこで崩れるかを読み、気合いではなく設計図で勝率を上げられる、数少ないタイプです。',
    strength: 'メタ理解、作戦設計、リスク管理、終盤判断が強みです。勝率を気合いではなく構造から上げられるので、固定チームの軸になれます。',
    growth: '冷静さは冷たさではなく、チームを迷わせないための武器です。結論だけでなく「なぜそう見るか」を一言添えると、怖さではなく頼もしさとして伝わります。',
    role: 'スナイパー、戦術担当、構成設計、終盤の判断役',
    partner: 'ENFPやESTPのような動けるタイプを後ろから活かすと強いです。',
    caution: 'F型の味方には、改善点の前に良かった点を一つ置くと一気に神コンビになります。あなたの分析は、相手を否定するためではなく勝てる形へ連れていくためのものです。',
    games: ['VALORANT', 'Teamfight Tactics', 'League of Legends', 'Crusader Kings III', 'Factorio'],
  },
  ISTP: {
    title: '無言の剣豪型',
    catchline: '説明よりプレイで見せる、現場対応のソロエース。',
    summary: 'あなたのゲームセンスは「現場対応力」です。説明より手の速さと状況判断で、崩れた局面を一人でひっくり返せる、土壇場で輝く職人タイプです。',
    strength: '細かい操作、リハイド、咄嗟の切り返し、少人数戦が強みです。混乱した場面でも手元と判断がぶれにくく、現場で勝ちを拾えます。',
    growth: '無口さはやる気がないのではなく、集中して情報処理しているサインです。重要な時だけ「行く」「引く」「右見る」と短く合図を出すと、あなたの上手さがチーム全体の勝ち筋になります。',
    role: 'フレックス、クラッチ役、斥候、サブアタッカー',
    partner: '報告や作戦を補ってくれるEJタイプと組むと、動きやすさが増します。',
    caution: '無言が不安に見える相手には「集中してるだけ」と先に伝えると安心されます。あなたの静けさは距離ではなく、精度を上げるためのモードです。',
    games: ['Apex Legends', 'Escape from Tarkov', 'Street Fighter 6', 'Risk of Rain 2', 'Dead Cells'],
  },
  ISFP: {
    title: '自由なる吟遊詩人型',
    catchline: '気持ちよく動ける時に、独自のセンスが爆発するタイプ。',
    summary: 'あなたのゲームセンスは「感覚と表現」です。理屈より「気持ちいい」動きを大切にし、ハマれば誰にも真似できない一手で場を沸かせる唯一無二タイプです。',
    strength: '直感的な操作、雰囲気づくり、自由な発想、魅せプレイが強みです。勝ち負けだけでは測れない「一緒に遊ぶ時間の心地よさ」を作れます。',
    growth: '気分に左右されるのは弱さではなく、感性のアンテナが細かい証拠です。調子が出る条件を少しメモしておくと、感覚の良さを再現しやすくなります。',
    role: 'フランカー、クリエイティブ役、カジュアル協力、魅せプレイ',
    partner: '急かさず見守ってくれるタイプや、ナイスを拾ってくれる人と好相性。',
    caution: '効率重視の相手とは、遊ぶモードを先に合わせるとあなたらしさが守れます。「今日は気楽に」「今日は勝ちに行く」を分けるだけで、自由さと信頼が両立します。',
    games: ['Minecraft', 'Terraria', 'Party Animals', 'Dave the Diver', 'DREDGE'],
  },
  INFP: {
    title: '夢見る巡礼者型',
    catchline: 'ゲームの物語と仲間の気持ちを大事にする、共感型プレイヤー。',
    summary: 'あなたのゲームセンスは「没入と共感」です。勝敗の数字より世界や仲間との時間を味わい、その場を温かくできる、物語を大切にするタイプです。',
    strength: '共感力、没入感、やさしい言葉選び、世界観を楽しむ力が強みです。勝敗が揺れても、遊びの時間そのものを意味あるものにできます。',
    growth: '遠慮しやすさは、相手を大切に見ている証拠です。ただ、自分の希望を言うことも関係を壊す行為ではありません。「これやってみたい」と出せるほど、優しさが我慢ではなく魅力として伝わります。',
    role: 'ヒーラー、ストーリー協力、探索、まったり通話の相棒',
    partner: '守ってくれるタイプや、世界観を一緒に味わえる人と相性が良いです。',
    caution: 'T型の率直な指摘で凹みやすい時は、まず共感がほしいと伝えると関係が整います。あなたは打たれ弱いのではなく、言葉の温度まで受け取れる人です。',
    games: ['Stardew Valley', 'Baldur’s Gate 3', 'Final Fantasy XIV', 'Spiritfarer', 'No Man’s Sky'],
  },
  INTP: {
    title: '孤高の研究者型',
    catchline: 'メタ、仕様、強行動を理詰めで読み解く分析ゲーマー。',
    summary: 'あなたのゲームセンスは「分析」にあります。仕様も数字も相手の手癖も理由まで突き詰めて、誰も気づかない最適解を見つけ出せるタイプです。',
    strength: '仕様理解、メタ分析、例外処理、独自ルート開拓が強みです。人が見逃す条件や組み合わせに気づき、環境の裏側から勝ちを作れます。',
    growth: '考え込みやすさは、深く掘れる才能です。全部を説明しようとせず「結論だけ言うと」と短く共有すると、孤高の分析がチームの武器になります。',
    role: 'ビルド研究、構成分析、後衛火力、攻略共有',
    partner: '行動力のあるE型や、作戦を試してくれる人と組むと研究が活きます。',
    caution: 'F型には「ダメ」より「こうするともっと良くなる」と伝えると、分析が優しさとして届きます。あなたの理屈は冷たさではなく、より良くしたい気持ちの表現です。',
    games: ['Slay the Spire', 'Balatro', 'Teamfight Tactics', 'Factorio', 'Oxygen Not Included'],
  },
  ESTP: {
    title: '電撃アサルト型',
    catchline: '前線で流れを奪う、脳汁系アタッカー。',
    summary: 'あなたのゲームセンスは「反応と度胸」です。考えるより速く動き、勝負どころを一瞬で嗅ぎ分けて飛び込める、最前線の起爆剤タイプです。',
    strength: '反応速度、勝負勘、度胸、現場判断が強みです。考えすぎて止まるチームに、最初の突破口を作れます。',
    growth: '勢いは雑さではなく、場を動かすエンジンです。突っ込む前に「行く」と一言だけ出すと、味方があなたの速さに乗りやすくなり、電撃がチームプレイになります。',
    role: 'エントリー、アタッカー、クラッチ役、前線の起点',
    partner: 'INTJやISFJのように後ろを固めてくれるタイプと相性抜群です。',
    caution: '慎重派の味方には、全部を勢いで決めず「次だけ行く」と宣言すると安心されます。あなたの速さは、共有された瞬間にチーム全体の武器になります。',
    games: ['Apex Legends', 'VALORANT', 'THE FINALS', 'Helldivers 2', 'Risk of Rain 2'],
  },
  ESFP: {
    title: '祝祭の先陣役型',
    catchline: '勝っても負けても場を明るくする、通話映えタイプ。',
    summary: 'あなたのゲームセンスは「盛り上げる力」です。勝っても負けても空気を明るく切り替え、ピンチでもチームを折れさせない、ムードメーカータイプです。',
    strength: '盛り上げ、リアクション、瞬間的な行動力、空気の切り替えが強みです。チームが硬くなった時、あなたの一言でまた動き出せます。',
    growth: 'にぎやかさは軽さではなく、人を巻き込む力です。相手が集中したい場面だけ声量を調整すると、楽しさと信頼が両立します。',
    role: 'アタッカー、パーティーゲーム担当、通話の盛り上げ役',
    partner: '落ち着いて受け止めてくれるI型や、ノリを返してくれるE型と好相性。',
    caution: '静かな相手にも、リアクションが少ないだけで楽しんでいる人がいると知ると噛み合います。あなたの明るさは、相手のペースを照らすように使うとさらに魅力的です。',
    games: ['Party Animals', 'Overcooked! 2', 'Content Warning', 'PICO PARK', 'Apex Legends'],
  },
  ENFP: {
    title: 'ひらめき冒険家型',
    catchline: 'アイデアと勢いで、遊び方そのものを楽しくするタイプ。',
    summary: 'あなたのゲームセンスは「発想と勢い」です。その場のひらめきで道を切り開き、止まった試合に火をつけられる、場を面白くする天才タイプです。',
    strength: '発想力、誘いやすさ、前向きな切り替え、場を動かす言葉が強みです。停滞したチームに新しい選択肢と軽さを持ち込めます。',
    growth: 'アイデアが多いのは散らかりではなく、可能性を見つける力です。試す案を一つに絞ると、楽しさが勝ち筋に変わりやすくなります。',
    role: 'フランカー、奇策担当、協力ゲームの企画役、初回デュオの空気づくり',
    partner: 'INTJやISTJのように、発想を形にしてくれるタイプと相性が良いです。',
    caution: '計画派の相手には、途中で方針を変える理由を一言添えると安心されます。あなたの自由さは、共有されると周りを置いていく力ではなく、連れていく力になります。',
    games: ['Minecraft', 'Baldur’s Gate 3', 'Valheim', 'Lethal Company', 'Apex Legends'],
  },
  ENTP: {
    title: 'メタ破壊の革命家型',
    catchline: '常識の穴を見つけて、相手の想定をずらすタイプ。',
    summary: 'あなたのゲームセンスは「裏をかく力」です。定石の外側を見て、フェイクや変則の一手で相手の想定を崩し、試合の流れごとひっくり返せるタイプです。',
    strength: '発想、検証、心理戦、メタ対策が強みです。普通なら選ばないルートや構成から、相手が嫌がる勝ち方を生み出せます。',
    growth: '奇策好きはふざけているのではなく、環境を疑える才能です。作戦の目的を先に共有すると、味方が混乱せず一緒に革命へ乗りやすくなります。',
    role: '奇策担当、読み合い役、メタ対策、構成の実験台',
    partner: '実行力のあるESTPや、作戦を整理してくれるJ型と組むと強いです。',
    caution: '安定派の相手には、毎回実験せず「今回は一回だけ試す」と決めると信頼が残ります。あなたの破壊力は、チームが安心できる範囲を作るほど強く刺さります。',
    games: ['League of Legends', 'Street Fighter 6', 'Among Us', 'Inscryption', 'Goose Goose Duck'],
  },
  ESTJ: {
    title: '規律の実戦指揮官型',
    catchline: '目的、役割、次の行動をはっきりさせる勝率管理タイプ。',
    summary: 'あなたのゲームセンスは「規律と段取り」です。目的・役割・次の行動をはっきりさせ、勝率を運任せから実力に変えられる、進行役タイプです。',
    strength: '指示、役割分担、実行力、目標管理が強みです。迷って止まるチームに、具体的な次の一手を出せます。',
    growth: 'はっきり言える力は圧ではなく、チームを迷わせない責任感です。強い言葉になりそうな時は、良かった点を一つ挟むとリーダー感が柔らかく伝わります。',
    role: 'IGL、タンク、目標管理、ランクの進行役',
    partner: '柔らかく空気を整えるF型や、実行力のあるS型と噛み合います。',
    caution: '自由に動きたいP型には、全部を決めずに任せる範囲を残すと力を出してくれます。あなたの規律は、相手を小さくするためではなく、チームを勝ちやすくするための土台です。',
    games: ['VALORANT', 'Overwatch 2', 'League of Legends', 'Factorio', 'Civilization VI'],
  },
  ESFJ: {
    title: '陽だまりの宮廷官型',
    catchline: 'みんなが遊びやすい場を作る、コミュニティ型サポーター。',
    summary: 'あなたのゲームセンスは「場づくり」です。全員が気持ちよく遊べる空気を作り、「また集まりたい」とチームを長続きさせられるタイプです。',
    strength: '連絡、雰囲気作り、感謝の循環、固定メンバーの接着剤になる力が強みです。コミュニティが長く続くための見えない仕事を自然にできます。',
    growth: '人に合わせる力は、場を育てる才能です。ただ、全員に合わせすぎると自分の楽しさが後回しになるので、遊びたい方向も先に出すと満足度が上がります。',
    role: 'サポート、固定PTの調整役、協力ゲームの進行、通話のホスト',
    partner: '不器用だけど誠実なT型や、楽しく盛り上がるE型と好相性です。',
    caution: '返事が淡いI型も、楽しんでいないとは限りません。反応の量で判断しすぎないと楽になります。あなたの気配りは、相手の静かな楽しみ方も信じられるとさらに深くなります。',
    games: ['Final Fantasy XIV', 'Monster Hunter: World', 'PICO PARK', 'PlateUp!', 'Deep Rock Galactic'],
  },
  ENFJ: {
    title: '鼓舞する旗手型',
    catchline: '勝ち筋とテンションを同時に作る、熱いチームリーダー。',
    summary: 'あなたのゲームセンスは「人を動かす力」です。声かけと立て直しで味方の気持ちを上げ、チーム全体の出力を引き上げられるリーダータイプです。',
    strength: '声かけ、作戦共有、モチベ管理、チームの再起動が強みです。勝ち筋とテンションを同時に作れるので、味方の実力を引き出せます。',
    growth: '背負いやすさは責任感の強さです。ただ、全員を一人で支えようとすると疲れるので、頼る役も作るとリーダーとして長く走れます。',
    role: 'IGL、サポートリーダー、固定チームの進行、モチベ管理',
    partner: '冷静な分析型や、前に出るアタッカーを乗せると強みが光ります。',
    caution: '静かな相手に熱量を押し込みすぎず、必要な時だけ声をかけると信頼が増えます。あなたの熱さは、相手の温度に合わせて届いた時に一番強く響きます。',
    games: ['Overwatch 2', 'VALORANT', 'Monster Hunter: World', 'Helldivers 2', 'Keep Talking and Nobody Explodes'],
  },
  ENTJ: {
    title: '覇道コマンダー型',
    catchline: '勝つための判断を恐れない、司令塔タイプ。',
    summary: 'あなたのゲームセンスは「決断」です。曖昧な空気の中でも勝つために今すべきことを言い切り、迷うチームに進む方向を与えられる司令塔タイプです。',
    strength: '決断力、戦術設計、構成判断、チームの方向づけが強みです。曖昧な空気を突破し、勝つための一本道を作れます。',
    growth: '強さは押しつけではなく、勝利へ連れていく推進力です。指摘の前に目的を共有すると、怖さより頼もしさが前に出ます。',
    role: 'メインIGL、構成決め、ランクの勝率管理、タンク・司令塔',
    partner: '空気を整えるF型や、現場で動けるS型と組むとチームが完成します。',
    caution: 'F型には「責めたいわけではなく勝ち筋を合わせたい」と一言添えるだけで伝わり方が変わります。あなたの覇道は、仲間を置いていくものではなく、同じ方向へ連れていく力です。',
    games: ['League of Legends', 'VALORANT', 'Teamfight Tactics', 'Dota 2', 'Crusader Kings III'],
  },
};

const pcQuestions = [
  {
    title: 'まず予算感はどれに近いですか？',
    options: [
      { label: 'なるべく抑えて始めたい', detail: 'フルHD中心で、まずはPCゲームを快適に遊びたい', needs: { budget: 3, comfort: 1 } },
      { label: '長く使えるバランス型がいい', detail: '人気ゲームを高設定寄りで遊びたい', needs: { fps: 1, quality: 2, comfort: 2 } },
      { label: '妥協せず強めに組みたい', detail: '高FPS、配信、重めのゲームまで見たい', needs: { fps: 2, quality: 2, stream: 2 } },
    ],
  },
  {
    title: '一番遊びたいゲーム傾向は？',
    options: [
      { label: 'FPS・ランク系', detail: 'VALORANT、Apex、Overwatchのような対戦ゲーム', needs: { fps: 3, budget: 1 } },
      { label: 'オープンワールド・映像重視', detail: '画質や没入感を大事にしたい', needs: { quality: 3, comfort: 1 } },
      { label: '協力・作業・通話ゲーム', detail: 'Minecraft、Palworld、協力ゲームを長く遊びたい', needs: { comfort: 3, budget: 1 } },
    ],
  },
  {
    title: '画面環境はどれを想定していますか？',
    options: [
      { label: 'フルHDで十分', detail: 'コスパよく安定して遊びたい', needs: { budget: 2, fps: 1 } },
      { label: '144Hz以上でぬるぬる動かしたい', detail: '撃ち合いの見やすさと反応を優先', needs: { fps: 3 } },
      { label: 'WQHDや高画質も気になる', detail: '画質とフレームレートを両立したい', needs: { quality: 3, comfort: 1 } },
    ],
  },
  {
    title: '配信や録画はしますか？',
    options: [
      { label: 'しない', detail: 'ゲームプレイ中心でOK', needs: { budget: 1, fps: 1 } },
      { label: 'たまに録画や画面共有をする', detail: 'Discord共有や短いクリップを残したい', needs: { stream: 2, comfort: 1 } },
      { label: '配信も本格的にやりたい', detail: 'ゲーム、通話、配信を同時に安定させたい', needs: { stream: 3, quality: 1 } },
    ],
  },
  {
    title: '設置場所や見た目の希望は？',
    options: [
      { label: '置き場所はあまり気にしない', detail: '性能と価格のバランス優先', needs: { budget: 1, fps: 1 } },
      { label: '静かで長時間疲れにくい環境がいい', detail: '冷却、静音、デスク周りも整えたい', needs: { comfort: 3 } },
      { label: '省スペースや白系デスクに合わせたい', detail: '見た目と部屋への馴染みも大事', needs: { portable: 3, comfort: 1 } },
    ],
  },
];

const pcBuilds = [
  {
    id: 'starter-fhd',
    name: 'フルHDスターター構成',
    catchline: '最初の1台は、遊びやすさと価格のバランス重視。',
    summary: 'PCゲームを始めたい人向けの構成です。フルHD、人気FPS、協力ゲームを無理なく遊べることを優先します。',
    specs: [['CPU', 'ミドル帯CPU'], ['GPU', 'フルHD向けミドルGPU'], ['メモリ', '16GB以上'], ['ストレージ', 'NVMe SSD 1TB目安']],
    games: ['VALORANT', 'Apex Legends', 'Minecraft', 'PICO PARK'],
    peripherals: ['144Hzモニター', '軽量マウス', 'ヘッドセット'],
    gameFit: 'フルHDで人気タイトルを広く遊ぶ入門向け。最初はPC本体より、モニターとマウスまで含めた総額で見るのがおすすめです。',
    buyerTips: ['SSDは1TB以上を優先', 'モニターは144Hz以上', '将来増設しやすいケースだと安心'],
    affiliateSlots: [
      { id: 'starter-bto', title: 'RTX 5060系スターターPC', body: 'フルHD向けの新しめGPU搭載PCを探せます。', cta: 'AmazonでRTX 5060搭載PCを見る', href: amazonSearchUrl('RTX 5060 ゲーミングPC') },
      { id: 'starter-monitor', title: 'IODATA GigaCrysta KH-GD241JD（180Hz）', body: 'フルHD24インチ・180Hzの定番モデルです。', cta: 'AmazonでIODATA GigaCrysta KH-GD241JDを見る', href: amazonSearchUrl('IODATA GigaCrysta KH-GD241JD 180Hz') },
      { id: 'starter-device', title: 'Logicool G304 LIGHTSPEED（入門ワイヤレス）', body: '軽量な入門用ワイヤレスマウスの定番です。', cta: 'AmazonでLogicool G304を見る', href: amazonSearchUrl('Logicool G304 LIGHTSPEED ワイヤレス') },
    ],
    needs: ['budget', 'fps'],
  },
  {
    id: 'fps-competitive',
    name: '高FPSランク構成',
    catchline: '撃ち合いと反応速度を活かす、対戦ゲーム特化型。',
    summary: 'FPSやランク戦を中心に遊ぶ人向けです。高リフレッシュレートで安定して動かすことを優先します。',
    specs: [['CPU', 'ゲーム性能重視のミドル上位CPU'], ['GPU', '高FPS向けGPU'], ['メモリ', '32GB推奨'], ['モニター', '144Hzから240Hz目安']],
    games: ['VALORANT', 'Apex Legends', 'Overwatch 2', 'THE FINALS'],
    peripherals: ['240Hzモニター', '軽量マウス', '大型マウスパッド'],
    gameFit: 'FPSやランク戦で入力遅延と視認性を重視する人向け。PC本体、モニター、マウスの3点で体感差が出ます。',
    buyerTips: ['240Hz対応モニターを優先', 'GPUだけでなくCPU性能も確認', '軽量マウスと大きめパッドをセットで見る'],
    affiliateSlots: [
      { id: 'fps-bto', title: 'RTX 5070系高FPS PC', body: 'FPSユーザー向けに、RTX 50系の中上位構成を探せます。', cta: 'AmazonでRTX 5070搭載PCを見る', href: amazonSearchUrl('RTX 5070 ゲーミングPC') },
      { id: 'fps-monitor', title: 'ASUS ROG Swift OLED PG32UCDM', body: '高FPSタイプと相性がよいOLED高リフレッシュモデルです。', cta: 'AmazonでASUS ROG Swift OLED PG32UCDMを見る', href: amazonSearchUrl('ASUS ROG Swift OLED PG32UCDM') },
      { id: 'fps-mouse', title: 'Razer Viper V3 Pro', body: '競技向けの軽量・8Kポーリングレートモデルです。', cta: 'AmazonでRazer Viper V3 Proを見る', href: amazonSearchUrl('Razer Viper V3 Pro') },
    ],
    needs: ['fps', 'comfort'],
  },
  {
    id: 'wqhd-quality',
    name: 'WQHD高画質構成',
    catchline: '景色も戦闘も気持ちよく遊ぶ、映像重視の本命構成。',
    summary: '重めのゲームやオープンワールドをきれいに楽しみたい人向けです。画質、余裕、長く使えるバランスを重視します。',
    specs: [['CPU', 'ミドル上位からハイエンド寄り'], ['GPU', 'WQHD向け上位GPU'], ['メモリ', '32GB推奨'], ['ストレージ', 'NVMe SSD 1TBから2TB']],
    games: ['Monster Hunter: World', 'Baldur’s Gate 3', 'Palworld', 'Satisfactory'],
    peripherals: ['WQHDモニター', '大容量SSD', '静音ケース'],
    gameFit: 'オープンワールド、クラフト、RPGを高画質で楽しみたい人向け。WQHDモニターと容量多めのSSDまで合わせると満足度が上がります。',
    buyerTips: ['WQHD以上ならGPUを強めに', 'ゲームを複数入れるなら2TB SSD', '静音性と冷却のレビューも確認'],
    affiliateSlots: [
      { id: 'quality-bto', title: 'RTX 5070 Ti/5080高画質PC', body: 'WQHDや高画質ゲーム向けの余裕ある構成を探せます。', cta: 'AmazonでRTX 5070 Ti/5080 PCを見る', href: amazonSearchUrl('RTX 5070 Ti RTX 5080 ゲーミングPC') },
      { id: 'quality-monitor', title: 'LG UltraGear 27GS95QE-B（WQHD OLED）', body: '高画質構成と合わせたいWQHD OLED 240Hzモデルです。', cta: 'AmazonでLG UltraGear 27GS95QE-Bを見る', href: amazonSearchUrl('LG UltraGear 27GS95QE-B OLED') },
      { id: 'quality-parts', title: 'Crucial P510 2TB（PCIe Gen5 SSD）', body: 'Gen5世代のNVMe SSDです。DDR5メモリは容量に応じて別途選びましょう。', cta: 'AmazonでCrucial P510を見る', href: amazonSearchUrl('Crucial P510 2TB PCIe Gen5 SSD') },
    ],
    needs: ['quality', 'comfort'],
  },
  {
    id: 'stream-creator',
    name: '配信クリエイター構成',
    catchline: 'ゲーム、通話、配信を同時に安定させる構成。',
    summary: '配信、録画、画面共有をする人向けです。CPU、メモリ、マイク、サブモニターまで含めて環境を整えます。',
    specs: [['CPU', 'マルチタスクに強いCPU'], ['GPU', '配信支援機能を活かせるGPU'], ['メモリ', '32GB以上'], ['周辺環境', 'マイクとサブモニター推奨']],
    games: ['VALORANT', 'Apex Legends', 'Minecraft', 'Party Animals'],
    peripherals: ['USB/XLRマイク', 'サブモニター', 'キャプチャ周辺機器'],
    gameFit: 'ゲーム、Discord、録画、配信ソフトを同時に動かす人向け。音質と画面管理まで整えると配信の見え方が変わります。',
    buyerTips: ['メモリ32GB以上を基準にする', 'USBマイクは設置スペースも確認', '配信管理用のサブ画面を用意'],
    affiliateSlots: [
      { id: 'stream-bto', title: 'RTX 5070系配信PC', body: 'ゲーム、通話、配信を同時にこなしやすい構成です。', cta: 'Amazonで配信用ゲーミングPCを見る', href: amazonSearchUrl('RTX 5070 配信 ゲーミングPC') },
      { id: 'stream-mic', title: 'HyperX QuadCast 2', body: '配信や通話の満足度に直結しやすい定番USBマイクです。', cta: 'AmazonでHyperX QuadCast 2を見る', href: amazonSearchUrl('HyperX QuadCast 2 USBマイク') },
      { id: 'stream-monitor', title: 'ASUS ZenScreen モバイルモニター', body: '配信管理、Discord、攻略表示に使いやすい定番シリーズです。', cta: 'AmazonでASUS ZenScreenを見る', href: amazonSearchUrl('ASUS ZenScreen モバイルモニター') },
    ],
    needs: ['stream', 'quality'],
  },
  {
    id: 'compact-cozy',
    name: '省スペース快適構成',
    catchline: '部屋に馴染む、静かで長く遊べるデスク環境。',
    summary: 'まったり遊ぶ人や部屋の見た目も大事にしたい人向けです。静音、省スペース、デスク周りの気持ちよさを重視します。',
    specs: [['CPU', '省電力寄りのミドルCPU'], ['GPU', 'フルHDからWQHD軽め対応'], ['メモリ', '16GBから32GB'], ['ケース', '静音・小型・白系も候補']],
    games: ['Minecraft', 'Stardew Valley', 'Palworld', 'It Takes Two'],
    peripherals: ['静音キーボード', '白系デスク周り', '疲れにくいチェア'],
    gameFit: '通話しながら長く遊ぶ人や、部屋の見た目も大事にしたい人向け。静音性、デスク周り、座り心地まで含めて選ぶと続きます。',
    buyerTips: ['置き場所の幅と奥行きを先に測る', '静音キーボードや低反発パッドも候補', '白系は色味の統一感を確認'],
    affiliateSlots: [
      { id: 'compact-bto', title: 'RTX 5060 Ti系小型PC', body: '省スペースでも遊びやすい新しめGPU構成を探せます。', cta: 'Amazonで小型ゲーミングPCを見る', href: amazonSearchUrl('RTX 5060 Ti 小型 ゲーミングPC') },
      { id: 'compact-desk', title: 'バウヒュッテ 昇降式ゲーミングデスク', body: '白系の見た目を整えたい人向けの定番デスクブランドです。', cta: 'Amazonでバウヒュッテのデスクを見る', href: amazonSearchUrl('バウヒュッテ 昇降式デスク 白') },
      { id: 'compact-quiet', title: 'REALFORCE GX1（静音）', body: '通話しながら長く遊ぶ人に向いた、静音性トップクラスのキーボードです。', cta: 'AmazonでREALFORCE GX1を見る', href: amazonSearchUrl('REALFORCE GX1 静音キーボード') },
    ],
    needs: ['portable', 'comfort'],
  },
];

let answers = readSavedAnswers('partner', questions.length);
let pcAnswers = readSavedAnswers('pc', pcQuestions.length);
let senseAnswers = readSavedAnswers('sense', senseQuestions.length);
let gamerMbtiAnswers = readSavedAnswers('mbti', mbtiQuestions.length);

function savedPartnerHashMatches() {
  if (answers.length !== questions.length) return false;
  if (!location.hash) return true;
  const scores = getScores(answers, questions, 'traits', Object.keys(traitLabels));
  return location.hash === `#result=${getResult(scores).id}`;
}

function savedSenseHashMatches() {
  if (senseAnswers.length !== senseQuestions.length) return false;
  if (!location.hash) return true;
  const keys = Object.keys(senseLabels);
  const rawScores = getScores(senseAnswers, senseQuestions, 'sense', keys);
  const maxScores = getMaxScores(senseQuestions, 'sense', keys);
  const archetype = getSenseArchetype(normalizeScores(rawScores, maxScores, { floor: 38 }));
  return location.hash === `#sense=${archetype.primary}_${archetype.secondary}`;
}

function savedGamerMbtiHashMatches() {
  if (gamerMbtiAnswers.length !== mbtiQuestions.length) return false;
  if (!location.hash) return true;
  const scores = getScores(gamerMbtiAnswers, mbtiQuestions, 'mbti', Object.keys(mbtiAxisLabels));
  return location.hash === `#mbti=${getGamerMbtiResult(scores).code}`;
}

function getScores(items, questionList, field, keys) {
  const scores = Object.fromEntries(keys.map((key) => [key, 0]));
  items.forEach((optionIndex, questionIndex) => {
    const values = questionList[questionIndex]?.options[optionIndex]?.[field] || {};
    Object.entries(values).forEach(([key, value]) => {
      scores[key] = (scores[key] || 0) + value;
    });
  });
  return scores;
}

function getResult(scores) {
  return profiles
    .map((profile) => ({ profile, score: profile.traits.reduce((sum, trait) => sum + scores[trait], 0) }))
    .sort((a, b) => b.score - a.score)[0].profile;
}

const senseAbilitySynergyMap = {
  awareness: ['prediction', 'resource', 'adaptation', 'spatial'],
  prediction: ['awareness', 'mindgame', 'pattern', 'resource'],
  pattern: ['adaptation', 'prediction', 'mindgame', 'speed'],
  spatial: ['speed', 'awareness', 'prediction', 'pattern'],
  speed: ['spatial', 'adaptation', 'mindgame', 'resource'],
  resource: ['awareness', 'prediction', 'adaptation', 'speed'],
  mindgame: ['prediction', 'pattern', 'awareness', 'speed'],
  adaptation: ['pattern', 'awareness', 'resource', 'speed'],
};

const mbtiCompatibilityMap = {
  ISTJ: ['ESTP', 'ENFP', 'ISFJ'],
  ISFJ: ['ESTP', 'ENTJ', 'ESFP'],
  INFJ: ['INTJ', 'ENFP', 'ESTP'],
  INTJ: ['ENFP', 'ESTP', 'INFJ'],
  ISTP: ['ESTJ', 'ENFJ', 'ENTP'],
  ISFP: ['ESFJ', 'ENFP', 'ISTJ'],
  INFP: ['ENFJ', 'INTJ', 'ISFJ'],
  INTP: ['ENTP', 'ENFP', 'ESTJ'],
  ESTP: ['INTJ', 'ISFJ', 'ENFJ'],
  ESFP: ['ISFJ', 'ISTJ', 'ENFP'],
  ENFP: ['INTJ', 'ISTJ', 'INFJ'],
  ENTP: ['ESTP', 'INTJ', 'ESTJ'],
  ESTJ: ['ISFP', 'ENFP', 'ISTP'],
  ESFJ: ['INTP', 'ISTP', 'ESFP'],
  ENFJ: ['INTP', 'ESTP', 'INFJ'],
  ENTJ: ['INFP', 'ISFP', 'ESTP'],
};

function getSenseCompatiblePartners(archetype) {
  const sourcePair = `${archetype.primary}_${archetype.secondary}`;
  const primarySynergy = senseAbilitySynergyMap[archetype.primary] || [];
  const secondarySynergy = senseAbilitySynergyMap[archetype.secondary] || [];
  const senseKeys = Object.keys(senseLabels);
  return senseKeys
    .flatMap((primary) => senseKeys
      .filter((secondary) => secondary !== primary)
      .map((secondary) => {
        const id = `${primary}_${secondary}`;
        const candidate = getSenseArchetypeFromKeys(primary, secondary);
        const score =
          (primarySynergy.includes(primary) ? 5 : 0) +
          (secondarySynergy.includes(primary) ? 4 : 0) +
          (primarySynergy.includes(secondary) ? 3 : 0) +
          (secondarySynergy.includes(secondary) ? 2 : 0) +
          (primary === archetype.secondary ? 2 : 0) +
          (secondary === archetype.primary ? 1 : 0);
        return {
          id,
          score,
          order: senseKeys.indexOf(primary) * 10 + senseKeys.indexOf(secondary),
          title: candidate.name,
          badge: 'G8',
          catchline: candidate.catchline,
          reason: `${senseLabels[archetype.primary]}で拾った情報を、${senseLabels[primary]}の視点で受け止めてくれる相手。判断の抜けを補い合いやすい組み合わせです。`,
          meta: `${senseLabels[primary]} × ${senseLabels[secondary]}`,
          subMeta: 'GameSense Scan 8内の相性タイプ',
          href: `gamesense.html#sense=${id}`,
          iconName: senseIcons[primary] || 'chart',
          emblem: {
            mainIcon: senseIcons[primary] || 'chart',
            subIcon: senseIcons[secondary] || 'spark',
            accent: (SENSE_CARD_ACCENTS[primary] || [114, 242, 255]).join(' '),
            subAccent: (SENSE_CARD_ACCENTS[secondary] || [255, 77, 210]).join(' '),
          },
          accent: (SENSE_CARD_ACCENTS[primary] || [114, 242, 255]).join(' '),
        };
      }))
    .filter((match) => match.id !== sourcePair)
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, 3);
}

function getMbtiCompatiblePartners(code) {
  const codes = mbtiCompatibilityMap[code] || Object.keys(gamerMbtiTypes).filter((candidateCode) => candidateCode !== code).slice(0, 3);
  return codes.map((candidateCode) => {
    const type = gamerMbtiTypes[candidateCode];
    return {
      title: type.title,
      badge: candidateCode,
      catchline: type.catchline,
      reason: `${code}のプレイ人格に対して、${candidateCode}は役割や温度感を補いやすい相手です。片方が作る流れを、もう片方が形にしやすい組み合わせです。`,
      meta: type.role,
      subMeta: 'ゲーマーMBTI内の相性タイプ',
      href: `gamermbti.html#mbti=${candidateCode}`,
      iconName: 'user',
      image: `assets/types/${candidateCode.toLowerCase()}.png?v=2`,
      accent: (MBTI_CARD_ACCENTS[candidateCode] || [114, 242, 255]).join(' '),
    };
  });
}

function renderCompatiblePartnersPanel(matches, sourceLabel = '診断結果', options = {}) {
  const title = options.title || '相性のいい相手タイプ';
  const eyebrow = options.eyebrow || 'MATCH TOP 3';
  const description = options.description || `${sourceLabel}から、プレイ温度・通話ペース・役割の噛み合いやすさを見ています。恋愛判定ではなく、ゲーム中に組みやすい相棒傾向です。`;
  return `
    <section class="compat-partner-panel" aria-label="相性のいい相手タイプTOP3">
      <div class="compat-partner-head">
        <span>${icon('link')}${eyebrow}</span>
        <strong>${title}</strong>
        <p>${description}</p>
      </div>
      <div class="compat-partner-grid">
        ${matches.map((match, index) => `
          <article class="compat-partner-card rank-${index + 1}"${match.accent ? ` style="--partner-accent: ${match.accent}"` : ''}>
            <div class="compat-partner-rank">
              ${match.emblem
                ? `<span class="sense-type-emblem compat-partner-emblem" style="--emblem-accent: ${match.emblem.accent}; --emblem-sub: ${match.emblem.subAccent}" aria-hidden="true"><span class="sense-type-emblem-main">${icon(match.emblem.mainIcon)}</span><span class="sense-type-emblem-sub">${icon(match.emblem.subIcon)}</span></span>`
                : (match.image ? `<span class="compat-partner-thumb"><img src="${match.image}" alt="" width="72" height="79" loading="lazy" decoding="async" /></span>` : '')}
              <span class="compat-partner-rank-no">${String(index + 1).padStart(2, '0')}</span>
              <small>${match.badge}</small>
            </div>
            <div>
              <h3>${match.title}</h3>
              <p>${match.catchline}</p>
              <p class="compat-partner-reason">${match.reason}</p>
              <div class="compat-partner-meta">
                <span>${icon(match.iconName || 'spark')}${match.meta}</span>
                <span>${icon('gamepad')}${match.subMeta}</span>
              </div>
              ${match.href ? `<a class="compat-partner-link" href="${match.href}">${icon('arrow')}このタイプを見る</a>` : ''}
            </div>
          </article>
        `).join('')}
      </div>
      <a class="ghost-link compat-partner-cta" href="partner.html">${icon('link')}実際のフレンドとの相性も診断する</a>
    </section>
  `;
}

function getPcBuild(scores) {
  return pcBuilds
    .map((build) => ({ build, score: build.needs.reduce((sum, need) => sum + scores[need], 0) }))
    .sort((a, b) => b.score - a.score)[0].build;
}

function getGamerMbtiCode(scores) {
  return [
    (scores.E || 0) >= (scores.I || 0) ? 'E' : 'I',
    (scores.S || 0) >= (scores.N || 0) ? 'S' : 'N',
    (scores.T || 0) >= (scores.F || 0) ? 'T' : 'F',
    (scores.J || 0) >= (scores.P || 0) ? 'J' : 'P',
  ].join('');
}

function getGamerMbtiResult(scoresOrCode) {
  const code = typeof scoresOrCode === 'string' ? scoresOrCode : getGamerMbtiCode(scoresOrCode);
  return { code, ...gamerMbtiTypes[code] };
}

function buildGamerMbtiScoresForCode(code) {
  const scores = { E: 3, I: 3, S: 3, N: 3, T: 3, F: 3, J: 3, P: 3 };
  [...code].forEach((letter) => { scores[letter] = 12; });
  return scores;
}

function renderGamerMbtiAxisGrid(scores) {
  return `
    <div class="mbti-axis-grid">
      ${mbtiAxisPairs.map(([left, right, label, body]) => {
        const leftValue = scores[left] || 0;
        const rightValue = scores[right] || 0;
        const winner = leftValue >= rightValue ? left : right;
        const percent = Math.round((Math.max(leftValue, rightValue) / Math.max(1, leftValue + rightValue)) * 100);
        return `
          <article class="mbti-axis-card">
            <div class="card-head"><p class="card-label">${icon('target')}${label}</p><span>${winner}</span></div>
            <strong>${winner} / ${mbtiAxisLabels[winner]}</strong>
            <div class="mbti-axis-track"><span style="width:${percent}%"></span></div>
            <small>${left}${right} ${percent}% : ${body}</small>
          </article>
        `;
      }).join('')}
    </div>
  `;
}

function renderScaleOptionList(question, dataAttribute) {
  return `
    <div class="scale-answer" aria-label="回答スケール">
      <div class="scale-caption"><span>そう思う</span><small>${question.axis || '直感スキャン'}</small><span>思わない</span></div>
      <div class="scale-buttons">
        ${question.options.map((option, index) => `
          <button class="scale-button is-${option.scale}" type="button" ${dataAttribute}="${index}" aria-label="${option.label}">
            <strong>${option.scale === 0 ? '・' : Math.abs(option.scale)}</strong>
            <span>${option.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// もう片方のメイン診断への相互導線。結果画面内で他セクションと分けて目立たせる。
function renderCrossScanPanel(kind) {
  // 両診断が揃っていれば、この結果画面からそのまま名刺作成へ誘導する。
  if (getSavedMbtiResult() && getSavedSenseResult()) {
    return `
      <aside class="cross-scan-panel is-id-ready" aria-label="ゲーマー名刺の作成">
        <span class="cross-scan-eyebrow">${icon('tag')}GAMER ID CARD</span>
        <strong>2つの結果が揃いました。ゲーマー名刺を作れます。</strong>
        <p>ゲーマーMBTIとGameSense Scan 8を、レーダー付きの1枚にまとめてそのままシェアできます。</p>
        <a class="primary-link cross-scan-cta" href="results.html#gamer-id-card-panel">${icon('share')}ゲーマー名刺を作成する</a>
      </aside>
    `;
  }
  const target = kind === 'sense'
    ? {
      href: 'gamermbti.html',
      eyebrow: 'NEXT SCAN',
      title: '能力値の次は、プレイ人格。',
      body: '8能力の強みに、判断・通話温度・役割の16タイプを重ねると、向いてるロールと組みやすい相手がさらにはっきりします。16問・約1分。',
      cta: 'ゲーマーMBTIを診断する',
      ctaIcon: 'user',
    }
    : {
      href: 'gamesense.html',
      eyebrow: 'NEXT SCAN',
      title: 'プレイ人格の次は、能力値。',
      body: 'タイプに8能力のレーダーチャートを重ねると、強みの根拠と伸ばしどころまで見えてきます。24問・約2分。',
      cta: 'GameSense Scan 8を診断する',
      ctaIcon: 'chart',
    };
  return `
    <aside class="cross-scan-panel" aria-label="もう1つの診断への案内">
      <span class="cross-scan-eyebrow">${icon('zap')}${target.eyebrow}</span>
      <strong>${target.title}</strong>
      <p>${target.body}</p>
      <a class="primary-link cross-scan-cta" href="${target.href}">${icon(target.ctaIcon)}${target.cta}</a>
      <small>${icon('spark')}両方の結果が揃うと、<a href="results.html#gamer-id-card-panel">「ゲーマー名刺」</a>を1枚にまとめてシェアできます。</small>
    </aside>
  `;
}

function renderGamerMbtiResult(type, scores) {
  const compatiblePartners = getMbtiCompatiblePartners(type.code);
  return `
    <div class="result-block result-sequence is-revealing gamer-mbti-result">
      ${renderResultReveal({
        name: type.title,
        revealLabel: 'GAMER TYPE SCAN',
        revealHeadline: 'プレイ人格ログを照合中...',
        revealImage: `assets/types/${type.code.toLowerCase()}.png?v=2`,
        revealPixel: true,
      })}
      <div class="result-content">
        ${renderResultCardHero('mbti', `
          <div class="result-kicker">${icon('user')}GAMER MBTI TYPE</div>
          <h3 id="mbti-quiz-title">${type.title}</h3>
          <div class="result-status-row">
            ${renderRarityBadge(getMbtiRarity(type.code))}
            ${renderNightOwlBadge()}
          </div>
          <div class="mbti-code-note" aria-label="ゲーマータイプ補足コード">
            <span>${icon('tag')}参考コード</span>
            <strong>${type.code}</strong>
          </div>
          <p class="result-catch">${type.catchline}</p>
          <p>${type.summary}</p>
          <div class="result-actions result-actions-top">
            <a class="primary-link" href="gamer-mbti-${type.code.toLowerCase()}.html">${icon('arrow')}このタイプを深掘りする</a>
            ${renderShareButtons('mbti', 'top')}
          </div>
        `)}
        ${renderFigureStage(mbtiCharImg(type.code), type.title)}
        ${renderGamerMbtiAxisGrid(scores)}
        <section class="mbti-result-grid" aria-label="ゲーマーMBTI結果詳細">
          <article class="result-card"><div class="card-head"><p class="card-label">${icon('spark')}才能ラベル</p><span>01</span></div><h3>ゲーム内で光るあなたらしさ</h3><p>${type.strength}</p></article>
          <article class="result-card"><div class="card-head"><p class="card-label">${icon('trophy')}克服ポイント</p><span>02</span></div><h3>弱みに見える才能の使い方</h3><p>${type.growth}</p></article>
          <article class="result-card"><div class="card-head"><p class="card-label">${icon('gamepad')}おすすめロール</p><span>03</span></div><h3>${type.role}</h3><p>あなたの判断基準とプレイ温度が出やすいポジションです。</p></article>
        </section>
        <details class="result-more">
          <summary>${icon('arrow')}相性傾向・注意点・おすすめゲームも見る</summary>
          <div class="mbti-result-grid">
            <article class="result-card"><div class="card-head"><p class="card-label">${icon('link')}相性傾向</p><span>04</span></div><h3>組むと噛み合いやすい相手</h3><p>${type.partner}</p></article>
            <article class="result-card result-card-wide"><div class="card-head"><p class="card-label">${icon('shield')}ギスギス回避メモ</p><span>05</span></div><h3>違いを知ると神コンビになる</h3><p>${type.caution}</p></article>
            <article class="result-card result-card-wide"><div class="card-head"><p class="card-label">${icon('gamepad')}ゲーム紹介</p><span>06</span></div><h3>気軽にチェックするならこの4本</h3><p>診断結果に近い雰囲気のゲームを、軽い紹介としてまとめています。気になるジャンルを探す入口として見てください。</p>${renderGameSuggestionList(type.games)}</article>
          </div>
        </details>
        ${renderCompatiblePartnersPanel(compatiblePartners, type.title)}
        ${renderCrossScanPanel('mbti')}
        <div class="mbti-compat-note">
          <span>${icon('chat')}MBTI風相性メモ</span>
          <p>T型は改善案を愛として出しがちで、F型はまず共感を求めがちです。違いを責めるより、「今は共感」「次に改善」と順番を分けると、ゲームの空気が一気に整います。</p>
        </div>
        <div class="theory-note">
          <span>${icon('shield')}ENTERTAINMENT DIAGNOSIS</span>
          <p>この診断はMBTI風の分類をゲーム内の行動傾向へ翻訳したエンタメ診断です。公式なMBTI検査や心理検査ではありません。</p>
        </div>
        <div class="result-actions">
          <a class="primary-link" href="gamer-mbti-${type.code.toLowerCase()}.html">${icon('arrow')}このタイプを深掘りする</a>
          ${renderShareButtons('mbti')}
          <button class="ghost-button" type="button" id="reset-mbti-quiz">${icon('target')}もう一度診断</button>
          <a class="ghost-link" href="results.html#mbti-results">${icon('list')}16タイプ一覧</a>
        </div>
      </div>
    </div>
  `;
}

function tagList(items) {
  return `<div class="tag-list">${items.map((item) => `<span>${icon('tag')}${item}</span>`).join('')}</div>`;
}

function miniGuideList(items, itemIcon = 'check') {
  return `<div class="mini-guide-list">${items.map((item) => `<span>${icon(itemIcon)}${item}</span>`).join('')}</div>`;
}

function pipoBanter(text, label = 'ピポ') {
  return `
    <div class="pipo-banter">
      <img src="assets/pipo-gag.webp" alt="" width="960" height="640" loading="lazy" decoding="async" />
      <div>
        <span>${icon('spark')}${label} LOG</span>
        <p>${text}</p>
        <div class="pipo-log-chips" aria-label="ピポ解析タグ">
          <small>${icon('link')}SYNC</small>
          <small>${icon('chat')}VOICE</small>
          <small>${icon('target')}MOOD</small>
        </div>
      </div>
    </div>
  `;
}

function renderGamePicks(profile) {
  return `
    <div class="game-pick-list">
      ${profile.gameNotes.map(([title, reason]) => `
        <div class="game-pick">
          <strong>${icon('gamepad')}${title}</strong>
          <small>${reason}</small>
        </div>
      `).join('')}
    </div>
  `;
}

const gameGenreLabels = {
  'VALORANT': 'タクティカルFPS',
  'Apex Legends': 'バトロワFPS',
  'THE FINALS': '破壊系FPS',
  'Overwatch 2': 'チームシューター',
  'Marvel Rivals': 'ヒーローシューター',
  'Escape from Tarkov': '脱出シューター',
  'Rainbow Six Siege': '戦術FPS',
  'Street Fighter 6': '格闘',
  'Rocket League': 'スポーツ対戦',
  'League of Legends': 'MOBA',
  'Dota 2': 'MOBA',
  'Teamfight Tactics': 'オートバトラー',
  'Civilization VI': '4X戦略',
  'Crusader Kings III': '歴史ストラテジー',
  'Against the Storm': 'ローグライト都市建設',
  'RimWorld': 'コロニーシム',
  'Factorio': '工場自動化',
  'Satisfactory': '3D工場クラフト',
  'Dyson Sphere Program': '宇宙工場',
  'Oxygen Not Included': '基地運営シム',
  'Minecraft': 'サンドボックス',
  'Terraria': '2Dサンドボックス',
  'Valheim': 'サバイバルクラフト',
  'Palworld': 'サバイバルクラフト',
  'No Man’s Sky': '探索サバイバル',
  'Stardew Valley': 'スローライフ',
  'Spiritfarer': '物語/癒し',
  'Dave the Diver': '探索/経営',
  'DREDGE': '探索アドベンチャー',
  'Baldur’s Gate 3': 'TRPG/RPG',
  'Disco Elysium': 'ナラティブRPG',
  'Final Fantasy XIV': 'MMORPG',
  'Monster Hunter: World': '協力アクション',
  'Monster Hunter Wilds': '協力アクション',
  'Deep Rock Galactic': '協力FPS',
  'Helldivers 2': '協力TPS',
  'It Takes Two': '協力アドベンチャー',
  'PICO PARK': '協力パズル',
  'Overcooked! 2': '協力カオス',
  'PlateUp!': '協力経営',
  'Unrailed!': '協力アクション',
  'Party Animals': 'パーティー',
  'Lethal Company': '協力ホラー',
  'Phasmophobia': '協力ホラー',
  'Content Warning': '協力ホラー',
  'Among Us': '正体隠匿',
  'Goose Goose Duck': '正体隠匿',
  'Town of Salem 2': '心理戦',
  'Slay the Spire': 'カードローグライト',
  'Balatro': 'ポーカーローグライト',
  'Hades': 'アクションローグライト',
  'Risk of Rain 2': '協力ローグライト',
  'Vampire Survivors': 'サバイバー系',
  'Dead Cells': 'アクションローグライト',
  'The Binding of Isaac: Rebirth': 'ローグライク',
  'Inscryption': 'カード/心理戦',
  'Keep Talking and Nobody Explodes': '通話協力',
};

function getLightGameIntro(game) {
  const genre = gameGenreLabels[game] || 'PC/Steam候補';
  if (genre.includes('FPS') || genre.includes('シューター')) return `${genre}。撃ち合いとチーム連携を短い試合で味わいやすいタイトルです。`;
  if (genre.includes('MOBA') || genre.includes('オートバトラー')) return `${genre}。役割、構成、集団戦の読み合いをじっくり楽しめます。`;
  if (genre.includes('戦略') || genre.includes('ストラテジー') || genre.includes('シム') || genre.includes('工場') || genre.includes('基地') || genre.includes('都市')) return `${genre}。考える時間が楽しい、PCゲームらしいじっくり系です。`;
  if (genre.includes('協力') || genre.includes('通話')) return `${genre}。フレンドと声をかけながら遊びやすいタイトルです。`;
  if (genre.includes('ローグ') || genre.includes('サバイバー')) return `${genre}。1プレイごとの変化と試行錯誤を楽しめます。`;
  if (genre.includes('サンド') || genre.includes('サバイバル') || genre.includes('クラフト') || genre.includes('スロー') || genre.includes('探索')) return `${genre}。自分のペースで寄り道や探索を楽しめるタイトルです。`;
  if (genre.includes('格闘') || genre.includes('スポーツ')) return `${genre}。短い対戦で上達や駆け引きが見えやすいタイトルです。`;
  if (genre.includes('正体') || genre.includes('心理')) return `${genre}。通話や読み合いで盛り上がりやすいパーティー系です。`;
  if (genre.includes('RPG') || genre.includes('MMO') || genre.includes('物語') || genre.includes('ナラティブ')) return `${genre}。物語や世界観をじっくり味わえるタイトルです。`;
  if (genre.includes('パーティー') || genre.includes('パズル') || genre.includes('カオス')) return `${genre}。初回でも笑いが起きやすく、軽く遊びやすいタイトルです。`;
  return `${genre}。気になった時にストアで雰囲気を見てみる候補です。`;
}

function renderGameSuggestionList(games) {
  return `
    <div class="game-pick-list">
      ${games.slice(0, 4).map((game) => `
        <div class="game-pick">
          <strong>${icon('gamepad')}${game}</strong>
          <small>${getLightGameIntro(game)}</small>
        </div>
      `).join('')}
    </div>
  `;
}

function renderScoreGrid(scores, labels) {
  return Object.keys(labels).map((key) => {
    const value = Math.min(100, scores[key] * 12);
    const scoreIcon = traitIcons[key] || pcNeedIcons[key] || senseIcons[key] || 'target';
    const width = labels === senseLabels ? Math.max(4, scores[key] || 0) : value;
    return `<div class="score-row"><span class="score-label">${icon(scoreIcon)}${labels[key]}</span><div class="mini-track"><span style="width:${width}%"></span></div></div>`;
  }).join('');
}

function getMaxScores(questionList, field, keys) {
  const maxScores = Object.fromEntries(keys.map((key) => [key, 0]));
  questionList.forEach((question) => {
    keys.forEach((key) => {
      const best = Math.max(...question.options.map((option) => option[field]?.[key] || 0));
      maxScores[key] += best;
    });
  });
  return maxScores;
}

function normalizeScores(scores, maxScores, options = {}) {
  const floor = options.floor || 0;
  return Object.fromEntries(Object.keys(scores).map((key) => [
    key,
    Math.round(floor + (((scores[key] || 0) / Math.max(1, maxScores[key] || 1)) * (100 - floor))),
  ]));
}

function rankScores(scores) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1]);
}

// 希少度（レアリティ）計算。MBTIはMBTI理論分布ベースの出現率、
// GameSenseは8能力の重み付けから56アーキタイプ内での希少度ランクを算出する。
const MBTI_POPULATION = {
  ISFJ: 13.8, ESFJ: 12.3, ISTJ: 11.6, ISFP: 8.8, ESTJ: 8.7, ESFP: 8.5,
  ENFP: 8.1, ISTP: 5.4, INFP: 4.4, ESTP: 4.3, INTP: 3.3, ENTP: 3.2,
  ENFJ: 2.5, INTJ: 2.1, ENTJ: 1.8, INFJ: 1.5,
};

const SENSE_RARITY_WEIGHT = {
  awareness: 0.18, speed: 0.16, prediction: 0.14, spatial: 0.13,
  adaptation: 0.12, pattern: 0.11, resource: 0.09, mindgame: 0.07,
};

function rarityTierFromPercent(percent) {
  if (percent <= 2.5) return { tier: 'LEGENDARY', label: '超激レア', stars: 5, accent: 'legendary' };
  if (percent <= 5) return { tier: 'EPIC', label: '激レア', stars: 4, accent: 'epic' };
  if (percent <= 9) return { tier: 'RARE', label: 'レア', stars: 3, accent: 'rare' };
  return { tier: 'COMMON', label: '定番', stars: 2, accent: 'common' };
}

function getMbtiRarity(code) {
  const percent = MBTI_POPULATION[code] ?? 6;
  const tier = rarityTierFromPercent(percent);
  return {
    ...tier,
    percent,
    percentLabel: `全体の約${percent}%`,
    note: '16タイプの出現率（MBTI理論分布ベース）',
  };
}

function getSenseRarity(archetype) {
  const keys = Object.keys(SENSE_RARITY_WEIGHT);
  const denom = 1 - keys.reduce((sum, key) => sum + SENSE_RARITY_WEIGHT[key] ** 2, 0);
  const pairs = [];
  keys.forEach((primary) => keys.forEach((secondary) => {
    if (primary === secondary) return;
    const share = (SENSE_RARITY_WEIGHT[primary] * SENSE_RARITY_WEIGHT[secondary]) / denom;
    pairs.push([primary, secondary, share]);
  }));
  pairs.sort((a, b) => a[2] - b[2]);
  const total = pairs.length;
  const rank = pairs.findIndex(([primary, secondary]) => primary === archetype.primary && secondary === archetype.secondary) + 1;
  const safeRank = rank > 0 ? rank : Math.ceil(total / 2);
  const topPercent = Math.max(1, Math.round((safeRank / total) * 100));
  let tier;
  if (safeRank <= 6) tier = { tier: 'LEGENDARY', label: '超激レア', stars: 5, accent: 'legendary' };
  else if (safeRank <= 16) tier = { tier: 'EPIC', label: '激レア', stars: 4, accent: 'epic' };
  else if (safeRank <= 33) tier = { tier: 'RARE', label: 'レア', stars: 3, accent: 'rare' };
  else tier = { tier: 'COMMON', label: '王道', stars: 2, accent: 'common' };
  const percentLabel = tier.accent === 'common'
    ? 'みんなに愛される王道アーキタイプ'
    : `希少度 上位${topPercent}%`;
  // 星は希少度スコアとして 3.9〜5.0 の0.1刻みで表示（がっかり防止の下限3.9）。
  // 希少なアーキタイプほど5.0に近づく。
  const rating = Math.round((3.9 + (1 - (safeRank - 1) / Math.max(1, total - 1)) * 1.1) * 10) / 10;
  return {
    ...tier,
    rank: safeRank,
    total,
    percent: topPercent,
    percentLabel,
    rating,
    note: `全${total}アーキタイプ中${safeRank}番目の希少度`,
  };
}

function renderRarityBadge(rarity) {
  if (typeof rarity.rating === 'number') {
    const score = rarity.rating.toFixed(1);
    return `
      <div class="rarity-badge is-${rarity.accent} has-rating" role="img" aria-label="ゲームセンススコア ${score} / 5.0。${rarity.percentLabel}">
        <span class="rarity-tier">${icon('trophy')}SCORE</span>
        <span class="rarity-score"><span class="rarity-score-star">★</span><b>${score}</b><small>/ 5.0</small></span>
        <span class="rarity-percent">${icon('spark')}${rarity.percentLabel}</span>
      </div>
    `;
  }
  if (rarity.accent === 'common') {
    return `
      <div class="rarity-badge is-common" role="img" aria-label="${rarity.label}。${rarity.percentLabel}">
        <span class="rarity-tier">${icon('heart')}POPULAR<b>${rarity.label}</b></span>
        <span class="rarity-percent">${icon('spark')}${rarity.percentLabel}</span>
      </div>
    `;
  }
  const stars = '★'.repeat(rarity.stars) + '☆'.repeat(Math.max(0, 5 - rarity.stars));
  return `
    <div class="rarity-badge is-${rarity.accent}" role="img" aria-label="希少度 ${rarity.label}。${rarity.percentLabel}">
      <span class="rarity-tier">${icon('trophy')}${rarity.tier}<b>${rarity.label}</b></span>
      <span class="rarity-stars" aria-hidden="true">${stars}</span>
      <span class="rarity-percent">${icon('spark')}${rarity.percentLabel}</span>
    </div>
  `;
}

const RARITY_TIER_GRADE = { legendary: 'S', epic: 'A', rare: 'B', common: 'C' };

function rarityTierChip(rarity) {
  const grade = RARITY_TIER_GRADE[rarity.accent] || 'C';
  return `<span class="rarity-chip is-${rarity.accent}" aria-label="希少度ティア ${grade} ${rarity.label}"><b>${grade}</b>${rarity.label}</span>`;
}

function getSenseArchetype(normalizedScores) {
  const ranked = rankScores(normalizedScores);
  const primary = ranked[0]?.[0] || 'awareness';
  const secondary = ranked.find(([key]) => key !== primary)?.[0] || 'prediction';
  return getSenseArchetypeFromKeys(primary, secondary);
}

function getSenseArchetypeFromKeys(primary, secondary) {
  const preset = senseArchetypes[`${primary}_${secondary}`];
  const callsign = SENSE_CALLSIGNS[`${primary}_${secondary}`] || 'SCANNER';
  const alias = preset ? preset[0] : `${senseCoreNames[primary]}${senseStyleNames[secondary]}`;
  const base = {
    primary,
    secondary,
    callsign,
    alias,
    // 汎用の表示名。カッコ書きのalias併記はやめ、CALLSIGN単体で統一する。
    name: callsign,
  };
  if (preset) {
    return {
      ...base,
      catchline: preset[1],
      summary: preset[2],
    };
  }
  return {
    ...base,
    catchline: `${senseLabels[primary]}を軸に、${senseLabels[secondary]}で勝ち筋を広げるタイプ。`,
    summary: `あなたは${senseLabels[primary]}で強みを作り、${senseLabels[secondary]}を使って状況に合わせるゲーム脳です。得意な場面を言語化すると、さらに再現性が上がります。`,
  };
}

function renderRadarChart(scores, labels, icons) {
  const keys = Object.keys(labels);
  const size = 320;
  const center = size / 2;
  const radius = 104;
  const pointFor = (index, value = 100) => {
    const angle = (-90 + (360 / keys.length) * index) * (Math.PI / 180);
    const distance = radius * (value / 100);
    return [center + Math.cos(angle) * distance, center + Math.sin(angle) * distance];
  };
  const rings = [25, 50, 75, 100].map((value) => {
    const points = keys.map((_, index) => pointFor(index, value).join(',')).join(' ');
    return `<polygon points="${points}" class="radar-ring"></polygon>`;
  }).join('');
  const axes = keys.map((key, index) => {
    const [x, y] = pointFor(index, 100);
    const [lx, ly] = pointFor(index, 120);
    return `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" class="radar-axis"></line><text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle">${labels[key]}</text>`;
  }).join('');
  const scorePoints = keys.map((key, index) => pointFor(index, Math.max(4, scores[key] || 0)).join(',')).join(' ');
  const dots = keys.map((key, index) => {
    const value = Math.max(4, scores[key] || 0);
    const [x, y] = pointFor(index, value);
    const angleDeg = -90 + (360 / keys.length) * index;
    return `<circle cx="${x}" cy="${y}" r="4" class="radar-vertex" data-axis-key="${key}" data-axis-value="${scores[key] || 0}" data-axis-angle="${angleDeg}"><title>${labels[key]} ${scores[key] || 0}</title></circle>`;
  }).join('');
  return `
    <div class="sense-radar-card">
      <div class="radar-primary" data-radar-primary>
        <p class="radar-scan-status"><span class="radar-scan-dot" aria-hidden="true"></span><span data-radar-status-text>SCAN COMPLETE</span></p>
        <div class="radar-stage">
          <div class="radar-sweep-beam" data-radar-beam aria-hidden="true"></div>
          <svg class="radar-svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="8能力レーダーチャート">
            ${rings}
            ${axes}
            <polygon points="${scorePoints}" class="radar-score" data-radar-polygon></polygon>
            ${dots}
          </svg>
        </div>
      </div>
      ${renderAbilityTierList(scores, labels, icons)}
    </div>
  `;
}

// レーダー確定の瞬間を「1周スキャン」で見せる演出。各頂点はスイープ線が
// 通過した時にだけ確定するため、事前にHTMLへ描画済みの最終形をいったん
// 中心付近まで畳み、JSで元の位置へ戻す（reduced-motion/JS失敗時は
// 最終形がそのまま見える=安全側にフォールバックする）。
function runRadarSweep(card, reduced) {
  const primary = card.querySelector('[data-radar-primary]');
  const beam = card.querySelector('[data-radar-beam]');
  const polygon = card.querySelector('[data-radar-polygon]');
  const statusText = card.querySelector('[data-radar-status-text]');
  const vertices = Array.from(card.querySelectorAll('.radar-vertex'));
  if (!primary || !beam || !polygon || !vertices.length) return;

  const center = 160;
  const baseR = 104 * 0.08;
  const pointAt = (angleDeg, r) => {
    const rad = (angleDeg * Math.PI) / 180;
    return [center + Math.cos(rad) * r, center + Math.sin(rad) * r];
  };
  const points = vertices.map((el) => ({
    el,
    angle: Number(el.dataset.axisAngle),
    value: Number(el.dataset.axisValue) || 0,
    r: baseR,
    triggered: false,
    settled: false,
  }));

  const applyGeometry = () => {
    points.forEach((p) => {
      const [x, y] = pointAt(p.angle, p.r);
      p.el.setAttribute('cx', x);
      p.el.setAttribute('cy', y);
      p.el.setAttribute('r', p.triggered ? 4 : 2);
    });
    polygon.setAttribute('points', points.map((p) => pointAt(p.angle, p.r).join(',')).join(' '));
  };

  points.forEach((p) => p.el.classList.remove('is-hit'));
  applyGeometry();

  // OS側の「モーションを減らす」設定時は、回転スイープなど大きな動きは省くが、
  // 完全に静止画のまま(=壊れて見える)にはせず、短い一括フェードだけ見せる。
  if (reduced) {
    if (statusText) statusText.textContent = 'SCANNING…';
    const FADE_MS = 260;
    let fadeStart = null;
    const fadeFrame = (ts) => {
      if (fadeStart === null) fadeStart = ts;
      const t = Math.min((ts - fadeStart) / FADE_MS, 1);
      points.forEach((p) => {
        p.triggered = t > 0;
        p.r = baseR + (104 * (p.value / 100) - baseR) * t;
      });
      applyGeometry();
      if (t < 1) {
        window.requestAnimationFrame(fadeFrame);
      } else {
        points.forEach((p) => { p.settled = true; });
        if (statusText) statusText.textContent = 'SCAN COMPLETE';
      }
    };
    window.requestAnimationFrame(fadeFrame);
    return;
  }

  primary.classList.add('is-scanning');
  if (statusText) statusText.textContent = 'SCANNING…';

  const SWEEP_MS = 2200;
  const REVEAL_MS = 420;
  const easeOutBack = (t) => {
    const c1 = 1.7;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  let start = null;
  const frame = (ts) => {
    if (start === null) start = ts;
    const elapsed = ts - start;
    const progress = Math.min(elapsed / SWEEP_MS, 1);
    const sweepDeg = -90 + progress * 360;
    beam.style.transform = `rotate(${sweepDeg + 90}deg)`;

    points.forEach((p) => {
      if (!p.triggered && sweepDeg >= p.angle) {
        p.triggered = true;
        p.revealStart = ts;
        p.el.classList.add('is-hit');
      }
      if (p.triggered && !p.settled) {
        const rt = Math.min((ts - p.revealStart) / REVEAL_MS, 1);
        p.r = baseR + (104 * (p.value / 100) - baseR) * easeOutBack(rt);
        if (rt >= 1) {
          p.settled = true;
          p.el.classList.remove('is-hit');
        }
      }
    });
    applyGeometry();

    const stillTweening = points.some((p) => p.triggered && !p.settled);
    if (progress < 1 || stillTweening) {
      window.requestAnimationFrame(frame);
    } else {
      primary.classList.remove('is-scanning');
      beam.style.transform = '';
      if (statusText) statusText.textContent = 'SCAN COMPLETE';
    }
  };
  window.requestAnimationFrame(frame);
}

const ABILITY_TIER_DEFS = [
  ['S', '覚醒級'],
  ['A', '主戦力'],
  ['B', '安定'],
  ['C', '発展途上'],
  ['D', '伸びしろ'],
];

function abilityTierGrade(value) {
  if (value >= 80) return 'S';
  if (value >= 68) return 'A';
  if (value >= 56) return 'B';
  if (value >= 44) return 'C';
  return 'D';
}

function renderAbilityTierList(scores, labels, icons) {
  const grouped = { S: [], A: [], B: [], C: [], D: [] };
  rankScores(scores).forEach(([key, value]) => {
    grouped[abilityTierGrade(value)].push([key, value]);
  });
  const rows = ABILITY_TIER_DEFS.map(([grade, note]) => {
    const items = grouped[grade];
    const slots = items.length
      ? items.map(([key, value]) => `
          <span class="tier-slot">${icon(icons[key] || 'target')}<b>${labels[key]}</b><em data-count-to="${value}">${value}</em></span>
        `).join('')
      : '<span class="tier-slot is-empty">—</span>';
    return `
      <div class="ability-tier-row" data-grade="${grade}">
        <span class="tier-grade tier-${grade}">${grade}<small>${note}</small></span>
        <div class="tier-slots">${slots}</div>
      </div>
    `;
  }).join('');
  return `
    <div class="ability-tier-list" aria-label="8能力ティアリスト">
      <div class="tier-list-caption"><span>${icon('trophy')}ABILITY TIER LIST</span><small>スコアをS〜Dに格付け</small></div>
      ${rows}
    </div>
  `;
}

function renderTopSenseAbilities(scores) {
  const rankLabels = ['MAIN CORE', 'SECOND CORE', 'THIRD EDGE'];
  const ranked = rankScores(scores).slice(0, 3);
  return `
    <section class="top-ability-panel" aria-label="上位3つのゲームセンス能力">
      <div class="top-ability-head">
        <span>${icon('spark')}TOP 3 ABILITIES</span>
        <strong>レーダーで強く出た能力</strong>
        <p>1位と2位があなたのアーキタイプを作る主軸です。3位は、勝ち方に個性を足すサブ武器として見てください。</p>
      </div>
      <div class="top-ability-grid">
        ${ranked.map(([key, value], index) => {
          const profile = senseAbilityProfiles[key];
          const rank = index + 1;
          return `
            <article class="top-ability-card rank-${rank}">
              <div class="top-ability-rank">
                <span>${String(rank).padStart(2, '0')}</span>
                <small>${rankLabels[index]}</small>
                <b data-count-to="${value}">${value}</b>
              </div>
              <h3>${icon(senseIcons[key] || 'target')}${senseLabels[key]}</h3>
              <p>${profile.gift}</p>
              <div class="top-ability-tip">
                <strong>伸ばすなら</strong>
                <span>${profile.growth}</span>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function renderSenseTheoryNote() {
  return `
    <div class="theory-note">
      <span>${icon('shield')}REFERENCE MODEL</span>
      <p>この診断は、状況認識理論、認識主導意思決定、空間認知、熟達研究などの考え方を参考にしたエンタメ診断です。医療・心理検査ではなく、プレイ傾向を楽しく理解するためのコンテンツです。</p>
    </div>
  `;
}

function getSenseMatrix(archetype) {
  const primary = senseAbilityProfiles[archetype.primary];
  const secondary = senseAbilityProfiles[archetype.secondary];
  const primaryLabel = senseLabels[archetype.primary];
  const secondaryLabel = senseLabels[archetype.secondary];
  return {
    strength: `${primary.gift} さらに${secondaryLabel}が重なることで、ただ得意なだけではなく「勝ち方として再現しやすい」才能になっています。`,
    softWeakness: `${primary.softWeakness} これは欠点というより、${primaryLabel}の感度が高いからこそ起きる調整ポイントです。`,
    growth: `${primary.growth} あわせて${secondaryLabel}の使い方として、${secondary.growth}`,
    role: `${primary.role} サブ武器の${secondaryLabel}を活かすなら、${secondary.role}`,
    affirmation: `${primary.affirmation} ${secondary.affirmation}`,
  };
}

function renderSenseMatrix(archetype) {
  const matrix = getSenseMatrix(archetype);
  const primaryCards = [
    ['spark', 'あなたの強み', matrix.strength],
    ['trophy', '伸ばし方', matrix.growth],
  ];
  const moreCards = [
    ['shield', '克服ポイント', matrix.softWeakness, 'soft'],
    ['gamepad', '活きる役割', matrix.role],
  ];
  const renderCard = ([cardIcon, title, text, emphasis]) => `
    <article class="sense-matrix-card"${emphasis ? ` data-emphasis="${emphasis}"` : ''}>
      <span>${icon(cardIcon)}${title}</span>
      <p>${text}</p>
    </article>
  `;
  return `
    <section class="sense-matrix-panel" aria-label="アーキタイプ詳細">
      <div class="sense-matrix-head">
        <span>${icon('chart')}SELF MATRIX</span>
        <strong>${archetype.name}の特徴</strong>
        <p>弱みに見える部分にも、あなたらしいプレイスタイルの種があります。この分析結果は、あなたの良さを残したまま伸ばすためのガイドです。</p>
      </div>
      <div class="sense-matrix-grid">
        ${primaryCards.map(renderCard).join('')}
      </div>
      <details class="result-more">
        <summary>${icon('arrow')}克服ポイント・活きる役割も見る</summary>
        <div class="sense-matrix-grid">
          ${moreCards.map(renderCard).join('')}
        </div>
        <div class="sense-affirmation">
          <img src="assets/pipo-scan.webp" alt="" width="768" height="768" loading="lazy" decoding="async" />
          <div>
            <span>${icon('spark')}ピポのワンポイントメモ</span>
            <p>ピポから見ると、${matrix.affirmation} その持ち味は消さずに、試合で使いやすい形に整えていこう。</p>
          </div>
        </div>
      </details>
    </section>
  `;
}

function renderSenseResult(archetype, normalizedScores) {
  const primaryLabel = senseLabels[archetype.primary];
  const secondaryLabel = senseLabels[archetype.secondary];
  const topGames = senseGameSuggestions(archetype.primary, archetype.secondary);
  const compatiblePartners = getSenseCompatiblePartners(archetype);
  return `
    <div class="result-block result-sequence is-revealing sense-result-block">
      ${renderResultReveal({
        name: archetype.name,
        revealLabel: 'GAMESENSE SCAN 8',
        revealHeadline: '8能力のシグナルを解析中...',
        revealImage: 'assets/pipo-scan.webp',
      })}
      <div class="result-content">
        ${renderResultCardHero('sense', `
          <div class="result-kicker">${icon('chart')}CALLSIGN</div>
          <h3 id="sense-quiz-title" class="sense-callsign">${archetype.callsign}</h3>
          <p class="sense-callsign-alias">${primaryLabel} × ${secondaryLabel}</p>
          <div class="result-status-row">
            ${renderRarityBadge(getSenseRarity(archetype))}
            ${renderNightOwlBadge()}
          </div>
          <p class="result-catch">${archetype.catchline}</p>
          <p>${archetype.summary}</p>
          <div class="result-actions result-actions-top">
            ${renderShareButtons('sense', 'top')}
          </div>
        `)}
        ${renderTopSenseAbilities(normalizedScores)}
        <section class="radar-reveal-section" aria-label="8能力レーダーチャート">
          <div class="top-ability-head">
            <span>${icon('chart')}GAMESENSE SCAN 8</span>
            <strong>8能力レーダー</strong>
            <p>スキャンした8つの能力を1周のレーダーで確認できます。数値はティアリストの並びと同じです。</p>
          </div>
          ${renderRadarChart(normalizedScores, senseLabels, senseIcons)}
        </section>
        ${renderSenseMatrix(archetype)}
        <div class="sense-result-grid">
          <article class="result-insight-card">
            <span>${icon(senseIcons[archetype.primary])}コア才能</span>
            <p>${primaryLabel}が一番強い軸です。画面上の情報、展開、勝ち筋のどこに意識が向きやすいかを表します。</p>
          </article>
          <article class="result-insight-card">
            <span>${icon(senseIcons[archetype.secondary])}戦い方のクセ</span>
            <p>${secondaryLabel}がサブ武器です。コア才能をどう使うか、どんな場面で強みが出るかを決めます。</p>
          </article>
          <article class="result-insight-card">
            <span>${icon('gamepad')}ゲーム紹介</span>
            <p>診断結果に近い雰囲気のゲームを4本だけ軽く紹介します。おすすめの断定ではなく、次に遊ぶ候補を探すメモとして見てください。</p>
            ${renderGameSuggestionList(topGames)}
          </article>
        </div>
        ${renderCompatiblePartnersPanel(compatiblePartners, `${primaryLabel} × ${secondaryLabel}`)}
        ${renderCrossScanPanel('sense')}
        ${renderSenseTheoryNote()}
        <div class="result-actions">
          ${renderShareButtons('sense')}
          <button class="ghost-button" type="button" id="reset-sense-quiz">${icon('target')}もう一度診断</button>
        </div>
      </div>
    </div>
  `;
}

function senseGameSuggestions(primary, secondary) {
  const buckets = {
    awareness: ['VALORANT', 'Phasmophobia', 'Deep Rock Galactic', 'Rainbow Six Siege'],
    prediction: ['Teamfight Tactics', 'Against the Storm', 'Apex Legends', 'Slay the Spire'],
    pattern: ['Balatro', 'Slay the Spire', 'Street Fighter 6', 'Inscryption'],
    spatial: ['Apex Legends', 'Valheim', 'Monster Hunter: World', 'Satisfactory'],
    speed: ['VALORANT', 'Overwatch 2', 'Street Fighter 6', 'Risk of Rain 2'],
    resource: ['Factorio', 'Civilization VI', 'RimWorld', 'Oxygen Not Included'],
    mindgame: ['Among Us', 'Goose Goose Duck', 'Town of Salem 2', 'Street Fighter 6'],
    adaptation: ['Hades', 'Risk of Rain 2', 'Rocket League', 'Vampire Survivors'],
  };
  return [...new Set([...(buckets[primary] || []), ...(buckets[secondary] || [])])].slice(0, 4);
}

function getSenseShareMeta(archetype, normalizedScores) {
  const ranked = rankScores(normalizedScores);
  const topThree = ranked.slice(0, 3);
  const lowest = [...ranked].sort((a, b) => a[1] - b[1])[0] || ['awareness', 0];
  const average = Math.round(ranked.reduce((sum, [, value]) => sum + value, 0) / ranked.length);
  const topAverage = Math.round(topThree.reduce((sum, [, value]) => sum + value, 0) / topThree.length);
  const peakGap = (topThree[0]?.[1] || 0) - (topThree[1]?.[1] || 0);
  const style = peakGap >= 12 ? '一点突破型' : peakGap <= 4 ? '万能バランス型' : '二刀流コア型';
  const primaryLabel = senseLabels[archetype.primary] || '上位能力';
  const secondaryLabel = senseLabels[archetype.secondary] || 'サブ能力';
  const lowestLabel = senseLabels[lowest[0]] || '伸びしろ';

  return {
    style,
    average,
    topAverage,
    topThree,
    lowest,
    weapon: `${primaryLabel}で流れを掴み、${secondaryLabel}で勝ち筋を伸ばす。`,
    flexLine: `${style} / ${primaryLabel} × ${secondaryLabel} / バランス${average}`,
    growthLine: `伸びしろ: ${lowestLabel}を磨くと、さらに完成度が上がります。`,
  };
}

// 8能力 → 相性のいいデバイスガイド。上位能力に応じて紹介デバイスを出し分ける。
const SENSE_GEAR_MAP = {
  awareness: { guide: 'gaming-monitor-guide.html', icon: 'monitor', title: 'モニターの選び方', small: '視認性と情報量を底上げ', reason: '状況認識が強いあなたは、画面上の小さな変化を拾えるほど判断が活きます。高リフレッシュのモニターは、敵の出入りや味方の位置変化を見逃しにくくする土台です。' },
  prediction: { guide: 'gaming-headset-guide.html', icon: 'headset', title: 'ヘッドセットの選び方', small: '音で次の展開を先取り', reason: '未来予測が強いあなたは、足音や気配から次の動きを読めます。定位の良いヘッドセットは、その先読みの精度を一段引き上げます。' },
  pattern: { guide: 'gaming-keyboard-guide.html', icon: 'cpu', title: 'キーボードの選び方', small: '入力の再現性を高める', reason: 'パターン認識が強いあなたは、同じ入力を同じ精度で返せるほど崩れません。磁気軸・ラピッドトリガーは、狙った操作の再現性を支えます。' },
  spatial: { guide: 'gaming-mousepad-guide.html', icon: 'target', title: 'マウスパッドの選び方', small: '振り向きと追いエイムの再現性', reason: '空間把握が強いあなたは、距離や角度を動きに変えられます。大型マウスパッドは、振り向き幅を確保して同じ動きを再現しやすくします。' },
  speed: { guide: 'gaming-mouse-guide.html', icon: 'mouse', title: 'マウスの選び方', small: '判断を操作へ最短で乗せる', reason: '判断速度が強いあなたは、決めた瞬間に動かせる入力が武器です。軽量・低遅延のマウスは、判断から操作までのズレを減らします。' },
  resource: { guide: 'gaming-monitor-guide.html', icon: 'monitor', title: 'モニターの選び方', small: '情報を一望して配分を管理', reason: 'リソース管理が強いあなたは、残り時間や人数差を俯瞰できます。広い視界のモニターは、その配分判断を後押しします。' },
  mindgame: { guide: 'gaming-headset-guide.html', icon: 'headset', title: 'ヘッドセットの選び方', small: '相手の意図と気配を拾う', reason: '心理戦が強いあなたは、音と間から相手の狙いを読めます。定位の良いヘッドセットは、駆け引きを有利に進める情報源になります。' },
  adaptation: { guide: 'gaming-keyboard-guide.html', icon: 'cpu', title: 'キーボードの選び方', small: '反復練習を支える入力環境', reason: '学習適応力が強いあなたは、練習した分だけ動きが洗練されます。疲れにくく安定した入力環境は、その反復を後押しします。' },
};

// 上位能力からデバイスが3種に満たない/重複した場合の補完枠（汎用リンク）。
const SENSE_GEAR_FALLBACK = [
  { guide: 'gaming-monitor-guide.html', icon: 'monitor', title: 'モニターの選び方', small: '視認性と反応の余裕を作る', reason: '高リフレッシュのモニターは、見えてから動くまでの余裕を作る土台です。' },
  { guide: 'gaming-mouse-guide.html', icon: 'mouse', title: 'マウスの選び方', small: '判断を操作に乗せやすくする', reason: '軽量マウスは、思った方向へ素直に動かしやすく、操作のズレを減らします。' },
  { guide: 'gaming-headset-guide.html', icon: 'headset', title: 'ヘッドセットの選び方', small: '音の情報を逃さない', reason: '定位の良いヘッドセットは、足音や位置の手がかりを拾いやすくします。' },
];

// 上位能力からデバイスガイドを最大3種（重複なし）選ぶ。
function getSenseGearPicks(sortedAbilities) {
  const picks = [];
  const usedGuides = new Set();
  sortedAbilities.forEach(([key]) => {
    if (picks.length >= 3) return;
    const gear = SENSE_GEAR_MAP[key];
    if (!gear || usedGuides.has(gear.guide)) return;
    usedGuides.add(gear.guide);
    picks.push(gear);
  });
  SENSE_GEAR_FALLBACK.forEach((gear) => {
    if (picks.length >= 3 || usedGuides.has(gear.guide)) return;
    usedGuides.add(gear.guide);
    picks.push(gear);
  });
  return picks;
}

// デバイスガイドごとの「本命」製品。診断結果から具体的な1台＋Amazon導線を出す。
const GEAR_PRODUCTS = {
  'gaming-monitor-guide.html': { name: 'LG UltraGear 27GS95QE-B', spec: '27型 / 240Hz / OLED', query: 'LG UltraGear 27GS95QE-B OLED' },
  'gaming-mouse-guide.html': { name: 'Razer Viper V3 Pro', spec: '54g / 8000Hz / 無線', query: 'Razer Viper V3 Pro' },
  'gaming-keyboard-guide.html': { name: 'Wooting 80HE', spec: '磁気軸 / ラピッドトリガー', query: 'Wooting 80HE' },
  'gaming-headset-guide.html': { name: 'HyperX Cloud III', spec: '低遅延 / 定位◎', query: 'HyperX Cloud III' },
  'gaming-mousepad-guide.html': { name: 'Logicool G640r', spec: '大型 / コントロール系', query: 'Logicool G640r マウスパッド' },
};

// 診断結果のギア項目。理由＋本命製品(Amazon)＋選び方ガイドへの導線をまとめる。
function renderGearItem(gear) {
  const product = GEAR_PRODUCTS[gear.guide];
  const prodBlock = product ? `
      <div class="gear-rec-prod">
        <span class="gear-rec-name"><b>本命</b><strong>${product.name}</strong><small>${product.spec}</small></span>
        <a class="gear-rec-buy" href="${amazonSearchUrl(product.query)}" target="_blank" rel="sponsored noopener noreferrer" data-affiliate="gear-${gear.guide}">${icon('cart')}Amazonで見る</a>
      </div>` : '';
  return `
    <div class="gear-rec">
      <span class="gear-rec-title">${icon(gear.icon)}${gear.title}</span>
      <small>${gear.small}</small>
      <em>${gear.reason}</em>
      ${prodBlock}
      <a class="gear-rec-guide" href="${gear.guide}">${icon('arrow')}選び方を詳しく</a>
    </div>
  `;
}

const GEAR_AFF_NOTE = '<p class="gear-aff-note">※「Amazonで見る」はAmazonアソシエイトのリンクを含みます。価格・在庫・仕様は各製品ページでご確認ください。</p>';

function renderSenseGearList(sortedAbilities) {
  const list = document.querySelector('#sense-gear-list');
  if (!list) return;
  list.innerHTML = getSenseGearPicks(sortedAbilities).map(renderGearItem).join('') + GEAR_AFF_NOTE;
}

// ゲーマーMBTIの4軸 → 相性のいいデバイスガイド。タイプコードの各軸から出し分ける。
const MBTI_GEAR_MAP = {
  E: { guide: 'gaming-headset-guide.html', icon: 'headset', title: 'ヘッドセットの選び方', small: '通話のノリを支える', reason: '外向プレイのあなたは、通話の温度がそのままプレイの熱量になります。装着感が良く声が届きやすいヘッドセットは、テンションを維持する土台です。' },
  I: { guide: 'gaming-monitor-guide.html', icon: 'monitor', title: 'モニターの選び方', small: '集中を切らさない視認性', reason: '集中と内省を大事にするあなたは、画面に没入できる環境で実力が出ます。高リフレッシュのモニターは、その集中をそのまま結果につなげます。' },
  S: { guide: 'gaming-mouse-guide.html', icon: 'mouse', title: 'マウスの選び方', small: '現場反応を操作に乗せる', reason: '現場反応型のあなたは、見えた瞬間に動ける入力が武器です。軽量・低遅延のマウスは、反応速度をそのまま結果に変えます。' },
  N: { guide: 'gaming-keyboard-guide.html', icon: 'cpu', title: 'キーボードの選び方', small: '構想を素早く実行に移す', reason: '未来構想型のあなたは、考えた作戦をすぐ行動に移せる入力環境が合います。反応の良いキーボードは、思考と操作のズレを減らします。' },
  T: { guide: 'gaming-mousepad-guide.html', icon: 'target', title: 'マウスパッドの選び方', small: '勝ち筋の再現性を支える', reason: '勝ち筋重視のあなたは、同じ動きを同じ精度で再現できるかが重要です。大型のマウスパッドは、振り向きや狙いの再現性を底上げします。' },
  F: { guide: 'gaming-headset-guide.html', icon: 'headset', title: 'ヘッドセットの選び方', small: '空気を拾う耳を支える', reason: '空気重視のあなたは、声のトーンや間から相手の気持ちを拾います。定位のいいヘッドセットは、その繊細な感覚をさらに活かします。' },
  J: { guide: 'gaming-monitor-guide.html', icon: 'monitor', title: 'モニターの選び方', small: '作戦を見渡す情報量', reason: '作戦遂行型のあなたは、盤面全体を見渡せるほど計画が機能します。広い視界のモニターは、その俯瞰力を後押しします。' },
  P: { guide: 'gaming-keyboard-guide.html', icon: 'cpu', title: 'キーボードの選び方', small: '即興の切り替えを支える', reason: '即興適応型のあなたは、状況に応じて操作を素早く切り替えます。反応の良いキーボードは、その場の判断をそのまま操作に反映します。' },
};

const MBTI_GEAR_FALLBACK = [
  { guide: 'gaming-monitor-guide.html', icon: 'monitor', title: 'モニターの選び方', small: '視認性と反応の余裕を作る', reason: '高リフレッシュのモニターは、見えてから動くまでの余裕を作る土台です。' },
  { guide: 'gaming-mouse-guide.html', icon: 'mouse', title: 'マウスの選び方', small: '判断を操作に乗せやすくする', reason: '軽量マウスは、思った方向へ素直に動かしやすく、操作のズレを減らします。' },
  { guide: 'gaming-headset-guide.html', icon: 'headset', title: 'ヘッドセットの選び方', small: '音の情報を逃さない', reason: '定位の良いヘッドセットは、通話や足音の手がかりを拾いやすくします。' },
];

// タイプコードの4軸からデバイスガイドを最大3種（重複なし）選ぶ。
function getMbtiGearPicks(code) {
  const picks = [];
  const usedGuides = new Set();
  [...code].forEach((letter) => {
    if (picks.length >= 3) return;
    const gear = MBTI_GEAR_MAP[letter];
    if (!gear || usedGuides.has(gear.guide)) return;
    usedGuides.add(gear.guide);
    picks.push(gear);
  });
  MBTI_GEAR_FALLBACK.forEach((gear) => {
    if (picks.length >= 3 || usedGuides.has(gear.guide)) return;
    usedGuides.add(gear.guide);
    picks.push(gear);
  });
  return picks;
}

function renderMbtiGearList(code) {
  const list = document.querySelector('#mbti-gear-list');
  if (!list) return;
  list.innerHTML = getMbtiGearPicks(code).map(renderGearItem).join('') + GEAR_AFF_NOTE;
}

function updatePostResultLab(archetype, normalizedScores) {
  const lab = document.querySelector('#post-result-lab');
  if (!lab) return;
  const sorted = Object.entries(normalizedScores).sort((a, b) => b[1] - a[1]);
  const lowest = [...sorted].sort((a, b) => a[1] - b[1])[0]?.[0] || 'awareness';
  const primaryLabel = senseLabels[archetype.primary] || '上位能力';
  const secondaryLabel = senseLabels[archetype.secondary] || 'サブ能力';
  const lowestLabel = senseLabels[lowest] || '状況認識';
  const shareMeta = getSenseShareMeta(archetype, normalizedScores);
  const resultType = document.querySelector('#post-result-type');
  const resultCore = document.querySelector('#post-result-core');
  const resultStyle = document.querySelector('#post-result-style');
  const resultWeapon = document.querySelector('#post-result-weapon');
  const trainingTitle = document.querySelector('#training-title');
  const trainingCopy = document.querySelector('#training-copy');
  const communityCopy = document.querySelector('#community-type-copy');

  lab.dataset.cardType = archetype.name;
  lab.dataset.cardCatch = archetype.catchline;
  lab.dataset.cardStyle = shareMeta.style;
  lab.dataset.cardAverage = String(shareMeta.average);
  lab.dataset.cardTopAverage = String(shareMeta.topAverage);
  lab.dataset.cardWeapon = shareMeta.weapon;
  lab.dataset.cardGrowth = shareMeta.growthLine;
  shareMeta.topThree.forEach(([key, value], index) => {
    lab.dataset[`cardTop${index + 1}`] = `${senseLabels[key]} ${value}`;
  });

  if (resultType) resultType.textContent = archetype.name;
  if (resultCore) resultCore.textContent = shareMeta.flexLine;
  if (resultStyle) resultStyle.textContent = shareMeta.style;
  if (resultWeapon) resultWeapon.textContent = shareMeta.weapon;
  renderSenseGearList(sorted);
  shareMeta.topThree.forEach(([key, value], index) => {
    const node = document.querySelector(`#post-result-top${index + 1}`);
    if (node) node.textContent = `${String(index + 1).padStart(2, '0')} ${senseLabels[key]} ${value}`;
  });
  if (trainingTitle) trainingTitle.textContent = `あなたの${lowestLabel}を高める1分間トレーニング`;
  if (trainingCopy) trainingCopy.textContent = `${lowestLabel}は、短い反復で感覚を掴みやすい能力です。光ったパネルを追って、変化に気づく回路を温めます。`;
  if (communityCopy) communityCopy.textContent = `あなたは「${primaryLabel} × ${secondaryLabel}」の組み合わせ。結果画面の相性TOP3から、噛み合いやすい相棒タイプを見つけられます。`;
}

const QUIZ_MILESTONES = [25, 50, 75];
// 進捗の節目（25/50/75%）で一瞬フラッシュ、最終問でパネルをゴールド化して離脱を防ぐ。
function applyQuizProgressFx(prefix, progress, answered, total) {
  const bar = document.querySelector(`#${prefix}-progress`);
  if (!bar) return;
  const track = bar.closest('.progress-track');
  const panel = bar.closest('.quiz-panel');
  panel?.classList.toggle('final-question', total > 0 && answered === total - 1);

  const prev = Number(bar.dataset.lastProgress || 0);
  bar.dataset.lastProgress = String(progress);
  if (!track) return;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  const hit = QUIZ_MILESTONES.filter((m) => prev < m && progress >= m).pop();
  if (!hit) return;
  track.classList.remove('milestone-hit');
  void track.offsetWidth; // reflow to restart the flash animation
  track.dataset.milestone = String(hit);
  track.classList.add('milestone-hit');
  window.setTimeout(() => track.classList.remove('milestone-hit'), 900);
}

function renderSenseQuiz() {
  const keys = Object.keys(senseLabels);
  const rawScores = getScores(senseAnswers, senseQuestions, 'sense', keys);
  const maxScores = getMaxScores(senseQuestions, 'sense', keys);
  const normalizedScores = normalizeScores(rawScores, maxScores, { floor: 38 });
  const archetype = getSenseArchetype(normalizedScores);
  const complete = senseAnswers.length === senseQuestions.length;
  const progress = Math.round((senseAnswers.length / senseQuestions.length) * 100);
  document.body.classList.toggle('sense-result-ready', complete);

  document.querySelector('#sense-step').textContent = complete ? '結果' : `質問 ${senseAnswers.length + 1} / ${senseQuestions.length}`;
  document.querySelector('#sense-progress-text').textContent = `${progress}%`;
  document.querySelector('#sense-progress').style.width = `${progress}%`;
  applyQuizProgressFx('sense', progress, senseAnswers.length, senseQuestions.length);
  document.querySelector('#sense-preview-name').textContent = archetype.name;
  document.querySelector('#sense-preview-catch').textContent = archetype.catchline;
  document.querySelector('#sense-score-preview').innerHTML = renderScoreGrid(normalizedScores, senseLabels);

  if (!complete) {
    const question = senseQuestions[senseAnswers.length];
    document.querySelector('#sense-quiz-box').innerHTML = `
      <div class="question-dialogue">
        <img src="assets/pipo-result.webp" alt="" width="960" height="640" loading="lazy" decoding="async" />
        <div>
          <span>${icon('chart')}ピポの認知スキャン</span>
          <p>24問でゲーム中の認知スキルを分解します。直感に近い選択をどうぞ。</p>
          <h3 id="sense-quiz-title">${question.title}</h3>
        </div>
      </div>
      <div class="option-list">
        ${question.options.map((option, index) => `
          <button class="option-button" type="button" data-sense-answer="${index}">
            <span class="option-main"><span class="option-icon">${icon(['target', 'spark', 'zap'][index])}</span><span><strong>${option.label}</strong><small>${option.detail}</small></span></span><span class="option-arrow">${icon('arrow')}</span>
          </button>
        `).join('')}
      </div>
      <div class="quiz-nav">
        ${senseAnswers.length > 0 ? `<button class="ghost-button" type="button" id="back-sense-quiz">${icon('back')}1つ戻る</button>` : ''}
      </div>
    `;
    document.querySelectorAll('[data-sense-answer]').forEach((button) => {
      button.addEventListener('click', () => {
        if (senseAnswers.length === 0) trackEvent('sense_diagnosis_start');
        senseAnswers.push(Number(button.dataset.senseAnswer));
        saveQuizAnswers('sense', senseAnswers);
        renderSenseQuiz();
      });
    });
    document.querySelector('#back-sense-quiz')?.addEventListener('click', () => {
      senseAnswers.pop();
      saveQuizAnswers('sense', senseAnswers);
      renderSenseQuiz();
    });
    return;
  }

  trackEvent('sense_diagnosis_complete', { archetype: archetype.name, primary: archetype.primary, secondary: archetype.secondary, nightOwl: isNightOwlHour() });
  saveQuizAnswers('sense', senseAnswers);
  const senseResultHash = `#sense=${archetype.primary}_${archetype.secondary}`;
  setResultHash(senseResultHash);
  document.querySelector('#sense-quiz-box').innerHTML = renderSenseResult(archetype, normalizedScores);
  updatePostResultLab(archetype, normalizedScores);
  activateResultReveal();
  document.querySelector('#reset-sense-quiz').addEventListener('click', () => {
    senseAnswers = [];
    clearQuizAnswers('sense');
    setResultHash('#gamesense');
    renderSenseQuiz();
  });
  attachShareHandlers('sense', {
    text: `GameSense Scan 8で「${archetype.name}」でした！${archetype.catchline}`,
    url: typeShareUrl(`gamesense.html#sense=${archetype.primary}_${archetype.secondary}`),
    hashtags: 'GameSenseScan,GameSpecLab',
    title: 'GameSense Scan 8',
    track: { archetype: archetype.name },
  });
  attachResultCardHero('sense', getSenseCardData(archetype, normalizedScores), {
    text: `GameSense Scan 8で「${archetype.name}」でした！ ${typeShareUrl(`gamesense.html#sense=${archetype.primary}_${archetype.secondary}`)}`,
    title: 'GameSense Scan 8',
    track: { archetype: archetype.name },
  });
}

function renderGamerMbtiQuiz() {
  const keys = Object.keys(mbtiAxisLabels);
  const scores = getScores(gamerMbtiAnswers, mbtiQuestions, 'mbti', keys);
  const type = getGamerMbtiResult(scores);
  const previewReady = gamerMbtiAnswers.length > 0;
  const previewType = previewReady ? type : {
    code: '----',
    title: 'スキャン待機中',
    catchline: '回答するとゲーム内での16タイプを推定します。',
  };
  const previewScores = previewReady ? scores : { E: 1, I: 1, S: 1, N: 1, T: 1, F: 1, J: 1, P: 1 };
  const complete = gamerMbtiAnswers.length === mbtiQuestions.length;
  const progress = Math.round((gamerMbtiAnswers.length / mbtiQuestions.length) * 100);
  document.body.classList.toggle('gamer-mbti-result-ready', complete);

  document.querySelector('#mbti-step').textContent = complete ? '結果' : `質問 ${gamerMbtiAnswers.length + 1} / ${mbtiQuestions.length}`;
  document.querySelector('#mbti-progress-text').textContent = `${progress}%`;
  document.querySelector('#mbti-progress').style.width = `${progress}%`;
  applyQuizProgressFx('mbti', progress, gamerMbtiAnswers.length, mbtiQuestions.length);
  document.querySelector('#mbti-preview-code').textContent = previewType.code;
  document.querySelector('#mbti-preview-name').textContent = previewType.title;
  document.querySelector('#mbti-preview-catch').textContent = previewType.catchline;
  document.querySelector('#mbti-score-preview').innerHTML = renderGamerMbtiAxisGrid(previewScores);

  if (!complete) {
    const question = mbtiQuestions[gamerMbtiAnswers.length];
    document.querySelector('#mbti-quiz-box').innerHTML = `
      <div class="question-dialogue">
        <img src="assets/pipo-scan.webp" alt="" width="768" height="768" loading="lazy" decoding="async" />
        <div>
          <span>${icon('user')}ピポの性格ログ解析</span>
          <p>直感でOKです。左が「そう思う」、右が「思わない」。迷ったら中央の「わからない」を選べます。</p>
          <h3 id="mbti-quiz-title">${question.title}</h3>
        </div>
      </div>
      ${renderScaleOptionList(question, 'data-mbti-answer')}
      <div class="quiz-nav">
        ${gamerMbtiAnswers.length > 0 ? `<button class="ghost-button" type="button" id="back-mbti-quiz">${icon('back')}1つ戻る</button>` : ''}
      </div>
    `;
    document.querySelectorAll('[data-mbti-answer]').forEach((button) => {
      button.addEventListener('click', () => {
        if (gamerMbtiAnswers.length === 0) trackEvent('gamer_mbti_start');
        gamerMbtiAnswers.push(Number(button.dataset.mbtiAnswer));
        saveQuizAnswers('mbti', gamerMbtiAnswers);
        renderGamerMbtiQuiz();
      });
    });
    document.querySelector('#back-mbti-quiz')?.addEventListener('click', () => {
      gamerMbtiAnswers.pop();
      saveQuizAnswers('mbti', gamerMbtiAnswers);
      renderGamerMbtiQuiz();
    });
    return;
  }

  trackEvent('gamer_mbti_complete', { code: type.code, title: type.title, nightOwl: isNightOwlHour() });
  saveQuizAnswers('mbti', gamerMbtiAnswers);
  const mbtiResultHash = `#mbti=${type.code}`;
  setResultHash(mbtiResultHash);
  document.querySelector('#mbti-quiz-box').innerHTML = renderGamerMbtiResult(type, scores);
  activateResultReveal();
  renderMbtiGearList(type.code);
  document.querySelector('#reset-mbti-quiz')?.addEventListener('click', () => {
    gamerMbtiAnswers = [];
    clearQuizAnswers('mbti');
    document.body.classList.remove('gamer-mbti-result-ready');
    setResultHash('#gamer-mbti');
    renderGamerMbtiQuiz();
  });
  attachShareHandlers('mbti', {
    text: `ゲーマーMBTI診断で「${type.title}（${type.code}）」でした！${type.catchline}`,
    url: typeShareUrl(`gamer-mbti-${type.code.toLowerCase()}.html`),
    hashtags: 'ゲーマーMBTI,GameSpecLab',
    title: 'ゲーマーMBTIタイプ診断',
    track: { code: type.code },
  });
  const mbtiCardShareMeta = {
    text: `ゲーマーMBTI診断で「${type.title}（${type.code}）」でした！ ${typeShareUrl(`gamer-mbti-${type.code.toLowerCase()}.html`)}`,
    title: 'ゲーマーMBTIタイプ診断',
    track: { code: type.code },
  };
  mbtiCardCtx = { type, scores, shareMeta: mbtiCardShareMeta };
  attachResultCardHero('mbti', getMbtiCardData(type, scores), mbtiCardShareMeta);
}

function renderShareCard(profile, scores) {
  const topTraits = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  return `
    <article class="share-card-visual" aria-label="${profile.name}の共有カード">
      <div class="share-card-topline"><span>${icon('spark')}GamespecLab</span><span>${icon('link')}Duo Sync</span></div>
      <div>
        <p>${icon('target')}あなたのゲームパートナー相性</p>
        <div class="share-sync-code"><span>GSL SYNC CODE</span><strong>${profile.syncCode}</strong><small>${profile.syncCodeLabel}</small></div>
        <h3>${profile.name}</h3>
        <strong>${profile.catchline}</strong>
        <small class="share-card-line">${profile.shareLine || profile.summary}</small>
      </div>
      <div class="score-grid">
        ${topTraits.map(([trait, value]) => `<div class="score-row"><span>${traitLabels[trait]}</span><div class="mini-track"><span style="width:${Math.min(100, Math.max(35, value * 11))}%"></span></div></div>`).join('')}
      </div>
      <div class="share-card-footer"><span>${icon('gamepad')}おすすめ: ${profile.games.slice(0, 2).join(' / ')}</span><span>gamespec-lab</span></div>
    </article>
  `;
}

function renderResultInsight(profile) {
  const insights = [
    ['spark', '強みの芯', profile.strengthNote],
    ['chart', '伸び方', profile.growthNote],
    ['link', '相性の合図', profile.syncSignal],
  ];
  return `
    <div class="result-insight-grid" aria-label="結果の深掘り">
      ${insights.map(([insightIcon, label, text]) => `
        <article class="result-insight-card">
          <span>${icon(insightIcon)}${label}</span>
          <p>${text}</p>
        </article>
      `).join('')}
    </div>
  `;
}

function renderResultSummaryStrip(profile) {
  const mainTrait = traitLabels[profile.traits[0]] || 'プレイ傾向';
  return `
    <div class="result-summary-strip" aria-label="結果サマリー">
      <span>${icon('spark')}SYNC: ${profile.syncCode}</span>
      <span>${icon('user')}相性: 一緒に伸びる相手</span>
      <span>${icon('gamepad')}初回: ${profile.games[0]}</span>
      <span>${icon('link')}軸: ${mainTrait}</span>
    </div>
  `;
}

function renderResultHero(profile, kickerIcon = 'trophy', kickerText = 'あなたのタイプ') {
  return `
    <div class="result-dialogue is-solo">
      <img class="result-pipo-photo" src="assets/pipo-result.webp" alt="" width="960" height="640" loading="lazy" decoding="async" />
      <div>
        <div class="result-kicker">${icon(kickerIcon)}${kickerText}</div>
        <div class="sync-code-badge" aria-label="GSL SYNC CODE">
          <span>GSL SYNC CODE</span>
          <strong>${profile.syncCode}</strong>
          <small>${profile.syncCodeLabel}</small>
        </div>
        <h3 id="quiz-title">${profile.name}</h3>
        <p class="result-catch">${profile.catchline}</p>
        <p>${profile.summary}</p>
      </div>
    </div>
  `;
}

// キャラ表示バリアント（A=既定 / B=女性版）。診断前ゲートは設けず結果画面で任意切替
let charVariant = 'a';
let mbtiCardCtx = null;
let charVariantBound = false;

function mbtiCharImg(code) {
  return `assets/types/${code.toLowerCase()}${charVariant === 'b' ? '-f' : ''}.png?v=2`;
}

function setCharVariant(v) {
  if (v === charVariant) return;
  charVariant = v;
  document.querySelectorAll('[data-char-variant]').forEach((b) => {
    b.classList.toggle('is-active', b.dataset.charVariant === v);
  });
  if (!mbtiCardCtx) return;
  const img = mbtiCharImg(mbtiCardCtx.type.code);
  document.querySelectorAll('[data-spin3d] .figure-spin img').forEach((layer) => { layer.src = img; });
  const figure = document.querySelector('.result-card-figure[data-result-card="mbti"]');
  if (figure) {
    figure.dataset.cardBound = '';
    figure.innerHTML = `<div class="result-card-loading">${icon('spark')}<span>カードを生成中...</span></div>`;
    attachResultCardHero('mbti', getMbtiCardData(mbtiCardCtx.type, mbtiCardCtx.scores), mbtiCardCtx.shareMeta);
  }
}

function setupCharVariantToggle() {
  if (charVariantBound) return;
  charVariantBound = true;
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-char-variant]');
    if (btn) setCharVariant(btn.dataset.charVariant);
  });
}

// 性別トグル（A=BOY / B=GIRL）。フィギュアと結果カード両方で共用
function renderCharVariantToggle(extraClass) {
  return `
    <div class="char-variant ${extraClass || ''}" role="group" aria-label="キャラクターの性別切替">
      <button type="button" data-char-variant="a" class="${charVariant === 'a' ? 'is-active' : ''}">BOY</button>
      <button type="button" data-char-variant="b" class="${charVariant === 'b' ? 'is-active' : ''}">GIRL</button>
    </div>
  `;
}

// ドット絵を層状に押し出した擬似3Dフィギュア（スクロールで回転）
function renderFigureStage(image, title) {
  const LAYERS = 10;
  const layers = Array.from({ length: LAYERS }, (_, i) => {
    const face = i === 0 || i === LAYERS - 1 ? 'is-face' : 'is-core';
    return `<img src="${image}" alt="" aria-hidden="true" class="${face}" style="--i:${i}" loading="lazy" decoding="async" width="200" height="220" />`;
  }).join('');
  return `
    <div class="figure-stage" data-spin3d role="img" aria-label="${title}の3Dフィギュア風表示">
      <div class="figure-spin">${layers}</div>
      <div class="figure-base" aria-hidden="true"></div>
      <span class="figure-caption">${icon('spark')}STATUS FIGURE</span>
      ${renderCharVariantToggle('is-figure')}
    </div>
  `;
}

let figureSpinBound = false;
let figureSpinVisible = false;
let figureSpinRaf = null;

function updateFigureSpin() {
  const vh = window.innerHeight || 1;
  document.querySelectorAll('[data-spin3d] .figure-spin').forEach((spin) => {
    const rect = spin.getBoundingClientRect();
    // ビューポートを通過する間に一回転（-18°スタートで静止時も立体感が出る角度に）
    const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
    spin.style.setProperty('--spin', `${(-18 + progress * 360).toFixed(1)}deg`);
  });
}

// scroll/resizeイベントに加えて、可視中はrAFで毎フレーム追従させる。
// モバイルのタッチスクロール（慣性スクロール中）は passive な scroll イベントの
// 発火がブラウザ側で間引かれ、更新が飛ぶ/止まって見えることがあるための保険。
function runFigureSpinLoop() {
  if (!figureSpinVisible) {
    figureSpinRaf = null;
    return;
  }
  updateFigureSpin();
  figureSpinRaf = window.requestAnimationFrame(runFigureSpinLoop);
}

function setupFigureSpin() {
  const stages = document.querySelectorAll('[data-spin3d]');
  if (!stages.length) return;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  updateFigureSpin();
  if (figureSpinBound) return;
  figureSpinBound = true;
  let raf = null;
  const onScroll = () => {
    if (raf) return;
    raf = window.requestAnimationFrame(() => {
      raf = null;
      updateFigureSpin();
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        figureSpinVisible = entry.isIntersecting;
        if (figureSpinVisible && !figureSpinRaf) {
          figureSpinRaf = window.requestAnimationFrame(runFigureSpinLoop);
        }
      });
    }, { threshold: 0, rootMargin: '40% 0px' });
    stages.forEach((stage) => io.observe(stage));
  }
}

function renderTypeSpotlight(image, code, title) {
  return `
    <div class="result-type-spotlight" aria-label="${title}のキャラクター">
      <div class="type-spotlight-orb is-holo" data-holo>
        <img class="type-spotlight-char" src="${image}" alt="${title}のドット絵キャラクター" width="200" height="220" loading="lazy" decoding="async" />
      </div>
      <span class="type-spotlight-badge">${icon('spark')}YOUR TYPE${code ? ` · ${code}` : ''}</span>
      <strong class="type-spotlight-name">${title}</strong>
    </div>
  `;
}

function renderResultReveal(profile) {
  const label = profile.revealLabel || 'DUO SYNC SCAN';
  const headline = profile.revealHeadline || '相性ログを解析中...';
  const image = profile.revealImage || 'assets/pipo-scan.webp';
  return `
    <div class="result-reveal-card" aria-hidden="true">
      <div class="reveal-orb">
        <img src="${image}" alt=""${profile.revealPixel ? ' class="reveal-orb-pixel"' : ''} loading="lazy" />
      </div>
      <div class="reveal-copy">
        <span>${icon('spark')}${label}</span>
        <strong>${headline}</strong>
        <div class="reveal-bars">
          <i></i><i></i><i></i>
        </div>
      </div>
      <div class="reveal-type">${profile.name}</div>
    </div>
  `;
}

function renderResultBody(profile, scores, options = {}) {
  const {
    kickerIcon = 'trophy',
    kickerText = 'あなたのタイプ',
    actions = '',
  } = options;
  return `
    <div class="result-block result-sequence is-revealing">
      ${renderResultReveal(profile)}
      <div class="result-content">
        ${renderResultHero(profile, kickerIcon, kickerText)}
        ${renderResultSummaryStrip(profile)}
        ${renderResultInsight(profile)}
        ${pipoBanter(profile.pipoLine)}
        <section class="inline-result-detail" aria-label="診断結果の詳細">
          <div class="detail-grid inline-result-grid">${resultDetailsMarkup(profile)}</div>
        </section>
        ${renderShareCard(profile, scores)}
        ${renderResultNextPanel(profile)}
        ${actions}
      </div>
    </div>
  `;
}

function renderResultNextPanel(profile) {
  return `
    <section class="result-next-panel" aria-label="診断後に見るコンテンツ">
      <div>
        <span>${icon('arrow')}NEXT SCAN</span>
        <strong>まずは遊び方と相性を深掘り</strong>
        <p>${profile.games[0]}のような相性が出やすいゲームから試して、必要になった時だけプレイ環境の目安も確認できます。</p>
      </div>
      <div class="result-next-actions">
        <a class="ghost-link" href="results.html">${icon('list')}全タイプを見る</a>
        <a class="primary-link" href="guide.html">${icon('gamepad')}相性の見方</a>
        <a class="ghost-link" href="gamermbti.html">${icon('user')}ゲーマーMBTI</a>
        <a class="ghost-link is-muted" href="pc-build.html">${icon('cpu')}環境メモ</a>
      </div>
    </section>
  `;
}

// 「診断ログを解析中...」の演出カードが表示され続ける時間。カード生成側の
// スキャン演出もこの分だけ待ってから始めることで、まだ隠れている間に
// 終わってしまわないようにする(attachResultCardHeroから参照)。
const RESULT_REVEAL_MS = 1450;

function activateResultReveal() {
  const sequence = document.querySelector('.result-sequence');
  if (!sequence) return;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const finish = () => {
    sequence.classList.remove('is-revealing');
    sequence.classList.add('is-ready');
    const reveal = sequence.querySelector('.result-reveal-card');
    const content = sequence.querySelector('.result-content');
    if (reveal) {
      reveal.style.transition = 'none';
      reveal.style.opacity = '0';
      reveal.style.maxHeight = '0';
      reveal.style.minHeight = '0';
      reveal.style.paddingTop = '0';
      reveal.style.paddingBottom = '0';
      reveal.style.marginBottom = '-18px';
    }
    if (content) {
      content.style.transition = 'none';
      content.style.opacity = '1';
      content.style.maxHeight = 'none';
      content.style.overflow = 'visible';
      content.style.transform = 'none';
    }
    animateResultCharts(content || sequence, reduced);
    setupFigureSpin();
    setupCharVariantToggle();
  };
  if (reduced) {
    finish();
    return;
  }
  window.setTimeout(finish, RESULT_REVEAL_MS);
}

function setupHoloTilt(root, reduced) {
  if (!root || reduced) return;
  root.querySelectorAll('[data-holo]').forEach((orb) => {
    if (orb.dataset.holoBound === 'true') return;
    orb.dataset.holoBound = 'true';
    let raf = null;
    const apply = (px, py) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = null;
        const rx = (0.5 - py) * 14;
        const ry = (px - 0.5) * 14;
        orb.style.setProperty('--holo-x', `${(px - 0.5) * 120}%`);
        orb.style.setProperty('--holo-y', `${(py - 0.5) * 120}%`);
        orb.style.transform = `perspective(680px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    };
    const reset = () => {
      if (raf) window.cancelAnimationFrame(raf);
      raf = null;
      orb.classList.remove('is-tilting');
      orb.style.removeProperty('--holo-x');
      orb.style.removeProperty('--holo-y');
      orb.style.transform = '';
    };
    const fromEvent = (event) => {
      const point = event.touches ? event.touches[0] : event;
      if (!point) return;
      orb.classList.add('is-tilting');
      const rect = orb.getBoundingClientRect();
      apply((point.clientX - rect.left) / rect.width, (point.clientY - rect.top) / rect.height);
    };
    orb.addEventListener('pointermove', fromEvent);
    orb.addEventListener('pointerleave', reset);
    orb.addEventListener('touchmove', fromEvent, { passive: true });
    orb.addEventListener('touchend', reset);
  });
}

function watchRadarSweep(card, reduced) {
  // 結果画面はヒーローカードなどが上にあり、レーダーは表示直後スクロール前だと
  // 画面外にある。ページ読み込み時に演出を発火すると誰も見ないまま終わってしまう
  // ため、実際にスクロールして見えた瞬間に発火する。
  if (typeof IntersectionObserver !== 'function') {
    runRadarSweep(card, reduced);
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(card);
      runRadarSweep(card, reduced);
    });
  }, { threshold: 0.4 });
  observer.observe(card);
}

// ランキング系カードを1位→2位→3位の順に明らかにする汎用ヘルパー。
// レーダーと同じく、実際にスクロールして見えた瞬間に発火する
// （見えない場所で演出が終わってしまわないようにするため）。
function watchStaggerReveal(panel, cardSelector, reduced) {
  const cards = Array.from(panel.querySelectorAll(cardSelector));
  if (!cards.length) return;
  cards.forEach((card) => card.classList.add('is-pending'));

  const reveal = () => {
    const stagger = reduced ? 0 : 220;
    cards.forEach((card, index) => {
      window.setTimeout(() => card.classList.remove('is-pending'), index * stagger);
    });
  };

  if (typeof IntersectionObserver !== 'function') {
    reveal();
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(panel);
      reveal();
    });
  }, { threshold: 0.3 });
  observer.observe(panel);
}

function animateResultCharts(root, reduced) {
  if (!root) return;
  root.querySelectorAll('.sense-radar-card').forEach((card) => {
    watchRadarSweep(card, reduced);
  });
  root.querySelectorAll('.compat-partner-panel').forEach((panel) => {
    watchStaggerReveal(panel, '.compat-partner-card', reduced);
  });
  root.querySelectorAll('.top-ability-panel').forEach((panel) => {
    watchStaggerReveal(panel, '.top-ability-card', reduced);
  });
  if (reduced) return;
  setupHoloTilt(root, reduced);
  root.querySelectorAll('[data-count-to]').forEach((node) => {
    const target = Number(node.dataset.countTo) || 0;
    if (!target) return;
    const duration = 850;
    let startTime = null;
    const step = (now) => {
      if (startTime === null) startTime = now;
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = String(Math.round(target * eased));
      if (progress < 1) window.requestAnimationFrame(step);
      else node.textContent = String(target);
    };
    window.requestAnimationFrame(step);
  });
  root.querySelectorAll('.mini-track > span, .mbti-axis-track > span').forEach((bar) => {
    const targetWidth = bar.style.width;
    if (!targetWidth) return;
    bar.style.width = '0%';
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      bar.style.width = targetWidth;
    }));
  });
}

function renderSyncCodeDetail(profile) {
  return `
    <article class="result-card result-card-wide sync-code-detail">
      <div class="card-head"><p class="card-label">${icon('link')}GSL SYNC CODE</p><span>00</span></div>
      <div class="sync-code-detail-main">
        <strong>${profile.syncCode}</strong>
        <div>
          <h3>${profile.syncCodeLabel}</h3>
          <p>ゲーム中の相性を、行動テンポ、通話スタイル、勝負温度、チーム内の立ち位置で表したGamespecLab独自コードです。</p>
        </div>
      </div>
      <div class="sync-axis-grid">
        ${profile.syncCodeAxes.map((axis) => `
          <span><b>${axis.letter}</b><strong>${axis.word}</strong><small>${axis.body}</small></span>
        `).join('')}
      </div>
    </article>
  `;
}

function resultDetailsMarkup(profile) {
  return `
    ${renderSyncCodeDetail(profile)}
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('spark')}あなたの強み</p><span>01</span></div><h3>${profile.catchline}</h3><p>${profile.strengthNote}</p></article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('link')}あなたの沼ポイント</p><span>02</span></div><h3>また誘いたくなる魅力</h3><p>${profile.hookPoint}</p></article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('trophy')}輝く瞬間</p><span>03</span></div><h3>この場面で強みが出る</h3><p>${profile.shineMoment}</p></article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('user')}相性がいい相手</p><span>04</span></div><h3>一緒に伸びるタイプ</h3><p>${profile.goodPartner}</p></article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('link')}ゲーム連携・相棒傾向</p><span>05</span></div><h3>${profile.partner}</h3><p>${profile.chemistry}</p></article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('gamepad')}おすすめゲーム</p><span>06</span></div><h3>一緒に遊ぶならこのあたり</h3>${renderGamePicks(profile)}</article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('spark')}初回デュオ案</p><span>07</span></div><h3>最初に遊ぶなら</h3><p>${profile.firstDuo}</p></article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('chat')}相性が深まる誘い方</p><span>08</span></div><h3>この一言から始めやすい</h3>${miniGuideList(profile.inviteTips, 'chat')}</article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('shield')}相性を伸ばすコツ</p><span>09</span></div><h3>あなたの良さを守るポイント</h3><p>${profile.risks}</p></article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('zap')}ペースが違う相手</p><span>10</span></div><h3>合わせ方のヒント</h3><p>${profile.toughPartner}</p></article>
    <article class="result-card result-card-wide"><div class="card-head"><p class="card-label">${icon('chat')}DUO取扱メモ</p><span>11</span></div><h3>${profile.duoMemoTitle}</h3>${miniGuideList(profile.duoMemos, 'check')}</article>
  `;
}

function renderResultDetails(profile) {
  const resultCards = document.querySelector('#result-cards');
  if (!resultCards) return;
  resultCards.innerHTML = resultDetailsMarkup(profile);
}

function updateShare(profile) {
  const shareText = `GamespecLabで診断したら「${profile.syncCode} / ${profile.name}」でした。${profile.shareLine || profile.catchline}`;
  const shareUrl = resultUrl(`#result=${profile.id}`);
  const sharePreview = document.querySelector('#share-preview-text');
  const tweetLink = document.querySelector('#tweet-link');
  if (sharePreview) sharePreview.textContent = shareText;
  if (tweetLink) tweetLink.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
}

function renderQuiz() {
  const scores = getScores(answers, questions, 'traits', Object.keys(traitLabels));
  const result = getResult(scores);
  const complete = answers.length === questions.length;
  const progress = Math.round((answers.length / questions.length) * 100);
  const diagnosisHero = document.querySelector('#diagnosis');
  diagnosisHero?.classList.toggle('is-result-mode', complete);

  document.querySelector('#quiz-step').textContent = complete ? '結果' : `質問 ${answers.length + 1} / ${questions.length}`;
  document.querySelector('#quiz-progress-text').textContent = `${progress}%`;
  document.querySelector('#quiz-progress').style.width = `${progress}%`;
  applyQuizProgressFx('quiz', progress, answers.length, questions.length);
  document.querySelector('#preview-name').textContent = result.name;
  document.querySelector('#preview-catch').textContent = result.catchline;
  document.querySelector('#score-preview').innerHTML = renderScoreGrid(scores, traitLabels);
  renderResultDetails(result);
  updateShare(result);

  if (!complete) {
    const question = questions[answers.length];
    document.querySelector('#quiz-box').innerHTML = `
      <div class="question-dialogue">
        <img src="assets/pipo-scan.webp" alt="" width="768" height="768" loading="lazy" decoding="async" />
        <div>
          <span>${icon('spark')}ピポの解析メモ</span>
          <p>左が「そう思う」、右が「思わない」。深く考えず、普段の遊び方に近い位置を選んでください。</p>
          <h3 id="quiz-title">${question.title}</h3>
        </div>
      </div>
      ${renderScaleOptionList(question, 'data-answer')}
      <div class="quiz-nav">
        ${answers.length > 0 ? `<button class="ghost-button" type="button" id="back-quiz">${icon('back')}1つ戻る</button>` : ''}
      </div>
    `;
    document.querySelectorAll('[data-answer]').forEach((button) => {
      button.addEventListener('click', () => {
        if (answers.length === 0) trackEvent('diagnosis_start');
        answers.push(Number(button.dataset.answer));
        saveQuizAnswers('partner', answers);
        renderQuiz();
      });
    });
    document.querySelector('#back-quiz')?.addEventListener('click', () => {
      answers.pop();
      saveQuizAnswers('partner', answers);
      renderQuiz();
    });
    return;
  }

  trackEvent('diagnosis_complete', { result: result.id, name: result.name });
  saveQuizAnswers('partner', answers);
  const partnerResultHash = `#result=${result.id}`;
  setResultHash(partnerResultHash);

  document.querySelector('#quiz-box').innerHTML = renderResultBody(result, scores, {
    actions: `
      <div class="result-actions">
        <button class="primary-button" type="button" id="share-result">${icon('share')}結果をシェア</button>
        <button class="ghost-button" type="button" id="reset-quiz">${icon('target')}もう一度診断</button>
      </div>
    `,
  });
  activateResultReveal();
  document.querySelector('#reset-quiz').addEventListener('click', () => {
    answers = [];
    clearQuizAnswers('partner');
    setResultHash('#diagnosis');
    renderQuiz();
  });
  document.querySelector('#share-result').addEventListener('click', async () => {
    const text = `GamespecLabで「${result.syncCode} / ${result.name}」でした。${result.syncCodeLabel}\n${resultUrl(partnerResultHash)}`;
    trackEvent('share_click', { result: result.id, name: result.name, method: navigator.share ? 'native' : 'clipboard' });
    const shareButton = document.querySelector('#share-result');
    try {
      if (navigator.share) {
        await navigator.share({ title: 'GamespecLab', text });
        return;
      }
      await navigator.clipboard.writeText(text);
      shareButton.innerHTML = `${icon('check')}コピーしました`;
    } catch (error) {
      if (error?.name === 'AbortError') return;
      const encoded = encodeURIComponent(text);
      shareButton.innerHTML = `${icon('external')}投稿画面を開く`;
      shareButton.addEventListener('click', () => {
        window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank', 'noopener,noreferrer');
      }, { once: true });
    }
  });
}

function renderPcCard(build) {
  return `
    <article class="pc-card">
      <div class="card-head"><p class="card-label">${icon('monitor')}環境の目安</p><span>BUILD</span></div>
      <h3>${build.name}</h3>
      <p>${build.catchline}</p>
      <div class="spec-grid">${build.specs.map(([label, value]) => `<div>${icon(specIcons[label] || 'cpu', 'spec-icon')}<span>${label}</span><strong>${value}</strong></div>`).join('')}</div>
      <p>${build.summary}</p>
      <div class="pc-fit-note">${icon('gamepad')}<span>${build.gameFit}</span></div>
      <div class="buy-checks">
        <strong>${icon('check')}購入前チェック</strong>
        ${miniGuideList(build.buyerTips, 'shield')}
      </div>
      ${tagList(build.games)}
      ${tagList(build.peripherals)}
    </article>
  `;
}

function getAffiliateReason(slot, build) {
  const title = `${slot.id} ${slot.title}`;
  if (/bto|ゲーミングPC| PC|PC$/i.test(title)) {
    return `${build.name}は、あなたの回答で重視された遊び方を安定して動かすための土台です。先にPC本体の余裕を確保しておくと、あとからモニターやデバイスを足した時にも性能を活かしやすくなります。`;
  }
  if (/monitor|モニター/i.test(title)) {
    return `${build.name}では、PC本体の性能を画面で体感できるかが満足度に直結します。高リフレッシュやWQHDなど、遊び方に合う表示環境を合わせると、構成の良さが見えやすくなります。`;
  }
  if (/mouse|マウス|device|デバイス/i.test(title)) {
    return `${build.name}を選ぶ人は、操作の軽さや疲れにくさでも体感差が出やすいです。マウスや周辺機器を整えると、PC性能だけでは埋めにくい「動かしやすさ」を補えます。`;
  }
  if (/mic|マイク|headset|ヘッドセット|quiet|静音/i.test(title)) {
    return `${build.name}は通話や長時間プレイの快適さも大事です。声の聞こえ方、入力音、装着感を整えると、ゲーム以外のストレスが減って遊び続けやすくなります。`;
  }
  if (/desk|チェア|デスク/i.test(title)) {
    return `${build.name}は部屋への馴染みや長時間の快適さも重視する方向けです。デスクやチェアまで整えると、見た目だけでなく集中しやすさにもつながります。`;
  }
  if (/SSD|メモリ|parts|パーツ|ストレージ/i.test(title)) {
    return `${build.name}では、ゲームを複数入れる余裕や読み込みの快適さが効いてきます。ストレージやメモリを見ておくと、あとから不足しにくい構成にしやすいです。`;
  }
  return `${build.name}の方向性に合わせて、PC本体だけではなく周辺環境まで整えるための候補です。あなたの遊び方で体感しやすい部分から優先すると選びやすくなります。`;
}

function renderAffiliate(build) {
  return `
    <p class="affiliate-disclosure">当サイトはAmazonアソシエイトとして、適格販売により収入を得ています。</p>
    <div class="affiliate-grid">
      ${build.affiliateSlots.map((slot) => `
        <article class="affiliate-card">
          <div class="card-head"><p class="card-label">${icon('cart')}候補アイテム</p><span>SHOP</span></div>
          <h3>${slot.title}</h3>
          <p>${slot.body}</p>
          <div class="affiliate-reason">
            <strong>${icon('spark')}なぜあなた向け？</strong>
            <p>${getAffiliateReason(slot, build)}</p>
          </div>
          <a href="${slot.href}" target="_blank" rel="sponsored noopener noreferrer" data-affiliate="${slot.id}">
            <span>${icon('external')}${slot.cta}</span>
            <small>${icon('link')}Amazon.co.jpで確認</small>
          </a>
        </article>
      `).join('')}
    </div>
  `;
}

function renderPcQuiz() {
  const scores = getScores(pcAnswers, pcQuestions, 'needs', Object.keys(pcNeedLabels));
  const build = getPcBuild(scores);
  const complete = pcAnswers.length === pcQuestions.length;
  const progress = Math.round((pcAnswers.length / pcQuestions.length) * 100);

  document.querySelector('#pc-step').textContent = complete ? '結果' : `質問 ${pcAnswers.length + 1} / ${pcQuestions.length}`;
  document.querySelector('#pc-progress-text').textContent = `${progress}%`;
  document.querySelector('#pc-progress').style.width = `${progress}%`;
  applyQuizProgressFx('pc', progress, pcAnswers.length, pcQuestions.length);
  document.querySelector('#pc-preview').innerHTML = renderPcCard(build);
  document.querySelector('#pc-score-preview').innerHTML = renderScoreGrid(scores, pcNeedLabels);
  document.querySelector('#pc-detail').innerHTML = complete ? renderPcCard(build) : renderPcWaitingCard(build);
  document.querySelector('#affiliate-slots').innerHTML = complete ? renderAffiliate(build) : renderAffiliateWaitingCard();
  setupAffiliateTracking();

  if (!complete) {
    const question = pcQuestions[pcAnswers.length];
    document.querySelector('#pc-quiz-box').innerHTML = `
      <h3 id="pc-quiz-title">${question.title}</h3>
      <div class="option-list">
        ${question.options.map((option, index) => `
          <button class="option-button" type="button" data-pc-answer="${index}">
            <span class="option-main"><span class="option-icon">${icon(['tag', 'monitor', 'cpu'][index])}</span><span><strong>${option.label}</strong><small>${option.detail}</small></span></span><span class="option-arrow">${icon('arrow')}</span>
          </button>
        `).join('')}
      </div>
      <div class="quiz-nav">
        ${pcAnswers.length > 0 ? `<button class="ghost-button" type="button" id="back-pc-quiz">${icon('back')}1つ戻る</button>` : ''}
      </div>
    `;
    document.querySelectorAll('[data-pc-answer]').forEach((button) => {
      button.addEventListener('click', () => {
        if (pcAnswers.length === 0) trackEvent('pc_diagnosis_start');
        pcAnswers.push(Number(button.dataset.pcAnswer));
        saveQuizAnswers('pc', pcAnswers);
        renderPcQuiz();
      });
    });
    document.querySelector('#back-pc-quiz')?.addEventListener('click', () => {
      pcAnswers.pop();
      saveQuizAnswers('pc', pcAnswers);
      renderPcQuiz();
    });
    return;
  }

  trackEvent('pc_diagnosis_complete', { build: build.id, name: build.name });
  saveQuizAnswers('pc', pcAnswers);

  document.querySelector('#pc-quiz-box').innerHTML = `
    <div class="result-block">
      <div class="result-kicker">${icon('cpu')}あなた向けの構成</div>
      <h3 id="pc-quiz-title">${build.name}</h3>
      <p class="result-catch">${build.catchline}</p>
      <p>${build.summary}</p>
      <div class="result-actions">
        <a class="primary-link" href="#after-diagnosis">${icon('cart')}候補を下で確認</a>
        <button class="ghost-button" type="button" id="reset-pc-quiz">${icon('target')}もう一度診断</button>
      </div>
    </div>
  `;
  document.querySelector('#reset-pc-quiz').addEventListener('click', () => {
    pcAnswers = [];
    clearQuizAnswers('pc');
    renderPcQuiz();
  });
}

function renderPcWaitingCard(build) {
  return `
    <article class="pc-card pc-waiting-card">
      <div class="card-head"><p class="card-label">${icon('monitor')}診断中プレビュー</p><span>WAIT</span></div>
      <h3>${build.name}</h3>
      <p>回答に合わせて候補を更新しています。5問すべて回答すると、環境の理由、確認ポイント、候補アイテムをまとめて表示します。</p>
      <div class="pc-fit-note">${icon('shield')}<span>診断前は目安だけ表示し、候補リンクは完了後に控えめに出します。</span></div>
    </article>
  `;
}

function renderAffiliateWaitingCard() {
  return `
    <article class="affiliate-card affiliate-waiting-card">
      <div class="card-head"><p class="card-label">${icon('cart')}環境候補</p><span>LOCK</span></div>
      <h3>候補リンクは診断完了後に表示</h3>
      <p>先に売り込まず、回答内容に近いPC本体、モニター、デバイスだけを補足候補として出します。</p>
      <div class="mini-guide-list">
        <span>${icon('check')}予算と遊びたいゲームから絞り込み</span>
        <span>${icon('check')}高FPS、画質、配信など目的別に整理</span>
        <span>${icon('check')}Amazonアソシエイト表記も同じ画面で確認</span>
      </div>
    </article>
  `;
}

function renderResultLinks() {
  const resultLinks = document.querySelector('#result-links');
  if (!resultLinks) return;
  const base = resultLinks.dataset.base || '';
  resultLinks.innerHTML = profiles.map((profile) => `
    <a class="result-link-card" href="${base}#result=${profile.id}">
      <span class="card-head"><span>${icon('trophy')}${profile.name}</span><small>${profile.syncCode}</small></span>
      <span class="sync-code-mini">${icon('link')}GSL SYNC CODE: ${profile.syncCode}</span>
      <strong>${profile.catchline}</strong>
      <span class="result-link-meta">${icon('gamepad')}${profile.games.slice(0, 2).join(' / ')}</span>
      <small>${icon('arrow')}結果を表示</small>
    </a>
  `).join('');
}

function buildSenseScoresForPair(primary, secondary) {
  const keys = Object.keys(senseLabels);
  const scores = Object.fromEntries(keys.map((key, index) => [key, Math.max(42, 58 - (index * 2))]));
  scores[primary] = 92;
  scores[secondary] = 82;
  return scores;
}

function getAllSenseTypeLinks() {
  const keys = Object.keys(senseLabels);
  return keys.flatMap((primary) => keys
    .filter((secondary) => secondary !== primary)
    .map((secondary) => {
      const archetype = getSenseArchetypeFromKeys(primary, secondary);
      return {
        id: `${primary}_${secondary}`,
        ...archetype,
        primaryLabel: senseLabels[primary],
        secondaryLabel: senseLabels[secondary],
      };
    }));
}

function renderSenseResultLinks() {
  const resultLinks = document.querySelector('#sense-result-links');
  if (!resultLinks) return;
  const base = resultLinks.dataset.base || 'gamesense.html';
  const types = getAllSenseTypeLinks();
  resultLinks.innerHTML = types.map((type) => `
    <a class="result-link-card sense-type-card" href="${base}#sense=${type.id}">
      <span class="sense-type-emblem" style="--emblem-accent: ${(SENSE_CARD_ACCENTS[type.primary] || [114, 242, 255]).join(' ')}; --emblem-sub: ${(SENSE_CARD_ACCENTS[type.secondary] || [255, 77, 210]).join(' ')}" aria-hidden="true">
        <span class="sense-type-emblem-main">${icon(senseIcons[type.primary] || 'chart')}</span>
        <span class="sense-type-emblem-sub">${icon(senseIcons[type.secondary] || 'spark')}</span>
      </span>
      <span class="card-head"><span>${icon(senseIcons[type.primary] || 'chart')}${type.name}</span><span class="card-head-right"><small>G8</small>${rarityTierChip(getSenseRarity(type))}</span></span>
      <strong>${type.catchline}</strong>
      <span class="result-link-meta">${icon(senseIcons[type.secondary] || 'spark')}${type.primaryLabel} × ${type.secondaryLabel}</span>
      <small>${icon('arrow')}結果を表示</small>
    </a>
  `).join('');
}

function renderGamerMbtiTypeLinks() {
  const resultLinks = document.querySelector('#mbti-result-links');
  if (!resultLinks) return;
  const base = resultLinks.dataset.base || '';
  resultLinks.innerHTML = Object.entries(gamerMbtiTypes).map(([code, type]) => `
    <a class="result-link-card mbti-type-card" href="${base}gamer-mbti-${code.toLowerCase()}.html">
      <span class="card-head"><span>${icon('user')}${type.title}</span><span class="card-head-right"><small>${code}</small>${rarityTierChip(getMbtiRarity(code))}</span></span>
      <strong>${type.catchline}</strong>
      <span class="result-link-meta">${icon('gamepad')}${type.role}</span>
      <small>${icon('arrow')}結果を表示</small>
    </a>
  `).join('');
}

function drawWrappedCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const chars = [...text];
  const lines = [];
  let line = '';
  chars.forEach((char) => {
    const next = line + char;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = char;
      return;
    }
    line = next;
  });
  if (line) lines.push(line);
  lines.slice(0, maxLines).forEach((item, index) => {
    ctx.fillText(item, x, y + (index * lineHeight));
  });
  return y + (Math.min(lines.length, maxLines) * lineHeight);
}

function createSenseResultCardBlob() {
  const lab = document.querySelector('#post-result-lab');
  const type = document.querySelector('#post-result-type')?.textContent || 'GameSense Scan 8';
  const style = lab?.dataset.cardStyle || '二刀流コア型';
  const average = lab?.dataset.cardAverage || '--';
  const topAverage = lab?.dataset.cardTopAverage || '--';
  const catchline = lab?.dataset.cardCatch || 'あなたのゲームセンスをスキャンしました。';
  const weapon = lab?.dataset.cardWeapon || document.querySelector('#post-result-core')?.textContent || '上位能力をスキャンしました';
  const growth = lab?.dataset.cardGrowth || '伸びしろもあなたらしいプレイスタイルの一部です。';
  const topStats = [lab?.dataset.cardTop1, lab?.dataset.cardTop2, lab?.dataset.cardTop3].filter(Boolean);
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  const bg = ctx.createLinearGradient(0, 0, 1080, 1080);
  bg.addColorStop(0, '#050715');
  bg.addColorStop(0.52, '#121a3a');
  bg.addColorStop(1, '#25143b');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1080, 1080);

  ctx.strokeStyle = 'rgba(114, 242, 255, 0.12)';
  ctx.lineWidth = 2;
  for (let x = 80; x <= 1000; x += 54) {
    ctx.beginPath();
    ctx.moveTo(x, 80);
    ctx.lineTo(x, 1000);
    ctx.stroke();
  }
  for (let y = 80; y <= 1000; y += 54) {
    ctx.beginPath();
    ctx.moveTo(80, y);
    ctx.lineTo(1000, y);
    ctx.stroke();
  }

  const glowA = ctx.createRadialGradient(260, 220, 0, 260, 220, 360);
  glowA.addColorStop(0, 'rgba(255, 77, 210, 0.34)');
  glowA.addColorStop(1, 'rgba(255, 77, 210, 0)');
  ctx.fillStyle = glowA;
  ctx.fillRect(0, 0, 1080, 1080);

  const glowB = ctx.createRadialGradient(820, 820, 0, 820, 820, 360);
  glowB.addColorStop(0, 'rgba(114, 242, 255, 0.34)');
  glowB.addColorStop(1, 'rgba(114, 242, 255, 0)');
  ctx.fillStyle = glowB;
  ctx.fillRect(0, 0, 1080, 1080);

  ctx.strokeStyle = 'rgba(114, 242, 255, 0.62)';
  ctx.lineWidth = 4;
  ctx.strokeRect(86, 86, 908, 908);
  ctx.strokeStyle = 'rgba(255, 77, 210, 0.62)';
  ctx.beginPath();
  ctx.moveTo(86, 86);
  ctx.lineTo(250, 86);
  ctx.moveTo(994, 994);
  ctx.lineTo(830, 994);
  ctx.stroke();

  ctx.fillStyle = '#72f2ff';
  ctx.font = '900 34px Menlo, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('GAME SENSE PROFILE', 540, 188);

  ctx.fillStyle = 'rgba(255, 77, 210, 0.16)';
  ctx.strokeStyle = 'rgba(255, 77, 210, 0.58)';
  ctx.lineWidth = 3;
  ctx.fillRect(310, 222, 460, 62);
  ctx.strokeRect(310, 222, 460, 62);
  ctx.fillStyle = 'rgba(255, 77, 210, 0.96)';
  ctx.font = '900 28px Menlo, monospace';
  ctx.fillText('CORE STYLE', 540, 249);
  ctx.fillStyle = '#f8fbff';
  ctx.font = '900 30px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText(style, 540, 278);

  ctx.fillStyle = '#f8fbff';
  ctx.font = '900 68px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  drawWrappedCanvasText(ctx, type, 540, 380, 820, 78, 3);

  ctx.fillStyle = 'rgba(114, 242, 255, 0.92)';
  ctx.font = '900 27px Menlo, monospace';
  ctx.fillText(`TOP CORE ${topAverage}  /  BALANCE ${average}`, 540, 596);

  const statX = 190;
  const statY = 666;
  const statWidth = 700;
  ctx.textAlign = 'left';
  topStats.forEach((stat, index) => {
    const y = statY + (index * 66);
    ctx.fillStyle = index === 0 ? 'rgba(255, 77, 210, 0.22)' : 'rgba(114, 242, 255, 0.12)';
    ctx.fillRect(statX, y - 34, statWidth, 46);
    ctx.strokeStyle = index === 0 ? 'rgba(255, 77, 210, 0.64)' : 'rgba(114, 242, 255, 0.38)';
    ctx.strokeRect(statX, y - 34, statWidth, 46);
    ctx.fillStyle = '#f8fbff';
    ctx.font = '900 30px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(stat, statX + 22, y - 2);
  });

  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(248, 251, 255, 0.9)';
  ctx.font = '800 29px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  drawWrappedCanvasText(ctx, weapon, 540, 846, 760, 38, 2);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.strokeStyle = 'rgba(184, 255, 106, 0.32)';
  ctx.lineWidth = 2;
  ctx.fillRect(158, 906, 764, 64);
  ctx.strokeRect(158, 906, 764, 64);
  ctx.fillStyle = 'rgba(248, 251, 255, 0.78)';
  ctx.font = '800 22px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  drawWrappedCanvasText(ctx, catchline, 540, 932, 700, 28, 2);

  ctx.fillStyle = '#ff4dd2';
  ctx.font = '900 22px Menlo, monospace';
  drawWrappedCanvasText(ctx, growth, 540, 1004, 820, 28, 2);

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 0.95));
}

function setupPostResultActions() {
  const postShareButton = document.querySelector('#post-share-result');
  postShareButton?.addEventListener('click', async () => {
    trackEvent('sense_post_share_click');
    const type = document.querySelector('#post-result-type')?.textContent || 'GameSense Scan 8';
    const text = `GamespecLabのGameSense Scan 8で「${type}」でした。\n${location.origin}${location.pathname}`;
    try {
      const blob = await createSenseResultCardBlob();
      if (!blob) throw new Error('image generation failed');
      const file = new File([blob], 'gamesense-result-card.png', { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: 'GameSense Scan 8', text, files: [file] });
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'gamesense-result-card.png';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 800);
      postShareButton.innerHTML = `${icon('check')}画像を保存しました`;
    } catch (error) {
      const shareButton = document.querySelector('#share-sense-result');
      if (shareButton) {
        shareButton.click();
        return;
      }
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    }
  });

  const startButton = document.querySelector('#training-start');
  const cells = [...document.querySelectorAll('[data-training-cell]')];
  const timerNode = document.querySelector('#training-timer');
  const scoreNode = document.querySelector('#training-score');
  if (!startButton || cells.length === 0 || !timerNode || !scoreNode) return;

  let score = 0;
  let timeLeft = 60;
  let activeIndex = -1;
  let timerId = null;

  const setActiveCell = () => {
    cells.forEach((cell) => cell.classList.remove('is-active'));
    activeIndex = Math.floor(Math.random() * cells.length);
    cells[activeIndex].classList.add('is-active');
  };

  const finishTraining = () => {
    window.clearInterval(timerId);
    timerId = null;
    activeIndex = -1;
    cells.forEach((cell) => cell.classList.remove('is-active'));
    startButton.innerHTML = `${icon('check')}もう一度トレーニング`;
    trackEvent('sense_training_complete', { score });
  };

  const startTraining = () => {
    window.clearInterval(timerId);
    score = 0;
    timeLeft = 60;
    scoreNode.textContent = String(score);
    timerNode.textContent = String(timeLeft);
    startButton.innerHTML = `${icon('target')}トレーニング中`;
    setActiveCell();
    trackEvent('sense_training_start');
    timerId = window.setInterval(() => {
      timeLeft -= 1;
      timerNode.textContent = String(Math.max(0, timeLeft));
      if (timeLeft <= 0) finishTraining();
    }, 1000);
  };

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      if (!timerId || index !== activeIndex) return;
      score += 1;
      scoreNode.textContent = String(score);
      setActiveCell();
    });
  });

  startButton.addEventListener('click', startTraining);
}

function applySenseHashRoute() {
  const match = location.hash.match(/^#sense=([a-z]+)_([a-z]+)$/);
  if (!match) return false;
  const [, primary, secondary] = match;
  if (!senseLabels[primary] || !senseLabels[secondary] || primary === secondary) return false;
  const archetype = getSenseArchetypeFromKeys(primary, secondary);
  const normalizedScores = buildSenseScoresForPair(primary, secondary);

  senseAnswers = [];
  document.body.classList.add('sense-result-ready');
  document.querySelector('#sense-step').textContent = '結果';
  document.querySelector('#sense-progress-text').textContent = '100%';
  document.querySelector('#sense-progress').style.width = '100%';
  document.querySelector('#sense-preview-name').textContent = archetype.name;
  document.querySelector('#sense-preview-catch').textContent = archetype.catchline;
  document.querySelector('#sense-score-preview').innerHTML = renderScoreGrid(normalizedScores, senseLabels);
  document.querySelector('#sense-quiz-box').innerHTML = renderSenseResult(archetype, normalizedScores);
  updatePostResultLab(archetype, normalizedScores);
  activateResultReveal();
  document.querySelector('#reset-sense-quiz')?.addEventListener('click', () => {
    senseAnswers = [];
    setResultHash('#gamesense');
    renderSenseQuiz();
  });
  attachShareHandlers('sense', {
    text: `GameSense Scan 8で「${archetype.name}」でした！${archetype.catchline}`,
    url: typeShareUrl(`gamesense.html#sense=${primary}_${secondary}`),
    hashtags: 'GameSenseScan,GameSpecLab',
    title: 'GameSense Scan 8',
    track: { archetype: archetype.name, source: 'type_directory' },
  });
  attachResultCardHero('sense', getSenseCardData(archetype, normalizedScores), {
    text: `GameSense Scan 8で「${archetype.name}」でした！ ${typeShareUrl(`gamesense.html#sense=${primary}_${secondary}`)}`,
    title: 'GameSense Scan 8',
    track: { archetype: archetype.name, source: 'type_directory' },
  });
  document.querySelector('#gamesense')?.scrollIntoView();
  trackEvent('sense_type_page_open', { archetype: archetype.name, primary, secondary });
  return true;
}

function applyGamerMbtiHashRoute() {
  const match = location.hash.match(/^#mbti=([IE][SN][TF][JP])$/);
  if (!match) return false;
  const code = match[1];
  const type = getGamerMbtiResult(code);
  if (!type?.title) return false;
  const scores = buildGamerMbtiScoresForCode(code);

  gamerMbtiAnswers = [];
  document.body.classList.add('gamer-mbti-result-ready');
  document.querySelector('#mbti-step').textContent = '結果';
  document.querySelector('#mbti-progress-text').textContent = '100%';
  document.querySelector('#mbti-progress').style.width = '100%';
  document.querySelector('#mbti-preview-code').textContent = type.code;
  document.querySelector('#mbti-preview-name').textContent = type.title;
  document.querySelector('#mbti-preview-catch').textContent = type.catchline;
  document.querySelector('#mbti-score-preview').innerHTML = renderGamerMbtiAxisGrid(scores);
  document.querySelector('#mbti-quiz-box').innerHTML = renderGamerMbtiResult(type, scores);
  activateResultReveal();
  renderMbtiGearList(type.code);
  document.querySelector('#reset-mbti-quiz')?.addEventListener('click', () => {
    gamerMbtiAnswers = [];
    document.body.classList.remove('gamer-mbti-result-ready');
    setResultHash('#gamer-mbti');
    renderGamerMbtiQuiz();
  });
  attachShareHandlers('mbti', {
    text: `ゲーマーMBTI診断で「${type.title}（${type.code}）」でした！${type.catchline}`,
    url: typeShareUrl(`gamer-mbti-${type.code.toLowerCase()}.html`),
    hashtags: 'ゲーマーMBTI,GameSpecLab',
    title: 'ゲーマーMBTIタイプ診断',
    track: { code: type.code, source: 'type_directory' },
  });
  const mbtiHashShareMeta = {
    text: `ゲーマーMBTI診断で「${type.title}（${type.code}）」でした！ ${typeShareUrl(`gamer-mbti-${type.code.toLowerCase()}.html`)}`,
    title: 'ゲーマーMBTIタイプ診断',
    track: { code: type.code, source: 'type_directory' },
  };
  mbtiCardCtx = { type, scores, shareMeta: mbtiHashShareMeta };
  attachResultCardHero('mbti', getMbtiCardData(type, scores), mbtiHashShareMeta);
  document.querySelector('#gamer-mbti')?.scrollIntoView();
  trackEvent('gamer_mbti_type_page_open', { code: type.code, title: type.title });
  return true;
}

function applyHashRoute() {
  const match = location.hash.match(/^#result=([\w-]+)/);
  if (!match) return;
  const profile = profiles.find((item) => item.id === match[1]);
  if (!profile) return;
  trackEvent('result_page_open', { result: profile.id, name: profile.name });
  document.querySelector('#diagnosis')?.classList.add('is-result-mode');
  const scores = Object.fromEntries(Object.keys(traitLabels).map((key) => [key, 0]));
  profile.traits.forEach((trait) => { scores[trait] = 8; });
  document.querySelector('#quiz-step').textContent = '結果';
  document.querySelector('#quiz-progress-text').textContent = '100%';
  document.querySelector('#quiz-progress').style.width = '100%';
  renderResultDetails(profile);
  updateShare(profile);
  document.querySelector('#preview-name').textContent = profile.name;
  document.querySelector('#preview-catch').textContent = profile.catchline;
  document.querySelector('#quiz-box').innerHTML = renderResultBody(profile, scores, {
    kickerIcon: 'link',
    kickerText: '共有された診断結果',
    actions: `<div class="result-actions"><a class="primary-link" href="#diagnosis">${icon('zap')}自分も診断する</a></div>`,
  });
  activateResultReveal();
  document.querySelector('#diagnosis').scrollIntoView();
}

// キャラ性別トグル（BOY/GIRL）: ページ内のMBTIキャラ画像を一括切替
// 早見表(results)・各タイプ詳細ページのヒーロー等、[data-mbti-dir-variant]がある全ページで動作
const MBTI_DIR_CODES = ['istj', 'isfj', 'infj', 'intj', 'istp', 'isfp', 'infp', 'intp',
  'estp', 'esfp', 'enfp', 'entp', 'estj', 'esfj', 'enfj', 'entj'];
function setupMbtiDirectoryToggle() {
  const btns = document.querySelectorAll('[data-mbti-dir-variant]');
  if (!btns.length) return;
  const re = new RegExp(`assets/types/(${MBTI_DIR_CODES.join('|')})(?:-f)?\\.png`);
  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.mbtiDirVariant;
      document.querySelectorAll('[data-mbti-dir-variant]').forEach((x) => {
        x.classList.toggle('is-active', x.dataset.mbtiDirVariant === v);
      });
      document.querySelectorAll('img').forEach((img) => {
        const m = (img.getAttribute('src') || '').match(re);
        if (!m) return;
        img.src = `assets/types/${m[1]}${v === 'b' ? '-f' : ''}.png?v=2`;
      });
    });
  });
}

hydrateStaticIcons();
enhanceLegalCards();
enhancePlainLinks();
setupMenuDrawer();
setupPostResultActions();
setupMbtiDirectoryToggle();

if (document.querySelector('#quiz-box')) {
  const restoredPartnerResult = answers.length === questions.length && savedPartnerHashMatches();
  renderQuiz();
  if (restoredPartnerResult) restoreResultScroll('#diagnosis', true);
}

if (document.querySelector('#pc-quiz-box')) {
  const restoredPcResult = pcAnswers.length === pcQuestions.length;
  renderPcQuiz();
  if (restoredPcResult) restoreResultScroll('#pc-build', true);
}

if (document.querySelector('#sense-quiz-box')) {
  const restoredSenseResult = savedSenseHashMatches();
  if (restoredSenseResult) {
    renderSenseQuiz();
    restoreResultScroll('#gamesense', true);
  } else if (!applySenseHashRoute()) {
    if (senseAnswers.length === senseQuestions.length) {
      senseAnswers = [];
      clearQuizAnswers('sense');
    }
    renderSenseQuiz();
  }
  window.addEventListener('hashchange', () => {
    if (!applySenseHashRoute()) {
      senseAnswers = [];
      clearQuizAnswers('sense');
      renderSenseQuiz();
    }
  });
}

if (document.querySelector('#mbti-quiz-box')) {
  const restoredGamerMbtiResult = savedGamerMbtiHashMatches();
  if (restoredGamerMbtiResult) {
    renderGamerMbtiQuiz();
    restoreResultScroll('#gamer-mbti', true);
  } else if (!applyGamerMbtiHashRoute()) {
    if (gamerMbtiAnswers.length === mbtiQuestions.length) {
      gamerMbtiAnswers = [];
      clearQuizAnswers('mbti');
    }
    renderGamerMbtiQuiz();
  }
  window.addEventListener('hashchange', () => {
    if (!applyGamerMbtiHashRoute()) {
      gamerMbtiAnswers = [];
      clearQuizAnswers('mbti');
      renderGamerMbtiQuiz();
    }
  });
}

if (document.querySelector('#result-links')) {
  renderResultLinks();
}

if (document.querySelector('#sense-result-links')) {
  renderSenseResultLinks();
}

if (document.querySelector('#mbti-result-links')) {
  renderGamerMbtiTypeLinks();
}

if (document.querySelector('#gamer-id-card-panel')) {
  renderGamerIdCardPanel();
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) renderGamerIdCardPanel();
  });
  // 結果ページなどから #gamer-id-card-panel で来た場合、描画後にパネルへ寄せて強調する。
  if (window.location.hash === '#gamer-id-card-panel') {
    const panel = document.querySelector('#gamer-id-card-panel');
    window.requestAnimationFrame(() => {
      panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      panel.classList.add('is-flash');
      window.setTimeout(() => panel.classList.remove('is-flash'), 1600);
    });
  }
}

if (document.querySelector('.type-hero-stage[data-holo]')) {
  const reducedHolo = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  setupHoloTilt(document, reducedHolo);
}

if (!document.querySelector('#gamer-mbti') && /^#mbti=([IE][SN][TF][JP])$/.test(location.hash)) {
  location.replace(`gamermbti.html${location.hash}`);
}

if (document.querySelector('#diagnosis')) {
  if (!savedPartnerHashMatches()) applyHashRoute();
  window.addEventListener('hashchange', applyHashRoute);
}

(function setupKonamiEasterEgg() {
  const sequence = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
  let progress = 0;
  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key === sequence[progress]) {
      progress += 1;
      if (progress === sequence.length) {
        progress = 0;
        triggerKonamiEasterEgg();
      }
    } else {
      progress = key === sequence[0] ? 1 : 0;
    }
  });
})();

function triggerKonamiEasterEgg() {
  trackEvent('easter_egg_konami');
  const flash = document.createElement('div');
  flash.className = 'konami-flash';
  flash.setAttribute('aria-hidden', 'true');
  document.body.appendChild(flash);
  window.setTimeout(() => flash.remove(), 900);

  const toast = document.createElement('div');
  toast.className = 'konami-toast';
  toast.innerHTML = `${icon('spark')}<div><strong>隠しコマンド発見！</strong><span>GamespecLabより、いつも診断してくれてありがとう。</span></div>`;
  document.body.appendChild(toast);
  window.requestAnimationFrame(() => toast.classList.add('is-visible'));
  window.setTimeout(() => {
    toast.classList.remove('is-visible');
    window.setTimeout(() => toast.remove(), 400);
  }, 3200);
}
