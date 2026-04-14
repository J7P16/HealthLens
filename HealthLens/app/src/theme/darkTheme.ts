import { gradients } from './tokens/gradients';
import { palette } from './tokens/colors';
import type { AppTheme } from './types';

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    background: '#090F1E',
    surface: '#242631',
    surfaceMuted: '#2D3345',
    text: '#FFFFFF',
    textMuted: '#ADB4C2',
    textSoft: '#929AA9',
    inputBackground: '#2E3750',
    inputText: '#D4DBE7',
    inputIcon: '#A7B6D6',
    border: '#52607A',
    borderStrong: '#8CA8E7',
    divider: '#4B576E',
    link: '#9BB8FF',
    primaryText: palette.white,
    socialSurface: '#2E3750',
    shadow: palette.shadowDark,
  },
  gradients,
};
