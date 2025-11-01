import { Download, CheckCircle2, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface PdfViewerProps {
  pdfUrl: string;
  fileName: string;
  onReset: () => void;
}

export function PdfViewer({ pdfUrl, fileName, onReset }: PdfViewerProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `signed_${fileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center space-x-3">
          <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-green-900">
              Document Successfully Signed
            </p>
            <p className="text-sm text-green-700 truncate">
              {fileName}
            </p>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center justify-between">
          <span className="text-sm text-gray-700">Signed PDF Preview</span>
          <div className="flex gap-2">
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-100">
          <iframe
            src={pdfUrl}
            className="w-full h-[60vh] sm:h-[70vh] border-0"
            title="Signed PDF Document"
          />
        </div>
      </Card>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          The signed document is now ready for download and use
        </p>
      </div>
    </div>
  );
}
