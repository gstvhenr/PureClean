import './register-components.js';

import { initCompareSliders } from './behaviors/compare-slider.js';
import { initHeroVideos } from './behaviors/hero-video.js';
import { initMobileNav, initNavbarScroll } from './behaviors/nav.js';
import { initRevealOnScroll } from './behaviors/reveal.js';
import { initStickyQuoteScroll } from './behaviors/sticky-scroll.js';

/** Após os imports, os custom elements já montaram o header no DOM. */
initMobileNav();
initNavbarScroll();
initHeroVideos();
initRevealOnScroll();
initCompareSliders();
initStickyQuoteScroll();
