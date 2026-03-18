import { useState } from 'react';
import { Home, Lightbulb } from 'lucide-react';
import { suggestAlternative } from '../../utils/claude';

interface ResultProps {
  result: string;
  situation: string;
  action: string;
  onHome: () => void;
}

export default function Result({ result, situation, action, onHome }: ResultProps) {
  const [alternative, setAlternative] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAlternative = async () => {
    setLoading(true);
    try {
      const suggestion = await suggestAlternative(situation, action, result);
      setAlternative(suggestion);
    } catch (error) {
      console.error('Error getting alternative:', error);
      alert('Failed to get alternative approach. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#534AB7] to-[#6B63C5] p-6">
      <div className="w-full max-w-[420px] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reality Check</h1>
          <p className="text-white/80">Here's what we found</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl mb-4">
          <div className="prose prose-sm max-w-none">
            <div
              className="text-gray-800 whitespace-pre-wrap leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
              }}
            />
          </div>
        </div>

        {!alternative && (
          <button
            onClick={handleGetAlternative}
            disabled={loading}
            className="w-full bg-white/20 text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-all active:scale-95 mb-4 disabled:opacity-50"
          >
            <Lightbulb className="w-5 h-5" />
            {loading ? 'Thinking...' : 'What could have I done?'}
          </button>
        )}

        {alternative && (
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-white" />
              <h3 className="font-semibold text-white">Alternative Approach</h3>
            </div>
            <p className="text-white/90 leading-relaxed">{alternative}</p>
          </div>
        )}

        <button
          onClick={onHome}
          className="w-full bg-white text-[#534AB7] rounded-xl py-4 font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-all active:scale-95"
        >
          <Home className="w-5 h-5" />
          Home
        </button>
      </div>
    </div>
  );
}
