// Los iconos voxel de las tarjetas de proyecto. Van aparte de es.ts y en.ts
// por dos razones: el CV en PDF consume esos archivos y no tiene dónde poner
// una ilustración, y el icono es el mismo en los dos idiomas.
//
// La llave es el nombre del proyecto, que no se traduce por ser nombre propio.
// Los archivos los genera art/prepare-project-icons.py.
export const projectIcons: Record<string, string> = {
  Dogesti: "/projects/dogesti.webp",
  Viatro: "/projects/viatro.webp",
  "Artemis II Tracker": "/projects/artemis.webp",
  Stridia: "/projects/stridia.webp",
  Fintivo: "/projects/fintivo.webp",
  "lpbcol-app": "/projects/lpbcol.webp",
};
