import { processSection, processSteps } from '../data/processSteps.js';
import { escapeHtml } from '../lib/html.js';
import { renderContainer } from './ui/container.js';
import { renderSectionHeading } from './ui/section-heading.js';

function renderProcessStep(step) {
  const badgeClass =
    step.variant === 'gold'
      ? 'process-step__badge--gold'
      : 'process-step__badge--blue';

  return `
    <article class="process-step">
      <div class="process-step__badge ${badgeClass}">${step.number}</div>
      <h3 class="process-step__title">${escapeHtml(step.title)}</h3>
      <p class="process-step__text">${escapeHtml(step.description)}</p>
    </article>
  `;
}

export class PcProcess extends HTMLElement {
  connectedCallback() {
    const steps = processSteps.map(renderProcessStep).join('');

    this.innerHTML = `
      <section id="processo" class="section section--white">
        ${renderContainer(`
          ${renderSectionHeading({
            title: processSection.title,
            subtitle: processSection.subtitle,
            align: 'left',
          })}
          <div class="process-timeline reveal-on-scroll reveal-on-scroll--delay">${steps}</div>
        `)}
      </section>
    `;
  }
}

customElements.define('pc-process', PcProcess);
