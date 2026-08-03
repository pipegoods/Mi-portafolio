"""Genera un HTML autocontenido de 1200x630 para la tarjeta de Open Graph.
Las fuentes y el icono van embebidos en base64 para poder abrirlo con file://
sin que Chrome bloquee las cargas."""

import base64
import pathlib

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent
PNPM = ROOT / "node_modules/.pnpm"


def font_dir(package: str) -> pathlib.Path:
    """Resuelve la carpeta de archivos de un paquete de fontsource sin fijar la
    versión: pnpm la incluye en el nombre del directorio y cambia al actualizar."""
    matches = sorted(PNPM.glob(f"{package}@*/node_modules/{package.replace('+', '/')}/files"))
    if not matches:
        raise SystemExit(f"no encuentro las fuentes de {package}; corre pnpm install")
    return matches[-1]


ARCHIVO = font_dir("@fontsource-variable+archivo")
MONO = font_dir("@fontsource-variable+jetbrains-mono")


def b64(path: pathlib.Path) -> str:
    return base64.b64encode(path.read_bytes()).decode()


fonts = {
    "archivo_latin": b64(ARCHIVO / "archivo-latin-wdth-normal.woff2"),
    "archivo_ext": b64(ARCHIVO / "archivo-latin-ext-wdth-normal.woff2"),
    "mono_latin": b64(MONO / "jetbrains-mono-latin-wght-normal.woff2"),
}
icon = b64(HERE / "icon-kiosk-cut.png")

html = f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<style>
  @font-face {{
    font-family: "Archivo Variable";
    font-style: normal;
    font-weight: 100 900;
    font-stretch: 62% 125%;
    src: url(data:font/woff2;base64,{fonts["archivo_latin"]}) format("woff2");
    unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
  }}
  @font-face {{
    font-family: "Archivo Variable";
    font-style: normal;
    font-weight: 100 900;
    font-stretch: 62% 125%;
    src: url(data:font/woff2;base64,{fonts["archivo_ext"]}) format("woff2");
    unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF;
  }}
  @font-face {{
    font-family: "JetBrains Mono Variable";
    font-style: normal;
    font-weight: 100 800;
    src: url(data:font/woff2;base64,{fonts["mono_latin"]}) format("woff2");
  }}

  * {{ margin: 0; padding: 0; box-sizing: border-box; }}

  body {{
    width: 1200px;
    height: 630px;
    background: #f2f6f5;
    color: #10201f;
    font-family: "Instrument Sans Variable", system-ui, sans-serif;
    overflow: hidden;
  }}

  .card {{
    position: relative;
    width: 1200px;
    height: 630px;
    display: grid;
    grid-template-columns: 1fr 420px;
    align-items: center;
    padding: 0 80px;
    gap: 40px;
  }}

  /* La traza: el mismo raíl de 1px del sitio, aquí ya recorrido. */
  .trace {{
    position: absolute;
    left: 80px;
    top: 96px;
    bottom: 96px;
    width: 2px;
    background: #81d8d0;
  }}

  .copy {{ padding-left: 44px; }}

  .eyebrow {{
    font-family: "JetBrains Mono Variable", monospace;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #5a6b69;
  }}

  h1 {{
    margin-top: 26px;
    font-family: "Archivo Variable", sans-serif;
    font-stretch: 125%;
    font-weight: 700;
    font-size: 96px;
    line-height: 0.92;
    letter-spacing: -0.025em;
    text-transform: uppercase;
  }}

  .rule {{
    margin-top: 34px;
    width: 340px;
    height: 1px;
    background: #d5e0de;
  }}

  .meta {{
    margin-top: 26px;
    font-family: "JetBrains Mono Variable", monospace;
    font-size: 19px;
    font-weight: 400;
    color: #5a6b69;
  }}

  .meta .site {{ color: #0abab5; }}

  .art {{
    display: flex;
    align-items: center;
    justify-content: center;
  }}

  .art img {{
    height: 440px;
    width: auto;
    display: block;
  }}
</style>
</head>
<body>
  <div class="card">
    <div class="trace"></div>
    <div class="copy">
      <p class="eyebrow">Full Stack Developer</p>
      <h1>Andrés<br>Vizcaíno</h1>
      <div class="rule"></div>
      <p class="meta">Cali, Colombia &nbsp;·&nbsp; <span class="site">andresvizcaino.com</span></p>
    </div>
    <div class="art">
      <img src="data:image/png;base64,{icon}" alt="">
    </div>
  </div>
</body>
</html>
"""

out = HERE / "og.html"
out.write_text(html)
print(out, f"{len(html) / 1024:.0f} KB")
