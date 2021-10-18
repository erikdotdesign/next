import { getImage, getScaledImage, cssColor, styleReducer } from '../utils';

export const createOverflow = (overflow: next.css.value.Overflow): next.css.Overflow => {
  return {
    overflow
  }
};

export const createMask = (mask: string): next.css.Mask => {
  return {
    mask: `url(${mask})`,
    WebkitMaskBoxImage: `url(${mask}) 100 100 0 0 stretch stretch`
  }
};

export const createLeft = (x: number): next.css.Left => {
  return {
    left: `${x}px`
  }
};

export const createTop = (y: number): next.css.Top => {
  return {
    top: `${y}px`
  }
};

export const createWidth = (width: number): next.css.Width => {
  return {
    width: `${width}px`
  }
};

export const createHeight = (height: number): next.css.Height => {
  return {
    height: `${height}px`
  }
};

export const createOpacity = (opacity: number): next.css.Opacity | null => {
  if (opacity < 1) {
    return {
      opacity
    }
  } else {
    return null;
  }
};

export const createBorderRadius = (shapeType: next.ShapeType, points: next.CurvePoint[]): next.css.BorderRadius | null => {
  switch(shapeType) {
    case 'Rectangle':
      const borderRadii = points.map((point: next.CurvePoint) => {
        return `${point.cornerRadius}px`;
      });
      const uniformRadius = borderRadii.every((radius: string) => {
        return radius === borderRadii[0];
      });
      if (uniformRadius && borderRadii[0] !== '0px') {
        return {
          borderRadius: borderRadii[0]
        }
      } else if (!uniformRadius) {
        return {
          borderRadius: borderRadii.join(' ')
        }
      } else {
        return null;
      }
    case 'Oval':
      return {
        borderRadius: '100%'
      }
    default:
      return null;
  };
};

export const createGaussianBlur = (blur: next.Blur): next.css.GaussianBlur | null => {
  const { enabled, blurType, radius } = blur;
  if (enabled && blurType === 'Gaussian') {
    return {
      filter: `blur(${radius}px)`
    }
  } else {
    return null;
  }
};

export const createScale = (zoom: number) => {
  if (zoom) {
    return {
      transform: `scale(${zoom})`
    }
  } else {
    return null;
  }
};

export const createBorder = (sketchBorder: next.Border): next.css.BoxShadow => {
  const { thickness, position } = sketchBorder;
  const color = cssColor(sketchBorder.color);
  let border;
  switch(position) {
    case 'Outside':
      border = `0 0 0 ${thickness}px ${color}`;
      break;
    case 'Center':
      // webkit does not like half pixel values
      if (thickness % 2 == 0) {
        border = `0 0 0 ${thickness / 2}px ${color} inset, 0 0 0 ${thickness / 2}px ${color}`;
      } else {
        border = `0 0 0 ${thickness}px ${color}`;
      }
      break;
    case 'Inside':
      border = `0 0 0 ${thickness}px ${color} inset`;
      break;
    default:
      border = `0 0 0 ${thickness}px ${color}`;
  }
  return {
    boxShadow: border
  }
};

export const createBorders = (sketchBorders: next.Border[]): next.css.BoxShadow | null => {
  const borders: string[] = [];
  sketchBorders.forEach((sketchBorder: next.Border) => {
    if (sketchBorder.enabled) {
      const border = createBorder(sketchBorder);
      return borders.push(border.boxShadow);
    }
  });
  if (borders.length > 0) {
    return {
      boxShadow: borders.join(', ')
    }
  } else {
    return null;
  }
};

export const createShadow = (sketchShadow: next.Shadow, inset: boolean): next.css.BoxShadow => {
  const { x, y, blur, spread, color } = sketchShadow;
  const base = `${x}px ${y}px ${blur}px ${spread}px ${cssColor(color)}`;
  const shadow = inset ? `${base} inset` : base;

  return {
    boxShadow: shadow
  }
};

export const createShadows = (sketchShadows: next.Shadow[]): next.css.BoxShadow | null => {
  const shadows: string[] = [];
  sketchShadows.forEach((sketchShadow: next.Shadow) => {
    if (sketchShadow.enabled) {
      const shadow = createShadow(sketchShadow, false);
      return shadows.push(shadow.boxShadow);
    }
  });
  if (shadows.length > 0) {
    return {
      boxShadow: shadows.join(', ')
    }
  } else {
    return null;
  }
};

