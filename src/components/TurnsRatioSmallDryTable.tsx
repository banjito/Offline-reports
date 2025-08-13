import React, { useEffect, useMemo } from 'react';

type SmallDryRow = {
  tap: string;
  nameplateVoltage?: string; // primary nameplate volts for this tap
  calculatedRatio?: string;  // computed from tap voltage and secondary volts
  measuredH1H2?: string;
  devH1H2?: string;          // computed % deviation
  passFailH1H2?: string;     // PASS/FAIL/N/A
  measuredH2H3?: string;
  devH2H3?: string;
  passFailH2H3?: string;
  measuredH3H1?: string;
  devH3H1?: string;
  passFailH3H1?: string;
};

interface Value { rows?: SmallDryRow[] }
interface Props { value?: Value; onChange: (next: Value) => void }

const ensureRows = (v?: Value): SmallDryRow[] => {
  const rows = v?.rows && v.rows.length ? v.rows : [{ tap: '3' }];
  return rows.map((r, i) => ({ tap: r.tap || String(i + 1), ...r }));
};

const calcRatio = (primaryStr: string | undefined, secondary: number | undefined): string => {
  const p = parseFloat(primaryStr || '');
  if (!Number.isFinite(p) || !Number.isFinite(secondary || NaN) || !secondary) return '';
  return (p / secondary).toFixed(3);
};

const calcDev = (calcRatioStr: string | undefined, measuredStr: string | undefined): string => {
  const cr = parseFloat(calcRatioStr || '');
  const meas = parseFloat(measuredStr || '');
  if (!Number.isFinite(cr) || !Number.isFinite(meas) || cr === 0) return '';
  return (((cr - meas) / cr) * 100).toFixed(3);
};

const PASS_FAIL = ['PASS','FAIL','N/A'];

