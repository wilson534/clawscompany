from __future__ import annotations

import json
import shutil
from datetime import datetime, timedelta
from pathlib import Path

from PIL import Image

ROOT = Path(r"C:\Users\g3098\Desktop\CLAWSCOMPANY")
BASE = ROOT / "_refs" / "Star-Office-UI"
INSTANCES_ROOT = ROOT / "_refs" / "star-office-live"
PREVIEW_ROOT = ROOT / "frontend" / "public" / "star-office" / "previews"


CONFIGS = [
    {
        "office_id": "growth",
        "port": 19101,
        "name": "增长部 / Launch Room",
        "main_state": "executing",
        "main_detail": "首发传播、内容包装与增长实验同步推进",
        "background": "growth-launch",
        "guests": [
            ("Growth", "syncing", "准备首周传播排期", "guest_role_1"),
        ],
    },
    {
        "office_id": "release",
        "port": 19102,
        "name": "发行部 / Screenshot Studio",
        "main_state": "syncing",
        "main_detail": "截图脚本、商店文案与提审材料同步整理",
        "background": "release-shot",
        "guests": [
            ("Publisher", "writing", "打磨截图和卖点文案", "guest_role_4"),
        ],
    },
    {
        "office_id": "release-meta",
        "port": 19114,
        "name": "发行部 / Metadata Desk",
        "main_state": "writing",
        "main_detail": "关键词、副标题与审核备注整理中",
        "background": "release-meta",
        "guests": [
            ("Metadata", "writing", "整理关键词与审核备注", "guest_role_3"),
        ],
    },
    {
        "office_id": "qa",
        "port": 19103,
        "name": "QA 部 / Gate Room",
        "main_state": "error",
        "main_detail": "回归检查与风险拦截正在进行",
        "background": "qa-gate",
        "guests": [
            ("Inspector", "error", "拦截主链路缺口", "guest_role_6"),
        ],
    },
    {
        "office_id": "engineering",
        "port": 19104,
        "name": "工程部 / Shell Bay",
        "main_state": "executing",
        "main_detail": "总部骨架、楼层路由与办公室容器联调中",
        "background": "engineering-shell",
        "guests": [
            ("Bald", "writing", "稳定页面骨架与状态层", "guest_role_2"),
        ],
    },
    {
        "office_id": "engineering-build",
        "port": 19113,
        "name": "工程部 / Build Bay",
        "main_state": "executing",
        "main_detail": "工时、工资与周报主流程正在并联",
        "background": "engineering-build",
        "guests": [
            ("Builder", "executing", "推进主流程联调", "guest_role_5"),
            ("Shi", "syncing", "接入 A2A 状态引擎", "guest_role_3"),
        ],
    },
    {
        "office_id": "design",
        "port": 19105,
        "name": "设计部 / Atelier",
        "main_state": "writing",
        "main_detail": "像素舞台、路演界面与 iOS 审美统一中",
        "background": "design-studio",
        "guests": [
            ("Director", "writing", "统一视觉系统", "guest_role_1"),
            ("Randy", "executing", "推进 iOS 体验落地", "guest_role_4"),
        ],
    },
    {
        "office_id": "investment",
        "port": 19106,
        "name": "产品投资部 / Committee Room",
        "main_state": "syncing",
        "main_detail": "机会评分、ROI 与立项优先级正在汇总",
        "background": "investment-committee",
        "guests": [
            ("PM", "writing", "更新机会评分与委员会结论", "guest_role_6"),
        ],
    },
    {
        "office_id": "intel",
        "port": 19107,
        "name": "情报部 / Signal Scan",
        "main_state": "researching",
        "main_detail": "GitHub、X、小红书与论文信号正在抓取",
        "background": "intel-scan",
        "guests": [
            ("Scout", "researching", "扫描平台高热信号", "guest_role_2"),
        ],
    },
    {
        "office_id": "intel-synth",
        "port": 19112,
        "name": "情报部 / Synth Room",
        "main_state": "writing",
        "main_detail": "趋势簇和立项摘要正在归纳",
        "background": "intel-synth",
        "guests": [
            ("Synth", "writing", "压缩趋势簇与机会摘要", "guest_role_4"),
            ("Zhang", "syncing", "同步 team fit 评分", "guest_role_2"),
        ],
    },
    {
        "office_id": "partner",
        "port": 19108,
        "name": "外交部 / Outreach Room",
        "main_state": "idle",
        "main_detail": "渠道候选、媒体名单与合作推进并行整理",
        "background": "partner-outreach",
        "guests": [
            ("Partner", "writing", "筛选高价值渠道", "guest_role_5"),
            ("BD", "syncing", "推进下一步合作动作", "guest_role_6"),
        ],
    },
    {
        "office_id": "team",
        "port": 19109,
        "name": "Team Office / Narrative Room",
        "main_state": "writing",
        "main_detail": "团队能力注入与路演主叙事正在成形",
        "background": "team-story",
        "guests": [
            ("Peng", "writing", "打磨一人公司主叙事", "guest_role_4"),
            ("Zhang", "researching", "校准机会评分策略", "guest_role_2"),
        ],
    },
    {
        "office_id": "team-builder",
        "port": 19111,
        "name": "Team Office / Builder Room",
        "main_state": "executing",
        "main_detail": "iOS 落地与平台工程正在双线推进",
        "background": "team-build",
        "guests": [
            ("Randy", "executing", "推进 iOS 页面落地", "guest_role_1"),
            ("Shi", "syncing", "接入协作和状态层", "guest_role_3"),
        ],
    },
    {
        "office_id": "founder",
        "port": 19110,
        "name": "Founder Office / Command Deck",
        "main_state": "idle",
        "main_detail": "全局拍板、优先级调整与关键风险汇总",
        "background": "founder-command",
        "guests": [
            ("EM", "writing", "评估 Demo 主链与优先级", "guest_role_4"),
        ],
    },
]


