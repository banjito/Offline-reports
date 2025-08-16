import React, { useMemo } from 'react';
import { convertFahrenheitToCelsius, getTCF, applyTCF } from '../lib/tcf';

export interface DryTypeIRSmallValue {
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
    units?: string;
    table100Value?: string; // Table 100.5 Min. Value
    table100Units?: string; // Table 100.5 Min. Units
  };
  secondaryToGround?: {
    testVoltage?: string;
    r05?: string;
    r1?: string;
    units?: string;
    table100Value?: string;
    table100Units?: string;
  };
  primaryToSecondary?: {
    testVoltage?: string;
    r05?: string;
    r1?: string;
    units?: string;
    table100Value?: string;
    table100Units?: string;
  };
  // Summary settings
  darMin?: string; // minimum D.A.R. threshold
  passFail?: string; // PASS/FAIL
}

interface Props {
  value?: DryTypeIRSmallValue;
  onChange: (next: DryTypeIRSmallValue) => void;
  temperatureF?: number;
}

const ensure = (v?: DryTypeIRSmallValue): DryTypeIRSmallValue & { rows: NonNullable<DryTypeIRSmallValue['rows']> } => ({
  testVoltage: v?.testVoltage || '1000V',
  unit: v?.unit || 'GΩ',
  rows: v?.rows || [
    { id: 'dielectricAbsorption', primary: '1.00', secondary: '', primaryToSecondary: '', acceptable: 'No' },
    { id: 'polarizationIndex', primary: '1.00', secondary: '', primaryToSecondary: '', acceptable: 'No' }
  ],
  primaryToGround: v?.primaryToGround || { testVoltage: '250V', units: 'GΩ', table100Units: 'GΩ' },
  secondaryToGround: v?.secondaryToGround || { testVoltage: '250V', units: 'GΩ', table100Units: 'GΩ' },
  primaryToSecondary: v?.primaryToSecondary || { testVoltage: '250V', units: 'GΩ', table100Units: 'GΩ' },
  darMin: v?.darMin || '1.0',
  passFail: v?.passFail || 'PASS'
});

