import { darkTheme, lightTheme } from '../index';
import type { AppTheme } from '../index';

export function useAppTheme(mode: 'light' | 'dark' = 'light'): AppTheme {
  return mode === 'dark' ? darkTheme : lightTheme;
}
