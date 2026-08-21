import { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, Alert, TextInput, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles';

// Tela: Perfil do usuário
// Contém:
// - Card com foto, nome e botão de editar
// - Seção 'Dados pessoais' com campos editáveis
// - Seção 'Meus dados' com estatísticas
// - Seção 'Segurança' para alterar a senha

function PerfilScreen({ navigation }) {
  const { logout, user, updateProfile, changePassword } = useContext(AuthContext) || {};

  const [editMode, setEditMode] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState(user?.name || 'Ana Ribeiro');
  const [email, setEmail] = useState(user?.email || 'jsanchesedantas@gmail.com');
  const [telefone, setTelefone] = useState(user?.phone || '(11) 98876-4410');
  const [setor, setSetor] = useState(user?.sector || 'Secretaria Acadêmica');
  const [cargo, setCargo] = useState(user?.role || 'Assistente Administrativa');
  const [avatar, setAvatar] = useState(user?.avatar || null);

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSalvarPerfil = () => {
    // Validações mínimas
    if (!nomeCompleto || !email) {
      Alert.alert('Aviso', 'Nome e e-mail são obrigatórios');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Aviso', 'Email inválido');
      return;
    }

    // Atualiza no contexto
    if (typeof updateProfile === 'function') {
      updateProfile({ name: nomeCompleto, email, phone: telefone, sector: setor, role: cargo });
    }
    Alert.alert('Sucesso', 'Perfil atualizado');
    setEditMode(false);
  };

  const handleAlterarSenha = () => {
    if (!novaSenha || novaSenha.length < 6) {
      Alert.alert('Aviso', 'A nova senha deve ter ao menos 6 caracteres');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      Alert.alert('Aviso', 'Nova senha e confirmação não coincidem');
      return;
    }

    const ok = typeof changePassword === 'function' ? changePassword(senhaAtual, novaSenha) : false;
    if (ok) {
      Alert.alert('Sucesso', 'Senha alterada com sucesso');
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');
    } else {
      Alert.alert('Erro', 'Não foi possível alterar a senha');
    }
  };

  // Image picker removed to avoid runtime errors until package is installed

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header com botão voltar e logout */}
      {/* Top header removed per user request */}
      {/* Card do usuário */}
      <View style={styles.profileCard}>
        {user?.avatar ? (
          <View>
            <Image source={{ uri: user.avatar }} style={styles.profileAvatar} />
          </View>
        ) : (
          <View style={styles.profileAvatarPlaceholder}>
            <Text style={styles.profileInitials}>{(user?.email || 'A').charAt(0).toUpperCase()}</Text>
          </View>
        )}

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{nomeCompleto || 'A...'}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
          <Text style={styles.profilePhone}>{telefone}</Text>
          <TouchableOpacity style={styles.editProfileButton} onPress={() => setEditMode(!editMode)}>
            <MaterialIcons name="edit" size={16} color="#111827" />
            <Text style={styles.editProfileButtonText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dados pessoais */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="edit" size={20} color="#2563eb" />
          <Text style={styles.sectionTitle}>Dados pessoais</Text>
        </View>

        <Text style={styles.inputLabel}>Nome completo</Text>
        <TextInput style={styles.input} value={nomeCompleto} onChangeText={setNomeCompleto} editable={editMode} />

        <Text style={styles.inputLabel}>E-mail</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} editable={editMode} keyboardType="email-address" autoCapitalize="none" />

        <Text style={styles.inputLabel}>Telefone</Text>
        <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} editable={editMode} />

        {editMode && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSalvarPerfil}>
            <Text style={styles.saveButtonText}>Salvar alterações</Text>
          </TouchableOpacity>
        )}
      </View>
        {/* Botão de logout abaixo da seção de segurança */}
        {/* Botão Voltar posicionado acima do logout (mais próximo ao botão Sair) */}
        <TouchableOpacity style={styles.bottomBackButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={18} color="#111827" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            Alert.alert('Sair', 'Deseja sair da sua conta?', [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Sair', style: 'destructive', onPress: () => { if (typeof logout === 'function') logout(); } },
            ]);
          }}
        >
          <MaterialIcons name="logout" size={18} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
    </ScrollView>
  );
}

export default PerfilScreen;