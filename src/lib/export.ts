import { open } from '@tauri-apps/plugin-dialog';
import { writeTextFile, copyFile, exists } from '@tauri-apps/plugin-fs';
import { ReportDraft, ExportFile } from '../types';
import { generateId } from './ids';

export const exportReport = async (draft: ReportDraft): Promise<void> => {
  try {
    // Select folder
    const folderPath = await open({ directory: true, multiple: false, title: 'Select folder to save report' });

    if (!folderPath) {
      throw new Error('No folder selected');
    }

    const exportId = generateId();
    const identifierField = draft.sections.flatMap(s => s.fields).find(f => f.id === 'identifier' || f.label.toLowerCase() === 'identifier');
    const identifier = (identifierField?.value || '').toString().trim() || 'UNSET';
    const baseName = draft.reportType.replace(/\.(t|j)sx?$/i, '');
    const safeIdentifier = identifier.replace(/[^\w\-]+/g, '_');
    const fileName = `${baseName}-${safeIdentifier}.amp-report.json`;

    // Prepare export data
    const exportData: ExportFile = {
      schemaVersion: 1,
      exportId,
      reportType: draft.reportType,
      jobRef: draft.jobRef,
      author: draft.author,
      createdAt: draft.createdAt,
      updatedAt: draft.updatedAt,
      version: draft.version,
      sections: draft.sections.map(section => ({
        title: section.title,
        notes: section.notes,
        fields: section.fields.map(field => ({
          label: field.label,
          type: field.type,
          value: field.value
        }))
      })),
      attachments: draft.attachments.map(attachment => ({
        fileName: attachment.fileName,
        purpose: attachment.purpose
      })),
      data: {
        // normalized payload for website import
        identifier,
        reportType: baseName,
        fields: Object.fromEntries(
          draft.sections.flatMap(s => s.fields.map(f => [f.id || f.label, f.value]))
        )
      }
    };

    // Write JSON file
    const jsonPath = `${folderPath}/${fileName}`;
    await writeTextFile(jsonPath, JSON.stringify(exportData, null, 2));

    // Copy attachments
    for (const attachment of draft.attachments) {
      if (attachment.originalPath) {
        const destPath = `${folderPath}/${attachment.fileName}`;
        
        // Check if source file exists
        const sourceExists = await exists(attachment.originalPath);
        if (sourceExists) {
          await copyFile(attachment.originalPath, destPath);
        }
      }
    }

    alert(`Report exported successfully to:\n${jsonPath}`);
  } catch (error) {
    console.error('Export failed:', error);
    alert(`Export failed: ${error}`);
  }
};

export const exportReportsBulk = async (drafts: ReportDraft[]): Promise<void> => {
  try {
    if (!drafts || drafts.length === 0) {
      alert('No drafts to export');
      return;
    }

    const folderPath = await open({ directory: true, multiple: false, title: 'Select folder to save all reports' });

    if (!folderPath) {
      throw new Error('No folder selected');
    }

    let successCount = 0;
    for (const draft of drafts) {
      try {
        const exportId = generateId();
        const identifierField = draft.sections.flatMap(s => s.fields).find(f => f.id === 'identifier' || f.label.toLowerCase() === 'identifier');
        const identifier = (identifierField?.value || '').toString().trim() || 'UNSET';
        const baseName = draft.reportType.replace(/\.(t|j)sx?$/i, '');
        const safeIdentifier = identifier.replace(/[^\w\-]+/g, '_');
        const fileName = `${baseName}-${safeIdentifier}.amp-report.json`;

        const exportData: ExportFile = {
          schemaVersion: 1,
          exportId,
          reportType: draft.reportType,
          jobRef: draft.jobRef,
          author: draft.author,
          createdAt: draft.createdAt,
          updatedAt: draft.updatedAt,
          version: draft.version,
          sections: draft.sections.map(section => ({
            title: section.title,
            notes: section.notes,
            fields: section.fields.map(field => ({
              label: field.label,
              type: field.type,
              value: field.value
            }))
          })),
          attachments: draft.attachments.map(attachment => ({
            fileName: attachment.fileName,
            purpose: attachment.purpose
          })),
          data: {
            identifier,
            reportType: baseName,
            fields: Object.fromEntries(
              draft.sections.flatMap(s => s.fields.map(f => [f.id || f.label, f.value]))
            )
          }
        };

        const jsonPath = `${folderPath}/${fileName}`;
        await writeTextFile(jsonPath, JSON.stringify(exportData, null, 2));

        for (const attachment of draft.attachments) {
          if (attachment.originalPath) {
            const destPath = `${folderPath}/${attachment.fileName}`;
            const sourceExists = await exists(attachment.originalPath);
            if (sourceExists) {
              await copyFile(attachment.originalPath, destPath);
            }
          }
        }

        successCount++;
      } catch (e) {
        console.error('Failed exporting a draft', e);
      }
    }

    alert(`Exported ${successCount} of ${drafts.length} reports to:\n${folderPath}`);
  } catch (error) {
    console.error('Bulk export failed:', error);
    alert(`Bulk export failed: ${error}`);
  }
};