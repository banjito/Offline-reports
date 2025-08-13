import React from 'react';
import { ReportAttachment } from '../types';
import { open } from '@tauri-apps/plugin-dialog';
import { Plus, Trash2, File } from 'lucide-react';
import { generateId } from '../lib/ids';

interface AttachmentsProps {
  attachments: ReportAttachment[];
  onUpdate: (attachments: ReportAttachment[]) => void;
}

export const Attachments: React.FC<AttachmentsProps> = ({ attachments, onUpdate }) => {
  const addAttachments = async () => {
    try {
      const selected = await open({
        multiple: true,
        title: 'Select files to attach',
        filters: [{
          name: 'All Files',
          extensions: ['*']
        }]
      });

      if (selected && Array.isArray(selected)) {
        const newAttachments: ReportAttachment[] = selected.map((filePath) => ({
          id: generateId(),
          fileName: filePath.split('/').pop() || filePath.split('\\').pop() || 'unknown',
          originalPath: filePath,
          purpose: ''
        }));

        onUpdate([...attachments, ...newAttachments]);
      } else if (selected) {
        // Single file selected
        const newAttachment: ReportAttachment = {
          id: generateId(),
          fileName: selected.split('/').pop() || selected.split('\\').pop() || 'unknown',
          originalPath: selected,
          purpose: ''
        };

        onUpdate([...attachments, newAttachment]);
      }
    } catch (error) {
      console.error('Failed to select files:', error);
      alert('Failed to select files');
    }
  };

  const updateAttachment = (id: string, updates: Partial<ReportAttachment>) => {
    const updated = attachments.map(att => 
      att.id === id ? { ...att, ...updates } : att
    );
    onUpdate(updated);
  };

  const removeAttachment = (id: string) => {
    const updated = attachments.filter(att => att.id !== id);
    onUpdate(updated);
  };

  return (
    <div className="border border-gray-300 rounded-lg bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Attachments</h3>
        <button
          onClick={addAttachments}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus size={16} />
          Add Files
        </button>
      </div>

      {attachments.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No attachments added yet</p>
      ) : (
        <div className="space-y-3">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-md bg-gray-50">
              <File size={20} className="text-gray-500 flex-shrink-0" />
              
              <div className="flex-1">
                <div className="font-medium text-gray-900">{attachment.fileName}</div>
                {attachment.originalPath && (
                  <div className="text-xs text-gray-500 truncate">{attachment.originalPath}</div>
                )}
              </div>
              
              <div className="flex-1">
                <input
                  type="text"
                  value={attachment.purpose || ''}
                  onChange={(e) => updateAttachment(attachment.id, { purpose: e.target.value })}
                  placeholder="Purpose/description..."
                  className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button
                onClick={() => removeAttachment(attachment.id)}
                className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors flex-shrink-0"
                title="Remove attachment"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};