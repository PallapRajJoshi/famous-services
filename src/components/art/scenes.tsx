import * as React from "react";
import { cn } from "@/lib/cn";
import { PROPERTY_SCENES, PROPERTY_PALETTES } from "./property-scenes";
import { SiteImage } from "@/components/ui/site-image";
import { imageKey, pickImage } from "@/config/images";

/**
 * Every picture on the site goes through <ServiceScene>. It shows the picture FILE for the slot if there is one
 * (public/images/..., see src/config/images.ts), and otherwise draws one of the built-in flat-vector scenes below.
 * To use a real photo: put a file with the right name in public/images - no code change.
 */

const C = {
  brand: "#1746A2",
  deep: "#0F2F73",
  pale: "#EEF3FB",
  amber: "#F5A623",
  white: "#FFFFFF",
  steel: "#9FB3CF",
  steelDark: "#6F86A9",
  wood: "#C98A4B",
  woodLight: "#E4B987",
  woodDark: "#8B5A2B",
  green: "#2E9E6B",
  red: "#D9534F",
  teal: "#2BB3C0",
  skin: "#E8B48A",
  ink: "#1A2433",
};

type Palette = { bg: string; bg2: string; floor: string };
const PALETTES: Record<string, Palette> = {
  ...PROPERTY_PALETTES,
  plumbing: { bg: "#DCEBFA", bg2: "#EAF3FD", floor: "#BBD3F0" },
  electrical: { bg: "#FFF0D2", bg2: "#FFF8E8", floor: "#F6DFAE" },
  carpentry: { bg: "#F4E7D5", bg2: "#FBF3E8", floor: "#E2CCAA" },
  painting: { bg: "#E3ECFF", bg2: "#F1F5FF", floor: "#C9D8F7" },
  "appliance-repair": { bg: "#E6ECF6", bg2: "#F2F5FB", floor: "#CAD6EA" },
  waterproofing: { bg: "#D9F0F4", bg2: "#EAF8FA", floor: "#B5DEE6" },
  handyman: { bg: "#ECE9F8", bg2: "#F6F4FD", floor: "#D5CFEF" },
  cleaning: { bg: "#DDF4F0", bg2: "#EBFAF7", floor: "#B9E5DE" },
  "pest-control": { bg: "#E6F3DF", bg2: "#F2F9EE", floor: "#C9E3BD" },
  movers: { bg: "#FBE8D8", bg2: "#FEF3EA", floor: "#F2CDAE" },
  "home-setup": { bg: "#E4EAFA", bg2: "#F1F4FD", floor: "#C8D3F2" },
  beauty: { bg: "#FBE3EB", bg2: "#FEF1F5", floor: "#F4C5D5" },
  drivers: { bg: "#E2E9F5", bg2: "#F0F4FA", floor: "#C5D1E6" },
  "home-organization": { bg: "#E8F1E1", bg2: "#F3F8EE", floor: "#CFE2C3" },
  "office-business": { bg: "#E1E8F6", bg2: "#EFF3FB", floor: "#C4D0EA" },
  all: { bg: "#DCE7FA", bg2: "#EEF3FB", floor: "#BCCDEE" },
};

function hash(seed: string) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

/* ───────── Individual scenes (viewBox 0 0 400 300) ───────── */

function Plumbing() {
  return (
    <g>
      {/* wall tiles */}
      <g stroke="#B9CFEA" strokeWidth="1.2" opacity=".7">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="215" />)}
        {[0, 1, 2, 3, 4].map((i) => <line key={`h${i}`} x1="0" y1={i * 54} x2="400" y2={i * 54} />)}
      </g>
      {/* basin counter */}
      <rect x="70" y="182" width="260" height="22" rx="6" fill={C.white} />
      <path d="M130 182h140c0 24-16 38-40 38h-60c-24 0-40-14-40-38z" fill="#F4F8FE" stroke="#C9D8F0" strokeWidth="2" />
      {/* tap */}
      <rect x="193" y="108" width="14" height="76" rx="6" fill={C.steel} />
      <path d="M200 112h46a16 16 0 0 1 16 16v12h-14v-10a4 4 0 0 0-4-4h-44z" fill={C.steel} />
      <rect x="170" y="118" width="60" height="12" rx="6" fill={C.steelDark} />
      <circle cx="200" cy="112" r="12" fill={C.steelDark} />
      {/* handle */}
      <rect x="187" y="96" width="26" height="8" rx="4" fill={C.brand} />
      {/* water */}
      <path d="M255 146c6 10 9 15 9 20a9 9 0 0 1-18 0c0-5 3-10 9-20z" fill="#5AA9F2" />
      <path d="M255 178c4 7 6 10 6 13a6 6 0 0 1-12 0c0-3 2-6 6-13z" fill="#8CC4F8" />
      {/* pipe */}
      <rect x="40" y="238" width="250" height="18" rx="9" fill={C.steel} />
      <rect x="276" y="224" width="18" height="46" rx="9" fill={C.steel} />
      <rect x="32" y="232" width="14" height="30" rx="5" fill={C.steelDark} />
      <rect x="268" y="244" width="34" height="8" rx="4" fill={C.steelDark} />
      {/* wrench */}
      <g transform="rotate(-35 330 235)">
        <rect x="322" y="198" width="14" height="76" rx="7" fill={C.amber} />
        <path d="M313 196a18 18 0 1 1 32 0l-9 8v-12h-14v12z" fill={C.amber} />
      </g>
    </g>
  );
}

