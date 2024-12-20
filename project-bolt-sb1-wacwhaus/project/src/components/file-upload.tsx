import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { Button } from './ui/button';
import { formatFileSize } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelect(acceptedFiles);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-4">
        <Upload className="w-12 h-12 text-gray-400" />
        {isDragActive ? (
          <p className="text-lg text-center text-blue-500">Drop the PDF files here</p>
        ) : (
          <>
            <p className="text-lg text-center text-gray-600">
              Drag and drop PDF files here, or click to select files
            </p>
            <p className="text-sm text-gray-500">
              Maximum 5 files, up to 10MB each
            </p>
            <Button variant="outline">Select Files</Button>
          </>
        )}
      </div>
    </div>
  );
}