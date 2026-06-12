import { type CSSProperties, useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeJapaneseYen,
  BarChart3,
  Check,
  Copy,
  Gamepad2,
  HeartHandshake,
  Monitor,
  RotateCcw,
  Share2,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react'
import heroImage from './assets/gamespec-hero.png'
import './App.css'

type Trait = 'micro' | 'macro' | 'social' | 'chill' | 'competitive' | 'support'

type Option = {
  label: string
  detail: string
  traits: Partial<Record<Trait, number>>
}

type Question = {
  title: string
  options: Option[]
}

type ResultProfile = {
  id: string
  name: string
  catchline: string
  summary: string
  partner: string
  chemistry: string
  games: string[]
  pc: string
  offer: string
  risks: string
  traits: Trait[]
}

const traitLabels: Record<Trait, string> = {
  micro: 'ミクロ',
  macro: 'マクロ',
  social: '通話温度',
  chill: 'まったり',
  competitive: '勝負欲',
  support: '支援力',
}

const questions: Question[] = [
  {
    title: '初デュオで一番テンションが上がる瞬間は？',
    options: [
      {
        label: '撃ち合いで一気にひっくり返す',
        detail: '勝負どころで前に出たい',
        traits: { micro: 3, competitive: 2 },
      },
      {
        label: '作戦がきれいに刺さる',
        detail: '読み合いと準備で勝ちたい',
        traits: { macro: 3, support: 1 },
      },
      {
        label: '通話で笑いながら進む',
        detail: '勝敗より一緒に遊ぶ空気感',
        traits: { social: 3, chill: 2 },
      },
    ],
  },
  {
    title: '相手にされるとうれしいことは？',
    options: [
      {
        label: 'ナイスをちゃんと言ってくれる',
        detail: '褒め合いで調子が上がる',
        traits: { social: 2, micro: 1, support: 1 },
      },
      {
        label: '次の動きを一緒に考えてくれる',
        detail: '反省会も楽しめる',
        traits: { macro: 2, competitive: 1, support: 1 },
      },
      {
        label: '負けても空気を重くしない',
        detail: '長く遊べる相性を大事にする',
        traits: { chill: 3, social: 1 },
      },
    ],
  },
  {
    title: 'ゲーム選びで一番大事なのは？',
    options: [
      {
        label: 'ランクや成長が見える',
        detail: '上達の手応えがほしい',
        traits: { competitive: 3, micro: 1 },
      },
      {
        label: '協力してクリアできる',
        detail: '役割分担があると燃える',
        traits: { support: 3, social: 1 },
      },
      {
        label: '短時間でも気楽に遊べる',
        detail: '誘いやすさと続けやすさ重視',
        traits: { chill: 3, social: 1 },
      },
    ],
  },
  {
    title: '負けが続いたときのあなたは？',
    options: [
      {
        label: '原因を探してもう一回',
        detail: '改善ポイントが見えると楽しい',
        traits: { macro: 2, competitive: 2 },
      },
      {
        label: '一回ふざけて空気を変える',
        detail: '流れの悪さを会話でほどく',
        traits: { social: 3, chill: 1 },
      },
      {
        label: '味方が動きやすいよう支える',
        detail: '自分の役割を変えて立て直す',
        traits: { support: 3, macro: 1 },
      },
    ],
  },
  {
    title: 'あなたの強みを一言でいうと？',
    options: [
      {
        label: '反応速度と手元の精度',
        detail: '細かい操作に自信あり',
        traits: { micro: 3, competitive: 1 },
      },
      {
        label: '全体を見る判断力',
        detail: '盤面と味方の位置を見ている',
        traits: { macro: 3, support: 1 },
      },
      {
        label: '相手がまた遊びたくなる空気',
        detail: '誘われやすさが武器',
        traits: { social: 3, chill: 1 },
      },
    ],
  },
  {
    title: '理想のゲームパートナーは？',
    options: [
      {
        label: '一緒に勝ちにいける人',
        detail: '熱量が近いと一気に深まる',
        traits: { competitive: 3, macro: 1 },
      },
      {
        label: 'お互いを立てられる人',
        detail: '役割が噛み合うと強い',
        traits: { support: 3, social: 1 },
      },
      {
        label: '雑談だけでも成立する人',
        detail: 'ゲーム外の余白も大事',
        traits: { chill: 2, social: 2 },
      },
    ],
  },
]

const profiles: ResultProfile[] = [
  {
    id: 'clutch-ace',
    name: 'クラッチエース型',
    catchline: '一緒に沼る相手は、褒め上手な観戦サポーター。',
    summary: '勝負どころで前に出られるタイプ。恋愛相性では、あなたの集中モードを邪魔せず、終わったあとにちゃんと盛り上げてくれる相手と噛み合います。',
    partner: '相性がいいのは「ナイス！」を惜しまない人。あなたが攻め、相手が空気を整える組み合わせが強いです。',
    chemistry: '通話初回は対戦ゲームより、軽めの協力ゲームを1本挟むと距離が縮まりやすいです。',
    games: ['VALORANT', 'Apex Legends', 'THE FINALS', 'Overcooked! 2'],
    pc: '高FPS重視。144Hz以上のモニター、ミドル以上のGPU、軽いマウスを優先。',
    offer: '収益導線: ゲーミングPC、144Hz/240Hzモニター、マウス、マウスパッド。',
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
    offer: '収益導線: BTO PC、CPU/メモリ、ゲーミングヘッドセット、マイク。',
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
    offer: '収益導線: 入門ゲーミングPC、デスク周り、チェア、ヘッドセット。',
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
    offer: '収益導線: マイク、ヘッドセット、サブモニター、Wi-Fi/回線比較。',
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
    offer: '収益導線: SSD、メモリ、チェア、デスク、長時間向け周辺機器。',
    risks: 'こだわりポイントが違うと作業分担がズレます。最初に役割をゆるく決めると快適。',
    traits: ['macro', 'chill'],
  },
]

const pcPlans = [
  {
    name: 'バズ入口プラン',
    price: 'まずは0円から',
    target: 'SNS流入と診断回遊',
    items: ['ゲームパートナー相性診断', '結果シェア文', 'おすすめゲーム導線'],
  },
  {
    name: '収益化プラン',
    price: '月1万PVから検証',
    target: 'アフィリエイトと広告',
    items: ['BTO PC比較', '周辺機器ランキング', 'ゲーム購入リンク'],
  },
  {
    name: '拡張プラン',
    price: 'データが溜まった後',
    target: '診断精度とリピート',
    items: ['PC構成診断', '結果画像生成', 'Discord/LINE誘導'],
  },
]

const scoreTemplate: Record<Trait, number> = {
  micro: 0,
  macro: 0,
  social: 0,
  chill: 0,
  competitive: 0,
  support: 0,
}

function getScores(answers: number[]) {
  return answers.reduce<Record<Trait, number>>((scores, optionIndex, questionIndex) => {
    const option = questions[questionIndex]?.options[optionIndex]
    if (!option) return scores

    Object.entries(option.traits).forEach(([trait, value]) => {
      scores[trait as Trait] += value ?? 0
    })

    return scores
  }, { ...scoreTemplate })
}

function getProfile(scores: Record<Trait, number>) {
  return profiles
    .map((profile) => ({
      profile,
      score: profile.traits.reduce((sum, trait) => sum + scores[trait], 0),
    }))
    .sort((a, b) => b.score - a.score)[0].profile
}

function App() {
  const [answers, setAnswers] = useState<number[]>([])
  const [copied, setCopied] = useState(false)
  const currentQuestion = questions[answers.length]
  const isComplete = answers.length === questions.length
  const scores = useMemo(() => getScores(answers), [answers])
  const result = useMemo(() => getProfile(scores), [scores])
  const progress = Math.round((answers.length / questions.length) * 100)
  const shareText = `GameSpec Labで診断したら「${result.name}」でした。${result.catchline}`
  const shareUrl = typeof window === 'undefined' ? '' : window.location.href

  const chooseAnswer = (optionIndex: number) => {
    setAnswers((current) => [...current, optionIndex])
    setCopied(false)
  }

  const resetQuiz = () => {
    setAnswers([])
    setCopied(false)
  }

  const copyResult = async () => {
    const text = `${shareText}\n${shareUrl}`
    if (navigator.share) {
      await navigator.share({ title: 'GameSpec Lab', text: shareText, url: shareUrl })
      return
    }

    await navigator.clipboard.writeText(text)
    setCopied(true)
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="GameSpec Lab top">
          <span className="brand-mark">GSL</span>
          <span>GameSpec Lab</span>
        </a>
        <nav aria-label="サイト内メニュー">
          <a href="#diagnosis">診断</a>
          <a href="#monetize">収益化</a>
          <a href="#deploy">Cloudflare</a>
        </nav>
      </header>

      <section className="hero-band" id="top" style={{ '--hero-image': `url(${heroImage})` } as CSSProperties}>
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={16} /> PCゲーマー向け診断サービス</p>
          <h1>
            <span>ゲーム相性から、</span>
            <span>勝てる環境まで</span>
            <span>見える化。</span>
          </h1>
          <p className="lead">
            GameSpec Labは、ゲームパートナー相性診断を入口に、才能タイプ、おすすめゲーム、PC構成までつなげる診断サイトです。
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#diagnosis">
              診断をはじめる <ArrowRight size={18} />
            </a>
            <a className="ghost-link" href="#monetize">
              収益化の設計を見る
            </a>
          </div>
        </div>
      </section>

      <section className="diagnosis-section" id="diagnosis">
        <div className="section-heading">
          <p className="eyebrow"><HeartHandshake size={16} /> バズ用コンテンツ</p>
          <h2>ゲームパートナー相性診断</h2>
          <p>
            「ゲーム女子」だけに寄せず、ゲームパートナー相性として広く刺さる形にしています。結果で恋愛相性も触れるので、SNSで話題にしやすい構成です。
          </p>
        </div>

        <div className="quiz-layout">
          <section className="quiz-panel" aria-labelledby="quiz-title">
            <div className="quiz-status">
              <span>{isComplete ? '結果' : `質問 ${answers.length + 1} / ${questions.length}`}</span>
              <span>{progress}%</span>
            </div>
            <div className="progress-track" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>

            {!isComplete && currentQuestion ? (
              <>
                <h3 id="quiz-title">{currentQuestion.title}</h3>
                <div className="option-list">
                  {currentQuestion.options.map((option, index) => (
                    <button className="option-button" key={option.label} type="button" onClick={() => chooseAnswer(index)}>
                      <span>
                        <strong>{option.label}</strong>
                        <small>{option.detail}</small>
                      </span>
                      <ArrowRight size={18} />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="result-block">
                <div className="result-kicker"><Trophy size={18} /> あなたのタイプ</div>
                <h3 id="quiz-title">{result.name}</h3>
                <p className="result-catch">{result.catchline}</p>
                <p>{result.summary}</p>
                <div className="result-actions">
                  <button className="primary-button" type="button" onClick={copyResult}>
                    {copied ? <Check size={18} /> : <Share2 size={18} />}
                    {copied ? 'コピーしました' : '結果をシェア'}
                  </button>
                  <button className="icon-button" type="button" onClick={resetQuiz} aria-label="もう一度診断">
                    <RotateCcw size={19} />
                  </button>
                </div>
              </div>
            )}
          </section>

          <aside className="result-panel" aria-label="診断結果プレビュー">
            <div className="result-card accent-card">
              <p className="card-label"><Target size={16} /> 結果プレビュー</p>
              <h3>{result.name}</h3>
              <p>{result.catchline}</p>
            </div>

            <div className="score-grid">
              {(Object.keys(scores) as Trait[]).map((trait) => (
                <div className="score-row" key={trait}>
                  <span>{traitLabels[trait]}</span>
                  <div className="mini-track"><span style={{ width: `${Math.min(100, scores[trait] * 12)}%` }} /></div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="result-detail-band">
        <div className="detail-grid">
          <article className="result-card">
            <p className="card-label"><HeartHandshake size={16} /> 恋愛・相棒相性</p>
            <h3>{result.partner}</h3>
            <p>{result.chemistry}</p>
          </article>
          <article className="result-card">
            <p className="card-label"><Gamepad2 size={16} /> おすすめゲーム</p>
            <h3>一緒に遊ぶならこのあたり</h3>
            <div className="tag-list">
              {result.games.map((game) => <span key={game}>{game}</span>)}
            </div>
          </article>
          <article className="result-card">
            <p className="card-label"><Monitor size={16} /> 推奨PC環境</p>
            <h3>{result.pc}</h3>
            <p>{result.offer}</p>
          </article>
          <article className="result-card">
            <p className="card-label"><BarChart3 size={16} /> 相性の注意点</p>
            <h3>揉めにくくするコツ</h3>
            <p>{result.risks}</p>
          </article>
        </div>
      </section>

      <section className="monetize-section" id="monetize">
        <div className="section-heading compact">
          <p className="eyebrow"><BadgeJapaneseYen size={16} /> 収益化の基本設計</p>
          <h2>診断結果から自然に買う理由を作る</h2>
          <p>
            いきなりPCを売るより、診断で「自分ごと化」してから構成・周辺機器・ゲーム紹介へ進めるほうが押し売り感が出にくいです。
          </p>
        </div>

        <div className="plan-grid">
          {pcPlans.map((plan) => (
            <article className="plan-card" key={plan.name}>
              <div>
                <p>{plan.price}</p>
                <h3>{plan.name}</h3>
                <span>{plan.target}</span>
              </div>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}><Check size={16} /> {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="revenue-strip">
          <div>
            <strong>BTO PC / パーツ</strong>
            <span>結果タイプ別に必要スペックを提示</span>
          </div>
          <div>
            <strong>周辺機器</strong>
            <span>モニター、マウス、マイク、チェア</span>
          </div>
          <div>
            <strong>ゲーム紹介</strong>
            <span>協力・恋愛・ランク向けで分類</span>
          </div>
          <div>
            <strong>スポンサー枠</strong>
            <span>タイプ別おすすめ枠として販売</span>
          </div>
        </div>
      </section>

      <section className="spread-section">
        <div className="spread-copy">
          <p className="eyebrow"><Copy size={16} /> 拡散しやすい構成</p>
          <h2>結果名、相性、ゲーム名を1枚で言えるようにする</h2>
          <p>
            SNSでは「私はクラッチエース型だった」「相性いいのは褒め上手サポーターらしい」くらい短いほうが伸びます。次の改善では結果画像の自動生成を足すと、さらに共有されやすくなります。
          </p>
        </div>
        <div className="share-preview" aria-label="シェア文プレビュー">
          <span>シェア文プレビュー</span>
          <strong>{shareText}</strong>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`} target="_blank" rel="noreferrer">
            Xで投稿する <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section className="deploy-section" id="deploy">
        <div>
          <p className="eyebrow"><Monitor size={16} /> GitHub + Cloudflare Pages</p>
          <h2>このまま公開しやすい構成</h2>
          <p>
            Cloudflare Pagesでは、GitHubリポジトリを接続してビルドコマンドを <code>npm run build</code>、出力先を <code>dist</code> にすれば公開できます。
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
