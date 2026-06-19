#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""集客用SEO記事ページを生成(現サイトのデザイン/テンプレートに準拠).

診断(GameSense/ゲーマーMBTI/FPS適性)とデバイスガイドへ送客する、
勝ちやすいロングテール向けの読み物記事。

  python3 tools/build_articles.py
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VER = "deep88"
TODAY = "2026-06-19"

GTM_HEAD = """    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TVV88Q6L');</script>
    <!-- End Google Tag Manager -->
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-FZRP7SHMG7"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-FZRP7SHMG7');
    </script>"""
GTM_NOSCRIPT = """
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TVV88Q6L"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->"""
BASE = "https://gamespeclab.com"


def card(kicker, h2, body):
    k = f'<p class="article-kicker">{kicker}</p>' if kicker else ""
    return f'          <div class="article-card">\n            {k}\n            <h2>{h2}</h2>\n{body}\n          </div>'


def ul(items):
    lis = "\n".join(
        f"              <li><strong>{a}</strong><span>{b}</span></li>" for a, b in items)
    return f'            <ul class="article-list">\n{lis}\n            </ul>'


def pair(items):
    cells = "\n".join(
        f'              <div><strong>{a}</strong><p>{b}</p></div>' for a, b in items)
    return f'            <div class="article-pair-grid">\n{cells}\n            </div>'


def relcard(items):
    cells = "\n".join(
        f'              <div><strong><a href="{href}">{label}</a></strong><p>{note}</p></div>'
        for href, label, note in items)
    return ('          <div class="article-card">\n'
            '            <h2>次に読みたい関連ページ</h2>\n'
            f'            <div class="article-pair-grid">\n{cells}\n            </div>\n'
            '          </div>')


def cta(href, text, label):
    return ('          <div class="article-card">\n'
            f'            <p class="article-kicker">SCAN</p>\n            <h2>{text}</h2>\n'
            f'            <a class="primary-link" href="{href}"><span data-icon="arrow"></span>{label}</a>\n'
            '          </div>')


P = "            <p>{}</p>"


