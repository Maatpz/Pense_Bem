import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const coverImage = require('../../assets/cover.png');

export default function HomeScreen({ errorMessage, onStart, program }) {
  const [typedCode, setTypedCode] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.hero}>
        <View style={styles.card}>
          <Text style={styles.kicker}>Quiz</Text>
          <Text style={styles.title}>Pense Bem</Text>
          <Text style={styles.subtitle}>{program.subtitle}</Text>
          <Text style={styles.description}>{program.description}</Text>

          <Image source={coverImage} style={styles.coverThumb} resizeMode="cover" />

          <View style={styles.codeBox}>
            <Text style={styles.codeLabel}>Digite o codigo do programa</Text>
            <TextInput
              keyboardType="number-pad"
              maxLength={3}
              onChangeText={setTypedCode}
              placeholder=""
              placeholderTextColor="#8b8b72"
              style={styles.input}
              value={typedCode}
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          </View>

          <Pressable onPress={() => onStart(typedCode)} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
            <Text style={styles.buttonText}>Iniciar</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f2df',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  card: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 520,
    borderRadius: 28,
    padding: 24,
    backgroundColor: '#fffcef',
    borderWidth: 2,
    borderColor: '#1a5f45',
    shadowColor: '#24452c',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 6,
  },
  kicker: {
    color: '#d47a17',
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  title: {
    marginTop: 6,
    color: '#123c2e',
    fontSize: 34,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 4,
    color: '#d2452d',
    fontSize: 20,
    fontWeight: '700',
  },
  description: {
    marginTop: 12,
    color: '#425245',
    fontSize: 16,
    lineHeight: 24,
  },
  coverThumb: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    marginTop: 20,
  },
  codeBox: {
    marginTop: 20,
    gap: 10,
  },
  codeLabel: {
    color: '#123c2e',
    fontSize: 15,
    fontWeight: '700',
  },
  input: {
    borderWidth: 2,
    borderColor: '#d4cfb0',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    color: '#123c2e',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  errorText: {
    color: '#c13d2c',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  button: {
    marginTop: 24,
    borderRadius: 18,
    backgroundColor: '#1a8f4c',
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});
