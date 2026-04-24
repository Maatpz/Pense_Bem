import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useState } from 'react';

import HomeScreen from './src/components/HomeScreen';
import QuizScreen from './src/components/QuizScreen';
import ResultsScreen from './src/components/ResultsScreen';
import { programAccessCode } from './src/data/zeCariocaProgram1';
import { getProgramByCode } from './src/data/programs';

const createInitialStats = () => ({
  firstTry: 0,
  secondTry: 0,
  thirdTry: 0,
  errors: 0,
});

export default function App() {
  const [screen, setScreen] = useState('home');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState(createInitialStats());
  const [activeProgram, setActiveProgram] = useState(getProgramByCode(programAccessCode));

  const currentQuestion = activeProgram?.questions[currentIndex];

  const resetQuiz = () => {
    setScreen('home');
    setErrorMessage('');
    setCurrentIndex(0);
    setAttemptsLeft(3);
    setScore(0);
    setStats(createInitialStats());
    setActiveProgram(getProgramByCode(programAccessCode));
  };

  const startProgram = (typedCode) => {
    const normalizedCode = typedCode.trim();
    const selectedProgram = getProgramByCode(normalizedCode);

    if (!selectedProgram) {
      setErrorMessage('Codigo invalido');
      return;
    }

    setErrorMessage('');
    setCurrentIndex(0);
    setAttemptsLeft(3);
    setScore(0);
    setStats(createInitialStats());
    setActiveProgram(selectedProgram);
    setScreen('quiz');
  };

  const registerResult = (attemptNumber, earnedPoints) => {
    if (attemptNumber === 1) {
      setStats((previous) => ({ ...previous, firstTry: previous.firstTry + 1 }));
    } else if (attemptNumber === 2) {
      setStats((previous) => ({ ...previous, secondTry: previous.secondTry + 1 }));
    } else if (attemptNumber === 3 && earnedPoints === 1) {
      setStats((previous) => ({ ...previous, thirdTry: previous.thirdTry + 1 }));
    } else {
      setStats((previous) => ({ ...previous, errors: previous.errors + 1 }));
    }

    setScore((previous) => previous + earnedPoints);
  };

  const goToNextQuestion = () => {
    const isLastQuestion = currentIndex === activeProgram.questions.length - 1;

    if (isLastQuestion) {
      setScreen('results');
      return;
    }

    setCurrentIndex((previous) => previous + 1);
    setAttemptsLeft(3);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        {screen === 'home' && (
          <HomeScreen
            errorMessage={errorMessage}
            onStart={startProgram}
            program={activeProgram}
          />
        )}

        {screen === 'quiz' && currentQuestion && (
          <QuizScreen
            currentIndex={currentIndex}
            currentQuestion={currentQuestion}
            attemptsLeft={attemptsLeft}
            score={score}
            totalQuestions={activeProgram.questions.length}
            program={activeProgram}
            onRestart={resetQuiz}
            onResolveQuestion={(attemptNumber, earnedPoints) => {
              registerResult(attemptNumber, earnedPoints);
            }}
            onUseAttempt={() => setAttemptsLeft((previous) => previous - 1)}
            onAdvance={goToNextQuestion}
          />
        )}

        {screen === 'results' && (
          <ResultsScreen
            program={activeProgram}
            score={score}
            stats={stats}
            onRestart={resetQuiz}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f2df',
  },
  appShell: {
    flex: 1,
  },
});
