import React from 'react';
import ThemeContext, { getTheme } from './ThemeContext';
import { Color } from 'chroma-js';

interface ThemeProviderProps {
  theme: srm.Theme;
  avgColor: Color;
  children: React.ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { theme, avgColor, children } = props;
  const appTheme = getTheme(theme, avgColor);
  return (
    <ThemeContext.Provider value={appTheme}>
      { children }
    </ThemeContext.Provider>
  )
};

export default ThemeProvider;