export const createInnerShadows = (sketchInnerShadows: next.Shadow[]): next.css.BoxShadow | null => {
  const innerShadows: string[] = [];
  sketchInnerShadows.forEach((sketchInnerShadow: next.Shadow) => {
    if (sketchInnerShadow.enabled) {
      const innerShadow = createShadow(sketchInnerShadow, true);
      return innerShadows.push(innerShadow.boxShadow);
    }
  });
  if (innerShadows.length > 0) {
    return {
      boxShadow: innerShadows.join(', ')
    }
  } else {
    return null;
  }
}

export const combineBordersAndShadows = (boxShadows: any[]): next.css.BoxShadow | null => {
  const filtered: next.css.BoxShadow[] = boxShadows.filter((item: next.css.BoxShadow | null) => item !== null);
  const combined: string[] = filtered.map((item: next.css.BoxShadow) => {
    return item.boxShadow;
  });

  if (filtered.length > 0) {
    return {
      boxShadow: combined.join(', ')
    }
  } else {
    return null;
  }
};

export const createGradientFillImage = (images: next.ImgAsset[], id: string): next.css.BackgroundImage | null => {
  const image = getImage(images, id);
  const scaledImage = image ? getScaledImage(image) : null;
  if (image) {
    return {
      backgroundImage: `url(${scaledImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    }
  } else {
    return null;
  }
};

export const createColorFill = (color: string): next.css.Background => {
  return {
    background: cssColor(color)
  };
};

export const createPatternDisplay = (patternType: next.PatternFillType): Omit<next.css.BackgroundImage, 'backgroundImage'>  => {
  switch(patternType) {
    case 'Fill':
      return {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      }
    case 'Fit':
      return {
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }
    case 'Stretch':
      return {
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'initial'
      }
    case 'Tile':
      return {
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'initial'
      }
    default:
      return {
        backgroundSize: 'auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'initial'
      }
  };
};

export const createPatternFill = (pattern: next.Pattern, images: next.ImgAsset[]): next.css.BackgroundImage | null => {
  if (pattern.image) {
    const displayStyle = createPatternDisplay(pattern.patternType);
    const image = getImage(images, pattern.image.id);
    const useScaled = pattern.patternType !== 'Tile';
    if (image) {
      const imgSrc = useScaled ? image.src['2x'] : image.src['1x'];
      return {
        backgroundImage: `url(${imgSrc})`,
        ...displayStyle
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const createBackground = (layer: next.ShapePath | next.ShapePath | next.Image, images: next.ImgAsset[]): next.css.Background | next.css.BackgroundImage | null => {
  const { style, id } = layer;
  // get fills that are enabled
  const hasActiveFills = style.fills.some((fill: next.Fill) => fill.enabled);
  // create background if there are active fills
  if (hasActiveFills) {
    // get all active fills
    const activeFills = style.fills.filter((fill: next.Fill) => fill.enabled);
    // return active fill with highest index
    const topFill = activeFills[activeFills.length - 1];
    // create background by fillType
    switch(topFill.fillType) {
      case 'Color':
        return createColorFill(topFill.color);
      case 'Gradient':
        return createGradientFillImage(images, id);
      case 'Pattern':
        return createPatternFill(topFill.pattern, images);
      default:
        return createColorFill(topFill.color);
    };
  } else {
    return null;
  }
};

export const createHorizontalFlip = (transform: next.Transform): next.css.Transform | null => {
  if (transform && transform.flippedHorizontally) {
    return {
      transform: `scaleX(-1)`
    }
  } else {
    return null;
  }
};

export const createVerticalFlip = (transform: next.Transform): next.css.Transform | null => {
  if (transform && transform.flippedVertically) {
    return {
      transform: `scaleY(-1)`
    }
  } else {
    return null;
  }
};

export const createRotation = (transform: next.Transform): next.css.Transform | null => {
  if (transform && transform.rotation !== 0) {
    const scaleX = transform.flippedHorizontally ? -1 : 1;
    const scaleY = transform.flippedVertically ? -1 : 1;
    const rotation = transform.rotation * scaleX * scaleY;
    return {
      transform: `rotate(${rotation}deg)`
    }
  } else {
    return null;
  }
};

export const createTransform = (transforms: any[]): next.css.Transform | null => {
  const filtered: next.css.Transform[] = transforms.filter((transform: next.css.Transform | null) => transform !== null);
  const combined: string[] = filtered.map((item: next.css.Transform) => {
    return item.transform;
  });

  if (filtered.length > 0) {
    return {
      transform: combined.join(' ')
    }
  } else {
    return null;
  }
};

export const createFill = (fills: next.Fill[]): next.css.Fill | null => {
  // get fills that are enabled
  const hasActiveFills = fills.some((fill: next.Fill) => fill.enabled);
  // create background if there are active fills
  if (hasActiveFills) {
    // get all active fills
    const activeFills = fills.filter((fill: next.Fill) => fill.enabled);
    // return active fill with highest index
    const topFill = activeFills[activeFills.length - 1];
    // return fill
    return {
      fill: cssColor(topFill.color)
    }
  } else {
    return {
      fill: 'none'
    }
  }
};

export const createStrokeWidth = (borders: next.Border[]): next.css.StrokeWidth | null => {
  // get borders that are enabled
  const hasActiveBorders = borders.some((border: next.Border) => border.enabled);
  // create border if there are active borders
  if (hasActiveBorders) {
    // get all active borders
    const activeBorders = borders.filter((border: next.Border) => border.enabled);
    // return active border with highest index
    const topBorder = activeBorders[activeBorders.length - 1];
    // create stroke from border
    const { thickness } = topBorder;
    // return thickness
    return {
      strokeWidth: thickness
    }
  } else {
    return null;
  }
};

export const createStroke = (borders: next.Border[]): next.css.Stroke | null => {
  // get borders that are enabled
  const hasActiveBorders = borders.some((border: next.Border) => border.enabled);
  // create border if there are active borders
  if (hasActiveBorders) {
    // get all active borders
    const activeBorders = borders.filter((border: next.Border) => border.enabled);
    // return active border with highest index
    const topBorder = activeBorders[activeBorders.length - 1];
    // return color
    return {
      stroke: cssColor(topBorder.color)
    }
  } else {
    return null;
  }
};

export const createStrokeLineJoin = (sketchLineJoin: string): next.css.StrokeLineJoin => {
  let lineJoin;
  switch(sketchLineJoin) {
    case 'Miter':
      lineJoin = 'miter';
      break;
    case 'Round':
      lineJoin = 'round';
      break;
    case 'Bevel':
      lineJoin = 'bevel';
      break;
    default:
      lineJoin = 'miter';
  };
  return {
    strokeLinejoin: lineJoin
  }
};

export const createStrokeDashArray = (sketchDashPattern: number[]): next.css.StrokeDashArray | null => {
  if (sketchDashPattern.length > 0) {
    return {
      strokeDasharray: sketchDashPattern.join(', ')
    }
  } else {
    return null;
  }
};

export const createStrokeLineCap = (sketchLineEnd: string): next.css.StrokeLineCap => {
  let lineCap;
  switch(sketchLineEnd) {
    case 'Butt':
      lineCap = 'butt';
      break;
    case 'Round':
      lineCap = 'round';
      break;
    case 'Projecting':
      lineCap = 'square';
      break;
    default:
      lineCap = 'butt';
  };
  return {
    strokeLinecap: lineCap
  }
};

export const createBaseLayerStyles = (layer: next.AppArtboardLayer) => {
  const { frame } = layer;
  // generate styles
  const width = createWidth(frame.width);
  const height = createHeight(frame.height);
  const top = createTop(frame.y);
  const left = createLeft(frame.x);
  const filter = createGaussianBlur(layer.style.blur);
  const opacity = createOpacity(layer.style.opacity);
  const transformRotation = createRotation(layer.transform);
  const transformHFlip = createHorizontalFlip(layer.transform);
  const transformVFlip = createVerticalFlip(layer.transform);
  const transform = createTransform([transformRotation, transformHFlip, transformVFlip]);
  // combine styles
  const combined = [
    width,
    height,
    top,
    left,
    filter,
    opacity,
    transform
  ];
  // return final style object
  return styleReducer(combined);
};