import { createContext } from 'react';
import chroma from 'chroma-js';

const hoverColor = 'red';
const selectionColor = 'blue';
const primaryColor = '#EF2EF2';
const accentColor = chroma(primaryColor).set('hsl.h', '+180');

const palette = {
  hover: hoverColor,
  selection: selectionColor,
  primary: primaryColor,
  accent: accentColor
}

const darkBgMin = '#111';
const darkBgMax = '#777';
const darkBgScale = chroma.scale([darkBgMin, darkBgMax]).colors(7);

const lightBgMin = '#fefefe';
const lightBgMax = '#999';
const lightBgScale = chroma.scale([lightBgMin, lightBgMax]).colors(7);

const darkTextMin = 'rgba(255,255,255,0.25)';
const darkTextMax = 'rgba(255,255,255,1)';
const darkTextScale = chroma.scale([darkTextMin, darkTextMax]).colors(4);

const lightTextMin = 'rgba(0,0,0,0.25)';
const lightTextMax = 'rgba(0,0,0,1)';
const lightTextScale = chroma.scale([lightTextMin, lightTextMax]).colors(4);

const createBackgrounds = (scale: string[]) => ({
  lightest: scale[6],
  lighter: scale[5],
  light: scale[4],
  base: scale[3],
  dark: scale[2],
  darker: scale[1],
  darkest: scale[0]
});

const createText = (scale: string[]) => ({
  base: scale[3],
  light: scale[2],
  lighter: scale[1],
  lightest: scale[0]
});

export const themes = {
  light: {
    theme: 'light',
    palette: palette,
    background: createBackgrounds(lightBgScale),
    text: createText(lightTextScale)
  },
  dark: {
    theme: 'dark',
    palette: palette,
    background: createBackgrounds(darkBgScale),
    text: createText(darkTextScale)
  },
};

const ThemeContext = createContext(themes.dark);

export default ThemeContext;