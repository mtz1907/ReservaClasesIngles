import { useWindowDimensions } from 'react-native';

export default function useResponsive() {
  const { width, height } = useWindowDimensions();

  const esTablet = width >= 768;
  const esHorizontal = width > height;

  // Cálculo de columnas y espaciado según la pantalla
  const columnas = esTablet ? 2 : 1;
  const anchoTarjeta = esTablet ? 320 : Math.min(width * 0.9, 300);
  const paddingHorizontal = esTablet ? 32 : 16;

  return {
    width,
    height,
    esTablet,
    esHorizontal,
    columnas,
    anchoTarjeta,
    paddingHorizontal,
  };
}