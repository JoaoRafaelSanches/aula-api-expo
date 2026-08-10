import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('teste@empresa.com');
  const [senha, setSenha] = useState('123456');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Aviso', 'Por favor, preencha todos os campos');
      return;
    }
    login(email, senha);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>N.O.S</Text>
        <Text style={styles.logoSubtext}>New Occurrence System</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Bem-vindo de volta</Text>
        <Text style={styles.subtitle}>Entre com suas credenciais para acessar o painel.</Text>

        <TextInput
          style={styles.input}
          placeholder="Email corporativo"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry={!senhaVisivel}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setSenhaVisivel(!senhaVisivel)}
          >
            <MaterialIcons
              name={senhaVisivel ? 'visibility' : 'visibility-off'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkContainer}>
          <Text style={styles.linkText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}