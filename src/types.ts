export type ULID = string;

export interface ReportField {
  id: string;
  label: string;
  type: "text" | "number" | "date" | "textarea" | "checkbox" | "select" | "table";
  value: any;
  options?: string[];
  required?: boolean;
}

export interface ReportSection {
  id: string;
  title: string;
  notes?: string;
  fields: ReportField[];
}

export interface ReportAttachment {
  id: string;
  fileName: string;
  originalPath?: string;
  purpose?: string;
}

export interface ReportDraft {
  draftId: ULID;
  reportType: string;
  jobRef?: string;
  author?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  fields: ReportField[];
  sections: ReportSection[];
  attachments: ReportAttachment[];
}

export interface ExportFile {
  schemaVersion: 1;
  exportId: ULID;
  reportType: string;
  jobRef?: string;
  author?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  sections: Array<{
    title: string;
    notes?: string;
    fields: Array<{ label: string; type: string; value: any }>;
  }>;
  attachments: Array<{
    fileName: string;
    purpose?: string;
  }>;
  data?: any; // optional payload to support website import
}

export const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "textarea", label: "Text Area" },
  { value: "checkbox", label: "Checkbox" },
  { value: "select", label: "Select" },
  { value: "table", label: "Table (grid)" }
] as const;

export const REPORT_TYPES = [
  "3-LowVoltageCableATS.tsx",
  "3-LowVoltageCableMTS.tsx",
  "12-CurrentTransformerTestATSReport.tsx",
  "12-CurrentTransformerTestMTSReport.tsx",
  "12setslowvoltagecables.tsx",
  "13-VoltagePotentialTransformerTestMTSReport.tsx",
  "23-MediumVoltageMotorStarterMTSReport.tsx",
  "AutomaticTransferSwitchATSReport.tsx",
  "CurrentTransformerPartialTestATSReport.tsx",
  "DryTypeTransformerReport.tsx",
  "LargeDryTypeTransformerMTSReport.tsx",
  "LargeDryTypeTransformerReport.tsx",
  "LargeDryTypeXfmrMTSReport.tsx",
  "LiquidFilledTransformerReportATS.tsx",
  "LiquidFilledTransformerReport.tsx",
  "LiquidXfmrVisualMTSReport.tsx",
  "LowVoltageCircuitBreakerElectronicTripATSReport.tsx",
  "LowVoltageCircuitBreakerElectronicTripATSSecondaryInjectionReport.tsx",
  "LowVoltageCircuitBreakerElectronicTripMTSReport.tsx",
  "LowVoltageCircuitBreakerThermalMagneticATSReport.tsx",
  "LowVoltageCircuitBreakerThermalMagneticMTSReport.tsx",
  "LowVoltagePanelboardSmallBreakerTestATSReport.tsx",
  "LowVoltageSwitchMultiDeviceTest.tsx",
  "LowVoltageSwitchReport.tsx",
  "MediumVoltageCableVLFTestWithTanDeltaATS.tsx",
  "MediumVoltageCircuitBreakerMTSReport.tsx",
  "MediumVoltageCircuitBreakerReport.tsx",
  "MediumVoltageSwitchOilReport.tsx",
  "MediumVoltageCableVLFMTSTestReport.tsx",
  "MediumVoltageCableVLFATSTest.tsx",
  "MetalEnclosedBuswayReport.tsx",
  "OilInspectionReport.tsx",
  "PanelboardReport.tsx",
  "SwitchgearPanelboardMTSReport.tsx",
  "SwitchgearReport.tsx",
  "TanDeltaATS.tsx",
  "TanDeltaChartMTS.tsx",
  "TanDeltaTestMTSForm.tsx",
  "TwoSmallDryTypeXfmrATSReport.tsx",
  "TwoSmallDryTypeXfmrMTSReport.tsx"
];