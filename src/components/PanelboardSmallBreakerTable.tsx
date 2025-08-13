import React, { useEffect, useMemo } from 'react';

type BreakerRow = {
  result?: '' | 'PASS' | 'FAIL';
  circuitNumber?: string;
  poles?: '' | '1' | '2' | '3';
  manuf?: string;
  type?: string;
  frameA?: string;
  tripA?: string;
  ratedCurrentA?: string;
  testCurrentA?: string; // computed 3x rated
  tripToleranceMin?: string;
  tripToleranceMax?: string;
  tripTime?: string;
  insulationLL?: string;
  insulationLP?: string;
  insulationPP?: string;
};

export interface PanelboardSmallBreakerValue {
  numberOfSpaces?: number; // optional mirror value
  breakers?: BreakerRow[];
}

interface Props {
  value?: PanelboardSmallBreakerValue;
  onChange: (next: PanelboardSmallBreakerValue) => void;
}

const ensure = (v?: PanelboardSmallBreakerValue): Required<PanelboardSmallBreakerValue> => ({
  numberOfSpaces: v?.numberOfSpaces || (typeof (window as any).__NUM_BREAKERS === 'number' ? (window as any).__NUM_BREAKERS : 120),
  breakers: [...(v?.breakers || [])],
});

const makeRow = (index: number): BreakerRow => ({
  circuitNumber: String(index + 1),
  result: '',
  poles: '',
  manuf: '',
  type: '',
  frameA: '',
  tripA: '',
  ratedCurrentA: '',
  testCurrentA: '',
  tripToleranceMin: '',
  tripToleranceMax: '',
  tripTime: '',
  insulationLL: '',
  insulationLP: '',
  insulationPP: '',
});

export const PanelboardSmallBreakerTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);

  const desiredCount = useMemo(() => {
    const globalN = (window as any).__NUM_BREAKERS as number | undefined;
    return Number.isFinite(globalN) ? (globalN as number) : v.numberOfSpaces;
  }, [v.numberOfSpaces]);

  // Keep row count in sync with desired count
  useEffect(() => {
    const applyDesired = (n: number) => {
      const next = ensure({ ...v });
      let changed = false;
      if (next.numberOfSpaces !== n) { next.numberOfSpaces = n; changed = true; }
      const currentLen = next.breakers.length;
      if (currentLen < n) {
        for (let i = currentLen; i < n; i += 1) next.breakers.push(makeRow(i));
        changed = true;
      } else if (currentLen > n) {
        next.breakers = next.breakers.slice(0, n);
        changed = true;
      }
      // Ensure circuit numbers align with index
      for (let i = 0; i < next.breakers.length; i += 1) {
        const expect = String(i + 1);
        if (next.breakers[i].circuitNumber !== expect) {
          next.breakers[i] = { ...next.breakers[i], circuitNumber: expect };
          changed = true;
        }
      }
      if (changed) onChange(next);
    };

    applyDesired(desiredCount);

    const handler = (e: any) => {
      const n = Number(e?.detail);
      if (Number.isFinite(n)) applyDesired(n);
    };
    window.addEventListener('num-breakers-changed', handler as EventListener);
    return () => window.removeEventListener('num-breakers-changed', handler as EventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desiredCount, v.breakers.length, v.numberOfSpaces]);

  const setRow = (idx: number, updates: Partial<BreakerRow>) => {
    const next = ensure({ ...v });
    // compute test current if rated current edited
    if (updates.ratedCurrentA !== undefined) {
      const rated = Number(updates.ratedCurrentA);
      if (Number.isFinite(rated)) updates.testCurrentA = String(rated * 3);
      else updates.testCurrentA = '';
    }
    next.breakers[idx] = { ...next.breakers[idx], ...updates };
    onChange(next);
  };

  const rows = v.breakers;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-xs">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-1 py-1">Result</th>
            <th className="border px-1 py-1">Circuit</th>
            <th className="border px-1 py-1">Poles</th>
            <th className="border px-1 py-1">Manuf.</th>
            <th className="border px-1 py-1">Type</th>
            <th className="border px-1 py-1">Frame</th>
            <th className="border px-1 py-1">Trip</th>
            <th className="border px-1 py-1">Rated</th>
            <th className="border px-1 py-1">Test</th>
            <th className="border px-1 py-1">Min</th>
            <th className="border px-1 py-1">Max</th>
            <th className="border px-1 py-1">Time</th>
            <th className="border px-1 py-1">L-L</th>
            <th className="border px-1 py-1">L-P</th>
            <th className="border px-1 py-1">P-P</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx}>
              <td className="border px-1 py-1">
                <select className="w-full text-xs" value={r.result || ''} onChange={(e)=>setRow(idx,{ result: e.target.value as any })}>
                  <option value=""></option>
                  <option value="PASS">PASS</option>
                  <option value="FAIL">FAIL</option>
                </select>
              </td>
              <td className="border px-1 py-1 text-center">{r.circuitNumber}</td>
              <td className="border px-1 py-1">
                <select className="w-full text-xs" value={r.poles || ''} onChange={(e)=>setRow(idx,{ poles: e.target.value as any })}>
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </td>
              {(['manuf','type','frameA','tripA','ratedCurrentA'] as const).map((k)=> (
                <td key={k} className="border px-1 py-1"><input className="w-full text-xs border-0 focus:ring-0" value={(r as any)[k] || ''} onChange={(e)=>setRow(idx,{ [k]: e.target.value } as any)} /></td>
              ))}
              <td className="border px-1 py-1"><input className="w-full text-xs border-0 focus:ring-0 bg-gray-50" readOnly value={r.testCurrentA || ''} /></td>
              {(['tripToleranceMin','tripToleranceMax','tripTime','insulationLL','insulationLP','insulationPP'] as const).map((k)=> (
                <td key={k} className="border px-1 py-1"><input className="w-full text-xs border-0 focus:ring-0" value={(r as any)[k] || ''} onChange={(e)=>setRow(idx,{ [k]: e.target.value } as any)} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


