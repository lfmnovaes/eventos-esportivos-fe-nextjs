import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config';

type ScreenSizes = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
};

export default function getScreenSizes(): ScreenSizes {
  const fullConfig = resolveConfig(tailwindConfig);
  return fullConfig?.theme?.screens as ScreenSizes;
}
