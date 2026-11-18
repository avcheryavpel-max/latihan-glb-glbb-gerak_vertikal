export function escapeHtml(raw: string): string {
  return String(raw)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Formats physics expressions safely into HTML:
 * - [a|b] renders a stacked fraction (or [root|x] renders a square root)
 * - _(sub) renders subscript
 * - ^(sup) renders superscript
 * - ~var~ renders italic physics variable
 */
export function formatMathHtml(raw: string): string {
  let html = escapeHtml(raw);
  html = html.replace(/\[([^[\]|]+)\|([^[\]]+)\]/g, (_match, a: string, b: string) => {
    if (a === 'root') {
      return `<span class="math-sqrt">√<span class="math-sqrt-bar">${b}</span></span>`;
    }
    return `<span class="math-frac"><span>${a}</span><span>${b}</span></span>`;
  });
  html = html
    .replace(/_\(([^)]*)\)/g, '<sub>$1</sub>')
    .replace(/\^\(([^)]*)\)/g, '<sup>$1</sup>')
    .replace(/~([^~]+)~/g, '<i class="font-serif-book italic">$1</i>');
  return html;
}
