import { ReportSection } from '../types';

// Shared options derived from legacy app constants
// Fixed dropdowns as per existing codebase

const TEST_VOLTAGES = ['250V', '500V', '1000V', '2500V', '5000V'];

export const REPORT_TEMPLATES: Record<string, ReportSection[]> = {
  'PanelboardReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customerName', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: 68 },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: 0 },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        { id: 'vm-table', label: 'Visual and Mechanical Inspection', type: 'table', value: { rows: [
          { id: '7.1.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
          { id: '7.1.A.2', description: 'Inspect physical, electrical, and mechanical condition of cords and connectors.' },
          { id: '7.1.A.3', description: 'Inspect anchorage, alignment, grounding, and required area clearances.' },
          { id: '7.1.A.4', description: 'Verify the unit is clean and all shipping bracing removed.' },
          { id: '7.1.A.5', description: 'Verify that fuse and circuit breaker sizes and types correspond to drawings and coordination study.' },
          { id: '7.1.A.6', description: 'Verify that current and voltage transformer ratios correspond to drawings.' },
          { id: '7.1.A.7', description: 'Verify wiring connections are tight and secure to prevent damage.' },
          { id: '7.1.A.8.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.1.B.1.' },
          { id: '7.1.A.9', description: 'Confirm correct operation and sequencing of interlock systems.' },
          { id: '7.1.A.10', description: 'Verify appropriate lubrication on moving parts.' },
          { id: '7.1.A.11', description: 'Inspect insulators for evidence of physical damage or contaminated surfaces.' },
          { id: '7.1.A.12', description: 'Verify correct barrier and shutter installation and operation.' },
          { id: '7.1.A.13', description: 'Exercise all active components.' },
          { id: '7.1.A.14', description: 'Inspect mechanical indicating devices for correct operation.' },
          { id: '7.1.A.15', description: 'Verify that filters are in place and vents are clear.' },
        ] } },
      ],
    },
    {
      id: 'insulation-resistance',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'panelboardIr', label: 'Insulation Resistance (Measured & Temp Corrected)', type: 'table', value: {} },
      ],
    },
    {
      id: 'contact-resistance',
      title: 'Contact Resistance',
      fields: [
        { id: 'panelboardCr', label: 'Contact Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'TwoSmallDryTypeXfmrATSReport.tsx': [
    { id: 'job-info', title: 'Job Information', fields: [
      { id: 'customer', label: 'Customer', type: 'text', value: '' },
      { id: 'address', label: 'Address', type: 'text', value: '' },
      { id: 'jobNumber', label: 'Job Number', type: 'text', value: '' },
      { id: 'date', label: 'Date', type: 'date', value: '' },
      { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
      { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
      { id: 'user', label: 'User', type: 'text', value: '' },
      { id: 'temperatureF', label: 'Temp. (°F)', type: 'number', value: 68 },
      { id: 'humidity', label: 'Humidity (%)', type: 'number', value: 50 },
      { id: 'substation', label: 'Substation', type: 'text', value: '' },
      { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
    ]},
    { id: 'nameplate', title: 'Nameplate Data', fields: [
      { id: 'dry-nameplate', label: 'Nameplate Data', type: 'table', value: {} },
    ]},
    { id: 'visual-mechanical', title: 'Visual and Mechanical Inspection', fields: [
      { id: 'vm-table', label: 'Visual and Mechanical Inspection', type: 'table', value: { rows: [
        { id: '7.2.11.A.1', description: 'Inspect physical and mechanical condition.' },
        { id: '7.2.11.A.2', description: 'Inspect anchorage, alignment, and grounding.' },
        { id: '7.2.11.A.3', description: '*Prior to cleaning the unit, perform as-found tests.' },
        { id: '7.2.11.A.4', description: 'Clean the unit.' },
        { id: '7.2.11.A.5', description: 'Inspect bolted electrical connections for high resistance using a low-resistance ohmmeter' },
        { id: '7.2.11.A.6.1', description: 'Perform as-left tests.' },
        { id: '7.2.11.A.7', description: 'Verify that as-left tap connections are as specified.' },
      ] } },
    ]},
    { id: 'electrical-tests-ir', title: 'Electrical Tests - Measured Insulation Resistance', fields: [
      { id: 'dryTypeIr', label: 'Insulation Resistance', type: 'table', value: {} },
    ]},
    { id: 'electrical-tests-ttr', title: 'Electrical Tests - Turns Ratio', fields: [
      { id: 'turnsRatioSmallDry', label: 'Turns Ratio', type: 'table', value: {} },
    ]},
    { id: 'test-equipment', title: 'Test Equipment Used', fields: [
      { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
    ]},
    { id: 'comments', title: 'Comments', fields: [
      { id: 'comments', label: 'Comments', type: 'textarea', value: '' },
    ]},
  ],
  'TwoSmallDryTypeXfmrMTSReport.tsx': [
    { id: 'job-info', title: 'Job Information', fields: [
      { id: 'customer', label: 'Customer', type: 'text', value: '' },
      { id: 'address', label: 'Address', type: 'text', value: '' },
      { id: 'jobNumber', label: 'Job Number', type: 'text', value: '' },
      { id: 'date', label: 'Date', type: 'date', value: '' },
      { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
      { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
      { id: 'user', label: 'User', type: 'text', value: '' },
      { id: 'temperatureF', label: 'Temp. (°F)', type: 'number', value: 68 },
      { id: 'humidity', label: 'Humidity (%)', type: 'number', value: 50 },
      { id: 'substation', label: 'Substation', type: 'text', value: '' },
      { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
    ]},
    { id: 'nameplate', title: 'Nameplate Data', fields: [
      { id: 'dry-nameplate', label: 'Nameplate Data', type: 'table', value: {} },
    ]},
    { id: 'visual-mechanical', title: 'Visual and Mechanical Inspection', fields: [
      { id: 'vm-table', label: 'Visual and Mechanical Inspection', type: 'table', value: { rows: [
        { id: '7.2.11.A.1', description: 'Inspect physical and mechanical condition.' },
        { id: '7.2.11.A.2', description: 'Inspect anchorage, alignment, and grounding.' },
        { id: '7.2.11.A.3', description: '*Prior to cleaning the unit, perform as-found tests.' },
        { id: '7.2.11.A.4', description: 'Clean the unit.' },
        { id: '7.2.11.A.5', description: 'Inspect bolted electrical connections for high resistance using a low-resistance ohmmeter' },
        { id: '7.2.11.A.6.1', description: 'Perform as-left tests.' },
        { id: '7.2.11.A.7', description: 'Verify that as-left tap connections are as specified.' },
      ] } },
    ]},
    { id: 'electrical-tests-ir', title: 'Electrical Tests - Measured Insulation Resistance', fields: [
      { id: 'dryTypeIr', label: 'Insulation Resistance', type: 'table', value: {} },
    ]},
    { id: 'electrical-tests-ttr', title: 'Electrical Tests - Turns Ratio', fields: [
      { id: 'turnsRatioSmallDry', label: 'Turns Ratio', type: 'table', value: {} },
    ]},
    { id: 'test-equipment', title: 'Test Equipment Used', fields: [
      { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
    ]},
    { id: 'comments', title: 'Comments', fields: [
      { id: 'comments', label: 'Comments', type: 'textarea', value: '' },
    ]},
  ],
  'SwitchgearPanelboardMTSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: 68 },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'humidity', label: 'Humidity %', type: 'number', value: 50 },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'catalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'series', label: 'Series', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'systemVoltage', label: 'System Voltage', type: 'text', value: '' },
        { id: 'ratedVoltage', label: 'Rated Voltage', type: 'text', value: '' },
        { id: 'ratedCurrent', label: 'Rated Current', type: 'text', value: '' },
        { id: 'aicRating', label: 'AIC Rating', type: 'text', value: '' },
        { id: 'phaseConfiguration', label: 'Phase Configuration', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        { id: 'vm-table', label: 'Visual and Mechanical Inspection', type: 'table', value: { rows: [
          { id: '7.1.A.1', description: 'Inspect physical, electrical, and mechanical condition.' },
          { id: '7.1.A.2', description: 'Inspect anchorage, alignment, grounding, and required area clearances.' },
          { id: '7.1.A.3', description: 'Prior to cleaning the unit, perform as-found tests.' },
          { id: '7.1.A.4', description: 'Clean the unit.' },
          { id: '7.1.A.5', description: 'Verify that fuse and/or circuit breaker sizes and types correspond to drawings and coordination study as well as to the circuit breaker address for microprocessorcommunication packages.' },
          { id: '7.1.A.6', description: 'Verify that current and voltage transformer ratios correspond to drawings.' },
          { id: '7.1.A.7', description: 'Verify that wiring connections are tight and that wiring is secure to prevent damage during routine operation of moving parts.' },
          { id: '7.1.A.8.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.1.B.1.' },
          { id: '7.1.A.9', description: 'Confirm correct operation and sequencing of electrical and mechanical interlock systems.' },
          { id: '7.1.A.10', description: 'Use appropriate lubrication on moving current-carrying parts and on moving and sliding surfaces.' },
          { id: '7.1.A.11', description: 'Inspect insulators for evidence of physical damage or contaminated surfaces.' },
          { id: '7.1.A.12', description: 'Verify correct barrier and shutter installation and operation.' },
          { id: '7.1.A.13', description: 'Exercise all active components.' },
          { id: '7.1.A.14', description: 'Inspect mechanical indicating devices for correct operation.' },
          { id: '7.1.A.15', description: 'Verify that filters are in place, filters are clean and free from debris, and vents are clear' },
        ] } },
      ],
    },
    {
      id: 'ir-measured',
      title: 'Electrical Tests - Measured Insulation Resistance Values',
      fields: [
        { id: 'insulationMeasured', label: 'Measured Insulation Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'ir-corrected',
      title: 'Temperature Corrected Values',
      fields: [
        { id: 'insulationCorrected', label: 'Temperature Corrected', type: 'table', value: {} },
      ],
    },
    {
      id: 'contact-resistance',
      title: 'Contact Resistance',
      fields: [
        { id: 'switchgearContact', label: 'Contact Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'dielectric',
      title: 'Dielectric Withstand',
      fields: [
        { id: 'switchgearDielectric', label: 'Dielectric Withstand', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'SwitchgearReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: 68 },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'humidity', label: 'Humidity %', type: 'number', value: 0 },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'catalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'systemVoltage', label: 'System Voltage', type: 'text', value: '' },
        { id: 'ratedVoltage', label: 'Rated Voltage', type: 'text', value: '' },
        { id: 'ratedCurrent', label: 'Rated Current', type: 'text', value: '' },
        { id: 'phaseConfiguration', label: 'Phase Configuration', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        { id: 'vm-table', label: 'Visual and Mechanical Inspection', type: 'table', value: { rows: [
          { id: '7.1.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
          { id: '7.1.A.2', description: 'Inspect physical, electrical, and mechanical condition of cords and connectors.' },
          { id: '7.1.A.3', description: 'Inspect anchorage, alignment, grounding, and required area clearances.' },
          { id: '7.1.A.4', description: 'Verify the unit is clean and all shipping bracing, loose parts, and documentation shipped inside cubicles have been removed.' },
          { id: '7.1.A.5', description: 'Verify that fuse and circuit breaker sizes and types correspond to drawings and coordination study as well as to the circuit breaker address for microprocessor-communication packages.' },
          { id: '7.1.A.6', description: 'Verify that current and voltage transformer ratios correspond to drawings.' },
          { id: '7.1.A.7', description: 'Verify that wiring connections are tight and that wiring is secure to prevent damage during routine operation of moving parts.' },
          { id: '7.1.A.8.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.1.B.1.' },
          { id: '7.1.A.9', description: 'Confirm correct operation and sequencing of electrical and mechanical interlock systems.' },
          { id: '7.1.A.10', description: 'Verify appropriate lubrication on moving current-carrying parts and on moving and sliding surfaces.' },
          { id: '7.1.A.11', description: 'Inspect insulators for evidence of physical damage or contaminated surfaces.' },
          { id: '7.1.A.12', description: 'Verify correct barrier and shutter installation and operation.' },
          { id: '7.1.A.13', description: 'Exercise all active components.' },
          { id: '7.1.A.14', description: 'Inspect mechanical indicating devices for correct operation.' },
          { id: '7.1.A.15', description: 'Verify that filters are in place and vents are clear.' },
        ] } },
      ],
    },
    {
      id: 'ir-measured',
      title: 'Electrical Tests - Measured Insulation Resistance Values',
      fields: [
        { id: 'insulationMeasured', label: 'Measured Insulation Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'ir-corrected',
      title: 'Temperature Corrected Values',
      fields: [
        { id: 'insulationCorrected', label: 'Temperature Corrected', type: 'table', value: {} },
      ],
    },
    {
      id: 'contact-resistance',
      title: 'Contact Resistance',
      fields: [
        { id: 'switchgearContact', label: 'Contact Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'dielectric',
      title: 'Dielectric Withstand',
      fields: [
        { id: 'switchgearDielectric', label: 'Dielectric Withstand', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'TanDeltaATS.tsx': [
    {
      id: 'tan-delta-data',
      title: 'Tan Delta Test Data',
      fields: [
        { id: 'mvTanDelta', label: 'Tan Delta', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
      ],
    },
  ],
  'TanDeltaChartMTS.tsx': [
    {
      id: 'tan-delta-data',
      title: 'Tan Delta Test Data',
      fields: [
        { id: 'mvTanDelta', label: 'Tan Delta', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
      ],
    },
  ],
  'TanDeltaTestMTSForm.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: 68 },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: 50 },
      ],
    },
    {
      id: 'cable-termination',
      title: 'Cable & Termination Data',
      fields: [
        { id: 'testedFrom', label: 'Tested From', type: 'text', value: '' },
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'cableRatedVoltage', label: 'Cable Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'cableType', label: 'Cable Type', type: 'text', value: '' },
        { id: 'lengthFt', label: 'Length (ft)', type: 'text', value: '' },
        { id: 'conductorSize', label: 'Conductor Size', type: 'text', value: '' },
        { id: 'insulationType', label: 'Insulation Type', type: 'text', value: '' },
        { id: 'conductorMaterial', label: 'Conductor Material', type: 'text', value: '' },
        { id: 'insulationThickness', label: 'Insulation Thickness', type: 'text', value: '' },
        { id: 'from', label: 'From', type: 'text', value: '' },
        { id: 'to', label: 'To', type: 'text', value: '' },
        { id: 'terminationData1', label: 'Termination Data', type: 'text', value: '' },
        { id: 'terminationRatedVoltage1', label: 'Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'terminationData2', label: 'Termination Data', type: 'text', value: '' },
        { id: 'terminationRatedVoltage2', label: 'Rated Voltage (kV)', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: '7.3.3.A Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.3.3.A.1', description: 'Compare cable data with drawings and specifications.' },
              { id: '7.3.3.A.2', description: 'Inspect exposed sections of cables for physical damage.' },
              { id: '7.3.3.A.3.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.3.3.B.1.' },
              { id: '7.3.3.A.4', description: 'Inspect shield grounding, cable supports, and terminations.' },
              { id: '7.3.3.A.5', description: 'Verify that visible cable bends meet or exceed ICEA and manufacturer\'s minimum published bending radius.' },
              { id: '7.3.3.A.7', description: 'If cables are terminated through window-type current transformers, inspect to verify that neutral and ground conductors are correctly placed and that shields are correctly terminated for operation of protective devices.' },
            ],
          },
        },
      ],
    },
    {
      id: 'shield-continuity',
      title: 'Electrical Tests - Shield Continuity',
      fields: [
        { id: 'mvShieldContinuity', label: 'Shield Continuity', type: 'table', value: {} },
      ],
    },
    {
      id: 'insulation-pre-post',
      title: 'Electrical Tests - Insulation Resistance (Pre/Post)',
      fields: [
        { id: 'mvIrPrePost', label: 'Insulation Resistance (Measured and Corrected)', type: 'table', value: {} },
      ],
    },
    {
      id: 'withstand',
      title: 'Electrical Tests - Withstand Test',
      fields: [
        { id: 'vlfWithstand', label: 'Withstand Test', type: 'table', value: {} },
      ],
    },
    {
      id: 'tan-delta',
      title: 'Tan Delta (Power Factor) Test',
      fields: [
        { id: 'mvTanDelta', label: 'Tan Delta', type: 'table', value: {} },
      ],
    },
    {
      id: 'tan-delta-result',
      title: 'Tan Delta Test Result',
      fields: [
        { id: 'tanDeltaResult', label: 'Result', type: 'select', value: '', options: ['Select Result','PASS','FAIL'] },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-results',
      title: 'Test Results & Recommendations',
      fields: [
        { id: 'conclusion', label: 'Conclusion', type: 'textarea', value: '' },
        { id: 'recommendations', label: 'Recommendations', type: 'textarea', value: '' },
        { id: 'additionalComments', label: 'Additional Comments', type: 'textarea', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  '3-LowVoltageCableMTS.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temperature (°F)', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Equipment Location', type: 'text', value: '' },
      ],
    },
    {
      id: 'cable-data',
      title: 'Cable Data',
      fields: [
        { id: 'testedFrom', label: 'Tested From', type: 'text', value: '' },
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'conductorMaterial', label: 'Conductor Material', type: 'text', value: '' },
        { id: 'insulationType', label: 'Insulation Type', type: 'text', value: '' },
        { id: 'systemVoltage', label: 'System Voltage', type: 'text', value: '' },
        { id: 'ratedVoltage', label: 'Rated Voltage', type: 'text', value: '' },
        { id: 'length', label: 'Length', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      notes: undefined,
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            // This will be consumed by a custom renderer in the FieldRow if needed later
            rows: [
              { id: '7.3.1.A.1', description: 'Inspect exposed sections of cables and connectors for physical damage and evidence of degradation.' },
              { id: '7.3.1.A.2.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.3.3.B.1.' },
              { id: '7.3.1.A.3', description: 'Inspect cable tray and cable supports.' },
              { id: '7.3.1.A.4', description: 'If cables are terminated through window-type current transformers, inspect to verify that neutral and ground conductors are correctly placed for operation of protective devices.' },
              { id: '7.3.1.A.5*', description: 'Compare cable data with drawings and cable schedule. *Optional' },
            ]
          }
        }
      ],
    },
    {
      id: 'electrical-tests',
      title: 'Electrical Tests',
      notes: undefined,
      fields: [
        { id: 'numberOfCables', label: 'Number of Cables', type: 'number', value: 12 },
        { id: 'testVoltage', label: 'Test Voltage', type: 'select', options: TEST_VOLTAGES, value: '1000V' },
        {
          id: 'electricalGrid',
          label: '1 Min. Insulation Resistance in MΩ',
          type: 'table',
          value: { rows: [] }
        },
        { id: 'notes', label: 'Notes', type: 'textarea', value: '' },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ampId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [{ id: 'comments', label: 'Comments', type: 'textarea', value: '' }],
    },
  ],
  'MediumVoltageCircuitBreakerMTSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'icRating', label: 'I.C. Rating (kA)', type: 'text', value: '' },
        { id: 'catalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'ratedVoltage', label: 'Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'operatingVoltage', label: 'Operating Voltage (kV)', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'ampacity', label: 'Ampacity (A)', type: 'text', value: '' },
        { id: 'manufacturingDate', label: 'Manufacturing Date', type: 'text', value: '' },
        { id: 'mvaRating', label: 'MVA Rating', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        { id: 'vm-table', label: 'Visual and Mechanical Inspection', type: 'table', value: { rows: [
          { id: '7.6.3.A.1', description: 'Inspect physical and mechanical condition' },
          { id: '7.6.3.A.2', description: 'Inspect anchorage, alignment, and grounding.' },
          { id: '7.6.3.A.3', description: 'Verify that all maintenance devices are available for servicing and operating the breaker.' },
          { id: '7.6.3.A.6', description: 'Clean the unit.' },
          { id: '7.6.3.A.7', description: 'Inspect vacuum bottle assemblies.' },
          { id: '7.6.3.A.8', description: 'Measure critical distances such as contact gap as recommended by the manufacturer.' },
          { id: '7.6.3.A.9', description: 'If recommended by the manufacturer, slow close/open the breaker and check for binding, friction, contact alignment, contact sequence, and penetration.' },
          { id: '7.6.3.A.10', description: 'Perform all mechanical maintenance and tests on the operating mechanism in accordance with manufacturer\'s published data.' },
          { id: '7.6.3.A.11.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.6.3.B.1.' },
          { id: '7.6.3.A.12', description: 'Verify cell fit and element alignment' },
          { id: '7.6.3.A.13', description: 'Verify racking mechanism operation.' },
          { id: '7.6.3.A.14', description: 'Inspect vacuum bellows operation.' },
          { id: '7.6.3.A.15', description: 'Use appropriate lubrication on moving current-carrying parts and on moving and sliding surfaces.' },
        ] } },
        { id: 'counterReadingAsFound', label: 'Counter Reading As Found', type: 'text', value: '' },
        { id: 'counterReadingAsLeft', label: 'Counter Reading As Left', type: 'text', value: '' },
        { id: 'eGap', label: 'E-Gap', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-contact',
      title: 'Electrical Tests - Contact/Pole Resistance',
      fields: [
        { id: 'breakerCrFound', label: 'Contact Resistance (As Found)', type: 'table', value: {} },
        { id: 'breakerCrLeft', label: 'Contact Resistance (As Left)', type: 'table', value: {} }
      ],
    },
    {
      id: 'electrical-tests-insulation',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [ { id: 'contactorInsulation', label: 'Insulation Resistance / Temperature Corrected', type: 'table', value: {} } ],
    },
    {
      id: 'dielectric',
      title: 'Electrical Tests - Dielectric Withstand',
      fields: [
        { id: 'dielectricClosed', label: 'Dielectric Withstand (Closed)', type: 'table', value: {} },
        { id: 'dielectricOpen', label: 'Vacuum Bottle Integrity (Open)', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'megohmmeterSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'megohmmeterAmpId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'lro', label: 'Low Resistance Ohmmeter', type: 'text', value: '' },
        { id: 'lroSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'lroAmpId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'hipot', label: 'Hipot', type: 'text', value: '' },
        { id: 'hipotSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'hipotAmpId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'MediumVoltageCircuitBreakerReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'icRating', label: 'I.C. Rating (kA)', type: 'text', value: '' },
        { id: 'catalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'ratedVoltage', label: 'Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'operatingVoltage', label: 'Operating Voltage (kV)', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'ampacity', label: 'Ampacity (A)', type: 'text', value: '' },
        { id: 'manufacturingDate', label: 'Manufacturing Date', type: 'text', value: '' },
        { id: 'mvaRating', label: 'MVA Rating', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        { id: 'vm-table', label: 'Visual and Mechanical Inspection', type: 'table', value: { rows: [
          { id: '7.6.3.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
          { id: '7.6.3.A.2', description: 'Inspect physical and mechanical condition.' },
          { id: '7.6.3.A.3', description: 'Inspect anchorage, alignment, and grounding.' },
          { id: '7.6.3.A.4', description: 'Verify that all maintenance devices such as special tools and gauges specified by the manufacturer are available for servicing and operating the breaker.' },
          { id: '7.6.3.A.5', description: 'Verify the unit is clean.' },
          { id: '7.6.3.A.6', description: 'Perform all mechanical operation tests on the operating mechanism in accordance with manufacturer\'s published data.' },
          { id: '7.6.3.A.7', description: 'Measure critical distances such as contact gap as recommended by manufacturer.' },
          { id: '7.6.3.A.8.1', description: 'Use of low-resistance ohmmeter in accordance with Section 7.6.3.B.1.' },
          { id: '7.6.3.A.9', description: 'Verify cell fit and element alignment.' },
          { id: '7.6.3.A.10', description: 'Verify racking mechanism operation.' },
          { id: '7.6.3.A.11', description: 'Verify appropriate lubrication on moving, current-carrying parts and on moving and sliding surfaces.' }
        ] } },
        { id: 'counterReadingAsFound', label: 'Counter Reading As Found', type: 'text', value: '' },
        { id: 'counterReadingAsLeft', label: 'Counter Reading As Left', type: 'text', value: '' },
        { id: 'eGap', label: 'E-Gap', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-contact',
      title: 'Electrical Tests - Contact/Pole Resistance',
      fields: [
        { id: 'breakerCrFound', label: 'Contact Resistance (As Found)', type: 'table', value: {} },
        { id: 'breakerCrLeft', label: 'Contact Resistance (As Left)', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-insulation',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [ { id: 'contactorInsulation', label: 'Insulation Resistance / Temperature Corrected', type: 'table', value: {} } ],
    },
    {
      id: 'dielectric',
      title: 'Electrical Tests - Dielectric Withstand',
      fields: [
        { id: 'dielectricClosed', label: 'Dielectric Withstand (Closed)', type: 'table', value: {} },
        { id: 'dielectricOpen', label: 'Vacuum Bottle Integrity (Open)', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'megohmmeterSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'megohmmeterAmpId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'lro', label: 'Low Resistance Ohmmeter', type: 'text', value: '' },
        { id: 'lroSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'lroAmpId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'hipot', label: 'Hipot', type: 'text', value: '' },
        { id: 'hipotSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'hipotAmpId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'MediumVoltageSwitchOilReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temperature (°F)', type: 'number', value: 68 },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: 50 },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'systemVoltage', label: 'System Voltage (kV)', type: 'text', value: '' },
        { id: 'catalogNumber', label: 'Catalog No.', type: 'text', value: '' },
        { id: 'ratedVoltage', label: 'Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ratedCurrent', label: 'Rated Current (A)', type: 'text', value: '' },
        { id: 'dateOfMfg', label: 'Date of Mfg.', type: 'text', value: '' },
        { id: 'aicRating', label: 'AIC Rating (kA)', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'impulseLevelBIL', label: 'Impulse Level (BIL)', type: 'text', value: '' },
      ],
    },
    {
      id: 'vfi-data',
      title: 'VFI Data',
      fields: [
        { id: 'vfiManufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'vfiRatedVoltage', label: 'Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'vfiCatalogNo', label: 'Catalog No.', type: 'text', value: '' },
        { id: 'vfiRatedCurrent', label: 'Rated Current (A)', type: 'text', value: '' },
        { id: 'vfiType', label: 'Type', type: 'text', value: '' },
        { id: 'vfiAicRating', label: 'AIC Rating (kA)', type: 'text', value: '' },
      ],
    },
    {
      id: 'electrical-tests-insulation',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'mvSwitchIr', label: 'Measured & Temperature Corrected', type: 'table', value: {} },
      ],
    },
    {
      id: 'contact-resistance',
      title: 'Contact Resistance μΩ',
      fields: [
        { id: 'mvSwitchCr', label: 'Contact Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'dielectric',
      title: 'Electrical Tests - Dielectric Withstand',
      fields: [
        { id: 'mvWithstand', label: 'Dielectric Withstand', type: 'table', value: {} },
      ],
    },
    {
      id: 'dielectric-vfi',
      title: 'Electrical Tests - Dielectric Withstand - VFI specific tests',
      fields: [
        { id: 'dielectricOpen', label: 'VFI Specific Tests', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [
        { id: 'comments', label: 'Comments', type: 'textarea', value: '' },
      ],
    },
  ],
  'OilInspectionReport.tsx': [
    { id: 'job-info', title: 'Job Information', fields: [
      { id: 'customer', label: 'Customer', type: 'text', value: '' },
      { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
      { id: 'address', label: 'Address', type: 'text', value: '' },
      { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
      { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
      { id: 'substation', label: 'Substation', type: 'text', value: '' },
      { id: 'date', label: 'Date', type: 'date', value: '' },
      { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
      { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: 68 },
      { id: 'humidity', label: 'Humidity (%)', type: 'number', value: 50 },
    ]},
    { id: 'nameplate', title: 'Nameplate Data', fields: [
      { id: 'dry-nameplate', label: 'Nameplate Data', type: 'table', value: {} },
    ]},
    { id: 'visual-mechanical', title: 'Visual and Mechanical Inspection', fields: [
      { id: 'vm-table', label: 'Visual and Mechanical Inspection', type: 'table', value: { rows: [
        { id: '7.2.1.2.A.1', description: 'Verify physical and mechanical condition.' },
        { id: '7.2.1.2.A.2', description: 'Verify anchorage, alignment, and grounding.' },
        { id: '7.2.1.2.A.3*', description: 'Examine bolted electrical connections.' },
        { id: '7.2.1.2.A.4', description: 'Verify cleanliness.' },
        { id: '7.2.1.2.A.5*', description: 'Verify electrical and mechanical interlocks.' },
        { id: '7.2.1.2.A.6', description: 'Inspect wiring and connections.' },
        { id: '7.2.1.2.A.7', description: 'Inspect control devices.' },
        { id: '7.2.1.2.A.8', description: 'Inspect auxiliary devices.' },
        { id: '7.2.1.2.A.9', description: 'Verify space heaters.' },
        { id: '7.2.1.2.A.10', description: 'Verify enclosure and nameplates.' },
        { id: '7.2.1.2.A.11', description: 'Inspect insulation, wiring, and terminations.' },
      ] } },
    ]},
    { id: 'ir', title: 'Electrical Tests - Insulation Resistance', fields: [
      { id: 'dryTypeIr', label: 'Insulation Resistance (Measured & Temp Corrected)', type: 'table', value: {} },
    ]},
    { id: 'ttr', title: 'Turns Ratio Tests (TTR)', fields: [
      { id: 'turnsRatio', label: 'Turns Ratio', type: 'table', value: {} },
    ]},
    { id: 'wr-primary', title: 'Electrical Tests - Winding Resistance - Primary Side', fields: [
      { id: 'wrPrimary', label: 'Winding Resistance - Primary', type: 'table', value: {} },
    ]},
    { id: 'wr-secondary', title: 'Electrical Tests - Winding Resistance - Secondary Side', fields: [
      { id: 'wrSecondary', label: 'Winding Resistance - Secondary', type: 'table', value: {} },
    ]},
    { id: 'excitation', title: 'Excitation Tests', fields: [
      { id: 'excitationTests', label: 'Excitation Tests', type: 'table', value: {} },
    ]},
    { id: 'power-factor', title: 'Power Factor Tests', fields: [
      { id: 'powerFactorTests', label: 'Power Factor Tests', type: 'table', value: {} },
    ]},
    { id: 'test-equipment', title: 'Test Equipment Used', fields: [
      { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
    ]},
    { id: 'comments', title: 'Comments', fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ]},
  ],
  'MediumVoltageCableVLFMTSTestReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: 68 },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: 50 },
      ],
    },
    {
      id: 'cable-termination',
      title: 'Cable & Termination Data',
      fields: [
        { id: 'testedFrom', label: 'Tested From', type: 'text', value: '' },
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'cableRatedVoltage', label: 'Cable Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'cableType', label: 'Cable Type', type: 'text', value: '' },
        { id: 'lengthFt', label: 'Length (ft)', type: 'text', value: '' },
        { id: 'conductorSize', label: 'Conductor Size', type: 'text', value: '' },
        { id: 'insulationType', label: 'Insulation Type', type: 'text', value: '' },
        { id: 'conductorMaterial', label: 'Conductor Material', type: 'text', value: '' },
        { id: 'insulationThickness', label: 'Insulation Thickness', type: 'text', value: '' },
        { id: 'from', label: 'From', type: 'text', value: '' },
        { id: 'to', label: 'To', type: 'text', value: '' },
        { id: 'terminationData1', label: 'Termination Data', type: 'text', value: '' },
        { id: 'terminationRatedVoltage1', label: 'Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'terminationData2', label: 'Termination Data', type: 'text', value: '' },
        { id: 'terminationRatedVoltage2', label: 'Rated Voltage (kV)', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: '7.3.3.A Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.3.3.A.1', description: 'Compare cable data with drawings and specifications.' },
              { id: '7.3.3.A.2', description: 'Inspect exposed sections of cables for physical damage.' },
              { id: '7.3.3.A.3.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.3.3.B.1.' },
              { id: '7.3.3.A.4', description: 'Inspect shield grounding, cable supports, and terminations.' },
              { id: '7.3.3.A.5', description: 'Verify that visible cable bends meet or exceed ICEA and manufacturer\'s minimum published bending radius.' },
              { id: '7.3.3.A.7', description: 'If cables are terminated through window-type current transformers, inspect to verify that neutral and ground conductors are correctly placed and that shields are correctly terminated for operation of protective devices.' },
            ],
          },
        },
      ],
    },
    {
      id: 'shield-continuity',
      title: 'Electrical Tests - Shield Continuity',
      fields: [
        { id: 'mvShieldContinuity', label: 'Shield Continuity', type: 'table', value: {} },
      ],
    },
    {
      id: 'insulation-pre-post',
      title: 'Electrical Tests - Insulation Resistance (Pre/Post)',
      fields: [
        { id: 'mvIrPrePost', label: 'Insulation Resistance (Measured and Corrected)', type: 'table', value: {} },
      ],
    },
    {
      id: 'withstand',
      title: 'Electrical Tests - Withstand Test',
      fields: [
        { id: 'vlfWithstand', label: 'Withstand Test', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [ { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} } ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'MediumVoltageCableVLFATSTest.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: 68 },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: 50 },
      ],
    },
    {
      id: 'cable-termination',
      title: 'Cable & Termination Data',
      fields: [
        { id: 'testedFrom', label: 'Tested From', type: 'text', value: '' },
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'cableRatedVoltage', label: 'Cable Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'cableType', label: 'Cable Type', type: 'text', value: '' },
        { id: 'lengthFt', label: 'Length (ft)', type: 'text', value: '' },
        { id: 'conductorSize', label: 'Conductor Size', type: 'text', value: '' },
        { id: 'insulationType', label: 'Insulation Type', type: 'text', value: '' },
        { id: 'conductorMaterial', label: 'Conductor Material', type: 'text', value: '' },
        { id: 'insulationThickness', label: 'Insulation Thickness', type: 'text', value: '' },
        { id: 'from', label: 'From', type: 'text', value: '' },
        { id: 'to', label: 'To', type: 'text', value: '' },
        { id: 'terminationData1', label: 'Termination Data', type: 'text', value: '' },
        { id: 'terminationRatedVoltage1', label: 'Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'terminationData2', label: 'Termination Data', type: 'text', value: '' },
        { id: 'terminationRatedVoltage2', label: 'Rated Voltage (kV)', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: '7.3.3.A Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.3.3.A.1', description: 'Compare cable data with drawings and specifications.' },
              { id: '7.3.3.A.2', description: 'Inspect exposed sections of cables for physical damage.' },
              { id: '7.3.3.A.3.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.3.3.B.1.' },
              { id: '7.3.3.A.4', description: 'Inspect compression-applied connectors for correct cable match and indentation.' },
              { id: '7.3.3.A.5', description: 'Inspect shield grounding, cable supports, and terminations.' },
              { id: '7.3.3.A.6', description: 'Verify that visible cable bends meet or exceed ICEA and manufacturer\'s minimum published bending radius.' },
              { id: '7.3.3.A.8', description: 'If cables are terminated through window-type current transformers, inspect to verify that neutral and ground conductors are correctly placed and that shields are correctly terminated for operation of protective devices.' },
              { id: '7.3.3.A.9', description: 'Inspect for correct identification and arrangements.' },
              { id: '7.3.3.A.10', description: 'Inspect cable jacket and insulation condition.' },
            ],
          },
        },
      ],
    },
    {
      id: 'shield-continuity',
      title: 'Electrical Tests - Shield Continuity',
      fields: [
        { id: 'mvShieldContinuity', label: 'Shield Continuity', type: 'table', value: {} },
      ],
    },
    {
      id: 'insulation-pre-post',
      title: 'Electrical Tests - Insulation Resistance (Pre/Post)',
      fields: [
        { id: 'mvIrPrePost', label: 'Insulation Resistance (Measured and Corrected)', type: 'table', value: {} },
      ],
    },
    {
      id: 'withstand',
      title: 'Electrical Tests - Withstand Test',
      fields: [
        { id: 'vlfWithstand', label: 'Withstand Test', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [ { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} } ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'MetalEnclosedBuswayReport.tsx': [
    { id: 'job-info', title: 'Job Information', fields: [
      { id: 'customer', label: 'Customer', type: 'text', value: '' },
      { id: 'address', label: 'Address', type: 'text', value: '' },
      { id: 'user', label: 'User', type: 'text', value: '' },
      { id: 'date', label: 'Date', type: 'date', value: '' },
      { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
      { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
      { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
      { id: 'substation', label: 'Substation', type: 'text', value: '' },
      { id: 'eqptLocation', label: 'Equipment', type: 'text', value: '' },
      { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: 68 },
      { id: 'humidity', label: 'Humidity (%)', type: 'number', value: 0 },
    ]},
    { id: 'nameplate', title: 'Nameplate Data', fields: [
      { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
      { id: 'catalogNumber', label: 'Catalog Number', type: 'text', value: '' },
      { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
      { id: 'fedFrom', label: 'Fed From', type: 'text', value: '' },
      { id: 'conductorMaterial', label: 'Conductor Material', type: 'text', value: '' },
      { id: 'ratedVoltage', label: 'Rated Voltage (kV)', type: 'text', value: '' },
      { id: 'operatingVoltage', label: 'Operating Voltage (kV)', type: 'text', value: '' },
      { id: 'ampacity', label: 'Ampacity (A)', type: 'text', value: '' },
    ]},
    { id: 'visual-mechanical', title: 'Visual and Mechanical Inspection', fields: [
      { id: 'vm-table', label: 'Visual and Mechanical Inspection', type: 'table', value: { rows: [
        { id: '7.4.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
        { id: '7.4.A.2', description: 'Inspect physical and mechanical condition.' },
        { id: '7.4.A.3', description: 'Inspect anchorage, alignment, and grounding.' },
        { id: '7.4.A.4', description: 'Verify correct connection in accordance with single-line diagram.' },
        { id: '7.4.A.5.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.4.B.' },
        { id: '7.4.A.6', description: 'Confirm physical orientation in accordance with manufacturer\'s labels to insure adequate cooling.' },
        { id: '7.4.A.7', description: 'Verify "weep-hole" plugs are in accordance with manufacturer\'s published data.' },
        { id: '7.4.A.8', description: 'Verify correct installation of joint shield.' },
        { id: '7.4.A.9', description: 'Verify ventilating openings are clean.' },
      ] } },
    ]},
    { id: 'bus-resistance', title: 'Electrical Tests - Contact/Pole Resistance', fields: [
      { id: 'busResistance', label: 'Bus Resistance', type: 'table', value: {} },
    ]},
    { id: 'insulation', title: 'Electrical Tests - Insulation Resistance', fields: [
      { id: 'buswayIr', label: 'Insulation Resistance', type: 'table', value: {} },
    ]},
    { id: 'test-equipment', title: 'Test Equipment Used', fields: [
      { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
    ]},
    { id: 'comments', title: 'Comments', fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' }]},
  ],
  '12-CurrentTransformerTestATSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'customerName', label: 'Customer', type: 'text', value: '' },
        { id: 'customerAddress', label: 'Address', type: 'textarea', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Equipment Location', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'userName', label: 'User', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
      ],
    },
    {
      id: 'device-data',
      title: 'Device Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'class', label: 'Class', type: 'text', value: '' },
        { id: 'ctRatio', label: 'CT Ratio', type: 'text', value: '' },
        { id: 'catalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'voltageRating', label: 'Voltage Rating (V)', type: 'text', value: '' },
        { id: 'polarityFacing', label: 'Polarity Facing', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'frequency', label: 'Frequency', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.10.1.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
              { id: '7.10.1.A.2', description: 'Inspect physical and mechanical condition.' },
              { id: '7.10.1.A.3', description: 'Verify correct connection of transformers with system requirements.' },
              { id: '7.10.1.A.4', description: 'Verify that adequate clearances exist between primary and secondary circuit wiring.' },
              { id: '7.10.1.A.5', description: 'Verify the unit is clean.' },
              { id: '7.10.1.A.6', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.10.1.B.1.' },
              { id: '7.10.1.A.7', description: 'Verify that all required grounding and shorting connections provide contact.' },
              { id: '7.10.1.A.8', description: 'Verify appropriate lubrication on moving current-carrying parts and on moving and sliding surfaces.' },
            ]
          }
        },
        { id: 'eGap', label: 'E-Gap', type: 'table', value: {} }
      ],
    },
    {
      id: 'ct-identification',
      title: 'CT Identification',
      fields: [
        { id: 'ctId', label: 'CT Identification', type: 'table', value: { rows: [] } },
      ],
    },
    {
      id: 'electrical-tests',
      title: 'Electrical Tests',
      fields: [
        { id: 'ratioPolarity', label: 'Ratio and Polarity', type: 'table', value: { rows: [] } },
        { id: 'primaryInsulation', label: 'Primary Winding - 1 min. Insulation Resistance to Ground', type: 'table', value: {} },
        { id: 'secondaryInsulation', label: 'Secondary Winding - 1 min. Insulation Resistance to Ground', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ampId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'ctRatioTestSetName', label: 'CT Ratio Test Set', type: 'text', value: '' },
        { id: 'ctRatioTestSetSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ctRatioTestSetAmpId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [{ id: 'comments', label: 'Comments', type: 'textarea', value: '' }],
    },
  ],
  'CurrentTransformerPartialTestATSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customerName', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity', type: 'text', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'userName', label: 'User', type: 'text', value: '' },
      ],
    },
    {
      id: 'device-data',
      title: 'Device Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'class', label: 'Class', type: 'text', value: '' },
        { id: 'ctRatio', label: 'CT Ratio', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial #', type: 'text', value: '' },
        { id: 'catalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'voltageRating', label: 'Voltage Rating (V)', type: 'text', value: '' },
        { id: 'polarityFacing', label: 'Polarity Facing', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'frequency', label: 'Frequency', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.10.1.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
              { id: '7.10.1.A.2', description: 'Inspect physical and mechanical condition.' },
              { id: '7.10.1.A.3', description: 'Verify correct connection of transformers with system requirements.' },
              { id: '7.10.1.A.4', description: 'Verify that adequate clearances exist between primary and secondary circuit wiring.' },
              { id: '7.10.1.A.5', description: 'Verify the unit is clean.' },
              { id: '7.10.1.A.6.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.10.1.B.1.' },
              { id: '7.10.1.A.7', description: 'Verify that all required grounding and shorting connections provide contact.' },
              { id: '7.10.1.A.8', description: 'Verify appropriate lubrication on moving current-carrying parts and on moving and sliding surfaces.' },
            ]
          }
        }
      ],
    },
    {
      id: 'electrical-tests',
      title: 'Electrical Tests',
      fields: [
        { id: 'primaryInsulation', label: 'Primary Winding - 1 min. Insulation Resistance to Ground', type: 'table', value: { rows: [] } },
        { id: 'secondaryInsulation', label: 'Secondary Winding - 1 min. Insulation Resistance to Ground', type: 'table', value: { rows: [] } },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ampId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [{ id: 'comments', label: 'Comments', type: 'textarea', value: '' }],
    },
  ],
  '12-CurrentTransformerTestMTSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'customerName', label: 'Customer', type: 'text', value: '' },
        { id: 'customerAddress', label: 'Address', type: 'textarea', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Equipment Location', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'userName', label: 'User', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
      ],
    },
    {
      id: 'device-data',
      title: 'Device Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'class', label: 'Class', type: 'text', value: '' },
        { id: 'ctRatio', label: 'CT Ratio', type: 'text', value: '' },
        { id: 'catalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'voltageRating', label: 'Voltage Rating (V)', type: 'text', value: '' },
        { id: 'polarityFacing', label: 'Polarity Facing', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'frequency', label: 'Frequency', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.10.1.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
              { id: '7.10.1.A.2', description: 'Inspect physical and mechanical condition.' },
              { id: '7.10.1.A.3', description: 'Verify correct connection of transformers with system requirements.' },
              { id: '7.10.1.A.4', description: 'Verify that adequate clearances exist between primary and secondary circuit wiring.' },
              { id: '7.10.1.A.5', description: 'Verify the unit is clean.' },
              { id: '7.10.1.A.6', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.10.1.B.1.' },
              { id: '7.10.1.A.7', description: 'Verify that all required grounding and shorting connections provide contact.' },
              { id: '7.10.1.A.8', description: 'Verify appropriate lubrication on moving current-carrying parts and on moving and sliding surfaces.' },
            ]
          }
        }
      ],
    },
    {
      id: 'ct-identification',
      title: 'CT Identification',
      fields: [
        { id: 'ctId', label: 'CT Identification', type: 'table', value: { rows: [] } },
      ],
    },
    {
      id: 'electrical-tests',
      title: 'Electrical Tests',
      fields: [
        { id: 'ratioPolarity', label: 'Ratio and Polarity', type: 'table', value: { rows: [] } },
        { id: 'primaryInsulation', label: 'Primary Winding - 1 min. Insulation Resistance to Ground', type: 'table', value: {} },
        { id: 'secondaryInsulation', label: 'Secondary Winding - 1 min. Insulation Resistance to Ground', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ampId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'ctRatioTestSetName', label: 'CT Ratio Test Set', type: 'text', value: '' },
        { id: 'ctRatioTestSetSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ctRatioTestSetAmpId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [{ id: 'comments', label: 'Comments', type: 'textarea', value: '' }],
    },
  ],
  '3-LowVoltageCableATS.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'textarea', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
      ],
    },
    {
      id: 'cable-data',
      title: 'Cable Data',
      fields: [
        { id: 'testedFrom', label: 'Tested From', type: 'text', value: '' },
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'conductorMaterial', label: 'Conductor Material', type: 'text', value: '' },
        { id: 'insulationType', label: 'Insulation Type', type: 'text', value: '' },
        { id: 'systemVoltage', label: 'System Voltage', type: 'text', value: '' },
        { id: 'ratedVoltage', label: 'Rated Voltage', type: 'text', value: '' },
        { id: 'length', label: 'Length', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.3.1.A.1', description: 'Compare cable data with drawings and specifications.' },
              { id: '7.3.1.A.2', description: 'Inspect exposed sections of cables for physical damage.' },
              { id: '7.3.1.A.3.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.3.3.B.1.' },
              { id: '7.3.1.A.4', description: 'Inspect compression-applied connectors for correct cable match and indentation.' },
              { id: '7.3.1.A.5', description: 'Inspect for correct identification and arrangements.' },
              { id: '7.3.1.A.6', description: 'Inspect cable jacket insulation and condition.' },
            ]
          }
        }
      ],
    },
    {
      id: 'electrical-tests',
      title: 'Electrical Tests',
      fields: [
        { id: 'numberOfCables', label: 'Number of Cables', type: 'number', value: 12 },
        { id: 'testVoltage', label: 'Test Voltage', type: 'select', options: TEST_VOLTAGES, value: '1000V' },
        { id: 'electricalGrid', label: '1 Min. Insulation Resistance in MΩ', type: 'table', value: { rows: [] } },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ampId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [{ id: 'comments', label: 'Comments', type: 'textarea', value: '' }],
    },
  ],
  '13-VoltagePotentialTransformerTestMTSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
      ],
    },
    {
      id: 'device-data',
      title: 'Device Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'catalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'accuracyClass', label: 'Accuracy Class', type: 'text', value: '' },
        { id: 'manufacturedYear', label: 'Manufactured Year', type: 'text', value: '' },
        { id: 'voltageRating', label: 'Voltage Rating', type: 'text', value: '' },
        { id: 'insulationClass', label: 'Insulation Class', type: 'text', value: '' },
        { id: 'frequency', label: 'Frequency', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.10.2.1', description: 'Inspect physical and mechanical condition.' },
              { id: '7.10.2.3', description: 'Clean the unit.' },
              { id: '7.10.2.4', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.10.1.B.1.' },
              { id: '7.10.2.5', description: 'Verify that all required grounding and connections provide contact.' },
              { id: '7.10.2.6', description: 'Verify correct operation of transformer withdrawal mechanism and grounding operation.' },
              { id: '7.10.2.7', description: 'Verify correct primary and secondary fuse sizes for voltage transformers.' },
              { id: '7.10.2.8', description: 'Use appropriate lubrication on moving current-carrying parts and on moving and sliding surfaces.' },
            ]
          }
        }
      ],
    },
    {
      id: 'fuse-data',
      title: 'Fuse Data',
      fields: [
        { id: 'fuseManufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'fuseCatalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'fuseClass', label: 'Class', type: 'text', value: '' },
        { id: 'fuseVoltageRatingKv', label: 'Voltage Rating (kV)', type: 'text', value: '' },
        { id: 'fuseAmpacityA', label: 'Ampacity (A)', type: 'text', value: '' },
        { id: 'fuseIcRatingKa', label: 'I.C. Rating (kA)', type: 'text', value: '' },
      ],
    },
    {
      id: 'electrical-tests-fuse',
      title: 'Electrical Tests - Fuse Resistance',
      fields: [
        { id: 'fuseResistance', label: 'Fuse Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-insulation-ratio',
      title: 'Electrical Tests - Insulation Resistance & Ratio',
      fields: [
        { id: 'vtInsulation', label: 'Insulation Resistance', type: 'table', value: { rows: [] } },
        { id: 'secondaryVoltageTap', label: 'Secondary Voltage at as-found tap (V)', type: 'number', value: '' },
        { id: 'vtTurnsRatio', label: 'Turns Ratio Test', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'megohmmeterSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'megohmmeterAmpId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'lro', label: 'Low Resistance Ohmmeter', type: 'text', value: '' },
        { id: 'lroSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'lroAmpId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'ttr', label: 'TTR Test Set', type: 'text', value: '' },
        { id: 'ttrSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ttrAmpId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [
        { id: 'comments', label: 'Comments', type: 'textarea', value: '' },
      ],
    },
  ],
  '23-MediumVoltageMotorStarterMTSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'textarea', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
      ],
    },
    {
      id: 'nameplate-data',
      title: 'Nameplate Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'catalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'manufacturingDate', label: 'Manufacturing Date', type: 'text', value: '' },
        { id: 'icRating', label: 'I.C. Rating (kA)', type: 'text', value: '' },
        { id: 'ratedVoltageKV', label: 'Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'operatingVoltageKV', label: 'Operating Voltage (kV)', type: 'text', value: '' },
        { id: 'ampacity', label: 'Ampacity (A)', type: 'text', value: '' },
        { id: 'impulseRatingBIL', label: 'Impulse Rating (BIL)', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.16.1.2.A.1', description: 'Inspect physical and mechanical condition.' },
              { id: '7.16.1.2.A.2', description: 'Inspect anchorage, alignment, and grounding.' },
              { id: '7.16.1.2.A.4', description: 'Clean the unit.' },
              { id: '7.16.1.2.A.5.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.16.1.2.B.1.' },
              { id: '7.16.1.2.A.6', description: 'Test electrical and mechanical interlock systems for correct operation and sequencing.' },
              { id: '7.16.1.2.A.7', description: 'Verify correct barrier and shutter installation and operation.' },
              { id: '7.16.1.2.A.8', description: 'Exercise active components and confirm correct operation of indicating devices.' },
              { id: '7.16.1.2.A.9', description: "Inspect contactors. 1. Verify mechanical operation. 2. Inspect and adjust contact gap, wipe, alignment, and pressure in accordance with manufacturer's published data." },
              { id: '7.16.1.2.A.10', description: 'Compare overload protection rating with motor nameplate to verify correct size. Set adjustable or programmable devices according to the protective device coordination study.' },
              { id: '7.16.1.2.A.11', description: 'Use appropriate lubrication on moving current-carrying parts and on moving and sliding surfaces.' },
            ]
          }
        }
      ],
    },
    {
      id: 'fuse-data',
      title: 'Fuse Data',
      fields: [
        { id: 'fuseManufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'fuseCatalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'fuseClass', label: 'Class', type: 'text', value: '' },
        { id: 'fuseRatedVoltageKV', label: 'Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'fuseAmpacityA', label: 'Ampacity (A)', type: 'text', value: '' },
        { id: 'fuseIcRatingKA', label: 'I.C. Rating (kA)', type: 'text', value: '' },
      ],
    },
    {
      id: 'electrical-tests',
      title: 'Electrical Tests',
      fields: [
        { id: 'switchCrFound', label: 'Contact Resistance (As Found)', type: 'table', value: { rows: [] } },
        { id: 'switchCrLeft', label: 'Contact Resistance (As Left)', type: 'table', value: { rows: [] } },
        { id: 'motorStarterIr', label: 'Insulation Resistance / Temperature Corrected', type: 'table', value: {} },
      ],
    },
    {
      id: 'contactor-data',
      title: 'Contactor Data',
      fields: [
        { id: 'contManufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'contCatalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'contSerialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'contType', label: 'Type', type: 'text', value: '' },
        { id: 'contManufacturingDate', label: 'Manufacturing Date', type: 'text', value: '' },
        { id: 'contIcRatingKA', label: 'I.C. Rating (kA)', type: 'text', value: '' },
        { id: 'contRatedVoltageKV', label: 'Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'contOperatingVoltageKV', label: 'Operating Voltage (kV)', type: 'text', value: '' },
        { id: 'contAmpacityA', label: 'Ampacity (A)', type: 'text', value: '' },
        { id: 'contControlVoltageV', label: 'Control Voltage (V)', type: 'text', value: '' },
      ],
    },
    {
      id: 'electrical-test-contactor',
      title: 'Electrical Test - Contactor',
      fields: [
        { id: 'contactorInsulation', label: 'Insulation Resistance / Temperature Corrected', type: 'table', value: { rows: [] } },
        { id: 'vacuumBottleIntegrity', label: 'Vacuum Bottle Integrity (Breaker In Open Position)', type: 'table', value: { testDuration: '1 Min.' } },
      ],
    },
    {
      id: 'starting-reactor-data',
      title: 'Starting Reactor Data',
      fields: [
        { id: 'srManufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'srCatalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'srSerialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'srRatedCurrentA', label: 'Rated Current (A)', type: 'text', value: '' },
        { id: 'srRatedVoltageKV', label: 'Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'srOperatingVoltageKV', label: 'Operating Voltage (kV)', type: 'text', value: '' },
      ],
    },
    {
      id: 'electrical-test-reactor',
      title: 'Electrical Test - Reactor',
      fields: [
        { id: 'reactorInsulation', label: 'Insulation Resistance Values / Temperature Corrected', type: 'table', value: { testVoltage: '1000V', windingToGround: { units: 'MΩ' } } },
        { id: 'reactorCrFound', label: 'Contact Resistance (As Found)', type: 'table', value: { rows: [{ test: 'Reading', units: 'µΩ' }] } },
        { id: 'reactorCrLeft', label: 'Contact Resistance (As Left)', type: 'table', value: { rows: [{ test: 'Reading', units: 'µΩ' }] } },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'megohmmeterSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'megohmmeterAmpId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'lro', label: 'Low Resistance Ohmmeter', type: 'text', value: '' },
        { id: 'lroSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'lroAmpId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'hipot', label: 'Hipot', type: 'text', value: '' },
        { id: 'hipotSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'hipotAmpId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [
        { id: 'comments', label: 'Comments', type: 'textarea', value: '' },
      ],
    },
  ],
  'AutomaticTransferSwitchATSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'modelType', label: 'Model / Type', type: 'text', value: '' },
        { id: 'catalogNo', label: 'Catalog No.', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'systemVoltage', label: 'System Voltage (V)', type: 'text', value: '' },
        { id: 'ratedVoltage', label: 'Rated Voltage (V)', type: 'text', value: '' },
        { id: 'ratedCurrent', label: 'Rated Current (A)', type: 'text', value: '' },
        { id: 'sccr', label: 'SCCR (kA)', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.22.3.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
              { id: '7.22.3.A.2', description: 'Inspect physical and mechanical condition.' },
              { id: '7.22.3.A.3', description: 'Inspect anchorage, alignment, grounding, and required clearances.' },
              { id: '7.22.3.A.4', description: 'Verify the unit is clean.' },
              { id: '7.22.3.A.5', description: 'Verify appropriate lubrication on moving current-carrying parts and on moving and sliding surfaces.' },
              { id: '7.22.3.A.6', description: 'Verify that manual transfer warnings are attached and visible.' },
              { id: '7.22.3.A.7', description: 'Verify tightness of all control connections.' },
              { id: '7.22.3.A.8.1', description: 'Use of low-resistance ohmmeter in accordance with Section 7.22.3.B.1.' },
              { id: '7.22.3.A.9', description: 'Perform manual transfer operation.' },
              { id: '7.22.3.A.10', description: 'Verify positive mechanical interlocking between normal and alternate sources.' },
            ]
          }
        }
      ],
    },
    {
      id: 'electrical-tests-insulation',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'atsInsulation', label: 'Insulation Resistance Grid', type: 'table', value: { rows: [] } },
      ],
    },
    {
      id: 'electrical-tests-contact',
      title: 'Electrical Tests - Contact/Pole Resistance',
      fields: [
        { id: 'atsContactResistance', label: 'Contact/Pole Resistance', type: 'table', value: { rows: [] } },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'megohmmeterSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'megohmmeterAmpId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'lro', label: 'Low Resistance Ohmmeter', type: 'text', value: '' },
        { id: 'lroSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'lroAmpId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [
        { id: 'comments', label: 'Comments', type: 'textarea', value: '' },
      ],
    },
  ],
  'DryTypeTransformerReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'textarea', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'dry-nameplate', label: 'Nameplate', type: 'table', value: {} },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.2.2.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
              { id: '7.2.2.A.2', description: 'Inspect physical and mechanical condition.' },
              { id: '7.2.2.A.3', description: 'Inspect impact recorder prior to unloading.' },
              { id: '7.2.2.A.4*', description: 'Test dew point of tank gases. *Optional' },
              { id: '7.2.2.A.5', description: 'Inspect anchorage, alignment, and grounding.' },
              { id: '7.2.2.A.6', description: 'Verify the presence of PCB content labeling.' },
              { id: '7.2.2.A.7', description: 'Verify removal of any shipping bracing after placement.' },
              { id: '7.2.2.A.8', description: 'Verify the bushings are clean.' },
              { id: '7.2.2.A.9', description: 'Verify that alarm, control, and trip settings on temperature and level indicators are as specified.' },
              { id: '7.2.2.A.10', description: 'Verify operation of alarm, control, and trip circuits from temperature and level indicators, pressure relief device, gas accumulator, and fault pressure relay.' },
              { id: '7.2.2.A.11', description: 'Verify that cooling fans and pumps operate correctly and have appropriate overcurrent protection.' },
              { id: '7.2.2.A.12', description: 'Inspect bolted electrical connections for high resistance using low-resistance ohmmeter, calibrated torquewrench, or thermographic survey.' },
              { id: '7.2.2.A.13', description: 'Verify correct liquid level in tanks and bushings.' },
              { id: '7.2.2.A.14', description: 'Verify valves are in the correct operating position.' },
              { id: '7.2.2.A.15', description: 'Verify that positive pressure is maintained on gas-blanketed transformers.' },
              { id: '7.2.2.A.16', description: 'Perform inspections and mechanical tests as recommended by the manufacturer.' },
              { id: '7.2.2.A.17', description: 'Test load tap-changer in accordance with Section 7.12.3.' },
              { id: '7.2.2.A.18', description: 'Verify presence of transformer surge arresters.' },
              { id: '7.2.2.A.19', description: 'Verify de-energized tap-changer position is left as specified.' },
            ]
          }
        }
      ],
    },
    {
      id: 'insulation',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'dryTypeIr', label: 'Insulation Resistance + Temp Corrected + DA/PI', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ampId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'LargeDryTypeTransformerMTSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'textarea', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'dry-nameplate', label: 'Nameplate', type: 'table', value: {} },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.2.1.2.A.1', description: 'Inspect physical and mechanical condition.' },
              { id: '7.2.1.2.A.10', description: 'Verify that as-left tap connections are as specified.' },
              { id: '7.2.1.2.A.11', description: 'Verify the presence of surge arresters.' },
              { id: '7.2.1.2.A.2', description: 'Inspect anchorage, alignment, and grounding.' },
              { id: '7.2.1.2.A.3', description: 'Prior to cleaning the unit, perform as-found tests.' },
              { id: '7.2.1.2.A.4', description: 'Clean the unit.' },
              { id: '7.2.1.2.A.5', description: 'Verify that control and alarm settings on temperature indicators are as specified.' },
              { id: '7.2.1.2.A.6', description: 'Verify that cooling fans operate correctly.' },
              { id: '7.2.1.2.A.7', description: 'Inspect bolted electrical connections for high resistance using a low-resistance ohmmeter.' },
              { id: '7.2.1.2.A.8', description: 'Perform specific inspections and mechanical tests as recommended by the manufacturer.' },
              { id: '7.2.1.2.A.9', description: 'Perform as-left tests.' },
            ],
          },
        },
      ],
    },
    {
      id: 'insulation',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'dryTypeIr', label: 'Insulation Resistance + Temp Corrected + DA/PI', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ampId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
    {
      id: 'turns-ratio',
      title: 'Electrical Tests - Turns Ratio',
      fields: [
        { id: 'secondaryVoltageTap', label: 'Secondary Winding Voltage (V)', type: 'number', value: '' },
        { id: 'turnsRatio', label: 'Turns Ratio', type: 'table', value: {} },
      ],
    },
  ],
  'LargeDryTypeTransformerReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'textarea', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'dry-nameplate', label: 'Nameplate', type: 'table', value: {} },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.2.1.2.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
              { id: '7.2.1.2.A.10', description: 'Verify that as-left tap connections are as specified.' },
              { id: '7.2.1.2.A.11', description: 'Verify the presence of surge arresters.' },
              { id: '7.2.1.2.A.2', description: 'Inspect anchorage, alignment, and grounding.' },
              { id: '7.2.1.2.A.3', description: 'Inspect physical and mechanical condition.' },
              { id: '7.2.1.2.A.4*', description: 'Verify that resilient mounts are free and that any shipping brackets have been removed.' },
              { id: '7.2.1.2.A.5', description: 'Verify the unit is clean.' },
              { id: '7.2.1.2.A.6*', description: 'Verify that control and alarm settings on temperature indicators are as specified.' },
              { id: '7.2.1.2.A.7', description: 'Verify that cooling fans operate and that fan motors have correct overcurrent protection.' },
              { id: '7.2.1.2.A.8', description: 'Inspect bolted electrical connections using low-resistance ohmmeter, torque wrench, or IR scan' },
              { id: '7.2.1.2.A.9', description: 'Perform specific inspections and mechanical tests as recommended by the manufacturer.' },
            ],
          },
        },
      ],
    },
    {
      id: 'insulation',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'dryTypeIr', label: 'Insulation Resistance + Temp Corrected + DA/PI', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ampId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'LargeDryTypeXfmrMTSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'textarea', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'dry-nameplate', label: 'Nameplate', type: 'table', value: {} },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.2.1.2.A.1', description: 'Inspect physical and mechanical condition.' },
              { id: '7.2.1.2.A.2', description: 'Inspect anchorage, alignment, and grounding.' },
              { id: '7.2.1.2.A.3*', description: 'Prior to cleaning the unit, perform as-found tests.' },
              { id: '7.2.1.2.A.4', description: 'Clean the unit.' },
              { id: '7.2.1.2.A.5*', description: 'Verify that control and alarm settings on temperature indicators are as specified.' },
              { id: '7.2.1.2.A.6', description: 'Verify that cooling fans operate correctly.' },
              { id: '7.2.1.2.A.7', description: 'Inspect bolted electrical connections for high resistance using a low-resistance ohmmeter.' },
              { id: '7.2.1.2.A.8', description: 'Perform specific inspections and mechanical tests as recommended by the manufacturer.' },
              { id: '7.2.1.2.A.9', description: 'Perform as-left tests.' },
              { id: '7.2.1.2.A.10', description: 'Verify that as-left tap connections are as specified.' },
              { id: '7.2.1.2.A.11', description: 'Verify the presence of surge arresters.' },
            ],
          },
        },
      ],
    },
    {
      id: 'insulation',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'dryTypeIr', label: 'Insulation Resistance + Temp Corrected + DA/PI', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ampId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'LiquidFilledTransformerReportATS.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'textarea', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'dry-nameplate', label: 'Nameplate', type: 'table', value: {} },
      ],
    },
    {
      id: 'indicator-gauges',
      title: 'Indicator Gauge Values',
      fields: [
        { id: 'oilLevel', label: 'Oil Level', type: 'text', value: '' },
        { id: 'tankPressure', label: 'Tank Pressure', type: 'text', value: '' },
        { id: 'oilTemperature', label: 'Oil Temperature (°C)', type: 'text', value: '' },
        { id: 'windingTemperature', label: 'Winding Temperature (°C)', type: 'text', value: '' },
        { id: 'oilTempRange', label: 'Oil Temp Range', type: 'text', value: '' },
        { id: 'windingTempRange', label: 'Winding Temp Range', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.2.2.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
              { id: '7.2.2.A.2', description: 'Inspect physical and mechanical condition.' },
              { id: '7.2.2.A.3', description: 'Inspect impact recorder prior to unloading.' },
              { id: '7.2.2.A.4*', description: 'Test dew point of tank gases. *Optional' },
              { id: '7.2.2.A.5', description: 'Inspect anchorage, alignment, and grounding.' },
              { id: '7.2.2.A.6', description: 'Verify the presence of PCB content labeling.' },
              { id: '7.2.2.A.7', description: 'Verify removal of any shipping bracing after placement.' },
              { id: '7.2.2.A.8', description: 'Verify the bushings are clean.' },
              { id: '7.2.2.A.9', description: 'Verify that alarm, control, and trip settings on temperature and level indicators are as specified.' },
              { id: '7.2.2.A.10', description: 'Verify operation of alarm, control, and trip circuits from temperature and level indicators, pressure relief device, gas accumulator, and fault pressure relay.' },
              { id: '7.2.2.A.11', description: 'Verify that cooling fans and pumps operate correctly and have appropriate overcurrent protection.' },
              { id: '7.2.2.A.12', description: 'Inspect bolted electrical connections for high resistance using low-resistance ohmmeter, calibrated torque wrench, or thermographic survey.' },
              { id: '7.2.2.A.13', description: 'Verify correct liquid level in tanks and bushings.' },
              { id: '7.2.2.A.14', description: 'Verify valves are in the correct operating position.' },
              { id: '7.2.2.A.15', description: 'Verify that positive pressure is maintained on gas-blanketed transformers.' },
              { id: '7.2.2.A.16', description: 'Perform inspections and mechanical tests as recommended by the manufacturer.' },
              { id: '7.2.2.A.17', description: 'Test load tap-changer in accordance with Section 7.12.3.' },
              { id: '7.2.2.A.18', description: 'Verify presence of transformer surge arresters.' },
              { id: '7.2.2.A.19', description: 'Verify de-energized tap-changer position is left as specified.' },
            ],
          },
        },
      ],
    },
    {
      id: 'insulation',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'dryTypeIr', label: 'Insulation Resistance + Temp Corrected + DA/PI', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ampId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'LiquidXfmrVisualMTSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'textarea', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'dry-nameplate', label: 'Nameplate', type: 'table', value: {} },
      ],
    },
    {
      id: 'indicator-gauges',
      title: 'Indicator Gauge Values',
      fields: [
        { id: 'oilLevel', label: 'Oil Level', type: 'text', value: '' },
        { id: 'tankPressure', label: 'Tank Pressure', type: 'text', value: '' },
        { id: 'oilTemperature', label: 'Oil Temperature (°C)', type: 'text', value: '' },
        { id: 'windingTemperature', label: 'Winding Temperature (°C)', type: 'text', value: '' },
        { id: 'oilTempRange', label: 'Oil Temp Range', type: 'text', value: '' },
        { id: 'windingTempRange', label: 'Winding Temp Range', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.2.2.A.1', description: 'Inspect physical and mechanical condition.' },
              { id: '7.2.2.A.2', description: 'Inspect anchorage, alignment, and grounding.' },
              { id: '7.2.2.A.3', description: 'Verify the presence of PCB labeling.' },
              { id: '7.2.2.A.4*', description: 'Prior to cleaning the unit, perform as-found tests. *Optional' },
              { id: '7.2.2.A.5', description: 'Clean bushings and control cabinets.' },
              { id: '7.2.2.A.6', description: 'Verify operation of alarm, control, and trip circuits from temperature and level indicators, pressure-relief device, gas accumulator, and fault-pressure relay.' },
              { id: '7.2.2.A.7', description: 'Verify that cooling fans and pumps operate correctly.' },
              { id: '7.2.2.A.8.1', description: 'Inspect bolted connections for high resistance using a low-resistance ohmmeter in accordance with Section 7.2.2.B.1.' },
              { id: '7.2.2.A.9', description: 'Verify correct liquid level in tanks and bushings.' },
              { id: '7.2.2.A.10', description: 'Verify that positive pressure is maintained on gas-blanketed transformers.' },
              { id: '7.2.2.A.11', description: 'Perform inspections and mechanical tests as recommended by the manufacturer.' },
              { id: '7.2.2.A.12', description: 'Test load tap-changer in accordance with Section 7.12.' },
              { id: '7.2.2.A.13', description: 'Verify the presence of transformer surge arresters.' },
              { id: '7.2.2.A.15', description: 'Verify de-energized tap-changer position is left as specified.' },
            ],
          },
        },
      ],
    },
    {
      id: 'insulation',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'dryTypeIr', label: 'Insulation Resistance + Temp Corrected + DA/PI', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ampId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'LowVoltageCircuitBreakerElectronicTripATSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'catalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'frameSize', label: 'Frame Size (A)', type: 'text', value: '' },
        { id: 'icRating', label: 'I.C. Rating (kA)', type: 'text', value: '' },
        { id: 'tripUnitType', label: 'Trip Unit Type', type: 'text', value: '' },
        { id: 'ratingPlug', label: 'Rating Plug (A)', type: 'text', value: '' },
        { id: 'curveNo', label: 'Curve No.', type: 'text', value: '' },
        { id: 'chargeMotorVoltage', label: 'Charge Motor V', type: 'text', value: '' },
        { id: 'operation', label: 'Operation', type: 'text', value: '' },
        { id: 'mounting', label: 'Mounting', type: 'text', value: '' },
        { id: 'zoneInterlock', label: 'Zone Interlock', type: 'text', value: '' },
        { id: 'thermalMemory', label: 'Thermal Memory', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.6.1.2.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
              { id: '7.6.1.2.A.2', description: 'Inspect physical and mechanical condition.' },
              { id: '7.6.1.2.A.3', description: 'Inspect anchorage and alignment.' },
              { id: '7.6.1.2.A.4', description: 'Verify that all maintenance devices are available for servicing and operating the breaker.' },
              { id: '7.6.1.2.A.5', description: 'Verify the unit is clean.' },
              { id: '7.6.1.2.A.6', description: 'Verify the arc chutes are intact.' },
              { id: '7.6.1.2.A.7', description: 'Inspect moving and stationary contacts for condition and alignment.' },
              { id: '7.6.1.2.A.8', description: 'Verify that primary and secondary contact wipe and other dimensions are correct.' },
              { id: '7.6.1.2.A.9', description: "Perform mechanical operator and contact alignment tests per manufacturer's data." },
              { id: '7.6.1.2.A.10.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.6.1.2.B.1.' },
              { id: '7.6.1.2.A.11', description: 'Verify cell fit and element alignment.' },
              { id: '7.6.1.2.A.12', description: 'Verify racking mechanism operation.' },
              { id: '7.6.1.2.A.13', description: 'Verify appropriate lubrication on moving parts and surfaces.' },
              { id: '7.6.1.2.A.14', description: 'Perform adjustments for final protective device settings per coordination study.' },
            ]
          }
        }
      ],
    },
    {
      id: 'device-settings',
      title: 'Device Settings',
      fields: [
        { id: 'deviceSettings', label: 'Device Settings', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-contact',
      title: 'Electrical Tests - Contact/Pole Resistance',
      fields: [
        { id: 'breakerContactResistance', label: 'Contact Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-insulation',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'contactorInsulation', label: 'Insulation Resistance / Temperature Corrected', type: 'table', value: {} },
      ],
    },
    {
      id: 'primary-injection',
      title: 'Electrical Tests - Primary Injection',
      fields: [
        { id: 'primaryInjection', label: 'Primary Injection', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'LowVoltageCircuitBreakerElectronicTripATSSecondaryInjectionReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'catalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'frameSize', label: 'Frame Size (A)', type: 'text', value: '' },
        { id: 'icRating', label: 'I.C. Rating (kA)', type: 'text', value: '' },
        { id: 'tripUnitType', label: 'Trip Unit Type', type: 'text', value: '' },
        { id: 'ratingPlug', label: 'Rating Plug (A)', type: 'text', value: '' },
        { id: 'curveNo', label: 'Curve No.', type: 'text', value: '' },
        { id: 'chargeMotorVoltage', label: 'Charge Motor V', type: 'text', value: '' },
        { id: 'operation', label: 'Operation', type: 'text', value: '' },
        { id: 'mounting', label: 'Mounting', type: 'text', value: '' },
        { id: 'zoneInterlock', label: 'Zone Interlock', type: 'text', value: '' },
        { id: 'thermalMemory', label: 'Thermal Memory', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.6.1.2.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
              { id: '7.6.1.2.A.2', description: 'Inspect physical and mechanical condition.' },
              { id: '7.6.1.2.A.3', description: 'Inspect anchorage and alignment.' },
              { id: '7.6.1.2.A.4', description: 'Verify that all maintenance devices are available for servicing and operating the breaker.' },
              { id: '7.6.1.2.A.5', description: 'Verify the unit is clean.' },
              { id: '7.6.1.2.A.6', description: 'Verify the arc chutes are intact.' },
              { id: '7.6.1.2.A.7', description: 'Inspect moving and stationary contacts for condition and alignment.' },
              { id: '7.6.1.2.A.8', description: 'Verify that primary and secondary contact wipe and other dimensions are correct.' },
              { id: '7.6.1.2.A.9', description: "Perform mechanical operator and contact alignment tests per manufacturer's data." },
              { id: '7.6.1.2.A.10.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.6.1.2.B.1.' },
              { id: '7.6.1.2.A.11', description: 'Verify cell fit and element alignment.' },
              { id: '7.6.1.2.A.12', description: 'Verify racking mechanism operation.' },
              { id: '7.6.1.2.A.13', description: 'Verify appropriate lubrication on moving parts and surfaces.' },
              { id: '7.6.1.2.A.14', description: 'Perform adjustments for final protective device settings per coordination study.' },
            ]
          }
        }
      ],
    },
    {
      id: 'device-settings',
      title: 'Device Settings',
      fields: [
        { id: 'deviceSettings', label: 'Device Settings', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-contact',
      title: 'Electrical Tests - Contact/Pole Resistance',
      fields: [
        { id: 'breakerContactResistance', label: 'Contact Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-insulation',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'contactorInsulation', label: 'Insulation Resistance / Temperature Corrected', type: 'table', value: {} },
      ],
    },
    {
      id: 'trip-testing',
      title: 'Electrical Tests - Trip Testing',
      fields: [
        { id: 'secondaryInjection', label: 'Secondary Injection', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'LowVoltageCircuitBreakerElectronicTripMTSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'catalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'frameSize', label: 'Frame Size (A)', type: 'text', value: '' },
        { id: 'icRating', label: 'I.C. Rating (kA)', type: 'text', value: '' },
        { id: 'tripUnitType', label: 'Trip Unit Type', type: 'text', value: '' },
        { id: 'ratingPlug', label: 'Rating Plug (A)', type: 'text', value: '' },
        { id: 'curveNo', label: 'Curve No.', type: 'text', value: '' },
        { id: 'chargeMotorVoltage', label: 'Charge Motor V', type: 'text', value: '' },
        { id: 'operation', label: 'Operation', type: 'text', value: '' },
        { id: 'mounting', label: 'Mounting', type: 'text', value: '' },
        { id: 'zoneInterlock', label: 'Zone Interlock', type: 'text', value: '' },
        { id: 'thermalMemory', label: 'Thermal Memory', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.6.1.2.A.1', description: 'Inspect moving and stationary contacts for condition' },
              { id: '7.6.1.2.A.2', description: 'Verify that primary and secondary contact wipe and break' },
              { id: '7.6.1.2.A.3', description: 'Perform all mechanical operator and contact alignment mechanism' },
              { id: '7.6.1.2.A.4', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.6.1.2.B.1.' },
              { id: '7.6.1.2.A.5', description: 'Verify cell fit and element alignment' },
              { id: '7.6.1.2.A.6', description: 'Inspect for correct operation and adjustment of all interlocking systems' },
              { id: '7.6.1.2.A.7', description: 'Verify that all indicating devices are correctly installed and operating' },
              { id: '7.6.1.2.A.8', description: 'Verify that all nameplates are legible and correct' },
              { id: '7.6.1.2.A.9', description: 'Verify that all required devices are installed and operating' },
              { id: '7.6.1.2.A.10', description: 'Verify that all required devices are installed and operating' },
            ]
          }
        }
      ],
    },
    {
      id: 'device-settings',
      title: 'Device Settings',
      fields: [
        { id: 'deviceSettings', label: 'Device Settings', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-contact',
      title: 'Electrical Tests - Contact/Pole Resistance',
      fields: [
        { id: 'breakerContactResistance', label: 'Contact Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-insulation',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'contactorInsulation', label: 'Insulation Resistance / Temperature Corrected', type: 'table', value: {} },
      ],
    },
    {
      id: 'primary-injection',
      title: 'Electrical Tests - Primary Injection',
      fields: [
        { id: 'primaryInjection', label: 'Primary Injection', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'LowVoltageCircuitBreakerThermalMagneticATSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'catalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'icRating', label: 'IC Rating (kA)', type: 'text', value: '' },
        { id: 'frameSize', label: 'Frame Size (A)', type: 'text', value: '' },
        { id: 'ratingPlug', label: 'Rating Plug', type: 'text', value: '' },
        { id: 'curveNo', label: 'Curve No.', type: 'text', value: '' },
        { id: 'operation', label: 'Operation', type: 'text', value: '' },
        { id: 'mounting', label: 'Mounting', type: 'text', value: '' },
        { id: 'thermalMemory', label: 'Thermal Memory', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.6.1.2.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
              { id: '7.6.1.2.A.2', description: 'Inspect physical and mechanical condition.' },
              { id: '7.6.1.2.A.3', description: 'Inspect anchorage and alignment.' },
              { id: '7.6.1.2.A.4', description: 'Verify that all maintenance devices are available for servicing and operating the breaker.' },
              { id: '7.6.1.2.A.5', description: 'Verify the unit is clean.' },
              { id: '7.6.1.2.A.6', description: 'Verify the arc chutes are intact.' },
              { id: '7.6.1.2.A.7', description: 'Inspect moving and stationary contacts for condition and alignment.' },
              { id: '7.6.1.2.A.8', description: 'Verify that primary and secondary contact wipe and other dimensions vital to satisfactory operation of the breaker are correct.' },
              { id: '7.6.1.2.A.9', description: "Perform all mechanical operator and contact alignment tests on both the breaker and its operating mechanism in accordance with manufacturer's published data." },
              { id: '7.6.1.2.A.10.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.6.1.2.B.1.' },
              { id: '7.6.1.2.A.11', description: 'Verify cell fit and element alignment.' },
              { id: '7.6.1.2.A.12', description: 'Verify racking mechanism operation.' },
              { id: '7.6.1.2.A.13', description: 'Verify appropriate lubrication on moving current-carrying parts and on moving and sliding surfaces.' },
              { id: '7.6.1.2.A.14', description: 'Perform adjustments for final protective device settings in accordance with coordination study provided by end user.' },
            ]
          }
        }
      ],
    },
    {
      id: 'device-settings',
      title: 'Device Settings',
      fields: [
        { id: 'tmDeviceSettings', label: 'Device Settings', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-contact',
      title: 'Electrical Tests - Contact/Pole Resistance',
      fields: [
        { id: 'breakerContactResistance', label: 'Contact Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-insulation',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'contactorInsulation', label: 'Insulation Resistance / Temperature Corrected', type: 'table', value: {} },
      ],
    },
    {
      id: 'primary-injection',
      title: 'Electrical Tests - Primary Injection',
      fields: [
        { id: 'tmPrimaryInjection', label: 'Primary Injection', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'LowVoltageSwitchMultiDeviceTest.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        { id: 'vm-matrix', label: 'Visual and Mechanical Tests for NETA ATS Section 7.5.1.1.A', type: 'table', value: { rows: [] } },
      ],
    },
    {
      id: 'enclosure-data',
      title: 'Enclosure Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'systemVoltage', label: 'System Voltage (V)', type: 'text', value: '' },
        { id: 'catalogNo', label: 'Catalog No.', type: 'text', value: '' },
        { id: 'ratedVoltage', label: 'Rated Voltage (V)', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ratedCurrent', label: 'Rated Current (A)', type: 'text', value: '' },
        { id: 'series', label: 'Series', type: 'text', value: '' },
        { id: 'aicRating', label: 'AIC Rating (kA)', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'phaseConfiguration', label: 'Phase Configuration', type: 'text', value: '' },
      ],
    },
    {
      id: 'switch-data',
      title: 'Switch Data',
      fields: [
        { id: 'switchRows', label: 'Switch Rows', type: 'table', value: { rows: [] } },
      ],
    },
    {
      id: 'fuse-data',
      title: 'Fuse Data',
      fields: [
        { id: 'fuseRows', label: 'Fuse Rows', type: 'table', value: { rows: [] } },
      ],
    },
    {
      id: 'electrical-tests-ir',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'switchIrTables', label: 'Insulation Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-contact',
      title: 'Electrical Tests - Contact Resistance',
      fields: [
        { id: 'switchContact', label: 'Contact Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'neta-reference',
      title: 'NETA Reference',
      fields: [
        { id: 'netaReference', label: 'NETA Reference', type: 'table', value: { rows: [
          { id: '7.5.11.A.1', description: 'Compare equipment data with drawings & specifications' },
          { id: '7.5.11.A.3', description: 'Inspect physical & mechanical condition' },
          { id: '7.5.11.A.4', description: 'Verify the unit is clean' },
          { id: '7.5.11.A.5', description: 'Verify correct blade alignment, blade penetration, travel stops, & mechanical operation' },
          { id: '7.5.11.A.6', description: 'Verify fusing sizes & types are in accordance with drawings, short circuit, & coordination study' },
          { id: '7.5.11.A.7', description: 'Verify each fuse has adequate mechanical support & contact integrity' },
          { id: '7.5.11.A.8.1', description: 'Inspect bolted electrical connections for resistance utilizing a low resistance ohmmeter' },
          { id: '7.5.11.A.9', description: 'Verify operation & sequencing of interlocking systems' },
          { id: '7.5.11.A.10', description: 'Verify correct phase barrier installation' },
          { id: '7.5.11.A.11', description: 'Verify correct operation of all indicating & control devices' },
          { id: '7.5.11.A.12', description: 'Verify appropriate lubrication on moving current carrying parts & on moving and sliding surfaces' },
        ] } },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'megohmmeterSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'megohmmeterAmpId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'lro', label: 'Low Resistance Ohmmeter', type: 'text', value: '' },
        { id: 'lroSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'lroAmpId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'LowVoltagePanelboardSmallBreakerTestATSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Equipment Location', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'panelboardManufacturer', label: 'Panelboard Manufacturer', type: 'text', value: '' },
        { id: 'panelboardTypeCat', label: 'Panelboard Type/Catalog #', type: 'text', value: '' },
        { id: 'panelboardSizeA', label: 'Panelboard Size (A)', type: 'text', value: '' },
        { id: 'panelboardVoltageV', label: 'Panelboard Voltage (V)', type: 'text', value: '' },
        { id: 'panelboardSCCRkA', label: 'Panelboard SCCR (kA)', type: 'text', value: '' },
        { id: 'mainBreakerManufacturer', label: 'Main Breaker Manufacturer', type: 'text', value: '' },
        { id: 'mainBreakerType', label: 'Main Breaker Type', type: 'text', value: '' },
        { id: 'mainBreakerFrameSizeA', label: 'Main Breaker Frame Size (A)', type: 'text', value: '' },
        { id: 'mainBreakerRatingPlugA', label: 'Main Breaker Rating Plug (A)', type: 'text', value: '' },
        { id: 'mainBreakerICRatingkA', label: 'Main Breaker I.C. Rating (kA)', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.6.1.2.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
              { id: '7.6.1.2.A.2', description: 'Inspect physical and mechanical condition.' },
              { id: '7.6.1.2.A.3', description: 'Inspect anchorage and alignment.' },
              { id: '7.6.1.2.A.4', description: 'Verify that all maintenance devices are available for servicing and operating the breaker.' },
              { id: '7.6.1.2.A.5', description: 'Verify the unit is clean.' },
              { id: '7.6.1.2.A.6', description: 'Verify the arc chutes are intact.' },
              { id: '7.6.1.2.A.7', description: 'Inspect moving and stationary contacts for condition and alignment.' },
              { id: '7.6.1.2.A.10.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.6.1.2.B.1.' },
              { id: '7.6.1.2.A.14', description: 'Perform adjustments for final protective device settings per coordination study.' },
            ]
          }
        }
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'megohmmeterSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'megohmmeterAmpId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'lro', label: 'Low-Resistance Ohmmeter', type: 'text', value: '' },
        { id: 'lroSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'lroAmpId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'piSet', label: 'Primary Injection Test Set', type: 'text', value: '' },
        { id: 'piSetSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'piSetAmpId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
    {
      id: 'electrical-tests',
      title: 'Electrical Tests',
      fields: [
        { id: 'numberOfCircuitSpaces', label: '# of circuit spaces', type: 'number', value: 20 },
        { id: 'electricalTestOrdering', label: 'Ordering', type: 'text', value: 'Sequential' },
        { id: 'tripCurveNumbers', label: 'Trip Curve #’s', type: 'text', value: '' },
        { id: 'panelboardBreakers', label: 'Breakers', type: 'table', value: {} },
      ],
    },
  ],
  'LowVoltageCircuitBreakerThermalMagneticMTSReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
      ],
    },
    {
      id: 'nameplate',
      title: 'Nameplate Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'catalogNumber', label: 'Catalog Number', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'icRating', label: 'IC Rating (kA)', type: 'text', value: '' },
        { id: 'frameSize', label: 'Frame Size (A)', type: 'text', value: '' },
        { id: 'ratingPlug', label: 'Rating Plug', type: 'text', value: '' },
        { id: 'curveNo', label: 'Curve No.', type: 'text', value: '' },
        { id: 'operation', label: 'Operation', type: 'text', value: '' },
        { id: 'mounting', label: 'Mounting', type: 'text', value: '' },
        { id: 'thermalMemory', label: 'Thermal Memory', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual and Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual and Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.6.1.2.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
              { id: '7.6.1.2.A.2', description: 'Inspect physical and mechanical condition.' },
              { id: '7.6.1.2.A.3', description: 'Inspect anchorage and alignment.' },
              { id: '7.6.1.2.A.4', description: 'Verify that all maintenance devices are available for servicing and operating the breaker.' },
              { id: '7.6.1.2.A.5', description: 'Verify the unit is clean.' },
              { id: '7.6.1.2.A.6', description: 'Verify the arc chutes are intact.' },
              { id: '7.6.1.2.A.7', description: 'Inspect moving and stationary contacts for condition and alignment.' },
              { id: '7.6.1.2.A.8', description: 'Verify that primary and secondary contact wipe and other dimensions vital to satisfactory operation of the breaker are correct.' },
              { id: '7.6.1.2.A.9', description: "Perform all mechanical operator and contact alignment tests on both the breaker and its operating mechanism in accordance with manufacturer's published data." },
              { id: '7.6.1.2.A.10.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.6.1.2.B.1.' },
              { id: '7.6.1.2.A.11', description: 'Verify cell fit and element alignment.' },
              { id: '7.6.1.2.A.12', description: 'Verify racking mechanism operation.' },
              { id: '7.6.1.2.A.13', description: 'Verify appropriate lubrication on moving current-carrying parts and on moving and sliding surfaces.' },
              { id: '7.6.1.2.A.14', description: 'Perform adjustments for final protective device settings in accordance with coordination study provided by end user.' },
            ]
          }
        }
      ],
    },
    {
      id: 'counter-reading',
      title: 'Counter Reading',
      fields: [
        { id: 'counterReadingFound', label: 'Counter Reading As Found', type: 'text', value: '' },
        { id: 'counterReadingLeft', label: 'Counter Reading As Left', type: 'text', value: '' },
      ],
    },
    {
      id: 'device-settings',
      title: 'Device Settings',
      fields: [
        { id: 'tmDeviceSettings', label: 'Device Settings', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-contact',
      title: 'Electrical Tests - Contact/Pole Resistance',
      fields: [
        { id: 'breakerContactResistance', label: 'Contact Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-insulation',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'contactorInsulation', label: 'Insulation Resistance / Temperature Corrected', type: 'table', value: {} },
      ],
    },
    {
      id: 'primary-injection',
      title: 'Electrical Tests - Primary Injection',
      fields: [
        { id: 'tmPrimaryInjection', label: 'Primary Injection', type: 'table', value: {} },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'testEquipment3', label: 'Test Equipment Used', type: 'table', value: {} },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'MediumVoltageCableVLFTestWithTanDeltaATS.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'siteAddress', label: 'Address', type: 'text', value: '' },
        { id: 'user', label: 'User', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
      ],
    },
    {
      id: 'cable-termination',
      title: 'Cable & Termination Data',
      fields: [
        { id: 'testedFrom', label: 'Tested From', type: 'text', value: '' },
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'voltageRating', label: 'Cable Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'cableType', label: 'Cable Type', type: 'text', value: '' },
        { id: 'cableLength', label: 'Length (ft)', type: 'text', value: '' },
        { id: 'size', label: 'Conductor Size', type: 'text', value: '' },
        { id: 'insulation', label: 'Insulation Type', type: 'text', value: '' },
        { id: 'conductorMaterial', label: 'Conductor Material', type: 'text', value: '' },
        { id: 'insulationThickness', label: 'Insulation Thickness', type: 'text', value: '' },
        { id: 'from', label: 'From', type: 'text', value: '' },
        { id: 'to', label: 'To', type: 'text', value: '' },
        { id: 'termRatedVoltage', label: 'Termination Rated Voltage (kV)', type: 'text', value: '' },
        { id: 'termRatedVoltage2', label: 'Termination Rated Voltage (kV)', type: 'text', value: '' },
      ],
    },
    {
      id: 'visual-mechanical',
      title: '7.3.3.A Visual and Mechanical Inspection',
      fields: [
        { id: 'vm-table', label: 'Visual and Mechanical', type: 'table', value: { rows: [
          { id: '7.3.3.A.1', description: 'Inspect exposed sections of cables and connectors for physical damage and evidence of degradation and corona.' },
          { id: '7.3.3.A.2', description: 'Inspect terminations and splices for physical damage, evidence of overheating, and corona.' },
          { id: '7.3.3.A.3.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.3.3.B.1.' },
          { id: '7.3.3.A.4', description: 'Inspect shield grounding, cable support.' },
          { id: '7.3.3.A.5', description: 'Verify bends are not less than minimum allowable radius.' },
          { id: '7.3.3.A.7', description: 'If terminated through window-type CTs, verify neutral/ground conductors and shields are correctly placed for device operation.' },
        ] } },
      ],
    },
    {
      id: 'electrical-tests-shield',
      title: 'Electrical Tests - Shield Continuity',
      fields: [ { id: 'mvShieldContinuity', label: 'Shield Continuity', type: 'table', value: {} } ],
    },
    {
      id: 'electrical-tests-ir',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [ { id: 'mvIrPrePost', label: 'Pre/Post + Temp Corrected', type: 'table', value: {} } ],
    },
    {
      id: 'withstand',
      title: 'Electrical Tests - Withstand Test',
      fields: [ { id: 'mvWithstand', label: 'Withstand', type: 'table', value: {} } ],
    },
    {
      id: 'tan-delta',
      title: 'Tan Delta (Power Factor) Test',
      fields: [ { id: 'mvTanDelta', label: 'Tan Delta', type: 'table', value: {} } ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'ohmmeter', label: 'Ohmmeter', type: 'text', value: '' },
        { id: 'ohmSerialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'ohmAmpId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'megohmSerialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'megohmAmpId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'vlfHipot', label: 'VLF Test Set', type: 'text', value: '' },
        { id: 'vlfSerialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'vlfAmpId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
  'LowVoltageSwitchReport.tsx': [
    {
      id: 'job-info',
      title: 'Job Information',
      fields: [
        { id: 'customer', label: 'Customer', type: 'text', value: '' },
        { id: 'jobNumber', label: 'Job #', type: 'text', value: '' },
        { id: 'address', label: 'Address', type: 'text', value: '' },
        { id: 'identifier', label: 'Identifier', type: 'text', value: '' },
        { id: 'technicians', label: 'Technicians', type: 'text', value: '' },
        { id: 'substation', label: 'Substation', type: 'text', value: '' },
        { id: 'date', label: 'Date', type: 'date', value: '' },
        { id: 'eqptLocation', label: 'Eqpt. Location', type: 'text', value: '' },
        { id: 'temperatureF', label: 'Temp. °F', type: 'number', value: '' },
        { id: 'humidity', label: 'Humidity (%)', type: 'number', value: '' },
      ],
    },
    {
      id: 'enclosure-data',
      title: 'Enclosure Data',
      fields: [
        { id: 'manufacturer', label: 'Manufacturer', type: 'text', value: '' },
        { id: 'catalogNo', label: 'Catalog No.', type: 'text', value: '' },
        { id: 'serialNumber', label: 'Serial Number', type: 'text', value: '' },
        { id: 'series', label: 'Series', type: 'text', value: '' },
        { id: 'type', label: 'Type', type: 'text', value: '' },
        { id: 'systemVoltage', label: 'System Voltage', type: 'text', value: '' },
        { id: 'ratedVoltage', label: 'Rated Voltage', type: 'text', value: '' },
        { id: 'ratedCurrent', label: 'Rated Current', type: 'text', value: '' },
        { id: 'aicRating', label: 'AIC Rating (kA)', type: 'text', value: '' },
        { id: 'phaseConfiguration', label: 'Phase Configuration', type: 'text', value: '' },
      ],
    },
    {
      id: 'switch-data',
      title: 'Switch Data',
      fields: [
        { id: 'switchRows', label: 'Switch Rows', type: 'table', value: { rows: [] } },
      ],
    },
    {
      id: 'fuse-data',
      title: 'Fuse Data',
      fields: [
        { id: 'fuseRows', label: 'Fuses', type: 'table', value: { rows: [] } },
      ],
    },
    {
      id: 'electrical-tests-ir',
      title: 'Electrical Tests - Insulation Resistance',
      fields: [
        { id: 'switchIrTables', label: 'Insulation Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'electrical-tests-contact',
      title: 'Electrical Tests - Contact Resistance',
      fields: [
        { id: 'switchContact', label: 'Contact Resistance', type: 'table', value: {} },
      ],
    },
    {
      id: 'visual-mechanical',
      title: 'Visual & Mechanical Inspection',
      fields: [
        {
          id: 'vm-table',
          label: 'Visual & Mechanical Inspection',
          type: 'table',
          value: {
            rows: [
              { id: '7.5.1.1.A.1', description: 'Compare equipment nameplate data with drawings and specifications.' },
              { id: '7.5.1.1.A.2', description: 'Inspect physical and mechanical condition.' },
              { id: '7.5.1.1.A.3', description: 'Inspect anchorage, alignment, grounding, and required clearances.' },
              { id: '7.5.1.1.A.4', description: 'Verify the unit is clean.' },
              { id: '7.5.1.1.A.5', description: 'Verify correct blade alignment, blade penetration, travel stops, and mechanical operation.' },
              { id: '7.5.1.1.A.6', description: 'Verify that fuse sizes and types are in accordance with drawings, short-circuit studies, and coordination study.' },
              { id: '7.5.1.1.A.7', description: 'Verify that each fuse has adequate mechanical support and contact integrity.' },
              { id: '7.5.1.1.A.8.1', description: 'Use of a low-resistance ohmmeter in accordance with Section 7.5.1.1.B.1.' },
              { id: '7.5.1.1.A.9', description: 'Verify operation and sequencing of interlocking systems.' },
              { id: '7.5.1.1.A.10', description: 'Verify correct phase barrier installation.' },
              { id: '7.5.1.1.A.11', description: 'Verify correct operation of all indicating and control devices.' },
              { id: '7.5.1.1.A.12', description: 'Verify appropriate lubrication on moving current-carrying parts and on moving and sliding surfaces.' },
            ]
          }
        },
      ],
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment Used',
      fields: [
        { id: 'megohmmeter', label: 'Megohmmeter', type: 'text', value: '' },
        { id: 'megohmmeterSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'megohmmeterAmpId', label: 'AMP ID', type: 'text', value: '' },
        { id: 'lro', label: 'Low Resistance Ohmmeter', type: 'text', value: '' },
        { id: 'lroSerial', label: 'Serial Number', type: 'text', value: '' },
        { id: 'lroAmpId', label: 'AMP ID', type: 'text', value: '' },
      ],
    },
    {
      id: 'comments',
      title: 'Comments',
      fields: [ { id: 'comments', label: 'Comments', type: 'textarea', value: '' } ],
    },
  ],
};


