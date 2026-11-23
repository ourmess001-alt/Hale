import math
from PIL import Image, ImageDraw, ImageFilter

def draw_hanger(draw, cx=450, top_y=60):
    # Metal hook
    hook_color = (40, 40, 42, 255)
    hook_highlight = (110, 110, 115, 255)
    # Hook curve
    draw.arc([cx - 28, top_y, cx + 24, top_y + 70], start=150, end=380, fill=hook_color, width=5)
    draw.arc([cx - 26, top_y + 2, cx + 22, top_y + 68], start=160, end=370, fill=hook_highlight, width=2)
    # Hook stem
    draw.line([cx - 2, top_y + 65, cx - 2, top_y + 110], fill=hook_color, width=5)
    draw.line([cx - 1, top_y + 65, cx - 1, top_y + 110], fill=hook_highlight, width=2)
    # Hook base swivel
    draw.ellipse([cx - 8, top_y + 104, cx + 4, top_y + 116], fill=(50, 50, 52, 255))
    
    # Wooden hanger bar
    wood_dark = (55, 38, 28, 255)
    wood_mid = (82, 58, 42, 255)
    wood_light = (110, 80, 60, 255)
    
    hanger_points = [
        (cx - 2, top_y + 108),
        (cx + 90, top_y + 125),
        (cx + 220, top_y + 175),
        (cx + 225, top_y + 188),
        (cx + 215, top_y + 195),
        (cx + 90, top_y + 148),
        (cx - 2, top_y + 130),
        (cx - 94, top_y + 148),
        (cx - 219, top_y + 195),
        (cx - 229, top_y + 188),
        (cx - 224, top_y + 175),
        (cx - 94, top_y + 125),
    ]
    draw.polygon(hanger_points, fill=wood_mid)
    # Highlight along top rim
    top_rim = [
        (cx - 224, top_y + 175),
        (cx - 94, top_y + 125),
        (cx - 2, top_y + 108),
        (cx + 90, top_y + 125),
        (cx + 220, top_y + 175)
    ]
    draw.line(top_rim, fill=wood_light, width=3)
    # Shadow along bottom rim
    bot_rim = [
        (cx - 219, top_y + 195),
        (cx - 94, top_y + 148),
        (cx - 2, top_y + 130),
        (cx + 90, top_y + 148),
        (cx + 215, top_y + 195)
    ]
    draw.line(bot_rim, fill=wood_dark, width=2)

def shade_color(rgb, factor):
    return tuple(max(0, min(255, int(c * factor))) for c in rgb[:3]) + (rgb[3] if len(rgb) > 3 else 255,)

def blend(c1, c2, t):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3)) + (255,)

