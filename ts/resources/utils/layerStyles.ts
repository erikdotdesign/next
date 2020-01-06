import chroma from 'chroma-js';

export const getImage = (images: srm.Base64Image[], id: string): srm.Base64Image | undefined  => {
  return images.find((image: srm.Base64Image) => image.id === id);
};

export const cssColor = (color: string): string => {
  return chroma(color).css();
};

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

export const createOpacity = (opacity: number): srm.css.Opacity => {
  if (opacity < 1) {
    return {
      opacity
    }
  } else {
    return {
      opacity: 1
    };
  }
};

export const createBorderRadius = (shapeType: srm.ShapeType, points: srm.CurvePoint[]): srm.css.BorderRadius => {
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
        return {
          borderRadius: 'none'
        }
      }
    case 'Oval':
      return {
        borderRadius: '100%'
      }
    default:
      return {
        borderRadius: 'none'
      }
  };
};

export const createGaussianBlur = (blur: srm.Blur): srm.css.GaussianBlur => {
  const { enabled, blurType, radius } = blur;
  if (enabled && blurType === 'Gaussian') {
    return {
      filter: `blur(${radius}px)`
    }
  } else {
    return {
      filter: 'none'
    }
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

export const createBorders = (sketchBorders: srm.Border[]): srm.css.BoxShadow => {
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
    return {
      boxShadow: 'none'
    }
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

export const createShadows = (sketchShadows: srm.Shadow[]): srm.css.BoxShadow => {
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
    return {
      boxShadow: 'none'
    }
  }
};

export const createInnerShadows = (sketchInnerShadows: srm.Shadow[]): srm.css.BoxShadow => {
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
    return {
      boxShadow: 'none'
    }
  }
}

export const combineBordersAndShadows = (borders: srm.css.BoxShadow, shadows: srm.css.BoxShadow, innerShadows: srm.css.BoxShadow): srm.css.BoxShadow => {
  const withBorders = borders.boxShadow;
  const withShadows = shadows.boxShadow;
  const withInnerShadows = innerShadows.boxShadow;
  const combined = [withBorders, withShadows, withInnerShadows];
  const filtered = combined.filter((boxShadow: string) => boxShadow !== 'none');

  if (filtered.length > 0) {
    return {
      boxShadow: filtered.join(', ')
    }
  } else {
    return {
      boxShadow: 'none'
    }
  }
};

export const createGradientFillImage = (images: srm.Base64Image[], id: string): srm.css.Background | Pick<srm.css.Background, 'background'> => {
  const image = getImage(images, id);
  if (image) {
    return {
      background: `url(${image.src})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    }
  } else {
    return {
      background: 'none'
    }
  }
};

const createColorFill = (color: string): Pick<srm.css.Background, 'background'> => {
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

export const createPatternFill = (pattern: srm.Pattern, images: srm.Base64Image[]): srm.css.Background => {
  const displayStyle = createPatternDisplay(pattern.patternType);
  if (pattern.image) {
    const image = getImage(images, pattern.image.id);
    if (image) {
      return {
        background: `url(${image.src})`,
        ...displayStyle
      }
    } else {
      return {
        background: 'none',
        ...displayStyle
      }
    }
  } else {
    return {
      background: 'none',
      ...displayStyle
    }
  }
};

export const createBackground = (layer: srm.ShapePath | srm.ShapePath | srm.Image, images: srm.Base64Image[]): srm.css.Background | Pick<srm.css.Background, 'background'> => {
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
    return {
      background: 'none'
    }
  }
};

export const createSVGFill = (fills: srm.Fill[]): srm.css.Fill => {
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

export const createSVGStrokeWidth = (borders: srm.Border[]): srm.css.StrokeWidth => {
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
    return {
      strokeWidth: 'none'
    }
  }
};

export const createSVGStroke = (borders: srm.Border[]): srm.css.Stroke => {
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
    return {
      stroke: 'none'
    }
  }
};

export const createSVGStrokeLineJoin = (sketchLineJoin: string): srm.css.StrokeLineJoin => {
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

export const createSVGStrokeDashArray = (sketchDashPattern: number[]): srm.css.StrokeDashArray => {
  if (sketchDashPattern.length > 0) {
    return {
      strokeDasharray: sketchDashPattern.join(', ')
    }
  } else {
    return {
      strokeDasharray: 'none'
    }
  }
};

export const createSVGStrokeLineCap = (sketchLineEnd: string): srm.css.StrokeLineCap => {
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

export const createSVGPath = (path: string): srm.css.D => {
  if (path) {
    return {
      d: path
    }
  } else {
    return {
      d: 'none'
    }
  }
};

export const createShapeSVGMarkerPosition = (arrowHead: string): number => {
  switch(arrowHead) {
    case 'OpenArrow':
    case 'FilledArrow':
      return 3;
    case 'Line':
      return 0.5;
    case 'OpenCircle':
    case 'OpenSquare':
    case 'FilledCircle':
    case 'FilledSquare':
    case 'None':
    default:
      return 0;
  }
};

export const createShapeSVGMarkerShape = (arrowHead: string): string => {
  switch(arrowHead) {
    case 'OpenArrow':
      return `M0.35260086,-3.45328119e-16 L5,2.5 L0.35260086,5
      L-8.8817842e-16,4.24129422 L3.23702251,2.5 L0,0.758705776
      L0.35260086,-3.45328119e-16 Z`;
    case 'FilledArrow':
      return `M5,2.5 L-8.8817842e-16,5 L0,-4.5924255e-16 L5,2.5 Z`;
    case 'Line':
      return `M0,0 L1,0 L1,5 L0,5 L0,0 Z`;
    case 'OpenCircle':
      return `M2.5,0 C3.88071187,0 5,1.11928813 5,2.5 C5,3.88071187
      3.88071187,5 2.5,5 C1.11928813,5 0,3.88071187 0,2.5 C0,1.11928813
      1.11928813,0 2.5,0 Z M2.5,1 C1.67157288,1 1,1.67157288 1,2.5
      C1,3.32842712 1.67157288,4 2.5,4 C3.32842712,4 4,3.32842712
      4,2.5 C4,1.67157288 3.32842712,1 2.5,1 Z`;
    case 'FilledCircle':
      return `M2.5,0 C3.88071187,-2.53632657e-16 5,1.11928813 5,2.5
      C5,3.88071187 3.88071187,5 2.5,5 C1.11928813,5 1.69088438e-16,3.88071187
      0,2.5 C-1.69088438e-16,1.11928813 1.11928813,2.53632657e-16 2.5,0 Z`;
    case 'OpenSquare':
      return `M5,0 L5,5 L0,5 L0,0 L5,0 Z M4,1 L1,1 L1,4 L4,4 L4,1 Z`;
    case 'FilledSquare':
      return `M0,0 L5,0 L5,5 L0,5 L0,0 Z`;
    default:
      return ``;
  }
};

export const createHorizontalFlip = (transform: srm.Transform): srm.css.Transform => {
  if (transform && transform.flippedHorizontally) {
    return {
      transform: `scaleX(-1)`
    }
  } else {
    return {
      transform: 'none'
    }
  }
};

export const createVerticalFlip = (transform: srm.Transform): srm.css.Transform => {
  if (transform && transform.flippedVertically) {
    return {
      transform: `scaleY(-1)`
    }
  } else {
    return {
      transform: 'none'
    }
  }
};

export const createRotation = (transform: srm.Transform): srm.css.Transform => {
  if (transform && transform.rotation !== 0) {
    const scaleX = transform.flippedHorizontally ? -1 : 1;
    const scaleY = transform.flippedVertically ? -1 : 1;
    const rotation = transform.rotation * scaleX * scaleY;
    return {
      transform: `rotate(${rotation}deg)`
    }
  } else {
    return {
      transform: 'none'
    }
  }
};

export const createTransform = (rotation: srm.css.Transform, horizontalFlip: srm.css.Transform, verticalFlip: srm.css.Transform): srm.css.Transform => {
  const rotate = rotation.transform;
  const scaleX = horizontalFlip.transform;
  const scaleY = verticalFlip.transform;
  const combined = [rotate, scaleX, scaleY];
  const filtered = combined.filter((transform) => transform !== 'none');

  if (filtered.length > 0) {
    return {
      transform: filtered.join(' ')
    }
  } else {
    return {
      transform: 'none'
    }
  }
};

export const createBaseLayerStyles = (layer: srm.Shape | srm.ShapePath | srm.Image | srm.Text) => {
  const { frame } = layer;
  const width = createWidth(frame.width);
  const height = createHeight(frame.height);
  const left = createLeft(frame.x);
  const top = createTop(frame.y);
  const rotation = createRotation(layer.transform);
  const horizontalFlip = createHorizontalFlip(layer.transform);
  const verticalFlip = createVerticalFlip(layer.transform);
  const transform = createTransform(rotation, horizontalFlip, verticalFlip);
  const gaussianBlur = createGaussianBlur(layer.style.blur);

  return {
    ...width,
    ...height,
    ...left,
    ...top,
    ...transform,
    ...gaussianBlur
  }
};

export const createArtboardStyles = (artboard: srm.Artboard) => {
  const { frame, background } = artboard;
  const { color, enabled } = background;
  const width = createWidth(frame.width);
  const height = createHeight(frame.height);
  const bg = enabled ? createColorFill(color) : { background: 'transparent' };

  return {
    ...width,
    ...height,
    ...bg
  }
};

export const createShapePathStyles = (layer: srm.ShapePath, images: srm.Base64Image[]) => {
  const { style, shapeType, points } = layer;
  // get shape path and type
  const hasOpenPath = !layer.closed;
  const notRectangle = layer.shapeType !== 'Rectangle';
  const notOval = layer.shapeType !== 'Oval';
  const isOddShape = notRectangle && notOval;
  // get styles
  const baseStyles = createBaseLayerStyles(layer);
  const borderRadius = createBorderRadius(shapeType, points);
  const opacity = createOpacity(style.opacity);
  const background = createBackground(layer, images);
  const borders = createBorders(style.borders);
  const shadows = createShadows(style.shadows);
  const innerShadows = createInnerShadows(style.innerShadows);
  const bordersAndShadows = combineBordersAndShadows(borders, shadows, innerShadows);

  // if shape is open or odd, it will be an svg with shape styles
  // else it will be a div with full styles
  if (hasOpenPath || isOddShape) {
    return {...createShapeStyles(layer), ...createShapeSVGPathStyles(layer)};
  } else {
    return {
      ...baseStyles,
      ...borderRadius,
      ...opacity,
      ...background,
      ...bordersAndShadows
    }
  }
};

export const createShapeStyles = (layer: srm.Shape | srm.ShapePath) => {
  const { style } = layer;
  const baseStyles = createBaseLayerStyles(layer);
  const opacity = createOpacity(style.opacity);

  return {
    ...baseStyles,
    ...opacity
  }
};

export const createShapeSVGPathStyles = (layer: srm.ShapePath) => {
  const { style } = layer;
  const fill = createSVGFill(style.fills);
  const stroke = createSVGStroke(style.borders);
  const strokeWidth = createSVGStrokeWidth(style.borders);
  const strokeDashArray = createSVGStrokeDashArray(style.borderOptions.dashPattern);
  const lineJoin = createSVGStrokeLineJoin(style.borderOptions.lineJoin);
  const lineCap = createSVGStrokeLineCap(style.borderOptions.lineEnd);

  return {
    ...fill,
    ...stroke,
    ...strokeWidth,
    ...strokeDashArray,
    ...lineJoin,
    ...lineCap
  }
};

export const createShapeSVGMarkerStyles = (layer: srm.ShapePath, arrowHead: string) => {
  const { style } = layer;
  const stroke = createSVGStroke(style.borders);
  switch(arrowHead) {
    case 'OpenArrow':
    case 'OpenCircle':
    case 'OpenSquare':
    case 'FilledArrow':
    case 'FilledCircle':
    case 'FilledSquare':
    case 'Line':
      return {
        fill: stroke.stroke,
        stroke: 'none'
      }
    case 'None':
      return {
        stroke: 'none',
        fill: 'none'
      }
  }
};

export const createImageStyles = (layer: srm.Image, images: srm.Base64Image[]) => {
  const { style } = layer;
  const baseImage = getImage(images, layer.image.id);
  const baseStyles = createBaseLayerStyles(layer);
  const opacity = createOpacity(style.opacity);
  const fillBackground = createBackground(layer, images);
  const borders = createBorders(style.borders);
  const shadows = createShadows(style.shadows);
  const innerShadows = createInnerShadows(style.innerShadows);
  const bordersAndShadows = combineBordersAndShadows(borders, shadows, innerShadows);

  let background;

  const imageBackground = {
    background: `url(${baseImage ? baseImage.src : ''})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  };

  if (fillBackground.background === 'none') {
    background = imageBackground;
  } else {
    background = fillBackground;
  }

  return {
    ...baseStyles,
    ...opacity,
    ...background,
    ...bordersAndShadows
  }
};