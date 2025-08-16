import React, { useMemo } from 'react';
import { convertFahrenheitToCelsius, getTCF, applyTCF } from '../lib/tcf';

export interface DryTypeIRValue {
  testVoltage?: string;
  unit?: string;
  rows?: Array<{
    id: string;
    primary?: string;
    secondary?: string;
    primaryToSecondary?: string;
    acceptable?: 'Yes' | 'No';
  }>;
  // Insulation resistance readings
  primaryToGround?: {
    testVoltage?: string;
    r05?: string; // 0.5 min
    r1?: string;  // 1 min
    r10?: string; // 10 min
    units?: string;
  };
  secondaryToGround?: {
    testVoltage?: string;
    r05?: string;
    r1?: string;
    r10?: string;
    units?: string;
  };
  primaryToSecondary?: {
    testVoltage?: string;
    r05?: string;
    r1?: string;
    r10?: string;
    units?: string;
  };
}

interface Props {
  value?: DryTypeIRValue;
  onChange: (next: DryTypeIRValue) => void;
  temperatureF?: number;
}

const ensure = (v?: DryTypeIRValue): DryTypeIRValue & { rows: NonNullable<DryTypeIRValue['rows']> } => ({
  testVoltage: v?.testVoltage || '1000V',
  unit: v?.unit || 'MΩ',
  rows: v?.rows || [
    { id: 'dielectricAbsorption', primary: '1.00', secondary: '', primaryToSecondary: '', acceptable: 'No' },
    { id: 'polarizationIndex', primary: '1.00', secondary: '', primaryToSecondary: '', acceptable: 'No' }
  ],
  primaryToGround: v?.primaryToGround || { testVoltage: '5000', units: 'MΩ' },
  secondaryToGround: v?.secondaryToGround || { testVoltage: '1000', units: 'MΩ' },
  primaryToSecondary: v?.primaryToSecondary || { testVoltage: '5000', units: 'MΩ' }
});

