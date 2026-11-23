import math
from PIL import Image, ImageDraw, ImageFilter

def draw_hanger(draw, cx=400, top_y=60):
    # Metal wire hook
    hook_color = (32, 32, 36, 255)
    hook_shine = (150, 150, 158, 255)
    # Hook curve
    draw.arc([cx - 24, top_y, cx + 22, top_y + 64], start=140, end=380, fill=hook_color, width=5)
    draw.arc([cx - 22, top_y + 2, cx + 20, top_y + 62], start=150, end=370, fill=hook_shine, width=2)
    # Hook stem
    draw.line([(cx - 2, top_y + 60), (cx - 2, top_y + 115)], fill=hook_color, width=5)
    draw.line([(cx - 1, top_y + 60), (cx - 1, top_y + 115)], fill=hook_shine, width=2)
    # Swivel ring
    draw.ellipse([cx - 8, top_y + 110, cx + 4, top_y + 122], fill=(45, 45, 48, 255))
    
    # Contoured Wooden Hanger
    wood_base = (65, 46, 34, 255)
    wood_top = (125, 90, 65, 255)
    wood_bottom = (45, 30, 22, 255)
    
    h_pts = [
        (cx - 2, top_y + 114),
        (cx + 80, top_y + 130),
        (cx + 205, top_y + 175),
        (cx + 210, top_y + 188),
        (cx + 200, top_y + 195),
        (cx + 80, top_y + 148),
        (cx - 2, top_y + 132),
        (cx - 84, top_y + 148),
        (cx - 204, top_y + 195),
        (cx - 214, top_y + 188),
        (cx - 209, top_y + 175),
        (cx - 84, top_y + 130),
    ]
    draw.polygon(h_pts, fill=wood_base)
    draw.line([(cx - 209, top_y + 175), (cx - 84, top_y + 130), (cx - 2, top_y + 114), (cx + 80, top_y + 130), (cx + 205, top_y + 175)], fill=wood_top, width=3)
    draw.line([(cx - 204, top_y + 195), (cx - 84, top_y + 148), (cx - 2, top_y + 132), (cx + 80, top_y + 148), (cx + 200, top_y + 195)], fill=wood_bottom, width=2)

def shade(color, f):
    return (max(0, min(255, int(color[0] * f))), max(0, min(255, int(color[1] * f))), max(0, min(255, int(color[2] * f))), 255)

