import { AuthProvider } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navigator from './src/navigation/Navigator';

export default function App() {
  return (
    <QueryClientProvider client={(new QueryClient())}>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </QueryClientProvider>
  );
}