def generate_garment(slug, base_rgb, garment_type, is_back=False):
    width, height = 900, 1100
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    cx = 450
    neck_y = 175
    
    # Color variations
    main = base_rgb + (255,)
    dark = shade_color(main, 0.72)
    darker = shade_color(main, 0.52)
    light = shade_color(main, 1.22)
    lighter = shade_color(main, 1.35)
    stitch = shade_color(main, 0.85)
    
    # 1. First draw hanger
    draw_hanger(draw, cx=cx, top_y=55)
    
    # 2. Main body dimensions based on garment type
    if garment_type == "overcoat":
        body_len = 660
        chest_w = 195
        bot_w = 215
        sleeve_w = 78
        sleeve_len = 390
    elif garment_type == "bomber":
        body_len = 460
        chest_w = 210
        bot_w = 175
        sleeve_w = 88
        sleeve_len = 380
    elif garment_type == "hoodie":
        body_len = 480
        chest_w = 215
        bot_w = 185
        sleeve_w = 86
        sleeve_len = 385
    else: # jacket, shirt, overshirt, knit
        body_len = 490
        chest_w = 200
        bot_w = 195
        sleeve_w = 80
        sleeve_len = 380

    body_bot_y = neck_y + body_len
    
    # Sleeves behind / body silhouettes
    # Left sleeve
    left_sleeve = [
        (cx - 150, neck_y + 35),
        (cx - chest_w - 55, neck_y + 110),
        (cx - chest_w - sleeve_w - 20, neck_y + sleeve_len - 40),
        (cx - chest_w - sleeve_w, neck_y + sleeve_len),
        (cx - chest_w - 15, neck_y + sleeve_len - 15),
        (cx - chest_w + 10, neck_y + 180),
        (cx - chest_w, neck_y + 110),
    ]
    draw.polygon(left_sleeve, fill=shade_color(main, 0.88))
    
    # Right sleeve
    right_sleeve = [
        (cx + 150, neck_y + 35),
        (cx + chest_w + 55, neck_y + 110),
        (cx + chest_w + sleeve_w + 20, neck_y + sleeve_len - 40),
        (cx + chest_w + sleeve_w, neck_y + sleeve_len),
        (cx + chest_w + 15, neck_y + sleeve_len - 15),
        (cx + chest_w - 10, neck_y + 180),
        (cx + chest_w, neck_y + 110),
    ]
    draw.polygon(right_sleeve, fill=shade_color(main, 0.82))

    # Sleeve fold highlights
    draw.line([
        (cx - chest_w - 40, neck_y + 120),
        (cx - chest_w - sleeve_w + 15, neck_y + sleeve_len - 50)
    ], fill=shade_color(main, 1.1), width=4)
    draw.line([
        (cx + chest_w + 40, neck_y + 120),
        (cx + chest_w + sleeve_w - 15, neck_y + sleeve_len - 50)
    ], fill=shade_color(main, 0.95), width=4)

    # Sleeve cuffs
    if garment_type in ["bomber", "hoodie", "knit"]:
        # Ribbed cuffs
        for s, side_cx in [(-1, cx - chest_w - sleeve_w / 2), (1, cx + chest_w + sleeve_w / 2)]:
            cuff_y = neck_y + sleeve_len - 15
            draw.rectangle([side_cx - 30, cuff_y, side_cx + 30, cuff_y + 35], fill=dark)
            for ry in range(cuff_y, cuff_y + 35, 6):
                draw.line([side_cx - 28, ry, side_cx + 28, ry], fill=shade_color(main, 0.65), width=2)
    else:
        # Button/Barrel cuff
        for s, side_cx in [(-1, cx - chest_w - sleeve_w / 2), (1, cx + chest_w + sleeve_w / 2)]:
            cuff_y = neck_y + sleeve_len - 15
            draw.rectangle([side_cx - 32, cuff_y, side_cx + 32, cuff_y + 25], fill=shade_color(main, 0.9))
            draw.line([side_cx - 32, cuff_y, side_cx + 32, cuff_y], fill=dark, width=2)
            if not is_back:
                draw.ellipse([side_cx - 5, cuff_y + 8, side_cx + 5, cuff_y + 18], fill=darker)

    # Main Torso
    torso_points = [
        (cx - 95, neck_y + 10),
        (cx - 165, neck_y + 40),
        (cx - chest_w, neck_y + 120),
        (cx - chest_w + 10, neck_y + 260),
        (cx - bot_w, body_bot_y),
        (cx + bot_w, body_bot_y),
        (cx + chest_w - 10, neck_y + 260),
        (cx + chest_w, neck_y + 120),
        (cx + 165, neck_y + 40),
        (cx + 95, neck_y + 10),
    ]
    # Subtle curved hem at bottom
    draw.polygon(torso_points, fill=main)
    
    # Torso gradient / shading
    # Soft vertical gradient from light at top-left to shadow at bottom-right
    for y in range(neck_y + 15, body_bot_y, 4):
        factor = 1.05 - ((y - neck_y) / body_len) * 0.22
        y_color = shade_color(main, factor)
        draw.line([(cx - chest_w + 15, y), (cx + chest_w - 15, y)], fill=y_color, width=4)

    # Side ambient occlusion
    draw.line([(cx - chest_w + 10, neck_y + 120), (cx - bot_w + 5, body_bot_y)], fill=dark, width=8)
    draw.line([(cx + chest_w - 10, neck_y + 120), (cx + bot_w - 5, body_bot_y)], fill=darker, width=10)

    # Torso Bottom Hem / Band
    if garment_type in ["bomber", "hoodie", "knit"]:
        rib_y = body_bot_y - 45
        draw.rectangle([cx - bot_w, rib_y, cx + bot_w, body_bot_y], fill=dark)
        for rx in range(int(cx - bot_w + 8), int(cx + bot_w - 8), 12):
            draw.line([(rx, rib_y + 2), (rx, body_bot_y - 2)], fill=shade_color(main, 0.65), width=3)
            draw.line([(rx + 2, rib_y + 2), (rx + 2, body_bot_y - 2)], fill=shade_color(main, 0.95), width=2)
    else:
        draw.line([(cx - bot_w, body_bot_y), (cx + bot_w, body_bot_y)], fill=darker, width=4)
        draw.line([(cx - bot_w, body_bot_y - 12), (cx + bot_w, body_bot_y - 12)], fill=stitch, width=2)

    # BACK vs FRONT specifics
    if is_back:
        # Back Yoke horizontal seam
        yoke_y = neck_y + 105
        draw.line([(cx - chest_w + 20, yoke_y), (cx + chest_w - 20, yoke_y)], fill=darker, width=3)
        draw.line([(cx - chest_w + 20, yoke_y + 2), (cx + chest_w - 20, yoke_y + 2)], fill=stitch, width=1)
        
        # Center vertical back seam
        draw.line([(cx, yoke_y), (cx, body_bot_y - 20)], fill=darker, width=3)
        draw.line([(cx + 2, yoke_y), (cx + 2, body_bot_y - 20)], fill=stitch, width=1)
        
        # Back collar rim
        draw.arc([cx - 85, neck_y - 15, cx + 85, neck_y + 35], start=0, end=180, fill=darker, width=6)
        draw.arc([cx - 80, neck_y - 12, cx + 80, neck_y + 32], start=10, end=170, fill=shade_color(main, 0.9), width=3)

        if garment_type == "overcoat":
            # Vent split at bottom
            draw.line([(cx, body_bot_y - 160), (cx, body_bot_y)], fill=(20, 20, 22, 255), width=4)

        if garment_type == "hoodie":
            # Hanging hood silhouette on back
            hood_pts = [
                (cx - 100, neck_y + 20),
                (cx - 120, neck_y + 140),
                (cx - 90, neck_y + 220),
                (cx, neck_y + 245),
                (cx + 90, neck_y + 220),
                (cx + 120, neck_y + 140),
                (cx + 100, neck_y + 20),
            ]
            draw.polygon(hood_pts, fill=shade_color(main, 0.82))
            draw.line(hood_pts, fill=darker, width=4)

    else:
        # FRONT DETAILS
        if garment_type == "bomber":
            # Ribbed collar
            draw.arc([cx - 75, neck_y - 5, cx + 75, neck_y + 55], start=0, end=180, fill=darker, width=18)
            draw.arc([cx - 72, neck_y - 2, cx + 72, neck_y + 52], start=5, end=175, fill=dark, width=12)
            # Front zipper (two-way metal zip)
            zip_color = (190, 190, 195, 255)
            draw.line([(cx, neck_y + 45), (cx, body_bot_y - 45)], fill=darker, width=10)
            draw.line([(cx, neck_y + 45), (cx, body_bot_y - 45)], fill=zip_color, width=4)
            # Zip pull tab
            draw.rectangle([cx - 6, neck_y + 180, cx + 6, neck_y + 215], fill=(220, 220, 225, 255))
            draw.ellipse([cx - 4, neck_y + 200, cx + 4, neck_y + 210], fill=darker)
            # Welt slash pockets with flap
            draw.line([(cx - 145, neck_y + 270), (cx - 75, neck_y + 345)], fill=darker, width=8)
            draw.line([(cx - 143, neck_y + 272), (cx - 73, neck_y + 347)], fill=shade_color(main, 0.6), width=4)
            draw.line([(cx + 145, neck_y + 270), (cx + 75, neck_y + 345)], fill=darker, width=8)
            draw.line([(cx + 143, neck_y + 272), (cx + 73, neck_y + 347)], fill=shade_color(main, 0.6), width=4)
            # Sleeve utility zipper pocket
            draw.rectangle([cx - chest_w - 35, neck_y + 190, cx - chest_w + 5, neck_y + 270], fill=shade_color(main, 0.95))
            draw.line([(cx - chest_w - 15, neck_y + 195), (cx - chest_w - 15, neck_y + 265)], fill=zip_color, width=3)

        elif garment_type == "overcoat":
            # Tailored notch lapels
            draw.polygon([
                (cx, neck_y + 310),
                (cx - 95, neck_y + 10),
                (cx - 135, neck_y + 80),
                (cx - 110, neck_y + 115),
                (cx - 155, neck_y + 180),
                (cx, neck_y + 310),
            ], fill=light)
            draw.polygon([
                (cx, neck_y + 310),
                (cx + 95, neck_y + 10),
                (cx + 135, neck_y + 80),
                (cx + 110, neck_y + 115),
                (cx + 155, neck_y + 180),
                (cx, neck_y + 310),
            ], fill=dark)
            # Inner chest shirt / neck cutout
            draw.polygon([(cx - 70, neck_y + 15), (cx, neck_y + 180), (cx + 70, neck_y + 15)], fill=(235, 230, 222, 255))
            # Double-breasted buttons
            for by in [neck_y + 330, neck_y + 400, neck_y + 470]:
                for bx in [cx - 50, cx + 50]:
                    draw.ellipse([bx - 9, by - 9, bx + 9, by + 9], fill=(25, 25, 28, 255))
                    draw.ellipse([bx - 6, by - 6, bx + 6, by + 6], fill=(50, 50, 55, 255))
            # Deep flap pockets
            draw.rectangle([cx - 165, neck_y + 460, cx - 75, neck_y + 490], fill=shade_color(main, 0.85))
            draw.rectangle([cx + 75, neck_y + 460, cx + 165, neck_y + 490], fill=shade_color(main, 0.85))

        elif garment_type == "hoodie":
            # Double-layer hood and neck opening
            draw.polygon([
                (cx - 85, neck_y - 20),
                (cx - 110, neck_y + 50),
                (cx, neck_y + 110),
                (cx + 110, neck_y + 50),
                (cx + 85, neck_y - 20),
            ], fill=dark)
            # Drawstrings
            string_color = (220, 215, 205, 255)
            draw.line([(cx - 30, neck_y + 80), (cx - 35, neck_y + 240)], fill=string_color, width=4)
            draw.line([(cx + 30, neck_y + 80), (cx + 35, neck_y + 240)], fill=string_color, width=4)
            # Aglets
            draw.rectangle([cx - 38, neck_y + 235, cx - 32, neck_y + 252], fill=(180, 175, 165, 255))
            draw.rectangle([cx + 32, neck_y + 235, cx + 38, neck_y + 252], fill=(180, 175, 165, 255))
            # Kangaroo pocket
            k_pts = [
                (cx - 130, body_bot_y - 65),
                (cx - 110, body_bot_y - 190),
                (cx - 70, body_bot_y - 225),
                (cx + 70, body_bot_y - 225),
                (cx + 110, body_bot_y - 190),
                (cx + 130, body_bot_y - 65),
            ]
            draw.polygon(k_pts, fill=shade_color(main, 0.92))
            draw.line(k_pts, fill=darker, width=3)

        elif garment_type == "knit":
            # Crewneck ribbed collar
            draw.arc([cx - 70, neck_y - 10, cx + 70, neck_y + 55], start=0, end=180, fill=darker, width=16)
            draw.arc([cx - 68, neck_y - 8, cx + 68, neck_y + 53], start=5, end=175, fill=dark, width=12)
            # Cable knit rope columns
            for col_x in [cx - 85, cx - 45, cx, cx + 45, cx + 85]:
                for cy in range(neck_y + 50, body_bot_y - 55, 30):
                    # Braided cable loop
                    draw.arc([col_x - 14, cy, col_x + 14, cy + 28], start=20, end=200, fill=light, width=4)
                    draw.arc([col_x - 14, cy + 12, col_x + 14, cy + 38], start=200, end=380, fill=darker, width=4)

        else: # Shirt / Shirt-Jacket / Chore-Jacket / Overshirt
            # Collars
            if garment_type == "camp_shirt":
                # Cuban camp open collar
                draw.polygon([
                    (cx - 85, neck_y + 10),
                    (cx - 125, neck_y + 85),
                    (cx - 55, neck_y + 115),
                    (cx, neck_y + 75),
                ], fill=light)
                draw.polygon([
                    (cx + 85, neck_y + 10),
                    (cx + 125, neck_y + 85),
                    (cx + 55, neck_y + 115),
                    (cx, neck_y + 75),
                ], fill=dark)
                # V-neck inner
                draw.polygon([(cx - 45, neck_y + 15), (cx, neck_y + 115), (cx + 45, neck_y + 15)], fill=(238, 234, 226, 255))
            else:
                # Spread / Point collar
                draw.polygon([
                    (cx - 85, neck_y + 10),
                    (cx - 120, neck_y + 90),
                    (cx - 20, neck_y + 70),
                    (cx, neck_y + 20),
                ], fill=light)
                draw.polygon([
                    (cx + 85, neck_y + 10),
                    (cx + 120, neck_y + 90),
                    (cx + 20, neck_y + 70),
                    (cx, neck_y + 20),
                ], fill=dark)
            
            # Front Placket
            draw.rectangle([cx - 18, neck_y + 70, cx + 18, body_bot_y], fill=shade_color(main, 0.95))
            draw.line([(cx - 18, neck_y + 70), (cx - 18, body_bot_y)], fill=darker, width=2)
            draw.line([(cx + 18, neck_y + 70), (cx + 18, body_bot_y)], fill=darker, width=2)
            
            # Buttons
            btn_color = (215, 205, 190, 255) if garment_type == "camp_shirt" else (45, 40, 35, 255)
            for by in range(neck_y + 115, body_bot_y - 30, 68):
                draw.ellipse([cx - 7, by - 7, cx + 7, by + 7], fill=btn_color)
                draw.ellipse([cx - 4, by - 4, cx + 4, by + 4], fill=shade_color(btn_color, 0.8))

            # Chest Pockets
            if garment_type in ["shirt_jacket", "overshirt", "chore_jacket"]:
                # Left chest pocket with flap
                draw.rectangle([cx - 150, neck_y + 145, cx - 55, neck_y + 260], fill=shade_color(main, 0.92))
                draw.line([(cx - 150, neck_y + 145), (cx - 55, neck_y + 145), (cx - 55, neck_y + 260), (cx - 150, neck_y + 260), (cx - 150, neck_y + 145)], fill=darker, width=2)
                # Flap
                draw.polygon([(cx - 153, neck_y + 145), (cx - 102, neck_y + 175), (cx - 52, neck_y + 145)], fill=darker)
                draw.ellipse([cx - 105, neck_y + 162, cx - 99, neck_y + 168], fill=btn_color)

                # Right chest pocket
                draw.rectangle([cx + 55, neck_y + 145, cx + 150, neck_y + 260], fill=shade_color(main, 0.88))
                draw.line([(cx + 55, neck_y + 145), (cx + 150, neck_y + 145), (cx + 150, neck_y + 260), (cx + 55, neck_y + 260), (cx + 55, neck_y + 145)], fill=darker, width=2)
                draw.polygon([(cx + 52, neck_y + 145), (cx + 102, neck_y + 175), (cx + 153, neck_y + 145)], fill=darker)
                draw.ellipse([cx + 99, neck_y + 162, cx + 105, neck_y + 168], fill=btn_color)

                if garment_type == "chore_jacket":
                    # Lower hip patch pockets
                    draw.rectangle([cx - 165, neck_y + 320, cx - 60, neck_y + 445], fill=shade_color(main, 0.9))
                    draw.line([(cx - 165, neck_y + 320), (cx - 60, neck_y + 320), (cx - 60, neck_y + 445), (cx - 165, neck_y + 445), (cx - 165, neck_y + 320)], fill=darker, width=2)
                    draw.rectangle([cx + 60, neck_y + 320, cx + 165, neck_y + 445], fill=shade_color(main, 0.86))
                    draw.line([(cx + 60, neck_y + 320), (cx + 165, neck_y + 320), (cx + 165, neck_y + 445), (cx + 60, neck_y + 445), (cx + 60, neck_y + 320)], fill=darker, width=2)

            elif garment_type == "camp_shirt":
                # Single clean patch pocket
                draw.rectangle([cx - 140, neck_y + 165, cx - 60, neck_y + 265], fill=shade_color(main, 0.94))
                draw.line([(cx - 140, neck_y + 165), (cx - 60, neck_y + 165), (cx - 60, neck_y + 265), (cx - 140, neck_y + 265), (cx - 140, neck_y + 165)], fill=darker, width=2)

    # 3. Ambient Occlusion Drop Shadow underneath garment
    shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    # Cast a gentle natural shadow below the piece
    sdraw.ellipse([cx - 240, body_bot_y + 20, cx + 240, body_bot_y + 90], fill=(20, 20, 20, 40))
    shadow = shadow.filter(ImageFilter.GaussianBlur(16))
    
    # Composite shadow under garment
    final_img = Image.alpha_composite(shadow, img)
    return final_img

