import { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles';

function PerfilScreen({ navigation }) {
  const { logout, user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <MaterialIcons name="account-circle" size={80} color="#2563eb" />
      <Text style={styles.title}>Meu Perfil</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <MaterialIcons name="logout" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PerfilScreen;