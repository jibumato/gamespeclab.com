const AMAZON_ASSOCIATE_TAG = 'jbmt-22';

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

function amazonSearchUrl(query) {
  const params = new URLSearchParams({ k: query, tag: AMAZON_ASSOCIATE_TAG });
  return `https://www.amazon.co.jp/s?${params.toString()}`;
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
    catchline: '一緒に沼る相手は、褒め上手な観戦サポーター。',
    summary: '勝負どころで前に出られるタイプ。恋愛相性では、あなたの集中モードを邪魔せず、終わったあとにちゃんと盛り上げてくれる相手と噛み合います。',
    partner: '相性がいいのは「ナイス！」を惜しまない人。あなたが攻め、相手が空気を整える組み合わせが強いです。',
    chemistry: '通話初回は対戦ゲームより、軽めの協力ゲームを1本挟むと距離が縮まりやすいです。',
    games: ['VALORANT', 'Apex Legends', 'THE FINALS', 'Overcooked! 2'],
    pc: '高FPS重視。144Hz以上のモニター、ミドル以上のGPU、軽いマウスを優先。',
    offer: 'おすすめ環境: ゲーミングPC、144Hz/240Hzモニター、マウス、マウスパッド。',
    risks: '熱くなりすぎると反省会が短くなりがち。相手のテンション確認が鍵。',
    traits: ['micro', 'competitive'],
  },
  {
    id: 'igl-romance',
    name: 'IGL恋愛参謀型',
    catchline: '相性がいいのは、作戦会議まで楽しめる相棒。',
    summary: '盤面を読むのが得意で、勝ち筋を作るタイプ。恋愛では、言い合いではなく一緒に考える空気を作れる相手と長続きします。',
    partner: '相性がいいのは、提案を受け止めつつ自分の意見も返せる人。会話のキャッチボールがそのまま連携力になります。',
    chemistry: '最初は目的が分かりやすい協力ゲームや戦略ゲームが向いています。',
    games: ['League of Legends', 'VALORANT', 'Baldur’s Gate 3', 'Monster Hunter: World'],
    pc: '安定性重視。CPU、メモリ32GB、通話しやすいマイク環境を優先。',
    offer: 'おすすめ環境: BTO PC、CPU/メモリ、ゲーミングヘッドセット、マイク。',
    risks: '説明が長くなると相手が疲れることも。作戦は短く、勝ったら大きく喜ぶのが吉。',
    traits: ['macro', 'competitive'],
  },
  {
    id: 'cozy-link',
    name: 'まったり通話リンク型',
    catchline: '恋愛相性は、勝敗より会話の温度が近い人。',
    summary: '場をやわらかくするのが得意。ゲームそのものより「一緒にいる時間」を価値にできるので、初回の誘いやすさが抜群です。',
    partner: '相性がいいのは、雑談と沈黙の両方を楽しめる人。気楽な通話がそのまま距離感の良さになります。',
    chemistry: '短時間で笑えるゲームや、のんびり建築できるゲームが向いています。',
    games: ['Minecraft', 'Stardew Valley', 'PICO PARK', 'Party Animals'],
    pc: '静音と快適性重視。白系デスク、静かなファン、軽めのGPUでも満足度が高い構成。',
    offer: 'おすすめ環境: 入門ゲーミングPC、デスク周り、チェア、ヘッドセット。',
    risks: '相手がガチ寄りだと温度差が出やすいので、最初に遊び方のテンションを合わせると安定。',
    traits: ['social', 'chill'],
  },
  {
    id: 'support-hype',
    name: '沼らせサポート型',
    catchline: '相性がいいのは、あなたの支えにちゃんと気づく人。',
    summary: '味方を活かすのが上手いタイプ。恋愛相性では、派手なプレイより細かい気配りを見てくれる相手と深まりやすいです。',
    partner: '相性がいいのは、ありがとうを言える人。あなたが支え、相手が安心して前に出る関係が強いです。',
    chemistry: '役割分担がはっきりした協力ゲームで魅力が伝わります。',
    games: ['Overwatch 2', 'Monster Hunter: World', 'It Takes Two', 'Deep Rock Galactic'],
    pc: 'ボイスチャットと画面共有重視。安定回線、マイク、2画面環境が満足度を上げます。',
    offer: 'おすすめ環境: マイク、ヘッドセット、サブモニター、Wi-Fi/回線比較。',
    risks: '合わせすぎると疲れやすいです。自分が遊びたいタイトルも先に出すのが大事。',
    traits: ['support', 'social'],
  },
  {
    id: 'builder-duo',
    name: '共創ビルダー型',
    catchline: '一緒に積み上げるほど恋愛相性が伸びるタイプ。',
    summary: '短期決戦より、拠点づくりや育成でじわじわ強くなる相性が得意。長く遊ぶほど関係が深まるタイプです。',
    partner: '相性がいいのは、急かさず一緒に試行錯誤できる人。小さな達成を共有できる相手がぴったり。',
    chemistry: '共同作業があるゲームで自然に会話が増えます。',
    games: ['Palworld', 'Minecraft', 'Terraria', 'Satisfactory'],
    pc: '長時間快適性重視。冷却、ストレージ、メモリ、座りやすいチェアを優先。',
    offer: 'おすすめ環境: SSD、メモリ、チェア、デスク、長時間向け周辺機器。',
    risks: 'こだわりポイントが違うと作業分担がズレます。最初に役割をゆるく決めると快適。',
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
  return `<div class="tag-list">${items.map((item) => `<span>${item}</span>`).join('')}</div>`;
}

