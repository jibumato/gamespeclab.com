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
  {
    title: '通話中のあなたに近いのは？',
    options: [
      { label: '必要な情報だけ短く出す', detail: '報告はコンパクトにしてプレイへ集中したい', traits: { micro: 2, competitive: 2 } },
      { label: '状況を整理して共有する', detail: '味方が動きやすい情報を渡したい', traits: { macro: 3, support: 1 } },
      { label: '空気を見ながら会話をつなぐ', detail: '沈黙や負けムードを軽くしたい', traits: { social: 3, chill: 1 } },
    ],
  },
  {
    title: 'チームで役割を選ぶなら？',
    options: [
      { label: '前に出て流れを作る', detail: '最初の勝負や突破口を担当したい', traits: { micro: 2, competitive: 2 } },
      { label: '全体を見て指示や調整をする', detail: '配置、時間、次の一手を考えたい', traits: { macro: 3, support: 1 } },
      { label: '味方が動きやすい土台を作る', detail: 'カバー、回復、準備、声かけが得意', traits: { support: 3, social: 1 } },
    ],
  },
  {
    title: '新しいゲームを始めたときは？',
    options: [
      { label: 'まず操作を触って慣れる', detail: '細かい手触りや反応を先に掴みたい', traits: { micro: 3, chill: 1 } },
      { label: '攻略や仕様を調べてから動く', detail: '仕組みを理解して効率よく伸びたい', traits: { macro: 3, competitive: 1 } },
      { label: '友だちと試しながら覚える', detail: '失敗も含めて一緒に遊ぶ時間を楽しみたい', traits: { social: 2, support: 1, chill: 1 } },
    ],
  },
  {
    title: '一番しっくりくる遊び方は？',
    options: [
      { label: '短時間でも濃く勝負したい', detail: '集中してランクや対戦を回したい', traits: { competitive: 3, micro: 1 } },
      { label: '予定を合わせてじっくり遊びたい', detail: '作戦や役割を決めて進めたい', traits: { macro: 2, support: 2 } },
      { label: '気分が合った日にゆるく遊びたい', detail: '誘いやすさと続けやすさを大事にしたい', traits: { chill: 3, social: 1 } },
    ],
  },
];

const profiles = [
  {
    id: 'clutch-ace',
    name: 'クラッチエース型',
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
];

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

function normalizeScores(scores, maxScores) {
  return Object.fromEntries(Object.keys(scores).map((key) => [
    key,
    Math.round(((scores[key] || 0) / Math.max(1, maxScores[key] || 1)) * 100),
  ]));
}

function rankScores(scores) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1]);
}

function getSenseArchetype(normalizedScores) {
  const ranked = rankScores(normalizedScores);
  const primary = ranked[0]?.[0] || 'awareness';
  const secondary = ranked.find(([key]) => key !== primary)?.[0] || 'prediction';
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
    ['shield', 'やさしい弱点', matrix.softWeakness],
    ['trophy', '伸ばし方', matrix.growth],
    ['gamepad', '活きる役割', matrix.role],
  ];
  return `
    <section class="sense-matrix-panel" aria-label="アーキタイプ詳細">
      <div class="sense-matrix-head">
        <span>${icon('chart')}SELF MATRIX</span>
        <strong>${archetype.name}の特徴</strong>
        <p>弱みは才能の裏返しとして扱います。あなたの良さを消すのではなく、使いやすく整えるための読み方です。</p>
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
        <span>${icon('spark')}肯定メモ</span>
        <p>${matrix.affirmation}</p>
      </div>
    </section>
  `;
}

function renderSenseResult(archetype, normalizedScores) {
  const primaryLabel = senseLabels[archetype.primary];
  const secondaryLabel = senseLabels[archetype.secondary];
  const topGames = senseGameSuggestions(archetype.primary, archetype.secondary);
  return `
    <div class="result-block sense-result-block">
      <div class="result-dialogue">
        <img class="result-mina-photo" src="assets/navi-mina.png" alt="" loading="lazy" />
        <img class="result-pipo-photo" src="assets/pipo-result.png" alt="" loading="lazy" />
        <div>
          <div class="result-kicker">${icon('chart')}GameSense Archetype</div>
          <h3 id="sense-quiz-title">${archetype.name}</h3>
          <p class="result-catch">${archetype.catchline}</p>
          <p>${archetype.summary}</p>
        </div>
      </div>
      ${renderRadarChart(normalizedScores, senseLabels, senseIcons)}
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
          <p>${topGames.join(' / ')} のように、判断や学習の手応えが出るゲームと相性が良いです。</p>
        </article>
      </div>
      ${renderSenseTheoryNote()}
      <div class="result-actions">
        <button class="primary-button" type="button" id="share-sense-result">${icon('share')}結果をシェア</button>
        <button class="ghost-button" type="button" id="reset-sense-quiz">${icon('target')}もう一度診断</button>
      </div>
    </div>
  `;
}

