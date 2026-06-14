const AMAZON_ASSOCIATE_TAG = 'jbmt-22';
const ANALYTICS_KEY = 'gamespecLabEvents';

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

const iconPaths = {
  ad: '<path d="M4 6h16v12H4z"/><path d="M8 10h4"/><path d="M8 14h8"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
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
  try {
    const current = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify([event, ...current].slice(0, 80)));
  } catch (error) {
    window.dispatchEvent(new CustomEvent('gamespec:event', { detail: event }));
    return;
  }
  window.dispatchEvent(new CustomEvent('gamespec:event', { detail: event }));
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

const questions = [
  {
    title: '初デュオで一番テンションが上がる瞬間は？',
    options: [
      { label: '撃ち合いで一気にひっくり返す', detail: '勝負どころで前に出たい', traits: { micro: 3, competitive: 2 } },
      { label: '作戦がきれいに刺さる', detail: '読み合いと準備で勝ちたい', traits: { macro: 3, support: 1 } },
      { label: '通話で笑いながら進む', detail: '勝敗より一緒に遊ぶ空気感', traits: { social: 3, chill: 2 } },
    ],
  },
  {
    title: '相手にされるとうれしいことは？',
    options: [
      { label: 'ナイスをちゃんと言ってくれる', detail: '褒め合いで調子が上がる', traits: { social: 2, micro: 1, support: 1 } },
      { label: '次の動きを一緒に考えてくれる', detail: '反省会も楽しめる', traits: { macro: 2, competitive: 1, support: 1 } },
      { label: '負けても空気を重くしない', detail: '長く遊べる相性を大事にする', traits: { chill: 3, social: 1 } },
    ],
  },
  {
    title: 'ゲーム選びで一番大事なのは？',
    options: [
      { label: 'ランクや成長が見える', detail: '上達の手応えがほしい', traits: { competitive: 3, micro: 1 } },
      { label: '協力してクリアできる', detail: '役割分担があると燃える', traits: { support: 3, social: 1 } },
      { label: '短時間でも気楽に遊べる', detail: '誘いやすさと続けやすさ重視', traits: { chill: 3, social: 1 } },
    ],
  },
  {
    title: '負けが続いたときのあなたは？',
    options: [
      { label: '原因を探してもう一回', detail: '改善ポイントが見えると楽しい', traits: { macro: 2, competitive: 2 } },
      { label: '一回ふざけて空気を変える', detail: '流れの悪さを会話でほどく', traits: { social: 3, chill: 1 } },
      { label: '味方が動きやすいよう支える', detail: '自分の役割を変えて立て直す', traits: { support: 3, macro: 1 } },
    ],
  },
  {
    title: 'あなたの強みを一言でいうと？',
    options: [
      { label: '反応速度と手元の精度', detail: '細かい操作に自信あり', traits: { micro: 3, competitive: 1 } },
      { label: '全体を見る判断力', detail: '盤面と味方の位置を見ている', traits: { macro: 3, support: 1 } },
      { label: '相手がまた遊びたくなる空気', detail: '誘われやすさが武器', traits: { social: 3, chill: 1 } },
    ],
  },
  {
    title: '理想のゲームパートナーは？',
    options: [
      { label: '一緒に勝ちにいける人', detail: '熱量が近いと一気に深まる', traits: { competitive: 3, macro: 1 } },
      { label: 'お互いを立てられる人', detail: '役割が噛み合うと強い', traits: { support: 3, social: 1 } },
      { label: '雑談だけでも成立する人', detail: 'ゲーム外の余白も大事', traits: { chill: 2, social: 2 } },
    ],
  },
];

