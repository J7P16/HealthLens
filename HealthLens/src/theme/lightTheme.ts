import { gradients } from './tokens/gradients';
import { palette } from './tokens/colors';
import type { AppTheme } from './types';

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    background: '#EEF2F8',
    surface: palette.white,
    surfaceMuted: palette.slate100,
    text: '#121212',
    textMuted: '#8F9094',
    textSoft: '#A3A7AF',
    inputBackground: '#EFF2F6',
    inputText: '#6F7380',
    inputIcon: '#9AA7C4',
    border: '#D4DCE8',
    borderStrong: '#24336B',
    divider: '#AEB6C4',
    link: '#24336B',
    primaryText: palette.white,
    socialSurface: '#FFFFFF',
    shadow: palette.shadowBlue,
  },
  gradients,
};
