import React from 'react';

export interface SimpleCrValue {
  rows?: Array<{ way: 'S1'|'S2'|'T1'|'T2'|'T3'; aPhase?: string; aGround?: string; bPhase?: string; bGround?: string; cPhase?: string; cGround?: string; units?: 'µΩ'|'mΩ'|'Ω'; }>;
}

interface Props {
  value?: SimpleCrValue;
  onChange: (next: SimpleCrValue) => void;
}

const DEFAULT_ROWS: NonNullable<SimpleCrValue['rows']> = [
  { way: 'S1', units: 'µΩ' },
  { way: 'S2', units: 'µΩ' },
  { way: 'T1', units: 'µΩ' },
  { way: 'T2', units: 'µΩ' },
  { way: 'T3', units: 'µΩ' },
];

const UNITS: Array<'µΩ'|'mΩ'|'Ω'> = ['µΩ','mΩ','Ω'];

export const SimpleContactResistanceTable: React.FC<Props> = ({ value, onChange }) => {
  const rows = (value?.rows && value.rows.length ? value.rows : DEFAULT_ROWS);
  const setRows = (next: typeof rows) => onChange({ rows: next });

  const updateRow = (index: number, updates: Partial<typeof rows[number]>) => {
    const next = [...rows];
    next[index] = { ...next[index], ...updates } as any;
    setRows(next);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300" style={{ tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '80px' }} />
          {Array.from({ length: 6 }).map((_,i)=>(<col key={i} style={{ width: 'auto' }} />))}
          <col style={{ width: '60px' }} />
        </colgroup>
        <thead>
          <tr>
            <th className="border px-2 py-1 bg-gray-100 text-xs">WAY SECTION</th>
            <th className="border px-2 py-1 bg-gray-100 text-xs">A-PHASE</th>
            <th className="border px-2 py-1 bg-gray-100 text-xs">A-GROUND</th>
            <th className="border px-2 py-1 bg-gray-100 text-xs">B-PHASE</th>
            <th className="border px-2 py-1 bg-gray-100 text-xs">B-GROUND</th>
            <th className="border px-2 py-1 bg-gray-100 text-xs">C-PHASE</th>
            <th className="border px-2 py-1 bg-gray-100 text-xs">C-GROUND</th>
            <th className="border px-2 py-1 bg-gray-100 text-xs">UNITS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.way}>
              <td className="border px-1 py-1 text-center text-xs font-medium">{row.way}</td>
              {(['aPhase','aGround','bPhase','bGround','cPhase','cGround'] as const).map((key) => (
                <td key={key} className="border px-1 py-1">
                  <input defaultValue={(row as any)[key] || ''} onBlur={(e)=>updateRow(idx,{ [key]: e.target.value } as any)} className="w-full h-6 text-center border-none bg-transparent focus:outline-none text-sm" />
                </td>
              ))}
              <td className="border px-1 py-1 text-center">
                <select defaultValue={row.units || 'µΩ'} onBlur={(e)=>updateRow(idx,{ units: e.target.value as any })} className="w-full h-6 text-center border-none bg-transparent text-sm">
                  {UNITS.map(u => (<option key={u} value={u}>{u}</option>))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


