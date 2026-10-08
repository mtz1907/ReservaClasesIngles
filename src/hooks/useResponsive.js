import { useWindowDimensions } from 'react-native';

export default function useResponsive() {
  const { width, height } = useWindowDimensions();

  const esTablet = width >= 768;
  const esPantallaPequena = width < 360;

  return {
    width,
    height,
    esTablet,
    esPantallaPequena,
  };
}