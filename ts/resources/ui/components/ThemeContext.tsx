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

const createScale = (min: string, max: string, count: number) => {
  return chroma.scale([min, max]).colors(count);
}

const darkBgMin = '#131415';
const darkBgMax = '#58595A';
const darkBgScale = createScale(darkBgMin, darkBgMax, 7);

const lightBgMin = '#F9F9F9';
const lightBgMax = '#E1E1E1';
const lightBgScale = createScale(lightBgMin, lightBgMax, 7);

const darkTextMin = 'rgba(255,255,255,0.25)';
const darkTextMax = 'rgba(255,255,255,1)';
const darkTextScale = createScale(darkTextMin, darkTextMax, 4);

const lightTextMin = 'rgba(0,0,0,0.25)';
const lightTextMax = 'rgba(0,0,0,1)';
const lightTextScale = createScale(lightTextMin, lightTextMax, 4);

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
    palette: palette,
    background: createBackgrounds(lightBgScale),
    text: createText(lightTextScale)
  },
  dark: {
    palette: palette,
    background: createBackgrounds(darkBgScale),
    text: createText(darkTextScale)
  },
};

const ThemeContext = createContext(themes.dark);

export default ThemeContext;