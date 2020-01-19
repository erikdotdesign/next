import { cssColor, styleReducer } from '../utils';
import { createBaseLayerStyles } from './layerStyles';

const createTextTransform = (transform: srm.TextTransform): srm.css.TextTransform | null => {
  if (transform !== 'none') {
    return {
      textTransform: transform
    }
  } else {
    return null;
  }
};

const createTextStroke = (borders: srm.Border[]): srm.css.TextStrokeColor | null => {
  if (borders.length > 0 && borders[0].enabled) {
    const { color } = borders[0];
    return {
      WebkitTextStrokeColor: cssColor(color),
      MozTextStrokeColor: cssColor(color)
    }
  } else {
    return null;
  }
};

const createTextStrokeWidth = (borders: srm.Border[]): srm.css.TextStrokeWidth | null => {
  if (borders.length > 0 && borders[0].enabled) {
    const { thickness } = borders[0];
    return {
      WebkitTextStrokeWidth: `${thickness * 2}px`,
      MozTextStrokeWidth: `${thickness * 2}px`
    }
  } else {
    return null;
  }
};

const createTextShadow = (sketchShadow: srm.Shadow): srm.css.TextShadow | null => {
  const { x, y, blur, color } = sketchShadow;
  const textShadow = `${x}px ${y}px ${blur}px ${cssColor(color)}`;
  return {
    textShadow
  }
};

const createTextShadows = (sketchShadows: srm.Shadow[]): srm.css.TextShadow | null => {
  const enabledShadows = sketchShadows.filter((sketchShadow: srm.Shadow) => {
    return sketchShadow.enabled;
  });
  if (enabledShadows.length > 0) {
    const textShadows = enabledShadows.map((sketchShadow: srm.Shadow) => {
      const shadow = createTextShadow(sketchShadow);
      return (<srm.css.TextShadow>shadow).textShadow;
    });
    return {
      textShadow: textShadows.join(', ')
    }
  } else {
    return null;
  }
};

const createTextDecoration = (textStrikethrough: srm.TextStrikethrough, textUnderline: srm.TextUnderline): srm.css.TextDecoration | null => {
  if (textStrikethrough) {
    return {
      textDecoration: 'line-through'
    }
  } else if (textUnderline) {
    return {
      textDecoration: 'underline'
    }
  } else {
    return null;
  }
};

const createLetterSpacing = (kerning: number | null): srm.css.LetterSpacing | null => {
  if (kerning !== null) {
    return {
      letterSpacing: `${kerning}px`
    }
  } else {
    return null;
  }
};

const createFontFamily = (fontFamily: string): srm.css.FontFamily | null => {
  return {
    fontFamily: fontFamily
  }
};

const createFontWeight = (fontWeight: srm.FontWeight): srm.css.FontWeight => {
  const sketchRatio = fontWeight / 12;
  const domScale = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  const weight = domScale[Math.round(sketchRatio * domScale.length)];
  return {
    //@ts-ignore
    fontWeight: weight
  }
};

const createFontSize = (fontSize: number): srm.css.FontSize => {
  return {
    fontSize: `${fontSize}px`
  }
};

const createFontStretch = (fontStretch: srm.FontStretch): srm.css.FontStretch | null => {
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
      return null;
  };
};

const createFontColor = (color: string): srm.css.Color => {
  return {
    color: cssColor(color)
  }
};

const createLineHeight = (lineHeight: number | null): srm.css.LineHeight | null => {
  if (lineHeight !== null) {
    return {
      lineHeight: `${lineHeight}px`
    }
  } else {
    return null;
  }
};

const createParagraphSpacing = (paragraphSpacing: number, lastChild: boolean): srm.css.PaddingBottom => {
  if (lastChild || paragraphSpacing === 0) {
    return {
      paddingBottom: '0px'
    }
  } else {
    return {
      paddingBottom: `${paragraphSpacing}px`
    }
  }
};

const createTextAlign = (alignment: srm.Alignment): srm.css.TextAlign | null => {
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
      return null;
  }
};

const createFontStyle = (fontStyle: srm.FontStyle): srm.css.FontStyle | null => {
  if (fontStyle === 'italic') {
    return {
      fontStyle: 'italic'
    }
  } else {
    return null;
  }
};

const createVerticalAlignment = (alignment: srm.VerticalAlignment): srm.css.JustifyContent => {
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

export const paragraphSpacing = (layer: srm.Text, lastChild: boolean) => {
  const { style } = layer;
  const paragraphSpacing = createParagraphSpacing(style.paragraphSpacing, lastChild);

  return {
    ...paragraphSpacing
  }
};

export const textContainerStyles = (layer: srm.Text) => {
  const baseStyles = createBaseLayerStyles(layer);
  const verticalAlignment = createVerticalAlignment(layer.style.verticalAlignment);

  return styleReducer([baseStyles, verticalAlignment]);
};

export const textStyles = (layer: srm.Text) => {
  const { style } = layer;
  const color = createFontColor(style.textColor);
  const fontFamily = createFontFamily(style.fontFamily);
  const fontSize = createFontSize(style.fontSize);
  const fontStretch = createFontStretch(style.fontStretch);
  const fontStyle = createFontStyle(style.fontStyle);
  const fontWeight = createFontWeight(style.fontWeight);
  const letterSpacing = createLetterSpacing(style.kerning);
  const lineHeight = createLineHeight(style.lineHeight);
  const textAlign = createTextAlign(style.alignment);
  const textDecoration = createTextDecoration(style.textStrikethrough, style.textUnderline);
  const textShadow = createTextShadows(style.shadows);
  const textStroke = createTextStroke(style.borders);
  const textStrokeWidth = createTextStrokeWidth(style.borders);
  const textTransform = createTextTransform(style.textTransform);

  const combined = [
    color,
    fontFamily,
    fontSize,
    fontStretch,
    fontStyle,
    fontWeight,
    letterSpacing,
    lineHeight,
    textAlign,
    textDecoration,
    textShadow,
    textStroke,
    textStrokeWidth,
    textTransform
  ];

  return styleReducer(combined);
};