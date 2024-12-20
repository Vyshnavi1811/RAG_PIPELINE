import React, { useState } from 'react';
import { FileUpload } from './components/file-upload';
import { ChatInterface } from './components/chat-interface';
import { FileText } from 'lucide-react';

function App() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    // TODO: Implement file processing logic
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900">PDF Chat Assistant</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Upload PDFs</h2>
              <FileUpload onFileSelect={handleFileSelect} />
            </div>

            {files.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-600">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;