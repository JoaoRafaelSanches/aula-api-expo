// Arquivo principal (entrypoint)
// Envolve a aplicação com o `AuthProvider` e o `NavigationContainer`.
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/routes/stack';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AuthProvider>
  );
}