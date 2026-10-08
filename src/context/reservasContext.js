import React, { createContext, useContext, useState } from 'react';

const ReservaContext = createContext();

export const ReservaProvider = ({ children }) => {
  const [reservas, setReservas] = useState([]);

  const agregarReserva = (clase) => {
    setReservas((prev) => {
      // Evita duplicados si la clase ya existe
      const yaExiste = prev.some((r) => r.id === clase.id);
      if (yaExiste) return prev;
      return [...prev, clase];
    });
  };

  const cancelarReserva = (id) => {
    setReservas((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ReservaContext.Provider value={{ reservas, agregarReserva, cancelarReserva }}>
      {children}
    </ReservaContext.Provider>
  );
};

export const useReserva = () => {
  const context = useContext(ReservaContext);
  if (!context) {
    throw new Error('useReserva debe usarse dentro de un ReservaProvider');
  }
  return context;
};