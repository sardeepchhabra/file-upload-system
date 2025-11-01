import { Loader2, Shield } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { useEffect, useState } from 'react';

interface SigningProgressProps {
  fileName: string;
}

export function SigningProgress({ fileName }: SigningProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="rounded-full bg-blue-100 p-4 animate-pulse">
          <Shield className="h-12 w-12 text-blue-600" />
        </div>
        
        <div className="text-center space-y-2 w-full">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            <h2 className="text-gray-900">Signing Document</h2>
          </div>
          <p className="text-gray-600 text-sm truncate px-4">
            {fileName}
          </p>
        </div>

        <div className="w-full space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-500 text-center">
            Applying digital signature...
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 w-full">
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span>Validating document integrity</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span>Applying cryptographic signature</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span>Generating signed document</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
