import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ClasesScreen from './src/screens/ClasesScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <ClasesScreen />
    </SafeAreaProvider>
  );
}