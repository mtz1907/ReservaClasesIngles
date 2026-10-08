import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EtiquetaNivel from '../components/EtiquetaNivel';
import { colors, spacing, radius, typography } from '../theme';
import { formatearPrecio } from '../data/clases';

export default function DetalleClaseScreen({ route }) {
  const insets = useSafeAreaInsets();
  const { clase } = route.params || {};

  if (!clase) {
    return (
      <View style={styles.vacio}>
        <Text style={typography.subtitulo}>No se encontró información de la clase.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.contenedor}
      contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xl }}
    >
      <Image source={{ uri: clase.imagen }} style={styles.imagenHeader} resizeMode="cover" />

      <View style={styles.contenido}>
        <View style={styles.filaEtiqueta}>
          <EtiquetaNivel nivel={clase.nivel} />
          <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
        </View>

        <Text style={typography.titulo}>{clase.titulo}</Text>
        <Text style={[typography.cuerpo, styles.descripcion]}>{clase.descripcion}</Text>

        {/* Información del Profesor */}
        <View style={styles.seccionProfesor}>
          <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
          <View>
            <Text style={typography.subtitulo}>{clase.profesor.nombre}</Text>
            <Text style={typography.secundario}>País: {clase.profesor.pais}</Text>
          </View>
        </View>

        {/* Detalles Técnicos */}
        <View style={styles.detallesGrid}>
          <View style={styles.detalleItem}>
            <Ionicons name="time-outline" size={20} color={colors.primario} />
            <Text style={typography.secundario}>{clase.duracion} min</Text>
          </View>
          <View style={styles.detalleItem}>
            <Ionicons name="videocam-outline" size={20} color={colors.primario} />
            <Text style={typography.secundario}>{clase.modalidad}</Text>
          </View>
          <View style={styles.detalleItem}>
            <Ionicons name="star" size={20} color={colors.acento} />
            <Text style={typography.secundario}>{clase.rating} / 5.0</Text>
          </View>
        </View>

        <Button
          title="Reservar Cupo"
          color={colors.primario}
          onPress={() => Alert.alert('¡Reserva Confirmada!', `Has reservado la clase: ${clase.titulo}`)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.fondo },
  imagenHeader: { width: '100%', height: 220 },
  contenido: { padding: spacing.lg },
  filaEtiqueta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  precio: { fontSize: 20, fontWeight: '800', color: colors.primario },
  descripcion: { marginVertical: spacing.md, color: colors.textoSuave },
  seccionProfesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginVertical: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  detallesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: spacing.lg,
  },
  detalleItem: { alignItems: 'center', gap: 4 },
  vacio: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});