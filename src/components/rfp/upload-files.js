import React, { useState } from 'react';
import axios from 'axios';

const UploadFiles = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
    setError(null);
    setSuccessMessage('');
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select files to upload');
      return;
    }

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      setUploading(true);
      setError(null);
      await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Files uploaded successfully!');
      setFiles([]);
    } catch (err) {
      setError('Failed to upload files. Please try again.');
      console.error('Error uploading files:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upload Files</h2>
        <p className="text-gray-600">Select and upload your RFP files</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="mb-6">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          disabled={uploading}
        />
      </div>

      {files.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Selected Files:</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="text-gray-600">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload Files'}
      </button>
    </div>
  );
};

export default UploadFiles;
