from __future__ import annotations

import json
import shutil
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(r"C:\Users\g3098\Desktop\CLAWSCOMPANY")
BASE = ROOT / "_refs" / "Star-Office-UI"
INSTANCES_ROOT = ROOT / "_refs" / "star-office-live"
PREVIEW_ROOT = ROOT / "frontend" / "public" / "star-office" / "previews"

CANVAS_SIZE = (1280, 720)


@dataclass(frozen=True)
class OfficeConfig:
    office_id: str
    port: int
    name: str
    main_state: str
    main_detail: str
    background: str
    guests: list[tuple[str, str, str, str]]


CONFIGS = [
    OfficeConfig(
        office_id="growth",
        port=19101,
        name="增长部 / Launch Room",
        main_state="executing",
        main_detail="首发传播、内容包装与增长实验同步推进",
        background="growth-launch",
        guests=[("Growth", "syncing", "准备首周传播排期", "guest_role_1")],
    ),
    OfficeConfig(
        office_id="release",
        port=19102,
        name="发行部 / Screenshot Studio",
        main_state="syncing",
        main_detail="截图脚本、商店文案与提审材料同步整理",
        background="release-shot",
        guests=[("Publisher", "writing", "打磨截图与卖点文案", "guest_role_4")],
    ),
    OfficeConfig(
        office_id="release-meta",
        port=19114,
        name="发行部 / Metadata Desk",
        main_state="writing",
        main_detail="关键词、副标题与审核备注整理中",
        background="release-meta",
        guests=[("Metadata", "writing", "梳理关键词与审核备注", "guest_role_3")],
    ),
    OfficeConfig(
        office_id="qa",
        port=19103,
        name="QA 部 / Gate Room",
        main_state="error",
        main_detail="回归检查与风险拦截正在进行",
        background="qa-gate",
        guests=[("Inspector", "error", "拦截主链路缺口", "guest_role_6")],
    ),
    OfficeConfig(
        office_id="engineering",
        port=19104,
        name="工程部 / Shell Bay",
        main_state="executing",
        main_detail="总部骨架、楼层路由与办公室容器联调中",
        background="engineering-shell",
        guests=[("Bald", "writing", "稳定页面骨架与状态层", "guest_role_2")],
    ),
    OfficeConfig(
        office_id="engineering-build",
        port=19113,
        name="工程部 / Build Bay",
        main_state="executing",
        main_detail="工时、工资与周报主流程正在并联",
        background="engineering-build",
        guests=[
            ("Builder", "executing", "推进主流程联调", "guest_role_5"),
            ("Shi", "syncing", "接入 A2A 状态引擎", "guest_role_3"),
        ],
    ),
    OfficeConfig(
        office_id="design",
        port=19105,
        name="设计部 / Atelier",
        main_state="writing",
        main_detail="像素舞台、路演界面与 iOS 审美统一中",
        background="design-studio",
        guests=[
            ("Director", "writing", "统一视觉系统", "guest_role_1"),
            ("Randy", "executing", "推进 iOS 体验落地", "guest_role_4"),
        ],
    ),
    OfficeConfig(
        office_id="investment",
        port=19106,
        name="产品投资部 / Committee Room",
        main_state="syncing",
        main_detail="机会评分、ROI 与立项优先级正在汇总",
        background="investment-committee",
        guests=[("PM", "writing", "更新机会评分与委员会结论", "guest_role_6")],
    ),
    OfficeConfig(
        office_id="intel",
        port=19107,
        name="情报部 / Signal Scan",
        main_state="researching",
        main_detail="GitHub、X、小红书与论文信号正在抓取",
        background="intel-scan",
        guests=[("Scout", "researching", "扫描平台高热信号", "guest_role_2")],
    ),
    OfficeConfig(
        office_id="intel-synth",
        port=19112,
        name="情报部 / Synth Room",
        main_state="writing",
        main_detail="趋势簇和立项摘要正在归纳",
        background="intel-synth",
        guests=[
            ("Synth", "writing", "压缩趋势簇与机会摘要", "guest_role_4"),
            ("Zhang", "syncing", "同步 team fit 评分", "guest_role_2"),
        ],
    ),
    OfficeConfig(
        office_id="partner",
        port=19108,
        name="外交部 / Outreach Room",
        main_state="idle",
        main_detail="渠道候选、媒体名单与合作推进并行整理",
        background="partner-outreach",
        guests=[
            ("Partner", "writing", "筛选高价值渠道", "guest_role_5"),
            ("BD", "syncing", "推进下一步合作动作", "guest_role_6"),
        ],
    ),
    OfficeConfig(
        office_id="team",
        port=19109,
        name="Team Office / Narrative Room",
        main_state="writing",
        main_detail="团队能力注入与路演主叙事正在成形",
        background="team-story",
        guests=[
            ("Peng", "writing", "打磨一人公司主叙事", "guest_role_4"),
            ("Zhang", "researching", "校准机会评分策略", "guest_role_2"),
        ],
    ),
    OfficeConfig(
        office_id="team-builder",
        port=19111,
        name="Team Office / Builder Room",
        main_state="executing",
        main_detail="iOS 落地与平台工程正在双线推进",
        background="team-build",
        guests=[
            ("Randy", "executing", "推进 iOS 页面落地", "guest_role_1"),
            ("Shi", "syncing", "接入协作和状态层", "guest_role_3"),
        ],
    ),
    OfficeConfig(
        office_id="founder",
        port=19110,
        name="Founder Office / Command Deck",
        main_state="idle",
        main_detail="全局拍板、优先级调整与关键风险汇总",
        background="founder-command",
        guests=[("EM", "writing", "评估 Demo 主链与优先级", "guest_role_4")],
    ),
]


THEMES = {
    "founder-command": {
        "layout": "executive",
        "overlay": (244, 162, 97, 16),
        "sprites": [
            ("desk", (92, 438, 238, 186)),
            ("desk", (356, 470, 206, 160)),
            ("coffee", (552, 420, 122, 152)),
            ("coffee", (838, 466, 108, 136)),
            ("sofa", (920, 362, 204, 204)),
            ("server", (1022, 72, 154, 218)),
            ("server", (862, 72, 154, 218)),
            ("plant_a", (694, 378, 104, 104)),
            ("poster_a", (182, 58, 96, 96)),
        ],
    },
    "team-story": {
        "layout": "bullpen-warm",
        "overlay": (122, 162, 255, 14),
        "sprites": [
            ("desk", (62, 454, 232, 184)),
            ("desk", (322, 454, 228, 180)),
            ("desk", (584, 454, 228, 180)),
            ("coffee", (874, 456, 116, 146)),
            ("plant_a", (968, 388, 94, 94)),
            ("flower", (252, 520, 76, 76)),
            ("flower", (516, 522, 76, 76)),
            ("cat", (48, 560, 112, 112)),
            ("poster_b", (178, 54, 100, 100)),
            ("poster_a", (822, 54, 100, 100)),
        ],
    },
    "team-build": {
        "layout": "bullpen-cool",
        "overlay": (88, 166, 255, 16),
        "sprites": [
            ("desk", (74, 452, 230, 182)),
            ("desk", (338, 452, 230, 182)),
            ("desk", (602, 452, 230, 182)),
            ("server", (1028, 84, 146, 210)),
            ("server", (868, 84, 146, 210)),
            ("coffee", (868, 450, 118, 148)),
            ("plant_a", (754, 388, 96, 96)),
            ("poster_b", (988, 54, 100, 100)),
        ],
    },
    "partner-outreach": {
        "layout": "lounge",
        "overlay": (208, 165, 110, 14),
        "sprites": [
            ("desk", (60, 466, 222, 176)),
            ("sofa", (736, 382, 194, 194)),
            ("sofa", (944, 388, 172, 172)),
            ("coffee", (528, 436, 126, 156)),
            ("plant_b", (204, 388, 102, 102)),
            ("plant_a", (1112, 404, 86, 86)),
            ("poster_b", (926, 54, 96, 96)),
        ],
    },
    "intel-scan": {
        "layout": "war-room",
        "overlay": (84, 179, 128, 18),
        "sprites": [
            ("desk", (58, 458, 228, 182)),
            ("desk", (312, 458, 212, 172)),
            ("server", (996, 84, 150, 214)),
            ("server", (832, 84, 150, 214)),
            ("bug", (732, 430, 88, 88)),
            ("plant_b", (112, 388, 98, 98)),
            ("poster_a", (118, 54, 100, 100)),
        ],
    },
    "intel-synth": {
        "layout": "analysis-room",
        "overlay": (57, 200, 176, 18),
        "sprites": [
            ("desk", (76, 454, 226, 180)),
            ("desk", (330, 454, 224, 178)),
            ("desk", (594, 454, 222, 176)),
            ("server", (1024, 90, 146, 208)),
            ("coffee", (864, 450, 116, 146)),
            ("plant_a", (710, 388, 92, 92)),
            ("poster_b", (542, 56, 96, 96)),
        ],
    },
    "investment-committee": {
        "layout": "committee-room",
        "overlay": (240, 190, 111, 14),
        "sprites": [
            ("desk", (92, 458, 220, 176)),
            ("coffee", (566, 432, 132, 164)),
            ("sofa", (888, 382, 180, 180)),
            ("plant_a", (748, 390, 96, 96)),
            ("poster_a", (912, 54, 96, 96)),
        ],
    },
    "design-studio": {
        "layout": "studio",
        "overlay": (255, 139, 177, 16),
        "sprites": [
            ("desk", (74, 454, 226, 180)),
            ("desk", (330, 454, 226, 180)),
            ("desk", (590, 454, 226, 180)),
            ("flower", (252, 522, 76, 76)),
            ("flower", (514, 522, 76, 76)),
            ("flower", (780, 522, 76, 76)),
            ("plant_b", (998, 390, 98, 98)),
            ("poster_b", (152, 54, 100, 100)),
            ("poster_a", (932, 54, 100, 100)),
        ],
    },
    "engineering-shell": {
        "layout": "engineering-shell",
        "overlay": (114, 176, 255, 16),
        "sprites": [
            ("desk", (66, 456, 230, 182)),
            ("desk", (320, 456, 218, 174)),
            ("coffee", (574, 438, 126, 156)),
            ("server", (1006, 86, 154, 220)),
            ("server", (846, 86, 154, 220)),
            ("plant_a", (736, 390, 96, 96)),
            ("poster_a", (908, 56, 96, 96)),
        ],
    },
    "engineering-build": {
        "layout": "engineering-build",
        "overlay": (92, 197, 255, 16),
        "sprites": [
            ("desk", (60, 456, 226, 180)),
            ("desk", (318, 456, 224, 178)),
            ("desk", (576, 456, 222, 176)),
            ("server", (1008, 86, 154, 220)),
            ("bug", (820, 446, 82, 82)),
            ("poster_b", (924, 56, 96, 96)),
            ("plant_a", (724, 394, 92, 92)),
        ],
    },
    "qa-gate": {
        "layout": "qa-gate",
        "overlay": (255, 117, 117, 18),
        "sprites": [
            ("desk", (92, 458, 228, 182)),
            ("coffee", (336, 454, 114, 144)),
            ("server", (994, 90, 156, 224)),
            ("bug", (760, 430, 96, 96)),
            ("bug", (882, 446, 76, 76)),
            ("poster_a", (928, 56, 96, 96)),
        ],
    },
    "release-shot": {
        "layout": "release-studio",
        "overlay": (109, 214, 146, 14),
        "sprites": [
            ("desk", (72, 458, 226, 180)),
            ("desk", (326, 458, 220, 176)),
            ("flower", (250, 522, 76, 76)),
            ("flower", (510, 522, 76, 76)),
            ("sofa", (878, 382, 180, 180)),
            ("poster_b", (908, 56, 98, 98)),
            ("plant_a", (1066, 402, 88, 88)),
        ],
    },
    "release-meta": {
        "layout": "metadata-lab",
        "overlay": (127, 224, 195, 14),
        "sprites": [
            ("desk", (84, 456, 228, 182)),
            ("desk", (342, 456, 224, 178)),
            ("server", (1002, 90, 150, 214)),
            ("coffee", (604, 446, 118, 148)),
            ("plant_b", (722, 396, 96, 96)),
            ("poster_a", (898, 56, 96, 96)),
        ],
    },
    "growth-launch": {
        "layout": "launch-room",
        "overlay": (246, 189, 78, 14),
        "sprites": [
            ("desk", (66, 458, 226, 180)),
            ("desk", (326, 458, 220, 176)),
            ("flower", (250, 522, 76, 76)),
            ("coffee", (566, 448, 118, 148)),
            ("cat", (52, 558, 112, 112)),
            ("plant_b", (860, 390, 98, 98)),
            ("poster_a", (940, 56, 98, 98)),
        ],
    },
}


