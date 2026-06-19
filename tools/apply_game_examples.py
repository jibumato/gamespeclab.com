#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""gamer-mbti-*.html の「気軽に試しやすいゲーム例」を個別化(冪等).

全16タイプ×4ゲーム=64箇所の定型文を、ゲーム×タイプの具体的な相性理由へ
書き換え、ゲーム名にストアリンク(Steam/公式)を付与する。
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
S = "https://store.steampowered.com/app/{}/"

STORE = {
    "VALORANT": "https://playvalorant.com/",
    "League of Legends": "https://www.leagueoflegends.com/",
    "Teamfight Tactics": "https://teamfighttactics.leagueoflegends.com/",
    "Minecraft": "https://www.minecraft.net/",
    "Escape from Tarkov": "https://www.escapefromtarkov.com/",
    "Crusader Kings III": S.format(1158310),
    "Slay the Spire": S.format(646570),
    "Balatro": S.format(2379780),
    "Factorio": S.format(427520),
    "Dota 2": S.format(570),
    "Street Fighter 6": S.format(1364780),
    "Among Us": S.format(945360),
    "Inscryption": S.format(1092790),
    "Final Fantasy XIV": S.format(39210),
    "Baldur’s Gate 3": S.format(1086940),
    "Disco Elysium": S.format(632470),
    "Stardew Valley": S.format(413150),
    "Spiritfarer": S.format(972660),
    "Overwatch 2": S.format(2357570),
    "Monster Hunter: World": S.format(582010),
    "Helldivers 2": S.format(553850),
    "Valheim": S.format(892970),
    "Lethal Company": S.format(1966720),
    "Civilization VI": S.format(289070),
    "RimWorld": S.format(294100),
    "Against the Storm": S.format(1336490),
    "Deep Rock Galactic": S.format(548430),
    "It Takes Two": S.format(1426210),
    "PICO PARK": S.format(1509960),
    "PlateUp!": S.format(1599600),
    "Apex Legends": S.format(1172470),
    "Risk of Rain 2": S.format(632360),
    "Terraria": S.format(105600),
    "Party Animals": S.format(1260320),
    "Dave the Diver": S.format(1868140),
    "THE FINALS": S.format(2073850),
    "Overcooked! 2": S.format(728880),
    "Content Warning": S.format(2881650),
}

