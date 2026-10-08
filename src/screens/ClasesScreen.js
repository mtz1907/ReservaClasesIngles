import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '../components/Card';
import { CLASES, NIVELES } from '../data/clases';
import { colors, spacing, radius, typography } from '../theme';

export default function ClasesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [nivelSeleccionado, setNivelSeleccionado] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  // Filtrado dinámico
  const clasesFiltradas = CLASES.filter((clase) => {
    const coincideNivel =
      nivelSeleccionado === 'Todos' || clase.nivel === nivelSeleccionado;
    const coincideBusqueda =
      clase.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      clase.profesor.nombre.toLowerCase().includes(busqueda.toLowerCase());

    return coincideNivel && coincideBusqueda;
  });

  return (
    <View
      style={[
        styles.pantalla,
        { paddingTop: insets.top + spacing.md }
      ]}
    >
      <View style={{ paddingHorizontal: spacing.lg }}>
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

        {/* Filtros Rápido por Nivel */}
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

      {/* Lista de Tarjetas */}
      <FlatList
        data={clasesFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            clase={item}
            onPress={() => alert(`Seleccionaste: ${item.titulo}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.vacioContenedor}>
            <Text style={typography.secundario}>No se encontraron resultados.</Text>
          </View>
        }
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { 
    flex: 1, 
    backgroundColor: colors.fondo 
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
    paddingVertical: 0 
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
    color: colors.textoSuave 
  },
  textoChipActivo: { 
    color: '#FFFFFF' 
  },
  lista: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  vacioContenedor: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
});