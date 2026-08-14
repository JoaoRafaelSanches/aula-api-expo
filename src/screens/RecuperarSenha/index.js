import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';

// Tela: RecuperarSenha
// Simples formulário que solicita o email cadastrado e envia
// instruções para redefinição de senha (mock). Comentários em PT-BR.
export default function RecuperarSenhaScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const validateEmail = (value) => {
    return typeof value === 'string' && value.includes('@');
  };

  const handleEnviar = () => {
    if (!email) {
      Alert.alert('Aviso', 'Preencha o email');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Aviso', 'Email inválido');
      return;
    }

    // Mock: mostrar confirmação e voltar para Login
    Alert.alert('Enviado', 'Enviamos instruções para o seu email');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Recuperar senha</Text>
        <Text style={styles.subtitle}>Digite seu email corporativo para receber instruções de recuperação.</Text>

        <TextInput
          style={styles.input}
          placeholder="Email corporativo"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(t) => setEmail(t)}
        />

        <TouchableOpacity style={styles.button} onPress={handleEnviar}>
          <Text style={styles.buttonText}>Enviar instruções</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkContainer} onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
