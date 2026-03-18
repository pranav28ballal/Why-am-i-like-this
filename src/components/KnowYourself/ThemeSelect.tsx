import { ArrowLeft } from 'lucide-react';
import { Theme } from '../../types';

interface ThemeSelectProps {
  onSelectTheme: (theme: Theme) => void;
  onBack: () => void;
}

const themes: Theme[] = [
  {
    id: 'overthink',
    title: 'Why I overthink',
    subtitle: 'Stuck in analysis paralysis',
  },
  {
    id: 'social',
    title: 'Why I act weird socially',
    subtitle: 'The social anxiety spiral',
  },
  {
    id: 'sabotage',
    title: 'Why I self-sabotage',
    subtitle: 'Getting in my own way',
  },
  {
    id: 'focus',
    title: "Why I can't focus",
    subtitle: 'Distracted and scattered',
  },
];

export default function ThemeSelect({ onSelectTheme, onBack }: ThemeSelectProps) {
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

        <h1 className="text-3xl font-bold text-white mb-2">Pick your theme</h1>
        <p className="text-white/80 mb-8">Which one hits closest?</p>

        <div className="space-y-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onSelectTheme(theme)}
              className="w-full bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-left"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {theme.title}
              </h2>
              <p className="text-gray-600 text-sm">{theme.subtitle}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
