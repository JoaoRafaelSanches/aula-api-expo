// Rotas (Stack)
// Define as rotas principais da aplicação e alterna entre
// tela de `Login` e o conjunto de telas autenticadas
// conforme o estado `isAuthenticated` do `AuthContext`.
import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import NovoChamadoScreen from '../screens/NovoChamado';
import PerfilScreen from '../screens/Perfil';
import LoginScreen from '../screens/Login';
import RecuperarSenhaScreen from '../screens/RecuperarSenha';
import ChamadosScreen from '../screens/TodosChamados';
import ChamadoDetalhes from '../screens/ChamadoDetalhes';
import { AuthContext } from '../contexts/AuthContext';
import TabNavigator from './tabNavigator';

const Stack = createNativeStackNavigator();

function RootStack() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen name="NovoChamado" component={NovoChamadoScreen} />
          <Stack.Screen name="Chamados" component={ChamadosScreen} />
          <Stack.Screen name="ChamadoDetalhes" component={ChamadoDetalhes} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="RecuperarSenha" component={RecuperarSenhaScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;