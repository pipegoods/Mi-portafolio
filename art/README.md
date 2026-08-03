# Ilustración

Los iconos voxel del sitio y la tarjeta de Open Graph. Nada de esto se genera
en el build: son assets versionados que solo se rehacen cuando cambia el texto
o la ilustración.

## Cómo se hicieron

Con el skill `voxel-icon` (en `.claude/skills/`), renderizando con
`openai/gpt-image-2` a través del CLI de inference.sh.

La serie está bloqueada, que es lo que el skill exige para que varios iconos se
vean del mismo juego:

- **Módulo base** de 55–70 px sobre un lienzo de 1024×1024, y la misma cámara
  isométrica ortográfica en todos.
- **Paleta dirigida** con el preset `teal-void` **fijo para toda la serie**:
  `#5ED9C3`, `#118F84`, `#F8FFFB`, `#063A3B` y `#FFD29D` como único acento
  cálido. El skill pide elegir preset por sujeto, pero aquí se fija a propósito:
  el sitio tiene un solo color de acento y seis presets distintos lo romperían.
  `teal-void` coincide casi exactamente con el tiffany, el signal y el ink del
  sitio.

Lo que hay que evitar al regenerar uno: dictar la geometría bloque por bloque.
En la primera pasada eso hizo que la zapatilla saliera como una escalera y las
monedas como una pirámide. Funciona mucho mejor nombrar el objeto real y
describir sus partes en lenguaje normal, dejando que las restricciones de
estilo hagan la voxelización.

## Piezas

- `icon-kiosk.png` — el tótem de la tarjeta de Open Graph, y la referencia de
  calibración de escala y cámara para el resto de la serie.
- `icon-kiosk-cut.png` — el mismo, recortado a alfa para componer la tarjeta.
- `projects/*.png` — los renders aceptados de los iconos de proyecto, tal como
  salen del skill: 1024×1024, RGB opaco, fondo exacto `#F4F4F4`.
- `src/assets/projects/*.png` — lo que de verdad se sirve, ya recortado a alfa
  y reducido. Lo genera `prepare-project-icons.py`.

## Rehacer los iconos de proyecto

```sh
python3 art/prepare-project-icons.py
```

Normaliza el fondo, recorta a alfa y aplica **un encuadre compartido** a los
seis, para no perder la escala relativa entre ellos. Deja el resultado en
`src/assets/projects/`, donde `astro:assets` lo optimiza en el build.

Para añadir un proyecto: dejar el render en `art/projects/<nombre>.png`, correr
el script y registrar el icono en `src/assets/projects/index.ts`.

## Rehacer la tarjeta de Open Graph

```sh
python3 art/build-og-html.py     # escribe art/og.html
```

Luego abrir `art/og.html` en el navegador con la ventana en 1200×630 y guardar
la captura como `public/og-image.png`. Las fuentes se leen de `node_modules`,
así que hace falta un `pnpm install` previo.

El recorte a alfa del tótem solo se rehace si cambia la ilustración:

```sh
python3 art/cutout.py art/icon-kiosk.png art/icon-kiosk-cut.png
```

Todos los scripts necesitan Pillow y numpy.
