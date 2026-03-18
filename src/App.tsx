import { useState } from 'react';
import { Screen, Theme, Answer } from './types';
import HomeScreen from './components/HomeScreen';
import ThemeSelect from './components/KnowYourself/ThemeSelect';
import Questions from './components/KnowYourself/Questions';
import KnowYourselfResult from './components/KnowYourself/Result';
import SituationInput from './components/RealityCheck/SituationInput';
import ActionInput from './components/RealityCheck/ActionInput';
import RealityCheckResult from './components/RealityCheck/Result';
import LoadingScreen from './components/shared/LoadingScreen';
import { analyzeKnowYourself, analyzeRealityCheck } from './utils/claude';

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [knowYourselfResult, setKnowYourselfResult] = useState<string>('');
  const [realityCheckResult, setRealityCheckResult] = useState<string>('');
  const [situation, setSituation] = useState<string>('');
  const [action, setAction] = useState<string>('');

  const handleSelectMode = (mode: 'know-yourself' | 'reality-check') => {
    if (mode === 'know-yourself') {
      setScreen('know-yourself-theme');
    } else {
      setScreen('reality-check-situation');
    }
  };

  const handleSelectTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    setScreen('know-yourself-questions');
  };

  const handleCompleteQuestions = async (answers: Answer[]) => {
    setScreen('know-yourself-loading');
    try {
      const result = await analyzeKnowYourself(selectedTheme!.title, answers);
      setKnowYourselfResult(result);
      setScreen('know-yourself-result');
    } catch (error) {
      console.error('Error analyzing:', error);
      alert('Failed to analyze. Please check your API key and try again.');
      setScreen('know-yourself-questions');
    }
  };

  const handleSituationNext = (situationText: string) => {
    setSituation(situationText);
    setScreen('reality-check-action');
  };

  const handleActionNext = async (actionText: string) => {
    setAction(actionText);
    setScreen('reality-check-loading');
    try {
      const result = await analyzeRealityCheck(situation, actionText);
      setRealityCheckResult(result);
      setScreen('reality-check-result');
    } catch (error) {
      console.error('Error analyzing:', error);
      alert('Failed to analyze. Please check your API key and try again.');
      setScreen('reality-check-action');
    }
  };

  const handleHome = () => {
    setScreen('home');
    setSelectedTheme(null);
    setKnowYourselfResult('');
    setRealityCheckResult('');
    setSituation('');
    setAction('');
  };

  return (
    <>
      {screen === 'home' && <HomeScreen onSelectMode={handleSelectMode} />}

      {screen === 'know-yourself-theme' && (
        <ThemeSelect
          onSelectTheme={handleSelectTheme}
          onBack={handleHome}
        />
      )}

      {screen === 'know-yourself-questions' && selectedTheme && (
        <Questions
          theme={selectedTheme}
          onComplete={handleCompleteQuestions}
          onBack={() => setScreen('know-yourself-theme')}
        />
      )}

      {screen === 'know-yourself-loading' && (
        <LoadingScreen message="Figuring you out..." />
      )}

      {screen === 'know-yourself-result' && (
        <KnowYourselfResult
          result={knowYourselfResult}
          onHome={handleHome}
        />
      )}

      {screen === 'reality-check-situation' && (
        <SituationInput
          onNext={handleSituationNext}
          onBack={handleHome}
        />
      )}

      {screen === 'reality-check-action' && (
        <ActionInput
          onNext={handleActionNext}
          onBack={() => setScreen('reality-check-situation')}
        />
      )}

      {screen === 'reality-check-loading' && (
        <LoadingScreen message="Reading between the lines..." />
      )}

      {screen === 'reality-check-result' && (
        <RealityCheckResult
          result={realityCheckResult}
          situation={situation}
          action={action}
          onHome={handleHome}
        />
      )}
    </>
  );
}

export default App;
