import React, { useEffect, useMemo, useState } from 'react';

type IrRow = {
  bus: string;
  ag?: string; bg?: string; cg?: string;
  ab?: string; bc?: string; ca?: string;
  an?: string; bn?: string; cn?: string;
  unit?: 'kΩ'|'MΩ'|'GΩ';
};

export interface SwitchgearIrCorrectedValue {
  rows?: IrRow[]; // displayed only; computed from measured × TCF
}

interface Props {
  value?: SwitchgearIrCorrectedValue;
  onChange: (next: SwitchgearIrCorrectedValue) => void;
}

const BUS_SECTIONS = ['Bus 1','Bus 2','Bus 3','Bus 4','Bus 5','Bus 6'];

export const SwitchgearIrCorrectedTable: React.FC<Props> = ({ value, onChange }) => {
  const [measured, setMeasured] = useState<IrRow[]>(BUS_SECTIONS.map(b=>({ bus: b })));
  const [tcf, setTcf] = useState<number>((window as any).__REPORT_TCF || 1);

  const rows = useMemo<IrRow[]>(() => {
    const m = measured && measured.length ? measured : (window as any).__SWG_IR_MEASURED || [];
    return BUS_SECTIONS.map((b, i) => {
      const src = m[i] || { bus: b };
      const out: IrRow = { bus: b, unit: 'MΩ' } as any;
      (['ag','bg','cg','ab','bc','ca','an','bn','cn'] as const).forEach(k => {
        const val = parseFloat(String((src as any)[k] || ''));
        out[k] = Number.isFinite(val) ? (val * (tcf || 1)).toFixed(2) : '';
      });
      return out;
    });
  }, [measured, tcf]);

  useEffect(() => {
    const update = () => {
      try { setMeasured(((window as any).__SWG_IR_MEASURED) || measured); } catch {}
    };
    const onTcf = (e: any) => setTcf(Number(e?.detail) || 1);
    try { window.addEventListener('swg-ir-updated', update); } catch {}
    try { window.addEventListener('tcf-changed', onTcf as any); } catch {}
    return () => { try { window.removeEventListener('swg-ir-updated', update); } catch {} try { window.removeEventListener('tcf-changed', onTcf as any); } catch {} };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { onChange({ rows }); }, [rows]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1 bg-gray-50 w-32">Bus Section</th>
            <th colSpan={9} className="border px-2 py-1 bg-gray-50 text-center">Insulation Resistance</th>
            <th className="border px-2 py-1 bg-gray-50">Units</th>
          </tr>
          <tr>
            <th className="border px-2 py-1 bg-gray-50"></th>
            {['A-G','B-G','C-G','A-B','B-C','C-A','A-N','B-N','C-N'].map(h => (
              <th key={h} className="border px-2 py-1 bg-gray-50">{h}</th>
            ))}
            <th className="border px-2 py-1 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1 text-sm">{row.bus}</td>
              {(['ag','bg','cg','ab','bc','ca','an','bn','cn'] as const).map(k => (
                <td key={k} className="border px-1 py-1 text-center">{(row as any)[k] || ''}</td>
              ))}
              <td className="border px-1 py-1 text-center">{row.unit || 'MΩ'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


