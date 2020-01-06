import { createBaseLayerStyles, createOpacity, cssColor } from './layerStyles';

const createTextTransform = (transform: srm.TextTransform) => {
  return {
    textTransform: transform
  }
};

const createTextStroke = (borders: srm.Border[]) => {
  if (borders.length > 0 && borders[0].enabled) {
    const { color } = borders[0];
    return {
      WebkitTextStrokeColor: cssColor(color),
      MozTextStrokeColor: cssColor(color)
    }
  } else {
    return {
      WebkitTextStrokeColor: 'none',
      MozTextStrokeColor: 'none',
    }
  }
};

const createTextStrokeWidth = (borders: srm.Border[]) => {
  if (borders.length > 0 && borders[0].enabled) {
    const { thickness } = borders[0];
    return {
      WebkitTextStrokeWidth: `${thickness * 2}px`,
      MozTextStrokeWidth: `${thickness * 2}px`
    }
  } else {
    return {
      WebkitTextStrokeWidth: 'none',
      MozTextStrokeWidth: 'none'
    }
  }
};

const createTextShadow = (sketchShadow: srm.Shadow) => {
  const { x, y, blur, color } = sketchShadow;
  const textShadow = `${x}px ${y}px ${blur}px ${cssColor(color)}`;
  return {
    textShadow
  }
};

const createTextShadows = (shadows: srm.Shadow[]) => {
  if (shadows.length > 0) {
    const textShadows = shadows.map((shadow: srm.Shadow) => {
      if (shadow.enabled) {
        const textShadow = createTextShadow(shadow);
        return textShadow.textShadow;
      }
    });
    return {
      textShadow: textShadows.join(', ')
    }
  } else {
    return {
      textShadow: 'none'
    }
  }
};

const createTextDecoration = (textStrikethrough: srm.TextStrikethrough, textUnderline: srm.TextUnderline) => {
  if (textStrikethrough) {
    return {
      textDecoration: 'line-through'
    }
  } else if (textUnderline) {
    return {
      textDecoration: 'underline'
    }
  } else {
    return {
      textDecoration: 'none'
    }
  }
};

const createLetterSpacing = (kerning: number | null) => {
  if (kerning !== null) {
    return {
      letterSpacing: `${kerning}px`
    }
  } else {
    return {
      letterSpacing: 'none'
    }
  }
};

const createFontFamily = (fontFamily: string) => {
  return {
    fontFamily: fontFamily
  }
};

const createFontWeight = (fontWeight: srm.FontWeight) => {
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

const createFontStretch = (fontStretch: srm.FontStretch) => {
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
    case 'poster':
      return {
        fontStretch: 'extra-expanded'
      }
    default:
      return {
        fontStretch: 'normal'
      }
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
    return {
      lineHeight: 'normal'
    }
  }
};

const createParagraphSpacing = (paragraphSpacing: number, lastChild: boolean) => {
  if (lastChild || paragraphSpacing === 0) {
    return {
      paddingBottom: 'none'
    }
  } else {
    return {
      paddingBottom: `${paragraphSpacing}px`
    }
  }
};

const createTextAlign = (alignment: srm.Alignment) => {
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
    default:
      return {
        textAlign: 'left'
      }
  }
};

const createFontStyle = (fontStyle: srm.FontStyle) => {
  if (fontStyle === 'italic') {
    return {
      fontStyle: 'italic'
    }
  } else {
    return {
      fontStyle: 'normal'
    }
  }
};

const createVerticalAlignment = (alignment: srm.VerticalAlignment) => {
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

export const textContainerStyles = (layer: srm.Text) => {
  const baseStyles = createBaseLayerStyles(layer);
  const verticalAlignment = createVerticalAlignment(layer.style.verticalAlignment);

  return {
    ...baseStyles,
    ...verticalAlignment
  }
};

export const paragraphSpacing = (layer: srm.Text, lastChild: boolean) => {
  const { style } = layer;
  const paragraphSpacing = createParagraphSpacing(style.paragraphSpacing, lastChild);

  return {
    ...paragraphSpacing
  }
};

export const textStyles = (layer: srm.Text) => {
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
  const textStroke = createTextStroke(style.borders);
  const textStrokeWidth = createTextStrokeWidth(style.borders);
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
    ...textStroke,
    ...textStrokeWidth,
    ...shadows,
    ...letterSpacing
  }
};