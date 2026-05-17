import { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import QuestionCard from './QuestionCard';

function getPointsForAttempt(attemptNumber) {
  if (attemptNumber === 1) {
    return 3;
  }

  if (attemptNumber === 2) {
    return 2;
  }

  if (attemptNumber === 3) {
    return 1;
  }

  return 0;
}

export default function QuizScreen({
  attemptsLeft,
  currentIndex,
  currentQuestion,
  program,
  onAdvance,
  onRestart,
  onResolveQuestion,
  onUseAttempt,
  score,
  totalQuestions,
}) {
  const { width } = useWindowDimensions();
  const isNarrow = width < 520;
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [revealedCorrectOption, setRevealedCorrectOption] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setFeedback(null);
    setIsLocked(false);
    setRevealedCorrectOption(false);
  }, [currentQuestion.id]);

  const currentAttemptNumber = 4 - attemptsLeft;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const lastQuestionNumber = program.questions[program.questions.length - 1]?.numero || totalQuestions;
  const shouldShowLegend =
    program.matchingLegend &&
    currentQuestion.options.some((option) => Object.prototype.hasOwnProperty.call(program.matchingLegend, option));

  const handleSelectOption = (optionIndex) => {
    setSelectedOption(optionIndex);

    if (optionIndex === currentQuestion.correct) {
      const earnedPoints = getPointsForAttempt(currentAttemptNumber);
      setFeedback({
        type: 'success',
        text: `Acertou! Voce ganhou ${earnedPoints} ponto${earnedPoints > 1 ? 's' : ''}.`,
      });
      setIsLocked(true);
      setRevealedCorrectOption(true);
      onResolveQuestion(currentAttemptNumber, earnedPoints);
      return;
    }

    if (attemptsLeft > 1) {
      onUseAttempt();
      setFeedback({
        type: 'error',
        text: `Resposta incorreta. Restam ${attemptsLeft - 1} tentativa${attemptsLeft - 1 > 1 ? 's' : ''}.`,
      });
      return;
    }

    setFeedback({
      type: 'error',
      text: 'As tentativas acabaram. A questao foi encerrada sem pontuacao.',
    });
    setIsLocked(true);
    setRevealedCorrectOption(true);
    onResolveQuestion(3, 0);
  };

  return (
    <ScrollView contentContainerStyle={[styles.content, isNarrow && styles.contentNarrow]} style={styles.container}>
      <View style={styles.shell}>
        <View style={[styles.headerCard, isNarrow && styles.headerCardNarrow]}>
        <View style={[styles.headerTopRow, isNarrow && styles.headerTopRowNarrow]}>
          <View style={styles.headerTextBlock}>
            <Text style={styles.headerTitle}>{program.title}</Text>
            <Text style={[styles.headerSubtitle, isNarrow && styles.headerSubtitleNarrow]}>
              Pergunta {currentQuestion.numero} de {lastQuestionNumber}
            </Text>
          </View>

          <View style={[styles.headerRight, isNarrow && styles.headerRightNarrow]}>
            <Pressable
              onPress={onRestart}
              style={({ pressed }) => [
                styles.restartButton,
                isNarrow && styles.restartButtonNarrow,
                pressed && styles.restartButtonPressed,
              ]}
            >
              <Text style={styles.restartButtonText}>Reiniciar game</Text>
            </Pressable>

            <View style={[styles.scorePill, isNarrow && styles.scorePillNarrow]}>
              <Text style={styles.scoreLabel}>Pontuacao</Text>
              <Text style={styles.scoreValue}>{score}</Text>
            </View>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <View style={styles.metaRow}>
          <View style={[styles.metaBadge, isNarrow && styles.metaBadgeNarrow]}>
            <Text style={styles.metaText}>Tentativas restantes: {attemptsLeft}</Text>
          </View>
          <View style={[styles.metaBadge, isNarrow && styles.metaBadgeNarrow]}>
            <Text style={styles.metaText}>Maximo: 90 pontos</Text>
          </View>
        </View>
        </View>

        <QuestionCard
          feedback={feedback}
          isLocked={isLocked}
          onSelectOption={handleSelectOption}
          question={currentQuestion}
          revealedCorrectOption={revealedCorrectOption}
          selectedOption={selectedOption}
        />

        {shouldShowLegend ? (
          <View style={styles.legendCard}>
            <Text style={styles.legendTitle}>Legenda da associacao</Text>
            {Object.entries(program.matchingLegend).map(([key, value]) => (
              <Text key={key} style={styles.legendText}>
                {key} = {value}
              </Text>
            ))}
          </View>
        ) : null}

        {feedback ? (
          <View style={[styles.feedbackCard, feedback.type === 'success' ? styles.feedbackSuccess : styles.feedbackError]}>
            <Text style={styles.feedbackText}>{feedback.text}</Text>
          </View>
        ) : null}

        {isLocked ? (
          <Pressable onPress={onAdvance} style={({ pressed }) => [styles.nextButton, pressed && styles.nextButtonPressed]}>
            <Text style={styles.nextButtonText}>
              {currentIndex + 1 === totalQuestions ? 'Ver resultado final' : 'Proxima pergunta'}
            </Text>
          </Pressable>
        ) : (
          <Text style={styles.helperText}>Toque em uma alternativa para responder.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f2df',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  contentNarrow: {
    padding: 12,
  },
  shell: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 1180 : '100%',
    gap: 18,
  },
  headerCard: {
    borderRadius: 24,
    padding: Platform.OS === 'web' ? 18 : 20,
    backgroundColor: '#123c2e',
    gap: 16,
  },
  headerCardNarrow: {
    borderRadius: 18,
    padding: 14,
    gap: 12,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  headerTopRowNarrow: {
    flexDirection: 'column',
    gap: 12,
  },
  headerTextBlock: {
    flexShrink: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerRightNarrow: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    gap: 8,
  },
  headerTitle: {
    color: '#f4d157',
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerSubtitle: {
    marginTop: 8,
    color: '#fffcef',
    fontSize: Platform.OS === 'web' ? 18 : 24,
    fontWeight: '800',
  },
  headerSubtitleNarrow: {
    fontSize: 20,
  },
  restartButton: {
    borderRadius: 16,
    backgroundColor: '#fff4cf',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  restartButtonNarrow: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  restartButtonPressed: {
    opacity: 0.88,
  },
  restartButtonText: {
    color: '#7b5b0b',
    fontSize: 14,
    fontWeight: '800',
  },
  scorePill: {
    minWidth: 88,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#fff4cf',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  scorePillNarrow: {
    minWidth: 78,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  scoreLabel: {
    color: '#7b5b0b',
    fontSize: 12,
    fontWeight: '700',
  },
  scoreValue: {
    color: '#123c2e',
    fontSize: 26,
    fontWeight: '900',
  },
  progressTrack: {
    height: 14,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#f4d157',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metaBadge: {
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  metaBadgeNarrow: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  metaText: {
    color: '#eaf1e8',
    fontSize: 13,
    fontWeight: '700',
  },
  legendCard: {
    borderRadius: 20,
    backgroundColor: '#fff7df',
    borderWidth: 2,
    borderColor: '#edd388',
    padding: 16,
    gap: 4,
  },
  legendTitle: {
    color: '#7b5b0b',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },
  legendText: {
    color: '#614e18',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  feedbackCard: {
    borderRadius: 18,
    padding: 16,
  },
  feedbackSuccess: {
    backgroundColor: '#daf4de',
  },
  feedbackError: {
    backgroundColor: '#ffe0dc',
  },
  feedbackText: {
    color: '#24352f',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  nextButton: {
    borderRadius: 18,
    backgroundColor: '#d94b33',
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonPressed: {
    opacity: 0.88,
  },
  nextButtonText: {
    color: '#fffef6',
    fontSize: 16,
    fontWeight: '900',
  },
  helperText: {
    textAlign: 'center',
    color: '#57645d',
    fontSize: 14,
    fontWeight: '600',
  },
});