function Electrical() {
  return (
    <g>
      {/* wall plate + switches */}
      <rect x="62" y="70" width="120" height="150" rx="14" fill={C.white} stroke="#E6D3A6" strokeWidth="3" />
      <rect x="82" y="92" width="34" height="56" rx="8" fill="#F1F4FA" stroke="#CBD5E8" strokeWidth="2" />
      <rect x="86" y="96" width="26" height="26" rx="6" fill={C.brand} />
      <rect x="128" y="92" width="34" height="56" rx="8" fill="#F1F4FA" stroke="#CBD5E8" strokeWidth="2" />
      <rect x="132" y="122" width="26" height="22" rx="6" fill={C.steel} />
      <circle cx="122" cy="186" r="16" fill="#F1F4FA" stroke="#CBD5E8" strokeWidth="2" />
      <circle cx="116" cy="186" r="3" fill={C.ink} /><circle cx="128" cy="186" r="3" fill={C.ink} />
      {/* bulb */}
      <g>
        <g stroke={C.amber} strokeWidth="5" strokeLinecap="round">
          <line x1="288" y1="36" x2="288" y2="52" /><line x1="238" y1="62" x2="250" y2="72" /><line x1="338" y1="62" x2="326" y2="72" />
          <line x1="224" y1="108" x2="240" y2="108" /><line x1="352" y1="108" x2="336" y2="108" />
        </g>
        <circle cx="288" cy="108" r="40" fill="#FFE29A" />
        <circle cx="288" cy="108" r="26" fill={C.amber} opacity=".9" />
        <path d="M278 112l8-14 8 14 8-14" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="270" y="146" width="36" height="22" rx="6" fill={C.steel} />
        <rect x="274" y="166" width="28" height="10" rx="5" fill={C.steelDark} />
      </g>
      {/* cable */}
      <path d="M182 190c40 0 30 50 80 50s40-30 90-30" stroke={C.deep} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M182 190c40 0 30 50 80 50s40-30 90-30" stroke={C.amber} strokeWidth="2.5" fill="none" strokeDasharray="2 12" strokeLinecap="round" />
      {/* bolt */}
      <path d="M320 168l-26 40h20l-10 38 36-50h-22z" fill={C.amber} stroke="#E0950F" strokeWidth="2" strokeLinejoin="round" />
    </g>
  );
}

function Carpentry() {
  return (
    <g>
      {/* planks */}
      <g>
        <rect x="46" y="170" width="250" height="34" rx="5" fill={C.wood} />
        <rect x="46" y="204" width="250" height="34" rx="5" fill={C.woodLight} />
        <path d="M70 185c30-6 50 6 90 0M170 222c34-6 60 6 110 0" stroke={C.woodDark} strokeWidth="2" fill="none" opacity=".5" strokeLinecap="round" />
        <circle cx="236" cy="186" r="6" fill="none" stroke={C.woodDark} strokeWidth="2" opacity=".6" />
      </g>
      {/* saw */}
      <g transform="rotate(-20 220 120)">
        <path d="M120 90h170l14 20v10H120z" fill="#DDE5F3" stroke={C.steelDark} strokeWidth="2" />
        <path d="M120 120l10 10 10-10 10 10 10-10 10 10 10-10 10 10 10-10 10 10 10-10 10 10 10-10 10 10 10-10v-0z" fill={C.steelDark} />
        <rect x="294" y="84" width="46" height="46" rx="12" fill={C.brand} />
        <rect x="306" y="98" width="22" height="18" rx="5" fill={C.pale} />
      </g>
      {/* hammer */}
      <g transform="rotate(30 330 220)">
        <rect x="324" y="190" width="12" height="80" rx="6" fill={C.woodDark} />
        <rect x="302" y="176" width="58" height="22" rx="6" fill={C.steelDark} />
        <rect x="346" y="178" width="22" height="18" rx="4" fill={C.steel} />
      </g>
      {/* ruler */}
      <rect x="60" y="136" width="130" height="20" rx="4" fill={C.amber} />
      <g stroke={C.ink} strokeWidth="1.5">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => <line key={i} x1={72 + i * 10} y1="136" x2={72 + i * 10} y2={i % 2 ? 144 : 150} />)}
      </g>
    </g>
  );
}

