import { useWindowDimensions } from 'react-native';

export default function useResponsive() {
  const { width, height } = useWindowDimensions();

  const esTablet = width >= 768;
  const esHorizontal = width > height;

  // Sobrecarga de valores para diseño adaptativo
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