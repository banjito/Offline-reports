import React from 'react';

interface SideValue { thermal?: string; magnetic?: string }
export interface ThermalMagDeviceSettingsValue { asFound?: SideValue; asLeft?: SideValue }

interface Props { value?: ThermalMagDeviceSettingsValue; onChange: (next: ThermalMagDeviceSettingsValue) => void }

const ensure = (v?: ThermalMagDeviceSettingsValue): Required<ThermalMagDeviceSettingsValue> => ({
  asFound: { thermal: '', magnetic: '', ...(v?.asFound || {}) },
  asLeft: { thermal: '', magnetic: '', ...(v?.asLeft || {}) },
});

export const ThermalMagDeviceSettingsTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);
  const set = (side: 'asFound' | 'asLeft', key: keyof SideValue, val: string) => {
    onChange({ ...v, [side]: { ...v[side], [key]: val } });
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-2">Thermal</td>
              <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded" value={v[side].thermal || ''} onChange={(e)=>set(side,'thermal',e.target.value)} /></td>
            </tr>
            <tr>
              <td className="border px-2 py-2">Magnetic</td>
              <td className="border px-2 py-2 text-center"><input className="w-full p-1 border rounded" value={v[side].magnetic || ''} onChange={(e)=>set(side,'magnetic',e.target.value)} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {renderSide('asFound','Settings As Found')}
      {renderSide('asLeft','Settings As Left')}
    </div>
  );
};


