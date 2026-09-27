"""アプリのアイコンを描く：python3 tools/make-icons.py
宇宙の夜空に、「4」の惑星とロケット
"""
import math
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

S = 1024  # 高解像度で描いて縮小する
random.seed(4)


def font(size):
    for path in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', '/System/Library/Fonts/Supplemental/Arial Bold.ttf']:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            pass
    return ImageFont.load_default()


def background(radius, maskable):
    grad = Image.new('RGB', (S, S))
    gd = ImageDraw.Draw(grad)
    top, mid, bottom = (67, 55, 156), (44, 37, 116), (18, 15, 51)
    for y in range(S):
        t = y / S
        if t < 0.55:
            k = t / 0.55
            c = tuple(int(top[i] * (1 - k) + mid[i] * k) for i in range(3))
        else:
            k = (t - 0.55) / 0.45
            c = tuple(int(mid[i] * (1 - k) + bottom[i] * k) for i in range(3))
        gd.line([(0, y), (S, y)], fill=c)
    # ピンクのもや
    glow = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([-200, 620, 900, 1300], fill=(255, 111, 181, 90))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    grad.paste(glow, (0, 0), glow)
    img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    mask = Image.new('L', (S, S), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1], radius=0 if maskable else radius, fill=255)
    img.paste(grad, (0, 0), mask)
    return img


def draw_icon(maskable=False):
    img = background(220, maskable)
    d = ImageDraw.Draw(img)
    k = 0.78 if maskable else 1.0

    def P(x, y):
        return (S / 2 + (x - 512) * k, S / 2 + (y - 512) * k)

    # 星
    for _ in range(70):
        x, y = random.randint(40, 984), random.randint(40, 984)
        r = random.choice([2, 3, 3, 4, 6])
        xx, yy = P(x, y)
        d.ellipse([xx - r, yy - r, xx + r, yy + r], fill=(255, 255, 255, random.randint(120, 255)))
    for (x, y, r) in [(170, 200, 16), (820, 140, 12), (880, 700, 14)]:
        xx, yy = P(x, y)
        rr = r * k
        d.polygon([(xx, yy - rr * 2.2), (xx + rr * .5, yy - rr * .5), (xx + rr * 2.2, yy), (xx + rr * .5, yy + rr * .5), (xx, yy + rr * 2.2), (xx - rr * .5, yy + rr * .5), (xx - rr * 2.2, yy), (xx - rr * .5, yy - rr * .5)], fill=(255, 243, 176, 255))

    # 惑星（「4」）
    cx, cy = P(430, 590)
    r = 250 * k
    ring_back = [P(430 + 390 * math.cos(t), 590 + 95 * math.sin(t) - 60 * math.cos(t)) for t in [i / 60 * math.pi for i in range(61)]]
    d.line(ring_back, fill=(255, 210, 63, 255), width=int(30 * k))
    planet = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    pd = ImageDraw.Draw(planet)
    for i in range(60, 0, -1):
        t = i / 60
        col = (int(255 - 20 * (1 - t)), int(122 + 90 * (1 - t) ** 1.5), int(89 + 60 * (1 - t)), 255)
        rr = r * t
        ox, oy = cx - r * 0.25 * (1 - t), cy - r * 0.3 * (1 - t)
        pd.ellipse([ox - rr, oy - rr, ox + rr, oy + rr], fill=col)
    img.alpha_composite(planet)
    d = ImageDraw.Draw(img)
    d.text((cx + 6 * k, cy + 12 * k), '4', font=font(int(330 * k)), fill=(27, 23, 69, 255), anchor='mm')
    ring_front = [P(430 + 390 * math.cos(t), 590 + 95 * math.sin(t) - 60 * math.cos(t)) for t in [math.pi + i / 60 * math.pi for i in range(61)]]
    d.line(ring_front, fill=(255, 226, 122, 255), width=int(30 * k))

    # ロケット
    rx, ry = P(760, 330)
    ang = math.radians(40)

    def R(x, y):
        return (rx + (x * math.cos(ang) - y * math.sin(ang)) * k, ry + (x * math.sin(ang) + y * math.cos(ang)) * k)

    d.polygon([R(-40, 120), R(0, 260), R(40, 120)], fill=(255, 210, 63, 255))
    d.polygon([R(-22, 120), R(0, 200), R(22, 120)], fill=(255, 122, 89, 255))
    d.polygon([R(-55, 40), R(-105, 140), R(-45, 120)], fill=(255, 77, 109, 255))
    d.polygon([R(55, 40), R(105, 140), R(45, 120)], fill=(255, 77, 109, 255))
    body = [R(0, -170), R(45, -110), R(58, -20), R(52, 120), R(-52, 120), R(-58, -20), R(-45, -110)]
    d.polygon(body, fill=(255, 255, 255, 255))
    wx, wy = R(0, -30)
    wr = 30 * k
    d.ellipse([wx - wr, wy - wr, wx + wr, wy + wr], fill=(76, 201, 240, 255), outline=(44, 37, 116, 255), width=int(10 * k))
    return img


def save(img, size, path):
    img.resize((size, size), Image.LANCZOS).save(path)


if __name__ == '__main__':
    icon = draw_icon()
    save(icon, 512, 'icons/icon-512.png')
    save(icon, 192, 'icons/icon-192.png')
    m = draw_icon(maskable=True)
    save(m, 512, 'icons/icon-maskable-512.png')
    # iOS は角丸を自動でつけるので四角い画像にする
    save(draw_icon(maskable=True), 180, 'icons/apple-touch-icon.png')
    print('icons written')