const profiles = [
  {
    id: 'clutch-ace',
    name: 'クラッチエース型',
    catchline: '一緒にハマる相棒は、ナイスを拾ってくれる観戦サポーター。',
    summary: '勝負どころで前に出られるタイプ。ゲーム相性では、あなたの集中モードを邪魔せず、終わったあとにちゃんと盛り上げてくれる相手と噛み合います。',
    partner: '相性がいいのは「ナイス！」を惜しまない人。あなたが攻め、相手が空気を整える組み合わせが強いです。',
    chemistry: '通話初回は対戦ゲームより、軽めの協力ゲームを1本挟むと距離が縮まりやすいです。',
    games: ['VALORANT', 'Apex Legends', 'THE FINALS', 'Overcooked! 2'],
    gameNotes: [
      ['VALORANT / Apex Legends', '短時間で見せ場が作りやすく、褒め合いのきっかけが増えます。'],
      ['THE FINALS', '撃ち合いだけでなく破壊や立ち回りでも盛り上がれるので、通話向きです。'],
      ['Overcooked! 2', '初回はガチ対戦より協力系を挟むと、熱量の差が出にくくなります。'],
    ],
    pc: '高FPS重視。144Hz以上のモニター、ミドル以上のGPU、軽いマウスを優先。',
    offer: 'おすすめ環境: ゲーミングPC、144Hz/240Hzモニター、マウス、マウスパッド。',
    gearGuide: ['240Hz前後のモニター', '軽量ワイヤレスマウス', '滑りやすい大型マウスパッド'],
    risks: '熱くなりすぎると反省会が短くなりがち。相手のテンション確認が鍵。',
    goodPartner: 'あなたの勝負どころを見逃さず、終わったあとに「今のよかった」と言える人。',
    toughPartner: '毎回すぐ反省会に入る人や、ミスを細かく詰める人とは熱量がぶつかりやすいです。',
    firstDuo: '最初はVALORANTのカジュアル、Apexのミックステープ、Overcooked! 2のような短め協力がおすすめ。',
    voiceLine: '「今の判断よかった。次もそのノリでいこ」',
    conflictTip: '負けが続いたら、原因探しの前に一回だけ良かったプレイを言葉にすると空気が戻ります。',
    shareLine: '勝負どころで輝くクラッチ型。褒め上手な相棒と組むと一気に伸びる。',
    traits: ['micro', 'competitive'],
  },
  {
    id: 'igl-romance',
    name: 'IGL連携参謀型',
    catchline: '相性がいいのは、作戦会議まで楽しめる相棒。',
    summary: '盤面を読むのが得意で、勝ち筋を作るタイプ。相性面では、言い合いではなく一緒に考える空気を作れる相手と長続きします。',
    partner: '相性がいいのは、提案を受け止めつつ自分の意見も返せる人。会話のキャッチボールがそのまま連携力になります。',
    chemistry: '最初は目的が分かりやすい協力ゲームや戦略ゲームが向いています。',
    games: ['League of Legends', 'VALORANT', 'Baldur’s Gate 3', 'Monster Hunter: World'],
    gameNotes: [
      ['League of Legends / VALORANT', '作戦を短く共有するほど強みが出ます。反省会まで楽しめる相手向きです。'],
      ['Baldur’s Gate 3', '選択肢を相談しながら進められるので、会話の相性が見えやすいです。'],
      ['Monster Hunter', '役割や準備を話し合えるため、参謀タイプの良さが自然に伝わります。'],
    ],
    pc: '安定性重視。CPU、メモリ32GB、通話しやすいマイク環境を優先。',
    offer: 'おすすめ環境: BTO PC、CPU/メモリ、ゲーミングヘッドセット、マイク。',
    gearGuide: ['32GBメモリ構成', '聞き取りやすいUSBマイク', '長時間でも疲れにくいヘッドセット'],
    risks: '説明が長くなると相手が疲れることも。作戦は短く、勝ったら大きく喜ぶのが吉。',
    goodPartner: '提案を否定せず受け止め、自分の考えも返してくれる会話キャッチボール型。',
    toughPartner: 'その場のノリだけで動きたい人とは、テンポの違いで疲れやすいです。',
    firstDuo: 'Baldur’s Gate 3、Monster Hunter、VALORANTのアンレートなど、相談しながら進めるゲームが向いています。',
    voiceLine: '「その作戦いいね。次は私こっち見るよ」',
    conflictTip: '説明が長くなりそうな時は、作戦を一言にまとめてから動くと相手が乗りやすくなります。',
    shareLine: '盤面を読んで勝ち筋を作る参謀型。作戦会議まで楽しめる相棒と相性抜群。',
    traits: ['macro', 'competitive'],
  },
  {
    id: 'cozy-link',
    name: 'まったり通話リンク型',
    catchline: 'プレイ相性は、勝敗より会話の温度が近い人。',
    summary: '場をやわらかくするのが得意。ゲームそのものより「一緒にいる時間」を価値にできるので、初回の誘いやすさが抜群です。',
    partner: '相性がいいのは、雑談と沈黙の両方を楽しめる人。気楽な通話がそのまま距離感の良さになります。',
    chemistry: '短時間で笑えるゲームや、のんびり建築できるゲームが向いています。',
    games: ['Minecraft', 'Stardew Valley', 'PICO PARK', 'Party Animals'],
    gameNotes: [
      ['Minecraft / Stardew Valley', '作業しながら雑談できるので、沈黙も気まずくなりにくいです。'],
      ['PICO PARK', '短時間で笑いが起きやすく、初回通話の緊張をほぐせます。'],
      ['Party Animals', '勝ち負けよりハプニングで盛り上がれるため、ゆるい相性チェックに向きます。'],
    ],
    pc: '静音と快適性重視。白系デスク、静かなファン、軽めのGPUでも満足度が高い構成。',
    offer: 'おすすめ環境: 入門ゲーミングPC、デスク周り、チェア、ヘッドセット。',
    gearGuide: ['静音キーボード', '白系デスク周り', '軽くて圧迫感の少ないヘッドセット'],
    risks: '相手がガチ寄りだと温度差が出やすいので、最初に遊び方のテンションを合わせると安定。',
    goodPartner: '沈黙も雑談も同じくらい気楽に楽しめて、勝敗より一緒にいる時間を大事にする人。',
    toughPartner: '毎回ランクや効率を最優先する人とは、遊び方の温度差が出やすいです。',
    firstDuo: 'Minecraft、Stardew Valley、PICO PARKなど、話しながらゆるく遊べるタイトルがぴったり。',
    voiceLine: '「今日は勝ち負けより、のんびり遊べたらうれしい」',
    conflictTip: '相手がガチ寄りなら、始める前に「今日はまったり寄りでいい？」と温度合わせをすると安心。',
    shareLine: '勝敗より通話の空気を大事にする癒し型。気楽に誘える相棒と長続きしやすい。',
    traits: ['social', 'chill'],
  },
  {
    id: 'support-hype',
    name: '沼らせサポート型',
    catchline: '相性がいいのは、あなたの支えにちゃんと気づく人。',
    summary: '味方を活かすのが上手いタイプ。ゲーム相性では、派手なプレイより細かい気配りを見てくれる相手と噛み合いやすいです。',
    partner: '相性がいいのは、ありがとうを言える人。あなたが支え、相手が安心して前に出る関係が強いです。',
    chemistry: '役割分担がはっきりした協力ゲームで魅力が伝わります。',
    games: ['Overwatch 2', 'Monster Hunter: World', 'It Takes Two', 'Deep Rock Galactic'],
    gameNotes: [
      ['Overwatch 2', 'カバーや回復など、支える上手さが伝わりやすいです。'],
      ['Monster Hunter / Deep Rock Galactic', '準備、救助、役割分担で自然に感謝が生まれます。'],
      ['It Takes Two', '会話しながら協力する場面が多く、距離を縮めやすいです。'],
    ],
    pc: 'ボイスチャットと画面共有重視。安定回線、マイク、2画面環境が満足度を上げます。',
    offer: 'おすすめ環境: マイク、ヘッドセット、サブモニター、Wi-Fi/回線比較。',
    gearGuide: ['ノイズを拾いにくいマイク', 'Discord用サブモニター', '低遅延ヘッドセット'],
    risks: '合わせすぎると疲れやすいです。自分が遊びたいタイトルも先に出すのが大事。',
    goodPartner: 'あなたのフォローに気づいて、ちゃんと「助かった」と返してくれる人。',
    toughPartner: '支えてもらうのが当たり前になりやすい人とは、知らないうちに疲れが溜まります。',
    firstDuo: 'Overwatch 2、Monster Hunter、It Takes Twoなど、役割が見えやすい協力ゲームが向いています。',
    voiceLine: '「今のカバー助かった。次はこっちも合わせるね」',
    conflictTip: '合わせすぎる前に、自分がやりたい役割や遊びたいゲームを先に一つ出すとバランスが取れます。',
    shareLine: '味方を活かすサポート型。ありがとうを言える相棒と組むと一番輝く。',
    traits: ['support', 'social'],
  },
  {
    id: 'builder-duo',
    name: '共創ビルダー型',
    catchline: '一緒に積み上げるほどプレイ相性が伸びるタイプ。',
    summary: '短期決戦より、拠点づくりや育成でじわじわ強くなる相性が得意。長く遊ぶほど関係が深まるタイプです。',
    partner: '相性がいいのは、急かさず一緒に試行錯誤できる人。小さな達成を共有できる相手がぴったり。',
    chemistry: '共同作業があるゲームで自然に会話が増えます。',
    games: ['Palworld', 'Minecraft', 'Terraria', 'Satisfactory'],
    gameNotes: [
      ['Palworld / Minecraft', '拠点づくりや探索で、自然に役割分担が生まれます。'],
      ['Terraria', '小さな目標を積み重ねやすく、長く遊ぶほど仲が深まります。'],
      ['Satisfactory', '効率化や建築を一緒に考えられるので、共同作業の相性が見えます。'],
    ],
    pc: '長時間快適性重視。冷却、ストレージ、メモリ、座りやすいチェアを優先。',
    offer: 'おすすめ環境: SSD、メモリ、チェア、デスク、長時間向け周辺機器。',
    gearGuide: ['2TBクラスのNVMe SSD', '32GBメモリ', '長時間座れるチェアと広めのデスク'],
    risks: 'こだわりポイントが違うと作業分担がズレます。最初に役割をゆるく決めると快適。',
    goodPartner: '急かさず、作業や育成の小さな進捗を一緒に喜べる人。',
    toughPartner: 'すぐ結果を求める人や、効率だけで進めたい人とはペースが合いにくいです。',
    firstDuo: 'Palworld、Minecraft、Terraria、Satisfactoryなど、拠点づくりや育成があるゲームが相性良好。',
    voiceLine: '「今日はここまで作れたの、けっこう良くない？」',
    conflictTip: 'こだわりがぶつかりそうな時は、建築担当、探索担当のように役割をゆるく分けると楽です。',
    shareLine: '一緒に積み上げるほど仲が深まる共創型。長く遊べる相棒とじわじわ強くなる。',
    traits: ['macro', 'chill'],
  },
];

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
      { id: 'starter-monitor', title: '180Hz前後のフルHDモニター', body: '入門構成でも体感差が出やすい高リフレッシュ候補です。', cta: 'Amazonで180Hzモニターを見る', href: amazonSearchUrl('ゲーミングモニター 180Hz 24インチ') },
      { id: 'starter-device', title: '軽量ワイヤレス入門デバイス', body: 'マウスとヘッドセットをまとめて探しやすい組み合わせです。', cta: 'Amazonで軽量ゲーミングデバイスを見る', href: amazonSearchUrl('軽量 ワイヤレス ゲーミングマウス ヘッドセット') },
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
      { id: 'fps-monitor', title: '240Hz/OLEDゲーミングモニター', body: '高FPSタイプと相性がよい新しめのモニター候補です。', cta: 'Amazonで240Hzモニターを見る', href: amazonSearchUrl('240Hz OLED ゲーミングモニター') },
      { id: 'fps-mouse', title: '8K対応ワイヤレスマウス', body: '競技向けの軽量・高ポーリングレート系を探せます。', cta: 'Amazonで8Kワイヤレスマウスを見る', href: amazonSearchUrl('8K ワイヤレス ゲーミングマウス 軽量') },
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
      { id: 'quality-monitor', title: 'WQHD 240Hz/OLEDモニター', body: '高画質構成と合わせて見たいモニター候補です。', cta: 'AmazonでWQHD 240Hzモニターを見る', href: amazonSearchUrl('WQHD 240Hz OLED ゲーミングモニター') },
      { id: 'quality-parts', title: 'Gen5 SSD・DDR5メモリ', body: 'ストレージやメモリを増やしたいときの候補です。', cta: 'AmazonでGen5 SSDとDDR5を見る', href: amazonSearchUrl('PCIe Gen5 NVMe SSD 2TB DDR5 メモリ') },
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
      { id: 'stream-mic', title: 'USB/XLR対応配信マイク', body: '配信や通話の満足度に直結しやすいマイク候補です。', cta: 'AmazonでUSB XLRマイクを見る', href: amazonSearchUrl('USB XLR 配信 マイク') },
      { id: 'stream-monitor', title: 'サブモニター・モバイルモニター', body: '配信管理、Discord、攻略表示に使いやすい候補です。', cta: 'Amazonでサブモニターを見る', href: amazonSearchUrl('モバイルモニター 4K サブモニター') },
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
      { id: 'compact-desk', title: '白系デスク・チェア環境', body: '見た目を整えたい人向けのデスク周り候補です。', cta: 'Amazonで白系デスク環境を見る', href: amazonSearchUrl('白 ゲーミングデスク チェア') },
      { id: 'compact-quiet', title: '静音キーボード・低遅延ヘッドセット', body: '通話しながら長く遊ぶ人に向いた候補です。', cta: 'Amazonで静音デバイスを見る', href: amazonSearchUrl('静音 ゲーミングキーボード 低遅延 ヘッドセット') },
    ],
    needs: ['portable', 'comfort'],
  },
];

