#!/usr/bin/env python3
# 製品ドット絵（assets/devices/*.png）を生成する。
# 既存アセットから解析した仕様に合わせている:
#   キャンバス 336×336 / 21×21グリッド（1セル16px）/ RGBA / 7色パレット
# 外部ライブラリを使わず、zlib だけで PNG を書き出す。
import zlib, struct, os

os.chdir(os.path.join(os.path.dirname(__file__), '..'))

CELL = 16
GRID = 21

# 既存の p-mouse-*.png から抽出した共通パレット
PALETTE = {
    '.': (0, 0, 0, 0),          # 透明
    '#': (24, 18, 40, 255),     # 輪郭
    'B': (232, 235, 240, 255),  # 本体ベース
    'L': (238, 240, 243, 255),  # 本体ライト
    'W': (252, 255, 255, 255),  # ハイライト
    'C': (0, 178, 196, 255),    # アクセント（ロジクール系シアン）
    'c': (20, 198, 222, 255),   # アクセント明
}

# Logicool G PRO X2 SUPERSTRIKE
# 同シリーズの左右対称シルエットを踏襲しつつ、この製品の特徴である
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


def write_png(path, grid):
    assert len(grid) == GRID, f'行数が{GRID}ではない: {len(grid)}'
    for i, row in enumerate(grid):
        assert len(row) == GRID, f'{i}行目の列数が{GRID}ではない: {len(row)}'
        for ch in row:
            assert ch in PALETTE, f'未定義の文字: {ch!r}'

    w = h = GRID * CELL
    raw = bytearray()
    for y in range(h):
        raw.append(0)  # filter type 0 (None)
        row = grid[y // CELL]
        for x in range(w):
            raw += bytes(PALETTE[row[x // CELL]])

    def chunk(typ, data):
        c = struct.pack('>I', len(data)) + typ + data
        return c + struct.pack('>I', zlib.crc32(typ + data) & 0xFFFFFFFF)

    png = (b'\x89PNG\r\n\x1a\n'
           + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0))
           + chunk(b'IDAT', zlib.compress(bytes(raw), 9))
           + chunk(b'IEND', b''))
    open(path, 'wb').write(png)
    return len(png)


TARGETS = [
    ('assets/devices/p-mouse-superstrike.png', SUPERSTRIKE),
]

for path, grid in TARGETS:
    size = write_png(path, grid)
    print(f'{path} — {GRID}×{GRID}グリッド / {size / 1024:.1f}KB')
