import { useReserva } from '../context/reservasContext';

// Dentro de tu pantalla de clases o detalle:
const { agregarReserva } = useReserva();

const manejarReserva = (clase) => {
  agregarReserva({
    id: clase.id || Date.now().toString(),
    titulo: clase.titulo || clase.nombre || 'Clase de Inglés',
    horario: clase.horario || 'Por confirmar',
    profesor: clase.profesor || 'Sin asignar',
  });
  Alert.alert('Éxito', 'Clase reservada correctamente');
};