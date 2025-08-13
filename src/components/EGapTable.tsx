import React from 'react';

interface Value {
  unitMeasurement?: string;
  tolerance?: string;
  aPhase?: string;
  bPhase?: string;
  cPhase?: string;
}

interface Props {
  value?: Value;
  onChange: (next: Value) => void;
}

export const EGapTable: React.FC<Props> = ({ value, onChange }) => {
  const v = value || {};
  const set = (updates: Partial<Value>) => onChange({ ...v, ...updates });

  const onArrow = (e: React.KeyboardEvent<HTMLInputElement>, r: number, c: number) => {
    const key = e.key;
    if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key)) return;
    e.preventDefault();
    const delta = key === 'ArrowLeft' ? [0,-1] : key === 'ArrowRight' ? [0,1] : key === 'ArrowUp' ? [-1,0] : [1,0];
    const nr = Math.max(0, Math.min(0, r + delta[0]));
    const nc = Math.max(0, Math.min(4, c + delta[1]));
    document.querySelector<HTMLElement>(`[data-eg-pos="${nr}-${nc}"]`)?.focus();
  };

  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full border-collapse border text-xs">
        <thead>
          <tr>
            <th className="px-3 py-2 text-center border">E-Gap</th>
            <th className="px-3 py-2 text-center border">Unit Measurement</th>
            <th className="px-3 py-2 text-center border">Tolerance</th>
            <th className="px-3 py-2 text-center border">A-Phase</th>
            <th className="px-3 py-2 text-center border">B-Phase</th>
            <th className="px-3 py-2 text-center border">C-Phase</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-3 py-2" />
            <td className="border px-2 py-1"><input data-eg-pos="0-0" value={v.unitMeasurement || ''} onChange={(e)=>set({unitMeasurement: e.target.value})} onKeyDown={(e)=>onArrow(e,0,0)} className="w-full h-7 text-center border-none bg-transparent focus:outline-none" /></td>
            <td className="border px-2 py-1"><input data-eg-pos="0-1" value={v.tolerance || ''} onChange={(e)=>set({tolerance: e.target.value})} onKeyDown={(e)=>onArrow(e,0,1)} className="w-full h-7 text-center border-none bg-transparent focus:outline-none" /></td>
            <td className="border px-2 py-1"><input data-eg-pos="0-2" value={v.aPhase || ''} onChange={(e)=>set({aPhase: e.target.value})} onKeyDown={(e)=>onArrow(e,0,2)} className="w-full h-7 text-center border-none bg-transparent focus:outline-none" /></td>
            <td className="border px-2 py-1"><input data-eg-pos="0-3" value={v.bPhase || ''} onChange={(e)=>set({bPhase: e.target.value})} onKeyDown={(e)=>onArrow(e,0,3)} className="w-full h-7 text-center border-none bg-transparent focus:outline-none" /></td>
            <td className="border px-2 py-1"><input data-eg-pos="0-4" value={v.cPhase || ''} onChange={(e)=>set({cPhase: e.target.value})} onKeyDown={(e)=>onArrow(e,0,4)} className="w-full h-7 text-center border-none bg-transparent focus:outline-none" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