def generate_luxury_piece(slug, hex_code, gtype, is_back=False):
    width, height = 800, 1000
    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    
    cx = 400
    top_y = 65
    
    # 1. Draw Hanger
    draw_hanger(draw, cx=cx, top_y=top_y)
    
    r = int(hex_code[1:3], 16)
    g = int(hex_code[3:5], 16)
    b = int(hex_code[5:7], 16)
    base = (r, g, b, 255)
    
    c_light = shade(base, 1.25)
    c_mid = base
    c_shadow = shade(base, 0.72)
    c_deep = shade(base, 0.45)
    c_crease = shade(base, 0.6)
    c_stitch = shade(base, 0.82)
    
    neck_y = top_y + 115
    
    if gtype == "overcoat":
        bot_y = neck_y + 540
        torso_w = 175
        sleeve_drop = 390
    elif gtype == "bomber":
        bot_y = neck_y + 380
        torso_w = 185
        sleeve_drop = 360
    elif gtype == "hoodie":
        bot_y = neck_y + 400
        torso_w = 185
        sleeve_drop = 365
    else:
        bot_y = neck_y + 410
        torso_w = 175
        sleeve_drop = 370
        
    shoulder_y = neck_y + 60
    shoulder_x = 185
    
    # 2. Sleeves Behind Body
    # Left sleeve
    left_sleeve = [
        (cx - 70, neck_y + 20),
        (cx - shoulder_x, shoulder_y),
        (cx - shoulder_x - 45, shoulder_y + 110),
        (cx - shoulder_x - 55, neck_y + sleeve_drop - 30),
        (cx - shoulder_x - 30, neck_y + sleeve_drop),
        (cx - shoulder_x + 10, neck_y + sleeve_drop - 10),
        (cx - shoulder_x + 15, shoulder_y + 130),
        (cx - torso_w + 10, neck_y + 110),
    ]
    draw.polygon(left_sleeve, fill=shade(base, 0.88))
    
    # Right sleeve
    right_sleeve = [
        (cx + 70, neck_y + 20),
        (cx + shoulder_x, shoulder_y),
        (cx + shoulder_x + 45, shoulder_y + 110),
        (cx + shoulder_x + 55, neck_y + sleeve_drop - 30),
        (cx + shoulder_x + 30, neck_y + sleeve_drop),
        (cx + shoulder_x - 10, neck_y + sleeve_drop - 10),
        (cx + shoulder_x - 15, shoulder_y + 130),
        (cx + torso_w - 10, neck_y + 110),
    ]
    draw.polygon(right_sleeve, fill=shade(base, 0.78))
    
    # Sleeve Cuffs
    if gtype in ["bomber", "hoodie", "knit"]:
        for side, scx in [(-1, cx - shoulder_x - 40), (1, cx + shoulder_x + 20)]:
            cy = neck_y + sleeve_drop - 25
            draw.rectangle([scx, cy, scx + 32, cy + 28], fill=c_shadow)
            for ry in range(cy, cy + 28, 6):
                draw.line([(scx, ry), (scx + 32, ry)], fill=c_deep, width=2)
    else:
        for side, scx in [(-1, cx - shoulder_x - 42), (1, cx + shoulder_x + 20)]:
            cy = neck_y + sleeve_drop - 25
            draw.rectangle([scx, cy, scx + 34, cy + 25], fill=shade(base, 0.92))
            draw.line([(scx, cy), (scx + 34, cy)], fill=c_shadow, width=2)
            if not is_back:
                draw.ellipse([scx + 14, cy + 7, scx + 20, cy + 13], fill=c_deep)

    # 3. Main Torso Body with Masked Shading
    body_pts = [
        (cx - 65, neck_y + 10),
        (cx - 130, neck_y + 35),
        (cx - shoulder_x, shoulder_y),
        (cx - torso_w, neck_y + 110),
        (cx - torso_w + 10, neck_y + 240),
        (cx - torso_w + 5, bot_y),
        (cx + torso_w - 5, bot_y),
        (cx + torso_w - 10, neck_y + 240),
        (cx + torso_w, neck_y + 110),
        (cx + shoulder_x, shoulder_y),
        (cx + 130, neck_y + 35),
        (cx + 65, neck_y + 10),
    ]
    
    # Create body layer with mask so shading never bleeds outside silhouette
    body_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    bdraw = ImageDraw.Draw(body_layer)
    bdraw.polygon(body_pts, fill=c_mid)
    
    # Draw soft vertical gradient inside the torso
    for y in range(neck_y + 10, bot_y + 2):
        prog = (y - neck_y) / (bot_y - neck_y)
        f = 1.10 - prog * 0.20
        col = shade(base, f)
        bdraw.line([(0, y), (width, y)], fill=col, width=2)
        
    # Mask to body_pts
    mask = Image.new("L", (width, height), 0)
    mdraw = ImageDraw.Draw(mask)
    mdraw.polygon(body_pts, fill=255)
    
    canvas.paste(body_layer, (0, 0), mask)
    
    # Torso side creases & shadows
    draw.line([(cx - torso_w + 8, neck_y + 110), (cx - torso_w + 5, bot_y)], fill=c_shadow, width=4)
    draw.line([(cx + torso_w - 8, neck_y + 110), (cx + torso_w - 5, bot_y)], fill=c_deep, width=5)

    # Bottom Hem
    if gtype in ["bomber", "hoodie", "knit"]:
        rib_y = bot_y - 36
        draw.rectangle([cx - torso_w + 5, rib_y, cx + torso_w - 5, bot_y], fill=c_shadow)
        for rx in range(cx - torso_w + 12, cx + torso_w - 12, 10):
            draw.line([(rx, rib_y + 2), (rx, bot_y - 2)], fill=c_deep, width=2)
            draw.line([(rx + 2, rib_y + 2), (rx + 2, bot_y - 2)], fill=shade(base, 1.05), width=1)
    else:
        draw.line([(cx - torso_w + 5, bot_y), (cx + torso_w - 5, bot_y)], fill=c_deep, width=3)
        draw.line([(cx - torso_w + 5, bot_y - 10), (cx + torso_w - 5, bot_y - 10)], fill=c_stitch, width=1)

    # FRONT vs BACK Details
    if is_back:
        # Back Yoke
        yoke_y = neck_y + 90
        draw.line([(cx - torso_w + 15, yoke_y), (cx + torso_w - 15, yoke_y)], fill=c_deep, width=3)
        draw.line([(cx - torso_w + 15, yoke_y + 2), (cx + torso_w - 15, yoke_y + 2)], fill=c_stitch, width=1)
        # Center back seam
        draw.line([(cx, yoke_y), (cx, bot_y - 15)], fill=c_deep, width=2)
        # Neck collar rim
        draw.arc([cx - 65, neck_y - 10, cx + 65, neck_y + 35], start=0, end=180, fill=c_deep, width=8)
        
        if gtype == "overcoat":
            draw.line([(cx, bot_y - 140), (cx, bot_y)], fill=(18, 18, 20, 255), width=3)
            
        if gtype == "hoodie":
            hood_pts = [
                (cx - 75, neck_y + 15),
                (cx - 95, neck_y + 120),
                (cx, neck_y + 195),
                (cx + 95, neck_y + 120),
                (cx + 75, neck_y + 15),
            ]
            draw.polygon(hood_pts, fill=shade(base, 0.85))
            draw.line(hood_pts, fill=c_deep, width=3)
    else:
        # FRONT FEATURES
        if gtype == "bomber":
            draw.arc([cx - 62, neck_y - 6, cx + 62, neck_y + 44], start=0, end=180, fill=c_deep, width=15)
            draw.line([(cx, neck_y + 38), (cx, bot_y - 36)], fill=c_deep, width=7)
            draw.line([(cx, neck_y + 38), (cx, bot_y - 36)], fill=(195, 195, 200, 255), width=3)
            draw.rectangle([cx - 5, neck_y + 160, cx + 5, neck_y + 190], fill=(225, 225, 230, 255))
            draw.ellipse([cx - 3, neck_y + 175, cx + 3, neck_y + 185], fill=c_deep)
            # Slash pockets
            draw.line([(cx - 130, neck_y + 220), (cx - 65, neck_y + 290)], fill=c_deep, width=6)
            draw.line([(cx - 128, neck_y + 222), (cx - 63, neck_y + 292)], fill=shade(base, 0.55), width=3)
            draw.line([(cx + 130, neck_y + 220), (cx + 65, neck_y + 290)], fill=c_deep, width=6)
            draw.line([(cx + 128, neck_y + 222), (cx + 63, neck_y + 292)], fill=shade(base, 0.55), width=3)
            # Utility pocket
            draw.rectangle([cx - torso_w - 30, neck_y + 160, cx - torso_w + 5, neck_y + 235], fill=shade(base, 0.95))
            draw.line([(cx - torso_w - 12, neck_y + 165), (cx - torso_w - 12, neck_y + 230)], fill=(195, 195, 200, 255), width=2)

        elif gtype == "overcoat":
            draw.polygon([(cx, neck_y + 260), (cx - 65, neck_y + 10), (cx - 120, neck_y + 70), (cx - 95, neck_y + 105), (cx - 135, neck_y + 160), (cx, neck_y + 260)], fill=c_light)
            draw.polygon([(cx, neck_y + 260), (cx + 65, neck_y + 10), (cx + 120, neck_y + 70), (cx + 95, neck_y + 105), (cx + 135, neck_y + 160), (cx, neck_y + 260)], fill=c_shadow)
            draw.polygon([(cx - 45, neck_y + 15), (cx, neck_y + 140), (cx + 45, neck_y + 15)], fill=(235, 230, 222, 255))
            for by in [neck_y + 280, neck_y + 345, neck_y + 410]:
                for bx in [cx - 40, cx + 40]:
                    draw.ellipse([bx - 8, by - 8, bx + 8, by + 8], fill=(22, 22, 25, 255))
                    draw.ellipse([bx - 5, by - 5, bx + 5, by + 5], fill=(45, 45, 50, 255))
            draw.rectangle([cx - 140, neck_y + 380, cx - 60, neck_y + 408], fill=c_shadow)
            draw.rectangle([cx + 60, neck_y + 380, cx + 140, neck_y + 408], fill=c_shadow)

        elif gtype == "hoodie":
            draw.polygon([(cx - 65, neck_y - 10), (cx - 90, neck_y + 45), (cx, neck_y + 90), (cx + 90, neck_y + 45), (cx + 65, neck_y - 10)], fill=c_shadow)
            str_col = (225, 220, 212, 255)
            draw.line([(cx - 24, neck_y + 70), (cx - 28, neck_y + 210)], fill=str_col, width=3)
            draw.line([(cx + 24, neck_y + 70), (cx + 28, neck_y + 210)], fill=str_col, width=3)
            k_pts = [(cx - 110, bot_y - 45), (cx - 95, bot_y - 160), (cx - 55, bot_y - 190), (cx + 55, bot_y - 190), (cx + 95, bot_y - 160), (cx + 110, bot_y - 45)]
            draw.polygon(k_pts, fill=shade(base, 0.92))
            draw.line(k_pts, fill=c_deep, width=2)

        elif gtype == "knit":
            draw.arc([cx - 60, neck_y - 8, cx + 60, neck_y + 45], start=0, end=180, fill=c_deep, width=14)
            for col_x in [cx - 75, cx - 25, cx + 25, cx + 75]:
                for cy in range(neck_y + 50, bot_y - 45, 26):
                    draw.arc([col_x - 12, cy, col_x + 12, cy + 24], start=20, end=200, fill=c_light, width=3)
                    draw.arc([col_x - 12, cy + 10, col_x + 12, cy + 34], start=200, end=380, fill=c_deep, width=3)

        else: # Shirt / Shirt Jacket / Chore / Camp
            if gtype == "camp_shirt":
                draw.polygon([(cx - 65, neck_y + 10), (cx - 105, neck_y + 75), (cx - 45, neck_y + 95), (cx, neck_y + 60)], fill=c_light)
                draw.polygon([(cx + 65, neck_y + 10), (cx + 105, neck_y + 75), (cx + 45, neck_y + 95), (cx, neck_y + 60)], fill=c_shadow)
                draw.polygon([(cx - 35, neck_y + 15), (cx, neck_y + 95), (cx + 35, neck_y + 15)], fill=(238, 234, 226, 255))
            else:
                draw.polygon([(cx - 65, neck_y + 10), (cx - 100, neck_y + 75), (cx - 15, neck_y + 60), (cx, neck_y + 18)], fill=c_light)
                draw.polygon([(cx + 65, neck_y + 10), (cx + 100, neck_y + 75), (cx + 15, neck_y + 60), (cx, neck_y + 18)], fill=c_shadow)
                
            draw.rectangle([cx - 15, neck_y + 60, cx + 15, bot_y], fill=shade(base, 0.95))
            draw.line([(cx - 15, neck_y + 60), (cx - 15, bot_y)], fill=c_deep, width=2)
            draw.line([(cx + 15, neck_y + 60), (cx + 15, bot_y)], fill=c_deep, width=2)
            
            btn_col = (220, 210, 195, 255) if gtype == "camp_shirt" else (45, 42, 38, 255)
            for by in range(neck_y + 100, bot_y - 25, 58):
                draw.ellipse([cx - 6, by - 6, cx + 6, by + 6], fill=btn_col)
                draw.ellipse([cx - 3, by - 3, cx + 3, by + 3], fill=shade(btn_col, 0.75))

            if gtype in ["shirt_jacket", "overshirt", "chore_jacket"]:
                draw.rectangle([cx - 125, neck_y + 120, cx - 45, neck_y + 215], fill=shade(base, 0.92))
                draw.polygon([(cx - 127, neck_y + 120), (cx - 85, neck_y + 145), (cx - 43, neck_y + 120)], fill=c_deep)
                draw.ellipse([cx - 88, neck_y + 135, cx - 82, neck_y + 141], fill=btn_col)
                draw.rectangle([cx + 45, neck_y + 120, cx + 125, neck_y + 215], fill=shade(base, 0.88))
                draw.polygon([(cx + 43, neck_y + 120), (cx + 85, neck_y + 145), (cx + 127, neck_y + 120)], fill=c_deep)
                draw.ellipse([cx + 82, neck_y + 135, cx + 88, neck_y + 141], fill=btn_col)
                
                if gtype == "chore_jacket":
                    draw.rectangle([cx - 135, neck_y + 265, cx - 45, neck_y + 370], fill=shade(base, 0.9))
                    draw.rectangle([cx + 45, neck_y + 265, cx + 135, neck_y + 370], fill=shade(base, 0.86))
            elif gtype == "camp_shirt":
                draw.rectangle([cx - 115, neck_y + 140, cx - 45, neck_y + 225], fill=shade(base, 0.94))
                draw.line([(cx - 115, neck_y + 140), (cx - 45, neck_y + 140), (cx - 45, neck_y + 225), (cx - 115, neck_y + 225), (cx - 115, neck_y + 140)], fill=c_deep, width=2)

    # 4. Natural Ambient Occlusion Drop Shadow
    shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.ellipse([cx - 190, bot_y + 20, cx + 190, bot_y + 75], fill=(20, 20, 25, 45))
    shadow = shadow.filter(ImageFilter.GaussianBlur(15))

    return Image.alpha_composite(shadow, canvas)