function renderScoreGrid(scores, labels) {
  return Object.keys(labels).map((key) => {
    const value = Math.min(100, scores[key] * 12);
    return `<div class="score-row"><span>${labels[key]}</span><div class="mini-track"><span style="width:${value}%"></span></div></div>`;
  }).join('');
}

function renderShareCard(profile, scores) {
  const topTraits = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  return `
    <article class="share-card-visual" aria-label="${profile.name}の共有カード">
      <div class="share-card-topline"><span>GameSpec Lab</span><span>Partner Match</span></div>
      <div>
        <p>あなたのゲームパートナー相性</p>
        <h3>${profile.name}</h3>
        <strong>${profile.catchline}</strong>
      </div>
      <div class="score-grid">
        ${topTraits.map(([trait, value]) => `<div class="score-row"><span>${traitLabels[trait]}</span><div class="mini-track"><span style="width:${Math.min(100, Math.max(35, value * 11))}%"></span></div></div>`).join('')}
      </div>
      <div class="share-card-footer"><span>おすすめ: ${profile.games.slice(0, 2).join(' / ')}</span><span>gamespec-lab</span></div>
    </article>
  `;
}

function renderResultDetails(profile) {
  document.querySelector('#result-cards').innerHTML = `
    <article class="result-card"><p class="card-label">恋愛・相棒相性</p><h3>${profile.partner}</h3><p>${profile.chemistry}</p></article>
    <article class="result-card"><p class="card-label">おすすめゲーム</p><h3>一緒に遊ぶならこのあたり</h3>${tagList(profile.games)}</article>
    <article class="result-card"><p class="card-label">推奨PC環境</p><h3>${profile.pc}</h3><p>${profile.offer}</p></article>
    <article class="result-card"><p class="card-label">相性の注意点</p><h3>揉めにくくするコツ</h3><p>${profile.risks}</p></article>
  `;
}

