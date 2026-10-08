import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { ReservaProvider } from './src/context/reservasContext';
import TabNavigator from './src/navigation/TabNavigator';

export default function App() {
  return (
    <PaperProvider>
      <ReservaProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ReservaProvider>
    </PaperProvider>
  );
}