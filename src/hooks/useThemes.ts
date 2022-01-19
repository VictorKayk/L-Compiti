import { useEffect, useState } from 'react';

import { IUseThemes } from '../interfaces/hooks';
import themes from '../styles/themes';
import { useConfig } from './useCases';

export function useThemes(): IUseThemes {
  const { getConfig, setConfig } = useConfig();
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    async function getTheme(): Promise<void> {
      setIsThemeLoaded(false);
      const geral = (await getConfig('geral')) as { theme: 'light' | 'dark' };

      const theme = geral ? themes[geral.theme] : themes.light;
      setCurrentTheme(theme);
      setIsThemeLoaded(true);
    }
    getTheme();
  }, []);

  async function setTheme(theme: 'light' | 'dark'): Promise<void> {
    setIsThemeLoaded(false);
    await setConfig('geral', { theme });
    setCurrentTheme(themes[theme]);
    setIsThemeLoaded(true);
  }

  return { theme: currentTheme, setTheme, isThemeLoaded };
}
