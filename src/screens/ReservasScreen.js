import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Text } from 'react-native-paper';
import { useReserva } from '../context/reservasContext';

export default function ReservasScreen() {
  const { reservas = [], cancelarReserva } = useReserva() || {};

  if (!reservas || reservas.length === 0) {
    return (
      <View style={styles.center}>
        <Text variant="titleMedium">No tienes reservas activas en este momento.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reservas}
        keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item?.titulo}</Title>
              <Paragraph>📌 Tipo: {item?.tipo} ({item?.precio})</Paragraph>
              <Paragraph>⏰ Horario: {item?.horario}</Paragraph>
              <Paragraph>👨‍🏫 Profesor: {item?.profesor}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button mode="outlined" textColor="red" onPress={() => cancelarReserva && cancelarReserva(item?.id)}>
                Cancelar Reserva
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { marginBottom: 12, borderRadius: 12 },
});