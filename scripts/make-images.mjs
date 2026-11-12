/**
 * Draws the demo's images: original flat-lay illustrations of each product
 * (both colourways and a fabric close-up), category banners, brand logos,
 * size charts and shopper avatars. Writes them to scripts/seed-images/.
 *
 *   PLAYWRIGHT_CORE=/path/to/playwright-core [CHROME=/path/to/chrome] node scripts/make-images.mjs
 */
import fs from "node:fs";
import { createRequire } from "node:module";

import { BUYERS, CATEGORIES, PRODUCTS, SELLERS } from "./hub-catalogue.mjs";

if (!process.env.PLAYWRIGHT_CORE) {
  console.error("✗ set PLAYWRIGHT_CORE (and optionally CHROME)");
  process.exit(1);
}
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE);
const OUT = new URL("./seed-images/", import.meta.url).pathname;
for (const d of ["products", "categories", "brands", "size-charts", "avatars"]) fs.mkdirSync(OUT + d, { recursive: true });

const CREAM = "#F5EBD7";
const INK = "#1E1E1E";
const BG = "#F3EFE8";

// ---- colour helpers --------------------------------------------------------
const hex = (h) => h.replace("#", "").match(/../g).map((x) => parseInt(x, 16));
const toHex = (rgb) => "#" + rgb.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
const mix = (a, b, t) => toHex(hex(a).map((v, i) => v + (hex(b)[i] - v) * t));
const shade = (c, t) => mix(c, "#000000", t);
const tint = (c, t) => mix(c, "#FFFFFF", t);

