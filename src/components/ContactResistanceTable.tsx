import React from 'react';

type Row = { test: string; p1?: string; p2?: string; p3?: string; units?: string };

interface Value { rows?: Row[] }
interface Props {
  value?: Value;
  onChange: (next: Value) => void;
  defaultRows?: string[]; // e.g., ['Switch','Fuse','Switch + Fuse']
  phaseLabels?: [string, string, string]; // defaults to P1,P2,P3
}

const UNIT_OPTIONS = ['µΩ','mΩ','Ω'];

export const ContactResistanceTable: React.FC<Props> = ({ value, onChange, defaultRows, phaseLabels }) => {
  const rows: Row[] = value?.rows?.length
    ? value!.rows!
    : (defaultRows || ['Switch','Fuse','Switch + Fuse']).map((t) => ({ test: t, units: 'µΩ' }));
  const [p1Label, p2Label, p3Label] = phaseLabels || ['P1','P2','P3'];

  const set = (idx: number, updates: Partial<Row>) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, ...updates } : r));
    onChange({ rows: next });
  };

  const onArrow = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>, r: number, c: number) => {
    const key = e.key;
    if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key)) return;
    e.preventDefault();
    const delta = key === 'ArrowLeft' ? [0,-1] : key === 'ArrowRight' ? [0,1] : key === 'ArrowUp' ? [-1,0] : [1,0];
    const nr = Math.max(0, Math.min(rows.length - 1, r + delta[0]));
    const nc = Math.max(0, Math.min(3, c + delta[1]));
    document.querySelector<HTMLElement>(`[data-cr-pos="${nr}-${nc}"]`)?.focus();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-2 py-2 border" />
            <th className="px-2 py-2 border">{p1Label}</th>
            <th className="px-2 py-2 border">{p2Label}</th>
            <th className="px-2 py-2 border">{p3Label}</th>
            <th className="px-2 py-2 border">Units</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={r.test}>
              <td className="border px-2 py-1 whitespace-nowrap font-medium">{r.test}</td>
              <td className="border px-1 py-1">
                <input data-cr-pos={`${idx}-0`} value={r.p1 || ''} onChange={(e)=>set(idx,{p1: e.target.value})} onKeyDown={(e)=>onArrow(e,idx,0)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" />
              </td>
              <td className="border px-1 py-1">
                <input data-cr-pos={`${idx}-1`} value={r.p2 || ''} onChange={(e)=>set(idx,{p2: e.target.value})} onKeyDown={(e)=>onArrow(e,idx,1)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" />
              </td>
              <td className="border px-1 py-1">
                <input data-cr-pos={`${idx}-2`} value={r.p3 || ''} onChange={(e)=>set(idx,{p3: e.target.value})} onKeyDown={(e)=>onArrow(e,idx,2)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" />
              </td>
              <td className="border px-1 py-1">
                <select data-cr-pos={`${idx}-3`} value={r.units || 'µΩ'} onChange={(e)=>set(idx,{units: e.target.value})} onKeyDown={(e)=>onArrow(e as any,idx,3)} className="h-7 text-xs border rounded bg-white">
                  {UNIT_OPTIONS.map((u)=>(<option key={u} value={u}>{u}</option>))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


