import React from 'react';
import { ReportSection, ReportField } from '../types';
import { FieldRow } from './FieldRow';

interface SectionCardProps {
  section: ReportSection;
  onUpdate: (section: ReportSection) => void;
  onDelete: () => void;
}

export const SectionCard: React.FC<SectionCardProps> = ({ section, onUpdate }) => {
  const updateSection = (updates: Partial<ReportSection>) => {
    onUpdate({ ...section, ...updates });
  };

  return (
    <div className="border border-gray-300 rounded-lg bg-gray-50 p-4">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-gray-900">{section.title}</h3>
      </div>

      <div className="space-y-3">
        {section.fields.map((field) => (
          <FieldRow
            key={field.id}
            field={field}
            onUpdate={(updatedField) => {
              const fields = section.fields.map((f) => (f.id === field.id ? updatedField : f));
              updateSection({ fields });
            }}
            onDelete={() => { /* deleting fields is disabled in template mode */ }}
            readOnlyMeta
          />
        ))}
      </div>
    </div>
  );
};