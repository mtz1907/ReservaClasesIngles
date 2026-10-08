import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, spacing, radius, typography } from '../theme';

export default function InicioScreen({ navigation }) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.header}>
        <Ionicons name="school-outline" size={60} color={colors.primario || '#5c3dc4'} />
        <Text style={typography.titulo}>¡Bienvenido a EnglishApp!</Text>
        <Text style={[typography.secundario, { textAlign: 'center', marginTop: spacing.xs }]}>
          Gestiona tus clases de inglés, consulta tus reservas y mantén tu perfil actualizado.
        </Text>
      </View>

      <View style={styles.acciones}>
        <Pressable style={styles.tarjeta} onPress={() => navigation.navigate('Clases')}>
          <Ionicons name="book-outline" size={32} color={colors.primario || '#5c3dc4'} />
          <Text style={styles.textoTarjeta}>Explorar Clases y Reservar</Text>
        </Pressable>

        <Pressable style={styles.tarjeta} onPress={() => navigation.navigate('Reservas')}>
          <Ionicons name="calendar-outline" size={32} color={colors.primario || '#5c3dc4'} />
          <Text style={styles.textoTarjeta}>Mis Reservas</Text>
        </Pressable>

        <Pressable style={styles.tarjeta} onPress={() => navigation.navigate('Perfil')}>
          <Ionicons name="person-outline" size={32} color={colors.primario || '#5c3dc4'} />
          <Text style={styles.textoTarjeta}>Mi Perfil</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.fondo || '#fff', padding: spacing.lg, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: spacing.xxl },
  acciones: { gap: spacing.md },
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.superficie || '#fff',
    padding: spacing.lg,
    borderRadius: radius.lg || 16,
    borderWidth: 1,
    borderColor: colors.borde || '#e0e0e0',
  },
  textoTarjeta: { fontSize: 16, fontWeight: '700', color: colors.texto || '#000' },
});