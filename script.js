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
    gearGuide: ['240Hz前後のモニター', '軽量ワイヤレスマウス', '滑りやすい大型マウスパッド'],
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
    gearGuide: ['32GBメモリ構成', '聞き取りやすいUSBマイク', '長時間でも疲れにくいヘッドセット'],
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
    gearGuide: ['静音キーボード', '白系デスク周り', '軽くて圧迫感の少ないヘッドセット'],
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
    gearGuide: ['ノイズを拾いにくいマイク', 'Discord用サブモニター', '低遅延ヘッドセット'],
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
    gearGuide: ['2TBクラスのNVMe SSD', '32GBメモリ', '長時間座れるチェアと広めのデスク'],
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
    gearGuide: ['軽量ワイヤレスマウス', '低遅延ヘッドセット', '声がこもりにくいUSBマイク'],
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
    gearGuide: ['低遅延ヘッドセット', 'Discord用サブモニター', '握りやすい軽量マウス'],
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
    gearGuide: ['軽量ワイヤレスマウス', '静音キーボード', '長時間座れるチェア'],
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
    gearGuide: ['サブモニター', '聞き取りやすいマイク', '安定したネット環境'],
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
    gearGuide: ['聞き取りやすいマイク', 'サブモニター', '静音キーボード'],
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
    gearGuide: ['240Hz前後のモニター', '軽量マウス', 'リプレイ確認用ストレージ'],
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
    gearGuide: ['180Hz以上のモニター', '軽いヘッドセット', '静音キーボード'],
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
    summary: 'あなたは「なんとなく勝つ」よりも、勝てる形を丁寧に積み上げたいタイプです。装備、ルート、役割、集合タイミングのような細部を軽く見ないので、チームにいるだけで事故率が下がります。派手なクリップを量産するタイプではなくても、気づけば一番信頼されていることが多いはずです。',
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
    summary: 'あなたは味方のHP、声のトーン、焦り方、ちょっとした沈黙に気づけるタイプです。誰かが崩れそうな時、派手な指示より先に必要なフォローを出せるので、チームの安心感が底上げされます。「助かった」と言われる場面が多いなら、それは偶然ではなくあなたの観察力です。',
    strength: '回復、カバー、救助、声かけ、空気の修復が丁寧です。目立たない貢献を積み重ねて、チームがもう一戦やりたくなる状態を作れます。',
    growth: '人に合わせられる力は大きな魅力です。ただ、自分の希望を後回しにしすぎると疲れやすいので、「今日はこの役もやってみたい」と先に出すと優しさが長持ちします。',
    role: 'ヒーラー、カバー役、後衛サポート、協力ゲームの調整役',
    partner: '前に出るタイプや、ありがとうを返せる人と組むと強みが伝わります。',
    caution: '強い言い方のT型とは、アドバイスを責めではなく改善案として受け取る合図を作ると楽です。あなたは傷つきやすいのではなく、場の温度を丁寧に受け取れる人です。',
    games: ['Overwatch 2', 'Deep Rock Galactic', 'Helldivers 2', 'It Takes Two', 'PlateUp!'],
  },
  INFJ: {
    title: '静かな預言者型',
    catchline: '勝ち筋と空気の両方を見て、チームを静かに整えるタイプ。',
    summary: 'あなたは試合の流れだけでなく、味方の気持ちの流れまで読んでいます。「このままだと誰かが黙る」「次の負けで空気が重くなる」みたいな予兆に気づきやすく、先回りして場をやわらげられます。目立つリーダーではなくても、チームが崩れない理由の中心にいるタイプです。',
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
    summary: 'あなたは目の前の盛り上がりより、「この構成は最後に何が強いのか」「どこで崩れるのか」を見ています。感覚で動いているように見える試合でも、頭の中では勝ち筋の地図を組み立てているはずです。言葉数は少なくても、判断に筋があるので、噛み合う相手からはかなり頼られます。',
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
    summary: 'あなたは長く語るより、実際のプレイで答えを出したいタイプです。状況を見て、必要な操作を淡々と選び、勝負どころで急に存在感を出します。通話で目立たないのに、リザルトやクラッチ場面で「あれ、めちゃくちゃ仕事してない？」と思われることが多いはずです。',
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
    summary: 'あなたは攻略通りに完璧に動くより、自分の感覚がハマった瞬間に強くなるタイプです。気分、音、操作感、味方との空気が噛み合うと、急に魅せるプレイが出ます。型に縛られすぎないぶん、他の人には真似しにくいセンスが出やすいです。',
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
    summary: 'あなたはゲームを「勝つための道具」だけではなく、物語や思い出を作る場所として味わえるタイプです。相手の言葉や空気を大事にするので、一緒に遊んだ人に安心感が残ります。強さの形は派手な支配力ではなく、「この人と遊ぶと落ち着く」と思わせる深さです。',
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
    summary: 'あなたは「強いらしい」で終わらせず、なぜ強いのか、どこまで通用するのかを知りたくなるタイプです。ビルド、武器、キャラ相性、仕様の抜け道を調べている時間もゲームの一部になっています。ひとりで考えているように見えて、実はチームの勝ち筋になる発見を積み上げています。',
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
    summary: 'あなたはチャンスの匂いがした瞬間、体が先に動くタイプです。停滞した試合、誰も前に出られない空気、ラストの勝負どころで一気に流れを奪えます。キルログやクラッチの瞬間にテンションが上がるなら、それはあなたの勝負勘が目を覚ましているサインです。',
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
    summary: 'あなたはゲームの温度を上げるのがうまいタイプです。ナイス、悲鳴、笑い、悔しさまでリアクションに変えられるので、初回通話でも距離が縮まりやすいはずです。勝つことだけでなく、その場が楽しかった記憶を残せるのが大きな才能です。',
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
    summary: 'あなたは「これ面白そう！」からゲームを動かせるタイプです。勝ち筋だけではなく、遊び方そのものを発明するのがうまく、うまくいっても失敗しても場に物語を作れます。あなたがいると、ただの周回やランクがちょっとした冒険になります。',
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
    summary: 'あなたは「今のメタはこれ」と言われるほど、その裏側を見たくなるタイプです。強い型を真似するだけでは満足せず、なぜ強いのか、どこから崩せるのかを試したくなります。相手が想定していない選択肢を作る時、あなたの革命家スイッチが入ります。',
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
    summary: 'あなたは曖昧な時間を減らし、チームを前に進められるタイプです。「何をすれば勝てるか」「誰が何を見るか」をはっきりさせるので、ランクや固定チームで頼られやすいはずです。空気で察するより、行動に落とす力で勝率を上げます。',
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
    summary: 'あなたはゲームそのものだけでなく、人が集まる場を整えるのが得意です。誘う、褒める、フォローする、初対面同士をつなぐといった行動が自然にできます。勝ち負けの結果以上に、「またこのメンバーで遊びたい」と思わせる力があります。',
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
    summary: 'あなたは人を見ながらチームを動かせるタイプです。単に指示を出すだけでなく、味方が前向きに動ける言葉を選べます。負けが続いた時も、空気を立て直して「次いける」と思わせる力があるので、固定チームで特に強みが出ます。',
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
    summary: 'あなたは勝利条件を見抜き、必要な行動をはっきり出せるタイプです。厳しい場面でも迷いを減らし、チームを勝つ方向へ引っ張れます。熱くなると圧が出ることもありますが、その根っこにあるのは「このメンバーで勝ちたい」という責任感です。',
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
let senseAnswers = [];
let gamerMbtiAnswers = [];

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

const sensePartnerTraitMap = {
  awareness: ['macro', 'social'],
  prediction: ['macro', 'competitive'],
  pattern: ['macro', 'chill'],
  spatial: ['micro', 'support'],
  speed: ['micro', 'competitive'],
  resource: ['support', 'macro'],
  mindgame: ['social', 'competitive'],
  adaptation: ['support', 'chill'],
};

const mbtiPartnerTraitMap = {
  E: ['social', 'competitive'],
  I: ['chill', 'support'],
  S: ['micro', 'support'],
  N: ['macro', 'social'],
  T: ['competitive', 'macro'],
  F: ['social', 'support'],
  J: ['macro', 'support'],
  P: ['micro', 'chill'],
};

function buildPartnerWeights(groups, baseWeight = 3) {
  const weights = {};
  groups.forEach((group, index) => {
    const weight = Math.max(1, baseWeight - index);
    (group || []).forEach((trait) => {
      weights[trait] = (weights[trait] || 0) + weight;
    });
  });
  return weights;
}

function getTopCompatiblePartnerTypes(weights, limit = 3) {
  return profiles
    .map((profile) => {
      const score = profile.traits.reduce((sum, trait) => sum + (weights[trait] || 0), 0);
      const matchedTraits = profile.traits.filter((trait) => weights[trait]);
      return { profile, score, matchedTraits };
    })
    .sort((a, b) => b.score - a.score || profiles.indexOf(a.profile) - profiles.indexOf(b.profile))
    .slice(0, limit);
}

function getSenseCompatiblePartners(archetype) {
  const weights = buildPartnerWeights([
    sensePartnerTraitMap[archetype.primary],
    sensePartnerTraitMap[archetype.secondary],
  ], 4);
  return getTopCompatiblePartnerTypes(weights);
}

function getMbtiCompatiblePartners(code) {
  const weights = buildPartnerWeights([...code].map((letter) => mbtiPartnerTraitMap[letter]), 3);
  return getTopCompatiblePartnerTypes(weights);
}

function renderCompatiblePartnersPanel(matches, sourceLabel = '診断結果') {
  return `
    <section class="compat-partner-panel" aria-label="相性のいい相手タイプTOP3">
      <div class="compat-partner-head">
        <span>${icon('link')}PARTNER MATCH TOP 3</span>
        <strong>相性のいい相手タイプ</strong>
        <p>${sourceLabel}から、プレイ温度・通話ペース・役割の噛み合いやすさを見ています。恋愛判定ではなく、ゲーム中に組みやすい相棒傾向です。</p>
      </div>
      <div class="compat-partner-grid">
        ${matches.map(({ profile }, index) => `
          <article class="compat-partner-card rank-${index + 1}">
            <div class="compat-partner-rank">
              <span>${String(index + 1).padStart(2, '0')}</span>
              <small>${profile.syncCode}</small>
            </div>
            <div>
              <h3>${profile.name}</h3>
              <p>${profile.catchline}</p>
              <div class="compat-partner-meta">
                <span>${icon('spark')}相性軸: ${profile.traits.map((trait) => traitLabels[trait] || trait).join(' × ')}</span>
                <span>${icon('gamepad')}${profile.games.slice(0, 2).join(' / ')}</span>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
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

function renderGamerMbtiResult(type, scores) {
  const compatiblePartners = getMbtiCompatiblePartners(type.code);
  return `
    <div class="result-block result-sequence is-revealing gamer-mbti-result">
      ${renderResultReveal({
        name: type.title,
        revealLabel: 'GAMER TYPE SCAN',
        revealHeadline: 'プレイ人格ログを照合中...',
        revealImage: 'assets/navi-mina.png',
      })}
      <div class="result-content">
        <div class="result-dialogue">
          <img class="result-mina-photo" src="assets/navi-mina.png" alt="" loading="lazy" />
          <img class="result-pipo-photo" src="assets/pipo-scan.png" alt="" loading="lazy" />
          <div>
            <div class="result-kicker">${icon('user')}GAMER MBTI TYPE</div>
            <h3 id="mbti-quiz-title">${type.title}</h3>
            <div class="mbti-code-note" aria-label="ゲーマータイプ補足コード">
              <span>${icon('tag')}参考コード</span>
              <strong>${type.code}</strong>
            </div>
            <p class="result-catch">${type.catchline}</p>
            <p>${type.summary}</p>
          </div>
        </div>
        ${renderGamerMbtiAxisGrid(scores)}
        <section class="mbti-result-grid" aria-label="ゲーマーMBTI結果詳細">
          <article class="result-card"><div class="card-head"><p class="card-label">${icon('spark')}才能ラベル</p><span>01</span></div><h3>ゲーム内で光るあなたらしさ</h3><p>${type.strength}</p></article>
          <article class="result-card"><div class="card-head"><p class="card-label">${icon('trophy')}克服ポイント</p><span>02</span></div><h3>弱みに見える才能の使い方</h3><p>${type.growth}</p></article>
          <article class="result-card"><div class="card-head"><p class="card-label">${icon('gamepad')}おすすめロール</p><span>03</span></div><h3>${type.role}</h3><p>あなたの判断基準とプレイ温度が出やすいポジションです。</p></article>
          <article class="result-card"><div class="card-head"><p class="card-label">${icon('link')}相性傾向</p><span>04</span></div><h3>組むと噛み合いやすい相手</h3><p>${type.partner}</p></article>
          <article class="result-card result-card-wide"><div class="card-head"><p class="card-label">${icon('shield')}ギスギス回避メモ</p><span>05</span></div><h3>違いを知ると神コンビになる</h3><p>${type.caution}</p></article>
          <article class="result-card result-card-wide"><div class="card-head"><p class="card-label">${icon('gamepad')}刺さりやすいゲーム</p><span>06</span></div><h3>Steam/PCで探すならこのあたり</h3><p>このタイプの気持ちよさが出やすいタイトルです。上手さより「どの場面で楽しいか」の目安として見てください。</p>${renderGameSuggestionList(type.games)}</article>
        </section>
        ${renderCompatiblePartnersPanel(compatiblePartners, type.title)}
        <div class="mbti-compat-note">
          <span>${icon('chat')}MBTI風相性メモ</span>
          <p>T型は改善案を愛として出しがちで、F型はまず共感を求めがちです。違いを責めるより、「今は共感」「次に改善」と順番を分けると、ゲームの空気が一気に整います。</p>
        </div>
        <div class="theory-note">
          <span>${icon('shield')}ENTERTAINMENT DIAGNOSIS</span>
          <p>この診断はMBTI風の分類をゲーム内の行動傾向へ翻訳したエンタメ診断です。公式なMBTI検査や心理検査ではありません。</p>
        </div>
        <div class="result-actions">
          <button class="primary-button" type="button" id="share-mbti-result">${icon('share')}結果をシェア</button>
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
      <img src="assets/pipo-gag.png" alt="" loading="lazy" />
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

function renderGameSuggestionList(games) {
  return `
    <div class="game-pick-list">
      ${games.map((game) => `
        <div class="game-pick">
          <strong>${icon('gamepad')}${game}</strong>
          <small>${gameGenreLabels[game] || 'PC/Steam候補'}として、タイプの強みが出やすいタイトルです。</small>
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

function getSenseArchetype(normalizedScores) {
  const ranked = rankScores(normalizedScores);
  const primary = ranked[0]?.[0] || 'awareness';
  const secondary = ranked.find(([key]) => key !== primary)?.[0] || 'prediction';
  return getSenseArchetypeFromKeys(primary, secondary);
}

function getSenseArchetypeFromKeys(primary, secondary) {
  const preset = senseArchetypes[`${primary}_${secondary}`];
  if (preset) {
    return {
      primary,
      secondary,
      name: `${preset[0]}型`,
      catchline: preset[1],
      summary: preset[2],
    };
  }
  return {
    primary,
    secondary,
    name: `${senseCoreNames[primary]}${senseStyleNames[secondary]}型`,
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
    const [x, y] = pointFor(index, Math.max(4, scores[key] || 0));
    return `<circle cx="${x}" cy="${y}" r="4"><title>${labels[key]} ${scores[key] || 0}</title></circle>`;
  }).join('');
  const rows = rankScores(scores).map(([key, value], index) => `
    <div class="ability-rank-row">
      <span>${String(index + 1).padStart(2, '0')}</span>
      <strong>${icon(icons[key] || 'target')}${labels[key]}</strong>
      <div class="mini-track"><span style="width:${Math.max(8, value)}%"></span></div>
      <em>${value}</em>
    </div>
  `).join('');
  return `
    <div class="sense-radar-card">
      <svg class="radar-svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="8能力レーダーチャート">
        ${rings}
        ${axes}
        <polygon points="${scorePoints}" class="radar-score"></polygon>
        ${dots}
      </svg>
      <div class="ability-rank-list">${rows}</div>
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
                <b>${value}</b>
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
  const cards = [
    ['spark', 'あなたの強み', matrix.strength],
    ['shield', '克服ポイント', matrix.softWeakness],
    ['trophy', '伸ばし方', matrix.growth],
    ['gamepad', '活きる役割', matrix.role],
  ];
  return `
    <section class="sense-matrix-panel" aria-label="アーキタイプ詳細">
      <div class="sense-matrix-head">
        <span>${icon('chart')}SELF MATRIX</span>
        <strong>${archetype.name}の特徴</strong>
        <p>弱みに見える部分にも、あなたらしいプレイスタイルの種があります。この分析結果は、あなたの良さを残したまま伸ばすためのガイドです。</p>
      </div>
      <div class="sense-matrix-grid">
        ${cards.map(([cardIcon, title, text]) => `
          <article class="sense-matrix-card">
            <span>${icon(cardIcon)}${title}</span>
            <p>${text}</p>
          </article>
        `).join('')}
      </div>
      <div class="sense-affirmation">
        <img src="assets/navi-mina.png" alt="" loading="lazy" />
        <div>
          <span>${icon('spark')}ミナのワンポイントメモ</span>
          <p>ミナから見ると、${matrix.affirmation} その持ち味は消さずに、試合で使いやすい形に整えていこう。</p>
        </div>
      </div>
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
        revealImage: 'assets/pipo-scan.png',
      })}
      <div class="result-content">
        <div class="result-dialogue">
          <div class="sense-core-icons" aria-label="アーキタイプを構成する上位能力">
            <div class="sense-core-orb is-primary">
              <small>01</small>
              ${icon(senseIcons[archetype.primary] || 'target')}
              <strong>${primaryLabel}</strong>
            </div>
            <span class="sense-core-link">×</span>
            <div class="sense-core-orb is-secondary">
              <small>02</small>
              ${icon(senseIcons[archetype.secondary] || 'spark')}
              <strong>${secondaryLabel}</strong>
            </div>
          </div>
          <div>
            <div class="result-kicker">${icon('chart')}GameSense Archetype</div>
            <h3 id="sense-quiz-title">${archetype.name}</h3>
            <p class="result-catch">${archetype.catchline}</p>
            <p>${archetype.summary}</p>
          </div>
        </div>
        ${renderRadarChart(normalizedScores, senseLabels, senseIcons)}
        ${renderTopSenseAbilities(normalizedScores)}
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
            <span>${icon('gamepad')}向きやすいゲーム</span>
            <p>判断や学習の手応えが出るゲームと相性が良いです。対戦だけでなく、Steamで探しやすい協力・戦略・ローグライト系も候補に入れています。</p>
            ${renderGameSuggestionList(topGames)}
          </article>
        </div>
        ${renderCompatiblePartnersPanel(compatiblePartners, `${primaryLabel} × ${secondaryLabel}`)}
        ${renderSenseTheoryNote()}
        <div class="result-actions">
          <button class="primary-button" type="button" id="share-sense-result">${icon('share')}結果をシェア</button>
          <a class="ghost-link" href="gamermbti.html">${icon('user')}ゲーマータイプも見る</a>
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
  return [...new Set([...(buckets[primary] || []), ...(buckets[secondary] || [])])].slice(0, 6);
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

function getSenseGearReasons(primaryLabel, secondaryLabel, lowestLabel) {
  return {
    monitor: `${primaryLabel}が強く出たあなたは、画面上の小さな変化を拾えるほど判断が活きます。高リフレッシュのモニターは、敵の出入りや味方の位置変化を見逃しにくくするための土台です。`,
    mouse: `${secondaryLabel}をプレイに反映するには、思った方向へすぐ動かせる入力環境が大事です。軽量マウスは、判断から操作までのズレを減らし、あなたの反応をそのまま動きに乗せやすくします。`,
    mousepad: `${lowestLabel}は「同じ動きを再現する」練習で伸ばしやすい能力です。大型マウスパッドは、振り向きや追いエイムの動き幅を確保して、感覚を安定させる助けになります。`,
  };
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
  const gearReasonMonitor = document.querySelector('#gear-reason-monitor');
  const gearReasonMouse = document.querySelector('#gear-reason-mouse');
  const gearReasonMousepad = document.querySelector('#gear-reason-mousepad');
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
  const gearReasons = getSenseGearReasons(primaryLabel, secondaryLabel, lowestLabel);
  if (gearReasonMonitor) gearReasonMonitor.textContent = gearReasons.monitor;
  if (gearReasonMouse) gearReasonMouse.textContent = gearReasons.mouse;
  if (gearReasonMousepad) gearReasonMousepad.textContent = gearReasons.mousepad;
  shareMeta.topThree.forEach(([key, value], index) => {
    const node = document.querySelector(`#post-result-top${index + 1}`);
    if (node) node.textContent = `${String(index + 1).padStart(2, '0')} ${senseLabels[key]} ${value}`;
  });
  if (trainingTitle) trainingTitle.textContent = `あなたの${lowestLabel}を高める1分間トレーニング`;
  if (trainingCopy) trainingCopy.textContent = `${lowestLabel}は、短い反復で感覚を掴みやすい能力です。光ったパネルを追って、変化に気づく回路を温めます。`;
  if (communityCopy) communityCopy.textContent = `あなたは「${primaryLabel} × ${secondaryLabel}」の組み合わせ。結果画面の相性TOP3から、噛み合いやすい相棒タイプを見つけられます。`;
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
  document.querySelector('#sense-preview-name').textContent = archetype.name;
  document.querySelector('#sense-preview-catch').textContent = archetype.catchline;
  document.querySelector('#sense-score-preview').innerHTML = renderScoreGrid(normalizedScores, senseLabels);

  if (!complete) {
    const question = senseQuestions[senseAnswers.length];
    document.querySelector('#sense-quiz-box').innerHTML = `
      <div class="question-dialogue">
        <img src="assets/pipo-scan.png" alt="" loading="lazy" />
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
        renderSenseQuiz();
      });
    });
    document.querySelector('#back-sense-quiz')?.addEventListener('click', () => {
      senseAnswers.pop();
      renderSenseQuiz();
    });
    return;
  }

  trackEvent('sense_diagnosis_complete', { archetype: archetype.name, primary: archetype.primary, secondary: archetype.secondary });
  document.querySelector('#sense-quiz-box').innerHTML = renderSenseResult(archetype, normalizedScores);
  updatePostResultLab(archetype, normalizedScores);
  activateResultReveal();
  document.querySelector('#reset-sense-quiz').addEventListener('click', () => {
    senseAnswers = [];
    renderSenseQuiz();
  });
  document.querySelector('#share-sense-result').addEventListener('click', async () => {
    const text = `GameSpec LabのGameSense Scan 8で「${archetype.name}」でした。${archetype.catchline}\n${location.origin}${location.pathname}`;
    trackEvent('sense_share_click', { archetype: archetype.name });
    const shareButton = document.querySelector('#share-sense-result');
    try {
      if (navigator.share) {
        await navigator.share({ title: 'GameSense Scan 8', text });
        return;
      }
      await navigator.clipboard.writeText(text);
      shareButton.innerHTML = `${icon('check')}コピーしました`;
    } catch (error) {
      if (error?.name === 'AbortError') return;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    }
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
  document.querySelector('#mbti-preview-code').textContent = previewType.code;
  document.querySelector('#mbti-preview-name').textContent = previewType.title;
  document.querySelector('#mbti-preview-catch').textContent = previewType.catchline;
  document.querySelector('#mbti-score-preview').innerHTML = renderGamerMbtiAxisGrid(previewScores);

  if (!complete) {
    const question = mbtiQuestions[gamerMbtiAnswers.length];
    document.querySelector('#mbti-quiz-box').innerHTML = `
      <div class="question-dialogue">
        <img src="assets/pipo-scan.png" alt="" loading="lazy" />
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
        renderGamerMbtiQuiz();
      });
    });
    document.querySelector('#back-mbti-quiz')?.addEventListener('click', () => {
      gamerMbtiAnswers.pop();
      renderGamerMbtiQuiz();
    });
    return;
  }

  trackEvent('gamer_mbti_complete', { code: type.code, title: type.title });
  document.querySelector('#mbti-quiz-box').innerHTML = renderGamerMbtiResult(type, scores);
  activateResultReveal();
  document.querySelector('#reset-mbti-quiz')?.addEventListener('click', () => {
    gamerMbtiAnswers = [];
    document.body.classList.remove('gamer-mbti-result-ready');
    renderGamerMbtiQuiz();
  });
  document.querySelector('#share-mbti-result')?.addEventListener('click', async () => {
    const text = `GameSpec LabのゲーマーMBTIタイプ診断で「${type.title}」でした。参考コード: ${type.code}\n${type.catchline}\n${location.origin}${location.pathname}#mbti=${type.code}`;
    const shareButton = document.querySelector('#share-mbti-result');
    trackEvent('gamer_mbti_share_click', { code: type.code });
    try {
      if (navigator.share) {
        await navigator.share({ title: 'ゲーマーMBTIタイプ診断', text });
        return;
      }
      await navigator.clipboard.writeText(text);
      shareButton.innerHTML = `${icon('check')}コピーしました`;
    } catch (error) {
      if (error?.name === 'AbortError') return;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    }
  });
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
    <div class="result-dialogue">
      <img class="result-mina-photo" src="assets/navi-mina.png" alt="" loading="lazy" />
      <img class="result-pipo-photo" src="assets/pipo-result.png" alt="" loading="lazy" />
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