ARTICLES = [
    {
        "slug": "game-skill-traits",
        "icon": "spark",
        "eyebrow": "SKILL TRAITS",
        "h1": "ゲームが上手い人の特徴",
        "h1sub": "才能ではなく、分解できる5つの習慣",
        "title": "ゲームが上手い人の特徴とは？共通する5つの習慣と伸ばし方 | GameSpec Lab",
        "desc": "ゲームが上手い人に共通する特徴を5つに分解。状況認識・予測・判断速度・振り返り・メンタルの観点から、今日からできる上達のコツを解説します。",
        "body": [
            card("OVERVIEW", "「上手さ」はセンスではなく、再現できる習慣",
                 P.format("ゲームが上手い人を見ると「センスが違う」と感じがちですが、実際の差の多くは"
                          "“やっていること”の差です。情報の拾い方、判断の順番、振り返りの質——これらは"
                          "後から伸ばせるスキルで、意識すれば誰でも近づけます。") + "\n" +
                 P.format("ここでは上手い人に共通する5つの特徴を挙げ、それぞれを自分の習慣に落とし込む"
                          "方法まで紹介します。")),
            card("5 TRAITS", "上手い人に共通する5つの特徴",
                 ul([("① 状況認識が速い", "画面・音・ミニマップから今の状況を素早く拾い、必要な情報だけに注目できる。"),
                     ("② 先を読んでいる", "目の前の撃ち合いだけでなく、次に何が起きるかを予測して動いている。"),
                     ("③ 判断が速く、迷いが少ない", "選択肢をあらかじめ絞り、決めた行動を素早く実行できる。"),
                     ("④ 振り返りで修正する", "負けを感情で終わらせず、原因を分類して次に活かしている。"),
                     ("⑤ メンタルが安定している", "連敗やミスに引きずられず、いつも同じ判断基準を保てる。")])),
            card("HABITS", "今日からできる上達の習慣",
                 ul([("1試合1テーマ", "毎試合ひとつだけ意識する課題を決めると、改善が積み上がりやすい。"),
                     ("デスを分類する", "「位置取り/索敵不足/無理な撃ち合い」など、やられ方をメモすると弱点が見える。"),
                     ("上手い人の視点を真似る", "配信やクリップで“どこを見て何を待っているか”を観察する。")])),
            cta("gamesense.html", "自分の強み・弱みを8能力で可視化する",
                "GameSense Scan 8（24問・無料）で診断する"),
            {"_rel": [
                ("game-sense-guide.html", "ゲームセンスとは？", "上手さを8つの能力に分けて理解する。"),
                ("sense-awareness-guide.html", "状況認識力とは？", "情報を勝ち筋に変える拾い方のコツ。"),
                ("gamermbti.html", "ゲーマーMBTI診断", "自分のプレイ人格と向いてる役割を知る。"),
            ]},
        ],
        "faqs": [
            ("ゲームが上手い人の共通点は何ですか？",
             "状況認識の速さ、先読み、判断の速さ、振り返りで修正する習慣、メンタルの安定が共通します。いずれも後から伸ばせるスキルです。"),
            ("ゲームのセンスは後からでも伸びますか？",
             "伸びます。センスに見える部分の多くは情報の拾い方や判断の手順で、意識して練習すれば改善できます。"),
        ],
    },
    {
        "slug": "fps-improve-guide",
        "icon": "target",
        "eyebrow": "FPS IMPROVE",
        "h1": "FPSが上手くなる方法",
        "h1sub": "エイムより先に伸ばす、立ち回りの5ステップ",
        "title": "FPSが上手くなる方法｜エイムより先に効く立ち回り5ステップ | GameSpec Lab",
        "desc": "FPSが上手くなるための考え方を5ステップで解説。感度の固定、プリエイム、音での索敵、有利な撃ち合いの作り方、デス分析まで、エイム以外の上達のコツをまとめます。",
        "body": [
            card("OVERVIEW", "上達は「エイム」より「立ち回り」から",
                 P.format("FPSというとエイム（照準）に目が行きがちですが、勝率を大きく動かすのは"
                          "“どこで・どんな状況で撃ち合うか”という立ち回りです。不利な状況でのエイム勝負を"
                          "減らすほど、同じ実力でも勝ちやすくなります。")),
            card("5 STEPS", "上手くなるための5ステップ",
                 ul([("① 感度・設定を固定する", "感度やDPIをコロコロ変えない。同じ振り向きを体に覚えさせるのが先決。"),
                     ("② クロスヘアを置く（プリエイム）", "敵が出る位置に照準を先に合わせておくと、反応で撃つより速い。"),
                     ("③ 音で索敵する", "足音・銃声・リロード音で位置を把握し、不意の遭遇を減らす。"),
                     ("④ 有利な1vs1を作る", "数的・位置的に有利な状況を選んで撃ち合う。無理な撃ち合いを避ける。"),
                     ("⑤ デスを分析する", "やられた原因を分類し、同じ負け方を繰り返さないようにする。")])),
            card("ENVIRONMENT", "環境（フレームレートとデバイス）も実力のうち",
                 P.format("反応や視認は環境にも左右されます。高リフレッシュレートのモニター、軽量で低遅延の"
                          "マウスは、同じ操作でも“見えてから動く”までを短くします。設定とデバイスを整えるだけで"
                          "底上げできる部分です。") + "\n" +
                 pair([("モニター", "高Hz・低遅延で視認と反応の余裕を作る。"),
                       ("マウス", "軽量・低遅延で狙いをプレイに変えるズレを減らす。"),
                       ("ヘッドセット", "足音の定位で索敵の精度を上げる。")])),
            cta("fps-aptitude-diagnosis.html", "自分のFPS適性と伸ばし方を知る",
                "FPS適性診断を受ける"),
            {"_rel": [
                ("aim-training-guide.html", "エイム力を上げる練習方法", "プリエイムとエイトレの組み立て方。"),
                ("gaming-monitor-guide.html", "ゲーミングモニターおすすめ", "高Hzで反応の余裕を作るモニター選び。"),
                ("gaming-mouse-guide.html", "ゲーミングマウスおすすめ", "軽量・低遅延マウスの選び方。"),
            ]},
        ],
        "faqs": [
            ("FPSはエイムと立ち回りどちらを先に練習すべき？",
             "まず立ち回りです。有利な状況で撃ち合えるようになると、同じエイム力でも勝率が上がります。エイム練習は並行して少しずつで十分です。"),
            ("FPSが上手くなる一番のコツは？",
             "感度を固定し、クロスヘアを敵の出る位置に置き、音で索敵して不利な撃ち合いを避けることです。デスの原因分析を習慣にすると伸びが安定します。"),
        ],
    },
    {
        "slug": "aim-training-guide",
        "icon": "target",
        "eyebrow": "AIM TRAINING",
        "h1": "エイム力を上げる練習方法",
        "h1sub": "「合わせる」より「置く」。再現性で伸ばすエイム",
        "title": "エイム力を上げる練習方法｜プリエイムと感度設定・エイトレの組み立て | GameSpec Lab",
        "desc": "エイム力を上げる練習方法を解説。プリエイム（置きエイム）、感度・DPI・eDPIの決め方、エイムトレーニングの組み立て、ハードの影響まで、安定して当てるためのコツをまとめます。",
        "body": [
            card("OVERVIEW", "エイムは「合わせる」より「置く」",
                 P.format("当たる人は、反応してから照準を動かしているのではなく、敵が出る位置に"
                          "あらかじめ照準を“置いて”います。プリエイム（置きエイム）とクロスヘア配置を"
                          "意識するだけで、反応速度に頼らず当たるようになります。")),
            card("PRACTICE", "エイム練習メニュー",
                 ul([("感度を固定する", "まず1つの感度に決め、振り向き(360°に必要なマウス移動距離)を一定に保つ。"),
                     ("エイトレを毎日10分", "Aim LabやKovaak'sでトラッキング・フリック・ターゲット切替を短時間でも継続する。"),
                     ("プリエイムを意識", "壁や角ごとに“敵が出る高さ・位置”へ事前に合わせる癖をつける。"),
                     ("クロスヘアの高さ", "頭の高さに置き、必要な移動量を最小化する。")])),
            card("SENSITIVITY", "感度・DPI・eDPIの考え方",
                 P.format("感度は「DPI × ゲーム内感度 = eDPI」で比較できます。低めのeDPIは精密な"
                          "止めエイムに、高めは素早い振り向きに向きます。正解は人によりますが、"
                          "まずは振り向き幅を一定にして“同じ動き”を覚えることが最優先です。")),
            card("ENVIRONMENT", "ハードの影響（見落としがち）",
                 pair([("マウス", "軽量・高ポーリング・低遅延だと狙いの再現性が上がる。"),
                       ("モニター", "高Hzだと敵が見えるタイミングが早く、当てやすい。"),
                       ("マウスパッド", "止めと滑りの一貫性がエイムの安定に直結する。")])),
            cta("gamesense.html", "空間把握・判断速度などの強みを診断する",
                "GameSense Scan 8（24問・無料）で診断する"),
            {"_rel": [
                ("fps-improve-guide.html", "FPSが上手くなる方法", "エイム以外の立ち回りで勝率を上げる。"),
                ("gaming-mouse-guide.html", "ゲーミングマウスおすすめ", "重量・センサーで選ぶエイム向けマウス。"),
                ("gaming-mousepad-guide.html", "ゲーミングマウスパッドおすすめ", "止めと滑りでエイムを安定させる。"),
            ]},
        ],
        "faqs": [
            ("エイムが安定しない原因は？",
             "感度を頻繁に変えている、クロスヘアの高さや位置が一定でない、反応に頼って“合わせ”に行っていることが主な原因です。まず感度固定とプリエイムから直しましょう。"),
            ("ゲーム感度はどうやって決めればいい？",
             "まずeDPI(DPI×ゲーム内感度)を目安に決め、振り向き幅を一定に保つことが大切です。止め重視なら低め、振り向き重視なら高めから微調整します。"),
        ],
    },
    {
        "slug": "reaction-speed-guide",
        "icon": "zap",
        "eyebrow": "REACTION SPEED",
        "h1": "ゲームの反応速度を上げる方法",
        "h1sub": "鍛えられるのは「予測」と「準備」",
        "title": "ゲームの反応速度を上げる方法｜予測・準備・環境で速くする | GameSpec Lab",
        "desc": "ゲームの反応速度を上げる方法を解説。反応＝知覚＋判断＋操作の分解、予測で先回りするコツ、選択肢を減らす考え方、モニターやマウスの遅延を削る環境づくりまでまとめます。",
        "body": [
            card("OVERVIEW", "反応速度は「知覚＋判断＋操作」でできている",
                 P.format("反応速度は生まれつきの一発勝負に見えますが、実際は「気づく(知覚)→決める(判断)"
                          "→動かす(操作)」の合計です。このうち判断と準備は鍛えられ、ここを縮めると"
                          "“速く反応できる人”に近づけます。")),
            card("HOW TO", "反応を速くする4つの方法",
                 ul([("予測で先回りする", "起きてから反応するのではなく、起きる前に置いておく(置きエイム・置き索敵)。"),
                     ("選択肢を減らす", "事前に「来たらこう動く」を決めておくと、迷う時間がなくなる。"),
                     ("行動をルーティン化", "リロードや位置取りを型にすると、考える負荷が減り判断が速くなる。"),
                     ("コンディションを整える", "睡眠・休憩・水分は反応に直結する。疲労時は明確に遅くなる。")])),
            card("LATENCY", "環境の遅延を削る（同じ実力でも速くなる）",
                 P.format("人の反応だけでなく、機材の遅延も“反応の遅さ”として現れます。高Hzモニターは"
                          "敵が見えるタイミングを早め、低遅延マウスや有線/低遅延無線は操作の伝達を速めます。"
                          "ここは努力ではなく設定とデバイスで縮められる部分です。") + "\n" +
                 pair([("高Hzモニター", "1秒あたりの情報が増え、見える→動くが早くなる。"),
                       ("低遅延マウス", "クリックや移動の伝達遅れを抑える。"),
                       ("有線/低遅延無線", "通信の揺らぎを減らし安定させる。")])),
            cta("gamesense.html", "自分の判断速度を測ってみる",
                "GameSense Scan 8（24問・無料）で診断する"),
            {"_rel": [
                ("sense-speed-guide.html", "判断速度を上げるには？", "迷いを減らす判断のコツ。"),
                ("sense-prediction-guide.html", "未来予測力とは？", "先回りで反応を不要にする考え方。"),
                ("gaming-monitor-guide.html", "ゲーミングモニターおすすめ", "高Hzで反応の遅延を削る。"),
            ]},
        ],
        "faqs": [
            ("ゲームの反応速度は鍛えられますか？",
             "知覚の限界は大きく変わりませんが、予測・準備・ルーティン化で“判断にかかる時間”は短縮できます。環境の遅延を減らすことでも体感は速くなります。"),
            ("反応速度を上げるのに効果的なことは？",
             "起きる前に置いておく予測、選択肢を事前に絞る判断の準備、十分な睡眠と休憩です。加えて高Hzモニターや低遅延デバイスで機材側の遅延を削るのも有効です。"),
        ],
    },
    {
        "slug": "gamer-partner-tips",
        "icon": "heart",
        "eyebrow": "GAMER & LOVE",
        "h1": "ゲーマー彼氏・彼女と上手く付き合うには",
        "h1sub": "「ゲームばかりで寂しい」を、ケンカにしない関わり方",
        "title": "ゲーマー彼氏・彼女がゲームばかりで寂しいときの付き合い方 | GameSpec Lab",
        "desc": "ゲーマーの恋人がゲームばかりで寂しい——そんな悩みへの向き合い方を解説。なぜ夢中になるのかの理解、責めずに伝えるコツ、一緒に楽しむ工夫、タイプ別の関わり方までまとめます。",
        "body": [
            card("OVERVIEW", "「やめさせる」より「すれ違いを減らす」",
                 P.format("ゲーマーの恋人に「ゲームばかりで寂しい」と感じるのはよくある悩みです。"
                          "ただ、ゲームを無理にやめさせようとすると関係はこじれがち。大事なのは"
                          "“相手の夢中”を理解しつつ、二人の時間のすれ違いを減らすことです。")),
            card("WHY", "なぜそんなに夢中になるのか",
                 ul([("区切りが付けにくい", "オンライン対戦や協力プレイは、仲間がいると途中で抜けにくい。"),
                     ("達成感が強い", "勝利やランク上げなど、努力が数字で返ってくる楽しさがある。"),
                     ("ストレス解消・交流の場", "息抜きや友人との大事なコミュニケーションになっていることも。")])),
            card("HOW TO", "責めずに伝える・一緒に楽しむコツ",
                 ul([("タイミングを選ぶ", "対戦の途中ではなく、区切りの後に「話したい」と切り出す。"),
                     ("主語を“私”にする", "「ゲームばかり」より「一緒の時間がほしい」と気持ちを伝える。"),
                     ("一緒に遊んでみる", "観戦や協力プレイで“共有の時間”に変えると寂しさが減る。"),
                     ("ルールを一緒に決める", "「この曜日は二人の時間」など、お互い納得の線引きを作る。")])),
            cta("gamer-mbti-compatibility.html", "相手のタイプ別に、噛み合う関わり方を知る",
                "ゲーマーMBTI相性ガイドを見る"),
            {"_rel": [
                ("gamermbti.html", "ゲーマーMBTI診断", "相手や自分のプレイ人格・価値観の傾向を知る。"),
                ("gamer-couple-compatibility.html", "ゲーム好きカップルの相性", "同じ趣味を長続きさせるコツ。"),
                ("partner.html", "ゲームパートナー相性診断", "一緒に遊ぶときの相性を見える化。"),
            ]},
        ],
        "faqs": [
            ("恋人がゲームばかりで寂しいときはどうすればいい？",
             "ゲームを責めるより「一緒の時間がほしい」と気持ちを主語で伝え、区切りの良いタイミングで話すのがコツです。観戦や協力プレイで共有時間に変えるのも有効です。"),
            ("ゲームをやめさせるべきですか？",
             "無理にやめさせると関係がこじれやすいです。やめさせるより、二人の時間のルールを一緒に決めてすれ違いを減らす方が長続きします。"),
        ],
    },
    {
        "slug": "gamer-couple-compatibility",
        "icon": "link",
        "eyebrow": "GAMER COUPLE",
        "h1": "ゲーム好きカップルの相性と長続きのコツ",
        "h1sub": "同じ趣味だからこそ、ギスギスを避ける",
        "title": "ゲーム好きカップルの相性は？長続きのコツとすれ違いの防ぎ方 | GameSpec Lab",
        "desc": "ゲーム好き同士のカップルの相性と長続きのコツを解説。一緒に遊べるメリット、実力差や勝敗で起きるすれ違いの原因、ギスギスを避ける関わり方、タイプ相性の見方までまとめます。",
        "body": [
            card("OVERVIEW", "同じ趣味は強い。ただし“勝敗”は持ち込み注意",
                 P.format("ゲーム好き同士は時間と話題を共有しやすく、相性の土台があります。"
                          "一方で、実力差や勝ち負けをそのまま関係に持ち込むとギスギスの原因に。"
                          "メリットを活かしつつ、すれ違いの芽を知っておきましょう。")),
            card("MERIT", "ゲーマー同士のメリット",
                 ul([("時間を共有しやすい", "一緒に遊ぶ・観る時間が自然に作れる。"),
                     ("理解がある", "“ゲームに夢中”を否定されにくく、ストレスが少ない。"),
                     ("共通の話題が尽きない", "新作や攻略など、会話のネタが続く。")])),
            card("FRICTION", "すれ違いが起きやすいポイント",
                 ul([("実力差", "教える・教わるの温度差がストレスになることがある。"),
                     ("勝敗の持ち込み", "負けたイライラを相手にぶつけてしまう。"),
                     ("時間配分", "一緒に遊ぶ頻度や、ソロ時間の希望がずれる。")])),
            card("TIPS", "長続きのコツ",
                 ul([("勝敗を関係に持ち込まない", "試合の結果と二人の関係は切り分ける。"),
                     ("一緒も別々も尊重", "毎回一緒でなくてOK。ソロ時間もお互い認める。"),
                     ("役割の違いを楽しむ", "前に出る人・支える人など、違いを補完として捉える。")])),
            cta("partner.html", "二人の遊び方の相性を診断してみる",
                "ゲームパートナー相性診断を受ける"),
            {"_rel": [
                ("gamer-mbti-compatibility.html", "ゲーマーMBTI相性ガイド", "タイプ別に噛み合い方を確認。"),
                ("gamer-partner-tips.html", "ゲーマー彼氏・彼女との付き合い方", "寂しさをケンカにしないコツ。"),
                ("gamermbti.html", "ゲーマーMBTI診断", "お互いのプレイ人格を知る。"),
            ]},
        ],
        "faqs": [
            ("ゲーム好き同士のカップルは相性がいいですか？",
             "時間や話題を共有しやすく相性の土台はあります。ただし実力差や勝敗の持ち込みがすれ違いの原因になりやすいので、結果を関係に持ち込まない工夫が大切です。"),
            ("ゲームでケンカしないためには？",
             "勝敗と二人の関係を切り分けること、毎回一緒に遊ばずソロ時間も尊重すること、役割の違いを補完として楽しむことがコツです。"),
        ],
    },
    {
        "slug": "online-game-romance",
        "icon": "chat",
        "eyebrow": "ONLINE ROMANCE",
        "h1": "ネトゲ恋愛・オンラインゲームの出会いは本物？",
        "h1sub": "生まれやすい理由と、安全に進めるための注意点",
        "title": "ネトゲ恋愛は本物？オンラインゲームの出会いの注意点と進め方 | GameSpec Lab",
        "desc": "オンラインゲームでの出会い・ネトゲ恋愛は本物になり得るのか。生まれやすい理由、続きやすいケースと危ういケース、個人情報や課金トラブルを避ける安全な進め方を解説します。",
        "body": [
            card("OVERVIEW", "“一緒に過ごす時間”が長いから生まれやすい",
                 P.format("オンラインゲームは、協力・対戦・ボイスチャットを通じて長い時間を共有します。"
                          "共通の目標や日々のやり取りが積み重なるため、自然と距離が縮まりやすい環境です。"
                          "一方で、見えにくい部分もあるので、進め方には注意が必要です。")),
            card("CASES", "本物になりやすいケース／危ういケース",
                 pair([("続きやすい", "通話や日常会話を重ね、ゲーム外の価値観も少しずつ共有できている。"),
                       ("危ういサイン", "会う前に高額な送金・課金を求める、個人情報を急かす、話に一貫性がない。")])),
            card("SAFETY", "安全に進めるための注意点",
                 ul([("個人情報は段階的に", "本名・住所・勤務先などは急いで明かさない。"),
                     ("金銭トラブルを避ける", "送金やアイテムの立て替え、投資話などは応じない。"),
                     ("会うときは慎重に", "初回は日中・人の多い場所で。第三者に予定を伝えておく。"),
                     ("温度差を確認", "相手のペースを尊重し、価値観のズレを早めにすり合わせる。")])),
            cta("gamermbti.html", "相手や自分のプレイ人格・価値観の傾向を知る",
                "ゲーマーMBTI診断を受ける"),
            {"_rel": [
                ("gamer-mbti-compatibility.html", "ゲーマーMBTI相性ガイド", "噛み合うタイプ・すれ違うタイプを知る。"),
                ("partner.html", "ゲームパートナー相性診断", "一緒に遊ぶ相性を見える化。"),
                ("gamer-couple-compatibility.html", "ゲーム好きカップルの相性", "長続きのコツを知る。"),
            ]},
        ],
        "faqs": [
            ("ネトゲ恋愛は本物になりますか？",
             "長い時間を共有するため発展しやすく、通話やゲーム外の会話を重ねて価値観を共有できれば続くこともあります。ただし会う前の高額送金や個人情報を急かす相手には注意が必要です。"),
            ("オンラインゲームの出会いで気をつけることは？",
             "個人情報は段階的に、金銭の要求には応じない、初めて会うときは日中・人の多い場所で第三者に予定を伝える、といった基本の安全対策を守ることが大切です。"),
        ],
    },
    {
        "slug": "valorant-improve-guide",
        "icon": "target",
        "eyebrow": "VALORANT",
        "h1": "VALORANTが上手くなるコツ",
        "h1sub": "エイムより先に、ルールを守る立ち回り",
        "title": "VALORANTが上手くなるコツ｜立ち回り・プリエイム・ランク上げの基本 | GameSpec Lab",
        "desc": "VALORANTが上手くなるためのコツを解説。クロスヘア配置とプリエイム、スキルの使い所、音と情報共有、無理しない撃ち合い、エージェント理解まで、ランク上げに効く基本をまとめます。",
        "body": [
            card("OVERVIEW", "上達はエイムより「ルールを守る立ち回り」",
                 P.format("VALORANTはタクティカルFPSで、撃ち合いの強さ以上に“どこで・どう戦うか”が"
                          "勝率を左右します。決まった型（定石）を守るだけで、同じエイム力でも勝ちやすく"
                          "なります。")),
            card("5 TIPS", "ランク上げに効く5つのコツ",
                 ul([("クロスヘアを置く", "敵が出る角・高さに照準を先に合わせ、プリエイムで撃つ。"),
                     ("スキルの使い所を決める", "入る前に味方とスキルを合わせ、無駄打ちを減らす。"),
                     ("音と情報共有", "足音・スキル音で索敵し、簡潔なコールで味方と共有する。"),
                     ("無理な撃ち合いを避ける", "不利な人数・角度では引く。クラッチは状況を作ってから。"),
                     ("ミニマップを見る癖", "残り人数と味方位置を把握し、ローテを合わせる。")])),
            card("ROLE", "エージェントとロールを理解する",
                 P.format("デュエリスト（切り込み）、イニシエーター（起点作り）、コントローラー（制圧）、"
                          "センチネル（守り）の役割を理解し、自分の得意な立ち回りに合うエージェントを"
                          "選ぶと安定します。")),
            card("ENVIRONMENT", "環境を整える（設定とデバイス）",
                 pair([("感度を固定", "振り向きを一定にして“同じ動き”を覚える。"),
                       ("144Hz以上のモニター", "敵の視認と反応の余裕が増える。"),
                       ("軽量・低遅延マウス", "プリエイムからの撃ち出しを速く正確に。")])),
            cta("fps-aptitude-diagnosis.html", "自分のFPS適性と伸ばし方を知る",
                "FPS適性診断を受ける"),
            {"_rel": [
                ("fps-improve-guide.html", "FPSが上手くなる方法", "ジャンル共通の立ち回りの基本。"),
                ("aim-training-guide.html", "エイム力を上げる練習方法", "プリエイムとエイトレの組み立て。"),
                ("gaming-monitor-guide.html", "ゲーミングモニターおすすめ", "高Hzで反応の余裕を作る。"),
            ]},
        ],
        "faqs": [
            ("VALORANTで一番大事なことは？",
             "クロスヘアを敵の出る位置に置くプリエイムと、不利な撃ち合いを避ける立ち回りです。エイムだけでなく、味方との情報共有とスキルの合わせ方が勝率に直結します。"),
            ("VALORANTのランクを上げるには？",
             "感度を固定して安定させ、ミニマップで人数と位置を把握し、無理をせず有利な状況で戦うことです。負けた場面の原因分析を続けると伸びが安定します。"),
        ],
    },
    {
        "slug": "apex-improve-guide",
        "icon": "zap",
        "eyebrow": "APEX LEGENDS",
        "h1": "Apex Legendsの立ち回り・上達のコツ",
        "h1sub": "撃ち合いより、生存と位置取り",
        "title": "Apex Legendsの立ち回り・上達のコツ｜生存と位置取りで勝率を上げる | GameSpec Lab",
        "desc": "Apex Legendsの立ち回りと上達のコツを解説。漁夫・サードパーティ警戒、高所と遮蔽、パーティ連携、終盤の安置読み、無理な交戦を避ける考え方まで、勝率を上げる基本をまとめます。",
        "body": [
            card("OVERVIEW", "バトロワは「生き残り」と「位置取り」で勝つ",
                 P.format("Apexは最後まで生き残るバトロワ。撃ち合いの強さよりも、交戦するタイミングと"
                          "立ち位置の選び方が順位を大きく左右します。漁夫（漁夫の利）を警戒し、有利な"
                          "位置から戦うのが基本です。")),
            card("5 TIPS", "勝率を上げる5つのコツ",
                 ul([("サードパーティ警戒", "戦闘は長引かせない。終わったら素早く移動・回復する。"),
                     ("高所と遮蔽を取る", "見下ろせる位置・隠れられる地形を確保して戦う。"),
                     ("パーティ連携", "ピンとコールで敵位置・移動先を共有し、3人で動く。"),
                     ("終盤の安置を読む", "早めに安置の内側・有利地形へ入っておく。"),
                     ("無理な交戦を避ける", "不利なら引く。漁夫を狙う側に回る。")])),
            card("ROLE", "レジェンドの役割を理解する",
                 P.format("アサルト（攻め）、スカーミッシャー（機動）、サポート、コントローラー、"
                          "リコン（索敵）など、レジェンドの役割を理解してパーティのバランスを取ると"
                          "安定します。")),
            card("ENVIRONMENT", "環境を整える",
                 pair([("高Hzモニター", "索敵と反応の余裕が増える。"),
                       ("軽量マウス", "素早い視点移動と追いエイムがしやすい。"),
                       ("ヘッドセット", "足音の定位で漁夫や接近を察知。")])),
            cta("fps-aptitude-diagnosis.html", "自分のFPS適性と向いてる立ち回りを知る",
                "FPS適性診断を受ける"),
            {"_rel": [
                ("fps-improve-guide.html", "FPSが上手くなる方法", "立ち回りの基本を体系的に。"),
                ("gaming-headset-guide.html", "ゲーミングヘッドセットおすすめ", "足音の定位で索敵精度を上げる。"),
                ("reaction-speed-guide.html", "反応速度を上げる方法", "不意の接敵に対応する。"),
            ]},
        ],
        "faqs": [
            ("Apexで勝てるようになるには？",
             "撃ち合いより生存と位置取りが重要です。サードパーティを警戒し、高所や遮蔽を取り、3人で連携して有利な状況だけで戦うと順位が安定します。"),
            ("Apexの立ち回りで初心者が意識すべきことは？",
             "無理な交戦を避け、戦闘後は素早く移動・回復すること、ピンで味方と情報を共有すること、終盤は早めに安置内の有利地形へ入ることです。"),
        ],
    },
    {
        "slug": "cant-win-games-guide",
        "icon": "spark",
        "eyebrow": "WHY YOU LOSE",
        "h1": "ゲームで勝てない原因と抜け出し方",
        "h1sub": "実力より先に、見直すべき5つのこと",
        "title": "ゲームで勝てない原因は？負けが続くときに見直す5つと抜け出し方 | GameSpec Lab",
        "desc": "ゲームで勝てない・負けが続くときに見直したい5つの原因と抜け出し方を解説。情報不足、無理な交戦、振り返り不足、環境の遅延、メンタルの観点から、連敗から抜けるコツをまとめます。",
        "body": [
            card("OVERVIEW", "「実力不足」で片づけない",
                 P.format("勝てないときほど「自分が下手だから」と結論しがちですが、原因はもっと具体的な"
                          "ところにあることが多いです。原因を分けて一つずつ潰すほうが、ずっと早く"
                          "抜け出せます。")),
            card("5 CAUSES", "負けが続くときに見直す5つの原因",
                 ul([("情報が足りていない", "音・ミニマップ・人数を見られておらず、不意を取られている。"),
                     ("無理な撃ち合いが多い", "不利な状況で戦って事故っている。"),
                     ("振り返っていない", "同じ負け方を繰り返している。"),
                     ("環境の遅延", "フレームレートや入力遅延で“見えてから遅れている”。"),
                     ("連戦の疲れ・メンタル", "イライラや疲労で判断が雑になっている。")])),
            card("HOW TO", "連敗から抜け出す手順",
                 ul([("1試合1テーマで振り返る", "毎試合ひとつだけ直す点を決める。"),
                     ("不利を避ける", "勝てる状況を選んで戦い、無理を減らす。"),
                     ("一度休む", "連敗時は離れて、コンディションを戻す。"),
                     ("強みを活かす役割に回る", "自分の得意が出るポジションを選ぶ。")])),
            cta("gamesense.html", "自分の強み・弱みを8能力で把握する",
                "GameSense Scan 8（24問・無料）で診断する"),
            {"_rel": [
                ("game-skill-traits.html", "ゲームが上手い人の特徴", "上達する人の習慣を知る。"),
                ("reaction-speed-guide.html", "反応速度を上げる方法", "見えてから動くまでを縮める。"),
                ("sense-awareness-guide.html", "状況認識力とは？", "情報を拾って事故を減らす。"),
            ]},
        ],
        "faqs": [
            ("ゲームで急に勝てなくなったのはなぜ？",
             "環境の不調（フレームレート・遅延）、連戦の疲れやメンタル、相手のメタ変化などが原因のことが多いです。一度休んで、原因を分けて確認するのがおすすめです。"),
            ("負けが続くときの対処法は？",
             "1試合1テーマで振り返る、不利な撃ち合いを避ける、連敗時は一度離れる、自分の強みが出る役割に回る、の4つが効果的です。"),
        ],
    },
    {
        "slug": "voice-chat-tips",
        "icon": "chat",
        "eyebrow": "VOICE CHAT",
        "h1": "ゲームのボイスチャットが苦手を克服するコツ",
        "h1sub": "無理に話さなくていい。情報だけでチームは強くなる",
        "title": "ゲームのボイスチャット(VC)が苦手を克服するコツ｜何を話す・マイク設定 | GameSpec Lab",
        "desc": "ゲームのボイスチャットが苦手な人向けに、克服のコツを解説。緊張や「何を話せばいいか分からない」への対処、短い定型コール、リアクションでの参加、マイク環境の整え方までまとめます。",
        "body": [
            card("OVERVIEW", "VCは「上手く話す」より「情報を渡す」",
                 P.format("ボイスチャットが苦手でも問題ありません。雑談が得意である必要はなく、"
                          "勝つために必要なのは短い情報共有です。「敵2人、右」だけでもチームは動きやすく"
                          "なります。")),
            card("WHY", "苦手に感じる理由",
                 ul([("緊張する", "聞かれていると思うと声が出にくい。"),
                     ("何を話せばいいか分からない", "話題を探してしまい、タイミングを逃す。"),
                     ("聞き取り・反応が不安", "早い会話についていけないと感じる。")])),
            card("HOW TO", "克服のコツ",
                 ul([("定型コールから始める", "「右」「2人」「リロード中」など短い情報だけでOK。"),
                     ("情報だけ短く", "感想や謝罪は不要。事実を簡潔に伝える。"),
                     ("リアクションで参加", "「ナイス」「あぶない」など相づちから慣れる。"),
                     ("マイク環境を整える", "ノイズの少ないマイクだと聞き返しが減り、話しやすくなる。")])),
            cta("partner.html", "気楽に組める相手の相性を診断する",
                "ゲームパートナー相性診断を受ける"),
            {"_rel": [
                ("gaming-headset-guide.html", "ゲーミングヘッドセットおすすめ", "聞き取りやすさとマイク品質で選ぶ。"),
                ("gamer-mbti-compatibility.html", "ゲーマーMBTI相性ガイド", "通話の温度が合う相手を知る。"),
                ("gamermbti.html", "ゲーマーMBTI診断", "自分の通話スタイルの傾向を知る。"),
            ]},
        ],
        "faqs": [
            ("ボイスチャットで何を話せばいいですか？",
             "雑談は不要で、勝つための短い情報だけで十分です。「敵の人数・方向・状態（リロード中など）」を簡潔に伝えるだけでチームは動きやすくなります。"),
            ("VCの緊張を減らすには？",
             "まず「右」「2人」などの定型コールやリアクションから始めるのがおすすめです。ノイズの少ないマイク環境にすると聞き返しが減り、話しやすくなります。"),
        ],
    },
    {
        "slug": "game-sickness-guide",
        "icon": "shield",
        "eyebrow": "MOTION SICKNESS",
        "h1": "ゲーム酔い(3D酔い)の原因と対策",
        "h1sub": "設定と環境で、かなり防げる",
        "title": "ゲーム酔い(3D酔い)の原因と対策｜FOV・設定・環境で防ぐ方法 | GameSpec Lab",
        "desc": "ゲーム酔い・3D酔いの原因と対策を解説。視覚と平衡感覚のズレ、FOVやモーションブラー、フレームレートの影響と、設定変更・画面との距離・休憩など今日からできる対処法をまとめます。",
        "body": [
            card("OVERVIEW", "なぜゲームで酔うのか",
                 P.format("ゲーム酔い（3D酔い）は、目から入る激しい動きと、体が感じる“動いていない”という"
                          "感覚のズレが主な原因とされています。特に視点移動の速いFPSや、視野が狭い・"
                          "フレームレートが不安定な状態で起きやすくなります。")),
            card("SETTINGS", "設定でできる対策",
                 ul([("FOV(視野角)を広げる", "視野が広いと周辺が見え、酔いにくくなることが多い。"),
                     ("モーションブラー・手ブレをOFF", "余計な揺れやぼかしを切ると軽減しやすい。"),
                     ("フレームレートを安定させる", "カクつきは酔いの原因。設定を下げてでも安定を優先。"),
                     ("画面の揺れ系演出を抑える", "ヘッドボブなどの揺れ設定を弱める。")])),
            card("ENVIRONMENT", "環境・体調でできる対策",
                 ul([("画面との距離を取る", "近すぎると視界が動きで埋まり酔いやすい。"),
                     ("こまめに休憩する", "30〜60分ごとに目と体を休める。"),
                     ("明るさ・換気", "暗すぎる部屋や空気のこもりは悪化要因。"),
                     ("つらいときは無理しない", "酔い止めの利用や、ジャンル変更も選択肢。")])),
            card("ENVIRONMENT2", "モニター環境の見直しも有効",
                 P.format("フレームレートが安定して見える高リフレッシュレートのモニターや、適切なサイズ・"
                          "距離は、酔いの軽減に役立つことがあります。カクつきが気になる人は環境の見直しも"
                          "検討してみてください。")),
            {"_rel": [
                ("gaming-monitor-guide.html", "ゲーミングモニターおすすめ", "安定した表示で酔いを抑える。"),
                ("game-skill-traits.html", "ゲームが上手い人の特徴", "快適な環境で集中力を保つ。"),
                ("reaction-speed-guide.html", "反応速度を上げる方法", "環境の遅延・カクつきを減らす。"),
            ]},
        ],
        "faqs": [
            ("ゲーム酔いを防ぐ設定は？",
             "FOV(視野角)を広げる、モーションブラーや手ブレ・ヘッドボブをオフにする、フレームレートを安定させるのが効果的です。"),
            ("3D酔いがひどいときの対処法は？",
             "画面との距離を取り、30〜60分ごとに休憩し、部屋の明るさや換気を整えましょう。つらいときは無理をせず、酔い止めの利用やジャンル変更も検討してください。"),
        ],
    },
]