export const TurnsRatioSmallDryTable: React.FC<Props> = ({ value, onChange }) => {
  const rows = ensureRows(value);

  // Listen for global secondary voltage and tap voltages emitted by DryTypeNameplate
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

  const [tapSig, setTapSig] = React.useState(0);
  useEffect(() => {
    const h = () => setTapSig((s) => s + 1);
    window.addEventListener('tap-voltages-changed', h as any);
    return () => window.removeEventListener('tap-voltages-changed', h as any);
  }, []);
  const tapVoltages = useMemo(() => {
    const arr = (window as any).__TAP_VOLTAGES as Array<number | ''> | undefined;
    return Array.isArray(arr) ? arr : undefined;
  }, [tapSig]);

  const setRow = (idx: number, updates: Partial<SmallDryRow>) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, ...updates } : r));
    onChange({ rows: next });
  };

  const recalcRow = (idx: number, updates: Partial<SmallDryRow> = {}) => {
    const current = { ...rows[idx], ...updates } as SmallDryRow;
    const nameplateFromTap = tapVoltages && typeof tapVoltages[idx] === 'number' ? String(tapVoltages[idx]) : current.nameplateVoltage;
    const calculatedRatio = calcRatio(nameplateFromTap, secondaryTap);
    const devH1H2 = calcDev(calculatedRatio, current.measuredH1H2);
    const devH2H3 = calcDev(calculatedRatio, current.measuredH2H3);
    const devH3H1 = calcDev(calculatedRatio, current.measuredH3H1);
    setRow(idx, { ...current, calculatedRatio, devH1H2, devH2H3, devH3H1 });
  };

  const recalcAll = () => {
    const nextRows = rows.map((r, i) => {
      const nameplateFromTap = tapVoltages && typeof tapVoltages[i] === 'number' ? String(tapVoltages[i]) : r.nameplateVoltage;
      const calculatedRatio = calcRatio(nameplateFromTap, secondaryTap);
      return {
        ...r,
        calculatedRatio,
        devH1H2: calcDev(calculatedRatio, r.measuredH1H2),
        devH2H3: calcDev(calculatedRatio, r.measuredH2H3),
        devH3H1: calcDev(calculatedRatio, r.measuredH3H1),
      } as SmallDryRow;
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
    const nc = Math.max(0, Math.min(12, c + delta[1]));
    const el = document.querySelector<HTMLElement>(`[data-sdtr-pos="${nr}-${nc}"]`);
    el?.focus();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-2 py-2 border text-center">Tap</th>
            <th className="px-2 py-2 border text-center">Nameplate Voltage Ratio</th>
            <th className="px-2 py-2 border text-center">Calculated Ratio</th>
            <th className="px-2 py-2 border text-center" colSpan={3}>H1-H2 / X1-X2(X0)</th>
            <th className="px-2 py-2 border text-center" colSpan={3}>H2-H3 / Y1-Y2(Y0)</th>
            <th className="px-2 py-2 border text-center" colSpan={3}>H3-H1 / Z1-Z2(Z0)</th>
          </tr>
          <tr className="bg-gray-50">
            <th className="px-2 py-1 border"></th>
            <th className="px-2 py-1 border"></th>
            <th className="px-2 py-1 border"></th>
            <th className="px-2 py-1 border text-center">Measured</th>
            <th className="px-2 py-1 border text-center">% Dev.</th>
            <th className="px-2 py-1 border text-center">Pass/ Fail</th>
            <th className="px-2 py-1 border text-center">Measured</th>
            <th className="px-2 py-1 border text-center">% Dev.</th>
            <th className="px-2 py-1 border text-center">Pass/ Fail</th>
            <th className="px-2 py-1 border text-center">Measured</th>
            <th className="px-2 py-1 border text-center">% Dev.</th>
            <th className="px-2 py-1 border text-center">Pass/ Fail</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const np = tapVoltages && typeof tapVoltages[idx] === 'number' ? String(tapVoltages[idx]) : (row.nameplateVoltage || '');
            return (
              <tr key={idx}>
                <td className="border px-2 py-1 text-center">
                  <select
                    value={row.tap}
                    onChange={(e) => setRow(idx, { tap: e.target.value })}
                    className="h-7 text-xs border rounded bg-white w-full"
                  >
                    {Array.from({ length: 7 }, (_, i) => String(i + 1)).map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <input
                    defaultValue={row.nameplateVoltage || ''}
                    onBlur={(e) => recalcRow(idx, { nameplateVoltage: e.target.value })}
                    data-sdtr-pos={`${idx}-1`}
                    onKeyDown={(e) => onArrow(e, idx, 1)}
                    className="w-full h-7 border-none bg-transparent focus:outline-none text-center"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input readOnly value={row.calculatedRatio || ''} className="w-full h-7 border-none bg-gray-100 text-center" />
                </td>

                {/* H1-H2 */}
                <td className="border px-2 py-1">
                  <input
                    defaultValue={row.measuredH1H2 || ''}
                    onBlur={(e) => recalcRow(idx, { measuredH1H2: e.target.value })}
                    data-sdtr-pos={`${idx}-3`}
                    onKeyDown={(e) => onArrow(e, idx, 3)}
                    className="w-full h-7 border-none bg-transparent focus:outline-none text-center"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input readOnly value={row.devH1H2 || ''} className="w-full h-7 border-none bg-gray-100 text-center" />
                </td>
                <td className="border px-2 py-1">
                  <select
                    value={row.passFailH1H2 || ''}
                    onChange={(e) => setRow(idx, { passFailH1H2: e.target.value })}
                    className="h-7 text-xs border rounded bg-white w-full"
                  >
                    <option value=""></option>
                    {PASS_FAIL.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </td>

                {/* H2-H3 */}
                <td className="border px-2 py-1">
                  <input
                    defaultValue={row.measuredH2H3 || ''}
                    onBlur={(e) => recalcRow(idx, { measuredH2H3: e.target.value })}
                    data-sdtr-pos={`${idx}-6`}
                    onKeyDown={(e) => onArrow(e, idx, 6)}
                    className="w-full h-7 border-none bg-transparent focus:outline-none text-center"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input readOnly value={row.devH2H3 || ''} className="w-full h-7 border-none bg-gray-100 text-center" />
                </td>
                <td className="border px-2 py-1">
                  <select
                    value={row.passFailH2H3 || ''}
                    onChange={(e) => setRow(idx, { passFailH2H3: e.target.value })}
                    className="h-7 text-xs border rounded bg-white w-full"
                  >
                    <option value=""></option>
                    {PASS_FAIL.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </td>

                {/* H3-H1 */}
                <td className="border px-2 py-1">
                  <input
                    defaultValue={row.measuredH3H1 || ''}
                    onBlur={(e) => recalcRow(idx, { measuredH3H1: e.target.value })}
                    data-sdtr-pos={`${idx}-9`}
                    onKeyDown={(e) => onArrow(e, idx, 9)}
                    className="w-full h-7 border-none bg-transparent focus:outline-none text-center"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input readOnly value={row.devH3H1 || ''} className="w-full h-7 border-none bg-gray-100 text-center" />
                </td>
                <td className="border px-2 py-1">
                  <select
                    value={row.passFailH3H1 || ''}
                    onChange={(e) => setRow(idx, { passFailH3H1: e.target.value })}
                    className="h-7 text-xs border rounded bg-white w-full"
                  >
                    <option value=""></option>
                    {PASS_FAIL.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};


