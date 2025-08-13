import React, { useMemo } from 'react';

export interface PanelboardContactResistanceValue {
  rows?: Array<{
    aPhase?: string;
    bPhase?: string;
    cPhase?: string;
    neutral?: string;
    ground?: string;
    unit?: 'µΩ' | 'mΩ' | 'Ω';
  }>;
}

interface Props {
  value?: PanelboardContactResistanceValue;
  onChange: (next: PanelboardContactResistanceValue) => void;
}

const DEFAULT_ROWS = [{ unit: 'µΩ' as const }];

export const PanelboardContactResistanceTable: React.FC<Props> = ({ value, onChange }) => {
  const v = useMemo<PanelboardContactResistanceValue>(() => ({
    rows: value?.rows && value.rows.length ? value.rows : DEFAULT_ROWS,
  }), [value]);

  const set = (u: Partial<PanelboardContactResistanceValue>) => onChange({ ...v, ...u });

  const setRow = (idx: number, field: keyof NonNullable<PanelboardContactResistanceValue['rows']>[number], val: string) => {
    const rows = [...(v.rows || [])];
    rows[idx] = { ...(rows[idx] || {}), [field]: val } as any;
    set({ rows });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1"></th>
            <th className="border px-2 py-1">A Phase</th>
            <th className="border px-2 py-1">B Phase</th>
            <th className="border px-2 py-1">C Phase</th>
            <th className="border px-2 py-1">Neutral</th>
            <th className="border px-2 py-1">Ground</th>
            <th className="border px-2 py-1"></th>
          </tr>
        </thead>
        <tbody>
          {(v.rows || DEFAULT_ROWS).map((row, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1"></td>
              <td className="border px-2 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={row.aPhase || ''} onBlur={(e)=>setRow(idx, 'aPhase', e.target.value)} /></td>
              <td className="border px-2 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={row.bPhase || ''} onBlur={(e)=>setRow(idx, 'bPhase', e.target.value)} /></td>
              <td className="border px-2 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={row.cPhase || ''} onBlur={(e)=>setRow(idx, 'cPhase', e.target.value)} /></td>
              <td className="border px-2 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={row.neutral || ''} onBlur={(e)=>setRow(idx, 'neutral', e.target.value)} /></td>
              <td className="border px-2 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={row.ground || ''} onBlur={(e)=>setRow(idx, 'ground', e.target.value)} /></td>
              <td className="border px-2 py-1">
                <select className="w-full h-7 border-none bg-transparent text-center focus:outline-none" value={row.unit || 'µΩ'} onChange={(e)=>setRow(idx, 'unit', e.target.value)}>
                  <option value="µΩ">µΩ</option>
                  <option value="mΩ">mΩ</option>
                  <option value="Ω">Ω</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


