# Estrutura e padronização do site estático

Este documento descreve como o site em `index.html` está organizado e **onde alterar cada tipo de informação**.

**Design UI/UX (obrigatório):** [DESIGN.md](../DESIGN.md) na raiz do projeto.
## Camadas

| Camada | Pasta / ficheiro | Responsabilidade |
|--------|------------------|------------------|
| Shell | `index.html` | Secções (`<pc-*>`), meta SEO, JSON-LD, `css/site.css`, `js/main.js` |
| Tokens | `css/tokens.css` | Cores, tipografia, espaçamentos, sombras, motion e focus ring |
| Base | `css/base.css`, `css/utilities.css`, `css/motion.css`, `css/focus.css` | Reset, utilitários (`.section--*`, …), movimento e foco |
| Componentes (CSS) | `css/components/*.css` | Estilos semânticos (`.btn`, `.card-service`, `.site-header`, modifier `.site-header--at-top` em `header.css`, …) |
| Configuração | `js/config.js` | Marca, WhatsApp, `SITE_ORIGIN`, contacto |
| SEO / crawl | `robots.txt`, `sitemap.xml`, `docs/SEO.md` | Indexação e domínio canónico |
| Conteúdo | `js/data/*.js` | Textos, navegação, serviços e registo fotográfico |
| UI | `js/components/ui/*.js` | Primitivos reutilizáveis (`renderButton`, `renderCompareSlider`, `renderServiceCard`, …) |
| Secções | `js/components/*-section.js` | Montam cada bloco da página a partir de config + data |
| Comportamento | `js/behaviors/nav.js`, `js/behaviors/reveal.js`, `js/behaviors/sticky-scroll.js`, `js/behaviors/compare-slider.js` | Menu mobile, header, reveals, comparador, CTA sticky e FAB |
| Registo | `js/register-components.js` | Import único de todos os custom elements |
| Assets | `assets/brand/`, `assets/photos/`, `assets/video/` | Marca, PNGs canónicos, derivados AVIF/WebP e vídeo do hero |
| Ferramentas | `scripts/` | Build, SEO, otimização de fotografia e servidor de testes |
| Testes | `tests/ui/`, `tests/images/` | Playwright e contratos Node dos budgets |

## Onde alterar o quê

| Quer mudar… | Edite |
|-------------|--------|
| Cor dourada / azul da marca | `css/tokens.css` |
| Telefone ou link WhatsApp | `js/config.js` (`WHATSAPP_URL`, `CONTACT`) |
| Mensagens pré-preenchidas do WhatsApp | `js/config.js` (`WHATSAPP_MESSAGES`) |
| Itens do menu | `js/data/navigation.js` |
| Lista de serviços | `js/data/services.js` |
| Resultados antes/depois | `js/data/media.js` + `js/components/before-after-section.js` |
| Passos do processo | `js/data/processSteps.js` |
| Textos do hero / sobre / CTA | `js/data/about.js` |
| Rodapé (listas, legal) | `js/data/footer.js` + `js/config.js` (contacto) |
| Logo | Ficheiro em `assets/brand/` e caminho em `js/config.js` → `ASSETS.logo` |
| Ordem das secções na página | `index.html` (ordem dos `<pc-*>` dentro de `<main>`) |

## Custom elements (API na página)

| Tag | Ficheiro |
|-----|----------|
| `<pc-site-header>` | `js/components/site-header.js` |
| `<pc-hero>` | `js/components/hero-section.js` |
| `<pc-about>` | `js/components/about-section.js` |
| `<pc-before-after>` | `js/components/before-after-section.js` |
| `<pc-services>` | `js/components/services-section.js` |
| `<pc-differentials>` | `js/components/differentials-section.js` |
| `<pc-process>` | `js/components/process-section.js` |
| `<pc-faq>` | `js/components/faq-section.js` |
| `<pc-cta-banner>` | `js/components/cta-banner.js` |
| `<pc-site-footer>` | `js/components/site-footer.js` |
| `<pc-sticky-quote>` | `js/components/sticky-quote-cta.js` |
| `<pc-whatsapp-fab>` | `js/components/whatsapp-fab.js` |

Primitivos opcionais em HTML: `<pc-button>`, `<pc-service-card>`, etc. (ver `js/components/ui/`).

## Âncoras de navegação

IDs nas secções (definidos nos componentes, alinhados com `navigation.js`):

- `#sobre`, `#antes-depois`, `#servicos`, `#diferenciais`, `#processo`, `#faq`

## Servir localmente

Módulos ES exigem HTTP (não `file://`):

```bash
npm run dev
```

Abra http://localhost:4321 (servidor `serve` na raiz do projeto).

## Pipeline de fotografia e validação

```bash
npm run images:optimize
npm run images:check
npm run test:images
npm run test:ui
npm run build:pages
```

`js/data/media.js` é o registo canónico. A secção Resultados usa grelha `grid-4` (4 entradas em `beforeAfter`): comparador na primeira célula com par completo; demais células reservadas.
