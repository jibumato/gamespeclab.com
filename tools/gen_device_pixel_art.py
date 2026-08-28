#!/usr/bin/env python3
# 製品ドット絵（assets/devices/*.png）を生成する。
#
# 既存アセットを解析したところ、カテゴリごとにグリッドが違っていた。
#   マウス   : 21×21グリッド / 1セル16px
#   モニター : 24×24グリッド / 1セル14px
#   マウスパッド: 24×24グリッド / 1セル14px
# いずれもキャンバスは336×336のRGBA。輪郭色 #181228 は全カテゴリ共通。
#
# 外部ライブラリを使わず、zlib だけで PNG を書き出す。
import zlib, struct, os

os.chdir(os.path.join(os.path.dirname(__file__), '..'))

CANVAS = 336

# ---- 共通色 ----
CLEAR = (0, 0, 0, 0)
LINE = (24, 18, 40, 255)        # 輪郭（全カテゴリ共通）

# ---- マウス（21×21 / 16px）----
MOUSE_PALETTE = {
    '.': CLEAR,
    '#': LINE,
    'B': (232, 235, 240, 255),  # 本体ベース
    'L': (238, 240, 243, 255),  # 本体ライト
    'W': (252, 255, 255, 255),  # ハイライト
    'C': (0, 178, 196, 255),    # アクセント
    'c': (20, 198, 222, 255),   # アクセント明
}

# Logicool G PRO X2 SUPERSTRIKE
# 同シリーズのシルエットを踏襲しつつ、この製品の特徴である
# 「メインクリックのラピッドトリガー」を示すため左右クリック面をアクセント色にする。
SUPERSTRIKE = [
    '.....................',
    '.....................',
    '.....................',
    '........#####........',
    '.......#CC#CC#.......',
    '......#WCC#CCC#......',
    '.....#WWCC#CCCC#.....',
    '.....#WWcC#CCCc#.....',
    '.....#WWBB#BBBB#.....',
    '.....#cBBB#BBBB#.....',
    '.....#BBBBLBBBB#.....',
    '.....#BBBBCBBBB#.....',
    '.....#BBBBCBBBB#.....',
    '.....#BBBBBBBBB#.....',
    '......#BBBBBBB#......',
    '......#BBBBBBB#......',
    '.......#BBBBB#.......',
    '.....................',
    '.....................',
    '.....................',
    '.....................',
]

# ---- モニター（24×24 / 14px）----
# 全機種で枠は共通、画面内の配色で機種を描き分けるのが既存アセットの設計。
MON_BASE = {
    '.': CLEAR,
    '#': LINE,
    'K': (12, 16, 22, 255),     # 画面
    'D': (20, 50, 56, 255),     # 画面内の暗いブロック
}

MON_STD = [
    '........................',
    '........................',
    '........................',
    '..####################..',
    '..#KKKKKKKKKKKKKKKKKK#..',
    '..#KKKKKKKKKKKKKKKKKK#..',
    '..#KKAAAAAAAKKKKKSKKK#..',
    '..#KKAAAAAAAKKKKKKAKK#..',
    '..#KKKKKKKKKKKKKKKKKK#..',
    '..#KKSSSSSSSSSSKKKKKK#..',
    '..#KKAAAAAKKKKKKKKKKK#..',
    '..#KKKKKKKKKKDDDDDDKK#..',
    '..#KKKKKKKKKKDDDDDDKK#..',
    '..#KKKKKKKKKKKKKKKKKK#..',
    '..####################..',
    '...........##...........',
    '...........##...........',
    '...........##...........',
    '........###aa###........',
    '........########........',
    '........................',
    '........................',
    '........................',
    '........................',
]

# 4K・大画面向け。情報量の多い画面としてバーを長く・多くする。
MON_DENSE = [
    '........................',
    '........................',
    '........................',
    '..####################..',
    '..#KKKKKKKKKKKKKKKKKK#..',
    '..#KKKKKKKKKKKKKKKKKK#..',
    '..#KKAAAAAAAAAAKKKSKK#..',
    '..#KKAAAAAAAAAAKKKKSK#..',
    '..#KKKKKKKKKKKKKKKKKK#..',
    '..#KKSSSSSSSSSSSSKKKK#..',
    '..#KKAAAAAAAKKKKKKKKK#..',
    '..#KKKKKKKKKKDDDDDDKK#..',
    '..#KKKKKKKKKKDDDDDDKK#..',
    '..#KKKKKKKKKKKKKKKKKK#..',
    '..####################..',
    '...........##...........',
    '...........##...........',
    '...........##...........',
    '........###aa###........',
    '........########........',
    '........................',
    '........................',
    '........................',
    '........................',
]

