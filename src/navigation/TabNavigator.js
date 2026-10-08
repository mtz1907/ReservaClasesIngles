import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';

import InicioScreen from '../screens/InicioScreen';
import ClasesScreen from '../screens/ClasesScreen';
import ReservasScreen from '../screens/ReservasScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack para Inicio y Clases
function InicioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InicioHome" component={InicioScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Clases" component={ClasesScreen} options={{ title: 'Explorar Clases' }} />
    </Stack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = 'book-outline';
          else if (route.name === 'Reservas') iconName = 'calendar-outline';
          else if (route.name === 'Perfil') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={InicioStack} />
      <Tab.Screen name="Reservas" component={ReservasScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}