import { useRef } from 'react';
import { Home, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ResultProps {
  result: string;
  onHome: () => void;
}

export default function Result({ result, onHome }: ResultProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    const boldMatch = result.match(/\*\*(.*?)\*\*/);
    const firstLineMatch = result.split('\n')[0].trim();
    const patternName = boldMatch ? boldMatch[1] : firstLineMatch;

    const message = `I just found out I'm "${patternName}"\n\nFind out what you are: https://why-am-i-like-this.vercel.app`;

    try {
      if (cardRef.current) {
        const canvas = await html2canvas(cardRef.current, {
          scale: 2,
          backgroundColor: '#534AB7',
          useCORS: true,
        });
        canvas.toBlob(async (blob) => {
          if (blob && navigator.share) {
            const file = new File([blob], 'why-am-i-like-this.png', { type: 'image/png' });
            await navigator.share({
              title: 'Why am I like this?',
              text: message,
              files: [file],
            });
          } else {
            await navigator.share({ title: 'Why am I like this?', text: message });
          }
        });
      }
    } catch (err) {
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
          <div
            className="text-gray-800 whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
            }}
          />
        </div>

        <div
          ref={cardRef}
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '400px',
            height: '200px',
            background: '#534AB7',
            borderRadius: '0px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            boxSizing: 'border-box',
          }}
        >
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '28px',
            fontWeight: '700',
            color: '#FFFFFF',
            margin: '0 0 10px 0',
            textAlign: 'center',
          }}>
            Why am I like this?
          </p>
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.75)',
            margin: 0,
            textAlign: 'center',
          }}>
            understand yourself, finally.
          </p>
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