function Painting() {
  return (
    <g>
      {/* painted wall swatch */}
      <rect x="40" y="60" width="200" height="120" rx="10" fill="#fff" />
      <rect x="40" y="60" width="200" height="64" rx="10" fill={C.brand} />
      <path d="M40 124h200v8c-30 10-60-6-100 4s-70-4-100 2z" fill={C.brand} />
      {/* roller */}
      <g>
        <rect x="150" y="62" width="130" height="38" rx="12" fill={C.amber} />
        <rect x="156" y="70" width="40" height="6" rx="3" fill="#fff" opacity=".5" />
        <path d="M280 81h26a10 10 0 0 1 10 10v22a10 10 0 0 1-10 10h-52" fill="none" stroke={C.steelDark} strokeWidth="6" strokeLinecap="round" />
        <rect x="244" y="118" width="14" height="76" rx="6" fill={C.woodDark} />
      </g>
      {/* paint can */}
      <g>
        <path d="M70 186h92l-8 66a8 8 0 0 1-8 7H86a8 8 0 0 1-8-7z" fill="#E7EDF8" stroke={C.steel} strokeWidth="2" />
        <ellipse cx="116" cy="186" rx="46" ry="10" fill={C.brand} />
        <path d="M78 196c4 14 8 24 8 34" stroke={C.brand} strokeWidth="7" strokeLinecap="round" fill="none" />
        <rect x="88" y="214" width="56" height="18" rx="4" fill={C.amber} />
      </g>
      {/* brush */}
      <g transform="rotate(25 320 220)">
        <rect x="312" y="170" width="16" height="64" rx="8" fill={C.woodDark} />
        <rect x="306" y="226" width="28" height="16" rx="3" fill={C.steel} />
        <path d="M306 242h28l-4 26h-20z" fill="#2F5FC7" />
      </g>
    </g>
  );
}

function Appliance() {
  return (
    <g>
      {/* washing machine */}
      <rect x="92" y="52" width="150" height="180" rx="16" fill="#fff" stroke="#C5D2E8" strokeWidth="3" />
      <rect x="92" y="52" width="150" height="34" rx="16" fill="#EEF3FB" />
      <circle cx="118" cy="69" r="7" fill={C.brand} /><circle cx="140" cy="69" r="7" fill={C.steel} />
      <rect x="190" y="63" width="36" height="12" rx="6" fill={C.steel} />
      <circle cx="167" cy="156" r="52" fill="#D9E6FA" stroke="#B0C4E6" strokeWidth="6" />
      <circle cx="167" cy="156" r="38" fill="#7FB0F0" />
      <path d="M135 160c10-10 20 10 32 0s22 10 32 0" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" opacity=".8" />
      {/* gear */}
      <g transform="translate(300 100)">
        <circle r="38" fill={C.amber} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <rect key={a} x="-8" y="-50" width="16" height="18" rx="4" fill={C.amber} transform={`rotate(${a})`} />)}
        <circle r="16" fill="#FFF6E3" />
      </g>
      {/* screwdriver */}
      <g transform="rotate(35 300 220)">
        <rect x="292" y="176" width="16" height="44" rx="8" fill={C.brand} />
        <rect x="297" y="218" width="6" height="52" rx="3" fill={C.steelDark} />
      </g>
      {/* spark */}
      <path d="M262 52l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" fill="#fff" />
    </g>
  );
}

function Waterproofing() {
  return (
    <g>
      {/* house */}
      <path d="M70 150l130-84 130 84v82a8 8 0 0 1-8 8H78a8 8 0 0 1-8-8z" fill="#fff" stroke="#BCD8DF" strokeWidth="3" />
      <path d="M52 156l148-96 148 96" stroke={C.brand} strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="168" y="170" width="64" height="70" rx="6" fill={C.brand} />
      <circle cx="220" cy="206" r="4" fill={C.amber} />
      <rect x="98" y="168" width="44" height="40" rx="5" fill="#CFE8F0" stroke="#9CC5D0" strokeWidth="2" />
      <rect x="258" y="168" width="44" height="40" rx="5" fill="#CFE8F0" stroke="#9CC5D0" strokeWidth="2" />
      {/* shield */}
      <path d="M200 20c22 12 40 14 54 14 0 40-14 64-54 80-40-16-54-40-54-80 14 0 32-2 54-14z" fill={C.teal} opacity=".95" />
      <path d="M178 66l16 16 30-32" stroke="#fff" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* rain */}
      <g fill="#5AA9F2" opacity=".85">
        {[[40, 40], [90, 20], [320, 46], [360, 90], [30, 100]].map(([x, y], i) => <path key={i} d={`M${x} ${y}c5 8 7 12 7 16a7 7 0 0 1-14 0c0-4 2-8 7-16z`} />)}
      </g>
    </g>
  );
}

