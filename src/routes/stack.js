import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import NovoChamadoScreen from '../screens/NovoChamado';
import PerfilScreen from '../screens/Perfil';
import LoginScreen from '../screens/Login';
import { AuthContext } from '../contexts/AuthContext';

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
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="NovoChamado" component={NovoChamadoScreen} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

export default RootStack;