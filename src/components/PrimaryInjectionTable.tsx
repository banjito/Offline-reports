import React from 'react';

type SectionKey = 'longTime' | 'shortTime' | 'instantaneous' | 'groundFault';

interface TestedRow { setting?: string; delay?: string; i2t?: string }
interface Pole { sec?: string; a?: string }
interface ResultRow {
  ratedAmperes1?: string;
  ratedAmperes2?: string; // shown on second row
  multiplier?: string; // display only
  toleranceMin?: string; // display row 1 label only
  toleranceMax?: string; // display row 1 label only
  testAmperes1?: string;
  testAmperes2?: string; // second row
  toleranceMin1?: string; // row1 cells
  toleranceMax1?: string; // row1 cells
  toleranceMin2?: string; // row2 calculated
  toleranceMax2?: string; // row2 calculated
  pole1?: Pole;
  pole2?: Pole;
  pole3?: Pole;
}

export interface PrimaryInjectionValue {
  testedSettings?: Record<SectionKey, TestedRow>;
  results?: Record<SectionKey, ResultRow>;
}

interface Props {
  value?: PrimaryInjectionValue;
  onChange: (next: PrimaryInjectionValue) => void;
}

const ensure = (v?: PrimaryInjectionValue): Required<PrimaryInjectionValue> => ({
  testedSettings: {
    longTime: { ...(v?.testedSettings?.longTime || {}) },
    shortTime: { ...(v?.testedSettings?.shortTime || {}) },
    instantaneous: { ...(v?.testedSettings?.instantaneous || {}) },
    groundFault: { ...(v?.testedSettings?.groundFault || {}) },
  },
  results: {
    longTime: { multiplier: '300%', toleranceMin: '-10%', toleranceMax: '10%', pole1: {}, pole2: {}, pole3: {}, ...(v?.results?.longTime || {}) },
    shortTime: { multiplier: '110%', toleranceMin: '-10%', toleranceMax: '10%', pole1: {}, pole2: {}, pole3: {}, ...(v?.results?.shortTime || {}) },
    instantaneous: { multiplier: '', toleranceMin: '-20%', toleranceMax: '20%', pole1: {}, pole2: {}, pole3: {}, ...(v?.results?.instantaneous || {}) },
    groundFault: { multiplier: '110%', toleranceMin: '-15%', toleranceMax: '15%', pole1: {}, pole2: {}, pole3: {}, ...(v?.results?.groundFault || {}) },
  },
});

const MULT: Record<SectionKey, number> = {
  longTime: 3.0,
  shortTime: 1.1,
  instantaneous: 1.0,
  groundFault: 1.1,
};

const TOL: Record<SectionKey, number> = {
  longTime: 0.10,
  shortTime: 0.10,
  instantaneous: 0.20,
  groundFault: 0.15,
};

const I2T_OPTIONS = ['On','Off','In','Out','N/A'];

