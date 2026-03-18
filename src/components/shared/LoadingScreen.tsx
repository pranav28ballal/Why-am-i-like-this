import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  message: string;
}

export default function LoadingScreen({ message }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#534AB7] to-[#6B63C5] flex items-center justify-center p-6">
      <div className="w-full max-w-[420px] text-center">
        <div className="mb-8">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-white text-xl font-medium">{message}</p>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
