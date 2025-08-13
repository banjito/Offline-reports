import React, { useMemo } from 'react';
import { convertFahrenheitToCelsius, getTCF, applyTCF } from '../lib/tcf';

type IrRow = {
  position?: string;
  // Pole to Pole (switch open)
  p1p2?: string; p2p3?: string; p3p1?: string;
  // Pole to Frame (switch closed)
  p1_frame?: string; p2_frame?: string; p3_frame?: string;
  // Line to Load (switch closed)
  p1_line?: string; p2_line?: string; p3_line?: string;
  units?: string; // default MΩ
};

export interface SwitchInsulationValue {
  testVoltage?: string; // 250V, 500V, 1000V, etc.
  rows?: IrRow[];
}

interface Props {
  value?: SwitchInsulationValue;
  onChange: (next: SwitchInsulationValue) => void;
  temperatureF?: number;
}

const TEST_VOLTAGES = ['250V','500V','1000V','2500V','5000V','10000V'];

const ensure = (v?: SwitchInsulationValue): Required<SwitchInsulationValue> => ({
  testVoltage: v?.testVoltage || '1000V',
  rows: (v?.rows && v.rows.length ? v.rows : Array.from({ length: 1 }, () => ({ units: 'MΩ' })))
});

export const SwitchInsulationTables: React.FC<Props> = ({ value, onChange, temperatureF }) => {
  const v = ensure(value);

  const tcf = useMemo(() => {
    const f = typeof temperatureF === 'number' ? temperatureF : (window as any).__REPORT_TEMP_F;
    if (typeof f !== 'number') return undefined;
    const c = convertFahrenheitToCelsius(f);
    return getTCF(c);
  }, [temperatureF, (window as any)?.__REPORT_TEMP_F]);

  const setRow = (idx: number, updates: Partial<IrRow>) => {
    const next = ensure({ ...v });
    next.rows[idx] = { ...next.rows[idx], ...updates };
    onChange(next);
  };

  const setTestVoltage = (volts: string) => onChange({ ...v, testVoltage: volts });

  const correctedOf = (val?: string) => (typeof tcf === 'number' ? applyTCF(val || '', tcf) : '');

  return (
    <div className="space-y-6">
      {/* Measured */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Electrical Tests - Measured Insulation Resistance Values</h3>
          <div className="flex items-center">
            <label className="mr-2 text-sm">Test Voltage:</label>
            <select value={v.testVoltage} onChange={(e)=>setTestVoltage(e.target.value)} className="w-32 border rounded text-sm p-1">
              {TEST_VOLTAGES.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-xs">
            <thead>
              <tr>
                <th className="border px-2 py-2" rowSpan={2}>Position / Identifier</th>
                <th className="border px-2 py-2 text-center" colSpan={9}>Insulation Resistance</th>
                <th className="border px-2 py-2" rowSpan={2}>Units</th>
              </tr>
              <tr className="bg-gray-50">
                <th className="border px-2 py-2 text-center" colSpan={3}>Pole to Pole (switch open)</th>
                <th className="border px-2 py-2 text-center" colSpan={3}>Pole to Frame (switch closed)</th>
                <th className="border px-2 py-2 text-center" colSpan={3}>Line to Load (switch closed)</th>
              </tr>
              <tr className="bg-gray-50">
                <th className="border px-2 py-2" />
                <th className="border px-2 py-2 text-center">P1-P2</th>
                <th className="border px-2 py-2 text-center">P2-P3</th>
                <th className="border px-2 py-2 text-center">P3-P1</th>
                <th className="border px-2 py-2 text-center">P1</th>
                <th className="border px-2 py-2 text-center">P2</th>
                <th className="border px-2 py-2 text-center">P3</th>
                <th className="border px-2 py-2 text-center">P1</th>
                <th className="border px-2 py-2 text-center">P2</th>
                <th className="border px-2 py-2 text-center">P3</th>
                <th className="border px-2 py-2 text-center">Units</th>
              </tr>
            </thead>
            <tbody>
              {v.rows.map((r, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0" value={r.position || ''} onChange={(e)=>setRow(idx,{ position: e.target.value })} /></td>
                  <td className="border px-1 py-1"><input className="w-full text-center border-0 focus:ring-0" value={r.p1p2 || ''} onChange={(e)=>setRow(idx,{ p1p2: e.target.value })} /></td>
                  <td className="border px-1 py-1"><input className="w-full text-center border-0 focus:ring-0" value={r.p2p3 || ''} onChange={(e)=>setRow(idx,{ p2p3: e.target.value })} /></td>
                  <td className="border px-1 py-1"><input className="w-full text-center border-0 focus:ring-0" value={r.p3p1 || ''} onChange={(e)=>setRow(idx,{ p3p1: e.target.value })} /></td>
                  <td className="border px-1 py-1"><input className="w-full text-center border-0 focus:ring-0" value={r.p1_frame || ''} onChange={(e)=>setRow(idx,{ p1_frame: e.target.value })} /></td>
                  <td className="border px-1 py-1"><input className="w-full text-center border-0 focus:ring-0" value={r.p2_frame || ''} onChange={(e)=>setRow(idx,{ p2_frame: e.target.value })} /></td>
                  <td className="border px-1 py-1"><input className="w-full text-center border-0 focus:ring-0" value={r.p3_frame || ''} onChange={(e)=>setRow(idx,{ p3_frame: e.target.value })} /></td>
                  <td className="border px-1 py-1"><input className="w-full text-center border-0 focus:ring-0" value={r.p1_line || ''} onChange={(e)=>setRow(idx,{ p1_line: e.target.value })} /></td>
                  <td className="border px-1 py-1"><input className="w-full text-center border-0 focus:ring-0" value={r.p2_line || ''} onChange={(e)=>setRow(idx,{ p2_line: e.target.value })} /></td>
                  <td className="border px-1 py-1"><input className="w-full text-center border-0 focus:ring-0" value={r.p3_line || ''} onChange={(e)=>setRow(idx,{ p3_line: e.target.value })} /></td>
                  <td className="border px-1 py-1 text-center">{r.units || 'MΩ'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Temperature Corrected */}
      <div>
        <h3 className="text-lg font-medium mb-2">Electrical Tests - Temperature Corrected Insulation Resistance Values</h3>
        <div className="text-sm text-gray-700 mb-2">Corrected values are auto-calculated as Measured × TCF.</div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-xs">
            <thead>
              <tr>
                <th className="border px-2 py-2" rowSpan={2}>Position / Identifier</th>
                <th className="border px-2 py-2 text-center" colSpan={9}>Insulation Resistance</th>
                <th className="border px-2 py-2" rowSpan={2}>Units</th>
              </tr>
              <tr className="bg-gray-50">
                <th className="border px-2 py-2 text-center" colSpan={3}>Pole to Pole</th>
                <th className="border px-2 py-2 text-center" colSpan={3}>Pole to Frame</th>
                <th className="border px-2 py-2 text-center" colSpan={3}>Line to Load</th>
              </tr>
              <tr className="bg-gray-50">
                <th className="border px-2 py-2" />
                <th className="border px-2 py-2 text-center">P1-P2</th>
                <th className="border px-2 py-2 text-center">P2-P3</th>
                <th className="border px-2 py-2 text-center">P3-P1</th>
                <th className="border px-2 py-2 text-center">P1-Frame</th>
                <th className="border px-2 py-2 text-center">P2-Frame</th>
                <th className="border px-2 py-2 text-center">P3-Frame</th>
                <th className="border px-2 py-2 text-center">P1</th>
                <th className="border px-2 py-2 text-center">P2</th>
                <th className="border px-2 py-2 text-center">P3</th>
                <th className="border px-2 py-2 text-center">Units</th>
              </tr>
            </thead>
            <tbody>
              {v.rows.map((r, idx) => (
                <tr key={`c-${idx}`}>
                  <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0" value={r.position || ''} onChange={(e)=>setRow(idx,{ position: e.target.value })} /></td>
                  <td className="border px-1 py-1 text-center"><input readOnly className="w-full text-center border-0 bg-gray-100" value={correctedOf(r.p1p2)} /></td>
                  <td className="border px-1 py-1 text-center"><input readOnly className="w-full text-center border-0 bg-gray-100" value={correctedOf(r.p2p3)} /></td>
                  <td className="border px-1 py-1 text-center"><input readOnly className="w-full text-center border-0 bg-gray-100" value={correctedOf(r.p3p1)} /></td>
                  <td className="border px-1 py-1 text-center"><input readOnly className="w-full text-center border-0 bg-gray-100" value={correctedOf(r.p1_frame)} /></td>
                  <td className="border px-1 py-1 text-center"><input readOnly className="w-full text-center border-0 bg-gray-100" value={correctedOf(r.p2_frame)} /></td>
                  <td className="border px-1 py-1 text-center"><input readOnly className="w-full text-center border-0 bg-gray-100" value={correctedOf(r.p3_frame)} /></td>
                  <td className="border px-1 py-1 text-center"><input readOnly className="w-full text-center border-0 bg-gray-100" value={correctedOf(r.p1_line)} /></td>
                  <td className="border px-1 py-1 text-center"><input readOnly className="w-full text-center border-0 bg-gray-100" value={correctedOf(r.p2_line)} /></td>
                  <td className="border px-1 py-1 text-center"><input readOnly className="w-full text-center border-0 bg-gray-100" value={correctedOf(r.p3_line)} /></td>
                  <td className="border px-1 py-1 text-center">{r.units || 'MΩ'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


