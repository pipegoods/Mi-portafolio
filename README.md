# Astro Starter Kit: Basics

```
pnpm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![basics](https://user-images.githubusercontent.com/4677417/186188965-73453154-fdec-4d6b-9c34-cb35c248ae5b.png)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`                 | Starts local dev server at `localhost:4321`      |
| `pnpm build`               | Build your production site to `./dist/`          |
| `pnpm preview`             | Preview your build locally, before deploying     |
| `pnpm lint`                | Lint the project with ESLint                     |
| `pnpm astro ...`           | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help`     | Get help using the Astro CLI                     |

## 🚀 Despliegue

El sitio vive en Hostinger (hosting compartido) y se publica solo: cada push a
`master` dispara `.github/workflows/deploy.yml`, que instala, pasa el linter,
construye y sube `dist/` por FTPS.

La acción guarda un archivo de estado en el servidor, así que a partir del
segundo despliegue solo sube lo que cambió.

### Secretos

Las credenciales salen de hPanel, en **Archivos → Cuentas FTP**, y se cargan en
**Settings → Secrets and variables → Actions** (o con `gh secret set NOMBRE`):

| Secreto        | Valor                       |
| :------------- | :-------------------------- |
| `FTP_SERVER`   | Host o IP del servidor FTP  |
| `FTP_USERNAME` | Usuario de la cuenta FTP    |
| `FTP_PASSWORD` | Su contraseña               |

### Dos detalles del servidor

**El destino es `./`, no `public_html/`.** La cuenta FTP entra directamente en
`/domains/andresvizcaino.com/public_html`, así que el directorio de login ya es
la raíz del sitio. Poner `public_html/` crearía una carpeta anidada y el sitio
no cambiaría.

**El certificado FTPS es `*.hstgr.io`.** Solo valida si `FTP_SERVER` es el
nombre del servidor de Hostinger (`srvXXXX.hstgr.io`, está en hPanel); con la IP
la verificación falla. Por eso el workflow usa `security: loose`, que sigue
cifrando la conexión pero no comprueba la identidad del servidor. Para
endurecerlo: poner el hostname en `FTP_SERVER` y añadir una **variable**
`FTP_SECURITY` con el valor `strict`.

### Caché del CDN

El sitio va detrás del CDN de Hostinger (`server: hcdn`). Si tras un despliegue
sigues viendo la versión vieja, hay que purgar la caché desde hPanel.

### Assets que no se generan en el build

El CV en PDF (`pnpm cv`, necesita Chrome) y la ilustración (`art/`, necesita
Python) se generan a mano y quedan versionados en `public/`. El workflow solo
corre `astro build`, que los copia a `dist/`. Si se cambia el contenido del CV
hay que correr `pnpm cv` y commitear los PDF antes de empujar.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