function Handyman() {
  return (
    <g>
      {/* toolbox */}
      <rect x="86" y="150" width="228" height="96" rx="14" fill={C.brand} />
      <rect x="86" y="150" width="228" height="26" rx="12" fill={C.deep} />
      <path d="M150 150v-18a10 10 0 0 1 10-10h80a10 10 0 0 1 10 10v18" fill="none" stroke={C.deep} strokeWidth="10" />
      <rect x="180" y="168" width="40" height="24" rx="5" fill={C.amber} />
      <rect x="196" y="176" width="8" height="8" rx="2" fill={C.deep} />
      {/* tools peeking out */}
      <g transform="rotate(-12 130 120)"><rect x="122" y="60" width="14" height="90" rx="7" fill={C.steelDark} /><rect x="114" y="48" width="30" height="20" rx="6" fill={C.amber} /></g>
      <g transform="rotate(14 270 110)"><rect x="262" y="52" width="14" height="100" rx="6" fill={C.woodDark} /><rect x="244" y="44" width="50" height="20" rx="6" fill={C.steel} /></g>
      <g transform="rotate(4 200 100)"><path d="M190 128V70a10 10 0 1 1 20 0v58z" fill="#fff" stroke={C.steel} strokeWidth="3" /><rect x="194" y="96" width="12" height="6" rx="2" fill={C.brand} /></g>
      {/* screws */}
      <g fill={C.steel}><circle cx="52" cy="236" r="8" /><circle cx="348" cy="226" r="8" /><circle cx="338" cy="262" r="6" /></g>
    </g>
  );
}

function Cleaning() {
  return (
    <g>
      {/* bucket */}
      <path d="M96 150h120l-12 92a10 10 0 0 1-10 8h-76a10 10 0 0 1-10-8z" fill={C.brand} />
      <path d="M96 150c10-34 110-34 120 0" fill="none" stroke={C.deep} strokeWidth="8" />
      <ellipse cx="156" cy="150" rx="60" ry="12" fill="#8FD4F0" />
      <rect x="116" y="186" width="80" height="22" rx="6" fill="#fff" opacity=".9" />
      {/* bubbles */}
      <g fill="#fff" stroke="#7CC6E4" strokeWidth="2">
        <circle cx="128" cy="130" r="14" /><circle cx="168" cy="116" r="20" /><circle cx="196" cy="140" r="11" /><circle cx="236" cy="76" r="9" /><circle cx="64" cy="100" r="8" />
      </g>
      {/* spray bottle */}
      <g>
        <rect x="262" y="118" width="62" height="120" rx="14" fill="#E3F6F2" stroke="#9ED8CC" strokeWidth="3" />
        <rect x="262" y="170" width="62" height="30" fill={C.teal} opacity=".7" />
        <rect x="278" y="90" width="30" height="32" rx="6" fill={C.brand} />
        <path d="M278 100h-30a8 8 0 0 0-8 8v8h38" fill={C.deep} />
        <path d="M232 98l-18-8M230 110l-20 0M232 122l-18 8" stroke={C.teal} strokeWidth="4" strokeLinecap="round" />
      </g>
      {/* sparkles */}
      <g fill={C.amber}>
        <path d="M350 60l6 14 14 6-14 6-6 14-6-14-14-6 14-6z" />
        <path d="M50 190l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" />
        <path d="M330 170l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
      </g>
    </g>
  );
}

function Pest() {
  return (
    <g>
      {/* spray can */}
      <rect x="82" y="96" width="76" height="148" rx="16" fill="#fff" stroke="#BBD7AE" strokeWidth="3" />
      <rect x="82" y="150" width="76" height="52" fill={C.green} />
      <path d="M100 176l12-12 12 12-12 12z" fill="#fff" opacity=".9" />
      <rect x="102" y="66" width="36" height="34" rx="8" fill={C.deep} />
      <rect x="130" y="76" width="30" height="10" rx="5" fill={C.steelDark} />
      {/* mist */}
      <g fill="#B8DCA8" opacity=".9"><circle cx="180" cy="84" r="9" /><circle cx="202" cy="76" r="7" /><circle cx="196" cy="98" r="6" /><circle cx="222" cy="88" r="5" /></g>
      {/* bug in prohibition circle */}
      <circle cx="288" cy="150" r="64" fill="#fff" stroke={C.red} strokeWidth="12" />
      <g fill={C.ink}>
        <ellipse cx="288" cy="156" rx="22" ry="30" />
        <circle cx="288" cy="120" r="12" />
      </g>
      <g stroke={C.ink} strokeWidth="5" strokeLinecap="round">
        <path d="M268 140l-22-10M268 158l-26 2M270 176l-20 14M308 140l22-10M308 158l26 2M306 176l20 14M282 110l-8-14M294 110l8-14" />
      </g>
      <line x1="244" y1="106" x2="332" y2="194" stroke={C.red} strokeWidth="12" strokeLinecap="round" />
      {/* leaf */}
      <path d="M44 236c0-34 24-54 56-56-2 32-22 56-56 56z" fill={C.green} opacity=".85" />
    </g>
  );
}

