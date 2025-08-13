import React, { useEffect, useMemo } from 'react';

type VtRow = {
  tap?: string;
  primaryVoltage?: string; // user-entered primary volts for this tap
  calculatedRatio?: string; // computed from primary / secondary
  measuredH1H2?: string; // user-entered
  deviation?: string; // % deviation
  passFail?: string; // PASS | FAIL | N/A
};

interface Value { rows?: VtRow[] }
interface Props { value?: Value; onChange: (next: Value) => void }

const ensureRows = (v?: Value): VtRow[] => {
  const rows = v?.rows && v.rows.length ? v.rows : [{ tap: '1' }];
  return rows.map((r, i) => ({ tap: r.tap || String(i + 1), ...r }));
};

const calcRatio = (primaryStr?: string, secondary?: number): string => {
  const p = parseFloat(primaryStr || '');
  if (!Number.isFinite(p) || !Number.isFinite(secondary || NaN) || !secondary) return '';
  return (p / secondary).toFixed(4);
};

const calcDev = (calcRatioStr?: string, measuredStr?: string): string => {
  const cr = parseFloat(calcRatioStr || '');
  const meas = parseFloat(measuredStr || '');
  if (!Number.isFinite(cr) || !Number.isFinite(meas) || cr === 0) return '';
  return (((cr - meas) / cr) * 100).toFixed(2);
};

const thresholdPassFail = (devStr?: string): string => {
  const d = parseFloat(devStr || '');
  if (!Number.isFinite(d)) return '';
  return d > -0.501 && d < 0.501 ? 'Pass' : 'Fail';
};

export const VtTurnsRatioTable: React.FC<Props> = ({ value, onChange }) => {
  const rows = ensureRows(value);

  // Secondary voltage provided by field with id 'secondaryVoltageTap'
  const [secondarySig, setSecondarySig] = React.useState(0);
  useEffect(() => {
    const h = () => setSecondarySig((s) => s + 1);
    window.addEventListener('secondary-tap-voltage-changed', h as any);
    return () => window.removeEventListener('secondary-tap-voltage-changed', h as any);
  }, []);
  const secondaryTap = useMemo(() => {
    const x = (window as any).__SECONDARY_TAP_VOLTAGE as number | undefined;
    return typeof x === 'number' && !Number.isNaN(x) ? x : undefined;
  }, [secondarySig, value]);

  const setRow = (idx: number, updates: Partial<VtRow>) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, ...updates } : r));
    onChange({ rows: next });
  };

  const recalcRow = (idx: number, updates: Partial<VtRow> = {}) => {
    const current = { ...rows[idx], ...updates } as VtRow;
    const calculatedRatio = calcRatio(current.primaryVoltage, secondaryTap);
    const deviation = calcDev(calculatedRatio, current.measuredH1H2);
    const passFail = deviation ? thresholdPassFail(deviation) : current.passFail;
    setRow(idx, { ...current, calculatedRatio, deviation, passFail });
  };

  useEffect(() => {
    // Recalc all when secondary changes
    const next = rows.map((r) => {
      const calculatedRatio = calcRatio(r.primaryVoltage, secondaryTap);
      const deviation = calcDev(calculatedRatio, r.measuredH1H2);
      const passFail = deviation ? thresholdPassFail(deviation) : r.passFail;
      return { ...r, calculatedRatio, deviation, passFail } as VtRow;
    });
    onChange({ rows: next });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondarySig]);

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
    const nc = Math.max(0, Math.min(5, c + delta[1]));
    const el = document.querySelector<HTMLElement>(`[data-vttr-pos="${nr}-${nc}"]`);
    el?.focus();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-2 py-2 border text-center">Tap</th>
            <th className="px-2 py-2 border text-center">Primary Voltage</th>
            <th className="px-2 py-2 border text-center">Calculated Ratio</th>
            <th className="px-2 py-2 border text-center">Measured H1-H2</th>
            <th className="px-2 py-2 border text-center">% Dev.</th>
            <th className="px-2 py-2 border text-center">Pass/Fail</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1 text-center">
                <input
                  data-vttr-pos={`${idx}-0`}
                  defaultValue={row.tap || ''}
                  onBlur={(e) => setRow(idx, { tap: e.target.value })}
                  onKeyDown={(e) => onArrow(e, idx, 0)}
                  className="w-full h-7 border-none bg-transparent focus:outline-none text-center"
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  data-vttr-pos={`${idx}-1`}
                  defaultValue={row.primaryVoltage || ''}
                  onBlur={(e) => recalcRow(idx, { primaryVoltage: e.target.value })}
                  onKeyDown={(e) => onArrow(e, idx, 1)}
                  className="w-full h-7 border-none bg-transparent focus:outline-none text-center"
                />
              </td>
              <td className="border px-2 py-1">
                <input readOnly value={row.calculatedRatio || ''} className="w-full h-7 border-none bg-gray-100 text-center" />
              </td>
              <td className="border px-2 py-1">
                <input
                  data-vttr-pos={`${idx}-3`}
                  defaultValue={row.measuredH1H2 || ''}
                  onBlur={(e) => recalcRow(idx, { measuredH1H2: e.target.value })}
                  onKeyDown={(e) => onArrow(e, idx, 3)}
                  className="w-full h-7 border-none bg-transparent focus:outline-none text-center"
                />
              </td>
              <td className="border px-2 py-1">
                <input readOnly value={row.deviation || ''} className="w-full h-7 border-none bg-gray-100 text-center" />
              </td>
              <td className="border px-2 py-1">
                <input readOnly value={row.passFail || ''} className="w-full h-7 border-none bg-gray-100 text-center" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


