import { Home, Share2 } from 'lucide-react';

interface ResultProps {
  result: string;
  onHome: () => void;
}

export default function Result({ result, onHome }: ResultProps) {
  const handleShare = async () => {
  const boldMatch = result.match(/\*\*(.*?)\*\*/);
  const firstLineMatch = result.split('\n')[0].trim();
  const patternName = boldMatch ? boldMatch[1] : firstLineMatch;
  
  const message = `I just found out I'm "${patternName}" 😭\n\nFind out what you are: https://why-am-i-like-this.vercel.app`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Why am I like this?',
        text: message,
      });
    } catch (err) {
      console.log('Share cancelled');
    }
  } else {
    await navigator.clipboard.writeText(message);
    alert('Copied to clipboard!');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#534AB7] to-[#6B63C5] p-6">
      <div className="w-full max-w-[420px] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Your Pattern</h1>
          <p className="text-white/80">Here's what we found</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
          <div className="prose prose-sm max-w-none">
            <div
              className="text-gray-800 whitespace-pre-wrap leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
              }}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="flex-1 bg-white text-[#534AB7] rounded-xl py-4 font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-all active:scale-95"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
          <button
            onClick={onHome}
            className="flex-1 bg-white/20 text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-all active:scale-95"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