def render_body(blocks):
    out = []
    for b in blocks:
        if isinstance(b, dict) and "_rel" in b:
            out.append(relcard(b["_rel"]))
        else:
            out.append(b)
    return "\n".join(out)


def faq_jsonld(faqs):
    return ",\n".join(
        f"""              {{
                "@type": "Question",
                "name": "{q}",
                "acceptedAnswer": {{ "@type": "Answer", "text": "{a}" }}
              }}""" for q, a in faqs)


def faq_visible(faqs):
    rows = "\n".join(
        f"              <div><strong>{q}</strong><p>{a}</p></div>" for q, a in faqs)
    return ('          <div class="article-card">\n'
            '            <p class="article-kicker">FAQ</p>\n            <h2>よくある質問</h2>\n'
            f'            <div class="article-pair-grid">\n{rows}\n            </div>\n'
            '          </div>')


def build(a):
    url = f"{BASE}/{a['slug']}.html"
    body = render_body(a["body"]) + "\n" + faq_visible(a["faqs"])
    page = f"""<!doctype html>
<html lang="ja">
  <head>
{GTM_HEAD}
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="{a['desc']}" />
    <meta name="theme-color" content="#04050d" />
    <meta property="og:site_name" content="GameSpec Lab" />
    <meta property="og:title" content="{a['title']}" />
    <meta property="og:description" content="{a['desc']}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="{url}" />
    <meta property="og:image" content="https://gamespeclab.com/assets/diagnosis-sync-bg.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{a['h1']}｜{a['h1sub']}" />
    <meta name="twitter:description" content="{a['desc']}" />
    <meta name="twitter:image" content="https://gamespeclab.com/assets/diagnosis-sync-bg.png" />
    <title>{a['title']}</title>
    <link rel="canonical" href="{url}" />
    <link rel="icon" href="favicon.svg" />
    <link rel="preload" as="image" href="assets/diagnosis-sync-bg.webp" type="image/webp" fetchpriority="high" />
    <link rel="stylesheet" href="style.css?v={VER}" />
    <script type="application/ld+json">
      {{
        "@context": "https://schema.org",
        "@graph": [
          {{
            "@type": "Article",
            "headline": "{a['title']}",
            "url": "{url}",
            "description": "{a['desc']}",
            "author": {{ "@type": "Organization", "name": "GameSpec Lab" }},
            "publisher": {{ "@type": "Organization", "name": "GameSpec Lab" }},
            "dateModified": "{TODAY}"
          }},
          {{
            "@type": "FAQPage",
            "mainEntity": [
{faq_jsonld(a['faqs'])}
            ]
          }},
          {{
            "@type": "BreadcrumbList",
            "itemListElement": [
              {{ "@type": "ListItem", "position": 1, "name": "GameSpec Lab", "item": "https://gamespeclab.com/" }},
              {{ "@type": "ListItem", "position": 2, "name": "読み物ガイド", "item": "https://gamespeclab.com/articles.html" }},
              {{ "@type": "ListItem", "position": 3, "name": "{a['h1']}", "item": "{url}" }}
            ]
          }}
        ]
      }}
    </script>
  </head>
  <body>{GTM_NOSCRIPT}
    <header class="site-header">
      <a class="brand" href="index.html"><span class="brand-mark">GSL</span><span>GameSpec Lab</span></a>
      <button class="menu-toggle" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="site-menu"><span data-icon="menu"></span><span>MENU</span></button>
      <nav id="site-menu" aria-label="サイト内メニュー">
        <a href="gamesense.html"><span data-icon="chart"></span>ゲームセンス</a>
        <a href="gamermbti.html"><span data-icon="user"></span>ゲーマーMBTI</a>
        <a href="results.html"><span data-icon="list"></span>結果一覧</a>
        <a href="articles.html"><span data-icon="spark"></span>ガイド</a>
        <a href="affiliate-disclosure.html"><span data-icon="ad"></span>広告表記</a>
      </nav>
      <button class="menu-backdrop" type="button" aria-label="メニューを閉じる"></button>
    </header>
    <main>
      <section class="legal-hero article-hero">
        <div class="legal-copy">
          <p class="eyebrow"><span data-icon="{a['icon']}"></span>{a['eyebrow']}</p>
          <h1><span>{a['h1']}</span><span>{a['h1sub']}</span></h1>
          <p class="lead">{a['desc']}</p>
        </div>
      </section>
      <section class="section article-section">
        <article class="article-body">
{body}
        </article>
      </section>
    </main>
    <footer class="site-footer">
      <div>
        <a class="brand" href="index.html"><span class="brand-mark">GSL</span><span>GameSpec Lab</span></a>
        <p>PCゲームのゲームセンス、ゲーマータイプ、相性を診断するサービスです。</p>
      </div>
      <nav aria-label="運営情報">
        <a href="gamesense.html"><span data-icon="chart"></span>ゲームセンス</a>
        <a href="gamermbti.html"><span data-icon="user"></span>ゲーマーMBTI</a>
        <a href="results.html"><span data-icon="list"></span>結果一覧</a>
        <a href="articles.html"><span data-icon="spark"></span>ガイド</a>
        <a href="privacy.html"><span data-icon="shield"></span>プライバシー</a>
        <a href="affiliate-disclosure.html"><span data-icon="ad"></span>広告表記</a>
        <a href="site-map.html"><span data-icon="list"></span>サイトマップ</a>
      </nav>
    </footer>
    <script src="script.js?v={VER}"></script>
  </body>
</html>
"""
    with open(os.path.join(ROOT, f"{a['slug']}.html"), "w", encoding="utf-8") as f:
        f.write(page)
    print("wrote", a["slug"] + ".html")


if __name__ == "__main__":
    for a in ARTICLES:
        build(a)
