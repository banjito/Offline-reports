import React, { useMemo } from 'react';

interface PhaseRow {
  iOut?: string; // mA
  wattLosses?: string; // W
  reactance?: string; // kΩ
}

export interface ExcitationTestsValue {
  testVoltageKv?: string;
  referenceVoltageKv?: string;
  rows?: Array<{
    tap: number;
    phaseA?: PhaseRow;
    phaseB?: PhaseRow;
    phaseC?: PhaseRow;
    assessment?: string;
  }>;
}

interface Props {
  value?: ExcitationTestsValue;
  onChange: (next: ExcitationTestsValue) => void;
}

const DEFAULT_ROWS = Array.from({ length: 7 }).map((_, i) => ({
  tap: i + 1,
  phaseA: {},
  phaseB: {},
  phaseC: {},
}));

export const ExcitationTestsTable: React.FC<Props> = ({ value, onChange }) => {
  const v = useMemo<ExcitationTestsValue>(() => ({
    testVoltageKv: value?.testVoltageKv ?? '',
    referenceVoltageKv: value?.referenceVoltageKv ?? '',
    rows: value?.rows && value.rows.length ? value.rows : DEFAULT_ROWS,
  }), [value]);

  const set = (u: Partial<ExcitationTestsValue>) => onChange({ ...v, ...u });

  const parseNum = (s?: string) => {
    const n = parseFloat(String(s ?? '').replace(/,/g, ''));
    return Number.isFinite(n) ? n : NaN;
  };

  const setRowPhaseField = (
    rowIndex: number,
    phase: 'phaseA'|'phaseB'|'phaseC',
    field: keyof PhaseRow,
    val: string
  ) => {
    const rows = [...(v.rows || [])];
    const row = { ...(rows[rowIndex] || {}) } as any;
    const nextPhase = { ...(row[phase] || {}), [field]: val } as PhaseRow;
    // Auto-calc: Reactance (kΩ) = (V_test(kV) / I_out(mA)) * 1000
    const useV = parseNum(v.testVoltageKv);
    const iOut = parseNum(nextPhase.iOut);
    const reactance = Number.isFinite(useV) && Number.isFinite(iOut) && iOut > 0 ? ((useV / iOut) * 1000) : NaN;
    nextPhase.reactance = Number.isFinite(reactance) ? reactance.toFixed(3) : (nextPhase.reactance || '');
    row[phase] = nextPhase;
    rows[rowIndex] = row;
    set({ rows });
  };

  const setRowAssessment = (rowIndex: number, val: string) => {
    const rows = [...(v.rows || [])];
    rows[rowIndex] = { ...(rows[rowIndex] || {}), assessment: val } as any;
    set({ rows });
  };

  const recalcAll = () => {
    const rows = [...(v.rows || [])];
    const useV = parseNum(v.testVoltageKv);
    rows.forEach((r, idx) => {
      (['phaseA','phaseB','phaseC'] as const).forEach(ph => {
        const p = { ...(r as any)[ph] } as PhaseRow;
        const iOut = parseNum(p.iOut);
        const reactance = Number.isFinite(useV) && Number.isFinite(iOut) && iOut > 0 ? ((useV / iOut) * 1000) : NaN;
        p.reactance = Number.isFinite(reactance) ? reactance.toFixed(3) : '';
        (r as any)[ph] = p;
      });
      rows[idx] = r as any;
    });
    set({ rows });
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-4 flex-wrap">
        <label className="text-sm text-gray-700 flex items-center gap-2">Test Voltage (kV)
          <input className="h-8 w-28 rounded border border-gray-300 px-2" defaultValue={v.testVoltageKv} onBlur={(e)=>set({ testVoltageKv: e.target.value })} />
        </label>
        <label className="text-sm text-gray-700 flex items-center gap-2">Reference Voltage (kV)
          <input className="h-8 w-28 rounded border border-gray-300 px-2" defaultValue={v.referenceVoltageKv} onBlur={(e)=>{ set({ referenceVoltageKv: e.target.value }); }} />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th rowSpan={2} className="border px-2 py-1 bg-gray-50">TAP</th>
              <th colSpan={3} className="border px-2 py-1 bg-gray-50 text-center">Phase A</th>
              <th colSpan={3} className="border px-2 py-1 bg-gray-50 text-center">Phase B</th>
              <th colSpan={3} className="border px-2 py-1 bg-gray-50 text-center">Phase C</th>
              <th rowSpan={2} className="border px-2 py-1 bg-gray-50">Assessment</th>
            </tr>
            <tr>
              {Array.from({ length: 9 }).map((_, i) => (
                <th key={i} className="border px-2 py-1 bg-gray-50">
                  {i % 3 === 0 ? '* I out (mA)' : i % 3 === 1 ? '* Watt losses (W)' : 'Reactance (kΩ)'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(v.rows || DEFAULT_ROWS).map((row, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1 text-center">{row.tap}</td>
                {(['phaseA','phaseB','phaseC'] as const).map(phase => (
                  <React.Fragment key={phase}>
                    <td className="border px-1 py-1">
                      <input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={(row as any)[phase]?.iOut || ''} onBlur={(e)=>setRowPhaseField(idx, phase, 'iOut', e.target.value)} />
                    </td>
                    <td className="border px-1 py-1">
                      <input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={(row as any)[phase]?.wattLosses || ''} onBlur={(e)=>setRowPhaseField(idx, phase, 'wattLosses', e.target.value)} />
                    </td>
                    <td className="border px-1 py-1 text-center">{(row as any)[phase]?.reactance || ''}</td>
                  </React.Fragment>
                ))}
                <td className="border px-1 py-1">
                  <input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={row.assessment || ''} onBlur={(e)=>setRowAssessment(idx, e.target.value)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


