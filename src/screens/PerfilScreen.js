import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Title, Card } from 'react-native-paper';
import useAlmacenamiento from '../hooks/useAlmacenamiento';
import { colors, spacing } from '../theme';

export default function PerfilScreen() {
  const [perfilGuardado, guardarPerfil, cargado] = useAlmacenamiento('@perfilEstudiante', {
    nombre: '',
    apellido: '',
    nivelIngles: '',
    telefono: '',
    documento: '',
  });

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nivelIngles, setNivelIngles] = useState('');
  const [telefono, setTelefono] = useState('');
  const [documento, setDocumento] = useState('');

  useEffect(() => {
    if (cargado && perfilGuardado) {
      setNombre(perfilGuardado.nombre || '');
      setApellido(perfilGuardado.apellido || '');
      setNivelIngles(perfilGuardado.nivelIngles || '');
      setTelefono(perfilGuardado.telefono || '');
      setDocumento(perfilGuardado.documento || '');
    }
  }, [cargado, perfilGuardado]);

  const handleGuardar = () => {
    const nuevoPerfil = { nombre, apellido, nivelIngles, telefono, documento };
    guardarPerfil(nuevoPerfil);
    Alert.alert('Éxito', 'Información de perfil actualizada correctamente.');
  };

  return (
    <ScrollView style={styles.contenedor}>
      <Card style={styles.tarjeta}>
        <Card.Content style={styles.contenido}>
          <Title style={styles.titulo}>Perfil del Estudiante</Title>

          <TextInput
            label="Nombre"
            value={nombre}
            onChangeText={setNombre}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Apellido"
            value={apellido}
            onChangeText={setApellido}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Documento de Identidad"
            value={documento}
            onChangeText={setDocumento}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Nivel de Inglés (A1, A2, B1, B2, C1)"
            value={nivelIngles}
            onChangeText={setNivelIngles}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
            mode="outlined"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleGuardar}
            buttonColor={colors.primario}
            style={styles.boton}
          >
            Guardar Información
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.fondo, padding: spacing.md },
  tarjeta: { marginTop: spacing.xl, marginBottom: spacing.xl },
  contenido: { gap: spacing.sm },
  titulo: { textAlign: 'center', marginBottom: spacing.md },
  input: { backgroundColor: colors.superficie },
  boton: { marginTop: spacing.md, paddingVertical: spacing.xs },
});