import React, { useState, useEffect, useRef } from 'react';

// ---- Bubble Sort Visualizer ----
const SORT_ARR = [64, 34, 25, 12, 22, 11, 90];

function buildBubbleSteps(arr: number[]) {
  const a = [...arr];
  const steps: { arr: number[]; cmp: [number, number]; swap: boolean; done?: boolean }[] = [];
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      const s = a[j] > a[j + 1];
      steps.push({ arr: [...a], cmp: [j, j + 1], swap: s });
      if (s) { const t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; }
    }
  }
  steps.push({ arr: [...a], cmp: [-1, -1], swap: false, done: true });
  return steps;
}

export function SortViz() {
  const steps = buildBubbleSteps(SORT_ARR);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(3);
  const s = steps[Math.min(step, steps.length - 1)];

  useEffect(() => {
    if (!playing) return;
    if (step >= steps.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setStep(p => p + 1), 1200 - speed * 180);
    return () => clearTimeout(t);
  }, [playing, step, speed]);

  const reset = () => { setStep(0); setPlaying(false); };
  const maxH = Math.max(...SORT_ARR);

  return (
    <div>
      <div className="flex gap-2 items-center flex-wrap mb-4">
        <button onClick={() => setStep(p => Math.max(0, p - 1))}
          className="px-3 py-1.5 rounded border border-[#30363d] bg-[#1c2128] text-sm hover:bg-[#30363d] text-[#e6edf3]">◀ Trước</button>
        <button onClick={() => { if (s.done) reset(); else setPlaying(p => !p); }}
          className="px-4 py-1.5 rounded bg-[#1f6feb] text-white text-sm font-semibold hover:bg-[#388bfd]">
          {playing ? '⏸ Dừng' : s.done ? '↩ Reset' : '▶ Chạy'}
        </button>
        <button onClick={() => setStep(p => Math.min(steps.length - 1, p + 1))}
          className="px-3 py-1.5 rounded border border-[#30363d] bg-[#1c2128] text-sm hover:bg-[#30363d] text-[#e6edf3]">Sau ▶</button>
        <button onClick={reset} className="px-3 py-1.5 rounded border border-[#30363d] bg-[#1c2128] text-sm hover:bg-[#30363d] text-[#e6edf3]">↩ Reset</button>
        <div className="flex items-center gap-2 text-sm text-[#8b949e] ml-2">
          <span>Tốc độ:</span>
          <input type="range" min={1} max={5} value={speed} onChange={e => setSpeed(+e.target.value)}
            className="w-20 accent-[#58a6ff]" />
        </div>
      </div>
      <div className="flex items-end justify-center gap-2 h-48 px-4">
        {s.arr.map((v, i) => {
          const h = (v / maxH) * 160;
          const isCmp = s.cmp.includes(i);
          const isDone = s.done;
          const bg = isDone ? '#3fb950' : isCmp ? (s.swap ? '#f85149' : '#d29922') : '#58a6ff';
          return (
            <div key={i} className="flex flex-col items-center gap-1 transition-all duration-300">
              <span className="text-xs font-mono text-[#8b949e]">{v}</span>
              <div style={{ height: h, width: 44, background: bg, borderRadius: 4, opacity: isCmp ? 1 : 0.7, transition: 'all 0.3s' }} />
            </div>
          );
        })}
      </div>
      <div className="mt-3 text-sm text-[#8b949e] min-h-8">
        {s.done
          ? <span className="text-[#3fb950] font-semibold">✅ Hoàn thành! Mảng đã sắp xếp tăng dần.</span>
          : <span><strong className="text-[#e6edf3]">Bước {step + 1}:</strong> So sánh [{s.cmp[0]}]={s.arr[s.cmp[0]]} và [{s.cmp[1]}]={s.arr[s.cmp[1]]}. {s.swap ? '🔄 Hoán đổi!' : '✓ Không đổi.'}</span>
        }
      </div>
    </div>
  );
}

// ---- Binary Search Visualizer ----
const BS_ARR = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const BS_TARGET = 13;

