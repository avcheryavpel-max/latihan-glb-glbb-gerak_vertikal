import React, { useEffect, useId, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import type { QuestionItem } from '../types/quiz';

const COLORS = {
  teal: '#0d9488',
  tealDark: '#0f766e',
  ink: '#134e4a',
  amber: '#d97706',
  crimson: '#e11d48',
  azure: '#0284c7',
  grid: '#cbeae4',
  muted: '#5e8f88',
  mint: '#f0fdfa',
};

function SvgArrowMarker({ id, color }: { id: string; color: string }) {
  return (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth="6.5"
      markerHeight="6.5"
      orient="auto-start-reverse"
    >
      <path d="M0 0L10 5L0 10z" fill={color} />
    </marker>
  );
}

function GroundHatch({ x0, x1, y }: { x0: number; x1: number; y: number }) {
  const ticks: number[] = [];
  for (let x = x0 + 8; x < x1; x += 22) {
    ticks.push(x);
  }
  return (
    <g>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke={COLORS.tealDark} strokeWidth={2} />
      {ticks.map((x) => (
        <line
          key={x}
          x1={x}
          y1={y}
          x2={x - 8}
          y2={y + 8}
          stroke={COLORS.muted}
          strokeWidth={1.2}
        />
      ))}
    </g>
  );
}

function renderSvgByQuestionId(id: number, uid: string): React.ReactNode {
  const a1 = `${uid}-a1`;
  const a2 = `${uid}-a2`;

  switch (id) {
    case 1:
      return (
        <svg viewBox="0 0 640 300" role="img" aria-label="Diagram bus listrik dan mobil patroli pada lintasan 880 m" className="w-full h-auto block">
          <defs>
            <SvgArrowMarker id={a1} color={COLORS.teal} />
            <SvgArrowMarker id={a2} color={COLORS.amber} />
          </defs>
          {/* Pos Timur & Barat buildings */}
          <rect x="44" y="118" width="24" height="78" rx="3" fill={COLORS.mint} stroke={COLORS.grid} />
          <rect x="72" y="138" width="18" height="58" rx="3" fill={COLORS.mint} stroke={COLORS.grid} />
          <rect x="548" y="128" width="22" height="68" rx="3" fill={COLORS.mint} stroke={COLORS.grid} />
          <rect x="574" y="146" width="18" height="50" rx="3" fill={COLORS.mint} stroke={COLORS.grid} />
          {/* Distance dimension */}
          <line x1="60" y1="64" x2="580" y2="64" stroke={COLORS.tealDark} strokeWidth="1.6" />
          <line x1="60" y1="58" x2="60" y2="70" stroke={COLORS.tealDark} strokeWidth="1.6" />
          <line x1="580" y1="58" x2="580" y2="70" stroke={COLORS.tealDark} strokeWidth="1.6" />
          <text x="320" y="52" fontSize="19" fill={COLORS.tealDark} textAnchor="middle" fontWeight="800">
            880 m
          </text>
          {/* Road */}
          <rect x="40" y="196" width="560" height="34" rx="6" fill="#e6f2ef" />
          <line x1="52" y1="213" x2="588" y2="213" stroke="#ffffff" strokeWidth="3" strokeDasharray="16 12" />
          {/* Bus Listrik */}
          <rect x="64" y="152" width="106" height="44" rx="9" fill={COLORS.teal} />
          <rect x="74" y="160" width="20" height="16" rx="3" fill="#eafffb" />
          <rect x="98" y="160" width="20" height="16" rx="3" fill="#eafffb" />
          <rect x="122" y="160" width="20" height="16" rx="3" fill="#eafffb" />
          <rect x="146" y="160" width="16" height="16" rx="3" fill="#ccfbf1" />
          <circle cx="88" cy="197" r="9" fill={COLORS.ink} />
          <circle cx="146" cy="197" r="9" fill={COLORS.ink} />
          <line x1="180" y1="132" x2="252" y2="132" stroke={COLORS.teal} strokeWidth="3" markerEnd={`url(#${a1})`} />
          <text x="184" y="120" fontSize="15" fill={COLORS.tealDark} fontWeight="700">
            v = 15 m/s (tetap)
          </text>
          {/* Mobil Patroli */}
          <rect x="470" y="168" width="88" height="26" rx="11" fill={COLORS.amber} />
          <rect x="490" y="152" width="46" height="20" rx="7" fill={COLORS.amber} />
          <rect x="508" y="146" width="12" height="6" rx="2" fill={COLORS.azure} />
          <rect x="496" y="156" width="15" height="12" rx="2" fill="#fff7ed" />
          <rect x="515" y="156" width="15" height="12" rx="2" fill="#fff7ed" />
          <circle cx="492" cy="196" r="8" fill={COLORS.ink} />
          <circle cx="538" cy="196" r="8" fill={COLORS.ink} />
          <line x1="462" y1="132" x2="392" y2="132" stroke={COLORS.amber} strokeWidth="3" markerEnd={`url(#${a2})`} />
          <text x="458" y="120" fontSize="15" fill={COLORS.amber} textAnchor="end" fontWeight="700">
            v₀ = 0; a = 2 m/s²
          </text>
          {/* Labels */}
          <text x="64" y="256" fontSize="17" fill={COLORS.ink} fontWeight="800">
            POS TIMUR (A)
          </text>
          <text x="64" y="276" fontSize="13" fill={COLORS.muted} fontWeight="600">
            bus berangkat t = 0 s
          </text>
          <text x="576" y="256" fontSize="17" fill={COLORS.ink} textAnchor="end" fontWeight="800">
            POS BARAT (B)
          </text>
          <text x="576" y="276" fontSize="13" fill={COLORS.muted} textAnchor="end" fontWeight="600">
            patroli berangkat t = 12 s
          </text>
        </svg>
      );

    case 2: {
      const X = (t: number) => 72 + 13 * t;
      const Y = (v: number) => 225 - 8.5 * v;
      const tTicks = [0, 6, 12, 18, 24, 30, 36, 40];
      const vTicks = [-10, -5, 0, 5, 10, 15, 20];
      const pts: [number, number][] = [
        [0, 0],
        [6, 20],
        [18, 20],
        [24, 0],
        [30, -10],
        [40, -10],
      ];
      const polyStr = pts.map(([t, v]) => `${X(t)},${Y(v)}`).join(' ');
      return (
        <svg viewBox="0 0 640 360" role="img" aria-label="Grafik kecepatan terhadap waktu trem otonom" className="w-full h-auto block">
          {tTicks.map((t) => (
            <g key={`t-${t}`}>
              <line x1={X(t)} y1="50" x2={X(t)} y2="318" stroke={COLORS.grid} strokeWidth="1" />
              <text x={X(t)} y="338" fontSize="13.5" fill={COLORS.muted} textAnchor="middle" fontWeight="600">
                {t}
              </text>
            </g>
          ))}
          {vTicks.map((v) => (
            <g key={`v-${v}`}>
              <line
                x1="72"
                y1={Y(v)}
                x2="604"
                y2={Y(v)}
                stroke={v === 0 ? COLORS.ink : COLORS.grid}
                strokeWidth={v === 0 ? 1.6 : 1}
              />
              <text
                x="60"
                y={Y(v) + 5}
                fontSize="13.5"
                fill={v === 0 ? COLORS.ink : COLORS.muted}
                textAnchor="end"
                fontWeight="600"
              >
                {v}
              </text>
            </g>
          ))}
          <line x1="72" y1="42" x2="72" y2="322" stroke={COLORS.ink} strokeWidth="1.6" />
          <polyline points={polyStr} fill="none" stroke={COLORS.teal} strokeWidth="3.5" strokeLinejoin="round" />
          {pts.map(([t, v]) => (
            <circle key={`${t}-${v}`} cx={X(t)} cy={Y(v)} r="4.5" fill={COLORS.tealDark} />
          ))}
          <text x="72" y="30" fontSize="16" fill={COLORS.ink} fontWeight="800">
            v (m/s)
          </text>
          <text x="614" y="352" fontSize="15" fill={COLORS.ink} textAnchor="end" fontWeight="800">
            t (s)
          </text>
          <text x="415" y="255" fontSize="13" fill={COLORS.crimson} fontWeight="700">
            v &lt; 0: berbalik arah
          </text>
        </svg>
      );
    }

    case 3: {
      const X = (t: number) => 72 + 21 * t;
      const Y = (a: number) => 190 - 34 * a;
      const tTicks = [0, 5, 10, 15, 20, 25];
      const aTicks: [number, string][] = [
        [4, '4'],
        [2, '2'],
        [0, '0'],
        [-2, '−2'],
      ];
      return (
        <svg viewBox="0 0 640 340" role="img" aria-label="Grafik percepatan terhadap waktu kereta ringan LRT" className="w-full h-auto block">
          {tTicks.map((t) => (
            <g key={`at-${t}`}>
              <line x1={X(t)} y1="40" x2={X(t)} y2="288" stroke={COLORS.grid} strokeWidth="1" />
              <text x={X(t)} y="310" fontSize="14" fill={COLORS.muted} textAnchor="middle" fontWeight="600">
                {t}
              </text>
            </g>
          ))}
          {aTicks.map(([val, label]) => (
            <g key={`aa-${val}`}>
              <line
                x1="72"
                y1={Y(val)}
                x2="610"
                y2={Y(val)}
                stroke={val === 0 ? COLORS.ink : COLORS.grid}
                strokeWidth={val === 0 ? 1.6 : 1}
              />
              <text
                x="60"
                y={Y(val) + 5}
                fontSize="14"
                fill={val === 0 ? COLORS.ink : COLORS.muted}
                textAnchor="end"
                fontWeight="600"
              >
                {label}
              </text>
            </g>
          ))}
          <line x1="72" y1="26" x2="72" y2="294" stroke={COLORS.ink} strokeWidth="1.6" />
          <path
            d={`M${X(0)} ${Y(4)} H${X(5)} M${X(5)} ${Y(0)} H${X(15)} M${X(15)} ${Y(-2)} H${X(25)}`}
            stroke={COLORS.teal}
            strokeWidth="3.5"
            fill="none"
          />
          <line x1={X(5)} y1={Y(4)} x2={X(5)} y2={Y(0)} stroke={COLORS.teal} strokeWidth="2" strokeDasharray="5 5" />
          <line x1={X(15)} y1={Y(0)} x2={X(15)} y2={Y(-2)} stroke={COLORS.teal} strokeWidth="2" strokeDasharray="5 5" />
          <text x={(X(0) + X(5)) / 2} y={Y(4) - 10} fontSize="15" fill={COLORS.tealDark} textAnchor="middle" fontWeight="800">
            +4 m/s²
          </text>
          <text x={(X(5) + X(15)) / 2} y={Y(0) - 12} fontSize="14" fill={COLORS.tealDark} textAnchor="middle" fontWeight="700">
            0 (GLB)
          </text>
          <text x={(X(15) + X(25)) / 2} y={Y(-2) - 10} fontSize="15" fill={COLORS.tealDark} textAnchor="middle" fontWeight="800">
            −2 m/s²
          </text>
          <text x="72" y="20" fontSize="16" fill={COLORS.ink} fontWeight="800">
            a (m/s²)
          </text>
          <text x="610" y="330" fontSize="16" fill={COLORS.ink} textAnchor="end" fontWeight="800">
            t (s)
          </text>
        </svg>
      );
    }

    case 4: {
      const windows: React.ReactNode[] = [];
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 3; c++) {
          windows.push(
            <rect
              key={`${r}-${c}`}
              x={134 + c * 40}
              y={104 + r * 43}
              width="26"
              height="28"
              rx="3"
              fill={COLORS.mint}
              stroke={COLORS.grid}
            />
          );
        }
      }
      return (
        <svg viewBox="0 0 480 420" role="img" aria-label="Bola dilempar vertikal ke atas dari anjungan menara 80 m" className="w-full h-auto block">
          <defs>
            <SvgArrowMarker id={a1} color={COLORS.amber} />
            <SvgArrowMarker id={a2} color={COLORS.muted} />
          </defs>
          <rect x="120" y="90" width="140" height="290" fill="#ffffff" stroke={COLORS.tealDark} strokeWidth="2" />
          <rect x="112" y="84" width="156" height="10" rx="2" fill={COLORS.tealDark} />
          {windows}
          <rect x="176" y="344" width="30" height="36" fill="#ccfbf1" stroke={COLORS.tealDark} />
          <GroundHatch x0={30} x1={450} y={380} />
          {/* Peneliti */}
          <circle cx="212" cy="60" r="6" fill={COLORS.ink} />
          <line x1="212" y1="66" x2="212" y2="80" stroke={COLORS.ink} strokeWidth="2.4" />
          <line x1="212" y1="80" x2="206" y2="84" stroke={COLORS.ink} strokeWidth="2.4" />
          <line x1="212" y1="80" x2="218" y2="84" stroke={COLORS.ink} strokeWidth="2.4" />
          <line x1="212" y1="70" x2="228" y2="66" stroke={COLORS.ink} strokeWidth="2.4" />
          {/* Bola & vektor */}
          <circle cx="300" cy="76" r="9" fill={COLORS.amber} />
          <circle cx="297" cy="73" r="3" fill="#fde68a" />
          <line x1="300" y1="62" x2="300" y2="20" stroke={COLORS.amber} strokeWidth="3" markerEnd={`url(#${a1})`} />
          <text x="314" y="34" fontSize="16" fill={COLORS.amber} fontWeight="700">
            v₀ = 30 m/s
          </text>
          <line x1="316" y1="90" x2="316" y2="368" stroke={COLORS.muted} strokeWidth="2" strokeDasharray="5 6" markerEnd={`url(#${a2})`} />
          <path d="M104 90 H94 V380 H104" fill="none" stroke={COLORS.tealDark} strokeWidth="1.6" />
          <text x="86" y="240" fontSize="18" fill={COLORS.tealDark} textAnchor="end" fontWeight="800">
            80 m
          </text>
          <text x="330" y="130" fontSize="12.5" fill={COLORS.muted} fontWeight="600">
            lintasan bola ke tanah
          </text>
        </svg>
      );
    }

    case 5: {
      const braces: React.ReactNode[] = [];
      for (let y = 60; y < 380; y += 64) {
        braces.push(
          <g key={y}>
            <line x1="180" y1={y} x2="290" y2={y + 64} stroke={COLORS.grid} strokeWidth="1.4" />
            <line x1="290" y1={y} x2="180" y2={y + 64} stroke={COLORS.grid} strokeWidth="1.4" />
          </g>
        );
      }
      return (
        <svg viewBox="0 0 520 420" role="img" aria-label="Dua kapsul uji di menara jatuh bebas setinggi 245 m" className="w-full h-auto block">
          <defs>
            <SvgArrowMarker id={a1} color={COLORS.teal} />
            <SvgArrowMarker id={a2} color={COLORS.amber} />
          </defs>
          <rect x="180" y="60" width="110" height="320" fill="#ffffff" stroke={COLORS.tealDark} strokeWidth="2" />
          {braces}
          <rect x="170" y="52" width="130" height="10" rx="3" fill={COLORS.tealDark} />
          <GroundHatch x0={60} x1={460} y={380} />
          {/* Kapsul A */}
          <circle cx="206" cy="40" r="10" fill={COLORS.teal} />
          <text x="206" y="45" fontSize="12" fill="#ffffff" textAnchor="middle" fontWeight="800">
            A
          </text>
          <text x="206" y="20" fontSize="14" fill={COLORS.tealDark} textAnchor="middle" fontWeight="700">
            t = 0 s
          </text>
          <line x1="206" y1="52" x2="206" y2="110" stroke={COLORS.teal} strokeWidth="3" markerEnd={`url(#${a1})`} />
          {/* Kapsul B */}
          <circle cx="262" cy="40" r="10" fill={COLORS.amber} />
          <text x="262" y="45" fontSize="12" fill="#ffffff" textAnchor="middle" fontWeight="800">
            B
          </text>
          <text x="262" y="20" fontSize="14" fill={COLORS.amber} textAnchor="middle" fontWeight="700">
            t = 1 s
          </text>
          <line x1="262" y1="52" x2="262" y2="132" stroke={COLORS.amber} strokeWidth="3" markerEnd={`url(#${a2})`} />
          {/* Dimension & notes */}
          <path d="M320 60 H330 V380 H320" fill="none" stroke={COLORS.tealDark} strokeWidth="1.6" />
          <text x="342" y="226" fontSize="18" fill={COLORS.tealDark} fontWeight="800">
            245 m
          </text>
          <text x="150" y="108" fontSize="13" fill={COLORS.tealDark} textAnchor="end" fontWeight="600">
            A: dilepas (v₀ = 0)
          </text>
          <text x="150" y="130" fontSize="13" fill={COLORS.amber} textAnchor="end" fontWeight="600">
            B: dilontarkan ↓ 24 m/s
          </text>
        </svg>
      );
    }

    case 6: {
      const X = (t: number) => 72 + 52 * t;
      const Y = (x: number) => 340 - 4.5 * x;
      const tTicks = [0, 2, 4, 6, 8, 10];
      const xTicks = [0, 10, 20, 30, 40, 50, 60];
      return (
        <svg viewBox="0 0 640 400" role="img" aria-label="Grafik posisi terhadap waktu dua pesepeda P dan Q" className="w-full h-auto block">
          {tTicks.map((t) => (
            <g key={`xt-${t}`}>
              <line x1={X(t)} y1="56" x2={X(t)} y2="340" stroke={COLORS.grid} strokeWidth="1" />
              <text x={X(t)} y="364" fontSize="14" fill={COLORS.muted} textAnchor="middle" fontWeight="600">
                {t}
              </text>
            </g>
          ))}
          {xTicks.map((x) => (
            <g key={`xx-${x}`}>
              <line
                x1="72"
                y1={Y(x)}
                x2="610"
                y2={Y(x)}
                stroke={x === 0 ? COLORS.ink : COLORS.grid}
                strokeWidth={x === 0 ? 1.6 : 1}
              />
              <text x="58" y={Y(x) + 5} fontSize="14" fill={COLORS.muted} textAnchor="end" fontWeight="600">
                {x}
              </text>
            </g>
          ))}
          <line x1="72" y1="42" x2="72" y2="346" stroke={COLORS.ink} strokeWidth="1.6" />
          {/* Pesepeda P: (0,0) -> (10,60) */}
          <line x1={X(0)} y1={Y(0)} x2={X(10)} y2={Y(60)} stroke={COLORS.teal} strokeWidth="3.5" />
          <circle cx={X(10)} cy={Y(60)} r="4.5" fill={COLORS.tealDark} />
          {/* Pesepeda Q: (4,0) -> (10,54) */}
          <line x1={X(4)} y1={Y(0)} x2={X(10)} y2={Y(54)} stroke={COLORS.amber} strokeWidth="3.5" />
          <circle cx={X(4)} cy={Y(0)} r="4.5" fill={COLORS.amber} />
          <circle cx={X(10)} cy={Y(54)} r="4.5" fill={COLORS.amber} />
          <text x="415" y="135" fontSize="16" fill={COLORS.tealDark} fontWeight="800">
            Pesepeda P
          </text>
          <text x="430" y="268" fontSize="16" fill={COLORS.amber} fontWeight="800">
            Pesepeda Q
          </text>
          <text x={X(4)} y="388" fontSize="12.5" fill={COLORS.amber} textAnchor="middle" fontWeight="600">
            Q mulai (t = 4 s)
          </text>
          <text x="72" y="30" fontSize="16" fill={COLORS.ink} fontWeight="800">
            x (m)
          </text>
          <text x="614" y="388" fontSize="16" fill={COLORS.ink} textAnchor="end" fontWeight="800">
            t (s)
          </text>
        </svg>
      );
    }

    case 7:
      return (
        <svg viewBox="0 0 640 260" role="img" aria-label="Sketsa pengereman mobil di jalan berkerikil dan aspal kering" className="w-full h-auto block">
          <defs>
            <SvgArrowMarker id={a1} color={COLORS.teal} />
          </defs>
          {/* Zones */}
          <rect x="132" y="110" width="92" height="64" fill={COLORS.mint} stroke={COLORS.grid} strokeDasharray="4 4" />
          <rect x="224" y="110" width="150" height="64" fill="#fff7ed" stroke="#fed7aa" />
          <rect x="374" y="110" width="186" height="64" fill="#f1f5f9" stroke="#cbd5e1" />
          {/* Gravel dots */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle key={i} cx={240 + i * 20} cy={130 + (i % 3) * 14} r="2.2" fill={COLORS.amber} opacity="0.65" />
          ))}
          {/* Obstacle barrier */}
          <rect x="566" y="102" width="14" height="80" rx="3" fill={COLORS.crimson} />
          <line x1="566" y1="116" x2="580" y2="128" stroke="#ffffff" strokeWidth="3" />
          <line x1="566" y1="140" x2="580" y2="152" stroke="#ffffff" strokeWidth="3" />
          <line x1="566" y1="164" x2="580" y2="176" stroke="#ffffff" strokeWidth="3" />
          {/* Car */}
          <rect x="58" y="124" width="70" height="36" rx="11" fill={COLORS.teal} />
          <rect x="76" y="130" width="26" height="24" rx="5" fill="#eafffb" />
          <line x1="132" y1="142" x2="164" y2="142" stroke={COLORS.teal} strokeWidth="3" markerEnd={`url(#${a1})`} />
          <text x="58" y="98" fontSize="16" fill={COLORS.tealDark} fontWeight="800">
            90 km/jam
          </text>
          <text x="178" y="82" fontSize="13" fill={COLORS.muted} textAnchor="middle" fontWeight="700">
            zona reaksi
          </text>
          <text x="178" y="98" fontSize="13" fill={COLORS.muted} textAnchor="middle" fontWeight="600">
            0,8 s
          </text>
          <text x="299" y="82" fontSize="13" fill={COLORS.amber} textAnchor="middle" fontWeight="700">
            jalan berkerikil · 80 m
          </text>
          <text x="299" y="98" fontSize="12" fill={COLORS.amber} textAnchor="middle" fontWeight="600">
            perlambatan 2,5 m/s²
          </text>
          <text x="467" y="82" fontSize="13" fill={COLORS.ink} textAnchor="middle" fontWeight="700">
            aspal kering
          </text>
          <text x="467" y="98" fontSize="12" fill={COLORS.ink} textAnchor="middle" fontWeight="600">
            perlambatan 5 m/s²
          </text>
          <text x="573" y="198" fontSize="12" fill={COLORS.crimson} textAnchor="middle" fontWeight="700">
            penghalang
          </text>
          <path d="M128 206 V214 H566 V206" fill="none" stroke={COLORS.tealDark} strokeWidth="1.6" />
          <text x="347" y="238" fontSize="17" fill={COLORS.tealDark} textAnchor="middle" fontWeight="800">
            jarak total = ?
          </text>
        </svg>
      );

    case 8: {
      const panels: React.ReactNode[] = [];
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 3; c++) {
          panels.push(
            <rect
              key={`${r}-${c}`}
              x={154 + c * 42}
              y={64 + r * 44}
              width="26"
              height="28"
              rx="3"
              fill={COLORS.mint}
              stroke={COLORS.grid}
            />
          );
        }
      }
      return (
        <svg viewBox="0 0 480 420" role="img" aria-label="Bola baja jatuh bebas dari puncak menara uji" className="w-full h-auto block">
          <defs>
            <SvgArrowMarker id={a2} color={COLORS.muted} />
          </defs>
          <rect x="140" y="50" width="140" height="330" fill="#ffffff" stroke={COLORS.tealDark} strokeWidth="2" />
          {panels}
          <GroundHatch x0={40} x1={300} y={380} />
          <circle cx="210" cy="38" r="9" fill={COLORS.amber} />
          <text x="226" y="34" fontSize="15" fill={COLORS.amber} fontWeight="700">
            v₀ = 0
          </text>
          <line x1="210" y1="52" x2="210" y2="370" stroke={COLORS.muted} strokeWidth="2" strokeDasharray="5 6" markerEnd={`url(#${a2})`} />
          <line x1="200" y1="268" x2="346" y2="268" stroke={COLORS.amber} strokeWidth="1.4" strokeDasharray="4 4" />
          <path d="M300 50 H310 V380 H300" fill="none" stroke={COLORS.tealDark} strokeWidth="1.6" />
          <text x="316" y="214" fontSize="18" fill={COLORS.tealDark} fontWeight="800">
            h = ?
          </text>
          <path d="M336 268 H346 V380 H336" fill="none" stroke={COLORS.amber} strokeWidth="1.6" />
          <text x="354" y="316" fontSize="17" fill={COLORS.amber} fontWeight="800">
            55 m
          </text>
          <text x="354" y="334" fontSize="12" fill={COLORS.muted} fontWeight="600">
            (1,0 s terakhir)
          </text>
        </svg>
      );
    }

    case 9: {
      let wave = 'M0 372';
      for (let x = 0; x < 520; x += 40) {
        wave += ` Q${x + 10} 366 ${x + 20} 372 T${x + 40} 372`;
      }
      const posts = [50, 110, 170, 230, 290, 350, 410, 470];
      return (
        <svg viewBox="0 0 520 420" role="img" aria-label="Peluncur bola di atas dermaga, dua waktu melewati 80 m" className="w-full h-auto block">
          <defs>
            <SvgArrowMarker id={a1} color={COLORS.teal} />
            <SvgArrowMarker id={a2} color={COLORS.crimson} />
          </defs>
          <rect x="0" y="360" width="520" height="60" fill="#e0f7fa" />
          <path d={wave} fill="none" stroke={COLORS.azure} strokeWidth="1.6" opacity="0.55" />
          <rect x="80" y="288" width="16" height="72" fill={COLORS.tealDark} opacity="0.8" />
          <rect x="424" y="288" width="16" height="72" fill={COLORS.tealDark} opacity="0.8" />
          <rect x="30" y="276" width="460" height="12" rx="3" fill={COLORS.tealDark} />
          <line x1="30" y1="264" x2="490" y2="264" stroke={COLORS.tealDark} strokeWidth="2" />
          {posts.map((x) => (
            <line key={x} x1={x} y1="264" x2={x} y2="276" stroke={COLORS.tealDark} strokeWidth="2" />
          ))}
          <text x="60" y="308" fontSize="13" fill={COLORS.muted} fontWeight="700">
            dermaga
          </text>
          <rect x="282" y="256" width="36" height="20" rx="5" fill={COLORS.ink} />
          <text x="300" y="250" fontSize="11" fill={COLORS.muted} textAnchor="middle" fontWeight="600">
            peluncur
          </text>
          <line x1="300" y1="254" x2="300" y2="64" stroke={COLORS.muted} strokeWidth="2" strokeDasharray="5 6" />
          <circle cx="300" cy="64" r="7" fill="none" stroke={COLORS.muted} strokeDasharray="3 3" />
          <text x="300" y="44" fontSize="17" fill={COLORS.ink} textAnchor="middle" fontWeight="800">
            h maks = ?
          </text>
          <line x1="262" y1="162" x2="338" y2="162" stroke={COLORS.amber} strokeWidth="1.6" strokeDasharray="5 4" />
          <circle cx="300" cy="162" r="8" fill={COLORS.amber} />
          <line x1="286" y1="156" x2="286" y2="116" stroke={COLORS.teal} strokeWidth="2.6" markerEnd={`url(#${a1})`} />
          <text x="278" y="106" fontSize="14" fill={COLORS.tealDark} textAnchor="end" fontWeight="700">
            t = 2 s (naik)
          </text>
          <line x1="314" y1="168" x2="314" y2="208" stroke={COLORS.crimson} strokeWidth="2.6" markerEnd={`url(#${a2})`} />
          <text x="324" y="220" fontSize="14" fill={COLORS.crimson} fontWeight="700">
            t = 8 s (turun)
          </text>
          <path d="M256 162 H246 V276 H256" fill="none" stroke={COLORS.amber} strokeWidth="1.6" />
          <text x="238" y="224" fontSize="17" fill={COLORS.amber} textAnchor="end" fontWeight="800">
            80 m
          </text>
        </svg>
      );
    }

    default:
      return (
        <svg viewBox="0 0 640 360" role="img" aria-label="Poros lift dan sketsa grafik v-t trapesium" className="w-full h-auto block">
          <defs>
            <SvgArrowMarker id={a1} color={COLORS.teal} />
          </defs>
          {/* Lift shaft */}
          <rect x="60" y="40" width="96" height="280" fill="#ffffff" stroke={COLORS.tealDark} strokeWidth="2" />
          <line x1="78" y1="40" x2="78" y2="320" stroke={COLORS.grid} strokeWidth="1.4" />
          <line x1="138" y1="40" x2="138" y2="320" stroke={COLORS.grid} strokeWidth="1.4" />
          <rect x="80" y="192" width="56" height="62" rx="6" fill={COLORS.teal} />
          <rect x="90" y="204" width="36" height="22" rx="3" fill="#eafffb" />
          <line x1="108" y1="180" x2="108" y2="98" stroke={COLORS.teal} strokeWidth="3" markerEnd={`url(#${a1})`} />
          <text x="108" y="340" fontSize="14" fill={COLORS.muted} textAnchor="middle" fontWeight="700">
            lift
          </text>
          {/* v-t trapezoid sketch */}
          <line x1="220" y1="300" x2="610" y2="300" stroke={COLORS.ink} strokeWidth="1.6" />
          <line x1="220" y1="300" x2="220" y2="88" stroke={COLORS.ink} strokeWidth="1.6" />
          <path
            d="M240 300 L330 120 H470 L560 300 Z"
            fill="rgba(204,251,241,0.5)"
            stroke={COLORS.teal}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <line x1="220" y1="120" x2="330" y2="120" stroke={COLORS.muted} strokeWidth="1.6" strokeDasharray="5 5" />
          <text x="226" y="108" fontSize="16" fill={COLORS.tealDark} fontWeight="800">
            v_maks = ?
          </text>
          <text x="240" y="322" fontSize="14" fill={COLORS.muted} textAnchor="middle" fontWeight="600">
            0
          </text>
          <text x="560" y="322" fontSize="14" fill={COLORS.muted} textAnchor="middle" fontWeight="700">
            12 s
          </text>
          <text x="275" y="210" fontSize="14" fill={COLORS.tealDark} fontWeight="700" textAnchor="middle" transform="rotate(-63 275 210)">
            +2,5 m/s²
          </text>
          <text x="525" y="210" fontSize="14" fill={COLORS.tealDark} fontWeight="700" textAnchor="middle" transform="rotate(63 525 210)">
            −2,5 m/s²
          </text>
          <text x="222" y="76" fontSize="14" fill={COLORS.ink} fontWeight="800">
            v (m/s)
          </text>
          <text x="612" y="344" fontSize="13" fill={COLORS.muted} textAnchor="end">
            t (s) · sketsa tidak berskala
          </text>
        </svg>
      );
  }
}

