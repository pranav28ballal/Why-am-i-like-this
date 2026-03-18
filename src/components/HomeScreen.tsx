import { Brain, MessageSquare } from 'lucide-react';

interface HomeScreenProps {
  onSelectMode: (mode: 'know-yourself' | 'reality-check') => void;
}

export default function HomeScreen({ onSelectMode }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#534AB7] to-[#6B63C5] flex items-center justify-center p-6">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Why am I like this?
          </h1>
          <p className="text-white/90 text-lg">Understand yourself, finally.</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onSelectMode('know-yourself')}
            className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="bg-[#534AB7] rounded-xl p-3 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Know Yourself
                </h2>
                <p className="text-gray-600">
                  Take a quiz, understand your patterns
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelectMode('reality-check')}
            className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="bg-[#534AB7] rounded-xl p-3 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Reality Check
                </h2>
                <p className="text-gray-600">
                  Tell us what happened. We'll analyze it.
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
