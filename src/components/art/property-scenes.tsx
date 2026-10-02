import * as React from "react";

/**
 * Original flat-vector scenes for the Rentals & Property section (viewBox 0 0 400 300, floor line at y≈246).
 * Registered into ServiceScene via SCENES / PALETTES in scenes.tsx. Replace with real photos once available.
 */
const K = {
  brand: "#1746A2", deep: "#0F2F73", pale: "#EEF3FB", amber: "#F5A623", white: "#FFFFFF",
  steel: "#9FB3CF", steelDark: "#6F86A9", wood: "#C98A4B", woodLight: "#E4B987", woodDark: "#8B5A2B",
  green: "#2E9E6B", greenLight: "#8FD0A8", greenDark: "#1F7A52", teal: "#2BB3C0", ink: "#1A2433",
  brick: "#B8654A", brickDark: "#9A4F37", sky: "#CFE0FA", cream: "#F7EFE2", grey: "#C5CEDB", greyDark: "#8896AB",
};

function Window({ x, y, w = 90, h = 100 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g>
      <rect x={x - 6} y={y - 6} width={w + 12} height={h + 12} rx="6" fill="#fff" stroke="#C9D8F0" strokeWidth="3" />
      <rect x={x} y={y} width={w} height={h} rx="3" fill={K.sky} />
      <path d={`M${x + w / 2} ${y}v${h}M${x} ${y + h / 2}h${w}`} stroke="#fff" strokeWidth="4" />
      <circle cx={x + w * 0.24} cy={y + h * 0.28} r="9" fill="#FFE29A" />
    </g>
  );
}

export function RoomSingle() {
  return (
    <g>
      <rect x="0" y="0" width="400" height="246" fill="#F4F7FD" />
      <Window x={236} y={44} />
      <path d="M226 40c-8 40-8 80 0 118h14c-6-38-6-78 0-118z" fill={K.brand} opacity=".85" />
      {/* bed */}
      <rect x="40" y="150" width="14" height="96" rx="4" fill={K.woodDark} />
      <rect x="46" y="190" width="170" height="14" rx="4" fill={K.wood} />
      <rect x="54" y="168" width="154" height="30" rx="10" fill="#fff" stroke="#D7E0EF" strokeWidth="2" />
      <rect x="92" y="170" width="116" height="30" rx="10" fill={K.brand} />
      <rect x="62" y="158" width="44" height="20" rx="9" fill="#fff" stroke="#D7E0EF" strokeWidth="2" />
      <rect x="50" y="204" width="10" height="42" fill={K.woodDark} /><rect x="202" y="204" width="10" height="42" fill={K.woodDark} />
      {/* wardrobe */}
      <rect x="296" y="96" width="76" height="150" rx="6" fill={K.woodLight} stroke={K.woodDark} strokeWidth="3" />
      <path d="M334 96v150" stroke={K.woodDark} strokeWidth="3" />
      <rect x="326" y="160" width="5" height="22" rx="2" fill={K.woodDark} /><rect x="337" y="160" width="5" height="22" rx="2" fill={K.woodDark} />
      {/* lamp */}
      <rect x="232" y="206" width="38" height="40" rx="5" fill={K.wood} /><rect x="248" y="178" width="6" height="28" fill={K.steelDark} /><path d="M236 180l12-22 12 22z" fill={K.amber} />
    </g>
  );
}

