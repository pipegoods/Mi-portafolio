// Genera public/cv-andres-vizcaino.pdf desde src/data/es.ts.
//
// La fuente de la verdad es src/data, la misma que alimenta el sitio; cv/cv.md
// es una salida intermedia que se escribe solo para poder leerla.
// El render usa Chrome en modo headless, así que no hace falta LaTeX ni pandoc.
//
// Estilo: Jake's Resume — una sola columna, secciones con línea, sin tablas ni
// cajas de texto, que es lo que los parsers de ATS leen sin equivocarse.

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { marked } from "marked";

import { getData } from "../src/data/index.ts";
import { toMarkdown } from "./to-markdown.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// El Markdown se genera desde src/data y se deja en disco para poder leerlo,
// pero no se edita a mano: la fuente de la verdad es src/data/es.ts.
const locale = process.env.CV_LOCALE ?? "es";
const data = getData(locale);

const source = toMarkdown(data);
const mdName = locale === "es" ? "cv.md" : `cv.${locale}.md`;
writeFileSync(join(here, mdName), `${source}\n`, "utf8");

const body = marked.parse(source, { async: false });

// La tipografía se puede cambiar sin tocar el resto: CV_FONT elige la pila y
// CV_OUT el destino. Sirve para comparar variantes antes de decidir.
// Cada pila trae su cuerpo: Times es mucho más estrecha que Charter o
// Helvetica, así que al mismo tamaño unas caben en una página y otras no.
const FONTS = {
  calibri: { stack: "Carlito, Calibri, sans-serif", size: 9.3, embed: true },
  charter: { stack: '"Charter", "Bitstream Charter", Georgia, serif', size: 9 },
  georgia: { stack: 'Georgia, "Times New Roman", serif', size: 8.8 },
  times: { stack: '"Times New Roman", Times, serif', size: 9.7 },
  helvetica: {
    stack: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    size: 8.9,
  },
  arial: { stack: 'Arial, "Helvetica Neue", sans-serif', size: 8.9 },
};

const fontKey = process.env.CV_FONT ?? "calibri";
const font = FONTS[fontKey] ?? FONTS.calibri;
const { stack: fontStack, size: fontSize } = font;

// Carlito es el clon libre de Calibri, con las mismas métricas. Se incrusta
// como data URI para no depender de que la fuente exista en la máquina.
function embedCarlito() {
  const dir = resolve(root, "node_modules/@fontsource/carlito/files");
  const faces = [
    { weight: 400, style: "normal" },
    { weight: 400, style: "italic" },
    { weight: 700, style: "normal" },
    { weight: 700, style: "italic" },
  ];

  return faces
    .map(({ weight, style }) => {
      const file = join(dir, `carlito-latin-${weight}-${style}.woff2`);
      const b64 = readFileSync(file).toString("base64");
      return `@font-face{font-family:Carlito;font-style:${style};font-weight:${weight};src:url(data:font/woff2;base64,${b64}) format("woff2");}`;
    })
    .join("\n");
}

const fontFaces = font.embed ? embedCarlito() : "";

// Fuentes del sistema: el PDF debe abrirse igual en cualquier máquina y los
// parsers de ATS prefieren tipografías estándar.
const html = (size) => `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<title>${data.profile.fullName} — CV</title>
<style>
${fontFaces}

  @page { size: letter; margin: 10mm 13mm; }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: ${fontStack};
    font-size: ${size}pt;
    line-height: 1.26;
    color: #000;
  }

  /* Nombre */
  h1 {
    margin: 0 0 2pt;
    font-size: 20pt;
    font-weight: normal;
    letter-spacing: 0.04em;
    text-align: center;
    text-transform: uppercase;
  }

  /* Línea de contacto: debe caber en un solo renglón, por eso va algo
     más pequeña que el cuerpo. */
  h1 + p {
    margin: 0 0 9pt;
    font-size: 8.4pt;
    text-align: center;
    white-space: nowrap;
  }

  /* Secciones */
  h2 {
    margin: 8.5pt 0 2pt;
    padding-bottom: 1pt;
    border-bottom: 0.6pt solid #000;
    font-size: 10.8pt;
    font-weight: normal;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* Empresa / proyecto / institución. En em, para que escalen con el
     cuerpo al cambiar de tipografía. */
  h3 {
    display: flex;
    justify-content: space-between;
    gap: 12pt;
    margin: 5pt 0 0;
    font-size: 1.05em;
    font-weight: bold;
  }

  /* Cargo */
  h4 {
    display: flex;
    justify-content: space-between;
    gap: 12pt;
    margin: 1pt 0 2pt;
    font-size: 1em;
    font-style: italic;
    font-weight: normal;
  }

  /* La columna derecha (ciudad, fechas, enlace) no se parte */
  h3 span, h4 span { flex: none; font-style: normal; font-weight: normal; }
  h3 span { font-weight: normal; }

  ul { margin: 2pt 0 0; padding-left: 14pt; }
  li { margin-bottom: 1.5pt; }
  p { margin: 2pt 0; }

  a { color: #000; text-decoration: underline; }

  /* Evita que un cargo quede huérfano al final de página */
  h3, h4 { break-after: avoid; }
  ul { break-inside: avoid; }
</style>
</head>
<body>
${body}
</body>
</html>`;

const tmp = mkdtempSync(join(tmpdir(), "cv-"));
const htmlPath = join(tmp, "cv.html");
const defaultOut =
  locale === "es"
    ? "cv-andres-vizcaino.pdf"
    : `cv-andres-vizcaino-${locale}.pdf`;
const out = process.env.CV_OUT ?? join(root, "public", defaultOut);

function render(size) {
  writeFileSync(htmlPath, html(size), "utf8");
  execFileSync(
    CHROME,
    [
      "--headless",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--print-to-pdf=${out}`,
      `file://${htmlPath}`,
    ],
    { stdio: "pipe" },
  );
  const pdf = readFileSync(out).toString("latin1");
  return (pdf.match(/\/Type\s*\/Page[^s]/g) ?? []).length;
}

// El CV debe caber en una página. En vez de calibrar el cuerpo a mano cada vez
// que cambia el contenido o el idioma, se baja el tamaño hasta que entre.
try {
  let size = fontSize;
  let pages = render(size);

  while (pages > 1 && size > 7.5) {
    size = Math.round((size - 0.2) * 10) / 10;
    pages = render(size);
  }

  const note = size === fontSize ? "" : ` (ajustado a ${size}pt)`;
  console.log(`✓ ${out} — ${pages} página(s)${note}`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
