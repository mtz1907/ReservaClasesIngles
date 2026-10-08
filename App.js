import React from 'react';
import { StyleSheet, SafeAreaView, Text, FlatList } from 'react-native';
import Card from './src/components/Card';
import { CLASES } from './src/data/clases';
import { colors, spacing, typography } from './src/theme';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.tituloHeader}>Reserva de Clases</Text>
      <FlatList
        data={CLASES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            clase={item}
            onPress={() => alert(`Seleccionaste: ${item.titulo}`)}
          />
        )}
        contentContainerStyle={styles.lista}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
    paddingTop: 40,
  },
  tituloHeader: {
    ...typography.titulo,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  lista: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
});