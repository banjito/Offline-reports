import React from 'react';

type UnitsOption = 'µΩ' | 'mΩ';

export interface LvSwitchContactRow {
  position?: string;
  sw_p1?: string; sw_p2?: string; sw_p3?: string;
  fu_p1?: string; fu_p2?: string; fu_p3?: string;
  sf_p1?: string; sf_p2?: string; sf_p3?: string;
  units?: UnitsOption;
}

export interface LvSwitchContactValue { rows?: LvSwitchContactRow[] }

interface Props { value?: LvSwitchContactValue; onChange: (next: LvSwitchContactValue) => void }

const UNITS: UnitsOption[] = ['µΩ', 'mΩ'];

const ensure = (v?: LvSwitchContactValue): Required<LvSwitchContactValue> => {
  const base: LvSwitchContactRow = { units: 'µΩ' };
  let rows = v?.rows && v.rows.length ? v.rows.slice(0, 6) : Array.from({ length: 6 }, () => ({ ...base }));
  while (rows.length < 6) rows.push({ ...base });
  return { rows };
};

export const LowVoltageSwitchContactResistanceTableMulti: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);

  const setRow = (i: number, updates: Partial<LvSwitchContactRow>) => {
    const next = ensure({ ...v });
    next.rows[i] = { ...next.rows[i], ...updates };
    onChange(next);
  };

  const renderReadingCell = (idx: number, key: keyof LvSwitchContactRow) => (
    <td className="border px-2 py-1">
      <input
        className="w-full border-0 focus:ring-0 text-center"
        value={(v.rows[idx][key] as string) || ''}
        onChange={(e) => setRow(idx, { [key]: e.target.value } as Partial<LvSwitchContactRow>)}
      />
    </td>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="border px-2 py-2 align-bottom" rowSpan={2}>Position / Identifier</th>
            <th className="border px-2 py-1 text-center" colSpan={3}>Switch</th>
            <th className="border px-2 py-1 text-center" colSpan={3}>Fuse</th>
            <th className="border px-2 py-1 text-center" colSpan={3}>Switch + Fuse</th>
            <th className="border px-2 py-2 align-bottom" rowSpan={2}>Units</th>
          </tr>
          <tr className="bg-gray-50">
            <th className="border px-2 py-1 text-center">P1</th>
            <th className="border px-2 py-1 text-center">P2</th>
            <th className="border px-2 py-1 text-center">P3</th>
            <th className="border px-2 py-1 text-center">P1</th>
            <th className="border px-2 py-1 text-center">P2</th>
            <th className="border px-2 py-1 text-center">P3</th>
            <th className="border px-2 py-1 text-center">P1</th>
            <th className="border px-2 py-1 text-center">P2</th>
            <th className="border px-2 py-1 text-center">P3</th>
          </tr>
        </thead>
        <tbody>
          {v.rows.map((r, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1 w-48">
                <input
                  className="w-full border-0 focus:ring-0"
                  value={r.position || ''}
                  onChange={(e) => setRow(idx, { position: e.target.value })}
                />
              </td>
              {renderReadingCell(idx, 'sw_p1')}
              {renderReadingCell(idx, 'sw_p2')}
              {renderReadingCell(idx, 'sw_p3')}
              {renderReadingCell(idx, 'fu_p1')}
              {renderReadingCell(idx, 'fu_p2')}
              {renderReadingCell(idx, 'fu_p3')}
              {renderReadingCell(idx, 'sf_p1')}
              {renderReadingCell(idx, 'sf_p2')}
              {renderReadingCell(idx, 'sf_p3')}
              <td className="border px-2 py-1">
                <select
                  className="w-full border-0 focus:ring-0"
                  value={r.units || 'µΩ'}
                  onChange={(e) => setRow(idx, { units: e.target.value as UnitsOption })}
                >
                  {UNITS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


