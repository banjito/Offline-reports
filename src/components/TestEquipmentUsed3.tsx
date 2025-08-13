import React from 'react';

interface EquipRow { name?: string; serialNumber?: string; ampId?: string }
export interface TestEquipment3Value {
  megohmmeter?: EquipRow;
  lowResistanceOhmmeter?: EquipRow;
  primaryInjectionTestSet?: EquipRow;
}

interface Props {
  value?: TestEquipment3Value;
  onChange: (next: TestEquipment3Value) => void;
}

const ensure = (v?: TestEquipment3Value): Required<TestEquipment3Value> => ({
  megohmmeter: { ...(v?.megohmmeter || {}) },
  lowResistanceOhmmeter: { ...(v?.lowResistanceOhmmeter || {}) },
  primaryInjectionTestSet: { ...(v?.primaryInjectionTestSet || {}) },
});

export const TestEquipmentUsed3: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);
  const set = (key: keyof TestEquipment3Value, updates: Partial<EquipRow>) => {
    onChange({ ...v, [key]: { ...(v[key] as EquipRow), ...updates } });
  };

  const Row: React.FC<{ label: string; keyName: keyof TestEquipment3Value }> = ({ label, keyName }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
      <div>
        <label className="form-label">{label}:</label>
        <input className="form-input w-full" value={v[keyName]?.name || ''} onChange={(e)=>set(keyName,{ name: e.target.value })} />
      </div>
      <div>
        <label className="form-label">Serial Number:</label>
        <input className="form-input w-full" value={v[keyName]?.serialNumber || ''} onChange={(e)=>set(keyName,{ serialNumber: e.target.value })} />
      </div>
      <div>
        <label className="form-label">AMP ID:</label>
        <input className="form-input w-full" value={v[keyName]?.ampId || ''} onChange={(e)=>set(keyName,{ ampId: e.target.value })} />
      </div>
    </div>
  );

  return (
    <div>
      <Row label="Megohmmeter" keyName="megohmmeter" />
      <Row label="Low-Resistance Ohmmeter" keyName="lowResistanceOhmmeter" />
      <Row label="Primary Injection Test Set" keyName="primaryInjectionTestSet" />
    </div>
  );
};


