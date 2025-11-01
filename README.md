# PDF Digital Signature App

A modern, secure, and fast web application for digitally signing PDF documents. Built with React, TypeScript, Vite, shadcn/ui (Radix UI primitives), and Tailwind CSS.

---

## Features
- Upload PDF documents for digital signing
- View signing progress and status
- Download/view signed PDF
- Responsive and accessible UI
- Built with professional, maintainable code structure

## Tech Stack
- **React** (with Hooks)
- **TypeScript**
- **Vite** (for fast development and builds)
- **shadcn/ui** (custom UI components built on Radix UI primitives)
- **Tailwind CSS** (utility-first styling)
- **Sonner** (for toast notifications)

## Project Structure

```
src/
  App.tsx                # Main application logic and state
  main.tsx               # React entry point
  components/
    pdf/
      PdfUploader.tsx    # Component for uploading PDFs
      PdfViewer.tsx      # Component for viewing signed PDFs
      SigningProgress.tsx# Component for showing signing progress
    ui/
      Button.tsx         # Reusable button component
      Card.tsx           # Reusable card component
      Input.tsx          # Reusable input component
      Progress.tsx       # Progress bar component
      uiUtils.ts         # Utility functions for UI
  utils/
    mockSigningService.ts# Mock service for PDF signing
  assets/                # Static assets (e.g., images)
  styles/                # Global and Tailwind styles
  guidelines/            # Project guidelines and documentation
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Usage
- Click **Upload** to select a PDF file.
- The app will show signing progress.
- Once signed, you can view or download the signed PDF.
- Click **Reset** to start over.

## Customization
- UI components are located in `src/components/ui/` and are easily reusable.
- PDF logic is in `src/components/pdf/` and `src/utils/mockSigningService.ts`.
- Tailwind CSS can be customized in `tailwind.config.js` (if present).

## Credits
- [shadcn/ui](https://ui.shadcn.com/) for UI patterns
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Vite](https://vitejs.dev/) for build tooling
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

Feel free to contribute or adapt this project for your own needs!
