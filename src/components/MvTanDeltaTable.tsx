import React, { useEffect, useMemo, useRef } from 'react';

export interface TdPhase { td?: string; stdDev?: string }
export interface TdRow { voltageStep?: string; kV?: string; phaseA?: TdPhase; phaseB?: TdPhase; phaseC?: TdPhase }
export interface MvTanDeltaValue { systemVoltageL2G?: string; values?: TdRow[] }

interface Props { value?: MvTanDeltaValue; onChange: (next: MvTanDeltaValue) => void }

const ensure = (v?: MvTanDeltaValue): Required<MvTanDeltaValue> => ({
  systemVoltageL2G: v?.systemVoltageL2G || '14.4',
  values: v?.values && v.values.length ? v.values : [
    { voltageStep: '0.5 Uo', kV: '7.200', phaseA: { stdDev: '10' }, phaseB: { stdDev: '5' }, phaseC: { stdDev: '5' } },
    { voltageStep: '1.0 Uo', kV: '14.400', phaseA: { stdDev: '10' }, phaseB: { stdDev: '5' }, phaseC: { stdDev: '5' } },
    { voltageStep: '1.5 Uo', kV: '21.600', phaseA: { stdDev: '10' }, phaseB: { stdDev: '5' }, phaseC: { stdDev: '5' } },
    { voltageStep: '2.0 Uo', kV: '28.800', phaseA: { stdDev: '10' }, phaseB: { stdDev: '5' }, phaseC: { stdDev: '5' } },
  ]
});

