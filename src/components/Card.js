import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import { colors, spacing, radius, sombra, typography } from '../theme';
import { formatearPrecio } from '../data/clases';

export default function Card({ clase, onPress }) {
  return (
    <Pressable style={[styles.tarjeta, sombra]} onPress={onPress}>
      <View style={styles.contenedorImagen}>
        <Image source={{ uri: clase.imagen }} style={styles.imagen} resizeMode="cover" />
        <View style={styles.posicionEtiqueta}>
          <EtiquetaNivel nivel={clase.nivel} />
        </View>
      </View>

      <View style={styles.contenido}>
        <Text style={typography.subtitulo}>{clase.titulo}</Text>
        <Text style={[typography.secundario, { marginVertical: spacing.xs }]}>
          Prof: {clase.profesor.nombre} ({clase.profesor.pais})
        </Text>

        <View style={styles.filaInfo}>
          <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
          <Text style={typography.secundario}>{clase.modalidad} • {clase.duracion} min</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    marginVertical: spacing.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borde,
  },
  contenedorImagen: {
    height: 140,
    width: '100%',
    position: 'relative',
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  posicionEtiqueta: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
  },
  contenido: {
    padding: spacing.md,
  },
  filaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  precio: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primario,
  },
});