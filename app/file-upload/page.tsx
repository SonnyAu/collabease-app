"use client";

import React, { useState } from "react";

type UploadedFile = {
  file: File;
  preview: string | null; // Holds the image URL if it's an image file
};

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => {
        // Check if the file is an image
        const isImage = file.type.startsWith("image/");
        let preview = null;

        // If it's an image, create a URL for it
        if (isImage) {
          preview = URL.createObjectURL(file);
        }

        return { file, preview };
      });

      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  // Handle file deletion
  const handleDeleteFile = (index: number) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* File Upload Section */}
      <div className="mb-4">
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="mb-4"
        />
      </div>

      {/* Display Uploaded Files in a Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {uploadedFiles.map((uploadedFile, index) => (
          <div
            key={index}
            className="relative p-4 bg-white border border-gray-300 shadow-sm rounded-md flex flex-col items-center group"
          >
            {/* Circular 'X' Delete Button */}
            <button
              onClick={() => handleDeleteFile(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete"
            >
              &times;
            </button>

            {uploadedFile.preview ? (
              // Display image preview if it's an image file
              <img
                src={uploadedFile.preview}
                alt={uploadedFile.file.name}
                className="w-full h-32 object-cover mb-2 rounded"
              />
            ) : (
              // Display file icon or name if it's not an image
              <div className="w-full h-32 flex items-center justify-center bg-gray-200 mb-2 rounded">
                <span className="text-sm text-gray-500">
                  {uploadedFile.file.name}
                </span>
              </div>
            )}

            {/* File name and size */}
            <div className="text-sm font-medium text-gray-700 truncate w-full text-center">
              {uploadedFile.file.name}
            </div>
            <div className="text-xs text-gray-500">
              {(uploadedFile.file.size / 1024).toFixed(2)} KB
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
