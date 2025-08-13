import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReportDraft } from '../types';
import { getAllDrafts, deleteDraft } from '../lib/store';
import { exportReportsBulk } from '../lib/export';
import { formatDisplayDateTime } from '../lib/time';
import { FileText, Edit, Copy, Trash2, ArrowLeft, Search } from 'lucide-react';

export const Drafts: React.FC = () => {
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState<ReportDraft[]>([]);
  const [filteredDrafts, setFilteredDrafts] = useState<ReportDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDrafts();
  }, []);

  useEffect(() => {
    const filtered = drafts.filter(draft =>
      draft.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (draft.jobRef && draft.jobRef.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (draft.author && draft.author.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredDrafts(filtered);
  }, [drafts, searchTerm]);

  const loadDrafts = async () => {
    try {
      const allDrafts = await getAllDrafts();
      setDrafts(allDrafts);
    } catch (error) {
      console.error('Failed to load drafts:', error);
      alert('Failed to load drafts');
    } finally {
      setLoading(false);
    }
  };

  const handleExportAll = async () => {
    if (drafts.length === 0) {
      alert('No drafts to export');
      return;
    }
    try {
      await exportReportsBulk(drafts);
    } catch (error) {
      console.error('Failed to export all drafts:', error);
      alert('Failed to export all drafts');
    }
  };

  const handleOpenDraft = (draftId: string) => {
    navigate(`/editor?draftId=${draftId}`);
  };

  const handleDuplicateDraft = (draft: ReportDraft) => {
    const params = new URLSearchParams({
      duplicate: draft.draftId,
      reportType: draft.reportType,
      jobRef: draft.jobRef || '',
      author: draft.author || ''
    });
    navigate(`/editor?${params.toString()}`);
  };

  const handleDeleteDraft = async (draftId: string) => {
    if (window.confirm('Are you sure you want to delete this draft?')) {
      try {
        await deleteDraft(draftId);
        await loadDrafts();
      } catch (error) {
        console.error('Failed to delete draft:', error);
        alert('Failed to delete draft');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drafts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-md transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Draft Reports</h1>
          </div>

          <div className="flex items-center gap-3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search drafts..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleExportAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Export All
            </button>
          </div>
        </div>

        {filteredDrafts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FileText size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No matching drafts found' : 'No draft reports yet'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Create your first report to get started'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create New Report
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Ref
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sections
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDrafts.map((draft) => (
                    <tr key={draft.draftId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {draft.reportType.replace('.tsx', '')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {draft.jobRef || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {draft.author || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDisplayDateTime(draft.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDisplayDateTime(draft.updatedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {draft.sections.length}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenDraft(draft.draftId)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-md transition-colors"
                            title="Edit draft"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDuplicateDraft(draft)}
                            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-md transition-colors"
                            title="Duplicate draft"
                          >
                            <Copy size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteDraft(draft.draftId)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-md transition-colors"
                            title="Delete draft"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};