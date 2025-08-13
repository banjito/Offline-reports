import React from 'react';
import { convertFahrenheitToCelsius, getTCF, applyTCF } from '../lib/tcf';

type CircuitRow = {
  from?: string;
  to?: string;
  size?: string; // single dropdown spanning the two Size columns
  sizeA?: string; // legacy, no longer used
  sizeB?: string; // legacy, no longer used
  config?: string; // Select One | 3 wire | 4 wire
  // RDG values
  aG?: string; bG?: string; cG?: string; nG?: string;
  aB?: string; bC?: string; cA?: string; aN?: string; bN?: string; cN?: string;
  // 20C corrected values
  c_aG?: string; c_bG?: string; c_cG?: string; c_nG?: string;
  c_aB?: string; c_bC?: string; c_cA?: string; c_aN?: string; c_bN?: string; c_cN?: string;
  cont?: string; // ✓/✗ or text
  result?: string; // PASS/FAIL
};

type GridValue = { rows: CircuitRow[] };

interface Props {
  value: GridValue;
  onChange: (next: GridValue) => void;
  temperatureF?: number; // for TCF calculation
}

const CONFIG_OPTIONS = ['3 wire', '4 wire'];
const RESULT_OPTIONS = ['PASS', 'FAIL', 'LIMITED SERVICE'];
const SIZE_OPTIONS = [
  '-',
  '14 AWG',
  '12 AWG',
  '10 AWG',
  '8 AWG',
  '6 AWG',
  '4 AWG',
  '3 AWG',
  '2 AWG',
  '1 AWG',
  '1/0 AWG',
  '2/0 AWG',
  '3/0 AWG',
  '4/0 AWG',
  '250 kcmil',
  '300 kcmil',
  '350 kcmil',
  '400 kcmil',
  '500 kcmil',
  '600 kcmil',
  '750 kcmil',
  '1000 kcmil',
];

