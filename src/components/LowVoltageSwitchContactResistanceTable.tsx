import React from 'react';

export interface LowVoltageSwitchContactResistanceValue {
  units?: string;
  poleToPole?: {
    p1p2?: string;
    p2p3?: string;
    p3p1?: string;
  };
  poleToFrame?: {
    p1?: string;
    p2?: string;
    p3?: string;
  };
  lineToLoad?: {
    p1?: string;
    p2?: string;
    p3?: string;
  };
}

interface Props {
  value?: LowVoltageSwitchContactResistanceValue;
  onChange: (next: LowVoltageSwitchContactResistanceValue) => void;
}

const ensure = (v?: LowVoltageSwitchContactResistanceValue): LowVoltageSwitchContactResistanceValue => ({
  units: v?.units || 'μΩ',
  poleToPole: v?.poleToPole || { p1p2: '', p2p3: '', p3p1: '' },
  poleToFrame: v?.poleToFrame || { p1: '', p2: '', p3: '' },
  lineToLoad: v?.lineToLoad || { p1: '', p2: '', p3: '' }
});

export const LowVoltageSwitchContactResistanceTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);

  const setField = (updates: Partial<LowVoltageSwitchContactResistanceValue>) => onChange({ ...v, ...updates });

  const setPoleToPole = (field: keyof LowVoltageSwitchContactResistanceValue['poleToPole'], value: string) => {
    const next = ensure({ ...v });
    if (next.poleToPole) {
      next.poleToPole[field] = value;
      onChange(next);
    }
  };

  const setPoleToFrame = (field: keyof LowVoltageSwitchContactResistanceValue['poleToFrame'], value: string) => {
    const next = ensure({ ...v });
    if (next.poleToFrame) {
      next.poleToFrame[field] = value;
      onChange(next);
    }
  };

  const setLineToLoad = (field: keyof LowVoltageSwitchContactResistanceValue['lineToLoad'], value: string) => {
    const next = ensure({ ...v });
    if (next.lineToLoad) {
      next.lineToLoad[field] = value;
      onChange(next);
    }
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="text-lg font-bold">Contact Resistance</div>
      
      {/* Units Section */}
      <div className="flex items-center gap-2">
        <span>Units:</span>
        <select 
          className="border border-gray-300 rounded px-2 py-1"
          value={v.units}
          onChange={(e) => setField({ units: e.target.value })}
        >
          <option value="μΩ">μΩ</option>
          <option value="mΩ">mΩ</option>
          <option value="Ω">Ω</option>
        </select>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th colSpan={3} className="border px-2 py-2 text-center">Pole-to-Pole</th>
              <th colSpan={3} className="border px-2 py-2 text-center">Pole-to-Frame</th>
              <th colSpan={3} className="border px-2 py-2 text-center">Line-to-Load</th>
            </tr>
            <tr>
              <th className="border px-2 py-2">P1-P2</th>
              <th className="border px-2 py-2">P2-P3</th>
              <th className="border px-2 py-2">P3-P1</th>
              <th className="border px-2 py-2">P1</th>
              <th className="border px-2 py-2">P2</th>
              <th className="border px-2 py-2">P3</th>
              <th className="border px-2 py-2">P1</th>
              <th className="border px-2 py-2">P2</th>
              <th className="border px-2 py-2">P3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center" 
                  value={v.poleToPole?.p1p2 || ''}
                  onChange={(e) => setPoleToPole('p1p2', e.target.value)}
                />
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center" 
                  value={v.poleToPole?.p2p3 || ''}
                  onChange={(e) => setPoleToPole('p2p3', e.target.value)}
                />
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center" 
                  value={v.poleToPole?.p3p1 || ''}
                  onChange={(e) => setPoleToPole('p3p1', e.target.value)}
                />
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center" 
                  value={v.poleToFrame?.p1 || ''}
                  onChange={(e) => setPoleToFrame('p1', e.target.value)}
                />
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center" 
                  value={v.poleToFrame?.p2 || ''}
                  onChange={(e) => setPoleToFrame('p2', e.target.value)}
                />
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center" 
                  value={v.poleToFrame?.p3 || ''}
                  onChange={(e) => setPoleToFrame('p3', e.target.value)}
                />
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center" 
                  value={v.lineToLoad?.p1 || ''}
                  onChange={(e) => setLineToLoad('p1', e.target.value)}
                />
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center" 
                  value={v.lineToLoad?.p2 || ''}
                  onChange={(e) => setLineToLoad('p2', e.target.value)}
                />
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center" 
                  value={v.lineToLoad?.p3 || ''}
                  onChange={(e) => setLineToLoad('p3', e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


