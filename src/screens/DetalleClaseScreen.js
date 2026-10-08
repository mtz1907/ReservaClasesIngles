import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import EtiquetaNivel from '../components/EtiquetaNivel';
import { colors, spacing, radius, typography } from '../theme';
import { formatearPrecio } from '../data/clases';
import useResponsive from '../hooks/useResponsive';

export default function DetalleScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { isTablet } = useResponsive();
  const { clase } = route.params || {};

  // Estado para la simulación del botón de reserva / cancelación
  const [reservado, setReservado] = useState(false);

  if (!clase) {
    return (
      <View style={estilos.centrado}>
        <Text style={typography.subtitulo}>No se encontró información de la clase.</Text>
      </View>
    );
  }

  const handleReserva = () => {
    if (reservado) {
      setReservado(false);
      Alert.alert('Reserva Cancelada', `Has cancelado tu cupo para: ${clase.titulo}`);
    } else {
      setReservado(true);
      Alert.alert('¡Reserva Exitosa!', `Te has inscrito a la clase: ${clase.titulo}`);
    }
  };

  return (
    <View style={estilos.pantalla}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/* Portada de la Clase */}
        <Image
          source={{ uri: clase.imagen }}
          style={[estilos.portada, { height: isTablet ? 320 : 220 }]}
          resizeMode="cover"
        />

        <View style={{ padding: spacing.lg, gap: spacing.lg }}>
          {/* Encabezado con Nivel y Título */}
          <View>
            <EtiquetaNivel nivel={clase.nivel} />
            <Text style={[typography.titulo, { marginTop: spacing.sm }]}>
              {clase.titulo}
            </Text>
          </View>

          {/* Fila de Datos Rápidos (Duración, Modalidad, Rating) */}
          <View style={estilos.datos}>
            <View style={estilos.dato}>
              <Ionicons name="time-outline" size={20} color={colors.primario} />
              <Text style={estilos.datoValor}>{clase.duracion} min</Text>
              <Text style={typography.secundario}>Duración</Text>
            </View>

            <View style={estilos.dato}>
              <Ionicons name="videocam-outline" size={20} color={colors.primario} />
              <Text style={estilos.datoValor}>{clase.modalidad}</Text>
              <Text style={typography.secundario}>Modalidad</Text>
            </View>

            <View style={estilos.dato}>
              <Ionicons name="star" size={20} color={colors.acento} />
              <Text style={estilos.datoValor}>{clase.rating}</Text>
              <Text style={typography.secundario}>Calificación</Text>
            </View>
          </View>

          {/* Información del Profesor */}
          <View style={estilos.profesor}>
            <Image source={{ uri: clase.profesor.foto }} style={estilos.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={estilos.profesorNombre}>{clase.profesor.nombre}</Text>
              <Text style={typography.secundario}>
                Docente • {clase.profesor.pais}
              </Text>
            </View>
          </View>

          {/* Descripción */}
          <View>
            <Text style={typography.subtitulo}>Sobre la clase</Text>
            <Text style={estilos.descripcion}>{clase.descripcion}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Barra Inferior Fija de Precio y Acción de Reserva */}
      <View style={[estilos.barra, { paddingBottom: insets.bottom + spacing.md }]}>
        <View style={{ paddingLeft: spacing.lg, flex: 1 }}>
          <Text style={typography.secundario}>Precio por sesión</Text>
          <Text style={estilos.precio}>{formatearPrecio(clase.precio)}</Text>
        </View>
        <View style={{ paddingRight: spacing.lg, flex: 1 }}>
          <Button
            title={reservado ? 'Cancelar Reserva' : 'Reservar Clase'}
            color={reservado ? colors.peligro : colors.primario}
            onPress={handleReserva}
          />
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  portada: { width: '100%', backgroundColor: colors.primarioSuave },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
  },
  dato: { alignItems: 'center', gap: 2 },
  datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.borde },
  profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.texto },
  descripcion: {
    ...typography.cuerpo,
    color: colors.textoSuave,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  barra: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.superficie,
    borderTopWidth: 1,
    borderTopColor: colors.borde,
    paddingVertical: spacing.lg,
    paddingTop: spacing.lg,
  },
  precio: { fontSize: 18, fontWeight: '800', color: colors.primario },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});