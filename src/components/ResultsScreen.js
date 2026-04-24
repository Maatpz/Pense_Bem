import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ResultsScreen({ onRestart, program, score, stats }) {
  const percentage = Math.round((score / program.maxScore) * 100);

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.container}>
      <View style={styles.shell}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>Fim de jogo</Text>
          <Text style={styles.title}>Resultado final</Text>
          <Text style={styles.subtitle}>{program.title}</Text>
        </View>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Pontuacao total</Text>
          <Text style={styles.scoreValue}>{score}</Text>
          <Text style={styles.scoreCaption}>de {program.maxScore} pontos possiveis</Text>
          <Text style={styles.percentage}>{percentage}% de aproveitamento</Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Acertos na 1a tentativa</Text>
            <Text style={styles.metricValue}>{stats.firstTry}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Acertos na 2a tentativa</Text>
            <Text style={styles.metricValue}>{stats.secondTry}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Acertos na 3a tentativa</Text>
            <Text style={styles.metricValue}>{stats.thirdTry}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Erros</Text>
            <Text style={styles.metricValue}>{stats.errors}</Text>
          </View>
        </View>

        <Pressable onPress={onRestart} style={({ pressed }) => [styles.restartButton, pressed && styles.restartButtonPressed]}>
          <Text style={styles.restartButtonText}>Jogar novamente</Text>
        </Pressable>
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
  shell: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 980 : '100%',
    gap: 20,
  },
  hero: {
    borderRadius: 28,
    backgroundColor: '#123c2e',
    padding: 24,
  },
  kicker: {
    color: '#f4d157',
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  title: {
    marginTop: 8,
    color: '#fffef6',
    fontSize: 34,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 6,
    color: '#d9eadc',
    fontSize: 18,
    fontWeight: '700',
  },
  scoreCard: {
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#edd388',
    backgroundColor: '#fff7df',
    padding: 24,
    alignItems: 'center',
  },
  scoreLabel: {
    color: '#7b5b0b',
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  scoreValue: {
    marginTop: 10,
    color: '#d94b33',
    fontSize: 62,
    fontWeight: '900',
  },
  scoreCaption: {
    color: '#4f5d55',
    fontSize: 15,
    fontWeight: '600',
  },
  percentage: {
    marginTop: 12,
    color: '#123c2e',
    fontSize: 20,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  metricCard: {
    minWidth: '47%',
    flexGrow: 1,
    borderRadius: 22,
    backgroundColor: '#fffef6',
    borderWidth: 2,
    borderColor: '#d8d2b2',
    padding: 18,
    gap: 10,
  },
  metricLabel: {
    color: '#4b5c55',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  metricValue: {
    color: '#123c2e',
    fontSize: 34,
    fontWeight: '900',
  },
  restartButton: {
    borderRadius: 18,
    backgroundColor: '#1a8f4c',
    paddingVertical: 16,
    alignItems: 'center',
  },
  restartButtonPressed: {
    opacity: 0.88,
  },
  restartButtonText: {
    color: '#fffef6',
    fontSize: 16,
    fontWeight: '900',
  },
});
