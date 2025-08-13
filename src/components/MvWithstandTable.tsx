import React from 'react';

export interface WithstandReadingPhase { mA?: string; nF?: string; currentUnit?: 'mA'|'µA' }
export interface WithstandReading {
  timeMinutes?: string;
  kVAC?: string;
  phaseA?: WithstandReadingPhase;
  phaseB?: WithstandReadingPhase;
  phaseC?: WithstandReadingPhase;
}

export interface MvWithstandValue { readings?: WithstandReading[] }

interface Props { value?: MvWithstandValue; onChange: (next: MvWithstandValue) => void }

const ensure = (v?: MvWithstandValue): Required<MvWithstandValue> => ({
  readings: v?.readings && v.readings.length ? v.readings : [
    { timeMinutes: '10', kVAC: '13', phaseA: { currentUnit: 'mA' }, phaseB: { currentUnit: 'mA' }, phaseC: { currentUnit: 'mA' } },
    { timeMinutes: '20', kVAC: '13', phaseA: { currentUnit: 'mA' }, phaseB: { currentUnit: 'mA' }, phaseC: { currentUnit: 'mA' } },
    { timeMinutes: '30', kVAC: '13', phaseA: { currentUnit: 'mA' }, phaseB: { currentUnit: 'mA' }, phaseC: { currentUnit: 'mA' } },
    { timeMinutes: '40', kVAC: '13', phaseA: { currentUnit: 'mA' }, phaseB: { currentUnit: 'mA' }, phaseC: { currentUnit: 'mA' } },
    { timeMinutes: '50', kVAC: '13', phaseA: { currentUnit: 'mA' }, phaseB: { currentUnit: 'mA' }, phaseC: { currentUnit: 'mA' } },
    { timeMinutes: '60', kVAC: '13', phaseA: { currentUnit: 'mA' }, phaseB: { currentUnit: 'mA' }, phaseC: { currentUnit: 'mA' } },
  ]
});

const CURRENT_UNITS: Array<'mA'|'µA'> = ['mA','µA'];

export const MvWithstandTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);

  const setReading = (i: number, updates: Partial<WithstandReading>) => {
    const next = ensure({ ...v });
    next.readings[i] = { ...next.readings[i], ...updates } as WithstandReading;
    onChange(next);
  };

  const setPhase = (i: number, phase: 'phaseA'|'phaseB'|'phaseC', sub: Partial<WithstandReadingPhase>) => {
    const next = ensure({ ...v });
    next.readings[i] = { ...next.readings[i], [phase]: { ...(next.readings[i][phase] || {}), ...sub } } as WithstandReading;
    onChange(next);
  };

  const setAllPhaseUnit = (phase: 'phaseA'|'phaseB'|'phaseC', unit: 'mA'|'µA') => {
    const next = ensure({ ...v });
    next.readings = next.readings.map(r => ({ ...r, [phase]: { ...(r[phase] || {}), currentUnit: unit } })) as WithstandReading[];
    onChange(next);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-2">Time (min)</th>
            <th className="border px-2 py-2">kVAC</th>
            <th className="border px-2 py-2" colSpan={2}>A Phase</th>
            <th className="border px-2 py-2" colSpan={2}>B Phase</th>
            <th className="border px-2 py-2" colSpan={2}>C Phase</th>
          </tr>
          <tr>
            <th className="border px-2 py-2" />
            <th className="border px-2 py-2" />
            <th className="border px-2 py-2">
              <select className="w-20 border rounded p-1" value={v.readings[0]?.phaseA?.currentUnit || 'mA'} onChange={(e)=>setAllPhaseUnit('phaseA', e.target.value as any)}>
                {CURRENT_UNITS.map(u => (<option key={u} value={u}>{u}</option>))}
              </select>
            </th>
            <th className="border px-2 py-2">nF</th>
            <th className="border px-2 py-2">
              <select className="w-20 border rounded p-1" value={v.readings[0]?.phaseB?.currentUnit || 'mA'} onChange={(e)=>setAllPhaseUnit('phaseB', e.target.value as any)}>
                {CURRENT_UNITS.map(u => (<option key={u} value={u}>{u}</option>))}
              </select>
            </th>
            <th className="border px-2 py-2">nF</th>
            <th className="border px-2 py-2">
              <select className="w-20 border rounded p-1" value={v.readings[0]?.phaseC?.currentUnit || 'mA'} onChange={(e)=>setAllPhaseUnit('phaseC', e.target.value as any)}>
                {CURRENT_UNITS.map(u => (<option key={u} value={u}>{u}</option>))}
              </select>
            </th>
            <th className="border px-2 py-2">nF</th>
          </tr>
        </thead>
        <tbody>
          {v.readings.map((r, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0" value={r.timeMinutes || ''} onChange={(e)=>setReading(idx,{ timeMinutes: e.target.value })} /></td>
              <td className="border px-2 py-1"><input className="w-full text-center border-0 focus:ring-0" value={r.kVAC || ''} onChange={(e)=>setReading(idx,{ kVAC: e.target.value })} /></td>
              <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0" value={r.phaseA?.mA || ''} onChange={(e)=>setPhase(idx,'phaseA',{ mA: e.target.value })} /></td>
              <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0" value={r.phaseA?.nF || ''} onChange={(e)=>setPhase(idx,'phaseA',{ nF: e.target.value })} /></td>
              <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0" value={r.phaseB?.mA || ''} onChange={(e)=>setPhase(idx,'phaseB',{ mA: e.target.value })} /></td>
              <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0" value={r.phaseB?.nF || ''} onChange={(e)=>setPhase(idx,'phaseB',{ nF: e.target.value })} /></td>
              <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0" value={r.phaseC?.mA || ''} onChange={(e)=>setPhase(idx,'phaseC',{ mA: e.target.value })} /></td>
              <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0" value={r.phaseC?.nF || ''} onChange={(e)=>setPhase(idx,'phaseC',{ nF: e.target.value })} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


