import React from 'react';
import ThemeContext, { themes } from './ThemeContext';

interface ThemeProviderProps {
  theme: string;
  children: React.ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const appTheme = props.theme === 'dark' ? themes.dark : themes.light;
  return (
    <ThemeContext.Provider value={appTheme}>
      { props.children }
    </ThemeContext.Provider>
  )
};

export default ThemeProvider;
