"""Recorta el fondo #F4F4F4 conectado al borde y deja alfa, para poder
componer el icono sobre el papel del sitio (#f2f6f5) sin que se vea el
rectángulo gris. Los assets originales quedan intactos.

    python3 art/cutout.py ENTRADA.png SALIDA.png [--no-crop]

Por defecto recorta al bounding box del sujeto. Con --no-crop conserva el
lienzo completo, que es lo que necesita una serie: si cada icono se recortara
a su propio contorno se perdería la escala relativa entre ellos."""

import sys
from collections import deque

import numpy as np
from PIL import Image

args = [a for a in sys.argv[1:] if not a.startswith("--")]
crop = "--no-crop" not in sys.argv
src, dst = args[0], args[1]
im = Image.open(src).convert("RGB")
a = np.asarray(im).astype(np.int16)
h, w, _ = a.shape

bg = np.array([244, 244, 244], dtype=np.int16)
near = (np.abs(a - bg).max(axis=2) <= 6)

# Flood fill desde el borde: solo el fondo conectado al marco se vuelve
# transparente. Cualquier region clara encerrada (la pantalla) se conserva.
mask = np.zeros((h, w), dtype=bool)
q = deque()
for x in range(w):
    for y in (0, h - 1):
        if near[y, x] and not mask[y, x]:
            mask[y, x] = True
            q.append((y, x))
for y in range(h):
    for x in (0, w - 1):
        if near[y, x] and not mask[y, x]:
            mask[y, x] = True
            q.append((y, x))

while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and near[ny, nx] and not mask[ny, nx]:
            mask[ny, nx] = True
            q.append((ny, nx))

alpha = np.where(mask, 0, 255).astype(np.uint8)
out = np.dstack([np.asarray(im).astype(np.uint8), alpha])
img = Image.fromarray(out, "RGBA")

if crop:
    img = img.crop(img.getbbox())
img.save(dst)
print(dst, img.size)
