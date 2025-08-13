import React, { useEffect, useMemo } from 'react';

type TurnsRow = {
  tap: string;
  nameplateVoltage?: string;
  calculatedRatio?: string; // read-only
  phaseA_TTR?: string;
  phaseA_Dev?: string; // read-only
  phaseB_TTR?: string;
  phaseB_Dev?: string; // read-only
  phaseC_TTR?: string;
  phaseC_Dev?: string; // read-only
  assessment?: string; // read-only
};

interface Value {
  rows?: TurnsRow[];
}

interface Props {
  value?: Value;
  onChange: (next: Value) => void;
}

const ensureRows = (v?: Value): TurnsRow[] => {
  const rows = v?.rows && v.rows.length ? v.rows : Array.from({ length: 7 }, (_, i) => ({ tap: String(i + 1) }));
  return rows.map((r, i) => ({ tap: String(i + 1), ...r }));
};

const calcRatio = (primaryStr: string | undefined, secondary: number | undefined): string => {
  const p = parseFloat(primaryStr || '');
  if (!Number.isFinite(p) || !Number.isFinite(secondary || NaN) || !secondary) return '';
  return (p / secondary).toFixed(3);
};

const calcDev = (calcRatioStr: string | undefined, ttrStr: string | undefined): string => {
  const cr = parseFloat(calcRatioStr || '');
  const ttr = parseFloat(ttrStr || '');
  if (!Number.isFinite(cr) || !Number.isFinite(ttr) || cr === 0) return '';
  return (((cr - ttr) / cr) * 100).toFixed(3);
};

const calcAssessment = (a: string, b: string, c: string): string => {
  if (!a && !b && !c) return '';
  const da = parseFloat(a);
  const db = parseFloat(b);
  const dc = parseFloat(c);
  if ([da, db, dc].some((x) => Number.isNaN(x))) return '';
  return da > -0.501 && da < 0.501 && db > -0.501 && db < 0.501 && dc > -0.501 && dc < 0.501 ? 'Pass' : 'Fail';
};

