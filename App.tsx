import { AuthContextProvider } from '@/context/AuthContext';
import { StyleSheet } from 'react-native';
import Navigator from './src/navigation/Navigator';

export default function App() {
  return (
    <AuthContextProvider>
      <Navigator />
    </AuthContextProvider>
  );
}