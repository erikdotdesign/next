import { createContext } from 'react';
import chroma, { Color } from 'chroma-js';

export const SRM_DEFAULT_PRIMARY = chroma('#EF2EF2');

const createScale = (min: string, max: string, count: number) => {
  return chroma.scale([min, max]).mode('lch').colors(count);
}

const darkBgMin = '#1a1a1a';
const darkBgMax = '#555';
const darkBgScale = createScale(darkBgMin, darkBgMax, 7);

const lightBgMin = '#f7f7f7';
const lightBgMax = '#ccc';
const lightBgScale = createScale(lightBgMin, lightBgMax, 7);

const darkTextMin = 'rgba(255,255,255,0.25)';
const darkTextMax = 'rgba(255,255,255,1)';
const darkTextScale = createScale(darkTextMin, darkTextMax, 4);

const lightTextMin = 'rgba(0,0,0,0.25)';
const lightTextMax = 'rgba(0,0,0,1)';
const lightTextScale = createScale(lightTextMin, lightTextMax, 4);

const textOnColor = (color: string | chroma.Color) => {
  const contrast = chroma.contrast(color, darkTextMax);
  return contrast > 3 ? darkTextMax : lightTextMax;
}

const createPalette = (avgColor: Color) => {
  //@ts-ignore
  let primary: Color = chroma(avgColor).set('hsl.h', '+180').set('lch.c', 700).saturate(100);
  //@ts-ignore
  if (chroma(primary).get('hsl.l') >= 0.5) {
    primary = primary.darken();
  //@ts-ignore
  } else if (chroma(primary).get('hsl.l') <= 0.3) {
    primary = primary.brighten();
  }
  //@ts-ignore
  let primaryHover: Color = chroma(primary).darken(0.5);
  //@ts-ignore
  let accent: Color = chroma(primary).set('hsl.h', '+180');
  //@ts-ignore
  let accentHover: Color = chroma(accent).darken(0.5);
  return {
    //@ts-ignore
    primary: chroma(primary).css(),
    //@ts-ignore
    primaryHover: chroma(primaryHover).css(),
    //@ts-ignore
    accent: chroma(accent).css(),
    //@ts-ignore
    accentHover: chroma(accentHover).css()
  }
}

const createDarkBackgrounds = (scale: string[]) => ({
  z6: scale[6],
  z5: scale[5],
  z4: scale[4],
  z3: scale[3],
  z2: scale[2],
  z1: scale[1],
  z0: scale[0]
});

const createLightBackgrounds = (scale: string[]) => ({
  z6: scale[6],
  z5: scale[4],
  z4: scale[5],
  z3: scale[4],
  z2: scale[1],
  z1: scale[2],
  z0: scale[0]
});

const createText = (scale: string[], palette: any) => ({
  base: scale[3],
  light: scale[2],
  lighter: scale[1],
  lightest: scale[0],
  onPrimary: textOnColor(palette.primary),
  onAccent: textOnColor(palette.accent),
});

export const getTheme = (theme: srm.Theme, avgColor: Color) => {
  const palette = createPalette(avgColor);
  switch(theme) {
    case 'dark':
      return {
        palette: palette,
        background: createDarkBackgrounds(darkBgScale),
        text: createText(darkTextScale, palette)
      }
    case 'light':
      return {
        palette: palette,
        background: createLightBackgrounds(lightBgScale),
        text: createText(lightTextScale, palette)
      }
  }
}

const ThemeContext = createContext(getTheme('dark', SRM_DEFAULT_PRIMARY));

export default ThemeContext;