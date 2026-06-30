# SEO — PureClean

Domínio de produção: **https://purecleanpt.online** (`SITE_ORIGIN` em `js/config.js`).

## Fluxo obrigatório para agentes

1. Editar `js/config.js` e/ou `js/data/faq.js` (e copy em `js/data/*`).
2. Executar **`npm run seo:sync`** — atualiza `index.html` (title, meta, JSON-LD), `sitemap.xml`, `robots.txt`, canonical das páginas legais.
3. Não editar à mão os blocos `<!-- seo:sync-* -->` no HTML.

Regras adicionais: manter `SITE_ORIGIN`, title e FAQ alinhados com `js/config.js` e `js/data/faq.js`.

## Etapa 1 — Técnico

| Pilar | Implementação |
|-------|----------------|
| **Desempenho** | CSS/ícones/fontes locais; preload; CSS crítico inline; `modulepreload` de `main.js` |
| **Mobile-first** | `viewport`, grelhas responsivas, menu móvel |
| **HTTPS** | Obrigatório no hosting |
| **Cabeçalhos HTTP** | [`_headers`](../_headers) na raiz (ex.: **Cloudflare Pages**). O projeto **não** usa Netlify — não há `netlify.toml`. |
| **Crawl** | `robots.txt`, `sitemap.xml`; canonical; Open Graph |
| **Dados estruturados** | JSON-LD estático (`LocalBusiness`, `WebSite`, `FAQPage`) gerado por `seo:sync` |

## Etapa 2 — Conteúdo on-page

| Pilar | Implementação |
|-------|----------------|
| **Intenção** | Landing transacional/comercial; FAQ informativo |
| **Palavras-chave** | pt-PT; Lisboa e Margem Sul; títulos em `config.js` + `js/data/*` |
| **Imagens** | `alt` em `js/data/media.js` |
| **E-E-A-T** | Sobre, FAQ, termos/privacidade, `BUSINESS` em `config.js` |

## Validação pós-deploy

1. [PageSpeed Insights](https://pagespeed.web.dev/) — URL `https://purecleanpt.online/`
2. [Google Search Console](https://search.google.com/search-console) — propriedade + sitemap
3. [Rich Results Test](https://search.google.com/test/rich-results) — FAQ e LocalBusiness

## Fora do código

Google Business Profile, avaliações Google, backlinks e Analytics.
