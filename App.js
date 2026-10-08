import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ClasesScreen from './src/screens/ClasesScreen';
import DetalleClaseScreen from './src/screens/DetalleClaseScreen';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator();

const temaNavegacion = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.fondo,
    card: colors.superficie,
    primary: colors.primario,
    text: colors.texto,
    border: colors.borde,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={temaNavegacion}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={ClasesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetalleClase"
            component={DetalleClaseScreen}
            options={{ title: 'Detalle de Clase', headerBackTitle: 'Atrás' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}