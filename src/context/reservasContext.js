import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Clave única asignada para guardar las reservas de esta app
const CLAVE_RESERVAS = '@reservaIngles';

export const reservasContext = createContext(null);

export function ReservaProvider({ children }) {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar reservas guardadas al iniciar la aplicación (Get Item + JSON.parse)
  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
        if (guardado !== null) {
          setReservas(JSON.parse(guardado));
        }
      } catch (error) {
        console.log('Error leyendo las reservas:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarReservas();
  }, []);

  return (
    <reservasContext.Provider value={{ reservas, setReservas, cargando }}>
      {children}
    </reservasContext.Provider>
  );
}