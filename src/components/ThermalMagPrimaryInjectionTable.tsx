import React from 'react';

interface Pole { sec?: string; a?: string }
interface ThermalRow { amperes1?: string; multiplierTolerance?: string; amperes2?: string; toleranceMin?: string; toleranceMax?: string; pole1?: Pole; pole2?: Pole; pole3?: Pole }
export interface ThermalMagPrimaryInjectionValue { testedSettings?: { thermal?: string; magnetic?: string }; results?: { thermal?: ThermalRow; magnetic?: ThermalRow } }

interface Props { value?: ThermalMagPrimaryInjectionValue; onChange: (next: ThermalMagPrimaryInjectionValue) => void }

const ensure = (v?: ThermalMagPrimaryInjectionValue): Required<ThermalMagPrimaryInjectionValue> => ({
  testedSettings: { thermal: '', magnetic: '', ...(v?.testedSettings || {}) },
  results: {
    thermal: { multiplierTolerance: '300%', pole1: {}, pole2: {}, pole3: {}, ...(v?.results?.thermal || {}) },
    magnetic: { multiplierTolerance: '-10% 10%', pole1: {}, pole2: {}, pole3: {}, ...(v?.results?.magnetic || {}) },
  },
});

const calcSecondAmps = (amp1?: string, mult?: string): string => {
  const s = (amp1 || '').trim();
  if (s === '' || s.toUpperCase() === 'N/A') return s;
  const n = parseFloat(s);
  if (!Number.isFinite(n)) return '';
  if (mult === '300%') return (n * 3.0).toString();
  return s; // magnetic row copies amp1
};

const calcMagTol = (amp2?: string, isMin?: boolean): string => {
  const s = (amp2 || '').trim();
  if (s === '' || s.toUpperCase() === 'N/A') return s;
  const n = parseFloat(s);
  if (!Number.isFinite(n)) return '';
  const tol = isMin ? -0.1 : 0.1;
  return ((tol * n) + n).toString();
};

export const ThermalMagPrimaryInjectionTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);
  const setTested = (key: 'thermal' | 'magnetic', setVal: string) => onChange({ ...v, testedSettings: { ...v.testedSettings, [key]: setVal } });
  const setRow = (key: 'thermal' | 'magnetic', updates: Partial<ThermalRow>) => onChange({ ...v, results: { ...v.results, [key]: { ...v.results[key], ...updates } } });

  const Row: React.FC<{ label: 'thermal' | 'magnetic' }> = ({ label }) => {
    const r = v.results[label];
    const amp2 = calcSecondAmps(r.amperes1, r.multiplierTolerance);
    const tolMin = label === 'magnetic' ? calcMagTol(amp2, true) : r.toleranceMin;
    const tolMax = label === 'magnetic' ? calcMagTol(amp2, false) : r.toleranceMax;
    return (
      <tr>
        <td className="border px-2 py-2 text-sm capitalize">{label}</td>
        <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded text-center" defaultValue={r.amperes1 || ''} onBlur={(e)=>setRow(label,{ amperes1: e.target.value })} /></td>
        <td className="border px-2 py-2 text-center text-sm">{r.multiplierTolerance}</td>
        <td className="border px-2 py-2 text-center"><input readOnly className="w-full p-1 border rounded bg-gray-100 text-center" value={amp2} /></td>
        <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded text-center" defaultValue={tolMin || ''} onBlur={(e)=>setRow(label,{ toleranceMin: e.target.value })} /></td>
        <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded text-center" defaultValue={tolMax || ''} onBlur={(e)=>setRow(label,{ toleranceMax: e.target.value })} /></td>
        <td className="border px-2 py-2 text-center"><div className="flex items-center justify-center"><input className="w-16 p-1 border rounded text-center" defaultValue={r.pole1?.sec || ''} onBlur={(e)=>setRow(label,{ pole1: { ...(r.pole1||{}), sec: e.target.value } })} /><span className="ml-1">sec.</span></div></td>
        <td className="border px-2 py-2 text-center"><div className="flex items-center justify-center"><input className="w-16 p-1 border rounded text-center" defaultValue={r.pole2?.sec || ''} onBlur={(e)=>setRow(label,{ pole2: { ...(r.pole2||{}), sec: e.target.value } })} /><span className="ml-1">sec.</span></div></td>
        <td className="border px-2 py-2 text-center"><div className="flex items-center justify-center"><input className="w-16 p-1 border rounded text-center" defaultValue={r.pole3?.sec || ''} onBlur={(e)=>setRow(label,{ pole3: { ...(r.pole3||{}), sec: e.target.value } })} /><span className="ml-1">sec.</span></div></td>
      </tr>
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2 text-center">Tested Settings</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-2 py-2 text-left text-sm font-medium"></th>
                <th className="border px-2 py-2 text-center text-sm font-medium">Setting</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-2">Thermal</td>
                <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded" value={v.testedSettings.thermal || ''} onChange={(e)=>setTested('thermal', e.target.value)} /></td>
              </tr>
              <tr>
                <td className="border px-2 py-2">Magnetic</td>
                <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded" value={v.testedSettings.magnetic || ''} onChange={(e)=>setTested('magnetic', e.target.value)} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <caption className="caption-top p-2 text-lg font-medium">Primary Injection</caption>
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-2 py-2 text-left text-sm font-medium" rowSpan={2}>Function</th>
              <th className="border px-2 py-2 text-center text-sm font-medium">Amperes</th>
              <th className="border px-2 py-2 text-center text-sm font-medium">Multiplier Tolerance</th>
              <th className="border px-2 py-2 text-center text-sm font-medium">Amperes</th>
              <th className="border px-2 py-2 text-center text-sm font-medium" colSpan={2}>Tolerance</th>
              <th className="border px-2 py-2 text-center text-sm font-medium" colSpan={3}>Pole</th>
            </tr>
            <tr>
              <th className="border px-2 py-2"></th>
              <th className="border px-2 py-2"></th>
              <th className="border px-2 py-2"></th>
              <th className="border px-2 py-2">Min</th>
              <th className="border px-2 py-2">Max</th>
              <th className="border px-2 py-2">1 sec.</th>
              <th className="border px-2 py-2">2 sec.</th>
              <th className="border px-2 py-2">3 sec.</th>
            </tr>
          </thead>
          <tbody>
            <Row label="thermal" />
            <Row label="magnetic" />
          </tbody>
        </table>
      </div>
    </div>
  );
};