// ---- fabric patterns (SVG <pattern> bodies) --------------------------------
function pattern(id, kind, c1, c2, scale = 1) {
  const s = (n) => n * scale;
  const tile = (w, h, body) => `<pattern id="${id}" width="${s(w)}" height="${s(h)}" patternUnits="userSpaceOnUse"><g transform="scale(${scale})">${body}</g></pattern>`;
  switch (kind) {
    case "kente":
      return tile(64, 64, `
        <rect width="64" height="64" fill="${c1}"/>
        <rect y="0" width="64" height="7" fill="${c2}"/><rect y="9" width="64" height="2" fill="${INK}"/>
        <rect y="32" width="64" height="7" fill="${INK}"/><rect y="41" width="64" height="2" fill="${c2}"/>
        <rect x="6" y="13" width="14" height="17" fill="${c2}"/><rect x="9" y="16" width="8" height="11" fill="${CREAM}"/>
        <rect x="38" y="45" width="14" height="17" fill="${c2}"/><rect x="41" y="48" width="8" height="11" fill="${INK}"/>
        <rect x="26" y="13" width="3" height="17" fill="${INK}"/><rect x="32" y="13" width="3" height="17" fill="${CREAM}"/>
        <rect x="58" y="45" width="3" height="17" fill="${CREAM}"/><rect x="22" y="45" width="3" height="17" fill="${INK}"/>`);
    case "adinkra":
      return tile(56, 56, `
        <rect width="56" height="56" fill="${c1}"/>
        <g fill="none" stroke="${CREAM}" stroke-width="2.4" opacity=".9">
          <circle cx="14" cy="14" r="8"/><path d="M14 4v20M4 14h20"/>
          <path d="M42 34c6 0 8 4 8 8s-4 8-8 8-8-4-8-8 2-5 6-5 5 2 5 5-2 4-4 4"/>
        </g>
        <path d="M42 8l6 6-6 6-6-6z" fill="${c2}"/><path d="M14 36l6 6-6 6-6-6z" fill="${c2}"/>`);
    case "wax":
      return tile(72, 72, `
        <rect width="72" height="72" fill="${c1}"/>
        <circle cx="18" cy="18" r="14" fill="${c2}"/><circle cx="18" cy="18" r="8" fill="${CREAM}"/><circle cx="18" cy="18" r="3.5" fill="${INK}"/>
        <circle cx="54" cy="54" r="14" fill="${CREAM}"/><circle cx="54" cy="54" r="9" fill="${c2}"/><circle cx="54" cy="54" r="3.5" fill="${c1}"/>
        <g fill="${INK}" opacity=".75"><circle cx="54" cy="16" r="2.5"/><circle cx="62" cy="24" r="2.5"/><circle cx="46" cy="24" r="2.5"/>
        <circle cx="18" cy="52" r="2.5"/><circle cx="26" cy="60" r="2.5"/><circle cx="10" cy="60" r="2.5"/></g>
        <path d="M36 0q8 18 0 36t0 36" stroke="${c2}" stroke-width="3" fill="none" opacity=".6"/>`);
    case "adire":
      return tile(60, 60, `
        <rect width="60" height="60" fill="${c1}"/>
        <g stroke="${CREAM}" stroke-width="2.2" fill="none" opacity=".75">
          <path d="M0 12q7.5-8 15 0t15 0 15 0 15 0"/><path d="M0 42q7.5-8 15 0t15 0 15 0 15 0"/>
        </g>
        <g fill="${CREAM}" opacity=".7"><circle cx="8" cy="27" r="2.6"/><circle cx="23" cy="27" r="2.6"/><circle cx="38" cy="27" r="2.6"/><circle cx="53" cy="27" r="2.6"/>
        <circle cx="15" cy="56" r="2"/><circle cx="45" cy="56" r="2"/></g>
        <rect x="27" y="4" width="6" height="6" fill="${c2}" opacity=".8" transform="rotate(45 30 7)"/>`);
    case "check":
      return tile(48, 48, `
        <rect width="48" height="48" fill="${c1}"/>
        <rect x="0" y="16" width="48" height="10" fill="${INK}" opacity=".45"/><rect x="16" y="0" width="10" height="48" fill="${INK}" opacity=".45"/>
        <rect x="0" y="34" width="48" height="3" fill="${CREAM}" opacity=".8"/><rect x="34" y="0" width="3" height="48" fill="${CREAM}" opacity=".8"/>
        <rect x="0" y="5" width="48" height="2" fill="${c2}"/><rect x="5" y="0" width="2" height="48" fill="${c2}"/>`);
    case "kikoi":
      return tile(60, 40, `
        <rect width="60" height="40" fill="${c1}"/>
        <rect x="4" width="5" height="40" fill="${CREAM}" opacity=".85"/><rect x="12" width="2" height="40" fill="${c2}"/>
        <rect x="34" width="9" height="40" fill="${shade(c1, 0.25)}"/><rect x="47" width="2" height="40" fill="${CREAM}" opacity=".85"/>`);
    case "beads":
      return tile(24, 24, `
        <rect width="24" height="24" fill="${CREAM}"/>
        <circle cx="6" cy="6" r="4.2" fill="#C0392B"/><circle cx="18" cy="6" r="4.2" fill="#1F7A7A"/>
        <circle cx="6" cy="18" r="4.2" fill="#E3A21A"/><circle cx="18" cy="18" r="4.2" fill="${INK}"/>`);
    case "shimmer":
      return tile(30, 30, `
        <rect width="30" height="30" fill="${c1}"/>
        <path d="M-5 35L35 -5" stroke="${tint(c1, 0.45)}" stroke-width="5" opacity=".7"/>
        <path d="M-5 20L20 -5M10 35L35 10" stroke="${shade(c1, 0.12)}" stroke-width="2" opacity=".6"/>`);
    case "linen":
    default:
      return tile(12, 12, `
        <rect width="12" height="12" fill="${c1}"/>
        <path d="M0 3h12M0 9h12" stroke="${shade(c1, 0.08)}" stroke-width="1"/>
        <path d="M3 0v12M9 0v12" stroke="${tint(c1, 0.1)}" stroke-width="1"/>`);
  }
}

