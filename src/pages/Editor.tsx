import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ReportDraft, ReportSection } from '../types';
import { SectionCard } from '../components/SectionCard';
import { Attachments } from '../components/Attachments';
import { saveDraft, getDraft } from '../lib/store';
import { exportReport } from '../lib/export';
import { generateId } from '../lib/ids';
import { now, formatDisplayDateTime } from '../lib/time';
import { ArrowLeft, Save, Download } from 'lucide-react';
import { convertFahrenheitToCelsius, getTCF, applyTCF } from '../lib/tcf';
import { REPORT_TEMPLATES } from '../lib/templates';

export const Editor: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [draft, setDraft] = useState<ReportDraft | null>(null);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    initializeDraft();
    const handleBeforeUnload = () => {
      setSaving(false);
      setExporting(false);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const initializeDraft = async () => {
    const draftId = searchParams.get('draftId');
    const duplicate = searchParams.get('duplicate');
    const isNew = searchParams.get('isNew');

    const migrateDraftIfNeeded = (incoming: ReportDraft): ReportDraft => {
      // Only migrate LowVoltageSwitchReport contact resistance field id
      if (incoming.reportType === 'LowVoltageSwitchReport.tsx') {
        const migratedSections = incoming.sections.map((section) => ({
          ...section,
          fields: section.fields.map((f) => {
            if (f.id === 'switchContact') {
              return { ...f, id: 'switchContactLV' };
            }
            return f;
          }),
        }));
        return { ...incoming, sections: migratedSections };
      }
      return incoming;
    };

    if (duplicate) {
      // Duplicate existing draft
      const original = await getDraft(duplicate);
      if (original) {
        const newDraft: ReportDraft = {
          ...original,
          draftId: generateId(),
          createdAt: now(),
          updatedAt: now(),
          version: 1
        };
        setDraft(migrateDraftIfNeeded(newDraft));
      }
    } else if (draftId && !isNew) {
      // Load existing draft
      const existingDraft = await getDraft(draftId);
      if (existingDraft) {
        setDraft(migrateDraftIfNeeded(existingDraft));
      } else {
        alert('Draft not found');
        navigate('/');
      }
    } else {
      // New draft
      const newDraft: ReportDraft = {
        draftId: searchParams.get('draftId') || generateId(),
        reportType: searchParams.get('reportType') || '',
        jobRef: searchParams.get('jobRef') || undefined,
        author: searchParams.get('author') || undefined,
        createdAt: searchParams.get('createdAt') || now(),
        updatedAt: now(),
        version: 1,
        fields: [],
        sections: (() => {
          const type = searchParams.get('reportType') || '';
          const template = REPORT_TEMPLATES[type];
          if (!template) return [];
          // Deep copy to avoid mutating the template
          return template.map(sec => ({
            id: sec.id,
            title: sec.title,
            notes: sec.notes,
            fields: sec.fields.map(f => ({ ...f }))
          }));
        })(),
        attachments: []
      };
      setDraft(newDraft);
    }
  };

  const updateDraft = (updates: Partial<ReportDraft>) => {
    if (!draft) return;
    
    const updatedDraft = {
      ...draft,
      ...updates,
      updatedAt: now(),
      version: draft.version + 1
    };
    setDraft(updatedDraft);
  };

  // Derive temperature conversions for grid
  const temperatureF = draft?.sections
    ? Number(
        draft.sections
          .flatMap((s) => s.fields)
          .find((f) => f.id === 'temperatureF')?.value ?? NaN
      )
    : undefined;

  const addSection = () => {};

  const updateSection = (sectionId: string, updatedSection: ReportSection) => {
    if (!draft) return;
    
    const sections = draft.sections.map(s => 
      s.id === sectionId ? updatedSection : s
    );
    // if numberOfCables changes, resize the electricalGrid rows
    const numField = updatedSection.fields.find((f) => f.id === 'numberOfCables');
    if (numField) {
      const count = Math.max(1, Math.min(60, Number(numField.value) || 1));
      const gridField = updatedSection.fields.find((f) => f.id === 'electricalGrid');
      if (gridField && gridField.value) {
        const rows = Array.from({ length: count }, (_, i) => gridField.value.rows[i] || { result: 'PASS' });
        gridField.value = { rows };
      }
    }
    updateDraft({ sections });
  };

  const deleteSection = (_sectionId: string) => {};

  const handleSaveDraft = async () => {
    if (!draft) return;
    
    setSaving(true);
    try {
      await saveDraft(draft);
      alert('Draft saved successfully!');
    } catch (error) {
      console.error('Failed to save draft:', error);
      alert('Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    if (!draft) return;
    
    setExporting(true);
    try {
      await exportReport(draft);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  if (!draft) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading draft...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <div className="text-lg font-semibold text-gray-900">
                {draft.reportType.replace('.tsx', '')}
              </div>
            </div>
            
            {/* Removed Job Reference and Author as they will be auto-populated externally */}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-xs text-gray-500">
            <div>Created: {formatDisplayDateTime(draft.createdAt)}</div>
            <div>Updated: {formatDisplayDateTime(draft.updatedAt)}</div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Report Sections</h2>
          
          {draft.sections.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 mb-4">No sections added yet</p>
              <button
                onClick={addSection}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Your First Section
              </button>
            </div>
          ) : (
            draft.sections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                onUpdate={(updatedSection) => updateSection(section.id, updatedSection)}
                onDelete={() => deleteSection(section.id)}
              />
            ))
          )}
        </div>

        {/* Attachments removed per requirements */}

        {/* Footer Actions */}
        <div className="bg-white rounded-lg shadow-md p-4 sticky bottom-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="text-sm text-gray-600">
              Draft ID: {draft.draftId} • Version: {draft.version}
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleSaveDraft}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <Save size={16} />
                {saving ? 'Saving...' : 'Save Draft'}
              </button>
              
              <button
                onClick={handleExport}
                disabled={exporting}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Download size={16} />
                {exporting ? 'Exporting...' : 'Save to Files'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};