def generate_lookbook_model(slug, top_rgb, garment_type, idx):
    width, height = 800, 1200
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    cx = 400
    
    # 1. Soft studio floor contact shadow
    shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.ellipse([cx - 160, 1120, cx + 160, 1175], fill=(25, 25, 25, 55))
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))
    
    # 2. Model anatomy
    skin_mid = (195, 155, 130, 255)
    skin_shadow = (165, 125, 105, 255)
    hair_dark = (35, 30, 28, 255)
    
    # Head & Neck
    head_y = 120
    # Hair
    draw.ellipse([cx - 45, head_y - 20, cx + 45, head_y + 55], fill=hair_dark)
    # Face oval
    draw.polygon([
        (cx - 32, head_y + 15),
        (cx + 32, head_y + 15),
        (cx + 25, head_y + 65),
        (cx, head_y + 85),
        (cx - 25, head_y + 65)
    ], fill=skin_mid)
    # Facial structure hint
    draw.line([(cx - 12, head_y + 40), (cx - 4, head_y + 40)], fill=hair_dark, width=2)
    draw.line([(cx + 4, head_y + 40), (cx + 12, head_y + 40)], fill=hair_dark, width=2)
    # Neck
    draw.rectangle([cx - 18, head_y + 75, cx + 18, head_y + 130], fill=skin_mid)
    draw.line([(cx + 16, head_y + 75), (cx + 16, head_y + 130)], fill=skin_shadow, width=3)
    
    # Inner white tee
    draw.polygon([(cx - 25, head_y + 115), (cx, head_y + 140), (cx + 25, head_y + 115)], fill=(245, 245, 248, 255))
    
    # 3. Model Trousers (Dark charcoal tailored relaxed trousers)
    trouser_dark = (38, 38, 42, 255)
    trouser_light = (52, 52, 58, 255)
    crotch_y = 590
    ankle_y = 1060
    
    # Left leg
    left_leg = [
        (cx - 85, 480),
        (cx - 10, crotch_y),
        (cx - 15, ankle_y),
        (cx - 75, ankle_y),
        (cx - 95, crotch_y),
    ]
    draw.polygon(left_leg, fill=trouser_dark)
    draw.line([(cx - 55, 490), (cx - 45, ankle_y)], fill=trouser_light, width=3) # Crease
    
    # Right leg
    right_leg = [
        (cx + 10, crotch_y),
        (cx + 85, 480),
        (cx + 95, crotch_y),
        (cx + 75, ankle_y),
        (cx + 15, ankle_y),
    ]
    draw.polygon(right_leg, fill=trouser_dark)
    draw.line([(cx + 45, 490), (cx + 45, ankle_y)], fill=trouser_light, width=3)
    
    # Inseam / Outseam shadows
    draw.line([(cx - 10, crotch_y), (cx - 15, ankle_y)], fill=(20, 20, 24, 255), width=4)
    draw.line([(cx + 10, crotch_y), (cx + 15, ankle_y)], fill=(20, 20, 24, 255), width=4)
    
    # 4. Clean Minimalist White Trainers
    shoe_white = (248, 248, 250, 255)
    sole_light = (225, 222, 215, 255)
    sole_dark = (180, 175, 168, 255)
    
    # Left shoe
    draw.polygon([
        (cx - 72, ankle_y - 5),
        (cx - 20, ankle_y - 5),
        (cx - 15, ankle_y + 45),
        (cx - 90, ankle_y + 45),
        (cx - 85, ankle_y + 20),
    ], fill=shoe_white)
    draw.rectangle([cx - 90, ankle_y + 40, cx - 15, ankle_y + 55], fill=sole_light)
    draw.line([(cx - 90, ankle_y + 55), (cx - 15, ankle_y + 55)], fill=sole_dark, width=2)
    
    # Right shoe
    draw.polygon([
        (cx + 20, ankle_y - 5),
        (cx + 72, ankle_y - 5),
        (cx + 85, ankle_y + 20),
        (cx + 90, ankle_y + 45),
        (cx + 15, ankle_y + 45),
    ], fill=shoe_white)
    draw.rectangle([cx + 15, ankle_y + 40, cx + 90, ankle_y + 55], fill=sole_light)
    draw.line([(cx + 15, ankle_y + 55), (cx + 90, ankle_y + 55)], fill=sole_dark, width=2)

    # 5. Top Garment Worn on Model
    main = top_rgb + (255,)
    top_dark = shade_color(main, 0.75)
    top_light = shade_color(main, 1.25)
    
    if garment_type == "overcoat":
        coat_len = 620
    elif garment_type == "bomber":
        coat_len = 390
    else:
        coat_len = 420
        
    top_bot_y = head_y + 110 + coat_len
    
    # Arms / Sleeves
    # Left arm
    draw.polygon([
        (cx - 75, head_y + 115),
        (cx - 135, head_y + 200),
        (cx - 155, head_y + 410),
        (cx - 110, head_y + 420),
        (cx - 95, head_y + 220),
    ], fill=top_dark)
    # Left hand in trouser pocket
    draw.ellipse([cx - 155, head_y + 415, cx - 110, head_y + 465], fill=skin_mid)
    
    # Right arm
    draw.polygon([
        (cx + 75, head_y + 115),
        (cx + 135, head_y + 200),
        (cx + 155, head_y + 410),
        (cx + 110, head_y + 420),
        (cx + 95, head_y + 220),
    ], fill=top_dark)
    # Right hand in trouser pocket
    draw.ellipse([cx + 110, head_y + 415, cx + 155, head_y + 465], fill=skin_mid)

    # Torso
    torso_top = head_y + 115
    torso = [
        (cx - 75, torso_top),
        (cx - 105, torso_top + 80),
        (cx - 110, top_bot_y),
        (cx + 110, top_bot_y),
        (cx + 105, torso_top + 80),
        (cx + 75, torso_top),
    ]
    draw.polygon(torso, fill=main)
    # Lighting highlights
    draw.line([(cx - 70, torso_top + 20), (cx - 75, top_bot_y - 20)], fill=top_light, width=6)
    draw.line([(cx + 75, torso_top + 20), (cx + 80, top_bot_y - 20)], fill=top_dark, width=8)

    # Front closure / zipper / collar
    if garment_type == "bomber":
        draw.line([(cx, torso_top + 25), (cx, top_bot_y)], fill=(190, 190, 195, 255), width=3)
        draw.rectangle([cx - 8, top_bot_y - 35, cx + 8, top_bot_y], fill=top_dark)
    elif garment_type == "overcoat":
        draw.polygon([(cx - 50, torso_top + 20), (cx, torso_top + 160), (cx + 50, torso_top + 20)], fill=(240, 238, 232, 255))
        draw.line([(cx - 20, torso_top + 160), (cx - 20, top_bot_y)], fill=(25, 25, 28, 255), width=4)
        for by in [torso_top + 180, torso_top + 250, torso_top + 320]:
            draw.ellipse([cx - 30, by - 5, cx - 20, by + 5], fill=(20, 20, 22, 255))
    else:
        # Placket and buttons
        draw.line([(cx, torso_top + 25), (cx, top_bot_y)], fill=top_dark, width=2)
        for by in range(int(torso_top + 50), int(top_bot_y - 20), 55):
            draw.ellipse([cx - 4, by - 4, cx + 4, by + 4], fill=(30, 28, 25, 255))

    # Composite with floor shadow
    final = Image.alpha_composite(shadow, img)
    return final