function Movers() {
  return (
    <g>
      {/* boxes */}
      <g>
        <rect x="52" y="168" width="96" height="74" rx="6" fill="#D9A56A" />
        <rect x="52" y="168" width="96" height="16" fill="#C48B4E" />
        <rect x="88" y="168" width="24" height="30" fill="#F1D9B4" />
        <rect x="124" y="108" width="84" height="64" rx="6" fill="#E3B67E" />
        <rect x="124" y="108" width="84" height="14" fill="#CFA06A" />
        <rect x="150" y="108" width="22" height="26" fill="#F4E1C3" />
        <rect x="160" y="190" width="70" height="52" rx="6" fill="#C9935B" />
        <rect x="160" y="190" width="70" height="12" fill="#B6803F" />
      </g>
      {/* truck */}
      <g transform="translate(150 130)">
        <rect x="46" y="22" width="120" height="76" rx="8" fill="#fff" stroke="#E8C9A8" strokeWidth="3" />
        <path d="M166 40h38l22 26v32h-60z" fill={C.brand} />
        <path d="M180 48h20l14 18h-34z" fill="#CFE0FA" />
        <circle cx="86" cy="104" r="16" fill={C.ink} /><circle cx="86" cy="104" r="6" fill={C.steel} />
        <circle cx="196" cy="104" r="16" fill={C.ink} /><circle cx="196" cy="104" r="6" fill={C.steel} />
        <rect x="60" y="40" width="70" height="12" rx="6" fill={C.amber} />
        <rect x="60" y="60" width="44" height="8" rx="4" fill={C.pale} />
      </g>
      <path d="M40 252h330" stroke="#E5C3A0" strokeWidth="4" strokeLinecap="round" strokeDasharray="12 10" />
    </g>
  );
}

function HomeSetup() {
  return (
    <g>
      {/* TV on wall */}
      <rect x="60" y="48" width="220" height="130" rx="10" fill={C.ink} />
      <rect x="68" y="56" width="204" height="114" rx="6" fill={C.brand} />
      <path d="M68 150l50-44 40 32 36-26 78 48v6H68z" fill={C.deep} opacity=".6" />
      <circle cx="226" cy="92" r="14" fill={C.amber} />
      <rect x="150" y="178" width="40" height="8" rx="3" fill={C.steelDark} />
      {/* shelf */}
      <rect x="40" y="226" width="320" height="14" rx="5" fill={C.wood} />
      <rect x="64" y="196" width="26" height="30" rx="4" fill={C.teal} />
      <rect x="96" y="206" width="20" height="20" rx="4" fill={C.amber} />
      <path d="M296 226c0-26 8-40 24-46 6 20 6 34-4 46z" fill={C.green} /><path d="M314 226c2-22 14-34 30-36-2 18-10 30-26 36z" fill="#58C08C" />
      <rect x="296" y="222" width="56" height="8" rx="3" fill={C.woodDark} />
      {/* wrench icon */}
      <g transform="rotate(30 330 120)"><rect x="323" y="84" width="14" height="70" rx="7" fill={C.steelDark} /><circle cx="330" cy="82" r="14" fill={C.steelDark} /><rect x="326" y="66" width="8" height="16" fill="#E6ECFA" /></g>
    </g>
  );
}