function renderResultReveal(profile) {
  const label = profile.revealLabel || 'DUO SYNC SCAN';
  const headline = profile.revealHeadline || '相性ログを解析中...';
  const image = profile.revealImage || 'assets/pipo-scan.png';
  return `
    <div class="result-reveal-card" aria-hidden="true">
      <div class="reveal-orb">
        <img src="${image}" alt="" loading="lazy" />
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
  };
  if (reduced) {
    finish();
    return;
  }
  window.setTimeout(finish, 1450);
}

function renderSyncCodeDetail(profile) {
  return `
    <article class="result-card result-card-wide sync-code-detail">
      <div class="card-head"><p class="card-label">${icon('link')}GSL SYNC CODE</p><span>00</span></div>
      <div class="sync-code-detail-main">
        <strong>${profile.syncCode}</strong>
        <div>
          <h3>${profile.syncCodeLabel}</h3>
          <p>ゲーム中の相性を、行動テンポ、通話スタイル、勝負温度、チーム内の立ち位置で表したGameSpec Lab独自コードです。</p>
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
  const shareText = `GameSpec Labで診断したら「${profile.syncCode} / ${profile.name}」でした。${profile.shareLine || profile.catchline}`;
  const shareUrl = `${location.origin}${location.pathname}#result=${profile.id}`;
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
  document.querySelector('#preview-name').textContent = result.name;
  document.querySelector('#preview-catch').textContent = result.catchline;
  document.querySelector('#score-preview').innerHTML = renderScoreGrid(scores, traitLabels);
  renderResultDetails(result);
  updateShare(result);

  if (!complete) {
    const question = questions[answers.length];
    document.querySelector('#quiz-box').innerHTML = `
      <div class="question-dialogue">
        <img src="assets/pipo-scan.png" alt="" loading="lazy" />
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
        renderQuiz();
      });
    });
    document.querySelector('#back-quiz')?.addEventListener('click', () => {
      answers.pop();
      renderQuiz();
    });
    return;
  }

  trackEvent('diagnosis_complete', { result: result.id, name: result.name });

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
    location.hash = 'diagnosis';
    renderQuiz();
  });
  document.querySelector('#share-result').addEventListener('click', async () => {
    const text = `GameSpec Labで「${result.syncCode} / ${result.name}」でした。${result.syncCodeLabel}\n${location.origin}${location.pathname}#result=${result.id}`;
    trackEvent('share_click', { result: result.id, name: result.name, method: navigator.share ? 'native' : 'clipboard' });
    const shareButton = document.querySelector('#share-result');
    try {
      if (navigator.share) {
        await navigator.share({ title: 'GameSpec Lab', text });
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
        renderPcQuiz();
      });
    });
    document.querySelector('#back-pc-quiz')?.addEventListener('click', () => {
      pcAnswers.pop();
      renderPcQuiz();
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
        <a class="primary-link" href="#after-diagnosis">${icon('cart')}候補を下で確認</a>
        <button class="ghost-button" type="button" id="reset-pc-quiz">${icon('target')}もう一度診断</button>
      </div>
    </div>
  `;
  document.querySelector('#reset-pc-quiz').addEventListener('click', () => {
    pcAnswers = [];
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
      <span class="card-head"><span>${icon(senseIcons[type.primary] || 'chart')}${type.name}</span><small>G8</small></span>
      <strong>${type.catchline}</strong>
      <span class="result-link-meta">${icon(senseIcons[type.secondary] || 'spark')}${type.primaryLabel} × ${type.secondaryLabel}</span>
      <small>${icon('arrow')}結果を表示</small>
    </a>
  `).join('');
}

