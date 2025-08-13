import React, { useEffect, useRef } from 'react';

type Connection = 'Delta' | 'Wye' | 'Single Phase';
type Material = 'Aluminum' | 'Copper';

export interface DryNameplate {
  manufacturer?: string;
  catalogNumber?: string;
  serialNumber?: string;
  kva?: string;
  kvaSecondary?: string;
  tempRise?: string;
  impedance?: string;
  primary?: {
    volts?: string;
    voltsSecondary?: string;
    connection?: Connection;
    material?: Material;
  };
  secondary?: {
    volts?: string;
    voltsSecondary?: string;
    connection?: Connection;
    material?: Material;
  };
  tapVoltages?: string[]; // seven
  tapPositionCurrent?: string | number;
  tapPositionSecondary?: string;
  tapSpecificVolts?: string;
  tapSpecificPercent?: string;
}

interface Props {
  value?: DryNameplate;
  onChange: (next: DryNameplate) => void;
}

export const DryTypeNameplate: React.FC<Props> = ({ value, onChange }) => {
  const v: DryNameplate = {
    manufacturer: '',
    catalogNumber: '',
    serialNumber: '',
    kva: '',
    kvaSecondary: '',
    tempRise: '',
    impedance: '',
    primary: { volts: '480', voltsSecondary: '', connection: 'Delta', material: 'Aluminum' },
    secondary: { volts: '', voltsSecondary: '', connection: 'Wye', material: 'Aluminum' },
    tapVoltages: ['', '', '', '', '', '-', '-'],
    tapPositionCurrent: '3',
    tapPositionSecondary: '',
    tapSpecificVolts: '',
    tapSpecificPercent: '',
    ...(value || {}),
  };

  const set = (updates: Partial<DryNameplate>) => onChange({ ...v, ...updates });
  const setPrimary = (updates: Partial<NonNullable<DryNameplate['primary']>>) => set({ primary: { ...(v.primary || {}), ...updates } });
  const setSecondary = (updates: Partial<NonNullable<DryNameplate['secondary']>>) => set({ secondary: { ...(v.secondary || {}), ...updates } });

  // Expose tap voltages and secondary voltage globally for Turns Ratio table
  // Do this in an effect to avoid updating other components during render
  const prevSignatureRef = useRef<string>('');
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const taps = (v.tapVoltages || []).map((x) => {
      const n = parseFloat(String(x));
      return Number.isFinite(n) ? n : '';
    });
    const secCandidate = parseFloat(String(v.secondary?.voltsSecondary || v.secondary?.volts || ''));
    const secondary = Number.isFinite(secCandidate) ? secCandidate : undefined;
    const signature = JSON.stringify({ taps, secondary });
    if (signature === prevSignatureRef.current) return;
    prevSignatureRef.current = signature;
    (window as any).__TAP_VOLTAGES = taps;
    (window as any).__SECONDARY_TAP_VOLTAGE = secondary;
    try { window.dispatchEvent(new CustomEvent('tap-voltages-changed')); } catch {}
    try { window.dispatchEvent(new CustomEvent('secondary-tap-voltage-changed')); } catch {}
  }, [v.tapVoltages, v.secondary?.volts, v.secondary?.voltsSecondary]);

  return (
    <div className="space-y-4">
      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
          <input value={v.manufacturer} onChange={(e)=>set({ manufacturer: e.target.value })} className="mt-1 w-full form-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Catalog Number</label>
          <input value={v.catalogNumber} onChange={(e)=>set({ catalogNumber: e.target.value })} className="mt-1 w-full form-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Serial Number</label>
          <input value={v.serialNumber} onChange={(e)=>set({ serialNumber: e.target.value })} className="mt-1 w-full form-input" />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">KVA</label>
          <div className="flex items-center gap-2 mt-1">
            <input value={v.kva} onChange={(e)=>set({ kva: e.target.value })} className="form-input w-24 text-center" />
            <span>/</span>
            <input value={v.kvaSecondary} onChange={(e)=>set({ kvaSecondary: e.target.value })} className="form-input w-24 text-center" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Temp. Rise (°C)</label>
          <input value={v.tempRise} onChange={(e)=>set({ tempRise: e.target.value })} className="mt-1 w-full form-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Impedance (%)</label>
          <input value={v.impedance} onChange={(e)=>set({ impedance: e.target.value })} className="mt-1 w-full form-input" />
        </div>
      </div>

      {/* Headers */}
      <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-4 mt-2">
        <div></div>
        <div className="text-center text-sm font-medium">Volts</div>
        <div className="text-center text-sm font-medium">Connections</div>
        <div className="text-center text-sm font-medium">Winding Material</div>
      </div>

      {/* Primary row */}
      <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-4 items-center">
        <div className="text-sm font-medium">Primary</div>
        <div className="flex items-center justify-center gap-2">
          <input value={v.primary?.volts || ''} onChange={(e)=>setPrimary({ volts: e.target.value })} className="form-input w-20 text-center" />
          <span>/</span>
          <input value={v.primary?.voltsSecondary || ''} onChange={(e)=>setPrimary({ voltsSecondary: e.target.value })} className="form-input w-20 text-center" />
        </div>
        <div className="flex items-center justify-center gap-3">
          {(['Delta','Wye','Single Phase'] as Connection[]).map(c => (
            <label key={c} className="flex items-center gap-1">
              <input type="radio" name="primary-conn" checked={v.primary?.connection === c} onChange={()=>setPrimary({ connection: c })} />
              <span className="text-sm">{c}</span>
            </label>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
          {(['Aluminum','Copper'] as Material[]).map(m => (
            <label key={m} className="flex items-center gap-1">
              <input type="radio" name="primary-mat" checked={v.primary?.material === m} onChange={()=>setPrimary({ material: m })} />
              <span className="text-sm">{m}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Secondary row */}
      <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-4 items-center">
        <div className="text-sm font-medium">Secondary</div>
        <div className="flex items-center justify-center gap-2">
          <input value={v.secondary?.volts || ''} onChange={(e)=>{ setSecondary({ volts: e.target.value }); if (typeof window!=='undefined'){ const n=parseFloat(e.target.value); (window as any).__SECONDARY_TAP_VOLTAGE=Number.isFinite(n)?n:undefined; try{ window.dispatchEvent(new CustomEvent('secondary-tap-voltage-changed')); }catch{} } }} className="form-input w-20 text-center" />
          <span>/</span>
          <input value={v.secondary?.voltsSecondary || ''} onChange={(e)=>{ setSecondary({ voltsSecondary: e.target.value }); if (typeof window!=='undefined'){ const n=parseFloat(e.target.value); (window as any).__SECONDARY_TAP_VOLTAGE=Number.isFinite(n)?n:undefined; try{ window.dispatchEvent(new CustomEvent('secondary-tap-voltage-changed')); }catch{} } }} className="form-input w-20 text-center" />
        </div>
        <div className="flex items-center justify-center gap-3">
          {(['Delta','Wye','Single Phase'] as Connection[]).map(c => (
            <label key={c} className="flex items-center gap-1">
              <input type="radio" name="secondary-conn" checked={v.secondary?.connection === c} onChange={()=>setSecondary({ connection: c })} />
              <span className="text-sm">{c}</span>
            </label>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
          {(['Aluminum','Copper'] as Material[]).map(m => (
            <label key={m} className="flex items-center gap-1">
              <input type="radio" name="secondary-mat" checked={v.secondary?.material === m} onChange={()=>setSecondary({ material: m })} />
              <span className="text-sm">{m}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tap Voltages */}
      <div className="flex items-center gap-2">
        <label className="w-[130px] text-sm font-medium">Tap Voltages</label>
        <div className="grid grid-cols-7 gap-2 flex-grow">
          {(v.tapVoltages || []).map((tv, i) => (
            <input key={i} value={tv} onChange={(e)=> {
              const arr = [...(v.tapVoltages || Array(7).fill(''))];
              arr[i] = e.target.value;
              set({ tapVoltages: arr });
              if (typeof window !== 'undefined') {
                const taps = arr.map((x) => {
                  const n = parseFloat(String(x));
                  return Number.isFinite(n) ? n : '';
                });
                (window as any).__TAP_VOLTAGES = taps;
                try { window.dispatchEvent(new CustomEvent('tap-voltages-changed')); } catch {}
              }
            }} className="form-input text-center" />
          ))}
        </div>
      </div>

      {/* Tap Position numbers 1..7 */}
      <div className="flex items-center gap-2">
        <label className="w-[130px] text-sm font-medium">Tap Position</label>
        <div className="grid grid-cols-7 gap-2 flex-grow">
          {[1,2,3,4,5,6,7].map(n => (
            <div key={n} className="text-center text-sm">{n}</div>
          ))}
        </div>
      </div>

      {/* Tap Position Left + Volts/Percent */}
      <div className="flex items-center gap-4">
        <label className="w-[130px] text-sm font-medium">Tap Position Left</label>
        <div className="flex items-center gap-2">
          <input value={String(v.tapPositionCurrent ?? '')} onChange={(e)=>set({ tapPositionCurrent: e.target.value })} className="form-input w-16 text-center" />
          <span>/</span>
          <input value={v.tapPositionSecondary || ''} onChange={(e)=>set({ tapPositionSecondary: e.target.value })} className="form-input w-20 text-center" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Volts</span>
          <input value={v.tapSpecificVolts || ''} onChange={(e)=>set({ tapSpecificVolts: e.target.value })} className="form-input w-24 text-center" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Percent</span>
          <input value={v.tapSpecificPercent || ''} onChange={(e)=>set({ tapSpecificPercent: e.target.value })} className="form-input w-24 text-center" />
        </div>
      </div>
    </div>
  );
};


