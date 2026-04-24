import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

const optionPalette = {
  0: {
    badge: '#d84a3a',
    badgeText: '#fff7f4',
    border: '#e4b2aa',
    soft: '#fff0ec',
  },
  1: {
    badge: '#e7c63d',
    badgeText: '#5b4900',
    border: '#eadca0',
    soft: '#fff8d9',
  },
  2: {
    badge: '#3f85d7',
    badgeText: '#eff6ff',
    border: '#abcbed',
    soft: '#eef6ff',
  },
  3: {
    badge: '#38a35a',
    badgeText: '#f3fff6',
    border: '#abd8b8',
    soft: '#edf9f0',
  },
};

function getOptionStyle({ isLocked, isSelected, isCorrect, isWrongSelection }) {
  if (isLocked && isCorrect) {
    return styles.optionCorrect;
  }

  if (isWrongSelection) {
    return styles.optionWrong;
  }

  if (isSelected) {
    return styles.optionSelected;
  }

  return styles.optionDefault;
}

export default function QuestionCard({
  feedback,
  isLocked,
  onSelectOption,
  question,
  revealedCorrectOption,
  selectedOption,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Pergunta {question.numero}</Text>
      </View>

      <Text style={styles.questionText}>{question.question}</Text>

      <View style={styles.optionsList}>
        {question.options.map((option, index) => {
          const palette = optionPalette[index];
          const isSelected = index === selectedOption;
          const isCorrect = index === question.correct;
          const isWrongSelection = !isLocked && isSelected && feedback?.type === 'error';
          const optionStateStyle = getOptionStyle({
            isLocked,
            isSelected,
            isCorrect,
            isWrongSelection,
          });

          return (
            <Pressable
              disabled={isLocked}
              key={`${question.id}-${option}`}
              onPress={() => onSelectOption(index)}
              style={({ pressed }) => [
                styles.optionButton,
                {
                  borderColor: palette.border,
                  backgroundColor: isSelected || isLocked ? palette.soft : '#fffef8',
                },
                optionStateStyle,
                pressed && !isLocked && styles.optionPressed,
              ]}
            >
              <Text
                style={[
                  styles.optionLabel,
                  {
                    backgroundColor: palette.badge,
                    color: palette.badgeText,
                  },
                ]}
              >
                {String.fromCharCode(65 + index)}
              </Text>
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      {revealedCorrectOption ? (
        <View style={styles.answerBox}>
          <Text style={styles.answerLabel}>Resposta correta</Text>
          <Text style={styles.answerText}>
            {String.fromCharCode(65 + question.correct)}. {question.options[question.correct]}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#d8d2b2',
    backgroundColor: '#fffef6',
    padding: Platform.OS === 'web' ? 18 : 20,
    gap: 18,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#f4d157',
  },
  badgeText: {
    color: '#574100',
    fontSize: 13,
    fontWeight: '800',
  },
  questionText: {
    color: '#153629',
    fontSize: Platform.OS === 'web' ? 18 : 22,
    lineHeight: Platform.OS === 'web' ? 28 : 32,
    fontWeight: '800',
  },
  optionsList: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 18,
    borderWidth: 2,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'web' ? 12 : 14,
  },
  optionDefault: {},
  optionSelected: {
    transform: [{ scale: 0.995 }],
  },
  optionCorrect: {
    shadowColor: '#1a8f4c',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  optionWrong: {
    borderColor: '#d44b3b',
  },
  optionPressed: {
    opacity: 0.9,
  },
  optionLabel: {
    width: 44,
    height: 44,
    borderRadius: 999,
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden',
    fontSize: 18,
    fontWeight: '900',
    paddingTop: 10,
  },
  optionText: {
    flex: 1,
    color: '#23352d',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  answerBox: {
    borderRadius: 16,
    backgroundColor: '#f0f6ea',
    padding: 14,
    gap: 4,
  },
  answerLabel: {
    color: '#2e5a31',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  answerText: {
    color: '#1b3420',
    fontSize: 15,
    fontWeight: '700',
  },
});