function senseGameSuggestions(primary, secondary) {
  const buckets = {
    awareness: ['VALORANT', 'Apex Legends', 'League of Legends'],
    prediction: ['VALORANT', 'Teamfight Tactics', 'Apex Legends'],
    pattern: ['Street Fighter 6', 'Slay the Spire', 'League of Legends'],
    spatial: ['Apex Legends', 'Fortnite', 'Monster Hunter'],
    speed: ['VALORANT', 'Overwatch 2', 'Street Fighter 6'],
    resource: ['League of Legends', 'Civilization', 'Minecraft'],
    mindgame: ['Street Fighter 6', 'Among Us', 'VALORANT'],
    adaptation: ['Rocket League', 'Apex Legends', 'Slay the Spire'],
  };
  return [...new Set([...(buckets[primary] || []), ...(buckets[secondary] || [])])].slice(0, 4);
}

function renderSenseQuiz() {
  const keys = Object.keys(senseLabels);
  const rawScores = getScores(senseAnswers, senseQuestions, 'sense', keys);
  const maxScores = getMaxScores(senseQuestions, 'sense', keys);
  const normalizedScores = normalizeScores(rawScores, maxScores);
  const archetype = getSenseArchetype(normalizedScores);
  const complete = senseAnswers.length === senseQuestions.length;
  const progress = Math.round((senseAnswers.length / senseQuestions.length) * 100);

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
      <span>${icon('spark')}強み: ${mainTrait}</span>
      <span>${icon('user')}相性: 一緒に伸びる相手</span>
      <span>${icon('gamepad')}初回: ${profile.games[0]}</span>
      <span>${icon('link')}沼: また誘いたくなる魅力</span>
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
        <h3 id="quiz-title">${profile.name}</h3>
        <p class="result-catch">${profile.catchline}</p>
        <p>${profile.summary}</p>
      </div>
    </div>
  `;
}

function renderResultReveal(profile) {
  return `
    <div class="result-reveal-card" aria-hidden="true">
      <div class="reveal-orb">
        <img src="assets/pipo-scan.png" alt="" loading="lazy" />
      </div>
      <div class="reveal-copy">
        <span>${icon('spark')}DUO SYNC SCAN</span>
        <strong>相性ログを解析中...</strong>
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

function resultDetailsMarkup(profile) {
  return `
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
  const shareText = `GameSpec Labで診断したら「${profile.name}」でした。${profile.shareLine || profile.catchline}`;
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
          <p>迷ったら直感をクリック。ピポは考えすぎて再起動しがちです。</p>
          <h3 id="quiz-title">${question.title}</h3>
        </div>
      </div>
      <div class="option-list">
        ${question.options.map((option, index) => `
          <button class="option-button" type="button" data-answer="${index}">
            <span class="option-main"><span class="option-icon">${icon(['zap', 'target', 'chat'][index])}</span><span><strong>${option.label}</strong><small>${option.detail}</small></span></span><span class="option-arrow">${icon('arrow')}</span>
          </button>
        `).join('')}
      </div>
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
    const text = `GameSpec Labで「${result.name}」でした。${result.catchline}\n${location.origin}${location.pathname}#result=${result.id}`;
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

function renderAffiliate(build) {
  return `
    <p class="affiliate-disclosure">当サイトはAmazonアソシエイトとして、適格販売により収入を得ています。</p>
    <div class="affiliate-grid">
      ${build.affiliateSlots.map((slot) => `
        <article class="affiliate-card">
          <div class="card-head"><p class="card-label">${icon('cart')}候補アイテム</p><span>SHOP</span></div>
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
      <span class="card-head"><span>${icon('trophy')}${profile.name}</span><small>TYPE</small></span>
      <strong>${profile.catchline}</strong>
      <span class="result-link-meta">${icon('gamepad')}${profile.games.slice(0, 2).join(' / ')}</span>
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

if (document.querySelector('#quiz-box')) {
  renderQuiz();
}

if (document.querySelector('#pc-quiz-box')) {
  renderPcQuiz();
}

if (document.querySelector('#sense-quiz-box')) {
  renderSenseQuiz();
}

if (document.querySelector('#result-links')) {
  renderResultLinks();
}

if (document.querySelector('#diagnosis')) {
  applyHashRoute();
  window.addEventListener('hashchange', applyHashRoute);
}
