import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import { CLASES, NIVELES } from '../data/clases';
import { colors, spacing, radius, typography } from '../theme';

export default function ClasesScreen({ navigation }) {
  const [nivelSeleccionado, setNivelSeleccionado] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  // Filtrado de las clases dinámicamente según el nivel y el texto ingresado
  const clasesFiltradas = CLASES.filter((clase) => {
    const coincideNivel =
      nivelSeleccionado === 'Todos' || clase.nivel === nivelSeleccionado;
    const coincideBusqueda =
      clase.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      clase.profesor.nombre.toLowerCase().includes(busqueda.toLowerCase());

    return coincideNivel && coincideBusqueda;
  });

  return (
    <SafeAreaView style={styles.contenedor}>
      {/* Encabezado */}
      <Text style={typography.titulo}>Clases de Inglés</Text>

      {/* Caja de Búsqueda con Ícono y Botón de Limpiar */}
      <View style={styles.cajaBusqueda}>
        <Ionicons name="search" size={18} color={colors.textoSuave} />
        <TextInput
          style={styles.inputBusqueda}
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

      {/* Filtros Rápido por Nivel (Carrusel de Botones) */}
      <View style={styles.contenedorFiltros}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={NIVELES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const activo = nivelSeleccionado === item;
            return (
              <Pressable
                style={[styles.botonFiltro, activo && styles.botonFiltroActivo]}
                onPress={() => setNivelSeleccionado(item)}
              >
                <Text style={[styles.textoFiltro, activo && styles.textoFiltroActivo]}>
                  {item}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {/* Lista de Tarjetas */}
      <FlatList
        data={clasesFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            clase={item}
            onPress={() => alert(`Detalles de: ${item.titulo}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.vacioContenedor}>
            <Text style={typography.secundario}>No se encontraron resultados.</Text>
          </View>
        }
        contentContainerStyle={styles.lista}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.fondo,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  cajaBusqueda: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 44,
    marginVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  inputBusqueda: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 14,
    color: colors.texto,
  },
  contenedorFiltros: {
    marginBottom: spacing.md,
  },
  botonFiltro: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.superficie,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  botonFiltroActivo: {
    backgroundColor: colors.primario,
    borderColor: colors.primario,
  },
  textoFiltro: {
    fontSize: 13,
    color: colors.textoSuave,
    fontWeight: '600',
  },
  textoFiltroActivo: {
    color: '#FFF',
  },
  lista: {
    paddingBottom: spacing.xl,
  },
  vacioContenedor: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
});