# ---- マウスパッド（24×24 / 14px）----
PAD_PALETTE = {
    '.': CLEAR,
    '#': LINE,
    'P': (34, 38, 52, 255),     # パッド表面
    'd': (26, 30, 42, 255),     # 内側の縁
    'R': (206, 44, 44, 255),    # ブランドカラー（ARTISAN の赤）
}

# ARTISAN 疾風（HAYATE）
# NINJA FX 零 と同じ枠・同じブランド色で、中央の意匠だけ変えて描き分ける。
# 「疾風」なので、中央は風を表す流れる線にした。
PAD_HAYATE = [
    '........................',
    '........................',
    '........................',
    '........................',
    '........................',
    '........................',
    '..####################..',
    '..#RRRRRRRRRRRRRRRRRR#..',
    '..#RddddddddddddddddR#..',
    '..#RdPPPPPPPPPPPPPPdR#..',
    '..#RdPPPPPPPPPPPPPPdR#..',
    '..#RdPPRRRRPPPPPPPPdR#..',
    '..#RdPPPPRRRRRRPPPPdR#..',
    '..#RdPPPPPPRRRRPPPPdR#..',
    '..#RdPPPPPPPPPPPPPPdR#..',
    '..#RdPPPPPPPPPPPPPPdR#..',
    '..#RddddddddddddddddR#..',
    '..#RRRRRRRRRRRRRRRRRR#..',
    '..####################..',
    '........................',
    '........................',
    '........................',
    '........................',
    '........................',
]


# ---- ガラスマウスパッド（24×24 / 14px）----
# 布パッドと一目で区別できるよう、冷たい色面に映り込みを入れる。
# 実表示は72px以下まで縮むため、小さなロゴ帯だけでは製品を見分けられない。
# 面の色相と映り込みの模様の両方を変えて、縮小時にも判別できるようにする。
def glass_pad_grid(pattern='diag'):
    """ガラスパッドのグリッドを生成する。手で桁を数えると崩れるため組み立てで作る。"""
    rows = ['.' * 24] * 6
    rows.append('..' + '#' * 20 + '..')
    for y in range(11):
        inner = ['G'] * 18
        if pattern == 'diag':            # 右上から左下へ一本流れる
            for k in (15 - y, 14 - y):
                if 0 <= k < 18:
                    inner[k] = 'S'
        elif pattern == 'double':        # 二本の平行な映り込み
            for base in (16 - y, 8 - y):
                for k in (base, base - 1):
                    if 0 <= k < 18:
                        inner[k] = 'S'
        elif pattern == 'corner':        # 左上に寄せた大きな光
            if y < 5:
                for k in range(1, 6 - y):
                    inner[k] = 'S'
        elif pattern == 'dots':          # マイクロエッチングを表す点描
            if y % 3 == 1:
                for k in range(2, 18, 4):
                    inner[k] = 'S'
        rows.append('..#' + ''.join(inner) + '#..')
    rows.append('..' + '#' * 20 + '..')
    rows += ['.' * 24] * 5
    return rows


def glass_palette(surface, shine):
    return {'.': CLEAR, '#': LINE, 'G': surface, 'S': shine}


def mon_palette(accent, accent_light, secondary):
    p = dict(MON_BASE)
    p['A'] = accent
    p['a'] = accent_light
    p['S'] = secondary
    return p


