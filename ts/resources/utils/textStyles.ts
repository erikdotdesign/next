import { createBaseLayerStyles, createOpacity, cssColor } from './layerStyles';

const createTextTransform = (transform: any) => {
  if (transform === 'none') {
    return {}
  } else {
    return {
      textTransform: transform
    }
  }
};

const createTextBorders = (borders: any) => {
  if (borders.length > 0 && borders[0].enabled) {
    const { thickness, color } = borders[0];
    return {
      WebkitTextStrokeColor: cssColor(color),
      WebkitTextStrokeWidth: `${thickness * 2}px`,
      MozTextStrokeColor: cssColor(color),
      MozTextStrokeWidth: `${thickness * 2}px`
    }
  } else {
    return {}
  }
};

const createTextShadow = (sketchTextShadow: any) => {
  const { x, y, blur, color } = sketchTextShadow;
  const textShadow = `${x}px ${y}px ${blur}px ${cssColor(color)}`;
  return {
    textShadow
  }
};

const createTextShadows = (shadows: any) => {
  if (shadows.length > 0) {
    const textShadows = shadows.map((shadow: any) => {
      if (shadow.enabled) {
        const textShadow = createTextShadow(shadow);
        return textShadow.textShadow;
      }
    });
    return {
      textShadow: textShadows.join(', ')
    }
  } else {
    return {}
  }
};

const createTextDecoration = (textStrikethrough: any, textUnderline: any) => {
  if (textStrikethrough) {
    return {
      textDecoration: 'line-through'
    }
  } else if (textUnderline) {
    return {
      textDecoration: 'underline'
    }
  } else {
    return {}
  }
};

const createLetterSpacing = (kerning: number | null) => {
  if (kerning !== null) {
    return {
      letterSpacing: `${kerning}px`
    }
  } else {
    return {}
  }
};

const createFontFamily = (fontFamily: string) => {
  return {
    fontFamily: fontFamily
  }
};

const createFontWeight = (fontWeight: number) => {
  const sketchRatio = fontWeight / 12;
  const domScale = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  const weight = domScale[Math.round(sketchRatio * domScale.length)];
  return {
    fontWeight: weight
  }
};

const createFontSize = (fontSize: number) => {
  return {
    fontSize: `${fontSize}px`
  }
};


const createFontStretch = (fontStretch: string) => {
  switch(fontStretch) {
    case 'compressed':
      return {
        fontStretch: 'extra-condensed'
      }
    case 'condensed':
      return {
        fontStretch: 'condensed'
      }
    case 'narrow':
      return {
        fontStretch: 'semi-condensed'
      }
    case 'expanded':
      return {
        fontStretch: 'expanded'
      }
    case 'poser':
      return {
        fontStretch: 'extra-expanded'
      }
    default:
      return {}
  };
};

const createFontColor = (color: string) => {
  return {
    color: cssColor(color)
  }
};

const createLineHeight = (lineHeight: number | null) => {
  if (lineHeight !== null) {
    return {
      lineHeight: `${lineHeight}px`
    }
  } else {
    return {}
  }
};

const createParagraphSpacing = (paragraphSpacing: number, lastChild: boolean) => {
  if (lastChild || paragraphSpacing === 0) {
    return {}
  } else {
    return {
      paddingBottom: `${paragraphSpacing}px`
    }
  }
};

const createTextAlign = (alignment: any) => {
  switch(alignment) {
    case 'left':
      return {
        textAlign: 'left'
      }
    case 'right':
      return {
        textAlign: 'right'
      }
    case 'center':
      return {
        textAlign: 'center'
      }
    case 'justified':
      return {
        textAlign: 'justify'
      }
  }
};

const createFontStyle = (fontStyle: string | undefined) => {
  if (fontStyle === 'italic') {
    return {
      fontStyle: 'italic'
    }
  } else {
    return {}
  }
};

const createVerticalAlignment = (alignment: string) => {
  switch(alignment) {
    case 'top':
      return {
        justifyContent: 'flex-start'
      }
    case 'center':
      return {
        justifyContent: 'center'
      }
    case 'bottom':
      return {
        justifyContent: 'flex-end'
      }
    default:
      return {
        justifyContent: 'flex-start'
      }
  }
};

export const textContainerStyles = (layer: any) => {
  const baseStyles = createBaseLayerStyles(layer);
  const verticalAlignment = createVerticalAlignment(layer.style.verticalAlignment);

  return {
    ...baseStyles,
    ...verticalAlignment
  }
};

export const paragraphSpacing = (layer: any, lastChild: boolean) => {
  const { style } = layer;
  const paragraphSpacing = createParagraphSpacing(style.paragraphSpacing, lastChild);

  return {
    ...paragraphSpacing
  }
}

export const textStyles = (layer: any) => {
  const { style } = layer;
  const textTransform = createTextTransform(style.textTransform);
  const fontFamily = createFontFamily(style.fontFamily);
  const fontSize = createFontSize(style.fontSize);
  const fontWeight = createFontWeight(style.fontWeight);
  const fontStyle = createFontStyle(style.fontStyle);
  const color = createFontColor(style.textColor);
  const lineHeight = createLineHeight(style.lineHeight);
  const opacity = createOpacity(style.opacity);
  const textDecoration = createTextDecoration(style.textStrikethrough, style.textUnderline);
  const fontStretch = createFontStretch(style.fontStretch);
  const textAlign = createTextAlign(style.alignment);
  const borders = createTextBorders(style.borders);
  const shadows = createTextShadows(style.shadows);
  const letterSpacing = createLetterSpacing(style.kerning);

  return {
    ...textTransform,
    ...textAlign,
    ...fontFamily,
    ...fontSize,
    ...fontWeight,
    ...fontStretch,
    ...fontStyle,
    ...color,
    ...lineHeight,
    ...opacity,
    ...textDecoration,
    ...borders,
    ...shadows,
    ...letterSpacing
  }
}