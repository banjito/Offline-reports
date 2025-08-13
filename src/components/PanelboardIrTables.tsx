import React, { useMemo } from 'react';

export interface PanelboardIrValue {
  measured?: { ag?: string; bg?: string; cg?: string; ab?: string; bc?: string; ca?: string; an?: string; bn?: string; cn?: string };
  unit?: 'kΩ'|'MΩ'|'GΩ';
  testVoltage?: string;
  tcf?: number; // external if desired; we keep corrected as measured * tcf
}

interface Props {
  value?: PanelboardIrValue;
  onChange: (next: PanelboardIrValue) => void;
}

export const PanelboardIrTables: React.FC<Props> = ({ value, onChange }) => {
  const v = useMemo<PanelboardIrValue>(() => ({
    measured: value?.measured || {},
    unit: value?.unit || 'MΩ',
    testVoltage: value?.testVoltage || '',
    tcf: typeof value?.tcf === 'number' ? value?.tcf : (window as any).__REPORT_TCF || 1,
  }), [value?.measured, value?.unit, value?.testVoltage, value?.tcf]);

  const set = (u: Partial<PanelboardIrValue>) => onChange({ ...value, ...u });

  const keys = ['ag','bg','cg','ab','bc','ca','an','bn','cn'] as const;

  const corrected = (k: typeof keys[number]) => {
    const raw = parseFloat(String((v.measured as any)[k] || ''));
    const t = Number(v.tcf) || 1;
    if (!Number.isFinite(raw)) return '';
    return (raw * t).toFixed(2);
  };

  React.useEffect(() => {
    const handler = (e: any) => {
      const t = Number(e?.detail);
      if (Number.isFinite(t)) onChange({ ...(value||{}), tcf: t });
    };
    try { window.addEventListener('tcf-changed', handler as any); } catch {}
    return () => { try { window.removeEventListener('tcf-changed', handler as any); } catch {} };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex justify-end mb-2 gap-3 items-center">
        <span className="text-sm">Test Voltage:</span>
        <select className="h-8 rounded border border-gray-300 px-2" value={v.testVoltage} onChange={(e)=>set({ testVoltage: e.target.value })}>
          <option value="">Select...</option>
          <option value="250V">250V</option>
          <option value="500V">500V</option>
          <option value="1000V">1000V</option>
          <option value="2500V">2500V</option>
          <option value="5000V">5000V</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th colSpan={9} className="border px-2 py-1 bg-gray-50">Insulation Resistance</th>
              <th className="border px-2 py-1 bg-gray-50">Units</th>
            </tr>
            <tr>
              {keys.map((k)=> <th key={k} className="border px-2 py-1 bg-gray-50 uppercase">{k.replace('g','-G').toUpperCase()}</th>)}
              <th className="border px-2 py-1 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {keys.map((k)=> (
                <td key={k} className="border px-1 py-1">
                  <input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={(v.measured as any)[k] || ''} onBlur={(e)=>set({ measured: { ...(v.measured||{}), [k]: e.target.value } })} />
                </td>
              ))}
              <td className="border px-1 py-1">
                <select className="w-full h-7 border-none bg-transparent text-center focus:outline-none" value={v.unit} onChange={(e)=>set({ unit: e.target.value as any })}>
                  <option value="kΩ">kΩ</option>
                  <option value="MΩ">MΩ</option>
                  <option value="GΩ">GΩ</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th colSpan={9} className="border px-2 py-1 bg-gray-50">Temperature Corrected Values</th>
              <th className="border px-2 py-1 bg-gray-50">Units</th>
            </tr>
            <tr>
              {keys.map((k)=> <th key={k} className="border px-2 py-1 bg-gray-50 uppercase">{k.replace('g','-G').toUpperCase()}</th>)}
              <th className="border px-2 py-1 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {keys.map((k)=> (
                <td key={k} className="border px-1 py-1 text-center">{corrected(k)}</td>
              ))}
              <td className="border px-1 py-1 text-center">{v.unit}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


