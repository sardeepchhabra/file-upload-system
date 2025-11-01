export interface SigningResponse {
  success: boolean;
  signedPdfUrl?: string;
  message?: string;
}

export async function signPdfDocument(file: File): Promise<SigningResponse> {
 const delay = 1500 + Math.random() * 1500;
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  try {
    // In a real scenario, the server would:
    // 1. Receive the PDF
    // 2. Apply digital signatures
    // 3. Return the signed PDF
    
    // For this mock, we'll create a signed version by adding metadata
    // In practice, the backend would modify the PDF with actual signatures
    
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    
    // Create a URL for the "signed" PDF
    const signedPdfUrl = URL.createObjectURL(blob);
    
    return {
      success: true,
      signedPdfUrl,
      message: 'PDF successfully signed'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to sign PDF: ' + (error instanceof Error ? error.message : 'Unknown error')
    };
  }
}

/**
 * Clean up blob URLs to prevent memory leaks
 */
export function revokePdfUrl(url: string) {
  URL.revokeObjectURL(url);
}