function buildBSSteps() {
  const steps: { lo: number; hi: number; mid: number; found: boolean }[] = [];
  let lo = 0, hi = BS_ARR.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const found = BS_ARR[mid] === BS_TARGET;
    steps.push({ lo, hi, mid, found });
    if (found) break;
    if (BS_ARR[mid] < BS_TARGET) lo = mid + 1;
    else hi = mid - 1;
  }
  return steps;
}

export function BSearchViz() {
  const steps = buildBSSteps();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const s = steps[Math.min(step, steps.length - 1)];

  useEffect(() => {
    if (!playing) return;
    if (step >= steps.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setStep(p => p + 1), 900);
    return () => clearTimeout(t);
  }, [playing, step]);

  return (
    <div>
      <div className="flex gap-2 items-center flex-wrap mb-4">
        <button onClick={() => setStep(p => Math.max(0, p - 1))} className="px-3 py-1.5 rounded border border-[#30363d] bg-[#1c2128] text-sm text-[#e6edf3] hover:bg-[#30363d]">◀</button>
        <button onClick={() => { if (s.found || step >= steps.length - 1) { setStep(0); setPlaying(false); } else setPlaying(p => !p); }}
          className="px-4 py-1.5 rounded bg-[#1f6feb] text-white text-sm font-semibold">
          {playing ? '⏸' : (s.found ? '↩' : '▶ Chạy')}
        </button>
        <button onClick={() => setStep(p => Math.min(steps.length - 1, p + 1))} className="px-3 py-1.5 rounded border border-[#30363d] bg-[#1c2128] text-sm text-[#e6edf3] hover:bg-[#30363d]">▶</button>
      </div>
      <div className="text-sm text-[#8b949e] mb-3">Tìm kiếm: <strong className="text-[#58a6ff]">{BS_TARGET}</strong> trong mảng đã sắp xếp</div>
      <div className="flex gap-2 justify-center flex-wrap">
        {BS_ARR.map((v, i) => {
          const isLo = i === s.lo, isHi = i === s.hi, isMid = i === s.mid;
          const outRange = i < s.lo || i > s.hi;
          let bg = '#1c2128', border = '#30363d', opacity = outRange ? 0.3 : 1;
          if (isMid) { bg = s.found ? 'rgba(63,185,80,.2)' : 'rgba(88,166,255,.2)'; border = s.found ? '#3fb950' : '#58a6ff'; }
          return (
            <div key={i} style={{ opacity, transition: 'all 0.4s' }} className="text-center">
              <div className="text-xs text-[#8b949e] mb-1">
                {isLo && !isMid && <span className="text-[#3fb950]">lo</span>}
                {isHi && !isMid && <span className="text-[#f85149]">hi</span>}
                {isMid && <span className="text-[#58a6ff] font-bold">mid</span>}
                {!isLo && !isHi && !isMid && ' '}
              </div>
              <div style={{ width: 48, height: 48, background: bg, border: `2px solid ${border}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontWeight: 700, transition: 'all 0.4s', color: '#e6edf3' }}>
                {v}
              </div>
              <div className="text-xs text-[#656d76] mt-1">{i}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-sm text-[#8b949e]">
        {s.found
          ? <span className="text-[#3fb950] font-semibold">✅ Tìm thấy {BS_TARGET} tại vị trí {s.mid}!</span>
          : <span><strong className="text-[#e6edf3]">Bước {step + 1}:</strong> lo={s.lo}, hi={s.hi}, mid={s.mid}, arr[mid]={BS_ARR[s.mid]}
            {BS_ARR[s.mid] < BS_TARGET ? ` → ${BS_ARR[s.mid]} < ${BS_TARGET} → tìm nửa phải` : ` → ${BS_ARR[s.mid]} > ${BS_TARGET} → tìm nửa trái`}
          </span>
        }
      </div>
    </div>
  );
}

// ---- Graph (DFS) Visualizer ----
const GNODES = [['A', 100, 80], ['B', 240, 60], ['C', 380, 80], ['D', 170, 200], ['E', 310, 200], ['F', 430, 170]] as [string, number, number][];
const GEDGES = [['A', 'B'], ['A', 'D'], ['B', 'C'], ['B', 'E'], ['C', 'F'], ['D', 'E'], ['E', 'F']] as [string, string][];
const DFS_ORDER = ['A', 'B', 'C', 'F', 'E', 'D'];

export function GraphViz() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (step >= DFS_ORDER.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setStep(p => p + 1), 800);
    return () => clearTimeout(t);
  }, [playing, step]);

  const visited = DFS_ORDER.slice(0, step + 1);
  const current = DFS_ORDER[step];

  return (
    <div>
      <div className="flex gap-2 items-center flex-wrap mb-3">
        <button onClick={() => setStep(p => Math.max(0, p - 1))} className="px-3 py-1.5 rounded border border-[#30363d] bg-[#1c2128] text-sm text-[#e6edf3]">◀</button>
        <button onClick={() => { if (step >= DFS_ORDER.length - 1) { setStep(0); setPlaying(false); } else setPlaying(p => !p); }}
          className="px-4 py-1.5 rounded bg-[#1f6feb] text-white text-sm font-semibold">{playing ? '⏸' : step >= DFS_ORDER.length - 1 ? '↩' : '▶'}</button>
        <button onClick={() => setStep(p => Math.min(DFS_ORDER.length - 1, p + 1))} className="px-3 py-1.5 rounded border border-[#30363d] bg-[#1c2128] text-sm text-[#e6edf3]">▶</button>
      </div>
      <svg width="100%" viewBox="0 0 540 270" style={{ minHeight: 200 }}>
        {GEDGES.map(([a, b], i) => {
          const an = GNODES.find(n => n[0] === a)!;
          const bn = GNODES.find(n => n[0] === b)!;
          const vaIdx = visited.indexOf(a), vbIdx = visited.indexOf(b);
          const active = vaIdx !== -1 && vbIdx !== -1;
          return <line key={i} x1={an[1]} y1={an[2]} x2={bn[1]} y2={bn[2]}
            stroke={active ? '#3fb950' : '#30363d'} strokeWidth={active ? 2.5 : 1.5} style={{ transition: 'stroke 0.4s' }} />;
        })}
        {GNODES.map(([label, x, y]) => {
          const isCurrent = label === current;
          const isVisited = visited.includes(label) && !isCurrent;
          const fill = isCurrent ? 'rgba(88,166,255,.35)' : isVisited ? 'rgba(63,185,80,.2)' : '#1c2128';
          const stroke = isCurrent ? '#58a6ff' : isVisited ? '#3fb950' : '#30363d';
          const sw = isCurrent ? 3 : 2;
          return (
            <g key={label} style={{ transition: 'all 0.4s' }}>
              <circle cx={x} cy={y} r={26} fill={fill} stroke={stroke} strokeWidth={sw} style={{ transition: 'all 0.4s' }} />
              <text x={x} y={y + 5} textAnchor="middle" fill="#e6edf3" fontSize={15} fontWeight={700}>{label}</text>
            </g>
          );
        })}
      </svg>
      <div className="text-sm text-[#8b949e]">
        <strong className="text-[#e6edf3]">Bước {step + 1}/{DFS_ORDER.length}:</strong> Thăm đỉnh <strong className="text-[#58a6ff]">{current}</strong> → Thứ tự DFS: {visited.join(' → ')}
      </div>
    </div>
  );
}

// ---- Dijkstra Visualizer ----
const DIJK_STEPS = [
  { node: 'A', dist: { A: 0, B: '∞', C: '∞', D: '∞', E: '∞', F: '∞' }, msg: 'Khởi tạo dist[A]=0, mọi đỉnh khác = ∞' },
  { node: 'A', dist: { A: 0, B: 4, C: '∞', D: 2, E: '∞', F: '∞' }, msg: 'Từ A: relaxed B→4, D→2' },
  { node: 'D', dist: { A: 0, B: 4, C: '∞', D: 2, E: 8, F: '∞' }, msg: 'Xử lý D(dist=2): relaxed E→2+6=8' },
  { node: 'B', dist: { A: 0, B: 4, C: 5, D: 2, E: 7, F: '∞' }, msg: 'Xử lý B(dist=4): relaxed C→4+1=5, E→min(8,4+3)=7' },
  { node: 'C', dist: { A: 0, B: 4, C: 5, D: 2, E: 7, F: 8 }, msg: 'Xử lý C(dist=5): relaxed F→5+3=8' },
  { node: 'E', dist: { A: 0, B: 4, C: 5, D: 2, E: 7, F: 8 }, msg: 'Xử lý E(dist=7): F=min(8,7+2)=8, không cải thiện' },
  { node: 'F', dist: { A: 0, B: 4, C: 5, D: 2, E: 7, F: 8 }, msg: '✅ Hoàn thành! Đường ngắn nhất từ A đến mọi đỉnh.' },
] as { node: string; dist: Record<string, number | string>; msg: string }[];

export function DijkstraViz() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const s = DIJK_STEPS[Math.min(step, DIJK_STEPS.length - 1)];

  useEffect(() => {
    if (!playing) return;
    if (step >= DIJK_STEPS.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setStep(p => p + 1), 1000);
    return () => clearTimeout(t);
  }, [playing, step]);

  const visited = DIJK_STEPS.slice(0, step).map(x => x.node);

  return (
    <div>
      <div className="flex gap-2 items-center mb-3">
        <button onClick={() => setStep(p => Math.max(0, p - 1))} className="px-3 py-1.5 rounded border border-[#30363d] bg-[#1c2128] text-sm text-[#e6edf3]">◀</button>
        <button onClick={() => { if (step >= DIJK_STEPS.length - 1) { setStep(0); setPlaying(false); } else setPlaying(p => !p); }}
          className="px-4 py-1.5 rounded bg-[#1f6feb] text-white text-sm font-semibold">{playing ? '⏸' : step >= DIJK_STEPS.length - 1 ? '↩' : '▶'}</button>
        <button onClick={() => setStep(p => Math.min(DIJK_STEPS.length - 1, p + 1))} className="px-3 py-1.5 rounded border border-[#30363d] bg-[#1c2128] text-sm text-[#e6edf3]">▶</button>
      </div>
      <svg width="100%" viewBox="0 0 540 260">
        {GEDGES.map(([a, b], i) => {
          const an = GNODES.find(n => n[0] === a)!;
          const bn = GNODES.find(n => n[0] === b)!;
          return <line key={i} x1={an[1]} y1={an[2]} x2={bn[1]} y2={bn[2]} stroke="#30363d" strokeWidth={1.5} />;
        })}
        {GNODES.map(([label, x, y]) => {
          const isCurrent = s.node === label;
          const isVisited = visited.includes(label) && !isCurrent;
          const d = s.dist[label];
          const fill = isCurrent ? 'rgba(88,166,255,.35)' : isVisited ? 'rgba(63,185,80,.2)' : '#1c2128';
          const stroke = isCurrent ? '#58a6ff' : isVisited ? '#3fb950' : '#30363d';
          return (
            <g key={label} style={{ transition: 'all 0.4s' }}>
              <circle cx={x} cy={y} r={24} fill={fill} stroke={stroke} strokeWidth={isCurrent ? 3 : 2} style={{ transition: 'all 0.4s' }} />
              <text x={x} y={y + 5} textAnchor="middle" fill="#e6edf3" fontSize={14} fontWeight={700}>{label}</text>
              <text x={x} y={y + 44} textAnchor="middle" fill={isVisited || isCurrent ? '#3fb950' : '#656d76'} fontSize={12} fontWeight={600}>d={d}</text>
            </g>
          );
        })}
      </svg>
      <div className="text-sm text-[#8b949e]"><strong className="text-[#e6edf3]">Bước {step + 1}:</strong> {s.msg}</div>
    </div>
  );
}

// ---- DSU Visualizer ----
interface DsuState { parent: number[]; rank: number[]; }
function dsuFind(parent: number[], x: number): number {
  while (parent[x] !== x) x = parent[x];
  return x;
}
const DSU_OPS = [
  { op: 'init', a: 0, b: 0, label: 'Khởi tạo: 5 phần tử {0},{1},{2},{3},{4}' },
  { op: 'union', a: 0, b: 1, label: 'Union(0,1): gộp {0} và {1}' },
  { op: 'union', a: 2, b: 3, label: 'Union(2,3): gộp {2} và {3}' },
  { op: 'union', a: 0, b: 2, label: 'Union(0,2): gộp {0,1} và {2,3}' },
  { op: 'union', a: 1, b: 4, label: 'Union(1,4): gộp {0,1,2,3} và {4}' },
];

export function DsuViz() {
  const [step, setStep] = useState(0);

  const state = { parent: [0, 1, 2, 3, 4], rank: [0, 0, 0, 0, 0] };
  for (let i = 1; i <= step && i < DSU_OPS.length; i++) {
    const { op, a, b } = DSU_OPS[i];
    if (op === 'union') {
      const pa = dsuFind(state.parent, a), pb = dsuFind(state.parent, b);
      if (pa !== pb) {
        if (state.rank[pa] >= state.rank[pb]) { state.parent[pb] = pa; if (state.rank[pa] === state.rank[pb]) state.rank[pa]++; }
        else state.parent[pa] = pb;
      }
    }
  }

  const roots = state.parent.map((_, i) => dsuFind(state.parent, i));
  const groups = new Map<number, number[]>();
  roots.forEach((r, i) => { if (!groups.has(r)) groups.set(r, []); groups.get(r)!.push(i); });
  const colors = ['#58a6ff', '#3fb950', '#d29922', '#f85149', '#bc8cff'];
  const groupColors = new Map<number, string>();
  let ci = 0;
  groups.forEach((_, r) => { groupColors.set(r, colors[ci++ % colors.length]); });

  return (
    <div>
      <div className="flex gap-2 items-center mb-4">
        <button onClick={() => setStep(p => Math.max(0, p - 1))} className="px-3 py-1.5 rounded border border-[#30363d] bg-[#1c2128] text-sm text-[#e6edf3]">◀ Trước</button>
        <button onClick={() => setStep(p => Math.min(DSU_OPS.length - 1, p + 1))} className="px-4 py-1.5 rounded bg-[#1f6feb] text-white text-sm font-semibold">Sau ▶</button>
        <button onClick={() => setStep(0)} className="px-3 py-1.5 rounded border border-[#30363d] bg-[#1c2128] text-sm text-[#e6edf3]">↩ Reset</button>
      </div>
      <div className="flex justify-center gap-4 flex-wrap py-4">
        {[0, 1, 2, 3, 4].map(i => {
          const root = roots[i];
          const color = groupColors.get(root)!;
          const isRoot = root === i;
          return (
            <div key={i} className="flex flex-col items-center gap-2" style={{ transition: 'all 0.4s' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', border: `2px solid ${color}`, background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, color, transition: 'all 0.4s', position: 'relative' }}>
                {i}
                {isRoot && <span style={{ position: 'absolute', top: -8, right: -8, fontSize: 10, background: color, color: '#fff', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>R</span>}
              </div>
              <div className="text-xs text-[#8b949e]">↑{state.parent[i]}</div>
            </div>
          );
        })}
      </div>
      <div className="text-sm text-[#8b949e] mt-2">
        <strong className="text-[#e6edf3]">{DSU_OPS[Math.min(step, DSU_OPS.length - 1)].label}</strong>
      </div>
      <div className="mt-2 text-xs text-[#8b949e]">
        Số thành phần: <strong className="text-[#58a6ff]">{groups.size}</strong> |
        Tập hợp: {Array.from(groups.entries()).map(([r, ns]) => `{${ns.join(',')}}`).join(', ')}
      </div>
    </div>
  );
}

// ---- Segment Tree Visualizer ----
const SEG_ARR = [1, 3, 5, 2, 4, 6, 8, 7];

function buildSegTree(arr: number[], node: number, lo: number, hi: number): { sum: number; lo: number; hi: number; left?: ReturnType<typeof buildSegTree>; right?: ReturnType<typeof buildSegTree> } {
  if (lo === hi) return { sum: arr[lo], lo, hi };
  const mid = Math.floor((lo + hi) / 2);
  const left = buildSegTree(arr, 2 * node, lo, mid);
  const right = buildSegTree(arr, 2 * node + 1, mid + 1, hi);
  return { sum: left.sum + right.sum, lo, hi, left, right };
}

function SegTreeNode({ node, x, y, w, depth, highlight }: { node: ReturnType<typeof buildSegTree>; x: number; y: number; w: number; depth: number; highlight?: { l: number; r: number } }) {
  const nodeW = 44, nodeH = 28;
  const isHL = highlight && highlight.l <= node.lo && node.hi <= highlight.r;

  return (
    <>
      <rect x={x - nodeW / 2} y={y} width={nodeW} height={nodeH} rx={5}
        fill={isHL ? 'rgba(88,166,255,.3)' : '#1c2128'} stroke={isHL ? '#58a6ff' : '#30363d'} strokeWidth={isHL ? 2 : 1.5} />
      <text x={x} y={y + 13} textAnchor="middle" fill="#e6edf3" fontSize={10} fontWeight={700}>{node.sum}</text>
      <text x={x} y={y + 26} textAnchor="middle" fill="#656d76" fontSize={9}>[{node.lo},{node.hi}]</text>
      {node.left && node.right && depth < 3 && (
        <>
          <line x1={x} y1={y + nodeH} x2={x - w / 2} y2={y + 58} stroke="#30363d" strokeWidth={1.5} />
          <line x1={x} y1={y + nodeH} x2={x + w / 2} y2={y + 58} stroke="#30363d" strokeWidth={1.5} />
          <SegTreeNode node={node.left} x={x - w / 2} y={y + 58} w={w / 2} depth={depth + 1} highlight={highlight} />
          <SegTreeNode node={node.right} x={x + w / 2} y={y + 58} w={w / 2} depth={depth + 1} highlight={highlight} />
        </>
      )}
    </>
  );
}

export function SegTreeViz() {
  const [ql, setQl] = useState(2);
  const [qr, setQr] = useState(6);
  const tree = buildSegTree(SEG_ARR, 1, 1, 8);
  const n = SEG_ARR.length;

  const computeSum = (l: number, r: number): number => {
    let s = 0; for (let i = l; i <= r; i++) s += SEG_ARR[i - 1]; return s;
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 text-sm text-[#8b949e] flex-wrap">
        <span>Query đoạn [</span>
        <select value={ql} onChange={e => setQl(+e.target.value)} className="bg-[#1c2128] border border-[#30363d] rounded px-2 py-1 text-[#e6edf3]">
          {Array.from({ length: n }, (_, i) => i + 1).map(v => <option key={v}>{v}</option>)}
        </select>
        <span>,</span>
        <select value={qr} onChange={e => setQr(+e.target.value)} className="bg-[#1c2128] border border-[#30363d] rounded px-2 py-1 text-[#e6edf3]">
          {Array.from({ length: n }, (_, i) => i + 1).map(v => <option key={v}>{v}</option>)}
        </select>
        <span>]</span>
        <span className="text-[#3fb950] font-semibold">= {computeSum(Math.min(ql, qr), Math.max(ql, qr))}</span>
        <span className="text-[#8b949e]">(Các node xanh = những đoạn được dùng)</span>
      </div>
      <svg width="100%" viewBox="0 0 600 220">
        <SegTreeNode node={tree} x={300} y={10} w={240} depth={0} highlight={{ l: Math.min(ql, qr), r: Math.max(ql, qr) }} />
      </svg>
    </div>
  );
}

export function getViz(type?: string): React.ReactNode {
  switch (type) {
    case 'sort': return <SortViz />;
    case 'bsearch': return <BSearchViz />;
    case 'graph': return <GraphViz />;
    case 'dijkstra': return <DijkstraViz />;
    case 'dsu': return <DsuViz />;
    case 'segtree': return <SegTreeViz />;
    default: return null;
  }
}
