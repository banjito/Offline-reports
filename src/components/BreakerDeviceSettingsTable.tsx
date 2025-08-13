import React from 'react';

type SettingKey = 'longTime' | 'shortTime' | 'instantaneous' | 'groundFault';

interface SettingRow {
  setting?: string;
  delay?: string;
  i2t?: string;
}

export interface BreakerDeviceSettingsValue {
  asFound?: Record<SettingKey, SettingRow>;
  asLeft?: Record<SettingKey, SettingRow>;
}

interface Props {
  value?: BreakerDeviceSettingsValue;
  onChange: (next: BreakerDeviceSettingsValue) => void;
}

const ensureDefaults = (v?: BreakerDeviceSettingsValue): Required<BreakerDeviceSettingsValue> => ({
  asFound: {
    longTime: { ...(v?.asFound?.longTime || {}) },
    shortTime: { ...(v?.asFound?.shortTime || {}) },
    instantaneous: { ...(v?.asFound?.instantaneous || {}) },
    groundFault: { ...(v?.asFound?.groundFault || {}) },
  },
  asLeft: {
    longTime: { ...(v?.asLeft?.longTime || {}) },
    shortTime: { ...(v?.asLeft?.shortTime || {}) },
    instantaneous: { ...(v?.asLeft?.instantaneous || {}) },
    groundFault: { ...(v?.asLeft?.groundFault || {}) },
  },
});

const I2T_OPTIONS = ['On','Off','In','Out','N/A'];

export const BreakerDeviceSettingsTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensureDefaults(value);

  const set = (side: 'asFound' | 'asLeft', key: SettingKey, updates: Partial<SettingRow>) => {
    onChange({
      ...v,
      [side]: { ...v[side], [key]: { ...v[side][key], ...updates } },
    });
  };

  const renderSide = (side: 'asFound' | 'asLeft', title: string) => (
    <div>
      <h3 className="text-lg font-medium mb-2 text-center">{title}</h3>
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
            {(['longTime','shortTime','instantaneous','groundFault'] as SettingKey[]).map((key) => (
              <tr key={`${side}-${key}`}>
                <td className="border px-2 py-2 text-sm capitalize">{key.replace('Time',' Time').replace('Fault',' Fault')}</td>
                <td className="border px-2 py-2 text-center">
                  <input
                    className="w-full p-1 border border-gray-300 rounded"
                    value={v[side][key].setting || ''}
                    onChange={(e) => set(side, key, { setting: e.target.value })}
                  />
                </td>
                <td className="border px-2 py-2 text-center">
                  <input
                    className="w-full p-1 border border-gray-300 rounded"
                    value={v[side][key].delay || ''}
                    onChange={(e) => set(side, key, { delay: e.target.value })}
                  />
                </td>
                <td className="border px-2 py-2 text-center">
                  {key === 'shortTime' || key === 'groundFault' ? (
                    <select
                      className="w-full p-1 border border-gray-300 rounded"
                      value={v[side][key].i2t || ''}
                      onChange={(e) => set(side, key, { i2t: e.target.value })}
                    >
                      <option value=""></option>
                      {I2T_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input className="w-full p-1 border border-gray-300 rounded bg-gray-100" value="" readOnly />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {renderSide('asFound', 'Settings As Found')}
      {renderSide('asLeft', 'Settings As Left')}
    </div>
  );
};


