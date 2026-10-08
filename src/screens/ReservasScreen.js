import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import useReserva from '../hooks/useReserva';
import EstadoVacio from '../components/EstadoVacio';
import { colors, spacing, radius, typography } from '../theme';

export default function ReservasScreen() {
  const { reservas, setReservas } = useReserva();

  const cancelarReserva = (idClase) => {
    const filtradas = reservas.filter((item) => item.id !== idClase);
    setReservas(filtradas);
  };

  return (
    <View style={styles.pantalla}>
      <Text style={[typography.titulo, { margin: spacing.lg }]}>Mis Reservas</Text>

      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tarjetaReserva}>
            <View style={{ flex: 1 }}>
              <Text style={styles.tituloClase}>{item.titulo}</Text>
              <Text style={typography.secundario}>
                Profesor: {item.profesor?.nombre || 'Docente'}
              </Text>
              <Text style={styles.infoDetalle}>
                Nivel: {item.nivel} • Duración: {item.duracion} min
              </Text>
            </View>
            <Pressable
              style={styles.botonCancelar}
              onPress={() => cancelarReserva(item.id)}
            >
              <Ionicons name="trash-outline" size={20} color={colors.peligro || '#FF4D4D'} />
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <EstadoVacio
            icono="calendar-outline"
            titulo="No tienes reservas activas"
            mensaje="Explora el catálogo de clases y agenda tu primera sesión."
          />
        }
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.xl,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo, paddingTop: spacing.xl },
  tarjetaReserva: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  tituloClase: { fontSize: 16, fontWeight: '700', color: colors.texto },
  infoDetalle: { fontSize: 12, color: colors.primario, fontWeight: '600', marginTop: spacing.xs },
  botonCancelar: { padding: spacing.sm },
});