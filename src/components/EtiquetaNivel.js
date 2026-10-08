import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, coloresPorNivel } from '../theme';

export default function EtiquetaNivel({ nivel }) {
  const colorFondo = coloresPorNivel[nivel] || colors.primario;

  return (
    <View style={[styles.etiqueta, { backgroundColor: colorFondo }]}>
      <Text style={styles.texto}>{nivel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  etiqueta: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    alignSelf: 'flex-start',
  },
  texto: {
    ...typography.etiqueta,
    color: '#FFFFFF',
  },
});