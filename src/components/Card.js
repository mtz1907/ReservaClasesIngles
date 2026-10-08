import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import EtiquetaNivel from './EtiquetaNivel';
import { colors, spacing, radius, sombra, typography } from '../theme';
import { formatearPrecio } from '../data/clases';

export default function Card({ clase, onPress }) {
  return (
    <Pressable style={[styles.tarjeta, sombra]} onPress={onPress}>
      {/* Imagen principal y etiqueta */}
      <View style={styles.contenedorImagen}>
        <Image source={{ uri: clase.imagen }} style={styles.imagen} resizeMode="cover" />
        <View style={styles.posicionEtiqueta}>
          <EtiquetaNivel nivel={clase.nivel} />
        </View>
      </View>

      {/* Cuerpo con la información de la clase */}
      <View style={styles.cuerpo}>
        <Text style={styles.titulo} numberOfLines={2}>
          {clase.titulo}
        </Text>

        {/* Datos del Profesor con Avatar */}
        <View style={styles.filaProfesor}>
          <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
          <Text style={styles.profesor} numberOfLines={1}>
            {clase.profesor.nombre} ({clase.profesor.pais})
          </Text>
        </View>

        {/* Pie de la Tarjeta con Modalidad, Rating y Precio */}
        <View style={styles.pie}>
          <View style={styles.filaCentro}>
            <Ionicons name="star" size={14} color={colors.acento} />
            <Text style={styles.meta}>{clase.rating}</Text>
            <Text style={styles.punto}>•</Text>
            <Text style={styles.meta}>{clase.modalidad}</Text>
          </View>
          <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  contenedorImagen: {
    height: 130,
    width: '100%',
    position: 'relative',
  },
  imagen: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primarioSuave,
  },
  posicionEtiqueta: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
  },
  cuerpo: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.texto,
  },
  filaProfesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.borde,
  },
  profesor: {
    fontSize: 13,
    color: colors.textoSuave,
    flexShrink: 1,
  },
  pie: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  filaCentro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  meta: {
    fontSize: 12,
    color: colors.textoSuave,
  },
  punto: {
    color: colors.borde,
    marginHorizontal: 2,
  },
  precio: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primario,
  },
});