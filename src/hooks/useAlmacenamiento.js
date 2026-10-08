import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAlmacenamiento(clave, valorInicial) {
  const [valor, setValor] = useState(valorInicial);
  const [cargado, setCargado] = useState(false);

  // 1. Cargar el valor guardado localmente al montar el componente (useEffect)
  useEffect(() => {
    let activo = true; // Bandera para evitar actualizar estado si el componente se desmonta

    const cargarDatos = async () => {
      try {
        const guardado = await AsyncStorage.getItem(clave);
        if (activo && guardado !== null) {
          // Si obtenemos datos (getItem), debemos parsear de JSON
          setValor(JSON.parse(guardado));
        }
      } catch (error) {
        console.log(`Error leyendo la clave "${clave}":`, error);
      } finally {
        if (activo) {
          setCargado(true);
        }
      }
    };

    cargarDatos();

    return () => {
      activo = false; // Limpieza al desmontar
    };
  }, [clave]);

  // 2. Función para actualizar y guardar nuevo valor (useCallback con setItem)
  const actualizar = useCallback(
    async (nuevoValor) => {
      try {
        setValor(nuevoValor);
        // Al guardar datos (setItem), debemos convertir a string con JSON.stringify
        await AsyncStorage.setItem(clave, JSON.stringify(nuevoValor));
      } catch (error) {
        console.log(`Error guardando en la clave "${clave}":`, error);
      }
    },
    [clave]
  );

  return [valor, actualizar, cargado];
}