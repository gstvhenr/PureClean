# PureClean

Site estático de marketing na raiz do repositório.

- **Estrutura e ficheiros:** [docs/ESTRUTURA-SITE.md](docs/ESTRUTURA-SITE.md)
- **SEO:** [docs/SEO.md](docs/SEO.md)

## Comandos

```bash
npm install
npm run dev
npm run images:check
npm run test:ui
npm run build:pages
```

Abra **http://localhost:4321** — a landing é o `index.html` na raiz (custom elements + `css/site.css` + `js/main.js`).

Não abra o HTML diretamente no explorador (`file://`); os módulos ES precisam de um servidor HTTP.

## GitHub Pages

Pré-visualização: [https://gstvhenr.github.io/PureClean/](https://gstvhenr.github.io/PureClean/) (com barra final). O deploy via Actions corre `npm run build:pages` e publica só `css/`, `js/`, `assets/` e HTML da raiz — com `<base href="/PureClean/">` automático em `*.github.io` para CSS/JS e ícones carregarem no subpath correto. Domínio canónico de produção: `https://purecleanpt.online/` (ver `docs/SEO.md`).

## Estrutura

- **`index.html`** — shell com secções `<pc-*>`
- **`css/site.css`** — estilos (tokens + componentes)
- **`js/config.js`** — marca, WhatsApp, assets
- **`js/data/`** — conteúdo editável
- **`js/register-components.js`** — custom elements
- **`assets/brand/`** — logo e favicon
- **`assets/photos/`** — PNGs canónicos + derivados AVIF/WebP em `generated/`
- **`tests/`** — regressões Playwright e budgets de imagem
- **`docs/SEO.md`** — SEO; domínio `https://purecleanpt.online`; `npm run seo:sync` após mudar `js/config.js` ou FAQ
- **`_headers`** — cabeçalhos de segurança (hosts estáticos tipo Cloudflare Pages; não usamos Netlify)
