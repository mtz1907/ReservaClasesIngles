import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import { useReserva } from '../context/reservasContext';

const TODAS_LAS_CLASES = [
  {
    id: '1',
    titulo: 'Conversación Inicial',
    nivel: 'A1 - A2 (Básico)',
    categoria: 'A1-A2',
    horario: 'Lunes 10:00 AM',
    profesor: 'John Doe',
    precio: '$15 USD',
    imagen: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '2',
    titulo: 'Gramática e Interacción',
    nivel: 'B1 - B2 (Intermedio)',
    categoria: 'B1-B2',
    horario: 'Miércoles 2:00 PM',
    profesor: 'Sarah Smith',
    precio: '$25 USD',
    imagen: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '3',
    titulo: 'Inglés de Negocios y Debate',
    nivel: 'C1 - C2 (Avanzado)',
    categoria: 'C1-C2',
    horario: 'Viernes 4:00 PM',
    profesor: 'Michael Brown',
    precio: '$30 USD',
    imagen: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '4',
    titulo: 'Preparación de Exámenes Oficiales',
    nivel: 'C1 - C2 (Avanzado)',
    categoria: 'C1-C2',
    horario: 'Sábado 9:00 AM',
    profesor: 'Emma Wilson',
    precio: '$35 USD',
    imagen: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
  },
];

export default function ClasesScreen() {
  const { agregarReserva } = useReserva() || {};
  const [filtroSeleccionado, setFiltroSeleccionado] = useState('TODOS');

  const clasesFiltradas = TODAS_LAS_CLASES.filter((clase) => {
    if (filtroSeleccionado === 'TODOS') return true;
    return clase.categoria === filtroSeleccionado;
  });

  const manejarReserva = (clase) => {
    if (agregarReserva) {
      agregarReserva(clase);
      Alert.alert('¡Éxito!', `Has reservado la clase "${clase.titulo}". Consulta en 'Mis Reservas'.`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Botones de Filtro CEFR */}
      <View style={styles.filtrosContainer}>
        <Chip
          selected={filtroSeleccionado === 'TODOS'}
          onPress={() => setFiltroSeleccionado('TODOS')}
          style={styles.chipFilter}
        >
          Todas
        </Chip>
        <Chip
          selected={filtroSeleccionado === 'A1-A2'}
          onPress={() => setFiltroSeleccionado('A1-A2')}
          style={styles.chipFilter}
        >
          A1 - A2
        </Chip>
        <Chip
          selected={filtroSeleccionado === 'B1-B2'}
          onPress={() => setFiltroSeleccionado('B1-B2')}
          style={styles.chipFilter}
        >
          B1 - B2
        </Chip>
        <Chip
          selected={filtroSeleccionado === 'C1-C2'}
          onPress={() => setFiltroSeleccionado('C1-C2')}
          style={styles.chipFilter}
        >
          C1 - C2
        </Chip>
      </View>

      {/* Lista con Imagen superior e Información abajo */}
      <FlatList
        data={clasesFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            {/* Imagen ilustrativa de la clase */}
            <Card.Cover source={{ uri: item.imagen }} style={styles.cardCover} />

            <Card.Content style={styles.cardContent}>
              <View style={styles.headerCard}>
                <Title style={styles.titulo}>{item.titulo}</Title>
                <Chip style={styles.chipPrecio}>{item.precio}</Chip>
              </View>

              <Paragraph style={styles.nivel}>🎓 Nivel: {item.nivel}</Paragraph>
              <Paragraph>⏰ Horario: {item.horario}</Paragraph>
              <Paragraph>👨‍🏫 Profesor: {item.profesor}</Paragraph>
            </Card.Content>

            <Card.Actions style={styles.actions}>
              <Button
                mode="contained"
                buttonColor="#5c3dc4"
                onPress={() => manejarReserva(item)}
              >
                Reservar Clase
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  filtrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chipFilter: { backgroundColor: '#e0e0e0' },
  card: { marginBottom: 16, borderRadius: 12, overflow: 'hidden' },
  cardCover: { height: 140 },
  cardContent: { paddingTop: 12 },
  headerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  titulo: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  chipPrecio: { backgroundColor: '#e8e0ff' },
  nivel: { color: '#5c3dc4', fontWeight: 'bold', marginBottom: 4 },
  actions: { paddingHorizontal: 16, paddingBottom: 12 },
});