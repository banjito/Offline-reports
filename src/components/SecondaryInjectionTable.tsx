import React from 'react';

type SectionKey = 'longTime' | 'shortTime' | 'instantaneous' | 'groundFault';

interface TestedRow { setting?: string; delay?: string; i2t?: string }
interface InjRow {
  amperes1?: string;
  amperes2?: string;
  toleranceMin?: string;
  toleranceMax?: string;
  pole1?: string;
  pole2?: string;
  pole3?: string;
  unit?: string; // sec., cycles, ms
  passFail?: string; // PASS/FAIL/LIMITED SERVICE
}

export interface SecondaryInjectionValue {
  testedSettings?: Record<SectionKey, TestedRow>;
  secondaryInjection?: Record<SectionKey, InjRow>;
}

interface Props {
  value?: SecondaryInjectionValue;
  onChange: (next: SecondaryInjectionValue) => void;
}

const ensure = (v?: SecondaryInjectionValue): Required<SecondaryInjectionValue> => ({
  testedSettings: {
    longTime: { ...(v?.testedSettings?.longTime || {}) },
    shortTime: { ...(v?.testedSettings?.shortTime || {}) },
    instantaneous: { ...(v?.testedSettings?.instantaneous || {}) },
    groundFault: { ...(v?.testedSettings?.groundFault || {}) },
  },
  secondaryInjection: {
    longTime: { unit: 'sec.', passFail: 'PASS', ...(v?.secondaryInjection?.longTime || {}) },
    shortTime: { unit: 'sec.', passFail: 'PASS', ...(v?.secondaryInjection?.shortTime || {}) },
    instantaneous: { unit: 'sec.', passFail: 'PASS', ...(v?.secondaryInjection?.instantaneous || {}) },
    groundFault: { unit: 'sec.', passFail: 'PASS', ...(v?.secondaryInjection?.groundFault || {}) },
  },
});

const I2T_OPTIONS = ['On','Off','In','Out','N/A'];
const UNITS = ['sec.', 'cycles', 'ms'];
const PF = ['PASS','FAIL','LIMITED SERVICE'];

export const SecondaryInjectionTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);

  const setTested = (key: SectionKey, updates: Partial<TestedRow>) => {
    onChange({ ...v, testedSettings: { ...v.testedSettings, [key]: { ...v.testedSettings[key], ...updates } } });
  };
  const setInj = (key: SectionKey, updates: Partial<InjRow>) => {
    onChange({ ...v, secondaryInjection: { ...v.secondaryInjection, [key]: { ...v.secondaryInjection[key], ...updates } } });
  };

  return (
    <div className="space-y-4">
      {/* Tested Settings */}
      <div>
        <h3 className="text-lg font-medium mb-2 text-center">Tested Settings</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-2 py-2 text-left text-sm font-medium"></th>
                <th className="border px-2 py-2 text-center text-sm font-medium">Setting</th>
                <th className="border px-2 py-2 text-center text-sm font-medium">Delay</th>
                <th className="border px-2 py-2 text-center text-sm font-medium">I²t</th>
              </tr>
            </thead>
            <tbody>
              {(['longTime','shortTime','instantaneous','groundFault'] as SectionKey[]).map((k) => (
                <tr key={`tested-${k}`}>
                  <td className="border px-2 py-2 text-sm capitalize">{k.replace('Time',' Time').replace('Fault',' Fault')}</td>
                  <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded" value={v.testedSettings[k].setting || ''} onChange={(e)=>setTested(k,{ setting: e.target.value })} /></td>
                  <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded" value={v.testedSettings[k].delay || ''} onChange={(e)=>setTested(k,{ delay: e.target.value })} /></td>
                  <td className="border px-2 py-2 text-center">
                    {k === 'shortTime' || k === 'groundFault' ? (
                      <select className="w-full p-1 border rounded" value={v.testedSettings[k].i2t || ''} onChange={(e)=>setTested(k,{ i2t: e.target.value })}>
                        <option value=""></option>
                        {I2T_OPTIONS.map((opt)=> (<option key={opt} value={opt}>{opt}</option>))}
                      </select>
                    ) : (
                      <input className="w-full p-1 border rounded bg-gray-100" value="" readOnly />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Secondary Injection Results */}
      <div>
        <h3 className="text-lg font-medium mb-2 text-center">Secondary Injection</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-2 py-2 text-left text-sm font-medium" rowSpan={2}>Function</th>
                <th className="border px-2 py-2 text-center text-sm font-medium" colSpan={2}>Amperes</th>
                <th className="border px-2 py-2 text-center text-sm font-medium" colSpan={2}>Tolerance</th>
                <th className="border px-2 py-2 text-center text-sm font-medium" colSpan={3}>Results</th>
                <th className="border px-2 py-2 text-center text-sm font-medium" rowSpan={2}>Units</th>
                <th className="border px-2 py-2 text-center text-sm font-medium" rowSpan={2}>Pass/Fail</th>
              </tr>
              <tr>
                <th className="border px-2 py-2 text-center text-sm font-medium">1</th>
                <th className="border px-2 py-2 text-center text-sm font-medium">2</th>
                <th className="border px-2 py-2 text-center text-sm font-medium">Min</th>
                <th className="border px-2 py-2 text-center text-sm font-medium">Max</th>
                <th className="border px-2 py-2 text-center text-sm font-medium">Pole 1</th>
                <th className="border px-2 py-2 text-center text-sm font-medium">Pole 2</th>
                <th className="border px-2 py-2 text-center text-sm font-medium">Pole 3</th>
              </tr>
            </thead>
            <tbody>
              {(['longTime','shortTime','instantaneous','groundFault'] as SectionKey[]).map((k) => (
                <tr key={`inj-${k}`}>
                  <td className="border px-2 py-2 text-sm">{k.replace('Time',' Time').replace('Fault',' Fault')}</td>
                  <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded text-center" value={v.secondaryInjection[k].amperes1 || ''} onChange={(e)=>setInj(k,{ amperes1: e.target.value })} /></td>
                  <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded text-center" value={v.secondaryInjection[k].amperes2 || ''} onChange={(e)=>setInj(k,{ amperes2: e.target.value })} /></td>
                  <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded text-center" value={v.secondaryInjection[k].toleranceMin || ''} onChange={(e)=>setInj(k,{ toleranceMin: e.target.value })} /></td>
                  <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded text-center" value={v.secondaryInjection[k].toleranceMax || ''} onChange={(e)=>setInj(k,{ toleranceMax: e.target.value })} /></td>
                  <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded text-center" value={v.secondaryInjection[k].pole1 || ''} onChange={(e)=>setInj(k,{ pole1: e.target.value })} /></td>
                  <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded text-center" value={v.secondaryInjection[k].pole2 || ''} onChange={(e)=>setInj(k,{ pole2: e.target.value })} /></td>
                  <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded text-center" value={v.secondaryInjection[k].pole3 || ''} onChange={(e)=>setInj(k,{ pole3: e.target.value })} /></td>
                  <td className="border px-2 py-2 text-center">
                    <select className="w-full p-1 border rounded" value={v.secondaryInjection[k].unit || 'sec.'} onChange={(e)=>setInj(k,{ unit: e.target.value })}>
                      {UNITS.map((u)=>(<option key={u} value={u}>{u}</option>))}
                    </select>
                  </td>
                  <td className="border px-2 py-2 text-center">
                    <select className="w-full p-1 border rounded" value={v.secondaryInjection[k].passFail || 'PASS'} onChange={(e)=>setInj(k,{ passFail: e.target.value })}>
                      {PF.map((p)=>(<option key={p} value={p}>{p}</option>))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