function updateShare(profile) {
  const shareText = `GameSpec Labで診断したら「${profile.name}」でした。${profile.catchline}`;
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
            <span><strong>${option.label}</strong><small>${option.detail}</small></span><span>→</span>
          </button>
        `).join('')}
      </div>
    `;
    document.querySelectorAll('[data-answer]').forEach((button) => {
      button.addEventListener('click', () => {
        answers.push(Number(button.dataset.answer));
        renderQuiz();
      });
    });
    return;
  }

  document.querySelector('#quiz-box').innerHTML = `
    <div class="result-block">
      <div class="result-kicker">あなたのタイプ</div>
      <h3 id="quiz-title">${result.name}</h3>
      <p class="result-catch">${result.catchline}</p>
      <p>${result.summary}</p>
      ${renderShareCard(result, scores)}
      <div class="result-actions">
        <button class="primary-button" type="button" id="share-result">結果をシェア</button>
        <button class="ghost-button" type="button" id="reset-quiz">もう一度診断</button>
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
      <p class="card-label">おすすめPC構成</p>
      <h3>${build.name}</h3>
      <p>${build.catchline}</p>
      <div class="spec-grid">${build.specs.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</div>
      <p>${build.summary}</p>
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
          <p class="card-label">おすすめアイテム</p>
          <h3>${slot.title}</h3>
          <p>${slot.body}</p>
          <a href="${slot.href}" target="_blank" rel="sponsored noopener noreferrer" data-affiliate="${slot.id}">
            ${slot.cta}
            <small>Amazon.co.jpで確認</small>
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

  if (!complete) {
    const question = pcQuestions[pcAnswers.length];
    document.querySelector('#pc-quiz-box').innerHTML = `
      <h3 id="pc-quiz-title">${question.title}</h3>
      <div class="option-list">
        ${question.options.map((option, index) => `
          <button class="option-button" type="button" data-pc-answer="${index}">
            <span><strong>${option.label}</strong><small>${option.detail}</small></span><span>→</span>
          </button>
        `).join('')}
      </div>
    `;
    document.querySelectorAll('[data-pc-answer]').forEach((button) => {
      button.addEventListener('click', () => {
        pcAnswers.push(Number(button.dataset.pcAnswer));
        renderPcQuiz();
      });
    });
    return;
  }

  document.querySelector('#pc-quiz-box').innerHTML = `
    <div class="result-block">
      <div class="result-kicker">あなた向けの構成</div>
      <h3 id="pc-quiz-title">${build.name}</h3>
      <p class="result-catch">${build.catchline}</p>
      <p>${build.summary}</p>
      <div class="result-actions">
        <a class="primary-link" href="#after-diagnosis">関連アイテムを見る</a>
        <button class="ghost-button" type="button" id="reset-pc-quiz">もう一度診断</button>
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
      <span>${profile.name}</span>
      <strong>${profile.catchline}</strong>
      <small>結果を表示</small>
    </a>
  `).join('');
}

function applyHashRoute() {
  const match = location.hash.match(/^#result=([\w-]+)/);
  if (!match) return;
  const profile = profiles.find((item) => item.id === match[1]);
  if (!profile) return;
  const scores = Object.fromEntries(Object.keys(traitLabels).map((key) => [key, 0]));
  profile.traits.forEach((trait) => { scores[trait] = 8; });
  renderResultDetails(profile);
  updateShare(profile);
  document.querySelector('#preview-name').textContent = profile.name;
  document.querySelector('#preview-catch').textContent = profile.catchline;
  document.querySelector('#quiz-box').innerHTML = `
    <div class="result-block">
      <div class="result-kicker">共有された診断結果</div>
      <h3 id="quiz-title">${profile.name}</h3>
      <p class="result-catch">${profile.catchline}</p>
      <p>${profile.summary}</p>
      ${renderShareCard(profile, scores)}
      <div class="result-actions"><a class="primary-link" href="#diagnosis">自分も診断する</a></div>
    </div>
  `;
  document.querySelector('#diagnosis').scrollIntoView();
}

renderResultLinks();
renderQuiz();
renderPcQuiz();
applyHashRoute();
window.addEventListener('hashchange', applyHashRoute);
