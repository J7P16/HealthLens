import { darkTheme, lightTheme } from '@/src/theme';
import type { AppTheme } from '@/src/theme';

export function useAppTheme(mode: 'light' | 'dark' = 'light'): AppTheme {
  return mode === 'dark' ? darkTheme : lightTheme;
}
