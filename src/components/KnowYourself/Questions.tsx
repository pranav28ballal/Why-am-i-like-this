import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Theme, Question, Answer } from '../../types';

interface QuestionsProps {
  theme: Theme;
  onComplete: (answers: Answer[]) => void;
  onBack: () => void;
}

const questionsByTheme: Record<string, Question[]> = {
  overthink: [
    {
      question: "Someone texts 'we need to talk' with no context. You:",
      options: [
        "Immediately assume the worst and mentally prepare for disaster",
        "Think through 5-10 possible scenarios before responding",
        "Feel mildly curious but don't spiral about it",
      ],
    },
    {
      question: 'After sending a risky text, you:',
      options: [
        "Reread it 20 times analyzing every word choice",
        "Distract yourself but check your phone every 30 seconds",
        "Forget about it and move on with your day",
      ],
    },
    {
      question: 'Making a small decision like what to eat feels:',
      options: [
        "Like a major life choice that requires extensive research",
        "Slightly stressful but manageable",
        "Easy and intuitive",
      ],
    },
  ],
  social: [
    {
      question: 'After a normal conversation, you:',
      options: [
        "Replay every moment, cringing at things you said",
        "Wonder if you came across as too much or too little",
        "Barely remember it and move on",
      ],
    },
    {
      question: 'In a group setting, you tend to:',
      options: [
        "Stay quiet unless directly asked something",
        "Overcompensate by talking too much or being too animated",
        "Contribute naturally without much thought",
      ],
    },
    {
      question: 'When someone laughs near you, your first thought is:',
      options: [
        "They're definitely laughing at something I did",
        "Probably not about me, but maybe?",
        "Just people laughing, no big deal",
      ],
    },
  ],
  sabotage: [
    {
      question: 'When things are going well, you:',
      options: [
        "Wait for it to fall apart or find ways to mess it up",
        "Feel uncomfortable and like you don't deserve it",
        "Enjoy it without second-guessing",
      ],
    },
    {
      question: 'You have a big opportunity coming up. You:',
      options: [
        "Procrastinate or avoid preparing until it's too late",
        "Convince yourself you're not ready and consider backing out",
        "Prepare normally and feel excited",
      ],
    },
    {
      question: 'Someone compliments you genuinely. You:',
      options: [
        "Deflect, downplay, or reject it entirely",
        "Feel awkward and assume they're just being nice",
        "Accept it and feel good about it",
      ],
    },
  ],
  focus: [
    {
      question: 'You sit down to work on something important. Within 5 minutes:',
      options: [
        "You've opened 7 tabs and are doing something completely different",
        "You're fighting the urge to check your phone or switch tasks",
        "You're locked in and making progress",
      ],
    },
    {
      question: 'Your mind during conversations is:',
      options: [
        "Constantly wandering to other thoughts mid-sentence",
        "Mostly present but occasionally drifting",
        "Fully engaged and tracking everything",
      ],
    },
    {
      question: 'Starting a task that requires sustained focus feels:',
      options: [
        "Nearly impossible without extreme pressure or a deadline",
        "Difficult but doable with effort",
        "Manageable and natural",
      ],
    },
  ],
  guilty: [
    {
      question: "You say no to a friend's plan. Immediately after, you:",
      options: [
        "Apologize three times and offer to make it up to them",
        "Feel bad for hours even though it was completely valid",
        "Move on without much thought",
      ],
    },
    {
      question: 'Something goes wrong in a group. Your first instinct is:',
      options: [
        "Assume it was somehow your fault",
        "Wonder if you could have prevented it",
        "Look at what actually caused it without blaming yourself",
      ],
    },
    {
      question: 'Someone is in a bad mood around you. You:',
      options: [
        "Immediately think you did something wrong",
        "Feel uneasy until you figure out if it's about you",
        "Give them space and don't take it personally",
      ],
    },
  ],
  defensive: [
    {
      question: "Someone gives you feedback you didn't ask for. You:",
      options: [
        "Feel attacked and immediately explain why they're wrong",
        "Listen but feel your chest tighten and replay it for hours",
        "Take it in and decide if it's useful",
      ],
    },
    {
      question: 'A close friend points out a habit of yours. You:',
      options: [
        "Point out one of their flaws right back",
        "Feel hurt but pretend you're fine with it",
        "Actually consider whether they have a point",
      ],
    },
    {
      question: 'You make a mistake in front of others. You:',
      options: [
        "Immediately justify it or blame something else",
        "Feel embarrassed and over-explain yourself",
        "Own it and move on",
      ],
    },
  ],
  compare: [
    {
      question: 'A friend gets something you wanted — a grade, a job, attention. You:',
      options: [
        "Feel genuinely happy for them but quietly devastated inside",
        "Start questioning what's wrong with you",
        "Feel happy for them without it affecting how you see yourself",
      ],
    },
    {
      question: "You scroll through someone's life online and you:",
      options: [
        "Feel like your own life suddenly looks smaller",
        "Notice yourself picking apart what they have that you don't",
        "Barely register it and keep scrolling",
      ],
    },
    {
      question: 'When you achieve something, your first thought is:',
      options: [
        "Who else has done this better or faster than me",
        "Is this actually good enough compared to others",
        "I worked hard for this and it feels good",
      ],
    },
  ],
};

export default function Questions({ theme, onComplete, onBack }: QuestionsProps) {
  const questions = questionsByTheme[theme.id] || questionsByTheme.overthink;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleAnswer = (answer: string, index: number) => {
    setSelectedIndex(index);
    setTimeout(() => {
      const newAnswers = [
        ...answers,
        { question: questions[currentQuestion].question, answer },
      ];
      setAnswers(newAnswers);
      setSelectedIndex(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onComplete(newAnswers);
      }
    }, 300);
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
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all ${
                  index <= currentQuestion ? 'bg-white' : 'bg-white/30'
                }`}
              ></div>
            ))}
          </div>
          <p className="text-white/80 text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {questions[currentQuestion].question}
          </h2>

          <div key={currentQuestion} className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option, index)}
                disabled={selectedIndex !== null}
                className={`w-full rounded-xl p-4 text-left transition-all duration-200 border-2 ${
                  selectedIndex === index
                    ? 'bg-[#534AB7] text-white border-[#534AB7]'
                    : 'bg-gray-50 text-gray-700 border-transparent'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}