let answers = [];
let pcAnswers = [];

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

function getPcBuild(scores) {
  return pcBuilds
    .map((build) => ({ build, score: build.needs.reduce((sum, need) => sum + scores[need], 0) }))
    .sort((a, b) => b.score - a.score)[0].build;
}

function tagList(items) {
  return `<div class="tag-list">${items.map((item) => `<span>${icon('tag')}${item}</span>`).join('')}</div>`;
}

function miniGuideList(items, itemIcon = 'check') {
  return `<div class="mini-guide-list">${items.map((item) => `<span>${icon(itemIcon)}${item}</span>`).join('')}</div>`;
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

function renderScoreGrid(scores, labels) {
  return Object.keys(labels).map((key) => {
    const value = Math.min(100, scores[key] * 12);
    const scoreIcon = traitIcons[key] || pcNeedIcons[key] || 'target';
    return `<div class="score-row"><span class="score-label">${icon(scoreIcon)}${labels[key]}</span><div class="mini-track"><span style="width:${value}%"></span></div></div>`;
  }).join('');
}

function renderShareCard(profile, scores) {
  const topTraits = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  return `
    <article class="share-card-visual" aria-label="${profile.name}の共有カード">
      <div class="share-card-topline"><span>${icon('spark')}GameSpec Lab</span><span>${icon('link')}Duo Sync</span></div>
      <div>
        <p>${icon('target')}あなたのゲームパートナー相性</p>
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

function renderResultDetails(profile) {
  document.querySelector('#result-cards').innerHTML = `
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('link')}ゲーム連携・相棒傾向</p><span>01</span></div><h3>${profile.partner}</h3><p>${profile.chemistry}</p></article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('gamepad')}おすすめゲーム</p><span>02</span></div><h3>一緒に遊ぶならこのあたり</h3>${renderGamePicks(profile)}</article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('monitor')}推奨PC環境</p><span>03</span></div><h3>${profile.pc}</h3><p>${profile.offer}</p>${miniGuideList(profile.gearGuide, 'spark')}</article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('shield')}相性の注意点</p><span>04</span></div><h3>揉めにくくするコツ</h3><p>${profile.risks}</p></article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('user')}相性がいい相手</p><span>05</span></div><h3>一緒に伸びるタイプ</h3><p>${profile.goodPartner}</p></article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('zap')}すれ違いやすい相手</p><span>06</span></div><h3>先に知っておきたい温度差</h3><p>${profile.toughPartner}</p></article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('chat')}通話で刺さる一言</p><span>07</span></div><h3>${profile.voiceLine}</h3><p>${profile.conflictTip}</p></article>
    <article class="result-card"><div class="card-head"><p class="card-label">${icon('spark')}初回デュオ案</p><span>08</span></div><h3>最初に遊ぶなら</h3><p>${profile.firstDuo}</p></article>
  `;
}

function updateShare(profile) {
  const shareText = `GameSpec Labで診断したら「${profile.name}」でした。${profile.shareLine || profile.catchline}`;
  const shareUrl = `${location.origin}${location.pathname}#result=${profile.id}`;
  document.querySelector('#share-preview-text').textContent = shareText;
  document.querySelector('#tweet-link').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
}

