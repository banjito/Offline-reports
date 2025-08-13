import React from 'react';

type RatioRow = {
  id: string;
  identifier?: string;
  ratio?: string;
  testValue?: string; // voltage or current value depending on testType
  pri?: string;
  sec?: string;
  measuredRatio?: string;
  ratioDev?: string;
  polarity?: string;
};

interface Props {
  value: { rows: RatioRow[]; testType?: 'voltage' | 'current' };
  onChange: (next: { rows: RatioRow[]; testType?: 'voltage' | 'current' }) => void;
}

const POLARITY_OPTIONS = ['Select One', 'Satisfactory', 'Unsatisfactory', 'N/A'];

export const RatioPolarityTable: React.FC<Props> = ({ value, onChange }) => {
  const rows = value?.rows?.length ? value.rows : Array.from({ length: 4 }, (_, i) => ({ id: `rp-${i}` }));
  const testType = value?.testType || 'voltage';

  const update = (idx: number, patch: Partial<RatioRow>) => {
    const next = { rows: rows.map((r, i) => (i === idx ? { ...r, ...patch } : r)), testType };
    onChange(next);
  };

  const handleArrow = (e: React.KeyboardEvent<HTMLElement>, r: number, c: number) => {
    const key = e.key;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter'].includes(key)) return;
    e.preventDefault();
    const totalCols = 8; // 0..7
    const maxRow = rows.length - 1;
    let nr = r, nc = c;
    if (key === 'ArrowLeft') nc = Math.max(0, c - 1);
    if (key === 'ArrowRight' || key === 'Enter') nc = Math.min(totalCols - 1, c + 1);
    if (key === 'ArrowUp') nr = Math.max(0, r - 1);
    if (key === 'ArrowDown') nr = Math.min(maxRow, r + 1);
    const target = document.querySelector<HTMLElement>(`[data-rp-pos="${nr}-${nc}"]`);
    target?.focus();
  };

  const toggleType = () => {
    const nextType: 'voltage' | 'current' = testType === 'voltage' ? 'current' : 'voltage';
    onChange({ rows, testType: nextType });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-50">
            {['Identifier','Ratio', testType === 'current' ? 'Test Current' : 'Test Voltage','Pri.','Sec.','Measured Ratio','Ratio Dev.','Polarity'].map((h) => (
              <th key={h} className="px-2 py-2 border text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="border px-1 py-0.5">
                <input data-rp-pos={`${rIdx}-0`} value={row.identifier ?? ''} onChange={(e) => update(rIdx,{identifier: e.target.value})} onKeyDown={(e)=>handleArrow(e,rIdx,0)} className="w-full h-7 border-none bg-transparent focus:outline-none" />
              </td>
              <td className="border px-1 py-0.5">
                <input data-rp-pos={`${rIdx}-1`} value={row.ratio ?? ''} onChange={(e) => update(rIdx,{ratio: e.target.value})} onKeyDown={(e)=>handleArrow(e,rIdx,1)} className="w-full h-7 border-none bg-transparent focus:outline-none" />
              </td>
              <td className="border px-1 py-0.5">
                <input data-rp-pos={`${rIdx}-2`} value={row.testValue ?? ''} onChange={(e) => update(rIdx,{testValue: e.target.value})} onKeyDown={(e)=>handleArrow(e,rIdx,2)} className="w-full h-7 border-none bg-transparent focus:outline-none" placeholder={testType === 'current' ? 'Enter current' : 'Enter voltage'} />
              </td>
              <td className="border px-1 py-0.5">
                <input data-rp-pos={`${rIdx}-3`} value={row.pri ?? ''} onChange={(e) => update(rIdx,{pri: e.target.value})} onKeyDown={(e)=>handleArrow(e,rIdx,3)} className="w-full h-7 border-none bg-transparent focus:outline-none" />
              </td>
              <td className="border px-1 py-0.5">
                <input data-rp-pos={`${rIdx}-4`} value={row.sec ?? ''} onChange={(e) => update(rIdx,{sec: e.target.value})} onKeyDown={(e)=>handleArrow(e,rIdx,4)} className="w-full h-7 border-none bg-transparent focus:outline-none" />
              </td>
              <td className="border px-1 py-0.5">
                <input data-rp-pos={`${rIdx}-5`} value={row.measuredRatio ?? ''} onChange={(e) => update(rIdx,{measuredRatio: e.target.value})} onKeyDown={(e)=>handleArrow(e,rIdx,5)} className="w-full h-7 border-none bg-transparent focus:outline-none" />
              </td>
              <td className="border px-1 py-0.5">
                <input data-rp-pos={`${rIdx}-6`} value={row.ratioDev ?? ''} onChange={(e) => update(rIdx,{ratioDev: e.target.value})} onKeyDown={(e)=>handleArrow(e,rIdx,6)} className="w-full h-7 border-none bg-transparent focus:outline-none" />
              </td>
              <td className="border px-1 py-0.5">
                <select data-rp-pos={`${rIdx}-7`} value={row.polarity ?? 'Select One'} onChange={(e)=>update(rIdx,{polarity: e.target.value})} onKeyDown={(e)=>handleArrow(e,rIdx,7)} className="w-full h-7 text-xs border border-gray-300 rounded-sm bg-white">
                  {POLARITY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-2 mt-2">
        <button className="px-2 py-1 text-xs bg-gray-100 rounded border" onClick={toggleType}>
          Switch to {testType === 'voltage' ? 'Current' : 'Voltage'}
        </button>
      </div>
    </div>
  );
};


