import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

import { ReservaProvider } from './src/context/reservasContext';
import TabNavigator from './src/navigation/TabNavigator';
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
      <PaperProvider>
        <ReservaProvider>
          <NavigationContainer theme={temaNavegacion}>
            <Stack.Navigator initialRouteName="MainTabs">
              {/* La pantalla principal ahora son las pestañas (Inicio, Reservas, Perfil) */}
              <Stack.Screen
                name="MainTabs"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              {/* Detalle se mantiene en el Stack para poder navegar desde las tarjetas */}
              <Stack.Screen
                name="DetalleClase"
                component={DetalleClaseScreen}
                options={{ title: 'Detalle de Clase', headerBackTitle: 'Atrás' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ReservaProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}