function renderQuiz() {
  const scores = getScores(answers, questions, 'traits', Object.keys(traitLabels));
  const result = getResult(scores);
  const complete = answers.length === questions.length;
  const progress = Math.round((answers.length / questions.length) * 100);

  document.querySelector('#quiz-step').textContent = complete ? '結果' : `質問 ${answers.length + 1} / ${questions.length}`;
  document.querySelector('#quiz-progress-text').textContent = `${progress}%`;
  document.querySelector('#quiz-progress').style.width = `${progress}%`;
  document.querySelector('#preview-name').textContent = result.name;
  document.querySelector('#preview-catch').textContent = result.catchline;
  document.querySelector('#score-preview').innerHTML = renderScoreGrid(scores, traitLabels);
  renderResultDetails(result);
  updateShare(result);

  if (!complete) {
    const question = questions[answers.length];
    document.querySelector('#quiz-box').innerHTML = `
      <h3 id="quiz-title">${question.title}</h3>
      <div class="option-list">
        ${question.options.map((option, index) => `
          <button class="option-button" type="button" data-answer="${index}">
            <span class="option-main"><span class="option-icon">${icon(['zap', 'target', 'chat'][index])}</span><span><strong>${option.label}</strong><small>${option.detail}</small></span></span><span class="option-arrow">${icon('arrow')}</span>
          </button>
        `).join('')}
      </div>
    `;
    document.querySelectorAll('[data-answer]').forEach((button) => {
      button.addEventListener('click', () => {
        if (answers.length === 0) trackEvent('diagnosis_start');
        answers.push(Number(button.dataset.answer));
        renderQuiz();
      });
    });
    return;
  }

  trackEvent('diagnosis_complete', { result: result.id, name: result.name });

  document.querySelector('#quiz-box').innerHTML = `
    <div class="result-block">
      <div class="result-kicker">${icon('trophy')}あなたのタイプ</div>
      <h3 id="quiz-title">${result.name}</h3>
      <p class="result-catch">${result.catchline}</p>
      <p>${result.summary}</p>
      ${renderShareCard(result, scores)}
      <div class="result-actions">
        <button class="primary-button" type="button" id="share-result">${icon('share')}結果をシェア</button>
        <button class="ghost-button" type="button" id="reset-quiz">${icon('target')}もう一度診断</button>
      </div>
    </div>
  `;
  document.querySelector('#reset-quiz').addEventListener('click', () => {
    answers = [];
    location.hash = 'diagnosis';
    renderQuiz();
  });
  document.querySelector('#share-result').addEventListener('click', async () => {
    const text = `GameSpec Labで「${result.name}」でした。${result.catchline}\n${location.origin}${location.pathname}#result=${result.id}`;
    trackEvent('share_click', { result: result.id, name: result.name, method: navigator.share ? 'native' : 'clipboard' });
    if (navigator.share) {
      await navigator.share({ title: 'GameSpec Lab', text });
    } else {
      await navigator.clipboard.writeText(text);
      document.querySelector('#share-result').textContent = 'コピーしました';
    }
  });
}