def generate_lookbook(slug, hex_code, gtype, idx):
    width, height = 800, 1200
    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    
    cx = 400
    head_y = 110
    
    # Contact floor shadow
    shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.ellipse([cx - 150, 1120, cx + 150, 1175], fill=(22, 22, 25, 55))
    shadow = shadow.filter(ImageFilter.GaussianBlur(16))
    
    skin = (196, 158, 134, 255)
    skin_shadow = (165, 128, 106, 255)
    hair = (34, 30, 28, 255)
    
    draw.ellipse([cx - 42, head_y - 20, cx + 42, head_y + 50], fill=hair)
    draw.polygon([(cx - 30, head_y + 15), (cx + 30, head_y + 15), (cx + 24, head_y + 65), (cx, head_y + 82), (cx - 24, head_y + 65)], fill=skin)
    draw.line([(cx - 12, head_y + 40), (cx - 4, head_y + 40)], fill=hair, width=2)
    draw.line([(cx + 4, head_y + 40), (cx + 12, head_y + 40)], fill=hair, width=2)
    draw.rectangle([cx - 18, head_y + 75, cx + 18, head_y + 125], fill=skin)
    draw.line([(cx + 16, head_y + 75), (cx + 16, head_y + 125)], fill=skin_shadow, width=3)
    
    draw.polygon([(cx - 24, head_y + 115), (cx, head_y + 140), (cx + 24, head_y + 115)], fill=(245, 245, 248, 255))
    
    t_dark = (36, 36, 40, 255)
    t_crease = (52, 52, 58, 255)
    crotch = 590
    ankle = 1060
    
    draw.polygon([(cx - 80, 480), (cx - 8, crotch), (cx - 15, ankle), (cx - 75, ankle), (cx - 95, crotch)], fill=t_dark)
    draw.line([(cx - 50, 490), (cx - 45, ankle)], fill=t_crease, width=2)
    
    draw.polygon([(cx + 8, crotch), (cx + 80, 480), (cx + 95, crotch), (cx + 75, ankle), (cx + 15, ankle)], fill=t_dark)
    draw.line([(cx + 50, 490), (cx + 45, ankle)], fill=t_crease, width=2)
    
    draw.line([(cx - 8, crotch), (cx - 15, ankle)], fill=(20, 20, 22, 255), width=3)
    draw.line([(cx + 8, crotch), (cx + 15, ankle)], fill=(20, 20, 22, 255), width=3)
    
    shoe = (248, 248, 250, 255)
    sole = (220, 218, 212, 255)
    draw.polygon([(cx - 72, ankle - 5), (cx - 20, ankle - 5), (cx - 15, ankle + 45), (cx - 88, ankle + 45), (cx - 85, ankle + 20)], fill=shoe)
    draw.rectangle([cx - 88, ankle + 40, cx - 15, ankle + 52], fill=sole)
    draw.polygon([(cx + 20, ankle - 5), (cx + 72, ankle - 5), (cx + 85, ankle + 20), (cx + 88, ankle + 45), (cx + 15, ankle + 45)], fill=shoe)
    draw.rectangle([cx + 15, ankle + 40, cx + 88, ankle + 52], fill=sole)
    
    r = int(hex_code[1:3], 16)
    g = int(hex_code[3:5], 16)
    b = int(hex_code[5:7], 16)
    base = (r, g, b, 255)
    
    if gtype == "overcoat":
        tlen = 620
    elif gtype == "bomber":
        tlen = 390
    else:
        tlen = 420
        
    top_bot = head_y + 115 + tlen
    
    draw.polygon([(cx - 70, head_y + 115), (cx - 130, head_y + 200), (cx - 150, head_y + 400), (cx - 105, head_y + 410), (cx - 90, head_y + 220)], fill=shade(base, 0.78))
    draw.ellipse([cx - 150, head_y + 405, cx - 105, head_y + 455], fill=skin)
    draw.polygon([(cx + 70, head_y + 115), (cx + 130, head_y + 200), (cx + 150, head_y + 400), (cx + 105, head_y + 410), (cx + 90, head_y + 220)], fill=shade(base, 0.72))
    draw.ellipse([cx + 105, head_y + 405, cx + 150, head_y + 455], fill=skin)
    
    torso = [(cx - 70, head_y + 115), (cx - 105, head_y + 190), (cx - 110, top_bot), (cx + 110, top_bot), (cx + 105, head_y + 190), (cx + 70, head_y + 115)]
    draw.polygon(torso, fill=base)
    draw.line([(cx - 65, head_y + 130), (cx - 70, top_bot - 15)], fill=shade(base, 1.2), width=5)
    draw.line([(cx + 70, head_y + 130), (cx + 75, top_bot - 15)], fill=shade(base, 0.75), width=6)
    
    if gtype == "bomber":
        draw.line([(cx, head_y + 135), (cx, top_bot)], fill=(195, 195, 200, 255), width=3)
        draw.rectangle([cx - 8, top_bot - 35, cx + 8, top_bot], fill=shade(base, 0.7))
    elif gtype == "overcoat":
        draw.polygon([(cx - 50, head_y + 130), (cx, head_y + 270), (cx + 50, head_y + 130)], fill=(240, 238, 232, 255))
        draw.line([(cx - 18, head_y + 270), (cx - 18, top_bot)], fill=(25, 25, 28, 255), width=3)
        for by in [head_y + 290, head_y + 360, head_y + 430]:
            draw.ellipse([cx - 26, by - 5, cx - 18, by + 3], fill=(20, 20, 22, 255))
    else:
        draw.line([(cx, head_y + 135), (cx, top_bot)], fill=shade(base, 0.65), width=2)
        for by in range(int(head_y + 160), int(top_bot - 20), 55):
            draw.ellipse([cx - 4, by - 4, cx + 4, by + 4], fill=(30, 28, 25, 255))

    return Image.alpha_composite(shadow, canvas)

