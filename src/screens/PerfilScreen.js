import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph, List, Avatar, Divider } from 'react-native-paper';
import useAlmacenamiento from '../hooks/useAlmacenamiento';

export default function PerfilScreen() {
  const [perfiles, guardarPerfiles] = useAlmacenamiento('lista_perfiles', []);
  
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    nivelIngles: '',
    telefono: '',
  });

  const manejarGuardar = async () => {
    if (!formulario.nombre || !formulario.documento) {
      Alert.alert('Error', 'El nombre y documento son obligatorios');
      return;
    }

    const nuevoPerfil = { ...formulario, id: Date.now().toString() };
    const listaActualizada = [...(perfiles || []), nuevoPerfil];
    
    await guardarPerfiles(listaActualizada);
    
    setFormulario({
      nombre: '',
      apellido: '',
      documento: '',
      nivelIngles: '',
      telefono: '',
    });
    
    Alert.alert('Éxito', 'Perfil registrado con éxito');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.cardForm}>
        <Card.Content>
          <Title style={styles.tituloForm}>Registrar Estudiante</Title>
          
          <TextInput
            label="Nombre"
            value={formulario.nombre}
            onChangeText={(text) => setFormulario({ ...formulario, nombre: text })}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Apellido"
            value={formulario.apellido}
            onChangeText={(text) => setFormulario({ ...formulario, apellido: text })}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Documento"
            value={formulario.documento}
            onChangeText={(text) => setFormulario({ ...formulario, documento: text })}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Nivel de Inglés"
            value={formulario.nivelIngles}
            onChangeText={(text) => setFormulario({ ...formulario, nivelIngles: text })}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Teléfono"
            value={formulario.telefono}
            onChangeText={(text) => setFormulario({ ...formulario, telefono: text })}
            keyboardType="phone-pad"
            style={styles.input}
            mode="outlined"
          />

          <Button mode="contained" onPress={manejarGuardar} style={styles.button}>
            Guardar Perfil
          </Button>
        </Card.Content>
      </Card>

      <Title style={styles.sectionHeader}>Perfiles Registrados ({perfiles?.length || 0})</Title>
      
      {perfiles && perfiles.map((item) => (
        <Card key={item.id} style={styles.cardPerfil}>
          <List.Accordion
            title={`${item.nombre} ${item.apellido}`}
            description={`Doc: ${item.documento}`}
            left={(props) => <Avatar.Icon {...props} icon="account" size={40} />}
          >
            <Divider />
            <View style={styles.infoDetalle}>
              <Paragraph style={styles.textoDetalle}>
                📌 <Paragraph style={styles.bold}>Documento:</Paragraph> {item.documento}
              </Paragraph>
              <Paragraph style={styles.textoDetalle}>
                🎓 <Paragraph style={styles.bold}>Nivel de Inglés:</Paragraph> {item.nivelIngles || 'No especificado'}
              </Paragraph>
              <Paragraph style={styles.textoDetalle}>
                📞 <Paragraph style={styles.bold}>Teléfono:</Paragraph> {item.telefono || 'No especificado'}
              </Paragraph>
            </View>
          </List.Accordion>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  cardForm: { marginBottom: 20, borderRadius: 12 },
  tituloForm: { marginBottom: 12 },
  input: { marginBottom: 10 },
  button: { marginTop: 8, paddingVertical: 4 },
  sectionHeader: { marginBottom: 12 },
  cardPerfil: { marginBottom: 10, borderRadius: 12, overflow: 'hidden' },
  infoDetalle: { padding: 16, backgroundColor: '#f9f9f9' },
  textoDetalle: { marginBottom: 6, fontSize: 14 },
  bold: { fontWeight: 'bold' },
});


