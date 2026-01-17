import React, { useRef, useState } from 'react';
import { UploadCloud, FileType } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/json" || file.name.endsWith(".json")) {
        onFileSelect(file);
      } else {
        alert("Please upload a valid JSON file.");
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative group cursor-pointer
        flex flex-col items-center justify-center
        w-full h-64 rounded-3xl border transition-all duration-300
        ${isDragging 
          ? 'border-accent/50 bg-accent/5 scale-[1.01]' 
          : 'border-subtle bg-surface hover:border-accent/30 hover:bg-surfaceHover'
        }
      `}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept=".json,application/json"
        className="hidden"
      />
      
      <div className="flex flex-col items-center gap-5 p-6 text-center">
        <div className={`
          p-4 rounded-full transition-all duration-300
          ${isDragging ? 'bg-accent text-base' : 'bg-highlight text-text-muted group-hover:text-accent group-hover:bg-accent/10'}
        `}>
          {isDragging ? <UploadCloud className="w-8 h-8" /> : <FileType className="w-8 h-8" />}
        </div>
        
        <div className="space-y-2">
          <p className="text-xl font-serif text-text-main group-hover:text-white transition-colors">
            {isDragging ? 'Drop JSON file' : 'Drop JSON file, or click to select'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