def state_to_area(state: str) -> str:
    mapping = {
        "idle": "breakroom",
        "writing": "writing",
        "researching": "writing",
        "executing": "writing",
        "syncing": "writing",
        "error": "error",
    }
    return mapping.get(state, "breakroom")


def copy_base(instance_dir: Path) -> None:
    shutil.copytree(
        BASE,
        instance_dir,
        dirs_exist_ok=True,
        ignore=shutil.ignore_patterns("__pycache__", "*.pyc", "*.log", ".git"),
    )


def ensure_identity(instance_dir: Path, name: str) -> None:
    workspace_dir = instance_dir / "workspace"
    workspace_dir.mkdir(parents=True, exist_ok=True)
    content = f"# IDENTITY\n\n- **Name:** {name}\n"
    (workspace_dir / "IDENTITY.md").write_text(content, encoding="utf-8")


def patch_index_html(instance_dir: Path) -> None:
    html_path = instance_dir / "frontend" / "index.html"
    html = html_path.read_text(encoding="utf-8")
    marker = "opc-embed-clean"
    if marker in html:
        return

    css = """
<style id="opc-embed-clean">
body {
  padding: 0 !important;
  gap: 0 !important;
  overflow: hidden !important;
  background: #101721 !important;
}
#bottom-panels,
#control-bar,
#memo-panel,
#guest-agent-panel,
#asset-drawer-backdrop,
#asset-drawer,
#lang-toggle-group,
#coords-toggle,
#pan-toggle,
#status-text {
  display: none !important;
}
#main-stage {
  width: 100vw !important;
  max-width: none !important;
  height: 100vh !important;
  margin: 0 !important;
  transform: none !important;
}
#game-container {
  margin: 0 !important;
}
</style>
"""
    html = html.replace("</head>", f"{css}\n</head>")
    html_path.write_text(html, encoding="utf-8")