export function RoomDouble() {
  return (
    <g>
      <rect x="0" y="0" width="400" height="246" fill="#F4F7FD" />
      <rect x="150" y="30" width="100" height="64" rx="6" fill="#fff" stroke="#C9D8F0" strokeWidth="3" />
      <path d="M162 80l22-26 18 18 16-12 22 20z" fill={K.greenLight} /><circle cx="226" cy="48" r="6" fill="#FFE29A" />
      {/* headboard + bed */}
      <rect x="86" y="108" width="228" height="76" rx="12" fill={K.deep} />
      <rect x="76" y="176" width="248" height="62" rx="12" fill="#fff" stroke="#D7E0EF" strokeWidth="2" />
      <rect x="76" y="198" width="248" height="42" rx="10" fill={K.brand} />
      <rect x="100" y="160" width="86" height="26" rx="11" fill="#fff" stroke="#D7E0EF" strokeWidth="2" /><rect x="214" y="160" width="86" height="26" rx="11" fill="#fff" stroke="#D7E0EF" strokeWidth="2" />
      <path d="M76 214h248" stroke="#fff" strokeWidth="5" opacity=".6" />
      <rect x="86" y="238" width="12" height="8" fill={K.woodDark} /><rect x="302" y="238" width="12" height="8" fill={K.woodDark} />
      {/* bedside tables with lamps */}
      <rect x="30" y="190" width="40" height="56" rx="5" fill={K.wood} /><rect x="40" y="206" width="20" height="4" fill={K.woodDark} />
      <rect x="48" y="166" width="4" height="24" fill={K.steelDark} /><path d="M36 168l14-20 14 20z" fill={K.amber} />
      <rect x="330" y="190" width="40" height="56" rx="5" fill={K.wood} /><rect x="340" y="206" width="20" height="4" fill={K.woodDark} />
      <rect x="348" y="166" width="4" height="24" fill={K.steelDark} /><path d="M336 168l14-20 14 20z" fill={K.amber} />
    </g>
  );
}

export function RoomShared() {
  const Bunk = ({ x }: { x: number }) => (
    <g>
      <rect x={x} y="78" width="9" height="168" rx="3" fill={K.woodDark} /><rect x={x + 121} y="78" width="9" height="168" rx="3" fill={K.woodDark} />
      <rect x={x} y="102" width="130" height="10" rx="3" fill={K.wood} /><rect x={x + 6} y="84" width="118" height="20" rx="8" fill="#fff" stroke="#D7E0EF" strokeWidth="2" /><rect x={x + 46} y="86" width="78" height="20" rx="8" fill={K.brand} />
      <rect x={x} y="190" width="130" height="10" rx="3" fill={K.wood} /><rect x={x + 6} y="172" width="118" height="20" rx="8" fill="#fff" stroke="#D7E0EF" strokeWidth="2" /><rect x={x + 46} y="174" width="78" height="20" rx="8" fill={K.teal} />
      <rect x={x + 112} y="64" width="14" height="14" rx="3" fill={K.amber} opacity="0" />
    </g>
  );
  return (
    <g>
      <rect x="0" y="0" width="400" height="246" fill="#F4F7FD" />
      <Window x={158} y={40} w={84} h={84} />
      <Bunk x={22} /><Bunk x={248} />
      {/* lockers */}
      <rect x="168" y="150" width="64" height="96" rx="5" fill={K.steel} stroke={K.steelDark} strokeWidth="3" />
      <path d="M200 150v96M168 198h64" stroke={K.steelDark} strokeWidth="3" />
      <circle cx="190" cy="176" r="3.5" fill="#fff" /><circle cx="210" cy="176" r="3.5" fill="#fff" /><circle cx="190" cy="222" r="3.5" fill="#fff" /><circle cx="210" cy="222" r="3.5" fill="#fff" />
    </g>
  );
}

