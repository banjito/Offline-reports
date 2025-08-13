import React from 'react';

export interface CtIdRow { phase: string; serial?: string }
interface Props {
  value: { rows: CtIdRow[] };
  onChange: (next: { rows: CtIdRow[] }) => void;
}

export const CtIdentificationTable: React.FC<Props> = ({ value, onChange }) => {
  const rows = value?.rows?.length ? value.rows : [
    { phase: '' }, { phase: '' }, { phase: '' }, { phase: '' }
  ];

  const update = (idx: number, patch: Partial<CtIdRow>) => {
    const next = { rows: rows.map((r, i) => (i === idx ? { ...r, ...patch } : r)) };
    onChange(next);
  };

  const headers = [
    { label: 'Phase 1', phaseKey: 0 },
    { label: 'Phase 2', phaseKey: 1 },
    { label: 'Phase 3', phaseKey: 2 },
    { label: 'Neutral', phaseKey: 3 },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50">
            {headers.map(h => (
              <th key={h.label} className="px-3 py-2 text-left border">{h.label}</th>
            ))}
          </tr>
          <tr className="bg-gray-50">
            {headers.map(h => (
              <th key={h.label+':serial'} className="px-3 py-2 text-left border">Serial #</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {headers.map((h, i) => (
              <td key={h.label} className="border px-2 py-1">
                <input
                  value={rows[i]?.phase ?? ''}
                  onChange={(e) => update(i, { phase: e.target.value })}
                  className="w-full h-8 border-none bg-transparent focus:outline-none"
                />
              </td>
            ))}
          </tr>
          <tr>
            {headers.map((h, i) => (
              <td key={h.label+':s'} className="border px-2 py-1">
                <input
                  value={rows[i]?.serial ?? ''}
                  onChange={(e) => update(i, { serial: e.target.value })}
                  className="w-full h-8 border-none bg-transparent focus:outline-none"
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};


