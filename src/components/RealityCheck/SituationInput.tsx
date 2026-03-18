import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SituationInputProps {
  onNext: (situation: string) => void;
  onBack: () => void;
}

export default function SituationInput({ onNext, onBack }: SituationInputProps) {
  const [situation, setSituation] = useState('');

  const handleNext = () => {
    if (situation.trim()) {
      onNext(situation);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#534AB7] to-[#6B63C5] p-6">
      <div className="w-full max-w-[420px] mx-auto">
        <button
          onClick={onBack}
          className="text-white mb-6 flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            <div className="h-1 flex-1 bg-white rounded-full"></div>
            <div className="h-1 flex-1 bg-white/30 rounded-full"></div>
          </div>
          <p className="text-white/80 text-sm">Step 1 of 2</p>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">What happened?</h1>
        <p className="text-white/80 mb-6">Describe the situation</p>

        <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="I was at a party and someone I barely know asked me about my job. I felt my heart racing and..."
            className="w-full h-40 resize-none border-none outline-none text-gray-800 placeholder:text-gray-400"
          />
        </div>

        <button
          onClick={handleNext}
          disabled={!situation.trim()}
          className="w-full bg-white text-[#534AB7] rounded-xl py-4 font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