function Beauty() {
  return (
    <g>
      {/* mirror */}
      <ellipse cx="170" cy="116" rx="70" ry="84" fill="#fff" stroke={C.amber} strokeWidth="10" />
      <ellipse cx="170" cy="116" rx="56" ry="70" fill="#FCE5EE" />
      <path d="M130 90c20-24 56-24 80 0" stroke="#fff" strokeWidth="6" fill="none" opacity=".8" strokeLinecap="round" />
      <rect x="156" y="198" width="28" height="40" rx="8" fill={C.amber} />
      <rect x="130" y="234" width="80" height="12" rx="6" fill={C.woodDark} />
      {/* brush */}
      <g transform="rotate(20 290 200)">
        <rect x="282" y="150" width="16" height="100" rx="8" fill={C.brand} />
        <ellipse cx="290" cy="140" rx="24" ry="30" fill="#F4A9C0" />
        <ellipse cx="290" cy="132" rx="14" ry="18" fill="#FBD0DE" />
      </g>
      {/* flower */}
      <g transform="translate(70 200)">
        {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-20" rx="12" ry="20" fill="#F4A9C0" transform={`rotate(${a})`} />)}
        <circle r="10" fill={C.amber} />
      </g>
      <g fill="#fff"><circle cx="330" cy="60" r="6" /><circle cx="48" cy="70" r="5" /></g>
    </g>
  );
}

function Drivers() {
  return (
    <g>
      {/* road */}
      <path d="M0 214h400v86H0z" fill="#B6C4DC" />
      <path d="M0 256h400" stroke="#fff" strokeWidth="5" strokeDasharray="30 22" />
      {/* car */}
      <g transform="translate(60 100)">
        <path d="M20 90l22-48a16 16 0 0 1 14-10h128a16 16 0 0 1 14 8l30 50z" fill={C.brand} />
        <path d="M54 48h54v38H40zM118 48h60l22 38h-82z" fill="#CFE0FA" />
        <rect x="0" y="86" width="248" height="46" rx="14" fill={C.deep} />
        <rect x="12" y="98" width="30" height="12" rx="6" fill={C.amber} />
        <rect x="208" y="98" width="30" height="12" rx="6" fill="#FFE29A" />
        <circle cx="62" cy="136" r="22" fill={C.ink} /><circle cx="62" cy="136" r="9" fill={C.steel} />
        <circle cx="188" cy="136" r="22" fill={C.ink} /><circle cx="188" cy="136" r="9" fill={C.steel} />
      </g>
      {/* location pin */}
      <g transform="translate(300 28)"><path d="M22 0C10 0 0 10 0 22c0 16 22 38 22 38s22-22 22-38C44 10 34 0 22 0z" fill={C.amber} /><circle cx="22" cy="22" r="9" fill="#fff" /></g>
    </g>
  );
}

function Organization() {
  return (
    <g>
      {/* shelves */}
      <rect x="50" y="40" width="300" height="200" rx="8" fill="#fff" stroke="#C9DDBB" strokeWidth="3" />
      <rect x="50" y="108" width="300" height="8" fill={C.wood} /><rect x="50" y="174" width="300" height="8" fill={C.wood} />
      {/* top shelf */}
      <rect x="70" y="66" width="46" height="42" rx="5" fill={C.brand} /><rect x="124" y="78" width="34" height="30" rx="5" fill={C.amber} /><rect x="166" y="60" width="26" height="48" rx="5" fill={C.teal} /><rect x="200" y="82" width="60" height="26" rx="5" fill={C.green} /><rect x="270" y="70" width="60" height="38" rx="5" fill="#B7C9EE" />
      {/* mid shelf: baskets */}
      <path d="M76 124h84l-6 50H82z" fill={C.woodLight} /><path d="M76 124h84" stroke={C.woodDark} strokeWidth="4" /><path d="M88 138h60M86 152h64" stroke={C.woodDark} strokeWidth="2" opacity=".5" />
      <path d="M180 124h70l-5 50h-60z" fill="#BFD3F5" /><rect x="190" y="136" width="50" height="14" rx="4" fill="#fff" />
      <rect x="274" y="130" width="56" height="44" rx="6" fill={C.red} opacity=".85" /><rect x="286" y="142" width="32" height="8" rx="3" fill="#fff" />
      {/* bottom */}
      <rect x="70" y="192" width="90" height="42" rx="6" fill="#DDE8D4" /><rect x="82" y="204" width="66" height="8" rx="3" fill="#fff" />
      <path d="M210 234c0-24 6-38 22-44 6 20 6 34-4 44z" fill={C.green} /><path d="M232 234c2-20 12-32 28-34-2 16-10 28-24 34z" fill="#58C08C" />
      <rect x="204" y="228" width="60" height="8" rx="3" fill={C.woodDark} />
      <rect x="290" y="198" width="44" height="36" rx="5" fill={C.amber} />
    </g>
  );
}

function Office() {
  return (
    <g>
      {/* buildings */}
      <rect x="236" y="40" width="110" height="200" rx="8" fill="#fff" stroke="#BCC9E6" strokeWidth="3" />
      <g fill="#CFDDF7">
        {[0, 1, 2, 3, 4].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={252 + c * 30} y={58 + r * 36} width="20" height="24" rx="3" />))}
      </g>
      <rect x="276" y="198" width="30" height="42" rx="3" fill={C.brand} />
      <rect x="170" y="100" width="76" height="140" rx="6" fill="#DCE6FA" stroke="#BCC9E6" strokeWidth="3" />
      <g fill="#fff">{[0, 1, 2, 3].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={182 + c * 30} y={116 + r * 30} width="18" height="18" rx="3" />))}</g>
      {/* desk + monitor */}
      <rect x="40" y="198" width="150" height="14" rx="5" fill={C.wood} />
      <rect x="52" y="212" width="10" height="28" fill={C.woodDark} /><rect x="168" y="212" width="10" height="28" fill={C.woodDark} />
      <rect x="64" y="124" width="92" height="62" rx="6" fill={C.ink} />
      <rect x="70" y="130" width="80" height="50" rx="3" fill={C.brand} />
      <path d="M78 168l16-16 14 10 18-18 18 20v8H78z" fill="#6D93E0" opacity=".7" />
      <rect x="102" y="186" width="24" height="12" fill={C.steelDark} />
      {/* check badge */}
      <circle cx="60" cy="72" r="26" fill={C.amber} /><path d="M48 72l9 9 16-18" stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function All() {
  return (
    <g>
      <g transform="translate(60 56)"><rect width="110" height="110" rx="24" fill={C.brand} /><path d="M30 76l25-34 25 34" stroke="#fff" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" /><rect x="44" y="76" width="22" height="16" fill="#fff" /></g>
      <g transform="translate(200 40)"><rect width="100" height="100" rx="24" fill={C.amber} /><path d="M50 26l10 22 24 4-18 16 5 24-21-12-21 12 5-24-18-16 24-4z" fill="#fff" /></g>
      <g transform="translate(150 150)"><rect width="100" height="100" rx="24" fill="#fff" stroke="#BCCDEE" strokeWidth="3" /><circle cx="50" cy="50" r="22" fill={C.pale} /><path d="M38 50l9 9 17-20" stroke={C.brand} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
      <g transform="translate(290 150)"><rect width="76" height="76" rx="20" fill={C.teal} /><path d="M20 38h36M38 20v36" stroke="#fff" strokeWidth="8" strokeLinecap="round" /></g>
    </g>
  );
}