function renderGamerMbtiTypeLinks() {
  const resultLinks = document.querySelector('#mbti-result-links');
  if (!resultLinks) return;
  const base = resultLinks.dataset.base || 'gamermbti.html';
  resultLinks.innerHTML = Object.entries(gamerMbtiTypes).map(([code, type]) => `
    <a class="result-link-card mbti-type-card" href="${base}#mbti=${code}">
      <span class="card-head"><span>${icon('user')}${type.title}</span><small>${code}</small></span>
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
    const text = `GameSpec LabのGameSense Scan 8で「${type}」でした。\n${location.origin}${location.pathname}`;
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

  senseAnswers = Array.from({ length: senseQuestions.length }, () => 0);
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
    location.hash = 'gamesense';
    renderSenseQuiz();
  });
  document.querySelector('#share-sense-result')?.addEventListener('click', async () => {
    const text = `GameSpec LabのGameSense Scan 8で「${archetype.name}」でした。${archetype.catchline}\n${location.origin}${location.pathname}`;
    trackEvent('sense_share_click', { archetype: archetype.name, source: 'type_directory' });
    const shareButton = document.querySelector('#share-sense-result');
    try {
      if (navigator.share) {
        await navigator.share({ title: 'GameSense Scan 8', text });
        return;
      }
      await navigator.clipboard.writeText(text);
      shareButton.innerHTML = `${icon('check')}コピーしました`;
    } catch (error) {
      if (error?.name === 'AbortError') return;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    }
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

  gamerMbtiAnswers = Array.from({ length: mbtiQuestions.length }, () => 0);
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
  document.querySelector('#reset-mbti-quiz')?.addEventListener('click', () => {
    gamerMbtiAnswers = [];
    document.body.classList.remove('gamer-mbti-result-ready');
    location.hash = 'gamer-mbti';
    renderGamerMbtiQuiz();
  });
  document.querySelector('#share-mbti-result')?.addEventListener('click', async () => {
    const text = `GameSpec LabのゲーマーMBTIタイプ診断で「${type.title}」でした。参考コード: ${type.code}\n${type.catchline}\n${location.origin}${location.pathname}#mbti=${type.code}`;
    const shareButton = document.querySelector('#share-mbti-result');
    trackEvent('gamer_mbti_share_click', { code: type.code, source: 'type_directory' });
    try {
      if (navigator.share) {
        await navigator.share({ title: 'ゲーマーMBTIタイプ診断', text });
        return;
      }
      await navigator.clipboard.writeText(text);
      shareButton.innerHTML = `${icon('check')}コピーしました`;
    } catch (error) {
      if (error?.name === 'AbortError') return;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    }
  });
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

hydrateStaticIcons();
enhanceLegalCards();
enhancePlainLinks();
setupMenuDrawer();
setupPostResultActions();

if (document.querySelector('#quiz-box')) {
  renderQuiz();
}

if (document.querySelector('#pc-quiz-box')) {
  renderPcQuiz();
}

if (document.querySelector('#sense-quiz-box')) {
  if (!applySenseHashRoute()) renderSenseQuiz();
  window.addEventListener('hashchange', () => {
    if (!applySenseHashRoute()) {
      senseAnswers = [];
      renderSenseQuiz();
    }
  });
}

if (document.querySelector('#mbti-quiz-box')) {
  if (!applyGamerMbtiHashRoute()) renderGamerMbtiQuiz();
  window.addEventListener('hashchange', () => {
    if (!applyGamerMbtiHashRoute()) {
      gamerMbtiAnswers = [];
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

if (!document.querySelector('#gamer-mbti') && /^#mbti=([IE][SN][TF][JP])$/.test(location.hash)) {
  location.replace(`gamermbti.html${location.hash}`);
}

if (document.querySelector('#diagnosis')) {
  applyHashRoute();
  window.addEventListener('hashchange', applyHashRoute);
}
