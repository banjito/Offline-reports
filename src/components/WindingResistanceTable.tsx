import React, { useEffect, useMemo } from 'react';

type Material = 'Copper' | 'Aluminum';

export interface WindingResistanceValue {
  testCurrent?: string;
  windingTemperature?: string; // °C or °F agnostic, just display
  correctionTemperature?: string;
  windingMaterial?: Material;
  tempCorrectionFactor?: string; // numeric multiplier
  rows?: Array<{
    tap: number | 'Fixed';
    phaseA?: { rMeas?: string; rDev?: string; rCorr?: string };
    phaseB?: { rMeas?: string; rDev?: string; rCorr?: string };
    phaseC?: { rMeas?: string; rDev?: string; rCorr?: string };
    units?: string; // mΩ
    smallestValueDeviation?: string; // %
    assessment?: string;
  }>;
}

interface Props {
  value?: WindingResistanceValue;
  onChange: (next: WindingResistanceValue) => void;
  title?: string;
}

const DEFAULT_ROWS = Array.from({ length: 7 }).map((_, i) => ({
  tap: i + 1,
  phaseA: {}, phaseB: {}, phaseC: {},
  units: 'mΩ',
}));

const clampNumber = (n: number) => (Number.isFinite(n) ? n : 0);

export const WindingResistanceTable: React.FC<Props> = ({ value, onChange, title }) => {
  const v = useMemo<WindingResistanceValue>(() => ({
    testCurrent: value?.testCurrent ?? '',
    windingTemperature: value?.windingTemperature ?? '',
    correctionTemperature: value?.correctionTemperature ?? '',
    windingMaterial: (value?.windingMaterial as Material) ?? 'Copper',
    tempCorrectionFactor: value?.tempCorrectionFactor ?? '',
    rows: value?.rows && value.rows.length ? value.rows : DEFAULT_ROWS,
  }), [value]);

  const set = (u: Partial<WindingResistanceValue>) => onChange({ ...v, ...u });

  const parseNum = (s?: string) => clampNumber(parseFloat(String(s ?? '').replace(/,/g, '')));

  const computeTCF = (): number => {
    const k = v.windingMaterial === 'Aluminum' ? 225 : 234.5;
    const tMeas = parseNum(v.windingTemperature);
    const tRef = parseNum(v.correctionTemperature);
    if (!tMeas && !tRef) return 1;
    const tcf = (k + tRef) / (k + tMeas || k);
    return tcf || 1;
  };

  const recalcRow = (index: number) => {
    const rows = [...(v.rows || [])];
    const row = { ...(rows[index] || {}) } as NonNullable<WindingResistanceValue['rows']>[number];
    const tcf = parseNum(v.tempCorrectionFactor) || computeTCF();

    const phases: Array<keyof typeof row> = ['phaseA','phaseB','phaseC'];
    const measured: number[] = phases.map(ph => parseNum((row[ph] as any)?.rMeas));
    const valid = measured.filter(n => Number.isFinite(n) && n > 0);
    const minVal = valid.length ? Math.min(...valid) : 0;

    phases.forEach((ph) => {
      const m = parseNum((row[ph] as any)?.rMeas);
      const rCorr = m > 0 && tcf ? (m * tcf) : NaN;
      const rDev = m > 0 && minVal > 0 ? ((m - minVal) / minVal) * 100 : NaN;
      row[ph] = {
        rMeas: (row[ph] as any)?.rMeas || '',
        rDev: Number.isFinite(rDev) ? rDev.toFixed(2) : '',
        rCorr: Number.isFinite(rCorr) ? rCorr.toFixed(3) : '',
      } as any;
    });

    row.smallestValueDeviation = valid.length ? '0.00' : '';
    rows[index] = row;
    set({ rows });
  };

  useEffect(() => {
    // Recompute all rows when temperature/material changes
    const rows = [...(v.rows || [])];
    rows.forEach((_, i) => recalcRow(i));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v.windingMaterial, v.windingTemperature, v.correctionTemperature, v.tempCorrectionFactor]);

  const setRowField = (index: number, phase: 'phaseA'|'phaseB'|'phaseC', field: 'rMeas', val: string) => {
    const rows = [...(v.rows || [])];
    const row = { ...(rows[index] || {}) } as any;
    row[phase] = { ...(row[phase] || {}), [field]: val };
    rows[index] = row;
    set({ rows });
  };

  return (
    <div className="space-y-3">
      {title && <h3 className="text-lg font-medium text-gray-800">{title}</h3>}
      <div className="flex flex-wrap gap-3">
        <label className="text-sm text-gray-700 flex items-center gap-2">Test Current (A)
          <input className="h-8 w-24 rounded border border-gray-300 px-2" defaultValue={v.testCurrent} onBlur={(e)=>set({ testCurrent: e.target.value })} />
        </label>
        <label className="text-sm text-gray-700 flex items-center gap-2">Winding Temp (°C)
          <input className="h-8 w-24 rounded border border-gray-300 px-2" defaultValue={v.windingTemperature} onBlur={(e)=>set({ windingTemperature: e.target.value })} />
        </label>
        <label className="text-sm text-gray-700 flex items-center gap-2">Correction Temp (°C)
          <input className="h-8 w-24 rounded border border-gray-300 px-2" defaultValue={v.correctionTemperature} onBlur={(e)=>set({ correctionTemperature: e.target.value })} />
        </label>
        <label className="text-sm text-gray-700 flex items-center gap-2">Winding Material
          <select className="h-8 rounded border border-gray-300 px-2" value={v.windingMaterial} onChange={(e)=>set({ windingMaterial: e.target.value as Material })}>
            <option value="Copper">Copper</option>
            <option value="Aluminum">Aluminum</option>
          </select>
        </label>
        <div className="text-sm text-gray-700 flex items-center gap-2">Temp Correction Factor
          <input className="h-8 w-28 rounded border border-gray-300 px-2" readOnly value={(parseNum(v.tempCorrectionFactor) || computeTCF()).toFixed(4)} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th rowSpan={2} className="border px-2 py-1 bg-gray-50 text-xs">Tap</th>
              <th colSpan={3} className="border px-2 py-1 bg-gray-50 text-xs">Phase A</th>
              <th colSpan={3} className="border px-2 py-1 bg-gray-50 text-xs">Phase B</th>
              <th colSpan={3} className="border px-2 py-1 bg-gray-50 text-xs">Phase C</th>
              <th rowSpan={2} className="border px-2 py-1 bg-gray-50 text-xs">Units</th>
              <th rowSpan={2} className="border px-2 py-1 bg-gray-50 text-xs">Smallest Value Deviation</th>
              <th rowSpan={2} className="border px-2 py-1 bg-gray-50 text-xs">Assessment</th>
            </tr>
            <tr>
              {Array.from({ length: 3 * 3 }).map((_, i) => (
                <th key={i} className="border px-2 py-1 bg-gray-50 text-xs">{i % 3 === 0 ? 'R Meas' : i % 3 === 1 ? 'R Dev %' : 'R Corr'}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(v.rows || DEFAULT_ROWS).map((row, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1 text-center text-sm">{row.tap}</td>
                {(['phaseA','phaseB','phaseC'] as const).map(phase => (
                  <React.Fragment key={phase}>
                    <td className="border px-1 py-1"><input className="w-full h-7 border-none bg-transparent text-center text-sm focus:outline-none" defaultValue={(row as any)[phase]?.rMeas || ''} onBlur={(e)=>{
                      // Update and recalc using the new value within the same transaction to avoid stale reads
                      const rows=[...(v.rows||[])];
                      const r={ ...(rows[idx]||{}) } as any;
                      r[phase] = { ...(r[phase]||{}), rMeas: e.target.value };
                      const phasesArr: Array<'phaseA'|'phaseB'|'phaseC'> = ['phaseA','phaseB','phaseC'];
                      const tcf = parseNum(v.tempCorrectionFactor) || computeTCF();
                      const measured = phasesArr.map(ph => parseNum(r[ph]?.rMeas));
                      const valid = measured.filter(n => Number.isFinite(n) && n>0);
                      const minVal = valid.length ? Math.min(...valid) : 0;
                      phasesArr.forEach(ph=>{
                        const m = parseNum(r[ph]?.rMeas);
                        const rc = m>0 && tcf ? m*tcf : NaN;
                        const rd = m>0 && minVal>0 ? ((m-minVal)/minVal)*100 : NaN;
                        r[ph] = { rMeas: r[ph]?.rMeas || '', rDev: Number.isFinite(rd)? rd.toFixed(2):'', rCorr: Number.isFinite(rc)? rc.toFixed(3):'' };
                      });
                      r.smallestValueDeviation = valid.length ? '0.00' : '';
                      rows[idx]=r; set({ rows });
                    }} /></td>
                    <td className="border px-1 py-1 text-center text-sm">{(row as any)[phase]?.rDev || ''}</td>
                    <td className="border px-1 py-1 text-center text-sm">{(row as any)[phase]?.rCorr || ''}</td>
                  </React.Fragment>
                ))}
                <td className="border px-2 py-1 text-center text-sm">{row.units || 'mΩ'}</td>
                <td className="border px-2 py-1 text-center text-sm">{row.smallestValueDeviation || ''}</td>
                <td className="border px-2 py-1 text-center text-sm">
                  <input className="w-full h-7 border-none bg-transparent text-center text-sm focus:outline-none" defaultValue={row.assessment || ''} onBlur={(e)=>{ const rows=[...(v.rows||[])]; rows[idx]={ ...(rows[idx]||{}), assessment: e.target.value }; set({ rows }); }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


