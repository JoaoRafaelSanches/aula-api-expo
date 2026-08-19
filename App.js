// Arquivo principal (entrypoint)
// Envolve a aplicação com o `AuthProvider` e o `NavigationContainer`.
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './src/routes/stack';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack />
          <StatusBar style="auto" />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}