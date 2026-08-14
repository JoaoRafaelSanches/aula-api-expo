import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './styles';

// Tela: Login
// Esta tela coleta `email` e `senha` do usuário e executa a função
// `login` do AuthContext. Validações simples são executadas no
// front-end: verifica presença de '@' no email e mínimo de 6
// caracteres na senha.
export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('teste@empresa.com');
  const [senha, setSenha] = useState('123456');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const { login } = useContext(AuthContext);

  // Valida se o email contém o caractere '@'
  const validateEmail = (value) => {
    return typeof value === 'string' && value.includes('@');
  };

  // Valida se a senha tem pelo menos 6 caracteres
  const validateSenha = (value) => {
    return typeof value === 'string' && value.length >= 6;
  };

  // Ao submeter o formulário, executa validações e, se ok,
  // chama o `login` do contexto. Mensagens de erro são exibidas
  // inline e também por meio de um alerta resumido.
  const handleLogin = () => {
    let ok = true;
    if (!email) {
      setEmailError('Preencha o email');
      ok = false;
    } else if (!validateEmail(email)) {
      setEmailError('Email inválido (falta @)');
      ok = false;
    } else {
      setEmailError('');
    }

    if (!senha) {
      setSenhaError('Preencha a senha');
      ok = false;
    } else if (!validateSenha(senha)) {
      setSenhaError('Senha deve ter ao menos 6 caracteres');
      ok = false;
    } else {
      setSenhaError('');
    }

    if (!ok) {
      Alert.alert('Aviso', 'Corrija os campos marcados antes de continuar');
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
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) setEmailError('');
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry={!senhaVisivel}
            value={senha}
            onChangeText={(text) => {
              setSenha(text);
              if (senhaError) setSenhaError('');
            }}
          />
          {senhaError ? <Text style={styles.errorText}>{senhaError}</Text> : null}
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

        <TouchableOpacity style={styles.linkContainer} onPress={() => navigation.navigate('RecuperarSenha')}>
          <Text style={styles.linkText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkContainer}>
          <Text style={styles.linkText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}