export function RoomStudio() {
  return (
    <g>
      <rect x="0" y="0" width="400" height="246" fill="#F4F7FD" />
      {/* bed */}
      <rect x="28" y="156" width="12" height="90" rx="3" fill={K.woodDark} />
      <rect x="34" y="196" width="150" height="14" rx="4" fill={K.wood} /><rect x="40" y="176" width="138" height="26" rx="10" fill="#fff" stroke="#D7E0EF" strokeWidth="2" />
      <rect x="76" y="178" width="102" height="26" rx="10" fill={K.brand} /><rect x="46" y="166" width="36" height="18" rx="8" fill="#fff" stroke="#D7E0EF" strokeWidth="2" />
      <rect x="44" y="210" width="9" height="36" fill={K.woodDark} /><rect x="168" y="210" width="9" height="36" fill={K.woodDark} />
      <Window x={70} y={36} w={76} h={80} />
      {/* kitchen run */}
      <rect x="226" y="62" width="150" height="56" rx="6" fill="#fff" stroke="#D7E0EF" strokeWidth="3" />
      <path d="M276 62v56M326 62v56" stroke="#D7E0EF" strokeWidth="3" />
      <rect x="226" y="164" width="150" height="82" rx="4" fill={K.woodLight} stroke={K.woodDark} strokeWidth="3" />
      <rect x="220" y="154" width="162" height="14" rx="4" fill={K.steel} />
      <circle cx="252" cy="148" r="9" fill={K.ink} /><circle cx="282" cy="148" r="9" fill={K.ink} /><rect x="246" y="142" width="42" height="4" fill="none" />
      <path d="M322 154v-18h18c6 0 6 8 0 8" stroke={K.steelDark} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M300 164v82M232 190h60" stroke={K.woodDark} strokeWidth="3" />
      {/* plant */}
      <rect x="190" y="222" width="22" height="24" rx="4" fill={K.amber} /><path d="M201 222c-10-14-8-28 0-38 8 10 10 24 0 38z" fill={K.green} />
    </g>
  );
}

function FlatPlan({ two }: { two: boolean }) {
  return (
    <g transform="translate(20 20) scale(.9)">
      <rect x="46" y="28" width="308" height="212" rx="14" fill="#fff" stroke="#BCCDEE" strokeWidth="4" />
      <rect x="62" y="44" width="276" height="180" rx="6" fill="#F4F7FD" stroke={K.deep} strokeWidth="5" />
      <rect x="66" y="48" width="104" height="84" fill="#DCE9FF" />
      <rect x="170" y="48" width="64" height="84" fill="#E6F4EE" />
      <rect x="234" y="48" width="100" height="84" fill={two ? "#FFF0D2" : "#EEF3FB"} />
      <rect x="66" y="132" width="168" height="88" fill="#EEF3FB" />
      <rect x="234" y="132" width="100" height="88" fill="#E3EDF9" />
      <path d="M170 48v50M170 118v14M234 48v50M234 118v14M66 132h60M148 132h86M234 132h30M286 132h48M234 160v60" stroke={K.deep} strokeWidth="5" fill="none" />
      <rect x="86" y="62" width="64" height="48" rx="6" fill="#fff" stroke={K.brand} strokeWidth="3" /><rect x="86" y="62" width="64" height="14" rx="5" fill={K.brand} />
      <rect x="182" y="62" width="40" height="22" rx="5" fill="#fff" stroke={K.teal} strokeWidth="3" /><circle cx="202" cy="106" r="9" fill="#fff" stroke={K.teal} strokeWidth="3" />
      {two ? (
        <g><rect x="252" y="62" width="64" height="48" rx="6" fill="#fff" stroke={K.amber} strokeWidth="3" /><rect x="252" y="62" width="64" height="14" rx="5" fill={K.amber} /></g>
      ) : (
        <g><rect x="256" y="76" width="56" height="30" rx="8" fill="#fff" stroke={K.steelDark} strokeWidth="3" />{[262, 296].map((x) => <g key={x}><circle cx={x + 6} cy="68" r="6" fill={K.woodLight} /><circle cx={x + 6} cy="114" r="6" fill={K.woodLight} /></g>)}</g>
      )}
      <rect x="84" y="170" width="76" height="30" rx="8" fill={K.brand} /><rect x="96" y="150" width="52" height="16" rx="6" fill="#6D93E0" />
      <rect x="176" y="168" width="40" height="30" rx="6" fill="#fff" stroke={K.steelDark} strokeWidth="3" />
      <rect x="248" y="146" width="74" height="20" rx="4" fill={K.steel} /><circle cx="266" cy="156" r="5" fill={K.ink} /><circle cx="284" cy="156" r="5" fill={K.ink} />
      <rect x="302" y="178" width="22" height="36" rx="4" fill="#fff" stroke={K.steelDark} strokeWidth="3" />
    </g>
  );
}
export function RoomFlat() { return <FlatPlan two={false} />; }
export function RoomFlat2() { return <FlatPlan two />; }

