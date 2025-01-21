import React, { useState } from 'react';

interface Rfp {
  id: number;
  name: string;
  createdDate: string;
  lastUpdate: string;
  status: string;
}

interface UploadedFile {
  id: number;
  rfpName: string;
  fileName: string;
  uploadDate: string;
  status: string;
}

const ManageRfpPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'files'>('list');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Sample data
  const rfps: Rfp[] = [
    { id: 1, name: 'Q1 2024 RFP', createdDate: '2024-01-15', lastUpdate: '2024-01-20', status: 'active' },
    { id: 2, name: 'Tech Provider RFP', createdDate: '2024-01-10', lastUpdate: '2024-01-18', status: 'draft' }
  ];

  const uploadedFiles: UploadedFile[] = [
    { id: 1, rfpName: 'Q1 2024 RFP', fileName: 'requirements.xlsx', uploadDate: '2024-01-15', status: 'processed' },
    { id: 2, rfpName: 'Tech Provider RFP', fileName: 'specs.xlsx', uploadDate: '2024-01-18', status: 'processing' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Manage RFP</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create New RFP
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-4 border-b-2 font-medium ${
                activeTab === 'list'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              RFP List
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`px-4 py-4 border-b-2 font-medium ${
                activeTab === 'files'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Upload Files
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'list' ? (
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3">RFP Name</th>
                  <th className="pb-3">Created Date</th>
                  <th className="pb-3">Last Update</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rfps.map((rfp) => (
                  <tr key={rfp.id} className="border-b">
                    <td className="py-4">{rfp.name}</td>
                    <td className="py-4">{rfp.createdDate}</td>
                    <td className="py-4">{rfp.lastUpdate}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rfp.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rfp.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-gray-600 hover:text-blue-600">Edit</button>
                        <button className="text-gray-600 hover:text-red-600">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              {/* File Upload Area */}
              <div className="mb-6">
                <label className="flex justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                  <div className="text-center">
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium text-blue-600 hover:text-blue-500">
                        Click to upload
                      </span> or drag and drop
                      <p className="mt-1">Excel or Word files up to 10MB</p>
                    </div>
                  </div>
                  <input type="file" className="hidden" />
                </label>
              </div>

              {/* Uploaded Files List */}
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-3">RFP Name</th>
                    <th className="pb-3">File Name</th>
                    <th className="pb-3">Upload Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedFiles.map((file) => (
                    <tr key={file.id} className="border-b">
                      <td className="py-4">{file.rfpName}</td>
                      <td className="py-4">{file.fileName}</td>
                      <td className="py-4">{file.uploadDate}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          file.status === 'processed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {file.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-gray-600 hover:text-red-600">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRfpPage;