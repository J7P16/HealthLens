import { gradients } from './tokens/gradients';

export type AppTheme = {
  mode: 'light' | 'dark';
  colors: {
    background: string;
    surface: string;
    surfaceMuted: string;
    text: string;
    textMuted: string;
    textSoft: string;
    inputBackground: string;
    inputText: string;
    inputIcon: string;
    border: string;
    borderStrong: string;
    divider: string;
    link: string;
    primaryText: string;
    socialSurface: string;
    shadow: string;
  };
  gradients: {
    primary: readonly [string, string];
    primaryDisabled: readonly [string, string];
  };
};