export const TurnsRatioTable: React.FC<Props> = ({ value, onChange }) => {
  const rows = ensureRows(value);

  const [secondarySig, setSecondarySig] = React.useState(0);
  React.useEffect(() => {
    const h = () => setSecondarySig((s) => s + 1);
    window.addEventListener('secondary-tap-voltage-changed', h as any);
    return () => window.removeEventListener('secondary-tap-voltage-changed', h as any);
  }, []);
  const secondaryTap = useMemo(() => {
    const x = (window as any).__SECONDARY_TAP_VOLTAGE as number | undefined;
    return typeof x === 'number' && !Number.isNaN(x) ? x : undefined;
  }, [secondarySig, value]);

  const [tapSig, setTapSig] = React.useState(0);
  React.useEffect(() => {
    const h = () => setTapSig((s) => s + 1);
    window.addEventListener('tap-voltages-changed', h as any);
    return () => window.removeEventListener('tap-voltages-changed', h as any);
  }, []);
  const tapVoltages = useMemo(() => {
    const arr = (window as any).__TAP_VOLTAGES as Array<number | ''> | undefined;
    return Array.isArray(arr) ? arr : undefined;
  }, [tapSig]);

  const setRow = (idx: number, updates: Partial<TurnsRow>) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, ...updates } : r));
    onChange({ rows: next });
  };

  const recalcRow = (idx: number, updates: Partial<TurnsRow> = {}) => {
    const current = { ...rows[idx], ...updates } as TurnsRow;
    const nameplateFromTap = tapVoltages && typeof tapVoltages[idx] === 'number' ? String(tapVoltages[idx]) : current.nameplateVoltage;
    const calculatedRatio = calcRatio(nameplateFromTap, secondaryTap);
    const phaseA_Dev = calcDev(calculatedRatio, current.phaseA_TTR);
    const phaseB_Dev = calcDev(calculatedRatio, current.phaseB_TTR);
    const phaseC_Dev = calcDev(calculatedRatio, current.phaseC_TTR);
    const assessment = calcAssessment(phaseA_Dev, phaseB_Dev, phaseC_Dev);
    setRow(idx, { ...current, calculatedRatio, phaseA_Dev, phaseB_Dev, phaseC_Dev, assessment });
  };

  const recalcAll = () => {
    const nextRows = rows.map((r, i) => {
      const nameplateFromTap = tapVoltages && typeof tapVoltages[i] === 'number' ? String(tapVoltages[i]) : r.nameplateVoltage;
      const calculatedRatio = calcRatio(nameplateFromTap, secondaryTap);
      const phaseA_Dev = calcDev(calculatedRatio, r.phaseA_TTR);
      const phaseB_Dev = calcDev(calculatedRatio, r.phaseB_TTR);
      const phaseC_Dev = calcDev(calculatedRatio, r.phaseC_TTR);
      const assessment = calcAssessment(phaseA_Dev, phaseB_Dev, phaseC_Dev);
      return { ...r, calculatedRatio, phaseA_Dev, phaseB_Dev, phaseC_Dev, assessment } as TurnsRow;
    });
    onChange({ rows: nextRows });
  };

  useEffect(() => {
    recalcAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondaryTap, tapSig]);

  const onArrow = (
    e: React.KeyboardEvent<HTMLInputElement>,
    r: number,
    c: number,
  ) => {
    const key = e.key;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key)) return;
    e.preventDefault();
    const delta = key === 'ArrowLeft' ? [0, -1] : key === 'ArrowRight' ? [0, 1] : key === 'ArrowUp' ? [-1, 0] : [1, 0];
    const nr = Math.max(0, Math.min(rows.length - 1, r + delta[0]));
    const nc = Math.max(0, Math.min(9, c + delta[1]));
    const el = document.querySelector<HTMLElement>(`[data-ttr-pos="${nr}-${nc}"]`);
    el?.focus();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-50">
            {[
              'Tap',
              'Nameplate Voltage',
              'Calculated Ratio',
              'Phase A TTR',
              'Phase A Dev %',
              'Phase B TTR',
              'Phase B Dev %',
              'Phase C TTR',
              'Phase C Dev %',
              'Assessment',
            ].map((h) => (
              <th key={h} className="px-2 py-2 border text-center">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const np = tapVoltages && typeof tapVoltages[idx] === 'number' ? String(tapVoltages[idx]) : (row.nameplateVoltage || '');
            return (
            <tr key={row.tap}>
              <td className="border px-2 py-1 text-center">{row.tap}</td>
              <td className="border px-2 py-1">
                <input
                  readOnly
                  value={np}
                  className="w-full h-7 border-none bg-gray-100 text-center"
                />
              </td>
              <td className="border px-2 py-1">
                <input readOnly value={row.calculatedRatio || ''} className="w-full h-7 border-none bg-gray-100 text-center" />
              </td>
              <td className="border px-2 py-1">
                <input
                  data-ttr-pos={`${idx}-3`}
                  defaultValue={row.phaseA_TTR || ''}
                  onBlur={(e) => recalcRow(idx, { phaseA_TTR: e.target.value })}
                  onKeyDown={(e) => onArrow(e, idx, 3)}
                  className="w-full h-7 border-none bg-transparent focus:outline-none text-center"
                />
              </td>
              <td className="border px-2 py-1">
                <input readOnly value={row.phaseA_Dev || ''} className="w-full h-7 border-none bg-gray-100 text-center" />
              </td>
              <td className="border px-2 py-1">
                <input
                  data-ttr-pos={`${idx}-5`}
                  defaultValue={row.phaseB_TTR || ''}
                  onBlur={(e) => recalcRow(idx, { phaseB_TTR: e.target.value })}
                  onKeyDown={(e) => onArrow(e, idx, 5)}
                  className="w-full h-7 border-none bg-transparent focus:outline-none text-center"
                />
              </td>
              <td className="border px-2 py-1">
                <input readOnly value={row.phaseB_Dev || ''} className="w-full h-7 border-none bg-gray-100 text-center" />
              </td>
              <td className="border px-2 py-1">
                <input
                  data-ttr-pos={`${idx}-7`}
                  defaultValue={row.phaseC_TTR || ''}
                  onBlur={(e) => recalcRow(idx, { phaseC_TTR: e.target.value })}
                  onKeyDown={(e) => onArrow(e, idx, 7)}
                  className="w-full h-7 border-none bg-transparent focus:outline-none text-center"
                />
              </td>
              <td className="border px-2 py-1">
                <input readOnly value={row.phaseC_Dev || ''} className="w-full h-7 border-none bg-gray-100 text-center" />
              </td>
              <td className="border px-2 py-1">
                <input readOnly value={row.assessment || ''} className="w-full h-7 border-none bg-gray-100 text-center" />
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
};


