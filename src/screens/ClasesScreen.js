import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Card from '../components/Card';
import EstadoVacio from '../components/EstadoVacio';
import { CLASES, NIVELES } from '../data/clases';
import { colors, spacing, radius, typography } from '../theme';
import useResponsive from '../hooks/useResponsive';

export default function ClasesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { columnas, paddingHorizontal } = useResponsive();

  const [nivelSeleccionado, setNivelSeleccionado] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  // Búsqueda memorizada mediante useMemo
  const resultados = useMemo(() => {
    const textoBusqueda = busqueda.trim().toLowerCase();

    return CLASES.filter((clase) => {
      const coincidenciaNivel =
        nivelSeleccionado === 'Todos' || clase.nivel === nivelSeleccionado;

      const coincidenciaTexto =
        textoBusqueda === '' ||
        clase.titulo.toLowerCase().includes(textoBusqueda) ||
        clase.profesor.nombre.toLowerCase().includes(textoBusqueda);

      return coincidenciaNivel && coincidenciaTexto;
    });
  }, [nivelSeleccionado, busqueda]);

  return (
    <View style={[styles.pantalla, { paddingTop: insets.top + spacing.md }]}>
      <View style={{ paddingHorizontal: paddingHorizontal }}>
        <Text style={typography.titulo}>Clases de Inglés</Text>

        {/* Buscador */}
        <View style={styles.buscador}>
          <Ionicons name="search" size={18} color={colors.textoSuave} />
          <TextInput
            style={styles.input}
            placeholder="Buscar por título o docente..."
            placeholderTextColor={colors.textoSuave}
            value={busqueda}
            onChangeText={setBusqueda}
            autoCorrect={false}
          />
          {busqueda.length > 0 && (
            <Pressable onPress={() => setBusqueda('')}>
              <Ionicons name="close-circle" size={18} color={colors.textoSuave} />
            </Pressable>
          )}
        </View>

        {/* Filtro Rápido por Nivel (Chips) */}
        <View style={{ marginVertical: spacing.md }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={NIVELES}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const activo = nivelSeleccionado === item;
              return (
                <Pressable
                  style={[styles.chip, activo && styles.chipActivo]}
                  onPress={() => setNivelSeleccionado(item)}
                >
                  <Text style={[styles.textoChip, activo && styles.textoChipActivo]}>
                    {item}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      </View>

      {/* Lista Principal de Clases */}
      <FlatList
        key={columnas}
        numColumns={columnas}
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flex: 1, paddingHorizontal: spacing.xs }}>
            <Card
              clase={item}
              onPress={() => navigation?.navigate('DetalleClase', { clase: item })}
            />
          </View>
        )}
        ListEmptyComponent={
          <EstadoVacio
            icono="search-outline"
            titulo="No encontramos resultados"
            mensaje="Intenta con otro término o cambia el filtro de nivel."
          />
        }
        contentContainerStyle={[styles.lista, { paddingHorizontal }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 46,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.texto,
    paddingVertical: 0,
  },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    backgroundColor: colors.superficie,
    borderWidth: 1,
    borderColor: colors.borde,
    marginRight: spacing.sm,
  },
  chipActivo: {
    backgroundColor: colors.primario,
    borderColor: colors.primario,
  },
  textoChip: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textoSuave,
  },
  textoChipActivo: {
    color: '#FFFFFF',
  },
  lista: {
    paddingBottom: spacing.xl,
  },
});