THEMES = {
    "founder-command": {
        "overlay": (248, 172, 96, 32),
        "sprites": [
            ("desk", (78, 432, 290, 214)),
            ("sofa", (752, 382, 188, 188)),
            ("server", (950, 84, 210, 286)),
            ("plant_a", (624, 208, 96, 96)),
            ("poster_a", (612, 32, 104, 104)),
        ],
    },
    "team-story": {
        "overlay": (122, 162, 255, 26),
        "sprites": [
            ("desk", (52, 434, 252, 196)),
            ("desk", (336, 438, 240, 190)),
            ("flower", (294, 486, 92, 92)),
            ("poster_b", (184, 34, 102, 102)),
            ("cat", (40, 560, 116, 116)),
            ("plant_b", (1032, 402, 98, 98)),
        ],
    },
    "team-build": {
        "overlay": (88, 166, 255, 24),
        "sprites": [
            ("desk", (76, 434, 248, 194)),
            ("desk", (344, 438, 244, 188)),
            ("server", (958, 82, 210, 292)),
            ("poster_a", (350, 36, 96, 96)),
            ("plant_a", (846, 394, 94, 94)),
        ],
    },
    "partner-outreach": {
        "overlay": (208, 165, 110, 24),
        "sprites": [
            ("desk", (70, 438, 240, 194)),
            ("sofa", (684, 382, 184, 184)),
            ("server", (968, 82, 204, 286)),
            ("plant_a", (232, 214, 98, 98)),
            ("poster_b", (206, 34, 102, 102)),
        ],
    },
    "intel-scan": {
        "overlay": (84, 179, 128, 34),
        "sprites": [
            ("desk", (66, 438, 252, 194)),
            ("server", (958, 80, 212, 292)),
            ("plant_b", (620, 214, 108, 108)),
            ("poster_a", (168, 34, 106, 106)),
            ("cat", (62, 560, 108, 108)),
        ],
    },
    "intel-synth": {
        "overlay": (57, 200, 176, 28),
        "sprites": [
            ("desk", (88, 438, 250, 194)),
            ("desk", (372, 438, 214, 184)),
            ("server", (962, 82, 208, 290)),
            ("plant_a", (566, 206, 92, 92)),
            ("poster_b", (334, 34, 96, 96)),
            ("plant_b", (842, 402, 96, 96)),
        ],
    },
    "investment-committee": {
        "overlay": (240, 190, 111, 24),
        "sprites": [
            ("desk", (78, 438, 266, 198)),
            ("sofa", (680, 382, 188, 188)),
            ("server", (968, 82, 204, 284)),
            ("plant_a", (592, 208, 94, 94)),
        ],
    },
    "design-studio": {
        "overlay": (255, 139, 177, 28),
        "sprites": [
            ("desk", (72, 436, 252, 196)),
            ("desk", (340, 438, 232, 186)),
            ("flower", (282, 482, 88, 88)),
            ("flower", (522, 484, 88, 88)),
            ("plant_b", (1008, 394, 104, 104)),
            ("poster_b", (164, 32, 102, 102)),
            ("cat", (58, 558, 112, 112)),
        ],
    },
    "engineering-shell": {
        "overlay": (114, 176, 255, 24),
        "sprites": [
            ("desk", (76, 438, 248, 194)),
            ("server", (954, 80, 216, 296)),
            ("sofa", (694, 382, 182, 182)),
            ("plant_a", (620, 206, 94, 94)),
        ],
    },
    "engineering-build": {
        "overlay": (92, 197, 255, 28),
        "sprites": [
            ("desk", (66, 438, 250, 194)),
            ("desk", (350, 438, 238, 188)),
            ("server", (954, 80, 216, 296)),
            ("poster_a", (352, 34, 100, 100)),
        ],
    },
    "qa-gate": {
        "overlay": (255, 117, 117, 36),
        "sprites": [
            ("desk", (88, 438, 254, 196)),
            ("server", (954, 80, 216, 296)),
            ("poster_a", (324, 34, 100, 100)),
            ("plant_a", (686, 210, 94, 94)),
        ],
    },
    "release-shot": {
        "overlay": (109, 214, 146, 24),
        "sprites": [
            ("desk", (72, 438, 250, 194)),
            ("sofa", (690, 382, 184, 184)),
            ("flower", (528, 482, 88, 88)),
            ("poster_b", (928, 34, 102, 102)),
        ],
    },
    "release-meta": {
        "overlay": (127, 224, 195, 24),
        "sprites": [
            ("desk", (82, 438, 250, 194)),
            ("desk", (360, 438, 220, 182)),
            ("server", (958, 80, 212, 296)),
            ("plant_b", (622, 206, 102, 102)),
            ("poster_a", (330, 34, 100, 100)),
        ],
    },
    "growth-launch": {
        "overlay": (246, 189, 78, 24),
        "sprites": [
            ("desk", (70, 438, 250, 194)),
            ("desk", (344, 440, 220, 182)),
            ("flower", (316, 482, 88, 88)),
            ("plant_b", (992, 396, 98, 98)),
            ("poster_a", (912, 34, 100, 100)),
            ("cat", (54, 558, 108, 108)),
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


def tint_image(image: Image.Image, rgba: tuple[int, int, int, int]) -> Image.Image:
    overlay = Image.new("RGBA", image.size, rgba)
    return Image.alpha_composite(image, overlay)


def build_background(instance_dir: Path, theme_key: str, preview_path: Path) -> None:
    front = instance_dir / "frontend"
    bg = load_asset(BASE / "assets" / "room-reference.png")
    desk = load_asset(front / "desk-v3.webp")
    sofa = load_asset(front / "sofa-idle-v3.png")
    server_sheet = load_asset(front / "serverroom-spritesheet.webp")
    plants = load_asset(front / "plants-spritesheet.webp")
    posters = load_asset(front / "posters-spritesheet.webp")
    flowers = load_asset(front / "flowers-bloom-v2.webp")
    cats = load_asset(front / "cats-spritesheet.webp")

    sprites = {
        "desk": desk,
        "sofa": sofa,
        "server": server_sheet.crop((0, 0, 180, 251)),
        "plant_a": plants.crop((0, 0, 160, 160)),
        "plant_b": plants.crop((160, 0, 320, 160)),
        "poster_a": posters.crop((0, 0, 160, 160)),
        "poster_b": posters.crop((160, 0, 320, 160)),
        "flower": flowers.crop((0, 0, 128, 128)),
        "cat": cats.crop((0, 0, 160, 160)),
    }

    theme = THEMES[theme_key]
    composed = tint_image(bg, theme["overlay"])

    for sprite_name, box in theme["sprites"]:
        paste_scaled(composed, sprites[sprite_name], box)

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


def build_agents_state(config: dict) -> list[dict]:
    now = datetime.now()
    agents = [
        {
            "agentId": "star",
            "name": "Star",
            "isMain": True,
            "state": config["main_state"],
            "detail": config["main_detail"],
            "updated_at": now.isoformat(),
            "area": state_to_area(config["main_state"]),
            "source": "local",
            "joinKey": None,
            "authStatus": "approved",
            "authExpiresAt": None,
            "lastPushAt": None,
        }
    ]

    for idx, (name, state, detail, avatar) in enumerate(config["guests"], start=1):
        stamp = (now + timedelta(seconds=idx)).isoformat()
        agents.append(
            {
                "agentId": f"{config['office_id']}-{idx}",
                "name": name,
                "isMain": False,
                "state": state,
                "detail": detail,
                "updated_at": stamp,
                "area": state_to_area(state),
                "source": "remote-openclaw",
                "joinKey": f"ocj_{config['office_id']}",
                "authStatus": "approved",
                "authApprovedAt": stamp,
                "authExpiresAt": (now + timedelta(days=7)).isoformat(),
                "lastPushAt": stamp,
                "avatar": avatar,
            }
        )

    return agents


def write_state_files(instance_dir: Path, config: dict) -> None:
    now = datetime.now().isoformat()
    (instance_dir / "state.json").write_text(
        json.dumps(
            {
                "state": config["main_state"],
                "detail": config["main_detail"],
                "progress": 72 if config["main_state"] != "idle" else 0,
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
        instance_dir = INSTANCES_ROOT / config["office_id"]
        copy_base(instance_dir)
        ensure_identity(instance_dir, config["name"])
        patch_index_html(instance_dir)
        build_background(
            instance_dir,
            config["background"],
            PREVIEW_ROOT / f"{config['office_id']}.webp",
        )
        write_state_files(instance_dir, config)
        print(f"prepared {config['office_id']} -> {instance_dir}")


if __name__ == "__main__":
    main()