# Product Catalog Specs
products = [
    {
        "id": "1",
        "slug": "bomber-black",
        "name": "Bomber",
        "colorway": "in Black",
        "color_name": "Black",
        "rgb": (24, 24, 26),
        "type": "bomber",
    },
    {
        "id": "2",
        "slug": "shirt-jacket-rust",
        "name": "Shirt Jacket",
        "colorway": "in Rust",
        "color_name": "Rust",
        "rgb": (180, 83, 42),
        "type": "shirt_jacket",
    },
    {
        "id": "3",
        "slug": "cable-knit-navy",
        "name": "Cable Knit",
        "colorway": "in Navy",
        "color_name": "Navy",
        "rgb": (30, 43, 61),
        "type": "knit",
    },
    {
        "id": "4",
        "slug": "overcoat-charcoal",
        "name": "Overcoat",
        "colorway": "in Charcoal",
        "color_name": "Charcoal",
        "rgb": (43, 44, 48),
        "type": "overcoat",
    },
    {
        "id": "5",
        "slug": "chore-jacket-olive",
        "name": "Chore Jacket",
        "colorway": "in Olive",
        "color_name": "Olive",
        "rgb": (69, 77, 59),
        "type": "chore_jacket",
    },
    {
        "id": "6",
        "slug": "camp-shirt-stone",
        "name": "Camp Shirt",
        "colorway": "in Stone",
        "color_name": "Stone",
        "rgb": (141, 139, 132),
        "type": "camp_shirt",
    },
    {
        "id": "7",
        "slug": "overshirt-sand",
        "name": "Overshirt",
        "colorway": "in Sand",
        "color_name": "Sand",
        "rgb": (184, 168, 146),
        "type": "overshirt",
    },
    {
        "id": "8",
        "slug": "heavy-hoodie-ecru",
        "name": "Heavy Hoodie",
        "colorway": "in Ecru",
        "color_name": "Ecru",
        "rgb": (221, 215, 201),
        "type": "hoodie",
    },
]

print("Starting asset generation...")
for idx, p in enumerate(products, 1):
    slug = p["slug"]
    rgb = p["rgb"]
    gtype = p["type"]
    
    # 1. Front View
    front = generate_garment(slug, rgb, gtype, is_back=False)
    front.save(f"public/products/{slug}-front.png", "PNG", optimize=True)
    
    # 2. Back View
    back = generate_garment(slug, rgb, gtype, is_back=True)
    back.save(f"public/products/{slug}-back.png", "PNG", optimize=True)
    
    # 3. Model Lookbook View
    look = generate_lookbook_model(slug, rgb, gtype, idx)
    look.save(f"public/lookbook/model-look-{idx}.png", "PNG", optimize=True)
    print(f"Generated {idx}/8: {slug} (front, back, lookbook)")

print("All assets successfully generated!")