interface StimulusFigureProps {
  question: QuestionItem;
}

export const StimulusFigure: React.FC<StimulusFigureProps> = ({ question }) => {
  const uid = useId();
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [zoomed]);

  return (
    <>
      <div className="my-4 border border-[#CBEAE4] rounded-xl overflow-hidden bg-white">
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-[#E3F3F0] bg-[#F8FCFB]">
          <span className="text-xs font-bold tracking-wider uppercase text-[#4B7A74]">
            Stimulus Visual Ilmiah
          </span>
          <button
            type="button"
            onClick={() => setZoomed(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0F766E] bg-white border border-[#99E2D8] rounded-lg hover:bg-[#F0FDFA] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
            Perbesar Stimulus
          </button>
        </div>

        <div className="p-3 sm:p-4 max-w-[660px] mx-auto">
          {renderSvgByQuestionId(question.id, `${uid}-main`)}
        </div>

        <div className="px-4 pb-3 border-t border-[#F0F7F6] pt-2.5 bg-[#FCFEFE]">
          <p className="text-xs text-[#4B7A74] italic mb-1.5">{question.stimulusCaption}</p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#134E4A] tabular-nums">
            {question.stimulusChips.map((chip, idx) => (
              <React.Fragment key={chip}>
                {idx > 0 && (
                  <span aria-hidden="true" className="text-[#8BB8B2]">
                    ·
                  </span>
                )}
                <span>{chip}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Stimulus Soal ${question.id}: ${question.title}`}
          className="fixed inset-0 z-50 bg-[#042F2E]/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setZoomed(false)}
        >
          <div
            className="bg-white rounded-2xl border border-[#CBEAE4] shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 py-3.5 bg-[#0F766E] text-white">
              <h3 className="text-sm sm:text-base font-bold truncate">
                Stimulus Soal {question.id} — {question.title}
              </h3>
              <button
                type="button"
                onClick={() => setZoomed(false)}
                aria-label="Tutup tampilan perbesar"
                className="p-2 rounded-lg bg-white/15 hover:bg-white/25 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 overflow-x-auto">
              <div className="min-w-[540px] max-w-3xl mx-auto">
                {renderSvgByQuestionId(question.id, `${uid}-zoom`)}
              </div>
              <p className="text-xs text-[#4B7A74] italic mt-3 text-center">
                {question.stimulusCaption}
              </p>
              <div className="flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1 text-xs font-semibold text-[#134E4A] mt-2 tabular-nums">
                {question.stimulusChips.map((chip, idx) => (
                  <React.Fragment key={chip}>
                    {idx > 0 && (
                      <span aria-hidden="true" className="text-[#8BB8B2]">
                        ·
                      </span>
                    )}
                    <span>{chip}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
