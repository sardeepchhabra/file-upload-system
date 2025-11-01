import { useState } from "react";
import { FileSignature } from "lucide-react";
import { PdfUploader } from "./components/PdfUploader";
import { PdfViewer } from "./components/PdfViewer";
import { SigningProgress } from "./components/SigningProgress";
import { signPdfDocument, revokePdfUrl } from "./utils/mockSigningService";
import { toast } from "sonner";

type AppState = "upload" | "signing" | "viewing";

export default function App() {
  const [state, setState] = useState<AppState>("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [signedPdfUrl, setSignedPdfUrl] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setState("signing");

    try {
      const response = await signPdfDocument(file);

      if (response.success && response.signedPdfUrl) {
        setSignedPdfUrl(response.signedPdfUrl);
        setState("viewing");
        toast.success("PDF signed successfully!");
      } else {
        throw new Error(response.message || "Failed to sign PDF");
      }
    } catch (error) {
      toast.error("Failed to sign PDF. Please try again.");
      setState("upload");
      setSelectedFile(null);
    }
  };

  const handleReset = () => {
    if (signedPdfUrl) {
      revokePdfUrl(signedPdfUrl);
    }
    setSignedPdfUrl(null);
    setSelectedFile(null);
    setState("upload");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-blue-600 p-3">
              <FileSignature className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-gray-900 mb-2">PDF Digital Signature</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your PDF document to apply a digital signature securely
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {state === "upload" && (
            <PdfUploader onFileSelect={handleFileSelect} isProcessing={false} />
          )}

          {state === "signing" && selectedFile && (
            <SigningProgress fileName={selectedFile.name} />
          )}

          {state === "viewing" && signedPdfUrl && selectedFile && (
            <PdfViewer
              pdfUrl={signedPdfUrl}
              fileName={selectedFile.name}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>Secure • Fast</p>
        </div>
      </div>
    </div>
  );
}