export const DryTypeIRTablesSmall: React.FC<Props> = ({ value, onChange, temperatureF }) => {
  const v = ensure(value);
  
  // Temperature correction calculations
  const celsius = useMemo(() => (typeof temperatureF === 'number' ? convertFahrenheitToCelsius(temperatureF) : undefined), [temperatureF]);
  const tcf = useMemo(() => (typeof celsius === 'number' ? getTCF(celsius) : undefined), [celsius]);

  const setRow = (rowIndex: number, updates: Partial<DryTypeIRSmallValue['rows'][0]>) => {
    const next = ensure({ ...v });
    if (next.rows[rowIndex]) {
      next.rows[rowIndex] = { ...next.rows[rowIndex], ...updates };
      onChange(next);
    }
  };

  const setField = (updates: Partial<DryTypeIRSmallValue>) => onChange({ ...v, ...updates });

  const setInsulationReading = (key: keyof Pick<DryTypeIRSmallValue, 'primaryToGround' | 'secondaryToGround' | 'primaryToSecondary'>, field: string, value: string) => {
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

  // Auto-update dielectric absorption when readings change
  React.useEffect(() => {
    const next = ensure({ ...v });
    
    // Update dielectric absorption (Primary to Ground)
    const darPrimary = calculateDAR(v.primaryToGround?.r1 || '', v.primaryToGround?.r05 || '');
    if (darPrimary && next.rows[0]) {
      next.rows[0].primary = darPrimary;
    }
    
    // Update dielectric absorption (Secondary to Ground)
    const darSecondary = calculateDAR(v.secondaryToGround?.r1 || '', v.secondaryToGround?.r05 || '');
    if (darSecondary && next.rows[0]) {
      next.rows[0].secondary = darSecondary;
    }
    
    // Update dielectric absorption (Primary to Secondary)
    const darPrimarySecondary = calculateDAR(v.primaryToSecondary?.r1 || '', v.primaryToSecondary?.r05 || '');
    if (darPrimarySecondary && next.rows[0]) {
      next.rows[0].primaryToSecondary = darPrimarySecondary;
    }
    
    onChange(next);
  }, [v.primaryToGround?.r05, v.primaryToGround?.r1, v.secondaryToGround?.r05, v.secondaryToGround?.r1, v.primaryToSecondary?.r05, v.primaryToSecondary?.r1]);

  return (
    <div className="space-y-4">
      {/* Main Insulation Resistance Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th colSpan={9} className="border px-2 py-2 text-center">Electrical Tests - Measured Insulation Resistance</th>
            </tr>
            <tr>
              <th className="border px-2 py-2">Winding Tested</th>
              <th className="border px-2 py-2">Test Voltage (VDC)</th>
              <th colSpan={3} className="border px-2 py-2 text-center">Measured Insulation Resistance</th>
              <th colSpan={3} className="border px-2 py-2 text-center">Corrected Insulation Resistance to 20° C</th>
              <th colSpan={2} className="border px-2 py-2 text-center">Table 100.5 Min. Value</th>
            </tr>
            <tr>
              <th className="border px-2 py-2"></th>
              <th className="border px-2 py-2"></th>
              <th className="border px-2 py-2">0.5 Min.</th>
              <th className="border px-2 py-2">1 Min.</th>
              <th className="border px-2 py-2">Units</th>
              <th className="border px-2 py-2">0.5 Min.</th>
              <th className="border px-2 py-2">1 Min.</th>
              <th className="border px-2 py-2">Units</th>
              <th className="border px-2 py-2">Value</th>
              <th className="border px-2 py-2">Units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">Primary to Ground</td>
              <td className="border px-2 py-1">
                <select 
                  className="w-full border-0 focus:ring-0 text-center"
                  value={v.primaryToGround?.testVoltage || '250V'}
                  onChange={(e) => setInsulationReading('primaryToGround', 'testVoltage', e.target.value)}
                >
                  <option value="250V">250V</option>
                  <option value="500V">500V</option>
                  <option value="1000V">1000V</option>
                  <option value="2500V">2500V</option>
                  <option value="5000V">5000V</option>
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
                <select 
                  className="w-full border-0 focus:ring-0 text-center"
                  value={v.primaryToGround?.units || 'GΩ'}
                  onChange={(e) => setInsulationReading('primaryToGround', 'units', e.target.value)}
                >
                  <option value="GΩ">GΩ</option>
                  <option value="MΩ">MΩ</option>
                  <option value="kΩ">kΩ</option>
                </select>
              </td>
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
                <select 
                  className="w-full border-0 focus:ring-0 text-center"
                  value={v.primaryToGround?.units || 'GΩ'}
                  onChange={(e) => setInsulationReading('primaryToGround', 'units', e.target.value)}
                >
                  <option value="GΩ">GΩ</option>
                  <option value="MΩ">MΩ</option>
                  <option value="kΩ">kΩ</option>
                </select>
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center" 
                  value={v.primaryToGround?.table100Value || ''}
                  onChange={(e) => setInsulationReading('primaryToGround', 'table100Value', e.target.value)}
                />
              </td>
              <td className="border px-2 py-1">
                <select 
                  className="w-full border-0 focus:ring-0 text-center"
                  value={v.primaryToGround?.table100Units || 'GΩ'}
                  onChange={(e) => setInsulationReading('primaryToGround', 'table100Units', e.target.value)}
                >
                  <option value="GΩ">GΩ</option>
                  <option value="MΩ">MΩ</option>
                  <option value="kΩ">kΩ</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Secondary to Ground</td>
              <td className="border px-2 py-1">
                <select 
                  className="w-full border-0 focus:ring-0 text-center"
                  value={v.secondaryToGround?.testVoltage || '250V'}
                  onChange={(e) => setInsulationReading('secondaryToGround', 'testVoltage', e.target.value)}
                >
                  <option value="250V">250V</option>
                  <option value="500V">500V</option>
                  <option value="1000V">1000V</option>
                  <option value="2500V">2500V</option>
                  <option value="5000V">5000V</option>
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
                <select 
                  className="w-full border-0 focus:ring-0 text-center"
                  value={v.secondaryToGround?.units || 'GΩ'}
                  onChange={(e) => setInsulationReading('secondaryToGround', 'units', e.target.value)}
                >
                  <option value="GΩ">GΩ</option>
                  <option value="MΩ">MΩ</option>
                  <option value="kΩ">kΩ</option>
                </select>
              </td>
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
                <select 
                  className="w-full border-0 focus:ring-0 text-center"
                  value={v.secondaryToGround?.units || 'GΩ'}
                  onChange={(e) => setInsulationReading('secondaryToGround', 'units', e.target.value)}
                >
                  <option value="GΩ">GΩ</option>
                  <option value="MΩ">MΩ</option>
                  <option value="kΩ">kΩ</option>
                </select>
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center" 
                  value={v.secondaryToGround?.table100Value || ''}
                  onChange={(e) => setInsulationReading('secondaryToGround', 'table100Value', e.target.value)}
                />
              </td>
              <td className="border px-2 py-1">
                <select 
                  className="w-full border-0 focus:ring-0 text-center"
                  value={v.secondaryToGround?.table100Units || 'GΩ'}
                  onChange={(e) => setInsulationReading('secondaryToGround', 'table100Units', e.target.value)}
                >
                  <option value="GΩ">GΩ</option>
                  <option value="MΩ">MΩ</option>
                  <option value="kΩ">kΩ</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Primary to Secondary</td>
              <td className="border px-2 py-1">
                <select 
                  className="w-full border-0 focus:ring-0 text-center"
                  value={v.primaryToSecondary?.testVoltage || '250V'}
                  onChange={(e) => setInsulationReading('primaryToSecondary', 'testVoltage', e.target.value)}
                >
                  <option value="250V">250V</option>
                  <option value="500V">500V</option>
                  <option value="1000V">1000V</option>
                  <option value="2500V">2500V</option>
                  <option value="5000V">5000V</option>
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
                <select 
                  className="w-full border-0 focus:ring-0 text-center"
                  value={v.primaryToSecondary?.units || 'GΩ'}
                  onChange={(e) => setInsulationReading('primaryToSecondary', 'units', e.target.value)}
                >
                  <option value="GΩ">GΩ</option>
                  <option value="MΩ">MΩ</option>
                  <option value="kΩ">kΩ</option>
                </select>
              </td>
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
                <select 
                  className="w-full border-0 focus:ring-0 text-center"
                  value={v.primaryToSecondary?.units || 'GΩ'}
                  onChange={(e) => setInsulationReading('primaryToSecondary', 'units', e.target.value)}
                >
                  <option value="GΩ">GΩ</option>
                  <option value="MΩ">MΩ</option>
                  <option value="kΩ">kΩ</option>
                </select>
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center" 
                  value={v.primaryToSecondary?.table100Value || ''}
                  onChange={(e) => setInsulationReading('primaryToSecondary', 'table100Value', e.target.value)}
                />
              </td>
              <td className="border px-2 py-1">
                <select 
                  className="w-full border-0 focus:ring-0 text-center"
                  value={v.primaryToSecondary?.table100Units || 'GΩ'}
                  onChange={(e) => setInsulationReading('primaryToSecondary', 'table100Units', e.target.value)}
                >
                  <option value="GΩ">GΩ</option>
                  <option value="MΩ">MΩ</option>
                  <option value="kΩ">kΩ</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Calculated Values / D.A.R. Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-2 py-2">Calculated As:</th>
              <th className="border px-2 py-2">Pri to Gnd</th>
              <th className="border px-2 py-2">Sec to Gnd</th>
              <th className="border px-2 py-2">Pri to Sec</th>
              <th className="border px-2 py-2">Pass/Fail</th>
              <th className="border px-2 py-2">Min. D.A.R.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">1 Min. / 0.5 Min. Values</td>
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
                  value={v.rows[0]?.secondary || ''}
                  readOnly
                />
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center bg-gray-100" 
                  value={v.rows[0]?.primaryToSecondary || ''}
                  readOnly
                />
              </td>
              <td className="border px-2 py-1">
                <select 
                  className="w-full border-0 focus:ring-0 text-center" 
                  value={v.passFail}
                  onChange={(e) => setField({ passFail: e.target.value })}
                >
                  <option value="PASS">PASS</option>
                  <option value="FAIL">FAIL</option>
                </select>
              </td>
              <td className="border px-2 py-1">
                <input 
                  className="w-full border-0 focus:ring-0 text-center" 
                  value={v.darMin}
                  onChange={(e) => setField({ darMin: e.target.value })}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
