import { getImage, getScaledImage, cssColor, styleReducer } from '../utils';

export const createLeft = (x: number): srm.css.Left => {
  return {
    left: `${x}px`
  }
};

export const createTop = (y: number): srm.css.Top => {
  return {
    top: `${y}px`
  }
};

export const createWidth = (width: number): srm.css.Width => {
  return {
    width: `${width}px`
  }
};

export const createHeight = (height: number): srm.css.Height => {
  return {
    height: `${height}px`
  }
};

export const createOpacity = (opacity: number): srm.css.Opacity | null => {
  if (opacity < 1) {
    return {
      opacity
    }
  } else {
    return null;
  }
};

export const createBorderRadius = (shapeType: srm.ShapeType, points: srm.CurvePoint[]): srm.css.BorderRadius | null => {
  switch(shapeType) {
    case 'Rectangle':
      const borderRadii = points.map((point: srm.CurvePoint) => {
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

export const createGaussianBlur = (blur: srm.Blur): srm.css.GaussianBlur | null => {
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

export const createBorder = (sketchBorder: srm.Border): srm.css.BoxShadow => {
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

export const createBorders = (sketchBorders: srm.Border[]): srm.css.BoxShadow | null => {
  const borders: string[] = [];
  sketchBorders.forEach((sketchBorder: srm.Border) => {
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

export const createShadow = (sketchShadow: srm.Shadow, inset: boolean): srm.css.BoxShadow => {
  const { x, y, blur, spread, color } = sketchShadow;
  const base = `${x}px ${y}px ${blur}px ${spread}px ${cssColor(color)}`;
  const shadow = inset ? `${base} inset` : base;

  return {
    boxShadow: shadow
  }
};

export const createShadows = (sketchShadows: srm.Shadow[]): srm.css.BoxShadow | null => {
  const shadows: string[] = [];
  sketchShadows.forEach((sketchShadow: srm.Shadow) => {
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

export const createInnerShadows = (sketchInnerShadows: srm.Shadow[]): srm.css.BoxShadow | null => {
  const innerShadows: string[] = [];
  sketchInnerShadows.forEach((sketchInnerShadow: srm.Shadow) => {
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

export const combineBordersAndShadows = (boxShadows: any[]): srm.css.BoxShadow | null => {
  const filtered: srm.css.BoxShadow[] = boxShadows.filter((item: srm.css.BoxShadow | null) => item !== null);
  const combined: string[] = filtered.map((item: srm.css.BoxShadow) => {
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

export const createGradientFillImage = (images: srm.ImgAsset[], id: string): srm.css.Background | Pick<srm.css.Background, 'background'> | null => {
  const image = getImage(images, id);
  const scaledImage = image ? getScaledImage(image) : null;
  if (image) {
    return {
      background: `url(${scaledImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    }
  } else {
    return null;
  }
};

export const createColorFill = (color: string): Pick<srm.css.Background, 'background'> => {
  return {
    background: cssColor(color)
  };
};

export const createPatternDisplay = (patternType: srm.PatternFillType): Omit<srm.css.Background, 'background'>  => {
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

export const createPatternFill = (pattern: srm.Pattern, images: srm.ImgAsset[]): srm.css.Background | null => {
  const displayStyle = createPatternDisplay(pattern.patternType);
  if (pattern.image) {
    const image = getImage(images, pattern.image.id);
    const scaledImage = image ? getScaledImage(image) : null;
    if (image) {
      return {
        background: `url(${scaledImage})`,
        ...displayStyle
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const createBackground = (layer: srm.ShapePath | srm.ShapePath | srm.Image, images: srm.ImgAsset[]): srm.css.Background | Pick<srm.css.Background, 'background'> | null => {
  const { style, id } = layer;
  // get fills that are enabled
  const hasActiveFills = style.fills.some((fill: srm.Fill) => fill.enabled);
  // create background if there are active fills
  if (hasActiveFills) {
    // get all active fills
    const activeFills = style.fills.filter((fill: srm.Fill) => fill.enabled);
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

export const createHorizontalFlip = (transform: srm.Transform): srm.css.Transform | null => {
  if (transform && transform.flippedHorizontally) {
    return {
      transform: `scaleX(-1)`
    }
  } else {
    return null;
  }
};

export const createVerticalFlip = (transform: srm.Transform): srm.css.Transform | null => {
  if (transform && transform.flippedVertically) {
    return {
      transform: `scaleY(-1)`
    }
  } else {
    return null;
  }
};

export const createRotation = (transform: srm.Transform): srm.css.Transform | null => {
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

export const createTransform = (transforms: any[]): srm.css.Transform | null => {
  const filtered: srm.css.Transform[] = transforms.filter((transform: srm.css.Transform | null) => transform !== null);
  const combined: string[] = filtered.map((item: srm.css.Transform) => {
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

export const createFill = (fills: srm.Fill[]): srm.css.Fill | null => {
  // get fills that are enabled
  const hasActiveFills = fills.some((fill: srm.Fill) => fill.enabled);
  // create background if there are active fills
  if (hasActiveFills) {
    // get all active fills
    const activeFills = fills.filter((fill: srm.Fill) => fill.enabled);
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

export const createStrokeWidth = (borders: srm.Border[]): srm.css.StrokeWidth | null => {
  // get borders that are enabled
  const hasActiveBorders = borders.some((border: srm.Border) => border.enabled);
  // create border if there are active borders
  if (hasActiveBorders) {
    // get all active borders
    const activeBorders = borders.filter((border: srm.Border) => border.enabled);
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

export const createStroke = (borders: srm.Border[]): srm.css.Stroke | null => {
  // get borders that are enabled
  const hasActiveBorders = borders.some((border: srm.Border) => border.enabled);
  // create border if there are active borders
  if (hasActiveBorders) {
    // get all active borders
    const activeBorders = borders.filter((border: srm.Border) => border.enabled);
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

export const createStrokeLineJoin = (sketchLineJoin: string): srm.css.StrokeLineJoin => {
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

export const createStrokeDashArray = (sketchDashPattern: number[]): srm.css.StrokeDashArray | null => {
  if (sketchDashPattern.length > 0) {
    return {
      strokeDasharray: sketchDashPattern.join(', ')
    }
  } else {
    return null;
  }
};

export const createStrokeLineCap = (sketchLineEnd: string): srm.css.StrokeLineCap => {
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

export const createBaseLayerStyles = (layer: srm.AppArtboardLayer) => {
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