const SCENES: Record<string, () => React.JSX.Element> = {
  ...PROPERTY_SCENES,
  plumbing: Plumbing,
  electrical: Electrical,
  carpentry: Carpentry,
  painting: Painting,
  "appliance-repair": Appliance,
  waterproofing: Waterproofing,
  handyman: Handyman,
  cleaning: Cleaning,
  "pest-control": Pest,
  movers: Movers,
  "home-setup": HomeSetup,
  beauty: Beauty,
  drivers: Drivers,
  "home-organization": Organization,
  "office-business": Office,
  all: All,
};

/**
 * 4:3 picture for a service, category, package, listing or type.
 *  - `photo`: the slot of this exact item, e.g. imageKey.service("pipe-leakage-repair"). Used if that file exists.
 *  - otherwise the picture of its `category` (or rentals type) is used if that file exists,
 *  - otherwise (or with `illustration`) the scene is drawn here. `seed` varies the backdrop so cards differ.
 */
export function ServiceScene({ category, seed = "", className, label, photo, illustration }: { category: string; seed?: string; className?: string; label?: string; photo?: string; illustration?: boolean }) {
  const Scene = SCENES[category] ?? All;
  const p = PALETTES[category] ?? PALETTES.all;
  const h = hash(seed || category);
  const flip = h % 2 === 1 && category !== "drivers";
  const uid = React.useId().replace(/:/g, "");
  const dots = h % 3;
  const file = illustration ? undefined : pickImage(photo, imageKey.category(category), imageKey.rental(category));
  if (file) return <SiteImage src={file} alt={label ?? ""} className={className} />;
  return (
    <svg viewBox="0 0 400 300" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} preserveAspectRatio="xMidYMid slice" className={cn("block h-full w-full", className)}>
      <defs>
        <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.bg2} /><stop offset="1" stopColor={p.bg} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#bg${uid})`} />
      {dots === 0 && <circle cx="360" cy="40" r="70" fill="#fff" opacity=".45" />}
      {dots === 1 && <circle cx="40" cy="260" r="80" fill="#fff" opacity=".4" />}
      {dots === 2 && <rect x="-30" y="-30" width="140" height="140" rx="40" fill="#fff" opacity=".35" transform="rotate(20)" />}
      <rect y="246" width="400" height="54" fill={p.floor} opacity=".55" />
      <g transform={flip ? "translate(400 0) scale(-1 1)" : undefined}>
        <Scene />
      </g>
    </svg>
  );
}

