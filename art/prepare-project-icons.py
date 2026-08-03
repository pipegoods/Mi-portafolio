"""Prepara los iconos de proyecto para el sitio.

Toma cada render aceptado de art/projects/, normaliza el fondo a #F4F4F4
exacto, lo recorta a alfa y escribe un WebP listo para servir en
public/projects/.

Tres decisiones que no son obvias:

- El recorte a alfa hace falta porque el skill entrega los iconos sobre
  #F4F4F4 y el papel del sitio es #f2f6f5. Sin alfa se vería un rectángulo
  gris dentro de la tarjeta.
- El encuadre es COMPARTIDO: se calcula un solo cuadro que envuelve a los seis
  sujetos y se aplica igual a todos. Si cada icono se recortara a su propio
  contorno, un objeto pequeño y uno grande acabarían del mismo tamaño en la
  tarjeta y se perdería la escala de serie que el skill obliga a bloquear.
- El WebP se genera aquí y no con astro:assets porque eso obligaría a instalar
  sharp. El repositorio ya evita dependencias pesadas para esto: el CV se
  renderiza con el Chrome del sistema en vez de Puppeteer. Como los iconos son
  color plano, el WebP que sale de Pillow pesa menos que lo que ahorraría el
  pipeline de Astro.

    python3 art/prepare-project-icons.py

Necesita Pillow y numpy.
"""

import pathlib
import subprocess
import sys

from PIL import Image

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent
SRC = HERE / "projects"
DEST = ROOT / "public/projects"
NORMALIZER = ROOT / ".claude/skills/voxel-icon/scripts/normalize-gray-background.py"

# En la tarjeta se ven a 88 px, así que 264 cubre pantallas 3x.
SIDE = 264
# Aire alrededor del cuadro compartido, en píxeles del lienzo original.
PADDING = 40


def run(*cmd: str) -> None:
    subprocess.run([sys.executable, *cmd], check=True, capture_output=True)


sources = sorted(SRC.glob("*.png"))
if not sources:
    sys.exit(f"no hay renders en {SRC}")

# El normalizador viene con el skill voxel-icon, que no está versionado: lo que
# se versiona es skills-lock.json, igual que un lockfile de dependencias.
if not NORMALIZER.exists():
    sys.exit(
        "falta el skill voxel-icon, que trae el normalizador de fondo.\n"
        "Está registrado en skills-lock.json; reinstálalo con:\n"
        "    npx skills add BIAsia/voxel-icon"
    )

DEST.mkdir(parents=True, exist_ok=True)

# Primera pasada: normalizar y recortar a alfa conservando el lienzo completo.
cut: dict[pathlib.Path, Image.Image] = {}
for src in sources:
    tmp = SRC / f".tmp-{src.name}"
    run(str(NORMALIZER), str(src), str(tmp))
    run(str(HERE / "cutout.py"), str(tmp), str(tmp), "--no-crop")
    cut[src] = Image.open(tmp).copy()
    tmp.unlink()

# Cuadro compartido: la unión de todos los sujetos, llevada a cuadrado.
boxes = [im.getbbox() for im in cut.values()]
left = min(b[0] for b in boxes) - PADDING
top = min(b[1] for b in boxes) - PADDING
right = max(b[2] for b in boxes) + PADDING
bottom = max(b[3] for b in boxes) + PADDING

side = max(right - left, bottom - top)
cx, cy = (left + right) // 2, (top + bottom) // 2
box = (cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2)
print(f"encuadre compartido: {box} ({side}px)")

for src, im in cut.items():
    out = DEST / f"{src.stem}.webp"
    im.crop(box).resize((SIDE, SIDE), Image.LANCZOS).save(
        out, format="webp", quality=90, method=6
    )
    print(f"{src.name} -> {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)")
