import { useRef } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface PdfUploaderProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export function PdfUploader({ onFileSelect, isProcessing }: PdfUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    } else if (file) {
      alert('Please select a valid PDF file');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="rounded-full bg-blue-100 p-4">
          <FileText className="h-12 w-12 text-blue-600" />
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-gray-900">Upload PDF Document</h2>
          <p className="text-gray-600 text-sm">
            Select a PDF file to send for digital signing
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
          disabled={isProcessing}
        />

        <Button
          onClick={handleButtonClick}
          disabled={isProcessing}
          className="w-full sm:w-auto"
          size="lg"
        >
          <Upload className="mr-2 h-5 w-5" />
          {isProcessing ? 'Processing...' : 'Choose PDF File'}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Supported format: PDF (max 10MB)
        </p>
      </div>
    </Card>
  );
}
