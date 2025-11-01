import { Download, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useEffect, useState } from "react";

interface PdfViewerProps {
  pdfUrl: string;
  fileName: string;
  onReset: () => void;
}

export function PdfViewer({ pdfUrl, fileName, onReset }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `signed_${fileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
    setError(error.message);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center space-x-3">
          <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-green-900">Document Successfully Signed</p>
            <p className="text-sm text-green-700 truncate">{fileName}</p>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center justify-between">
          <span className="text-sm text-gray-700">Signed PDF Preview</span>
          <div className="flex gap-2">
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button onClick={onReset} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
        </div>

        {/* Responsive PDF preview using react-pdf */}
        <div className="bg-gray-100 p-4 flex flex-col items-center justify-center min-h-[400px]">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="p-8 text-gray-600 flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                <p>Loading PDF...</p>
              </div>
            }
            error={
              <div className="p-8 text-red-600 flex flex-col items-center">
                <p className="font-semibold mb-2">Failed to load PDF</p>
                <p className="text-sm text-gray-600">
                  {error || "Unknown error"}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Check browser console for details
                </p>
              </div>
            }
            options={{
              cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
              cMapPacked: true,
              standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
            }}
            className="w-full flex flex-col items-center"
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              width={Math.min(
                600,
                typeof window !== "undefined" ? window.innerWidth - 40 : 600
              )}
              className="shadow-lg"
            />
          </Document>

          {numPages && numPages > 1 && (
            <div className="flex justify-center items-center gap-2 py-4 mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
              >
                Prev
              </Button>
              <span className="text-sm text-gray-700 px-4">
                Page {pageNumber} of {numPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
                disabled={pageNumber >= numPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>

        {/* Iframe fallback for comparison */}
        <div className="bg-gray-100 mt-4 border-t border-gray-200">
          <div className="p-2 bg-gray-50 text-xs text-gray-600 text-center">
            Alternative View (iframe)
          </div>
          <iframe
            src={pdfUrl}
            className="w-full h-[60vh] sm:h-[70vh] border-0"
            title="Signed PDF Document (iframe preview)"
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