// ---- garments (400 × 500 box, centred) -----------------------------------
// Each returns SVG using fill="url(#f)" for the fabric.
const F = 'fill="url(#f)" stroke="rgba(0,0,0,.28)" stroke-width="2" stroke-linejoin="round"';
const seam = (d, c = "rgba(0,0,0,.22)") => `<path d="${d}" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="5 4"/>`;
const shadowOf = (inner) => `<g transform="translate(6 10)" opacity=".18" filter="url(#blur)">${inner.replace(/url\(#f\)/g, "#000")}</g>`;

function garment(kind, c1) {
  const solid = shade(c1, 0.15);
  switch (kind) {
    case "shirt": {
      const body = `<path ${F} d="M142 108L118 118L58 160L84 218L120 198L120 432L280 432L280 198L316 218L342 160L282 118L258 108Q200 136 142 108Z"/>`;
      return body + `<path d="M142 108L200 150L176 104Z M258 108L200 150L224 104Z" fill="url(#f)" stroke="rgba(0,0,0,.35)" stroke-width="2"/>`
        + `<path d="M200 150V432" stroke="rgba(0,0,0,.3)" stroke-width="2"/>`
        + [185, 235, 285, 335, 385].map((y) => `<circle cx="208" cy="${y}" r="5" fill="${CREAM}" stroke="rgba(0,0,0,.35)"/>`).join("")
        + `<rect x="226" y="208" width="36" height="40" fill="url(#f)" stroke="rgba(0,0,0,.3)" stroke-width="2"/>`;
    }
    case "tunic": {
      return `<path ${F} d="M146 100L120 108L64 150L86 200L122 184L118 456L282 456L278 184L314 200L336 150L280 108L254 100Q200 122 146 100Z"/>`
        + `<path d="M168 104L200 168L232 104" fill="none" stroke="${CREAM}" stroke-width="7" stroke-dasharray="3 5"/>`
        + `<path d="M168 104L200 168L232 104" fill="none" stroke="${solid}" stroke-width="2"/>`
        + seam("M118 420L150 456M282 420L250 456");
    }
    case "top": {
      return `<path ${F} d="M140 120L100 132L60 200L96 222L126 186L124 330L276 330L274 186L304 222L340 200L300 132L260 120Q200 150 140 120Z"/>`
        + seam("M128 316H272") + `<path d="M150 124Q200 160 250 124" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="3"/>`;
    }
    case "jacket": {
      return `<path ${F} d="M142 106L96 122L48 328L90 340L126 206L126 404L274 404L274 206L310 340L352 328L304 122L258 106Q200 128 142 106Z"/>`
        + `<rect x="126" y="404" width="148" height="28" fill="${INK}" opacity=".85"/>`
        + `<path d="M126 410H274M126 418H274M126 426H274" stroke="${CREAM}" stroke-width="1.5" opacity=".6"/>`
        + `<path d="M44 336L90 348L86 372L40 360Z M310 348L356 336L360 360L314 372Z" fill="${INK}" opacity=".85"/>`
        + `<path d="M160 104Q200 128 240 104L236 92Q200 110 164 92Z" fill="${INK}" opacity=".85"/>`
        + `<path d="M200 118V432" stroke="#BDBDBD" stroke-width="5"/><path d="M200 118V432" stroke="${INK}" stroke-width="1.5" stroke-dasharray="2 3"/>`;
    }
    case "trousers": {
      return `<path ${F} d="M128 54L272 54L292 474L222 474L200 176L178 474L108 474Z"/>`
        + `<rect x="128" y="54" width="144" height="26" fill="url(#f)" stroke="rgba(0,0,0,.35)" stroke-width="2"/>`
        + `<path d="M190 80q-8 34 -22 44M210 80q8 34 22 44" stroke="${CREAM}" stroke-width="3" fill="none"/>`
        + seam("M150 100Q160 140 196 150M250 100Q240 140 204 150");
    }
    case "dress": {
      return `<path ${F} d="M160 92Q200 120 240 92L272 104L304 150L268 168L256 142L250 232L334 462L66 462L150 232L144 142L132 168L96 150L128 104Z"/>`
        + `<path d="M160 92L232 230" stroke="rgba(0,0,0,.35)" stroke-width="2.5" fill="none"/>`
        + `<rect x="146" y="226" width="108" height="14" fill="${solid}" opacity=".9"/>`
        + `<path d="M244 240q24 40 8 84M250 240q34 30 34 70" stroke="${solid}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
    }
    case "maxi": {
      return `<path ${F} d="M150 70Q200 96 250 70L362 112L332 206L290 186L302 482L98 482L110 186L68 206L38 112Z"/>`
        + `<path d="M185 76Q200 120 215 76" fill="none" stroke="${CREAM}" stroke-width="5"/>`
        + seam("M124 300h34v44M276 300h-34v44");
    }
    case "robe": {
      return `<path ${F} d="M132 96L36 176L56 428L344 428L364 176L268 96Q200 124 132 96Z"/>`
        + `<path d="M162 100Q200 170 238 100" fill="none" stroke="${CREAM}" stroke-width="10" opacity=".85"/>`
        + `<circle cx="200" cy="168" r="26" fill="none" stroke="${CREAM}" stroke-width="5" stroke-dasharray="4 4"/>`
        + `<path d="M100 232h62v70h-62z" fill="none" stroke="${CREAM}" stroke-width="4" stroke-dasharray="4 4"/>`
        + `<path d="M150 428L156 470L244 470L250 428" fill="url(#f)" stroke="rgba(0,0,0,.25)" stroke-width="2"/>`;
    }
    case "suit": {
      const trousers = `<path ${F} d="M150 300L250 300L262 488L214 488L200 380L186 488L138 488Z"/>`;
      const tunic = `<path ${F} d="M150 70L120 80L72 230L104 240L128 150L126 372L274 372L272 150L296 240L328 230L280 80L250 70Q200 88 150 70Z"/>`;
      return trousers + tunic + `<path d="M180 70V58H220V70" fill="url(#f)" stroke="rgba(0,0,0,.35)" stroke-width="2"/>`
        + `<path d="M200 74V250" stroke="rgba(0,0,0,.3)" stroke-width="2"/>`
        + [104, 140, 176, 212].map((y) => `<circle cx="208" cy="${y}" r="4" fill="${shade(c1, 0.35)}"/>`).join("")
        + `<path d="M226 130h24" stroke="rgba(0,0,0,.35)" stroke-width="2"/>`;
    }
    case "skirt": {
      return `<path ${F} d="M138 96L262 96L332 444L68 444Z"/>`
        + `<rect x="132" y="80" width="136" height="20" fill="url(#f)" stroke="rgba(0,0,0,.35)" stroke-width="2"/>`
        + `<path d="M262 92q40 10 44 56M262 98q26 26 14 70" stroke="url(#f)" stroke-width="12" fill="none" stroke-linecap="round"/>`
        + `<path d="M200 100L236 444" stroke="rgba(0,0,0,.3)" stroke-width="2"/>`;
    }
    case "kidset": {
      const shirt = `<path ${F} d="M156 60L136 68L96 98L114 136L138 124L138 270L262 270L262 124L286 136L304 98L264 68L244 60Q200 82 156 60Z"/>`
        + `<path d="M200 82V270" stroke="rgba(0,0,0,.3)" stroke-width="2"/>`
        + [110, 150, 190, 230].map((y) => `<circle cx="207" cy="${y}" r="4" fill="${CREAM}"/>`).join("");
      const shorts = `<path ${F} d="M140 300L260 300L276 440L212 440L200 360L188 440L124 440Z"/><rect x="140" y="300" width="120" height="18" fill="url(#f)" stroke="rgba(0,0,0,.3)" stroke-width="2"/>`;
      return shirt + shorts;
    }
    case "kiddress": {
      return `<path ${F} d="M168 110Q200 132 232 110L250 120L276 154L250 168L244 150L240 230L318 430L82 430L160 230L156 150L150 168L124 154L150 120Z"/>`
        + `<circle cx="138" cy="146" r="22" fill="url(#f)" stroke="rgba(0,0,0,.25)" stroke-width="2"/><circle cx="262" cy="146" r="22" fill="url(#f)" stroke="rgba(0,0,0,.25)" stroke-width="2"/>`
        + `<rect x="158" y="224" width="84" height="12" fill="${CREAM}"/>` + seam("M120 400Q200 420 280 400");
    }
    case "scarf": {
      const fringe = (x0, x1, y) => Array.from({ length: 9 }, (_, i) => { const x = x0 + ((x1 - x0) * (i + 0.5)) / 9; return `<path d="M${x} ${y}v26" stroke="${shade(c1, 0.1)}" stroke-width="3"/>`; }).join("");
      return `<path ${F} d="M112 40L196 40L196 420L112 420Z"/>` + fringe(112, 196, 420)
        + `<path ${F} d="M204 80L288 80L288 460L204 460Z"/>` + fringe(204, 288, 460)
        + `<path d="M112 40Q200 -6 288 80" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="2"/>`;
    }
    case "hat": {
      return `<ellipse cx="200" cy="300" rx="158" ry="52" ${F}/>` + seam("M70 300Q200 352 330 300", "rgba(0,0,0,.25)")
        + `<path ${F} d="M128 290L144 172Q200 128 256 172L272 290Q200 316 128 290Z"/>`
        + `<path d="M138 250Q200 272 262 250" stroke="${solid}" stroke-width="10" fill="none"/>`;
    }
    case "headwrap": {
      const pleats = [-60, -36, -12, 12, 36, 60].map((a) => `<path d="M200 330L${200 + Math.sin((a * Math.PI) / 180) * 170} ${330 - Math.cos((a * Math.PI) / 180) * 220}" stroke="rgba(0,0,0,.18)" stroke-width="2"/>`).join("");
      return `<path ${F} d="M200 340L52 196Q82 104 200 86Q318 104 348 196Z"/>` + pleats
        + `<path ${F} d="M200 330C150 380 140 430 120 470L160 470C176 430 190 390 214 350Z"/>`
        + `<circle cx="200" cy="336" r="26" ${F}/>`;
    }
    case "bag": {
      return `<path d="M150 180Q150 70 200 70T250 180" fill="none" stroke="${shade(c1, 0.3)}" stroke-width="14" stroke-linecap="round"/>`
        + `<rect x="86" y="170" width="228" height="282" rx="18" fill="${c1}" stroke="rgba(0,0,0,.35)" stroke-width="2"/>`
        + `<rect x="86" y="262" width="228" height="56" fill="url(#f)" stroke="rgba(0,0,0,.25)"/>`
        + seam("M100 184H300M100 438H300", "rgba(255,255,255,.35)");
    }
    default:
      return `<rect x="100" y="100" width="200" height="300" ${F}/>`;
  }
}

const page = (w, h, svg) => `<!doctype html><html><head><style>html,body{margin:0;background:${BG}}svg{display:block}</style></head><body>${svg}</body></html>`;

function productSvg(p, idx, w = 800, h = 1000) {
  const [, c1] = p.colors[idx];
  const c2 = p.colors[1 - idx][1];
  const fabric = p.garment === "bag" ? "beads" : p.pattern;
  const inner = garment(p.garment, c1);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 400 500">
    <defs>${pattern("f", fabric, c1, c2, 0.9)}<filter id="blur"><feGaussianBlur stdDeviation="6"/></filter>
    <radialGradient id="bg" cx=".5" cy=".42" r=".75"><stop offset="0" stop-color="#FBF8F3"/><stop offset="1" stop-color="#E9E2D6"/></radialGradient></defs>
    <rect width="400" height="500" fill="url(#bg)"/>
    ${shadowOf(inner)}${inner}
  </svg>`;
}

function detailSvg(p, w = 800, h = 1000) {
  const [, c1] = p.colors[0];
  const c2 = p.colors[1][1];
  const fabric = p.garment === "bag" ? "beads" : p.pattern;
  const brand = SELLERS.find((s) => s.key === p.seller).brand;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 400 500">
    <defs>${pattern("f", fabric, c1, c2, 2.4)}${pattern("g", fabric, p.colors[1][1], c1, 2.4)}</defs>
    <rect width="400" height="500" fill="#EDE6DA"/>
    <g transform="rotate(-6 200 250)"><rect x="40" y="60" width="330" height="380" rx="10" fill="url(#g)"/></g>
    <g transform="rotate(4 200 250)"><rect x="34" y="44" width="330" height="390" rx="10" fill="url(#f)" stroke="rgba(0,0,0,.2)"/>
    <rect x="46" y="56" width="306" height="366" rx="6" fill="none" stroke="${CREAM}" stroke-width="2.5" stroke-dasharray="7 6"/></g>
    <g transform="translate(250 360) rotate(-8)">
      <rect width="118" height="62" rx="6" fill="${CREAM}" stroke="rgba(0,0,0,.3)"/><circle cx="14" cy="31" r="5" fill="#EDE6DA" stroke="rgba(0,0,0,.3)"/>
      <text x="64" y="28" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="${INK}">${brand}</text>
      <text x="64" y="46" text-anchor="middle" font-family="Helvetica, Arial" font-size="9" fill="#555" letter-spacing="1.5">100% COTTON</text>
    </g>
  </svg>`;
}

function categorySvg(cat) {
  const items = PRODUCTS.filter((p) => p.category === cat.name).slice(0, 3);
  const placed = items.map((p, i) => {
    const x = [40, 330, 620][i];
    const y = [70, 40, 80][i];
    const [, c1] = p.colors[i % 2];
    const c2 = p.colors[1 - (i % 2)][1];
    const fabric = p.garment === "bag" ? "beads" : p.pattern;
    return `<svg x="${x}" y="${y}" width="300" height="375" viewBox="0 0 400 500"><defs>${pattern("f", fabric, c1, c2, 0.9)}<filter id="blur"><feGaussianBlur stdDeviation="6"/></filter></defs>
      <g transform="rotate(${[-6, 3, 7][i]} 200 250)">${shadowOf(garment(p.garment, c1))}${garment(p.garment, c1)}</g></svg>`.replace(/id="f"/g, `id="f${i}"`).replace(/url\(#f\)/g, `url(#f${i})`);
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="480" viewBox="0 0 960 480">
    <rect width="960" height="480" fill="${tint(cat.tint, 0.84)}"/>
    <circle cx="820" cy="80" r="160" fill="${tint(cat.tint, 0.7)}"/><circle cx="120" cy="440" r="140" fill="${tint(cat.tint, 0.74)}"/>
    ${placed}
  </svg>`;
}

function logoSvg(s) {
  const initials = s.brand.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]).join("").slice(0, 2);
  const [a, b] = s.colors;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <defs>${pattern("f", "kente", a, b, 1)}</defs>
    <rect width="400" height="400" rx="40" fill="#FFFFFF"/>
    <circle cx="200" cy="160" r="96" fill="url(#f)"/><circle cx="200" cy="160" r="70" fill="#FFFFFF"/>
    <text x="200" y="182" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="64" fill="${shade(a, 0.35)}">${initials}</text>
    <text x="200" y="320" text-anchor="middle" font-family="Georgia, serif" font-size="36" fill="${INK}">${s.brand}</text>
  </svg>`;
}

function sizeChartSvg(kind) {
  const rows = kind === "kids"
    ? [["Size", "Age", "Chest (cm)", "Height (cm)"], ["2-3Y", "2-3", "54", "92-98"], ["4-5Y", "4-5", "58", "104-110"], ["6-7Y", "6-7", "62", "116-122"]]
    : kind === "one"
      ? [["Size", "Measurements"], ["One Size", "See the product description"], ["", "Adjustable or free size"]]
      : [["Size", "Chest (cm)", "Waist (cm)", "Hip (cm)"], ["S", "86-91", "71-76", "91-96"], ["M", "96-101", "81-86", "101-106"], ["L", "106-111", "91-96", "111-116"], ["XL", "116-121", "101-106", "121-126"]];
  const cols = rows[0].length;
  const cw = 680 / cols;
  const cells = rows.map((r, y) => r.map((c, x) => `<rect x="${60 + x * cw}" y="${130 + y * 60}" width="${cw}" height="60" fill="${y === 0 ? INK : y % 2 ? "#FFFFFF" : "#F6F2EB"}" stroke="#DDD"/>
    <text x="${60 + x * cw + cw / 2}" y="${168 + y * 60}" text-anchor="middle" font-family="Helvetica, Arial" font-size="22" fill="${y === 0 ? "#FFF" : INK}" ${y === 0 ? 'font-weight="700"' : ""}>${c}</text>`).join("")).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="${190 + rows.length * 60}" viewBox="0 0 800 ${190 + rows.length * 60}">
    <rect width="800" height="100%" fill="#FFFFFF"/>
    <text x="60" y="80" font-family="Georgia, serif" font-size="34" fill="${INK}">Size guide</text>
    <text x="740" y="80" text-anchor="end" font-family="Helvetica, Arial" font-size="18" fill="#777">${kind === "kids" ? "Kids" : kind === "one" ? "Accessories" : "Adults"}</text>
    ${cells}
  </svg>`;
}

function avatarSvg(b, i) {
  const palette = ["#1F7A7A", "#C2185B", "#2B3A67", "#B5523B", "#1B7F5B", "#6B2D5C", "#C98B2B"];
  const initials = b.name.split(" ").map((w) => w[0]).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="${palette[i % palette.length]}"/>
    <text x="128" y="152" text-anchor="middle" font-family="Helvetica, Arial" font-weight="700" font-size="92" fill="#FFFFFF">${initials}</text>
  </svg>`;
}

// ---- render ----------------------------------------------------------------
const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const ctx = await browser.newContext({ deviceScaleFactor: 1 });
const tab = await ctx.newPage();

async function shoot(file, svg, w, h, type = "jpeg") {
  await tab.setViewportSize({ width: w, height: h });
  await tab.setContent(page(w, h, svg));
  await tab.screenshot({ path: OUT + file, type, ...(type === "jpeg" ? { quality: 86 } : {}), clip: { x: 0, y: 0, width: w, height: h } });
}

let n = 0;
for (const p of PRODUCTS) {
  await shoot(`products/${p.slug}-1.jpg`, productSvg(p, 0), 800, 1000);
  await shoot(`products/${p.slug}-2.jpg`, productSvg(p, 1), 800, 1000);
  await shoot(`products/${p.slug}-3.jpg`, detailSvg(p), 800, 1000);
  n += 3;
}
for (const c of CATEGORIES) {
  await shoot(`categories/${c.name.toLowerCase()}.jpg`, categorySvg(c), 960, 480);
  n++;
}
for (const s of SELLERS) {
  await shoot(`brands/${s.key}.png`, logoSvg(s), 400, 400, "png");
  n++;
}
for (const kind of ["adult", "kids", "one"]) {
  await shoot(`size-charts/${kind}.png`, sizeChartSvg(kind), 800, 190 + (kind === "adult" ? 5 : kind === "kids" ? 4 : 3) * 60, "png");
  n++;
}
for (const [i, b] of BUYERS.entries()) {
  await shoot(`avatars/${b.key}.png`, avatarSvg(b, i), 256, 256, "png");
  n++;
}
await browser.close();
console.log(`✓ ${n} images in ${OUT}`);