export const MvTanDeltaTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);

  const setMeta = (updates: Partial<MvTanDeltaValue>) => onChange({ ...v, ...updates });
  const setRow = (i: number, updates: Partial<TdRow>) => {
    const next = ensure({ ...v });
    next.values[i] = { ...next.values[i], ...updates } as TdRow;
    onChange(next);
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const chartData = useMemo(() => {
    return (v.values || []).map(row => ({
      kV: Number(row.kV || 0),
      a: Number(row.phaseA?.td || 0),
      b: Number(row.phaseB?.td || 0),
      c: Number(row.phaseC?.td || 0),
    }));
  }, [v]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const margin = { left: 55, right: 20, top: 20, bottom: 35 };

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const xs = chartData.map(d => d.kV);
    const ys = chartData.flatMap(d => [d.a, d.b, d.c]);
    const minX = Math.min(0, ...xs);
    const maxX = Math.max(1, ...xs) || 1;
    const maxY = Math.max(1, ...ys, 4);

    const xScale = (x: number) => margin.left + ((x - minX) / (maxX - minX)) * (width - margin.left - margin.right);
    const yScale = (y: number) => height - margin.bottom - (y / maxY) * (height - margin.top - margin.bottom);

    // Gridlines
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    const yTicks = 4;
    for (let i = 0; i <= yTicks; i += 1) {
      const yVal = (maxY / yTicks) * i;
      const y = yScale(yVal);
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(width - margin.right, y);
      ctx.stroke();

      // y-axis labels
      ctx.fillStyle = '#555';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(Math.round(yVal)), margin.left - 6, y);
    }

    // Axis lines
    ctx.strokeStyle = '#999';
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, height - margin.bottom);
    ctx.lineTo(width - margin.right, height - margin.bottom);
    ctx.stroke();

    // Axis titles
    ctx.save();
    ctx.fillStyle = '#333';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    // X label
    ctx.fillText('Test Voltage (kV)', (width - margin.right + margin.left) / 2, height - 6);
    // Y label (rotated)
    ctx.translate(14, (height - margin.bottom + margin.top) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Tan Delta (E-3)', 0, 0);
    ctx.restore();

    // X ticks & labels at data points
    ctx.fillStyle = '#555';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    chartData.forEach(d => {
      const x = xScale(d.kV);
      ctx.beginPath();
      ctx.moveTo(x, height - margin.bottom);
      ctx.lineTo(x, height - margin.bottom + 4);
      ctx.strokeStyle = '#999';
      ctx.stroke();
      ctx.fillText(String(d.kV), x, height - margin.bottom + 6);
    });

    // Helper to draw series
    const drawSeries = (key: 'a'|'b'|'c', color: string) => {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      chartData.forEach((d, i) => {
        const x = xScale(d.kV);
        const y = yScale(d[key]);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      chartData.forEach((d) => {
        const x = xScale(d.kV);
        const y = yScale(d[key]);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    drawSeries('a', '#1E40AF'); // blue
    drawSeries('b', '#DC2626'); // red
    drawSeries('c', '#15803D'); // green

    // Legend
    const legendY = margin.top + 6;
    const legendX = (width - margin.right + margin.left) / 2;
    const entries: Array<[string, string]> = [
      ['#1E40AF', 'Phase A'],
      ['#DC2626', 'Phase B'],
      ['#15803D', 'Phase C']
    ];
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    let offsetX = -90;
    entries.forEach(([color, label]) => {
      const x = legendX + offsetX;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x - 10, legendY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.fillText(label, x + 10, legendY + 1);
      offsetX += 90;
    });
  }, [chartData]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-sm">System Voltage L-G (kV RMS)</label>
        <input className="w-28 border rounded p-1 text-sm" value={v.systemVoltageL2G} onChange={(e)=>setMeta({ systemVoltageL2G: e.target.value })} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-50"><th colSpan={8} className="border px-2 py-2 text-center">Tan Delta Test</th></tr>
            <tr className="bg-gray-50">
              <th rowSpan={2} className="border px-2 py-2">Voltage Steps</th>
              <th rowSpan={2} className="border px-2 py-2">kV</th>
              <th colSpan={2} className="border px-2 py-2 text-center">A Phase</th>
              <th colSpan={2} className="border px-2 py-2 text-center">B Phase</th>
              <th colSpan={2} className="border px-2 py-2 text-center">C Phase</th>
            </tr>
            <tr className="bg-gray-50">
              <th className="border px-2 py-2">TD [E-3]</th>
              <th className="border px-2 py-2">Std. Dev</th>
              <th className="border px-2 py-2">TD [E-3]</th>
              <th className="border px-2 py-2">Std. Dev</th>
              <th className="border px-2 py-2">TD [E-3]</th>
              <th className="border px-2 py-2">Std. Dev</th>
            </tr>
          </thead>
          <tbody>
            {v.values.map((row, i) => (
              <tr key={i}>
                <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0 text-center" value={row.voltageStep || ''} onChange={(e)=>setRow(i,{ voltageStep: e.target.value })} /></td>
                <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0 text-center" value={row.kV || ''} onChange={(e)=>setRow(i,{ kV: e.target.value })} /></td>
                <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0" value={row.phaseA?.td || ''} onChange={(e)=>setRow(i,{ phaseA: { ...(row.phaseA||{}), td: e.target.value } })} /></td>
                <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0" value={row.phaseA?.stdDev || ''} onChange={(e)=>setRow(i,{ phaseA: { ...(row.phaseA||{}), stdDev: e.target.value } })} /></td>
                <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0" value={row.phaseB?.td || ''} onChange={(e)=>setRow(i,{ phaseB: { ...(row.phaseB||{}), td: e.target.value } })} /></td>
                <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0" value={row.phaseB?.stdDev || ''} onChange={(e)=>setRow(i,{ phaseB: { ...(row.phaseB||{}), stdDev: e.target.value } })} /></td>
                <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0" value={row.phaseC?.td || ''} onChange={(e)=>setRow(i,{ phaseC: { ...(row.phaseC||{}), td: e.target.value } })} /></td>
                <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0" value={row.phaseC?.stdDev || ''} onChange={(e)=>setRow(i,{ phaseC: { ...(row.phaseC||{}), stdDev: e.target.value } })} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border rounded p-2 bg-white">
        <canvas ref={canvasRef} width={700} height={260} />
      </div>
    </div>
  );
};