/* ───────── Land ───────── */
function Hills({ y = 120 }: { y?: number }) {
  return (
    <g>
      <path d={`M0 ${y + 20}L60 ${y - 30}l40 34 50-62 64 70 54-48 60 54 72-44v${300 - y}H0z`} fill="#CFE0F3" />
      <path d={`M120 ${y - 28}l30-34 20 24z`} fill="#fff" opacity=".9" />
      <path d={`M0 ${y + 40}c60-30 120-10 180-24s120-22 220 6v${300 - y}H0z`} fill="#BFE0B0" />
    </g>
  );
}
export function LandResidential() {
  return (
    <g>
      <Hills y={110} />
      <path d="M0 262c120-14 260-14 400 0v38H0z" fill="#A9B3C2" /><path d="M20 276h40M100 276h40M180 276h40M260 276h40M340 276h40" stroke="#fff" strokeWidth="4" opacity=".8" />
      {/* plot */}
      <path d="M70 244l36-86h190l30 86z" fill="#9ED88A" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
      <path d="M106 158l-18 86M296 158l30 86" stroke="#7FBF6B" strokeWidth="2" opacity=".6" />
      {[[70, 244], [106, 158], [296, 158], [326, 244]].map(([x, y], i) => <g key={i}><rect x={x - 5} y={y - 14} width="10" height="18" rx="2" fill={K.deep} /><rect x={x - 5} y={y - 14} width="10" height="5" fill={K.amber} /></g>)}
      {/* dimension arrows */}
      <path d="M92 258h210" stroke={K.deep} strokeWidth="3" /><path d="M92 252v12M302 252v12" stroke={K.deep} strokeWidth="3" />
      {/* sale board */}
      <rect x="214" y="170" width="6" height="52" fill={K.woodDark} /><rect x="178" y="146" width="78" height="40" rx="6" fill={K.amber} />
      <path d="M200 174l17-14 17 14v10h-34z" fill="#fff" /><rect x="212" y="174" width="10" height="10" fill={K.amber} />
    </g>
  );
}
export function LandCommercial() {
  return (
    <g>
      <rect x="0" y="0" width="400" height="120" fill="#EAF1FB" />
      {/* skyline */}
      <g fill="#C8D6EE"><rect x="30" y="70" width="40" height="80" /><rect x="76" y="50" width="34" height="100" /><rect x="300" y="64" width="44" height="86" /><rect x="350" y="84" width="34" height="66" /></g>
      {/* highway */}
      <rect x="0" y="206" width="400" height="60" fill="#7E8CA3" /><path d="M0 236h400" stroke="#fff" strokeWidth="4" strokeDasharray="22 16" />
      <rect x="0" y="200" width="400" height="8" fill="#B7C2D4" />
      {/* plot */}
      <path d="M70 200l22-70h216l22 70z" fill="#D8E9C7" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
      <path d="M92 130h216" stroke="#fff" strokeWidth="3" strokeDasharray="8 6" />
      {[[70, 200], [92, 130], [308, 130], [330, 200]].map(([x, y], i) => <g key={i}><rect x={x - 5} y={y - 14} width="10" height="18" rx="2" fill={K.deep} /><rect x={x - 5} y={y - 14} width="10" height="5" fill={K.amber} /></g>)}
      {/* billboard */}
      <rect x="196" y="86" width="8" height="70" fill={K.steelDark} /><rect x="150" y="54" width="100" height="50" rx="6" fill={K.brand} /><rect x="162" y="66" width="46" height="8" rx="3" fill="#fff" /><rect x="162" y="80" width="76" height="6" rx="3" fill="#fff" opacity=".6" /><rect x="162" y="91" width="56" height="6" rx="3" fill="#fff" opacity=".6" />
      {/* truck */}
      <g transform="translate(250 214)"><rect width="64" height="26" rx="4" fill={K.amber} /><rect x="64" y="8" width="26" height="18" rx="4" fill={K.deep} /><circle cx="16" cy="28" r="8" fill={K.ink} /><circle cx="74" cy="28" r="8" fill={K.ink} /></g>
      <g transform="translate(46 24)"><circle cx="30" cy="30" r="0" fill="none" /></g>
    </g>
  );
}
export function LandAgri() {
  return (
    <g>
      <rect x="0" y="0" width="400" height="110" fill="#EAF4FB" /><circle cx="332" cy="58" r="30" fill="#FFE29A" />
      <path d="M0 120c70-30 120-4 190-24s140 4 210-14v218H0z" fill="#B6DC9E" />
      {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M-10 ${150 + i * 26}c90-24 180-24 230-6s130 14 190-6`} fill="none" stroke={i % 2 ? "#7FBF6B" : "#5FA851"} strokeWidth="16" strokeLinecap="round" opacity=".85" />)}
      {[0, 1, 2, 3, 4].map((i) => <path key={`c${i}`} d={`M-10 ${150 + i * 26}c90-24 180-24 230-6s130 14 190-6`} fill="none" stroke="#C7E7B0" strokeWidth="2" strokeDasharray="3 9" transform="translate(0 -4)" />)}
      {/* hut */}
      <g transform="translate(292 82)"><rect x="0" y="22" width="52" height="34" fill="#E4C9A4" /><path d="M-8 24l34-26 34 26z" fill={K.brickDark} /><rect x="20" y="34" width="14" height="22" fill={K.woodDark} /></g>
      {/* tree */}
      <rect x="70" y="86" width="8" height="38" fill={K.woodDark} /><circle cx="74" cy="76" r="26" fill={K.green} /><circle cx="56" cy="90" r="16" fill={K.greenDark} /><circle cx="92" cy="90" r="16" fill={K.greenDark} />
      {/* survey flag */}
      <rect x="200" y="196" width="5" height="48" fill={K.steelDark} /><path d="M205 196l34 10-34 12z" fill={K.amber} />
    </g>
  );
}

/* ───────── Property ───────── */
export function PropHouse() {
  return (
    <g>
      <circle cx="338" cy="60" r="34" fill="#FFE29A" opacity=".85" />
      {/* house */}
      <rect x="76" y="108" width="248" height="138" fill={K.brick} />
      <g stroke={K.brickDark} strokeWidth="2" opacity=".5">{[0, 1, 2, 3, 4, 5, 6].map((i) => <path key={i} d={`M76 ${122 + i * 18}h248`} />)}</g>
      <path d="M60 112L200 40l140 72z" fill={K.deep} /><path d="M60 112L200 40l140 72" fill="none" stroke="#fff" strokeWidth="3" opacity=".25" />
      <rect x="76" y="164" width="248" height="10" fill="#fff" opacity=".25" />
      {[[100, 126], [250, 126], [100, 184], [250, 184]].map(([x, y], i) => <g key={i}><rect x={x} y={y} width="52" height="38" rx="3" fill={K.sky} stroke="#fff" strokeWidth="4" /><path d={`M${x + 26} ${y}v38`} stroke="#fff" strokeWidth="3" /></g>)}
      <rect x="170" y="186" width="60" height="60" rx="4" fill={K.woodDark} /><circle cx="218" cy="218" r="3.5" fill={K.amber} /><path d="M200 186v60" stroke={K.wood} strokeWidth="3" />
      {/* balcony rail on top */}
      <rect x="170" y="126" width="60" height="30" rx="3" fill={K.sky} stroke="#fff" strokeWidth="4" /><path d="M170 150h60" stroke="#fff" strokeWidth="3" />
      {/* tree + fence */}
      <rect x="26" y="180" width="8" height="66" fill={K.woodDark} /><circle cx="30" cy="162" r="32" fill={K.green} /><circle cx="14" cy="182" r="18" fill={K.greenDark} />
      <path d="M52 246v-26M72 246v-26M328 246v-26M348 246v-26M368 246v-26M52 228h20M328 228h50" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}
export function PropApartment() {
  return (
    <g>
      <rect x="110" y="30" width="180" height="216" rx="8" fill="#fff" stroke="#BCCDEE" strokeWidth="4" />
      <rect x="110" y="30" width="180" height="22" rx="8" fill={K.brand} />
      {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => (
        <g key={`${r}${c}`}><rect x={126 + c * 54} y={68 + r * 40} width="40" height="24" rx="3" fill={K.sky} />
          <rect x={122 + c * 54} y={94 + r * 40} width="48" height="5" rx="2" fill={(r + c) % 2 ? K.amber : K.steel} /></g>
      )))}
      <rect x="170" y="208" width="60" height="38" rx="3" fill={K.deep} /><rect x="178" y="214" width="20" height="32" fill={K.sky} opacity=".7" /><rect x="202" y="214" width="20" height="32" fill={K.sky} opacity=".7" />
      <rect x="40" y="130" width="66" height="116" rx="6" fill="#DCE6FA" stroke="#BCCDEE" strokeWidth="3" />
      {[0, 1, 2].map((r) => <rect key={r} x="52" y={144 + r * 32} width="16" height="20" rx="2" fill="#fff" />)}{[0, 1, 2].map((r) => <rect key={`b${r}`} x="76" y={144 + r * 32} width="16" height="20" rx="2" fill="#fff" />)}
      <rect x="294" y="160" width="68" height="86" rx="6" fill="#DCE6FA" stroke="#BCCDEE" strokeWidth="3" />
      {[0, 1].map((r) => <rect key={r} x="306" y={174 + r * 34} width="16" height="22" rx="2" fill="#fff" />)}{[0, 1].map((r) => <rect key={`b${r}`} x="332" y={174 + r * 34} width="16" height="22" rx="2" fill="#fff" />)}
      {/* lift badge */}
      <g transform="translate(262 4)"><circle cx="34" cy="34" r="0" fill="none" /></g>
      <rect x="308" y="218" width="64" height="28" rx="5" fill={K.amber} /><circle cx="326" cy="248" r="6" fill={K.ink} /><circle cx="356" cy="248" r="6" fill={K.ink} />
    </g>
  );
}
export function PropCommercial() {
  return (
    <g>
      <rect x="60" y="48" width="280" height="198" rx="4" fill="#E9D8C5" stroke="#CDB79C" strokeWidth="3" />
      <rect x="60" y="48" width="280" height="30" fill={K.deep} />
      {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={78 + c * 64} y={92 + r * 30} width="40" height="18" rx="2" fill={K.sky} />))}
      {/* shopfront */}
      <path d="M60 176h280v14H60z" fill={K.amber} />
      <path d="M60 190h280l-8 14H68z" fill="#FFD27A" /><path d="M60 190l14 14M100 190l-6 14M140 190l-6 14M180 190l-6 14M220 190l-6 14M260 190l-6 14M300 190l-6 14M340 190l-6 14" stroke="#fff" strokeWidth="3" opacity=".7" />
      <rect x="76" y="206" width="104" height="40" rx="3" fill={K.sky} /><rect x="196" y="206" width="48" height="40" rx="3" fill={K.woodDark} /><rect x="260" y="206" width="64" height="40" rx="3" fill={K.sky} />
      <rect x="150" y="150" width="100" height="20" rx="4" fill="#fff" stroke={K.deep} strokeWidth="3" /><rect x="162" y="157" width="44" height="6" rx="3" fill={K.deep} opacity=".4" />
      {/* tag */}
      <g transform="translate(300 24) rotate(12)"><rect width="70" height="34" rx="8" fill={K.green} /><path d="M18 17h34" stroke="#fff" strokeWidth="6" strokeLinecap="round" /></g>
    </g>
  );
}
export function PropOffice() {
  return (
    <g>
      <rect x="64" y="34" width="190" height="212" rx="8" fill="#DCE6FA" stroke="#BCCDEE" strokeWidth="4" />
      {[0, 1, 2, 3, 4].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={80 + c * 56} y={50 + r * 36} width="44" height="26" rx="3" fill={(r * 3 + c) % 4 === 0 ? "#FFE29A" : K.sky} />))}
      <rect x="130" y="212" width="58" height="34" rx="3" fill={K.deep} />
      <rect x="112" y="204" width="94" height="8" rx="3" fill={K.amber} />
      {/* side block */}
      <rect x="254" y="110" width="84" height="136" rx="6" fill="#fff" stroke="#BCCDEE" strokeWidth="3" />
      {[0, 1, 2].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={268 + c * 34} y={126 + r * 36} width="24" height="22" rx="3" fill={K.sky} />))}
      {/* desk plant */}
      <rect x="346" y="214" width="26" height="32" rx="4" fill={K.amber} /><path d="M359 214c-12-18-8-34 0-46 8 12 12 28 0 46z" fill={K.green} />
      <circle cx="40" cy="64" r="22" fill={K.amber} /><path d="M30 64l7 7 13-14" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

export const PROPERTY_SCENES: Record<string, () => React.JSX.Element> = {
  "room-single": RoomSingle, "room-double": RoomDouble, "room-shared": RoomShared, "room-studio": RoomStudio, "room-flat": RoomFlat, "room-flat2": RoomFlat2,
  "land-residential": LandResidential, "land-commercial": LandCommercial, "land-agri": LandAgri,
  "prop-house": PropHouse, "prop-apartment": PropApartment, "prop-commercial": PropCommercial, "prop-office": PropOffice,
};
export const PROPERTY_PALETTES: Record<string, { bg: string; bg2: string; floor: string }> = {
  "room-single": { bg: "#E3ECFF", bg2: "#F2F6FF", floor: "#C9D8F7" },
  "room-double": { bg: "#E8E6F8", bg2: "#F5F4FD", floor: "#D2CEEF" },
  "room-shared": { bg: "#DDF1F4", bg2: "#EBF8FA", floor: "#B9DEE5" },
  "room-studio": { bg: "#E6EDF8", bg2: "#F3F6FC", floor: "#CCD8EC" },
  "room-flat": { bg: "#DDE8FA", bg2: "#EDF3FD", floor: "#BCCDEE" },
  "room-flat2": { bg: "#E4E6F9", bg2: "#F2F3FD", floor: "#CBCFF0" },
  "land-residential": { bg: "#E2F0F8", bg2: "#F0F7FC", floor: "#BFE0B0" },
  "land-commercial": { bg: "#E6ECF6", bg2: "#F2F5FB", floor: "#B7C2D4" },
  "land-agri": { bg: "#E4F2DA", bg2: "#F2F9EC", floor: "#B6DC9E" },
  "prop-house": { bg: "#DDEBFB", bg2: "#EEF5FD", floor: "#C9E3BD" },
  "prop-apartment": { bg: "#E4EAFA", bg2: "#F1F4FD", floor: "#C8D3F2" },
  "prop-commercial": { bg: "#FBE8D8", bg2: "#FEF3EA", floor: "#F2CDAE" },
  "prop-office": { bg: "#E1E8F6", bg2: "#EFF3FB", floor: "#C4D0EA" },
};