B = "Baldur’s Gate 3"
DESC = {
    "intj": {
        "VALORANT": "構成と射線を読んで勝ち筋を設計する5v5タクティカルFPS。先読みで組み立てる強みが活きる。",
        "Teamfight Tactics": "盤面と確率を読んで構成を最適化するオートバトラー。終盤を見据える思考が刺さる。",
        "League of Legends": "マクロと終盤設計が勝敗を分けるMOBA。試合全体の構造を描けるタイプの主戦場。",
        "Crusader Kings III": "数手先の因果を見据えて王朝を経営する戦略ゲーム。長期の組み立てが存分に活きる。",
    },
    "intp": {
        "Slay the Spire": "デッキの噛み合わせを理詰めで詰めるローグライク。最適解を探す研究気質にハマる。",
        "Balatro": "役の倍率を計算して組み上げるポーカー型ローグ。数字いじりが好きなほど沼る。",
        "Teamfight Tactics": "アイテムと構成の最適化を突き詰めるオートバトラー。仕様研究が強みになる。",
        "Factorio": "効率を限界まで追い込む工場自動化ゲーム。仕組み作りを愛でる研究者向け。",
    },
    "entj": {
        "League of Legends": "オブジェクト管理とコールで試合を動かすMOBA。司令塔として統率したい人に。",
        "VALORANT": "作戦と役割を決めて遂行する5v5FPS。勝ち筋を断言できるリーダー気質が映える。",
        "Teamfight Tactics": "限られた資源で勝ち構成へ寄せる判断力勝負。効率的に勝ちに行く人向け。",
        "Dota 2": "戦略の幅が広く統率力が問われるMOBA。盤面を仕切りたいコマンダーに。",
    },
    "entp": {
        "League of Legends": "型破りなピックやマクロで前提を崩せるMOBA。メタ破壊が楽しい人に。",
        "Street Fighter 6": "読み合いと崩しが核の格闘ゲーム。相手の想定をずらす駆け引きが刺さる。",
        "Among Us": "嘘と論理で場をかき回す正体隠匿。話術と奇策で流れを作るタイプ向け。",
        "Inscryption": "仕掛けを暴いて常識を裏切るカードゲーム。発想で攻略する人に刺さる。",
    },
    "infj": {
        "Final Fantasy XIV": "物語と人間関係をじっくり味わうMMORPG。空気と展開の両方を読む人に。",
        B: "選択が物語を変えるRPG。意味や余韻を大事にするタイプにハマる。",
        "Disco Elysium": "内省と会話で進む物語体験。深く読み解くのが好きな人に。",
        "Stardew Valley": "自分のペースで関係を育てるスローライフ。静かに没入したい人向け。",
    },
    "infp": {
        "Stardew Valley": "好きなように暮らしを紡ぐスローライフ。マイペースに浸れる巡礼者向け。",
        B: "仲間との物語に感情移入できるRPG。共感で遊ぶ人にぴったり。",
        "Final Fantasy XIV": "世界観と人とのつながりを味わうMMORPG。物語重視の人に。",
        "Spiritfarer": "別れと癒やしを描く心温まる管理ゲーム。情緒を大事にする人へ。",
    },
    "enfj": {
        "Overwatch 2": "声かけと連携で士気を上げるヒーローシューター。チームをまとめる人に。",
        "VALORANT": "コールで味方を導く5v5FPS。鼓舞しながら勝ちに行く旗手向け。",
        "Monster Hunter: World": "役割分担で大物を狩る協力アクション。場を盛り上げ導く人に。",
        "Helldivers 2": "連携前提の協力シューター。声かけでチームを束ねる人へ。",
    },
    "enfp": {
        "Minecraft": "発想次第で遊びが広がるサンドボックス。ひらめきで動く冒険家向け。",
        B: "奇策と寄り道が楽しいRPG。自由な発想で遊ぶ人に刺さる。",
        "Valheim": "仲間と探索しながら作る協力サバイバル。勢いと好奇心が活きる。",
        "Lethal Company": "ハチャメチャな協力ホラー。ノリと即興で盛り上げる人に。",
    },
    "istj": {
        "VALORANT": "定石とローテが効く5v5FPS。型を丁寧に積む安定志向にハマる。",
        "Civilization VI": "計画と手順で帝国を育てる戦略ゲーム。着実な積み上げが得意な人に。",
        "RimWorld": "段取りと管理で開拓するコロニーシム。几帳面な運用が活きる。",
        "Against the Storm": "資源と工程を整える街づくり。堅実なリソース管理が刺さる。",
    },
    "isfj": {
        "Overwatch 2": "サポートでチームを支えるシューター。カバーと気配りが光る守護役に。",
        "Deep Rock Galactic": "助け合い前提の協力採掘アクション。仲間を守る動きが活きる。",
        "Helldivers 2": "蘇生と支援が効く協力シューター。縁の下で支える人に。",
        "It Takes Two": "二人三脚で進む協力アクション。相手を気遣える人にぴったり。",
    },
    "estj": {
        "VALORANT": "役割と進行を整理して勝つ5v5FPS。IGL気質の指揮官に。",
        "Overwatch 2": "目標と集合を仕切るシューター。進行管理が得意な人に。",
        "League of Legends": "オブジェ管理と段取りのMOBA。規律で勝率を上げる人向け。",
        "Factorio": "工程を最適化する工場ゲーム。管理と効率化が好きな人に。",
    },
    "esfj": {
        "Final Fantasy XIV": "人とのつながりが核のMMORPG。場づくりが得意な宮廷官に。",
        "Monster Hunter: World": "協力で狩る賑やかアクション。声かけで和を作る人に。",
        "PICO PARK": "協力必須のパズル。みんなを誘って楽しむ人にぴったり。",
        "PlateUp!": "協力で店を回す調理ゲーム。段取りと気配りで支える人に。",
    },
    "istp": {
        "Apex Legends": "瞬間の判断が物を言うバトロワFPS。現場対応の職人肌に。",
        "Escape from Tarkov": "緊張感のある硬派FPS。冷静なクラッチが光る人向け。",
        "Street Fighter 6": "手数と反応で魅せる格闘ゲーム。技を磨く職人に刺さる。",
        "Risk of Rain 2": "アドリブが効く協力ローグ。出たとこ勝負が得意な人に。",
    },
    "isfp": {
        "Minecraft": "自由に表現できるサンドボックス。感性で作る人にハマる。",
        "Terraria": "探索と創作が広がる2Dサンドボックス。気ままに遊ぶ人へ。",
        "Party Animals": "ゆるく笑える対戦パーティー。ノリと魅せが楽しい人に。",
        "Dave the Diver": "潜水と経営が混ざる自由な冒険。感覚で楽しむ人向け。",
    },
    "estp": {
        "Apex Legends": "前に出る度胸が活きるバトロワFPS。反応と勢いのアサルトに。",
        "VALORANT": "エントリーで切り込む5v5FPS。チャンスを掴む人に刺さる。",
        "THE FINALS": "破壊しながら攻める高速シューター。即断即決が得意な人に。",
        "Helldivers 2": "前線で暴れる協力シューター。突っ込む度胸が活きる。",
    },
    "esfp": {
        "Party Animals": "わちゃわちゃ笑える対戦パーティー。場を明るくする先陣役に。",
        "Overcooked! 2": "声を掛け合う協力調理。盛り上げ役にぴったり。",
        "Content Warning": "配信ネタを撮る協力ホラーコメディ。ノリで魅せる人に。",
        "PICO PARK": "協力必須のワイワイパズル。みんなを巻き込む人に刺さる。",
    },
}

FILLER = re.compile(
    r"<li><strong>([^<]+)</strong><span>[^<]*軽く試しやすい候補です。</span></li>")

total = 0
warnings = []
for code, games in DESC.items():
    path = os.path.join(ROOT, f"gamer-mbti-{code}.html")
    if not os.path.exists(path):
        warnings.append(f"missing file: {path}")
        continue
    with open(path, encoding="utf-8") as f:
        html = f.read()

    def repl(m):
        global total
        name = m.group(1)
        url = STORE.get(name)
        desc = games.get(name)
        if not desc:
            warnings.append(f"{code}: no desc for {name!r}")
            return m.group(0)
        if not url:
            warnings.append(f"{code}: no store for {name!r}")
        namehtml = (f'<a href="{url}" target="_blank" rel="noopener">{name}</a>'
                    if url else name)
        total += 1
        return f"<li><strong>{namehtml}</strong><span>{desc}</span></li>"

    new = FILLER.sub(repl, html)
    if new != html:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new)
        print("updated", os.path.basename(path))

print("total game items rewritten:", total)
for w in warnings:
    print("WARN:", w)