function renderPcCard(build) {
  return `
    <article class="pc-card">
      <div class="card-head"><p class="card-label">${icon('monitor')}おすすめPC構成</p><span>BUILD</span></div>
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

function renderAffiliate(build) {
  return `
    <p class="affiliate-disclosure">当サイトはAmazonアソシエイトとして、適格販売により収入を得ています。</p>
    <div class="affiliate-grid">
      ${build.affiliateSlots.map((slot) => `
        <article class="affiliate-card">
          <div class="card-head"><p class="card-label">${icon('cart')}おすすめアイテム</p><span>SHOP</span></div>
          <h3>${slot.title}</h3>
          <p>${slot.body}</p>
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
  document.querySelector('#pc-preview').innerHTML = renderPcCard(build);
  document.querySelector('#pc-score-preview').innerHTML = renderScoreGrid(scores, pcNeedLabels);
  document.querySelector('#pc-detail').innerHTML = renderPcCard(build);
  document.querySelector('#affiliate-slots').innerHTML = renderAffiliate(build);
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
    `;
    document.querySelectorAll('[data-pc-answer]').forEach((button) => {
      button.addEventListener('click', () => {
        if (pcAnswers.length === 0) trackEvent('pc_diagnosis_start');
        pcAnswers.push(Number(button.dataset.pcAnswer));
        renderPcQuiz();
      });
    });
    return;
  }

  trackEvent('pc_diagnosis_complete', { build: build.id, name: build.name });

  document.querySelector('#pc-quiz-box').innerHTML = `
    <div class="result-block">
      <div class="result-kicker">${icon('cpu')}あなた向けの構成</div>
      <h3 id="pc-quiz-title">${build.name}</h3>
      <p class="result-catch">${build.catchline}</p>
      <p>${build.summary}</p>
      <div class="result-actions">
        <a class="primary-link" href="#after-diagnosis">${icon('cart')}関連アイテムを見る</a>
        <button class="ghost-button" type="button" id="reset-pc-quiz">${icon('target')}もう一度診断</button>
      </div>
    </div>
  `;
  document.querySelector('#reset-pc-quiz').addEventListener('click', () => {
    pcAnswers = [];
    renderPcQuiz();
  });
}

function renderResultLinks() {
  document.querySelector('#result-links').innerHTML = profiles.map((profile) => `
    <a class="result-link-card" href="#result=${profile.id}">
      <span class="card-head"><span>${icon('trophy')}${profile.name}</span><small>TYPE</small></span>
      <strong>${profile.catchline}</strong>
      <small>${icon('arrow')}結果を表示</small>
    </a>
  `).join('');
}

function applyHashRoute() {
  const match = location.hash.match(/^#result=([\w-]+)/);
  if (!match) return;
  const profile = profiles.find((item) => item.id === match[1]);
  if (!profile) return;
  trackEvent('result_page_open', { result: profile.id, name: profile.name });
  const scores = Object.fromEntries(Object.keys(traitLabels).map((key) => [key, 0]));
  profile.traits.forEach((trait) => { scores[trait] = 8; });
  renderResultDetails(profile);
  updateShare(profile);
  document.querySelector('#preview-name').textContent = profile.name;
  document.querySelector('#preview-catch').textContent = profile.catchline;
  document.querySelector('#quiz-box').innerHTML = `
    <div class="result-block">
      <div class="result-kicker">${icon('link')}共有された診断結果</div>
      <h3 id="quiz-title">${profile.name}</h3>
      <p class="result-catch">${profile.catchline}</p>
      <p>${profile.summary}</p>
      ${renderShareCard(profile, scores)}
      <div class="result-actions"><a class="primary-link" href="#diagnosis">${icon('zap')}自分も診断する</a></div>
    </div>
  `;
  document.querySelector('#diagnosis').scrollIntoView();
}

hydrateStaticIcons();
enhanceLegalCards();
enhancePlainLinks();
setupMenuDrawer();

if (document.querySelector('#result-links')) {
  renderResultLinks();
  renderQuiz();
  renderPcQuiz();
  applyHashRoute();
  window.addEventListener('hashchange', applyHashRoute);
}
