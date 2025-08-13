import React from 'react';
import { ReportField, FIELD_TYPES } from '../types';
import { LvCableTestsTable } from './LvCableTestsTable';
import { VisualMechanicalTable } from './VisualMechanicalTable';
import { CtIdentificationTable } from './CtIdentificationTable';
import { RatioPolarityTable } from './RatioPolarityTable';
import { InsulationTable } from './InsulationTable';
import { FuseResistanceTable } from './FuseResistanceTable';
import { TurnsRatioTable } from './TurnsRatioTable';
import { TurnsRatioSmallDryTable } from './TurnsRatioSmallDryTable';
import { VtTurnsRatioTable } from './VtTurnsRatioTable';
import { ContactResistanceTable } from './ContactResistanceTable';
import { EGapTable } from './EGapTable';
import { TransformerInsulationTable } from './TransformerInsulationTable';
import { convertFahrenheitToCelsius, getTCF } from '../lib/tcf';
import { ContactorInsulationTable } from './ContactorInsulationTable';
import { ReactorInsulationTables } from './ReactorInsulationTables';
import { VacuumBottleIntegrityTable } from './VacuumBottleIntegrityTable';
import { AtsInsulationTable } from './AtsInsulationTable';
import { AtsContactResistanceTable } from './AtsContactResistanceTable';
import { DryTypeIRTables } from './DryTypeIRTables';
import { DryTypeNameplate } from './DryTypeNameplate';
import { BreakerDeviceSettingsTable } from './BreakerDeviceSettingsTable';
import { BreakerContactResistanceTable } from './BreakerContactResistanceTable';
import { PrimaryInjectionTable } from './PrimaryInjectionTable';
import { TestEquipmentUsed3 } from './TestEquipmentUsed3';
import { SecondaryInjectionTable } from './SecondaryInjectionTable';
import { ThermalMagDeviceSettingsTable } from './ThermalMagDeviceSettingsTable';
import { ThermalMagPrimaryInjectionTable } from './ThermalMagPrimaryInjectionTable';
import { PanelboardSmallBreakerTable } from './PanelboardSmallBreakerTable';
import { VisualMechanicalMatrixTable } from './VisualMechanicalMatrixTable';
import { SwitchRowsTable } from './SwitchRowsTable';
import { FuseRowsTable } from './FuseRowsTable';
import { SwitchInsulationTables } from './SwitchInsulationTables';
import { MotorStarterIrTables } from './MotorStarterIrTables';
import { SwitchContactResistanceTable } from './SwitchContactResistanceTable';
import { NetaReferenceTable } from './NetaReferenceTable';
import { MvShieldContinuityTable } from './MvShieldContinuityTable';
import { MvIrPrePostTables } from './MvIrPrePostTables';
import { MvWithstandTable } from './MvWithstandTable';
import { MvTanDeltaTable } from './MvTanDeltaTable';
import { DielectricWithstandClosedTable } from './DielectricWithstandClosedTable';
// import { DielectricBottleOpenTable } from './DielectricBottleOpenTable';
import { VfiSpecificTestsTable } from './VfiSpecificTestsTable';
import { MvSwitchIrTables } from './MvSwitchIrTables';
import { SimpleContactResistanceTable } from './SimpleContactResistanceTable';
import { MvDielectricWayTable } from './MvDielectricWayTable';
import { BuswayInsulationTables } from './BuswayInsulationTables';
import { WindingResistanceTable } from './WindingResistanceTable';
import { ExcitationTestsTable } from './ExcitationTestsTable';
import { PowerFactorTestsTable } from './PowerFactorTestsTable';
import { PanelboardIrTables } from './PanelboardIrTables';
import { PanelboardContactResistanceTable } from './PanelboardContactResistanceTable';
import { SwitchgearIrMeasuredTable } from './SwitchgearIrMeasuredTable';
import { SwitchgearIrCorrectedTable } from './SwitchgearIrCorrectedTable';
import { SwitchgearContactResistanceTable } from './SwitchgearContactResistanceTable';
import { SwitchgearDielectricTable } from './SwitchgearDielectricTable';
// Simple busway-specific helpers (transitional; Insulation uses BuswayInsulationTables)
const BusResistanceTable: React.FC<{ value?: any; onChange: (v:any)=>void }> = ({ value, onChange }) => {
  const v = value || {};
  const set = (u: any) => onChange({ ...v, ...u });
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-50">
          <tr><th colSpan={5} className="border px-2 py-2 text-center">Bus Resistance</th></tr>
          <tr>
            <th className="border px-2 py-1">P1</th>
            <th className="border px-2 py-1">P2</th>
            <th className="border px-2 py-1">P3</th>
            <th className="border px-2 py-1">Neutral</th>
            <th className="border px-2 py-1">Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1"><input className="w-full rounded-md border-gray-300" defaultValue={v.p1||''} onBlur={(e)=>set({ p1: e.target.value })} /></td>
            <td className="border px-2 py-1"><input className="w-full rounded-md border-gray-300" defaultValue={v.p2||''} onBlur={(e)=>set({ p2: e.target.value })} /></td>
            <td className="border px-2 py-1"><input className="w-full rounded-md border-gray-300" defaultValue={v.p3||''} onBlur={(e)=>set({ p3: e.target.value })} /></td>
            <td className="border px-2 py-1"><input className="w-full rounded-md border-gray-300" defaultValue={v.neutral||''} onBlur={(e)=>set({ neutral: e.target.value })} /></td>
            <td className="border px-2 py-1 text-center">µΩ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// (Removed old BuswayInsulationTable; replaced with BuswayInsulationTables)
import { Trash2, Plus, X } from 'lucide-react';

interface FieldRowProps {
  field: ReportField;
  onUpdate: (field: ReportField) => void;
  onDelete: () => void;
  readOnlyMeta?: boolean; // when true, label/type/required controls are hidden
}

export const FieldRow: React.FC<FieldRowProps> = ({ field, onUpdate, onDelete, readOnlyMeta }) => {
  const updateField = (updates: Partial<ReportField>) => {
    onUpdate({ ...field, ...updates });
  };

  const addSelectOption = () => {
    if (readOnlyMeta) return;
    const options = field.options || [];
    updateField({ options: [...options, ''] });
  };

  const updateSelectOption = (index: number, value: string) => {
    if (readOnlyMeta) return;
    const options = [...(field.options || [])];
    options[index] = value;
    updateField({ options });
  };

  const removeSelectOption = (index: number) => {
    if (readOnlyMeta) return;
    const options = [...(field.options || [])];
    options.splice(index, 1);
    updateField({ options });
  };

  const renderValueInput = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            defaultValue={field.value || ''}
            onBlur={(e) => updateField({ value: e.target.value })}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Enter text..."
          />
        );
      
      case 'number':
        return (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={field.value || ''}
              onChange={(e) => {
                updateField({ value: e.target.value });
                if (field.id === 'temperatureF') {
                  (window as any).__REPORT_TEMP_F = Number(e.target.value);
                }
              }}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter number..."
            />
            {field.id === 'temperatureF' && (
              (() => {
                const f = Number(field.value);
                const c = Number.isFinite(f) ? convertFahrenheitToCelsius(f) : undefined;
                const t = typeof c === 'number' ? getTCF(c) : undefined;
                if (typeof t === 'number') {
                  const prevT = (window as any).__REPORT_TCF;
                  if (prevT !== t) {
                    (window as any).__REPORT_TCF = t;
                    try { window.dispatchEvent(new CustomEvent('tcf-changed', { detail: t })); } catch {}
                  }
                }
                return (
                  <span className="text-xs text-gray-600 whitespace-nowrap">
                    {typeof c === 'number' ? `${Math.round(c)}°C` : ''}
                    {typeof t === 'number' ? ` • TCF ${t.toFixed(2)}` : ''}
                  </span>
                );
              })()
            )}
            {field.id === 'secondaryVoltageTap' && (
              (() => {
                const v = Number(field.value);
                (window as any).__SECONDARY_TAP_VOLTAGE = Number.isFinite(v) ? v : undefined;
                return null;
              })()
            )}
            {field.id === 'numberOfCircuitSpaces' && (
              (() => {
                const n = Number(field.value);
                (window as any).__NUM_BREAKERS = Number.isFinite(n) ? n : undefined;
                try { window.dispatchEvent(new CustomEvent('num-breakers-changed', { detail: (window as any).__NUM_BREAKERS })); } catch {}
                return null;
              })()
            )}
          </div>
        );
      
      case 'date':
        return (
          <input
            type="date"
            value={field.value || ''}
            onChange={(e) => updateField({ value: e.target.value })}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            defaultValue={field.value || ''}
            onBlur={(e) => updateField({ value: e.target.value })}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 text-sm"
            placeholder="Enter text..."
          />
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={field.value || false}
              onChange={(e) => updateField({ value: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">
              {field.value ? 'Yes' : 'No'}
            </span>
          </div>
        );
      
      case 'select':
        return (
          <select
            value={field.value || ''}
            onChange={(e) => updateField({ value: e.target.value })}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Select option...</option>
            {(field.options || []).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'table':
        if (field.id === 'dry-nameplate') {
          return (
            <DryTypeNameplate
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'electricalGrid') {
          // try to read temperatureF from window-bound prop if provided later
          const tempF = (window as any).__REPORT_TEMP_F as number | undefined;
          return (
            <LvCableTestsTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
              temperatureF={tempF}
            />
          );
        }
        if (field.id === 'vm-table') {
          const rows = field.value?.rows || [];
          return (
            <VisualMechanicalTable
              rows={rows}
              onChange={(next) => updateField({ value: { rows: next } })}
            />
          );
        }
        if (field.id === 'netaReference') {
          return (
            <NetaReferenceTable value={field.value} />
          );
        }
        if (field.id === 'vm-matrix') {
          return (
            <VisualMechanicalMatrixTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'ctId') {
          return (
            <CtIdentificationTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'ratioPolarity') {
          return (
            <RatioPolarityTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'switchContact') {
          return (
            <SwitchContactResistanceTable value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'reactorCrFound' || field.id === 'reactorCrLeft') {
          const defaults = ['Reading'];
          const labels: [string,string,string] = ['A-Phase','B-Phase','C-Phase'];
          return (
            <ContactResistanceTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
              defaultRows={defaults}
              phaseLabels={labels}
            />
          );
        }
        if (field.id === 'eGap') {
          return (
            <EGapTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'switchIrTables') {
          const tempF = (window as any).__REPORT_TEMP_F as number | undefined;
          return (
            <SwitchInsulationTables
              value={field.value}
              onChange={(next) => updateField({ value: next })}
              temperatureF={tempF}
            />
          );
        }
        if (field.id === 'motorStarterIr') {
          const tempF = (window as any).__REPORT_TEMP_F as number | undefined;
          return (
            <MotorStarterIrTables value={field.value} onChange={(next)=>updateField({ value: next })} temperatureF={tempF} />
          );
        }
        if (field.id === 'switchCrFound' || field.id === 'switchCrLeft') {
          return (
            <SwitchContactResistanceTable value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'mvSwitchIr') {
          const tempF = (window as any).__REPORT_TEMP_F as number | undefined;
          return (
            <MvSwitchIrTables value={field.value} onChange={(next)=>updateField({ value: next })} temperatureF={tempF} />
          );
        }
        if (field.id === 'mvSwitchCr') {
          return (
            <SimpleContactResistanceTable value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'mvShieldContinuity') {
          return (
            <MvShieldContinuityTable value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'mvIrPrePost') {
          const tempF = (window as any).__REPORT_TEMP_F as number | undefined;
          return (
            <MvIrPrePostTables value={field.value} onChange={(next)=>updateField({ value: next })} temperatureF={tempF} />
          );
        }
        if (field.id === 'mvWithstand') {
          return (
            <MvDielectricWayTable value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'vlfWithstand') {
          return (
            <MvWithstandTable value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'mvTanDelta') {
          return (
            <MvTanDeltaTable value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'dielectricClosed') {
          return (
            <DielectricWithstandClosedTable value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'dielectricOpen') {
          return (
            <VfiSpecificTestsTable value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'contactorInsulation') {
          const tempF = (window as any).__REPORT_TEMP_F as number | undefined;
          return (
            <ContactorInsulationTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
              temperatureF={tempF}
            />
          );
        }
        if (field.id === 'vacuumBottleIntegrity') {
          return (
            <VacuumBottleIntegrityTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'reactorInsulation') {
          const tempF = (window as any).__REPORT_TEMP_F as number | undefined;
          return (
            <ReactorInsulationTables
              value={field.value}
              onChange={(next) => updateField({ value: next })}
              temperatureF={tempF}
            />
          );
        }
        if (field.id === 'dryTypeIr') {
          const tempF = (window as any).__REPORT_TEMP_F as number | undefined;
          return (
            <DryTypeIRTables
              value={field.value}
              onChange={(next) => updateField({ value: next })}
              temperatureF={tempF}
            />
          );
        }
        if (field.id === 'fuseResistance') {
          return (
            <FuseResistanceTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'atsInsulation') {
          const tempF = (window as any).__REPORT_TEMP_F as number | undefined;
          return (
            <AtsInsulationTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
              temperatureF={tempF}
            />
          );
        }
        if (field.id === 'atsContactResistance') {
          return (
            <AtsContactResistanceTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'deviceSettings') {
          return (
            <BreakerDeviceSettingsTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'breakerContactResistance' || field.id === 'breakerCrFound' || field.id === 'breakerCrLeft') {
          return (
            <BreakerContactResistanceTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'primaryInjection') {
          return (
            <PrimaryInjectionTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'secondaryInjection') {
          return (
            <SecondaryInjectionTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'panelboardBreakers') {
          return (
            <PanelboardSmallBreakerTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'busResistance') {
          return (<BusResistanceTable value={field.value} onChange={(next)=>updateField({ value: next })} />);
        }
        if (field.id === 'buswayIr') {
          const tempF = (window as any).__REPORT_TEMP_F as number | undefined;
          return (<BuswayInsulationTables value={field.value} onChange={(next)=>updateField({ value: next })} temperatureF={tempF} />);
        }
        if (field.id === 'panelboardIr') {
          return (
            <PanelboardIrTables value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'panelboardCr') {
          return (
            <PanelboardContactResistanceTable value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'insulationMeasured') {
          return (<SwitchgearIrMeasuredTable value={field.value} onChange={(next)=>updateField({ value: next })} />);
        }
        if (field.id === 'insulationCorrected') {
          return (<SwitchgearIrCorrectedTable value={field.value} onChange={(next)=>updateField({ value: next })} />);
        }
        if (field.id === 'switchgearContact') {
          return (<SwitchgearContactResistanceTable value={field.value} onChange={(next)=>updateField({ value: next })} />);
        }
        if (field.id === 'switchgearDielectric') {
          return (<SwitchgearDielectricTable value={field.value} onChange={(next)=>updateField({ value: next })} />);
        }
        if (field.id === 'switchRows') {
          return (
            <SwitchRowsTable value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'fuseRows') {
          return (
            <FuseRowsTable value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'testEquipment3') {
          return (
            <TestEquipmentUsed3
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'tmDeviceSettings') {
          return (
            <ThermalMagDeviceSettingsTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'tmPrimaryInjection') {
          return (
            <ThermalMagPrimaryInjectionTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'vtInsulation') {
          const tempF = (window as any).__REPORT_TEMP_F as number | undefined;
          return (
            <TransformerInsulationTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
              temperatureF={tempF}
            />
          );
        }
        if (field.id === 'turnsRatio') {
          return (
            <TurnsRatioTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'vtTurnsRatio') {
          return (
            <VtTurnsRatioTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'turnsRatioSmallDry') {
          return (
            <TurnsRatioSmallDryTable
              value={field.value}
              onChange={(next) => updateField({ value: next })}
            />
          );
        }
        if (field.id === 'wrPrimary') {
          return (
            <WindingResistanceTable title="Electrical Tests - Winding Resistance - Primary Side" value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'wrSecondary') {
          return (
            <WindingResistanceTable title="Electrical Tests - Winding Resistance - Secondary Side" value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'excitationTests') {
          return (
            <ExcitationTestsTable value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'powerFactorTests') {
          return (
            <PowerFactorTestsTable value={field.value} onChange={(next)=>updateField({ value: next })} />
          );
        }
        if (field.id === 'primaryInsulation' || field.id === 'secondaryInsulation') {
          const tempF = (window as any).__REPORT_TEMP_F as number | undefined;
          return (
            <InsulationTable
              label={field.id === 'primaryInsulation' ? 'Primary Winding - 1 min. Insulation Resistance to Ground' : 'Secondary Winding - 1 min. Insulation Resistance to Ground'}
              value={field.value || {}}
              onChange={(next) => updateField({ value: next })}
              temperatureF={tempF}
            />
          );
        }
        return null;
      
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-white">
      {!readOnlyMeta && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
            <input
              type="text"
              value={field.label}
              onChange={(e) => updateField({ label: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Field label"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={field.type}
              onChange={(e) => updateField({ type: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {FIELD_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={field.required || false}
                onChange={(e) => updateField({ required: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Required</span>
            </label>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
              title="Delete field"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}

      {!readOnlyMeta && field.type === 'select' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
          <div className="space-y-2">
            {(field.options || []).map((option, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateSelectOption(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Option text"
                />
                <button
                  onClick={() => removeSelectOption(index)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={addSelectOption}
              className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
            >
              <Plus size={16} />
              Add Option
            </button>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label || 'Value'}</label>
        {renderValueInput()}
      </div>
    </div>
  );
};