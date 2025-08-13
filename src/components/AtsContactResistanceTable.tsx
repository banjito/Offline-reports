import React from 'react';

type Row = { state: 'Normal' | 'Emergency'; p1?: string; p2?: string; p3?: string; neutral?: string; units?: string };
interface Value { rows?: Row[] }
interface Props { value?: Value; onChange: (next: Value) => void }

const UNITS = ['µΩ','mΩ','Ω'];
const DEFAULT_ROWS: Row[] = [{ state: 'Normal', units: 'µΩ' }, { state: 'Emergency', units: 'µΩ' }];

export const AtsContactResistanceTable: React.FC<Props> = ({ value, onChange }) => {
  const rows = value?.rows?.length ? value!.rows! : DEFAULT_ROWS;
  const set = (idx: number, updates: Partial<Row>) => {
    const next = rows.map((r,i)=> (i===idx? { ...r, ...updates } : r));
    onChange({ rows: next });
  };
  const onArrow = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>, r: number, c: number) => {
    const key = e.key; if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key)) return; e.preventDefault();
    const delta = key==='ArrowLeft'?[0,-1]:key==='ArrowRight'?[0,1]:key==='ArrowUp'?[-1,0]:[1,0];
    const nr = Math.max(0, Math.min(rows.length-1, r+delta[0]));
    const nc = Math.max(0, Math.min(4, c+delta[1]));
    document.querySelector<HTMLElement>(`[data-atscr-pos="${nr}-${nc}"]`)?.focus();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-2 py-2 border text-center">State</th>
            <th className="px-2 py-2 border text-center">P1</th>
            <th className="px-2 py-2 border text-center">P2</th>
            <th className="px-2 py-2 border text-center">P3</th>
            <th className="px-2 py-2 border text-center">Neutral</th>
            <th className="px-2 py-2 border text-center">Units</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={r.state}>
              <td className="border px-2 py-1 text-center whitespace-nowrap">{r.state}</td>
              <td className="border px-1 py-1"><input data-atscr-pos={`${idx}-0`} value={r.p1 || ''} onChange={(e)=>set(idx,{p1: e.target.value})} onKeyDown={(e)=>onArrow(e,idx,0)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center"/></td>
              <td className="border px-1 py-1"><input data-atscr-pos={`${idx}-1`} value={r.p2 || ''} onChange={(e)=>set(idx,{p2: e.target.value})} onKeyDown={(e)=>onArrow(e,idx,1)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center"/></td>
              <td className="border px-1 py-1"><input data-atscr-pos={`${idx}-2`} value={r.p3 || ''} onChange={(e)=>set(idx,{p3: e.target.value})} onKeyDown={(e)=>onArrow(e,idx,2)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center"/></td>
              <td className="border px-1 py-1"><input data-atscr-pos={`${idx}-3`} value={r.neutral || ''} onChange={(e)=>set(idx,{neutral: e.target.value})} onKeyDown={(e)=>onArrow(e,idx,3)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center"/></td>
              <td className="border px-1 py-1">
                <select data-atscr-pos={`${idx}-4`} value={r.units || 'µΩ'} onChange={(e)=>set(idx,{units: e.target.value})} onKeyDown={(e)=>onArrow(e as any,idx,4)} className="h-7 text-xs border rounded bg-white">
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