def load_asset(path: Path) -> Image.Image:
    return Image.open(path).convert("RGBA")


def paste_scaled(canvas: Image.Image, sprite: Image.Image, box: tuple[int, int, int, int]) -> None:
    x, y, w, h = box
    resized = sprite.resize((w, h), Image.Resampling.NEAREST)
    canvas.alpha_composite(resized, (x, y))


def draw_checkerboard(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    c1: tuple[int, int, int],
    c2: tuple[int, int, int],
    tile: int = 40,
) -> None:
    left, top, right, bottom = box
    for y in range(top, bottom, tile):
        for x in range(left, right, tile):
            fill = c1 if ((x - left) // tile + (y - top) // tile) % 2 == 0 else c2
            draw.rectangle((x, y, min(x + tile, right), min(y + tile, bottom)), fill=fill)


def draw_brick_wall(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    brick_a: tuple[int, int, int],
    brick_b: tuple[int, int, int],
    mortar: tuple[int, int, int],
    brick_w: int = 64,
    brick_h: int = 28,
) -> None:
    left, top, right, bottom = box
    draw.rectangle(box, fill=mortar)
    row = 0
    for y in range(top, bottom, brick_h):
        offset = 0 if row % 2 == 0 else brick_w // 2
        for x in range(left - offset, right, brick_w):
            color = brick_a if ((x // brick_w) + row) % 2 == 0 else brick_b
            draw.rectangle(
                (
                    x + 2,
                    y + 2,
                    min(x + brick_w - 2, right - 1),
                    min(y + brick_h - 2, bottom - 1),
                ),
                fill=color,
            )
        row += 1


def draw_striped_wall(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    c1: tuple[int, int, int],
    c2: tuple[int, int, int],
    stripe: int = 56,
) -> None:
    left, top, right, bottom = box
    for x in range(left, right, stripe):
        fill = c1 if ((x - left) // stripe) % 2 == 0 else c2
        draw.rectangle((x, top, min(x + stripe, right), bottom), fill=fill)


def draw_panel_wall(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    c1: tuple[int, int, int],
    c2: tuple[int, int, int],
    stripe: int = 72,
) -> None:
    left, top, right, bottom = box
    draw.rectangle(box, fill=c1)
    for x in range(left, right, stripe):
        draw.rectangle((x, top, min(x + 8, right), bottom), fill=c2)


def draw_frame(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    fill: tuple[int, int, int],
    outline: tuple[int, int, int],
    inner: tuple[int, int, int] | None = None,
) -> None:
    draw.rounded_rectangle(box, radius=18, fill=fill, outline=outline, width=4)
    if inner is not None:
        left, top, right, bottom = box
        draw.rounded_rectangle(
            (left + 10, top + 10, right - 10, bottom - 10),
            radius=12,
            outline=inner,
            width=2,
        )


def draw_board(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    frame: tuple[int, int, int],
    panel: tuple[int, int, int],
    accent: tuple[int, int, int],
) -> None:
    left, top, right, bottom = box
    draw.rounded_rectangle(box, radius=10, fill=frame, outline=accent, width=3)
    draw.rectangle((left + 10, top + 10, right - 10, bottom - 10), fill=panel)
    for offset in (34, 66, 98):
        draw.line((left + 24, top + offset, right - 24, top + offset), fill=accent, width=3)


def draw_table(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    top_fill: tuple[int, int, int],
    leg_fill: tuple[int, int, int],
    outline: tuple[int, int, int],
) -> None:
    left, top, right, bottom = box
    top_h = max(16, (bottom - top) // 5)
    draw.rounded_rectangle((left, top, right, top + top_h), radius=12, fill=top_fill, outline=outline, width=3)
    leg_w = max(14, (right - left) // 10)
    draw.rectangle((left + 24, top + top_h, left + 24 + leg_w, bottom), fill=leg_fill)
    draw.rectangle((right - 24 - leg_w, top + top_h, right - 24, bottom), fill=leg_fill)
    draw.rectangle((left + 18, bottom - 8, right - 18, bottom), fill=outline)


def draw_counter(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    fill: tuple[int, int, int],
    outline: tuple[int, int, int],
    accent: tuple[int, int, int],
) -> None:
    left, top, right, bottom = box
    draw.rounded_rectangle(box, radius=16, fill=fill, outline=outline, width=4)
    draw.line((left + 18, top + 42, right - 18, top + 42), fill=accent, width=3)
    draw.line((left + 18, top + 74, right - 18, top + 74), fill=accent, width=3)


def draw_runway(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    fill: tuple[int, int, int],
    accent: tuple[int, int, int],
) -> None:
    left, top, right, bottom = box
    draw.rounded_rectangle(box, radius=18, fill=fill, outline=accent, width=4)
    mid = (left + right) // 2
    dash_h = 28
    for y in range(top + 24, bottom - 18, dash_h + 18):
        draw.rectangle((mid - 10, y, mid + 10, min(y + dash_h, bottom - 18)), fill=accent)


def draw_spotlights(
    draw: ImageDraw.ImageDraw,
    points: list[tuple[int, int]],
    color: tuple[int, int, int, int],
) -> None:
    for x, y in points:
        draw.ellipse((x - 18, y - 18, x + 18, y + 18), fill=color)


def paint_layout(canvas: Image.Image, layout: str) -> None:
    draw = ImageDraw.Draw(canvas, "RGBA")
    w, h = canvas.size
    wall_h = 280

    if layout == "executive":
        draw_panel_wall(draw, (0, 0, w, wall_h), (36, 42, 54), (24, 29, 39), 84)
        draw_checkerboard(draw, (0, wall_h, w, h), (111, 124, 141), (96, 110, 126), 40)
        draw_brick_wall(draw, (0, 0, 262, wall_h), (116, 80, 62), (130, 90, 69), (74, 53, 43))
        draw.rectangle((0, wall_h - 14, w, wall_h), fill=(68, 58, 49))
        draw_board(draw, (342, 108, 770, 318), (72, 72, 80), (56, 58, 66), (142, 116, 86))
        draw_table(draw, (422, 344, 720, 430), (111, 90, 72), (72, 56, 46), (44, 35, 29))
        draw_counter(draw, (836, 348, 1210, 448), (56, 63, 74), (33, 40, 51), (132, 142, 160))
        draw.rectangle((928, 0, 1280, h), fill=(31, 39, 52))
        draw.line((928, 0, 928, h), fill=(94, 107, 126), width=6)
    elif layout == "bullpen-warm":
        draw_brick_wall(draw, (0, 0, 460, wall_h), (153, 104, 77), (168, 115, 86), (108, 76, 59))
        draw_striped_wall(draw, (460, 0, w, wall_h), (235, 228, 210), (222, 214, 196), 56)
        draw_checkerboard(draw, (0, wall_h, w, h), (229, 217, 194), (216, 204, 182), 40)
        draw.rectangle((458, 0, 490, h), fill=(131, 95, 72))
        draw.rectangle((0, wall_h - 12, w, wall_h), fill=(156, 121, 92))
        draw_frame(draw, (40, 348, 304, 662), (224, 210, 190), (165, 136, 101), (201, 188, 167))
        draw_frame(draw, (320, 348, 586, 662), (224, 210, 190), (165, 136, 101), (201, 188, 167))
        draw_frame(draw, (598, 348, 864, 662), (224, 210, 190), (165, 136, 101), (201, 188, 167))
        draw_table(draw, (924, 376, 1180, 454), (145, 112, 83), (96, 72, 56), (64, 48, 36))
    elif layout == "bullpen-cool":
        draw_panel_wall(draw, (0, 0, 640, wall_h), (57, 70, 92), (46, 57, 76), 72)
        draw_striped_wall(draw, (640, 0, w, wall_h), (221, 226, 232), (205, 210, 217), 54)
        draw_checkerboard(draw, (0, wall_h, w, h), (181, 194, 210), (166, 179, 194), 40)
        draw.rectangle((636, 0, 668, h), fill=(81, 94, 114))
        draw_frame(draw, (50, 348, 306, 662), (196, 207, 218), (99, 120, 149), (173, 187, 205))
        draw_frame(draw, (324, 348, 580, 662), (196, 207, 218), (99, 120, 149), (173, 187, 205))
        draw_frame(draw, (598, 348, 854, 662), (196, 207, 218), (99, 120, 149), (173, 187, 205))
        draw_counter(draw, (898, 372, 1172, 460), (85, 101, 120), (50, 65, 82), (126, 154, 187))
        draw.rectangle((944, 0, 1280, h), fill=(29, 40, 56))
    elif layout == "lounge":
        draw_striped_wall(draw, (0, 0, w, wall_h), (242, 232, 206), (230, 220, 193), 60)
        draw_checkerboard(draw, (0, wall_h, w, h), (225, 213, 186), (212, 199, 171), 44)
        draw.rounded_rectangle((58, 338, 280, 620), radius=20, fill=(213, 196, 164), outline=(164, 132, 95), width=4)
        draw.rounded_rectangle((446, 118, 842, 564), radius=20, fill=(212, 196, 165), outline=(168, 136, 93), width=4)
        draw_counter(draw, (904, 356, 1180, 456), (172, 144, 110), (120, 95, 66), (200, 176, 132))
        draw_board(draw, (936, 122, 1180, 302), (177, 148, 114), (224, 214, 196), (143, 112, 80))
        draw.rectangle((0, wall_h - 14, w, wall_h), fill=(160, 129, 93))
    elif layout == "war-room":
        draw_panel_wall(draw, (0, 0, 820, wall_h), (41, 60, 52), (31, 48, 40), 64)
        draw_panel_wall(draw, (820, 0, w, wall_h), (27, 37, 49), (18, 26, 36), 60)
        draw_checkerboard(draw, (0, wall_h, w, h), (126, 145, 131), (113, 132, 119), 40)
        draw.rectangle((0, wall_h - 12, w, wall_h), fill=(84, 108, 93))
        draw_board(draw, (364, 108, 760, 316), (81, 103, 92), (68, 87, 78), (146, 188, 164))
        draw_table(draw, (430, 346, 714, 432), (103, 129, 109), (66, 85, 72), (42, 57, 49))
        draw_counter(draw, (858, 364, 1188, 460), (60, 78, 89), (31, 43, 53), (114, 156, 173))
    elif layout == "analysis-room":
        draw_panel_wall(draw, (0, 0, 648, wall_h), (48, 79, 80), (37, 63, 64), 60)
        draw_striped_wall(draw, (648, 0, w, wall_h), (224, 231, 228), (206, 214, 211), 56)
        draw_checkerboard(draw, (0, wall_h, w, h), (181, 198, 198), (165, 182, 182), 40)
        draw.rectangle((644, 0, 676, h), fill=(78, 109, 109))
        draw_board(draw, (350, 118, 770, 326), (92, 118, 118), (76, 101, 101), (151, 191, 191))
        draw_table(draw, (426, 346, 716, 432), (106, 133, 133), (69, 90, 90), (46, 63, 63))
        draw_counter(draw, (884, 364, 1180, 460), (96, 118, 121), (63, 81, 83), (148, 177, 179))
    elif layout == "committee-room":
        draw_striped_wall(draw, (0, 0, w, wall_h), (240, 232, 215), (226, 219, 202), 64)
        draw_checkerboard(draw, (0, wall_h, w, h), (219, 209, 187), (207, 196, 175), 44)
        draw_board(draw, (306, 104, 878, 304), (199, 184, 158), (229, 220, 204), (149, 121, 83))
        draw_table(draw, (372, 338, 810, 432), (169, 142, 103), (104, 80, 56), (72, 55, 37))
        draw_counter(draw, (922, 360, 1176, 452), (191, 174, 146), (134, 108, 75), (168, 140, 100))
        draw.rectangle((0, wall_h - 12, w, wall_h), fill=(149, 115, 79))
    elif layout == "studio":
        draw_brick_wall(draw, (0, 0, 440, wall_h), (166, 110, 127), (180, 122, 136), (118, 80, 92))
        draw_striped_wall(draw, (440, 0, w, wall_h), (246, 228, 236), (234, 215, 224), 52)
        draw_checkerboard(draw, (0, wall_h, w, h), (235, 222, 214), (222, 208, 200), 42)
        draw.rectangle((438, 0, 470, h), fill=(146, 103, 115))
        draw_board(draw, (328, 114, 832, 310), (229, 210, 214), (247, 237, 240), (182, 132, 147))
        draw_table(draw, (404, 344, 706, 430), (173, 129, 143), (110, 78, 90), (80, 55, 65))
        draw_counter(draw, (928, 364, 1188, 454), (227, 207, 213), (182, 132, 147), (216, 180, 190))
        draw_spotlights(draw, [(980, 92), (1060, 74), (1140, 92)], (255, 235, 188, 70))
    elif layout == "engineering-shell":
        draw_panel_wall(draw, (0, 0, 896, wall_h), (42, 55, 73), (28, 39, 52), 70)
        draw_panel_wall(draw, (896, 0, w, wall_h), (21, 29, 40), (15, 22, 30), 56)
        draw_checkerboard(draw, (0, wall_h, w, h), (142, 157, 174), (126, 141, 157), 40)
        draw.rectangle((892, 0, 926, h), fill=(78, 93, 112))
        draw_board(draw, (324, 114, 734, 320), (82, 97, 118), (68, 82, 101), (145, 174, 208))
        draw_table(draw, (412, 344, 728, 432), (96, 112, 136), (60, 72, 89), (39, 50, 64))
        draw_counter(draw, (944, 364, 1182, 456), (72, 86, 103), (34, 46, 60), (114, 141, 181))
    elif layout == "engineering-build":
        draw_panel_wall(draw, (0, 0, 804, wall_h), (38, 51, 69), (27, 38, 51), 68)
        draw_panel_wall(draw, (804, 0, w, wall_h), (18, 27, 37), (13, 20, 28), 54)
        draw_checkerboard(draw, (0, wall_h, w, h), (136, 151, 171), (119, 134, 154), 40)
        draw.rectangle((800, 0, 838, h), fill=(72, 88, 108))
        draw_board(draw, (336, 118, 774, 322), (75, 88, 106), (58, 68, 82), (113, 159, 203))
        draw_table(draw, (428, 342, 756, 428), (88, 108, 132), (57, 72, 88), (36, 48, 63))
        draw_counter(draw, (910, 362, 1184, 456), (70, 82, 101), (35, 46, 61), (104, 140, 184))
    elif layout == "qa-gate":
        draw_panel_wall(draw, (0, 0, 842, wall_h), (70, 40, 46), (56, 29, 34), 68)
        draw_panel_wall(draw, (842, 0, w, wall_h), (27, 27, 36), (19, 19, 25), 56)
        draw_checkerboard(draw, (0, wall_h, w, h), (180, 169, 173), (165, 153, 157), 40)
        draw.rectangle((838, 0, 874, h), fill=(104, 58, 65))
        draw.rectangle((0, 256, w, 280), fill=(124, 72, 79))
        draw_board(draw, (344, 118, 776, 324), (104, 70, 77), (82, 54, 60), (196, 106, 121))
        draw_table(draw, (432, 344, 738, 430), (136, 84, 93), (87, 53, 60), (64, 38, 43))
        draw_counter(draw, (908, 366, 1184, 458), (88, 68, 74), (59, 40, 44), (198, 107, 121))
    elif layout == "release-studio":
        draw_striped_wall(draw, (0, 0, w, wall_h), (228, 243, 235), (211, 229, 219), 56)
        draw_checkerboard(draw, (0, wall_h, w, h), (224, 237, 227), (209, 223, 213), 42)
        draw_board(draw, (328, 112, 808, 318), (238, 243, 238), (224, 234, 228), (141, 178, 151))
        draw_table(draw, (414, 344, 728, 430), (161, 180, 168), (103, 123, 112), (72, 93, 80))
        draw_counter(draw, (914, 364, 1184, 454), (196, 217, 202), (142, 178, 151), (171, 199, 178))
        draw.rectangle((0, wall_h - 12, w, wall_h), fill=(135, 166, 144))
    elif layout == "metadata-lab":
        draw_panel_wall(draw, (0, 0, 668, wall_h), (191, 222, 216), (175, 205, 199), 60)
        draw_panel_wall(draw, (668, 0, w, wall_h), (73, 96, 99), (59, 81, 83), 56)
        draw_checkerboard(draw, (0, wall_h, w, h), (206, 227, 224), (192, 214, 211), 40)
        draw.rectangle((664, 0, 698, h), fill=(113, 143, 145))
        draw_board(draw, (322, 116, 754, 324), (186, 207, 206), (167, 189, 188), (118, 162, 159))
        draw_table(draw, (420, 344, 734, 430), (151, 172, 170), (97, 119, 117), (69, 89, 88))
        draw_counter(draw, (916, 366, 1184, 454), (120, 146, 147), (73, 96, 99), (171, 204, 202))
    elif layout == "launch-room":
        draw_striped_wall(draw, (0, 0, 886, wall_h), (244, 229, 187), (232, 218, 175), 60)
        draw_panel_wall(draw, (886, 0, w, wall_h), (74, 75, 102), (58, 58, 80), 64)
        draw_checkerboard(draw, (0, wall_h, w, h), (226, 214, 181), (214, 201, 167), 42)
        draw.rectangle((882, 0, 916, h), fill=(155, 126, 69))
        draw_board(draw, (320, 112, 766, 320), (230, 205, 151), (215, 189, 131), (186, 148, 62))
        draw_runway(draw, (462, 342, 626, 670), (200, 170, 100), (239, 198, 84))
        draw_counter(draw, (924, 366, 1186, 454), (119, 111, 148), (74, 75, 102), (214, 196, 126))
    else:
        draw.rectangle((0, 0, w, h), fill=(220, 220, 220))


def build_assets(front: Path) -> dict[str, Image.Image]:
    return {
        "desk": load_asset(front / "desk-v3.webp"),
        "sofa": load_asset(front / "sofa-idle-v3.png"),
        "server": load_asset(front / "serverroom-spritesheet.webp").crop((0, 0, 180, 251)),
        "plant_a": load_asset(front / "plants-spritesheet.webp").crop((0, 0, 160, 160)),
        "plant_b": load_asset(front / "plants-spritesheet.webp").crop((160, 0, 320, 160)),
        "poster_a": load_asset(front / "posters-spritesheet.webp").crop((0, 0, 160, 160)),
        "poster_b": load_asset(front / "posters-spritesheet.webp").crop((160, 0, 320, 160)),
        "flower": load_asset(front / "flowers-bloom-v2.webp").crop((0, 0, 128, 128)),
        "cat": load_asset(front / "cats-spritesheet.webp").crop((0, 0, 160, 160)),
        "coffee": load_asset(front / "coffee-machine-v3-grid.webp").crop((0, 0, 160, 200)),
        "bug": load_asset(front / "error-bug-spritesheet-grid.webp").crop((0, 0, 160, 160)),
    }


def tint_image(image: Image.Image, rgba: tuple[int, int, int, int]) -> Image.Image:
    overlay = Image.new("RGBA", image.size, rgba)
    return Image.alpha_composite(image, overlay)


def build_background(instance_dir: Path, theme_key: str, preview_path: Path) -> None:
    front = instance_dir / "frontend"
    theme = THEMES[theme_key]
    assets = build_assets(front)

    composed = Image.new("RGBA", CANVAS_SIZE, (0, 0, 0, 0))
    paint_layout(composed, theme["layout"])
    composed = tint_image(composed, theme["overlay"])

    for sprite_name, box in theme["sprites"]:
        paste_scaled(composed, assets[sprite_name], box)

    out_small = front / "office_bg_small.webp"
    out_big = front / "office_bg.webp"
    composed.convert("RGB").save(out_small, "WEBP", lossless=True, quality=100)
    composed.resize((1920, 1080), Image.Resampling.NEAREST).convert("RGB").save(
        out_big,
        "WEBP",
        lossless=True,
        quality=100,
    )

    preview_path.parent.mkdir(parents=True, exist_ok=True)
    composed.convert("RGB").save(preview_path, "WEBP", lossless=True, quality=100)


def build_agents_state(config: OfficeConfig) -> list[dict]:
    now = datetime.now()
    agents = [
        {
            "agentId": "star",
            "name": "Star",
            "isMain": True,
            "state": config.main_state,
            "detail": config.main_detail,
            "updated_at": now.isoformat(),
            "area": state_to_area(config.main_state),
            "source": "local",
            "joinKey": None,
            "authStatus": "approved",
            "authExpiresAt": None,
            "lastPushAt": None,
        }
    ]

    for idx, (name, state, detail, avatar) in enumerate(config.guests, start=1):
        stamp = (now + timedelta(seconds=idx)).isoformat()
        agents.append(
            {
                "agentId": f"{config.office_id}-{idx}",
                "name": name,
                "isMain": False,
                "state": state,
                "detail": detail,
                "updated_at": stamp,
                "area": state_to_area(state),
                "source": "remote-openclaw",
                "joinKey": f"ocj_{config.office_id}",
                "authStatus": "approved",
                "authApprovedAt": stamp,
                "authExpiresAt": (now + timedelta(days=7)).isoformat(),
                "lastPushAt": stamp,
                "avatar": avatar,
            }
        )

    return agents


def write_state_files(instance_dir: Path, config: OfficeConfig) -> None:
    now = datetime.now().isoformat()
    (instance_dir / "state.json").write_text(
        json.dumps(
            {
                "state": config.main_state,
                "detail": config.main_detail,
                "progress": 72 if config.main_state != "idle" else 0,
                "updated_at": now,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    (instance_dir / "agents-state.json").write_text(
        json.dumps(build_agents_state(config), ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (instance_dir / "join-keys.json").write_text(
        json.dumps({"keys": []}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def main() -> None:
    INSTANCES_ROOT.mkdir(parents=True, exist_ok=True)
    PREVIEW_ROOT.mkdir(parents=True, exist_ok=True)

    for config in CONFIGS:
        instance_dir = INSTANCES_ROOT / config.office_id
        copy_base(instance_dir)
        ensure_identity(instance_dir, config.name)
        patch_index_html(instance_dir)
        build_background(
            instance_dir,
            config.background,
            PREVIEW_ROOT / f"{config.office_id}.webp",
        )
        write_state_files(instance_dir, config)
        print(f"prepared {config.office_id} -> {instance_dir}")


if __name__ == "__main__":
    main()