catalog = [
    ("bomber-black", "#18181A", "bomber"),
    ("shirt-jacket-rust", "#B4532A", "shirt_jacket"),
    ("cable-knit-navy", "#1E2B3D", "knit"),
    ("overcoat-charcoal", "#2B2C30", "overcoat"),
    ("chore-jacket-olive", "#454D3B", "chore_jacket"),
    ("camp-shirt-stone", "#8D8B84", "camp_shirt"),
    ("overshirt-sand", "#B8A892", "overshirt"),
    ("heavy-hoodie-ecru", "#DDD7C9", "hoodie"),
]

print("Rendering masked luxury garment assets...")
for idx, (slug, hex_code, gtype) in enumerate(catalog, 1):
    f_img = generate_luxury_piece(slug, hex_code, gtype, is_back=False)
    f_img.save(f"public/products/{slug}-front.png", "PNG", optimize=True)
    
    b_img = generate_luxury_piece(slug, hex_code, gtype, is_back=True)
    b_img.save(f"public/products/{slug}-back.png", "PNG", optimize=True)
    
    m_img = generate_lookbook(slug, hex_code, gtype, idx)
    m_img.save(f"public/lookbook/model-look-{idx}.png", "PNG", optimize=True)

print("Finished rendering all 24 assets!")
