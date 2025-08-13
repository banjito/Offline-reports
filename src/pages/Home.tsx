import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, Plus } from 'lucide-react';
import { REPORT_TYPES } from '../types';
import { generateId } from '../lib/ids';
import { now } from '../lib/time';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('');
  const [customType, setCustomType] = useState('');
  const [jobRef, setJobRef] = useState('');
  const [author, setAuthor] = useState('');
  const [isCustomType, setIsCustomType] = useState(false);

  const handleNewDraft = () => {
    const selectedType = isCustomType ? customType : reportType;
    
    if (!selectedType.trim()) {
      alert('Please select or enter a report type');
      return;
    }

    const draftId = generateId();
    const params = new URLSearchParams({
      draftId,
      reportType: selectedType.trim(),
      jobRef: jobRef.trim(),
      author: author.trim(),
      createdAt: now(),
      isNew: 'true'
    });

    navigate(`/editor?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AMP Report Builder</h1>
          <p className="text-gray-600">Create professional reports with dynamic forms and attachments</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Report</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type *
              </label>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="preset-type"
                    name="type-selection"
                    checked={!isCustomType}
                    onChange={() => setIsCustomType(false)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="preset-type" className="text-sm text-gray-700">
                    Select from preset types
                  </label>
                </div>
                
                {!isCustomType && (
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select report type...</option>
                    {REPORT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type.replace('.tsx', '')}
                      </option>
                    ))}
                  </select>
                )}
                
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="custom-type"
                    name="type-selection"
                    checked={isCustomType}
                    onChange={() => setIsCustomType(true)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="custom-type" className="text-sm text-gray-700">
                    Enter custom type
                  </label>
                </div>
                
                {isCustomType && (
                  <input
                    type="text"
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value)}
                    placeholder="Enter custom report type..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Reference
              </label>
              <input
                type="text"
                value={jobRef}
                onChange={(e) => setJobRef(e.target.value)}
                placeholder="Optional job reference..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Optional author name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handleNewDraft}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus size={20} />
              Create New Draft
            </button>
            
            <button
              onClick={() => navigate('/drafts')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
            >
              <Clock size={20} />
              Open Existing Drafts
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <FileText size={32} className="mx-auto mb-2 text-blue-600" />
              <h4 className="font-medium text-gray-900">Dynamic Forms</h4>
              <p className="text-sm text-gray-600">Create custom sections and fields</p>
            </div>
            <div className="p-4">
              <Plus size={32} className="mx-auto mb-2 text-green-600" />
              <h4 className="font-medium text-gray-900">Attachments</h4>
              <p className="text-sm text-gray-600">Add files and images</p>
            </div>
            <div className="p-4">
              <Clock size={32} className="mx-auto mb-2 text-purple-600" />
              <h4 className="font-medium text-gray-900">Draft Saving</h4>
              <p className="text-sm text-gray-600">Save and resume work offline</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};