/* ───────── Hero scene: Kathmandu-style brick home + friendly technician ───────── */
export function HeroScene({ className }: { className?: string }) {
  const file = pickImage(imageKey.hero);
  if (file) return <SiteImage src={file} alt="Famous Services" priority sizes="(min-width:1024px) 560px, 90vw" className={cn("rounded-[32px]", className)} />;
  return (
    <svg viewBox="0 0 560 520" role="img" aria-label="Illustration: a service professional with a toolbox standing at the door of a brick home in Kathmandu Valley" className={cn("block h-full w-full", className)}>
      <defs>
        <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#CFE0FA" /><stop offset="1" stopColor="#F3F7FE" /></linearGradient>
        <linearGradient id="hs-brick" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#C4704F" /><stop offset="1" stopColor="#A95A3E" /></linearGradient>
      </defs>
      <rect width="560" height="520" rx="32" fill="url(#hs-sky)" />
      {/* sun + clouds */}
      <circle cx="456" cy="96" r="44" fill="#FFE29A" opacity=".9" />
      <g fill="#fff"><ellipse cx="130" cy="86" rx="46" ry="16" /><ellipse cx="160" cy="76" rx="34" ry="16" /><ellipse cx="400" cy="170" rx="40" ry="12" opacity=".8" /></g>
      {/* himalaya */}
      <path d="M0 300l70-96 40 50 70-110 80 120 60-70 70 100 70-60 100 80v186H0z" fill="#B7CCEE" />
      <path d="M180 144l-26 36 18-8 12 12 14-12 10 8z M70 204l-20 28 14-6 10 8 10-8z" fill="#fff" opacity=".9" />
      <path d="M0 340l100-40 90 30 120-50 130 44 120-20v216H0z" fill="#9DB8E3" />
      {/* ground */}
      <rect y="440" width="560" height="80" fill="#DCE8D4" />
      <rect y="440" width="560" height="10" fill="#C8DABC" />
      {/* house */}
      <g>
        {/* roof tiers */}
        <path d="M70 196l210-84 210 84z" fill="#7C3F2B" />
        <path d="M70 196h420v14H70z" fill="#5E2E1F" />
        <path d="M120 150l160-64 160 64z" fill="#8E4A33" opacity=".0" />
        {/* walls */}
        <rect x="90" y="210" width="380" height="230" fill="url(#hs-brick)" />
        <g stroke="#8E4A33" strokeWidth="1.5" opacity=".55">
          {Array.from({ length: 11 }).map((_, i) => <line key={i} x1="90" y1={222 + i * 20} x2="470" y2={222 + i * 20} />)}
        </g>
        {/* carved wooden windows (Newari-inspired lattice) */}
        {[130, 366].map((x) => (
          <g key={x}>
            <rect x={x} y="238" width="64" height="86" rx="4" fill="#4B2A1B" />
            <rect x={x + 6} y="244" width="52" height="74" rx="2" fill="#7A4630" />
            <g stroke="#D9A066" strokeWidth="2.5">
              {[0, 1, 2, 3].map((i) => <line key={`v${i}`} x1={x + 16 + i * 11} y1="246" x2={x + 16 + i * 11} y2="316" />)}
              {[0, 1, 2, 3, 4, 5].map((i) => <line key={`h${i}`} x1={x + 8} y1={254 + i * 12} x2={x + 56} y2={254 + i * 12} />)}
            </g>
            <rect x={x - 6} y="324" width="76" height="8" rx="3" fill="#4B2A1B" />
          </g>
        ))}
        {/* door */}
        <rect x="246" y="316" width="70" height="124" rx="6" fill="#4B2A1B" />
        <rect x="254" y="324" width="54" height="116" rx="3" fill="#7A4630" />
        <circle cx="299" cy="386" r="3.5" fill="#F5A623" />
        <path d="M262 340h38v14h-38z" fill="#D9A066" opacity=".6" />
        {/* upper balcony window */}
        <rect x="248" y="232" width="66" height="62" rx="4" fill="#4B2A1B" /><rect x="254" y="238" width="54" height="50" rx="2" fill="#CFE0FA" />
        <line x1="281" y1="238" x2="281" y2="288" stroke="#4B2A1B" strokeWidth="4" />
        {/* prayer flags string */}
        <path d="M90 214q95 40 190 0t190 0" stroke="#1A2433" strokeWidth="1.5" fill="none" opacity=".5" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => { const x = 110 + i * 36; return <rect key={i} x={x} y={222 + Math.sin(i * 0.6) * 6} width="12" height="14" rx="2" fill={["#1746A2", "#fff", "#C0392B", "#2E9E6B", "#F5A623"][i % 5]} />; })}
      </g>
      {/* plants */}
      <g><path d="M66 440c0-40 12-62 34-70 6 34-2 58-34 70z" fill="#2E9E6B" /><path d="M96 440c-2-30 8-50 28-58 2 26-6 46-28 58z" fill="#58C08C" /><rect x="58" y="432" width="56" height="12" rx="4" fill="#8B5A2B" /></g>
      <g><path d="M470 440c0-34 10-52 30-60 4 28-2 48-30 60z" fill="#2E9E6B" /><rect x="462" y="432" width="52" height="12" rx="4" fill="#8B5A2B" /></g>
      {/* professional */}
      <g transform="translate(370 300)">
        {/* legs */}
        <rect x="26" y="118" width="22" height="86" rx="8" fill="#0F2F73" /><rect x="54" y="118" width="22" height="86" rx="8" fill="#123A88" />
        <rect x="20" y="196" width="34" height="14" rx="6" fill="#1A2433" /><rect x="52" y="196" width="34" height="14" rx="6" fill="#1A2433" />
        {/* torso */}
        <path d="M14 56c0-14 10-22 24-22h24c14 0 24 8 24 22v70H14z" fill="#1746A2" />
        <rect x="14" y="108" width="72" height="12" fill="#F5A623" />
        <path d="M38 34h24l-12 22z" fill="#EEF3FB" />
        {/* arms */}
        <path d="M14 58l-16 52 16 6 14-40z" fill="#1746A2" /><circle cx="-2" cy="114" r="9" fill="#E8B48A" />
        <path d="M86 58l22 30-12 20-24-26z" fill="#1746A2" /><circle cx="100" cy="112" r="9" fill="#E8B48A" />
        {/* toolbox */}
        <g transform="translate(78 108)"><rect width="52" height="38" rx="6" fill="#C0392B" /><rect y="0" width="52" height="10" rx="5" fill="#9E2E22" /><rect x="18" y="-10" width="16" height="12" rx="4" fill="none" stroke="#9E2E22" strokeWidth="4" /><rect x="20" y="16" width="12" height="9" rx="2" fill="#F5A623" /></g>
        {/* head */}
        <rect x="42" y="20" width="16" height="16" rx="6" fill="#D49A70" />
        <circle cx="50" cy="8" r="24" fill="#E8B48A" />
        <path d="M26 2a24 24 0 0 1 48 0z" fill="#F5A623" /><rect x="22" y="0" width="56" height="8" rx="4" fill="#E0950F" />
        <circle cx="41" cy="14" r="2.6" fill="#1A2433" /><circle cx="59" cy="14" r="2.6" fill="#1A2433" />
        <path d="M42 24q8 7 16 0" stroke="#1A2433" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