export const PrimaryInjectionTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);

  const setTested = (key: SectionKey, updates: Partial<TestedRow>) => {
    onChange({ ...v, testedSettings: { ...v.testedSettings, [key]: { ...v.testedSettings[key], ...updates } } });
  };
  const setResults = (key: SectionKey, updates: Partial<ResultRow>) => {
    onChange({ ...v, results: { ...v.results, [key]: { ...v.results[key], ...updates } } });
  };

  const recalcFromRated = (key: SectionKey, ratedStr: string) => {
    const rated = parseFloat(ratedStr || '');
    if (!Number.isFinite(rated)) {
      setResults(key, { ratedAmperes1: ratedStr, ratedAmperes2: '', testAmperes1: '', testAmperes2: '', toleranceMin2: '', toleranceMax2: '' });
      return;
    }
    const m = MULT[key];
    const t = TOL[key];
    const test1 = key === 'instantaneous' ? '' : (rated * m).toFixed(1);
    const tolMin2 = (rated * (1 - t)).toFixed(1);
    const tolMax2 = (rated * (1 + t)).toFixed(1);
    setResults(key, {
      ratedAmperes1: ratedStr,
      ratedAmperes2: ratedStr,
      testAmperes1: test1,
      testAmperes2: ratedStr,
      toleranceMin2: tolMin2,
      toleranceMax2: tolMax2,
    });
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
                        {I2T_OPTIONS.map((opt)=> (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
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

      {/* Results Grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-2 py-2 text-left text-sm font-medium" rowSpan={2}>Function</th>
              <th className="border px-2 py-2 text-center text-sm font-medium">Rated Amperes</th>
              <th className="border px-2 py-2 text-center text-sm font-medium" colSpan={2}>Multiplier %</th>
              <th className="border px-2 py-2 text-center text-sm font-medium">Test Amperes</th>
              <th className="border px-2 py-2 text-center text-sm font-medium" colSpan={2}>Tolerance</th>
              <th className="border px-2 py-2 text-center text-sm font-medium">Pole 1</th>
              <th className="border px-2 py-2 text-center text-sm font-medium">Pole 2</th>
              <th className="border px-2 py-2 text-center text-sm font-medium">Pole 3</th>
            </tr>
            <tr>
              <th className="border px-2 py-2"></th>
              <th className="border px-2 py-2 text-center">Tolerance</th>
              <th className="border px-2 py-2"></th>
              <th className="border px-2 py-2"></th>
              <th className="border px-2 py-2 text-center">Min</th>
              <th className="border px-2 py-2 text-center">Max</th>
              <th className="border px-2 py-2"></th>
              <th className="border px-2 py-2"></th>
              <th className="border px-2 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {(['longTime','shortTime','instantaneous','groundFault'] as SectionKey[]).map((k) => (
              <React.Fragment key={`res-${k}`}>
                <tr>
                  <td className="border px-2 py-2" rowSpan={2}>{k.replace('Time',' Time').replace('Fault',' Fault')}</td>
                  <td className="border px-2 py-2 text-center">
                    <input
                      className="w-full p-1 border rounded text-center"
                      value={v.results[k].ratedAmperes1 || ''}
                      onChange={(e)=>setResults(k,{ ratedAmperes1: e.target.value })}
                      onBlur={(e)=>recalcFromRated(k, e.target.value)}
                    />
                  </td>
                  <td className="border px-2 py-2 text-center" colSpan={2}>{v.results[k].multiplier}</td>
                  <td className="border px-2 py-2 text-center">
                    <input className="w-full p-1 border rounded text-center" value={v.results[k].testAmperes1 || ''} onChange={(e)=>setResults(k,{ testAmperes1: e.target.value })} />
                  </td>
                  <td className="border px-2 py-2 text-center">
                    <input className="w-full p-1 border rounded text-center" value={v.results[k].toleranceMin1 || ''} onChange={(e)=>setResults(k,{ toleranceMin1: e.target.value })} />
                  </td>
                  <td className="border px-2 py-2 text-center">
                    <input className="w-full p-1 border rounded text-center" value={v.results[k].toleranceMax1 || ''} onChange={(e)=>setResults(k,{ toleranceMax1: e.target.value })} />
                  </td>
                  <td className="border px-2 py-2 text-center"><div className="flex items-center justify-center"><input className="w-16 p-1 border rounded text-center" value={v.results[k].pole1?.sec || ''} onChange={(e)=>setResults(k,{ pole1: { ...(v.results[k].pole1||{}), sec: e.target.value } })} /><span className="ml-1">sec.</span></div></td>
                  <td className="border px-2 py-2 text-center"><div className="flex items-center justify-center"><input className="w-16 p-1 border rounded text-center" value={v.results[k].pole2?.sec || ''} onChange={(e)=>setResults(k,{ pole2: { ...(v.results[k].pole2||{}), sec: e.target.value } })} /><span className="ml-1">sec.</span></div></td>
                  <td className="border px-2 py-2 text-center"><div className="flex items-center justify-center"><input className="w-16 p-1 border rounded text-center" value={v.results[k].pole3?.sec || ''} onChange={(e)=>setResults(k,{ pole3: { ...(v.results[k].pole3||{}), sec: e.target.value } })} /><span className="ml-1">sec.</span></div></td>
                </tr>
                <tr>
                  <td className="border px-2 py-2 text-center">{k === 'longTime' ? 'LTPU' : k === 'shortTime' ? 'STPU' : k === 'instantaneous' ? 'IPU' : 'GFPU'}</td>
                  <td className="border px-2 py-2 text-center">{v.results[k].toleranceMin}</td>
                  <td className="border px-2 py-2 text-center">{v.results[k].toleranceMax}</td>
                  <td className="border px-2 py-2 text-center">
                    <input className="w-full p-1 border rounded text-center" value={v.results[k].testAmperes2 || ''} onChange={(e)=>setResults(k,{ testAmperes2: e.target.value })} />
                  </td>
                  <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded text-center" value={v.results[k].toleranceMin2 || ''} onChange={(e)=>setResults(k,{ toleranceMin2: e.target.value })} /></td>
                  <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded text-center" value={v.results[k].toleranceMax2 || ''} onChange={(e)=>setResults(k,{ toleranceMax2: e.target.value })} /></td>
                  <td className="border px-2 py-2 text-center"><div className="flex items-center justify-center"><input className="w-16 p-1 border rounded text-center" value={v.results[k].pole1?.a || ''} onChange={(e)=>setResults(k,{ pole1: { ...(v.results[k].pole1||{}), a: e.target.value } })} /><span className="ml-1">A</span></div></td>
                  <td className="border px-2 py-2 text-center"><div className="flex items-center justify-center"><input className="w-16 p-1 border rounded text-center" value={v.results[k].pole2?.a || ''} onChange={(e)=>setResults(k,{ pole2: { ...(v.results[k].pole2||{}), a: e.target.value } })} /><span className="ml-1">A</span></div></td>
                  <td className="border px-2 py-2 text-center"><div className="flex items-center justify-center"><input className="w-16 p-1 border rounded text-center" value={v.results[k].pole3?.a || ''} onChange={(e)=>setResults(k,{ pole3: { ...(v.results[k].pole3||{}), a: e.target.value } })} /><span className="ml-1">A</span></div></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