export const LvCableTestsTable: React.FC<Props> = ({ value, onChange, temperatureF }) => {
  const rows = value?.rows || [];
  const celsius = typeof temperatureF === 'number' ? convertFahrenheitToCelsius(temperatureF) : undefined;
  const tcf = typeof celsius === 'number' ? getTCF(celsius) : undefined;

  const ensureCircuits = (count: number) => {
    const next = { rows: [...rows] } as GridValue;
    while (next.rows.length < count) {
      next.rows.push({ result: 'PASS' });
    }
    if (next.rows.length > count) next.rows = next.rows.slice(0, count);
    onChange(next);
  };

  React.useEffect(() => {
    if (!rows || rows.length === 0) ensureCircuits(12);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (idx: number, patch: Partial<CircuitRow>) => {
    const next = { rows: rows.map((r, i) => (i === idx ? { ...r, ...patch } : r)) };
    onChange(next);
  };

  const handleArrow = (e: React.KeyboardEvent<HTMLElement>, r: number, c: number) => {
    const key = e.key;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter'].includes(key)) return;
    e.preventDefault();
    let [nr, nc] = [r, c];
    if (key === 'ArrowLeft') nc = Math.max(0, c - 1);
    if (key === 'ArrowRight' || key === 'Enter') nc = Math.min(15, c + 1);
    if (key === 'ArrowUp') nr = Math.max(0, r - 1);
    if (key === 'ArrowDown') nr = Math.min(rows.length * 2 - 1, r + 1);
    let target = document.querySelector<HTMLElement>(`[data-pos="${nr}-${nc}"]`);
    // continuity/results live on the RDG row; if not found from 20C row, peek RDG row
    if (!target && (nc === 14 || nc === 15)) {
      const evenRow = nr % 2 === 0 ? nr : nr - 1;
      target = document.querySelector<HTMLElement>(`[data-pos="${evenRow}-${nc}"]`);
    }
    // skip non-input 20C cells by snapping to next/prev RDG row
    if (!target && nr % 2 === 1) {
      target = document.querySelector<HTMLElement>(`[data-pos="${nr + 1}-${nc}"]`);
    }
    if (!target && nr % 2 === 0 && key === 'ArrowUp') {
      target = document.querySelector<HTMLElement>(`[data-pos="${Math.max(0, nr - 2)}-${nc}"]`);
    }
    if (target) target.focus();
  };

  const renderReadingCell = (
    idx: number,
    key: keyof CircuitRow,
    rowKind: 'rdg' | 'c20',
    rIndex: number,
    colIndex: number,
  ) => (
    <td className="px-1 py-0.5 border text-center align-middle">
      {rowKind === 'rdg' ? (
        <input
          data-pos={`${rIndex}-${colIndex}`}
          value={(rows[idx] as any)[key] ?? ''}
          onChange={(e) => {
            const val = e.target.value;
            if (tcf && ['aG','bG','cG','nG','aB','bC','cA','aN','bN','cN'].includes(key as string)) {
              const correctedKey = ('c_' + key) as keyof CircuitRow;
              const corrected = applyTCF(val, tcf);
              update(idx, { [key]: val, [correctedKey]: corrected } as any);
            } else {
              update(idx, { [key]: val } as any);
            }
          }}
          onKeyDown={(e) => handleArrow(e, rIndex, colIndex)}
          className="w-full h-6 leading-6 text-center border-none bg-transparent focus:outline-none"
        />
      ) : (
        <div className="h-6 leading-6 text-center select-none text-gray-800">{(rows[idx] as any)[key] ?? ''}</div>
      )}
    </td>
  );

  // Temperature correction note can be computed here if we later pass temperatureF

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-50">
            <th className="border px-1.5 py-1 text-center" colSpan={2}>Circuit Designation</th>
            <th className="border px-1.5 py-1 text-center" colSpan={2}>Size</th>
            <th className="border px-1.5 py-1 text-center" rowSpan={2}></th>
            <th className="border px-1.5 py-1 text-center" colSpan={10}>1 Min. Insulation Resistance in MΩ</th>
            <th className="border px-1.5 py-1 text-center" rowSpan={2}>Cont.</th>
            <th className="border px-1.5 py-1 text-center" rowSpan={2}>Results</th>
          </tr>
          <tr className="bg-gray-50">
            <th className="border px-1 py-1 text-center">From</th>
            <th className="border px-1 py-1 text-center">To</th>
            <th className="border px-1 py-1 text-center" colSpan={2}>Config.</th>
            {['A-G','B-G','C-G','N-G','A-B','B-C','C-A','A-N','B-N','C-N'].map(h => (
              <th key={h} className="border px-1 py-1 text-center">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <React.Fragment key={i}>
              {/* RDG row */}
              <tr className="align-middle">
                {/* From/To span 2 rows */}
                <td className="border px-1 py-0.5 text-center" rowSpan={2}>
                  <input
                    data-pos={`${(i*2)}-0`}
                    value={r.from ?? ''}
                    onChange={(e) => update(i, { from: e.target.value })}
                    onKeyDown={(e) => handleArrow(e, (i*2), 0)}
                    className="w-full h-6 leading-6 text-center border-none bg-transparent focus:outline-none"
                  />
                </td>
                <td className="border px-1 py-0.5 text-center" rowSpan={2}>
                  <input
                    data-pos={`${(i*2)}-1`}
                    value={r.to ?? ''}
                    onChange={(e) => update(i, { to: e.target.value })}
                    onKeyDown={(e) => handleArrow(e, (i*2), 1)}
                    className="w-full h-6 leading-6 text-center border-none bg-transparent focus:outline-none"
                  />
                </td>
                {/* Size as two stacked inputs (same as screenshot uses two small columns) */}
                <td className="border px-1 py-0.5 text-center" colSpan={2}>
                  <select
                    data-pos={`${(i*2)}-2`}
                    value={r.size ?? r.sizeA ?? r.sizeB ?? ''}
                    onChange={(e) => update(i, { size: e.target.value })}
                    onKeyDown={(e) => handleArrow(e, (i*2), 2)}
                    className="w-full h-6 text-xs border border-gray-300 rounded-sm bg-white"
                  >
                    {SIZE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </td>
                {/* RDG label */}
                <td className="border px-1 py-0.5 text-center bg-gray-50">RDG</td>
                {renderReadingCell(i, 'aG', 'rdg', (i*2), 3)}
                {renderReadingCell(i, 'bG', 'rdg', (i*2), 4)}
                {renderReadingCell(i, 'cG', 'rdg', (i*2), 5)}
                {renderReadingCell(i, 'nG', 'rdg', (i*2), 6)}
                {renderReadingCell(i, 'aB', 'rdg', (i*2), 7)}
                {renderReadingCell(i, 'bC', 'rdg', (i*2), 8)}
                {renderReadingCell(i, 'cA', 'rdg', (i*2), 9)}
                {renderReadingCell(i, 'aN', 'rdg', (i*2), 10)}
                {renderReadingCell(i, 'bN', 'rdg', (i*2), 11)}
                {renderReadingCell(i, 'cN', 'rdg', (i*2), 12)}
                {/* Continuity spans 2 rows */}
                <td className="border px-1 py-0.5 text-center" rowSpan={2}>
                  <select
                    data-pos={`${(i*2)}-14`}
                    value={r.cont ?? ''}
                    onChange={(e) => update(i, { cont: e.target.value })}
                    onKeyDown={(e) => handleArrow(e, (i*2), 14)}
                    className="w-full h-6 text-xs border border-gray-300 rounded-sm bg-white"
                  >
                    <option value=""></option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                {/* Results spans 2 rows */}
                <td className="border px-1 py-0.5 text-center" rowSpan={2}>
                  <select
                    data-pos={`${(i*2)}-15`}
                    value={r.result ?? 'PASS'}
                    onChange={(e) => update(i, { result: e.target.value })}
                    onKeyDown={(e) => handleArrow(e, (i*2), 15)}
                    className="w-full h-6 text-xs border border-gray-300 rounded-sm bg-white"
                  >
                    {RESULT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </td>
              </tr>
              {/* 20C corrected row */}
              <tr className="bg-gray-50 align-middle">
                {/* Config dropdown across two size columns */}
                <td className="border px-1 py-0.5 text-center" colSpan={2}>
                  <select
                    data-pos={`${(i*2)+1}-2`}
                    value={r.config ?? ''}
                    onChange={(e) => update(i, { config: e.target.value })}
                    onKeyDown={(e) => handleArrow(e, (i*2)+1, 2)}
                    className="w-full h-6 text-xs border border-gray-300 rounded-sm bg-white"
                  >
                    <option value=""></option>
                    {CONFIG_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </td>
                {/* 20°C label */}
                <td className="border px-1 py-0.5 text-center bg-blue-50">20°C</td>
                {renderReadingCell(i, 'c_aG', 'c20', (i*2)+1, 3)}
                {renderReadingCell(i, 'c_bG', 'c20', (i*2)+1, 4)}
                {renderReadingCell(i, 'c_cG', 'c20', (i*2)+1, 5)}
                {renderReadingCell(i, 'c_nG', 'c20', (i*2)+1, 6)}
                {renderReadingCell(i, 'c_aB', 'c20', (i*2)+1, 7)}
                {renderReadingCell(i, 'c_bC', 'c20', (i*2)+1, 8)}
                {renderReadingCell(i, 'c_cA', 'c20', (i*2)+1, 9)}
                {renderReadingCell(i, 'c_aN', 'c20', (i*2)+1, 10)}
                {renderReadingCell(i, 'c_bN', 'c20', (i*2)+1, 11)}
                {renderReadingCell(i, 'c_cN', 'c20', (i*2)+1, 12)}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="text-[10px] text-gray-500 mt-1">
        Test Voltage: 1000V | 1 Min. Insulation Resistance in MΩ
        {typeof celsius === 'number' && typeof tcf === 'number' ? ` | Temp: ${celsius.toFixed(0)}°C | TCF: ${tcf.toFixed(2)}` : ''}
      </div>
    </div>
  );
};