# 生成対象。既存アセットと配色が衝突しないよう、使用済みの色は避けている。
# 使用済み: teal #0E857C / amber #E8A83C / cyan #2ED6E0 / magenta #E83C8C
#           red #D22832 / crimson #B4143C
TARGETS = [
    # マウス
    ('assets/devices/p-mouse-superstrike.png', SUPERSTRIKE, MOUSE_PALETTE, 16),

    # モニター（同じ絵が使い回されていた機種を、機種ごとの配色で描き分ける）
    ('assets/devices/p-mon-asrock.png', MON_STD,            # ASRock PG25FFT
     mon_palette((123, 63, 228, 255), (155, 99, 240, 255), (0, 194, 168, 255)), 14),
    ('assets/devices/p-mon-m27q.png', MON_STD,              # GIGABYTE M27Q
     mon_palette((242, 101, 34, 255), (255, 138, 76, 255), (242, 101, 34, 255)), 14),
    ('assets/devices/p-mon-gigabud.png', MON_STD,           # IODATA KH-GD241JD
     mon_palette((30, 111, 217, 255), (74, 147, 240, 255), (30, 111, 217, 255)), 14),
    ('assets/devices/p-mon-fhd.png', MON_STD,               # 1万円台のフルHD（総称）
     mon_palette((63, 143, 85, 255), (95, 176, 117, 255), (63, 143, 85, 255)), 14),
    ('assets/devices/p-mon-qdoled.png', MON_STD,            # WQHD QD-OLED（総称）
     mon_palette((139, 92, 246, 255), (167, 139, 250, 255), (46, 214, 224, 255)), 14),
    ('assets/devices/p-mon-rog.png', MON_STD,               # ASUS ROG Swift OLED PG32UCDM
     mon_palette((228, 0, 43, 255), (255, 51, 85, 255), (46, 214, 224, 255)), 14),
    ('assets/devices/p-mon-m32u.png', MON_DENSE,            # GIGABYTE M32U（4K 31.5型）
     mon_palette((217, 84, 26, 255), (240, 122, 60, 255), (232, 168, 60, 255)), 14),

    # マウスパッド
    ('assets/devices/p-pad-hayate.png', PAD_HAYATE, PAD_PALETTE, 14),

    # ガラスマウスパッド（面の色相＋映り込みの模様で描き分ける）
    # 同じ Pulsar の Superglide 2 と 3 は青緑で揃え、模様で世代を分ける。
    ('assets/devices/p-pad-skypad.png', glass_pad_grid('diag'),         # SkyPAD 3.0 XL
     glass_palette((44, 62, 96, 255), (150, 190, 236, 255)), 14),
    ('assets/devices/p-pad-superglide.png', glass_pad_grid('diag'),     # Pulsar Superglide 2
     glass_palette((28, 70, 76, 255), (118, 200, 202, 255)), 14),
    ('assets/devices/p-pad-superglide3.png', glass_pad_grid('double'),  # Pulsar Superglide 3
     glass_palette((24, 78, 66, 255), (108, 222, 178, 255)), 14),
    ('assets/devices/p-pad-wallhack.png', glass_pad_grid('corner'),     # WALLHACK SP-004
     glass_palette((28, 30, 40, 255), (216, 222, 232, 255)), 14),
    ('assets/devices/p-pad-cm05.png', glass_pad_grid('dots'),           # ATTACK SHARK CM05
     glass_palette((64, 52, 38, 255), (240, 186, 112, 255)), 14),
]


def write_png(path, grid, palette, cell):
    n = CANVAS // cell
    assert CANVAS % cell == 0, f'{cell}px はキャンバス{CANVAS}を割り切れない'
    assert len(grid) == n, f'{path}: 行数が{n}ではない ({len(grid)})'
    for i, row in enumerate(grid):
        assert len(row) == n, f'{path}: {i}行目の列数が{n}ではない ({len(row)})'
        for ch in row:
            assert ch in palette, f'{path}: 未定義の文字 {ch!r}'

    raw = bytearray()
    for y in range(CANVAS):
        raw.append(0)  # filter type 0 (None)
        row = grid[y // cell]
        for x in range(CANVAS):
            raw += bytes(palette[row[x // cell]])

    def chunk(typ, data):
        c = struct.pack('>I', len(data)) + typ + data
        return c + struct.pack('>I', zlib.crc32(typ + data) & 0xFFFFFFFF)

    png = (b'\x89PNG\r\n\x1a\n'
           + chunk(b'IHDR', struct.pack('>IIBBBBB', CANVAS, CANVAS, 8, 6, 0, 0, 0))
           + chunk(b'IDAT', zlib.compress(bytes(raw), 9))
           + chunk(b'IEND', b''))
    open(path, 'wb').write(png)
    return len(png)


made = []
for path, grid, palette, cell in TARGETS:
    size = write_png(path, grid, palette, cell)
    n = CANVAS // cell
    made.append(path)
    print(f'{path.split("/")[-1]:28} {n}×{n}グリッド({cell}px) {size / 1024:.1f}KB')

# 生成物どうしで中身が重複していないか検査する（描き分けの取りこぼし防止）
import hashlib
seen = {}
for p in made:
    h = hashlib.sha1(open(p, 'rb').read()).hexdigest()
    if h in seen:
        raise SystemExit(f'生成物が重複: {p} と {seen[h]}')
    seen[h] = p
print(f'\n{len(made)}点を生成（すべて異なる絵柄）')