export const DryTypeIRTables: React.FC<Props> = ({ value, onChange, temperatureF }) => {
  const v = ensure(value);
  
  // Temperature correction calculations
  const celsius = useMemo(() => (typeof temperatureF === 'number' ? convertFahrenheitToCelsius(temperatureF) : undefined), [temperatureF]);
  const tcf = useMemo(() => (typeof celsius === 'number' ? getTCF(celsius) : undefined), [celsius]);

  const setRow = (rowIndex: number, updates: Partial<DryTypeIRValue['rows'][0]>) => {
    const next = ensure({ ...v });
    if (next.rows[rowIndex]) {
      next.rows[rowIndex] = { ...next.rows[rowIndex], ...updates };
      onChange(next);
    }
  };

  const setField = (updates: Partial<DryTypeIRValue>) => onChange({ ...v, ...updates });

  const setInsulationReading = (key: keyof Pick<DryTypeIRValue, 'primaryToGround' | 'secondaryToGround' | 'primaryToSecondary'>, field: string, value: string) => {
    const next = ensure({ ...v });
    if (next[key]) {
      (next[key] as any)[field] = value;
      onChange(next);
    }
  };

  // Calculate Dielectric Absorption Ratio (1 min / 0.5 min)
  const calculateDAR = (r1: string, r05: string) => {
    const a = parseFloat(r1 || '');
    const b = parseFloat(r05 || '');
    if (!isFinite(a) || !isFinite(b) || b === 0) return '';
    return (a / b).toFixed(2);
  };

  // Calculate Polarization Index (10 min / 1 min)
  const calculatePI = (r10: string, r1: string) => {
    const a = parseFloat(r10 || '');
    const b = parseFloat(r1 || '');
    if (!isFinite(a) || !isFinite(b) || b === 0) return '';
    return (a / b).toFixed(2);
  };

  // Auto-update dielectric absorption and polarization index when readings change
  React.useEffect(() => {
    const next = ensure({ ...v });
    
    // Update dielectric absorption (Primary to Ground)
    const darPrimary = calculateDAR(v.primaryToGround?.r1 || '', v.primaryToGround?.r05 || '');
    if (darPrimary && next.rows[0]) {
      next.rows[0].primary = darPrimary;
    }
    
    // Update polarization index (Primary to Ground)
    const piPrimary = calculatePI(v.primaryToGround?.r10 || '', v.primaryToGround?.r1 || '');
    if (piPrimary && next.rows[1]) {
      next.rows[1].primary = piPrimary;
    }
    
    onChange(next);
  }, [v.primaryToGround?.r05, v.primaryToGround?.r1, v.primaryToGround?.r10]);

  return (
    <div className="space-y-4">
      {/* Top Section: Two Side-by-Side Tables */}
      <div className="flex gap-4">
        {/* Left Table: Insulation Resistance Values */}
        <div className="flex-1">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th colSpan={5} className="border px-2 py-2 text-center">Insulation Resistance Values</th>
              </tr>
              <tr>
                <th className="border px-2 py-2">TEST VOLTAGE</th>
                <th className="border px-2 py-2">0.5 MIN.</th>
                <th className="border px-2 py-2">1 MIN.</th>
                <th className="border px-2 py-2">10 MIN.</th>
                <th className="border px-2 py-2">UNITS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">
                  <select 
                    className="w-full border-0 focus:ring-0 text-center"
                    value={v.primaryToGround?.testVoltage || '5000'}
                    onChange={(e) => setInsulationReading('primaryToGround', 'testVoltage', e.target.value)}
                  >
                    <option value="5000">5000</option>
                    <option value="1000">1000</option>
                    <option value="2500">2500</option>
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center" 
                    value={v.primaryToGround?.r05 || ''}
                    onChange={(e) => setInsulationReading('primaryToGround', 'r05', e.target.value)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center" 
                    value={v.primaryToGround?.r1 || ''}
                    onChange={(e) => setInsulationReading('primaryToGround', 'r1', e.target.value)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center" 
                    value={v.primaryToGround?.r10 || ''}
                    onChange={(e) => setInsulationReading('primaryToGround', 'r10', e.target.value)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <select 
                    className="w-full border-0 focus:ring-0 text-center"
                    value={v.primaryToGround?.units || 'MΩ'}
                    onChange={(e) => setInsulationReading('primaryToGround', 'units', e.target.value)}
                  >
                    <option value="MΩ">MΩ</option>
                    <option value="GΩ">GΩ</option>
                    <option value="kΩ">kΩ</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="border px-2 py-1">
                  <select 
                    className="w-full border-0 focus:ring-0 text-center"
                    value={v.secondaryToGround?.testVoltage || '1000'}
                    onChange={(e) => setInsulationReading('secondaryToGround', 'testVoltage', e.target.value)}
                  >
                    <option value="1000">1000</option>
                    <option value="5000">5000</option>
                    <option value="2500">2500</option>
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center" 
                    value={v.secondaryToGround?.r05 || ''}
                    onChange={(e) => setInsulationReading('secondaryToGround', 'r05', e.target.value)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center" 
                    value={v.secondaryToGround?.r1 || ''}
                    onChange={(e) => setInsulationReading('secondaryToGround', 'r1', e.target.value)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center" 
                    value={v.secondaryToGround?.r10 || ''}
                    onChange={(e) => setInsulationReading('secondaryToGround', 'r10', e.target.value)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <select 
                    className="w-full border-0 focus:ring-0 text-center"
                    value={v.secondaryToGround?.units || 'MΩ'}
                    onChange={(e) => setInsulationReading('secondaryToGround', 'units', e.target.value)}
                  >
                    <option value="MΩ">MΩ</option>
                    <option value="GΩ">GΩ</option>
                    <option value="kΩ">kΩ</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="border px-2 py-1">
                  <select 
                    className="w-full border-0 focus:ring-0 text-center"
                    value={v.primaryToSecondary?.testVoltage || '5000'}
                    onChange={(e) => setInsulationReading('primaryToSecondary', 'testVoltage', e.target.value)}
                  >
                    <option value="5000">5000</option>
                    <option value="1000">1000</option>
                    <option value="2500">2500</option>
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center" 
                    value={v.primaryToSecondary?.r05 || ''}
                    onChange={(e) => setInsulationReading('primaryToSecondary', 'r05', e.target.value)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center" 
                    value={v.primaryToSecondary?.r1 || ''}
                    onChange={(e) => setInsulationReading('primaryToSecondary', 'r1', e.target.value)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center" 
                    value={v.primaryToSecondary?.r10 || ''}
                    onChange={(e) => setInsulationReading('primaryToSecondary', 'r10', e.target.value)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <select 
                    className="w-full border-0 focus:ring-0 text-center"
                    value={v.primaryToSecondary?.units || 'MΩ'}
                    onChange={(e) => setInsulationReading('primaryToSecondary', 'units', e.target.value)}
                  >
                    <option value="MΩ">MΩ</option>
                    <option value="GΩ">GΩ</option>
                    <option value="kΩ">kΩ</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Table: Temperature Corrected Values */}
        <div className="flex-1">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th colSpan={4} className="border px-2 py-2 text-center">Temperature Corrected Values</th>
              </tr>
              <tr>
                <th className="border px-2 py-2">0.5 MIN.</th>
                <th className="border px-2 py-2">1 MIN.</th>
                <th className="border px-2 py-2">10 MIN.</th>
                <th className="border px-2 py-2">UNITS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                    value={typeof tcf === 'number' ? applyTCF(v.primaryToGround?.r05 || '', tcf) : ''}
                    readOnly
                  />
                </td>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                    value={typeof tcf === 'number' ? applyTCF(v.primaryToGround?.r1 || '', tcf) : ''}
                    readOnly
                  />
                </td>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                    value={typeof tcf === 'number' ? applyTCF(v.primaryToGround?.r10 || '', tcf) : ''}
                    readOnly
                  />
                </td>
                <td className="border px-2 py-1 text-center">{v.primaryToGround?.units || 'MΩ'}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                    value={typeof tcf === 'number' ? applyTCF(v.secondaryToGround?.r05 || '', tcf) : ''}
                    readOnly
                  />
                </td>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                    value={typeof tcf === 'number' ? applyTCF(v.secondaryToGround?.r1 || '', tcf) : ''}
                    readOnly
                  />
                </td>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                    value={typeof tcf === 'number' ? applyTCF(v.secondaryToGround?.r10 || '', tcf) : ''}
                    readOnly
                  />
                </td>
                <td className="border px-2 py-1 text-center">{v.secondaryToGround?.units || 'MΩ'}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                    value={typeof tcf === 'number' ? applyTCF(v.primaryToSecondary?.r05 || '', tcf) : ''}
                    readOnly
                  />
                </td>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                    value={typeof tcf === 'number' ? applyTCF(v.primaryToSecondary?.r1 || '', tcf) : ''}
                    readOnly
                  />
                </td>
                <td className="border px-2 py-1">
                  <input 
                    className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                    value={typeof tcf === 'number' ? applyTCF(v.primaryToSecondary?.r10 || '', tcf) : ''}
                    readOnly
                  />
                </td>
                <td className="border px-2 py-1 text-center">{v.primaryToSecondary?.units || 'MΩ'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section: Dielectric Absorption and Polarization Index Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-2 py-2">Test Type</th>
              <th className="border px-2 py-2">PRIMARY</th>
              <th className="border px-2 py-2">SECONDARY</th>
              <th className="border px-2 py-2">PRIMARY TO SECONDARY</th>
              <th className="border px-2 py-2">ACCEPTABLE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1 text-center">Dielectric Absorption : (Ratio of 1 Minute to 0.5 Minute Result)</td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                  value={v.rows[0]?.primary || ''}
                  readOnly
                />
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                  value={calculateDAR(v.secondaryToGround?.r1 || '', v.secondaryToGround?.r05 || '')}
                  readOnly
                />
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                  value={calculateDAR(v.primaryToSecondary?.r1 || '', v.primaryToSecondary?.r05 || '')}
                  readOnly
                />
              </td>
              <td className="border px-2 py-1">
                <select 
                  className="w-full border-0 focus:ring-0 text-center text-red-600" 
                  value={v.rows[0]?.acceptable || 'No'} 
                  onChange={(e)=>setRow(0,{ acceptable: e.target.value as 'Yes' | 'No' })}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-1 text-center">Polarization Index : (Ratio of 10 Minute to 1 Minute Result)</td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                  value={v.rows[1]?.primary || ''}
                  readOnly
                />
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                  value={calculatePI(v.secondaryToGround?.r10 || '', v.secondaryToGround?.r1 || '')}
                  readOnly
                />
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                  value={calculatePI(v.primaryToSecondary?.r10 || '', v.primaryToSecondary?.r1 || '')}
                  readOnly
                />
              </td>
              <td className="border px-2 py-1">
                <select 
                  className="w-full border-0 focus:ring-0 text-center text-red-600" 
                  value={v.rows[1]?.acceptable || 'No'} 
                  onChange={(e)=>setRow(1,{ acceptable: e.target.value as 'Yes' | 'No' })}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


