import { useContext } from 'react';
import { reservasContext } from '../context/reservasContext';

export default function useReserva() {
  const contexto = useContext(reservasContext);

  if (!contexto) {
    throw new Error('useReserva debe usarse dentro de ReservaProvider');
  }

  return contexto;
}