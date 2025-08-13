import React from 'react';

interface FuseResistanceValue {
  asFound?: string;
  asLeft?: string;
  units?: string;
}

interface Props {
  value?: FuseResistanceValue;
  onChange: (next: FuseResistanceValue) => void;
}

const UNITS = ['µΩ', 'mΩ', 'Ω'];

export const FuseResistanceTable: React.FC<Props> = ({ value, onChange }) => {
  const v = value || {};

  const set = (updates: Partial<FuseResistanceValue>) => {
    onChange({ ...v, ...updates });
  };

  const onArrow = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>, r: number, c: number) => {
    const key = e.key;
    if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key)) return;
    e.preventDefault();
    const delta = key === 'ArrowLeft' ? [0,-1] : key === 'ArrowRight' ? [0,1] : key === 'ArrowUp' ? [-1,0] : [1,0];
    const nr = Math.max(0, Math.min(0, r + delta[0]));
    const nc = Math.max(0, Math.min(2, c + delta[1]));
    const next = document.querySelector<HTMLElement>(`[data-fr-pos="${nr}-${nc}"]`);
    next?.focus();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-2 py-2 border text-left">Fuse Resistance</th>
            <th className="px-2 py-2 border text-left">As Found</th>
            <th className="px-2 py-2 border text-left">As Left</th>
            <th className="px-2 py-2 border text-left">Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">Fuse Resistance</td>
            <td className="border px-2 py-1">
              <input
                data-fr-pos="0-0"
                value={v.asFound || ''}
                onChange={(e) => set({ asFound: e.target.value })}
                onKeyDown={(e) => onArrow(e, 0, 0)}
                className="w-full h-7 border-none bg-transparent focus:outline-none"
              />
            </td>
            <td className="border px-2 py-1">
              <input
                data-fr-pos="0-1"
                value={v.asLeft || ''}
                onChange={(e) => set({ asLeft: e.target.value })}
                onKeyDown={(e) => onArrow(e, 0, 1)}
                className="w-full h-7 border-none bg-transparent focus:outline-none"
              />
            </td>
            <td className="border px-2 py-1">
              <select
                data-fr-pos="0-2"
                value={v.units || 'µΩ'}
                onChange={(e) => set({ units: e.target.value })}
                onKeyDown={(e) => onArrow(e as any, 0, 2)}
                className="h-7 text-xs border rounded bg-white"
              >
                {UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


