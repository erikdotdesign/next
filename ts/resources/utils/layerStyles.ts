import chroma from 'chroma-js';

export const getImage = (images: any, id: any) => {
  return images.find((image: any) => image.id === id);
};

export const cssColor = (color: string) => {
  return chroma(color).css();
}

export const createPosition = (x: number, y: number) => {
  return {
    left: `${x}px`,
    top: `${y}px`
  }
};

export const createWidth = (width: number) => {
  return {
    width: `${width}px`
  }
};

export const createHeight = (height: number) => {
  return {
    height: `${height}px`
  }
};

export const createOpacity = (opacity: number) => {
  if (opacity === 1) {
    return {}
  } else {
    return {
      opacity
    }
  }
};

export const createBorderRadius = (shapeType: any, points: any) => {
  switch(shapeType) {
    case 'Rectangle':
      const borderRadii = points.map((point: any) => {
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
        return {}
      }
    case 'Oval':
      return {
        borderRadius: '100%'
      }
    default:
      return {}
  };
};

export const createBorder = (sketchBorder: any) => {
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

export const createBorders = (sketchBorders: any) => {
  const borders = sketchBorders.map((sketchBorder: any) => {
    if (sketchBorder.enabled) {
      const border = createBorder(sketchBorder);
      return border.boxShadow;
    }
  });
  if (borders.length > 0) {
    return {
      boxShadow: borders.join(', ')
    }
  } else {
    return {}
  }
};

export const createGaussianBlur = (blur: any) => {
  const { enabled, blurType, radius } = blur;
  if (enabled && blurType === 'Gaussian') {
    return {
      filter: `blur(${radius}px)`
    }
  } else {
    return {}
  }
};

export const createShadow = (sketchShadow: any, inset: boolean) => {
  const { x, y, blur, spread, color } = sketchShadow;
  const base = `${x}px ${y}px ${blur}px ${spread}px ${cssColor(color)}`;
  const shadow = inset ? `${base} inset` : base;

  return {
    boxShadow: shadow
  }
};

export const createShadows = (sketchShadows: any) => {
  const shadows = sketchShadows.map((sketchShadow: any) => {
    if (sketchShadow.enabled) {
      const shadow = createShadow(sketchShadow, false);
      return shadow.boxShadow;
    }
  });
  if (shadows.length > 0) {
    return {
      boxShadow: shadows.join(', ')
    }
  } else {
    return {}
  }
};

export const createInnerShadows = (sketchInnerShadows: any) => {
  const innerShadows = sketchInnerShadows.map((sketchInnerShadow: any) => {
    if (sketchInnerShadow.enabled) {
      const innerShadow = createShadow(sketchInnerShadow, true);
      return innerShadow.boxShadow;
    }
  });
  if (innerShadows.length > 0) {
    return {
      boxShadow: innerShadows.join(', ')
    }
  } else {
    return {}
  }
}

export const combineBordersAndShadows = (borders: any, shadows: any, innerShadows: any) => {
  const withBorders = borders.boxShadow ? borders.boxShadow : null;
  const withShadows = shadows.boxShadow ? shadows.boxShadow : null;
  const withInnerShadows = innerShadows.boxShadow ? innerShadows.boxShadow : null;
  const combined = [withBorders, withShadows, withInnerShadows];
  const filtered = combined.filter((item: string | null) => item !== null);

  if (filtered.length > 0) {
    return {
      boxShadow: filtered.join(', ')
    }
  } else {
    return {}
  }
};

export const createGradientFillImage = (images: any, id: any) => {
  const image = getImage(images, id);
  return {
    background: `url(${image.src})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }
};

const createColorFill = (color: any) => {
  return {
    background: cssColor(color)
  };
};

export const createPatternDisplay = (pattern: any) => {
  switch(pattern.patternType) {
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
        backgroundRepeat: 'no-repeat'
      }
    case 'Tile':
      return {
        backgroundRepeat: 'repeat'
      }
    default:
      return {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }
  };
};

export const createPatternFill = (pattern: any, images: any) => {
  const image = getImage(images, pattern.image.id);
  const displayStyle = createPatternDisplay(pattern);

  return {
    background: `url(${image.src})`,
    ...displayStyle
  }
};

// NEED TYPES
export const createBackground = (layer: any, images: any) => {
  const { style, id } = layer;
  // get fills that are enabled
  const hasActiveFills = style.fills.some((fill: any) => fill.enabled);
  // create background if there are active fills
  if (hasActiveFills) {
    // get all active fills
    const activeFills = style.fills.filter((fill: any) => fill.enabled);
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
    };
  } else {
    return {}
  }
};

export const createSVGFill = (fills: any) => {
  // get fills that are enabled
  const hasActiveFills = fills.some((fill: any) => fill.enabled);
  // create background if there are active fills
  if (hasActiveFills) {
    // get all active fills
    const activeFills = fills.filter((fill: any) => fill.enabled);
    // return active fill with highest index
    const topFill = activeFills[activeFills.length - 1];
    // return fill
    return {
      fill: cssColor(topFill.color)
    }
  } else {
    return {
      fill: 'transparent'
    }
  }
};

export const createSVGStrokeWidth = (borders: any) => {
  // get borders that are enabled
  const hasActiveBorders = borders.some((border: any) => border.enabled);
  // create border if there are active borders
  if (hasActiveBorders) {
    // get all active borders
    const activeBorders = borders.filter((border: any) => border.enabled);
    // return active border with highest index
    const topBorder = activeBorders[activeBorders.length - 1];
    // create stroke from border
    const { thickness } = topBorder;
    // return thickness
    return {
      strokeWidth: thickness
    }
  } else {
    return {}
  }
};

export const createSVGStroke = (borders: any) => {
  // get borders that are enabled
  const hasActiveBorders = borders.some((border: any) => border.enabled);
  // create border if there are active borders
  if (hasActiveBorders) {
    // get all active borders
    const activeBorders = borders.filter((border: any) => border.enabled);
    // return active border with highest index
    const topBorder = activeBorders[activeBorders.length - 1];
    // return color
    return {
      stroke: cssColor(topBorder.color)
    }
  } else {
    return {
      stroke: 'transparent'
    }
  }
};

export const createSVGStrokeLineJoin = (sketchLineJoin: string) => {
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

export const createSVGStrokeDashArray = (sketchDashPattern: number[]) => {
  if (sketchDashPattern.length > 0) {
    return {
      strokeDasharray: sketchDashPattern.join(', ')
    }
  } else {
    return {}
  }
};

export const createSVGStrokeLineCap = (sketchLineEnd: string) => {
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

export const createSVGPath = (path: any) => {
  if (path) {
    return {
      d: path
    }
  } else {
    return {}
  }
};

export const createHorizontalFlip = (transform: any) => {
  if (transform && transform.flippedHorizontally) {
    return {
      transform: `scaleX(-1)`
    }
  } else {
    return {}
  }
};

export const createVerticalFlip = (transform: any) => {
  if (transform && transform.flippedVertically) {
    return {
      transform: `scaleY(-1)`
    }
  } else {
    return {}
  }
};

export const createRotation = (transform: any) => {
  if (transform && transform.rotation !== 0) {
    const scaleX = transform.flippedHorizontally ? -1 : 1;
    const scaleY = transform.flippedVertically ? -1 : 1;
    const rotation = transform.rotation * scaleX * scaleY;
    return {
      transform: `rotate(${rotation}deg)`
    }
  } else {
    return {}
  }
};

export const createTransform = (rotation: any, horizontalFlip: any, verticalFlip: any) => {
  const rotate = rotation.transform ? rotation.transform : null;
  const scaleX = horizontalFlip.transform ? horizontalFlip.transform : null;
  const scaleY = verticalFlip.transform ? verticalFlip.transform : null;
  const combined = [rotate, scaleX, scaleY];
  const filtered = combined.filter((item: string | null) => item !== null);

  if (filtered.length > 0) {
    return {
      transform: filtered.join(' ')
    }
  } else {
    return {}
  }
};

export const createBaseLayerStyles = (layer: any) => {
  const { frame } = layer;
  const position = createPosition(frame.x, frame.y);
  const width = createWidth(frame.width);
  const height = createHeight(frame.height);
  const rotation = createRotation(layer.transform);
  const horizontalFlip = createHorizontalFlip(layer.transform);
  const verticalFlip = createVerticalFlip(layer.transform);
  const transform = createTransform(rotation, horizontalFlip, verticalFlip);
  const gaussianBlur = createGaussianBlur(layer.style.blur);

  return {
    ...width,
    ...height,
    ...position,
    ...transform,
    ...gaussianBlur
  }
};

export const createArtboardStyles = (artboard: any) => {
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

export const createShapePathStyles = (layer: any, images: any) => {
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
    return createShapeStyles(layer);
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

export const createShapeStyles = (layer: any) => {
  const { style } = layer;
  const baseStyles = createBaseLayerStyles(layer);
  const opacity = createOpacity(style.opacity);

  return {
    ...baseStyles,
    ...opacity
  }
};

export const createShapeSVGPathStyles = (layer: any) => {
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
}

export const createShapeSVGMarkerShape = (arrowHead: string) => {
  switch(arrowHead) {
    case 'OpenArrow':
      return 'M0.35260086,-3.45328119e-16 L5,2.5 L0.35260086,5 L-8.8817842e-16,4.24129422 L3.23702251,2.5 L0,0.758705776 L0.35260086,-3.45328119e-16 Z';
    case 'FilledArrow':
      return 'M5,2.5 L-8.8817842e-16,5 L0,-4.5924255e-16 L5,2.5 Z';
    case 'Line':
      return 'M0,0 L1,0 L1,5 L0,5 L0,0 Z';
    case 'OpenCircle':
      return 'M2.5,0 C3.88071187,0 5,1.11928813 5,2.5 C5,3.88071187 3.88071187,5 2.5,5 C1.11928813,5 0,3.88071187 0,2.5 C0,1.11928813 1.11928813,0 2.5,0 Z M2.5,1 C1.67157288,1 1,1.67157288 1,2.5 C1,3.32842712 1.67157288,4 2.5,4 C3.32842712,4 4,3.32842712 4,2.5 C4,1.67157288 3.32842712,1 2.5,1 Z';
    case 'FilledCircle':
      return 'M2.5,0 C3.88071187,-2.53632657e-16 5,1.11928813 5,2.5 C5,3.88071187 3.88071187,5 2.5,5 C1.11928813,5 1.69088438e-16,3.88071187 0,2.5 C-1.69088438e-16,1.11928813 1.11928813,2.53632657e-16 2.5,0 Z';
    case 'OpenSquare':
      return 'M5,0 L5,5 L0,5 L0,0 L5,0 Z M4,1 L1,1 L1,4 L4,4 L4,1 Z';
    case 'FilledSquare':
      return 'M0,0 L5,0 L5,5 L0,5 L0,0 Z';
    default:
      return '';
  }
}

export const createShapeSVGOpenMarkerStyles = (layer: any) => {
  const { style } = layer;
  const stroke = createSVGStroke(style.borders);

  return {
    fill: 'none',
    ...stroke
  }
}

export const createShapeSVGClosedMarkerStyles = (layer: any) => {
  const { style } = layer;
  const stroke = createSVGStroke(style.borders);

  return {
    fill: stroke.stroke,
    stroke: 'none'
  }
}

export const createShapeSVGNoMarkerStyles = () => {
  return {
    stroke: 'none',
    fill: 'none'
  }
}

export const createShapeSVGMarkerStyles = (layer: any, arrowHead: string) => {
  switch(arrowHead) {
    case 'OpenArrow':
    case 'OpenCircle':
    case 'OpenSquare':
      return createShapeSVGClosedMarkerStyles(layer);
    case 'FilledArrow':
    case 'FilledCircle':
    case 'FilledSquare':
    case 'Line':
      return createShapeSVGClosedMarkerStyles(layer);
    case 'None':
      return createShapeSVGNoMarkerStyles();
  }
}

export const createImageStyles = (layer: any, images: any) => {
  const { style } = layer;
  const baseStyles = createBaseLayerStyles(layer);
  const opacity = createOpacity(style.opacity);
  const background = createBackground(layer, images);
  const borders = createBorders(style.borders);
  const shadows = createShadows(style.shadows);
  const innerShadows = createInnerShadows(style.innerShadows);
  const bordersAndShadows = combineBordersAndShadows(borders, shadows, innerShadows);

  const baseImage = getImage(images, layer.image.id);
  const baseImageBackground = {
    background: `url(${baseImage.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  };

  return {
    ...baseStyles,
    ...baseImageBackground,
    ...opacity,
    ...background,
    ...bordersAndShadows
  }
};

// export const createGroupStyles = (layer: any) => {
//   const { style } = layer;
//   const baseStyles = createBaseLayerStyles(layer);
//   const opacity = createOpacity(style.opacity);

//   return {
//     ...baseStyles,
//     ...opacity
//   }
// };

// NEED TYPES
// const createLinearGradient = (gradient: any) => {
//   const stops: any = [];
//   const positions = {
//     from: {
//       x: Math.round(Number(gradient.from.x.toFixed(1)) * 2) / 2,
//       y: Math.round(Number(gradient.from.y.toFixed(1)) * 2) / 2
//     },
//     to: {
//       x: Math.round(Number(gradient.to.x.toFixed(1)) * 2) / 2,
//       y: Math.round(Number(gradient.to.y.toFixed(1)) * 2) / 2
//     }
//   }

//   // start directions
//   const topStart = (positions.from.y <= 0 && positions.from.x === 0.5);
//   const bottomStart = (positions.from.y >= 1 && positions.from.x === 0.5);
//   const leftStart = (positions.from.y === 0.5 && positions.from.x <= 0);
//   const rightStart = (positions.from.y === 0.5 && positions.from.x >= 1);
//   const topLeftStart = (positions.from.y <= 0 && positions.from.x <= 0);
//   const topRightStart = (positions.from.y <= 0 && positions.from.x >= 1);
//   const bottomLeftStart = (positions.from.y >= 1 && positions.from.x === 0);
//   const bottomRightStart = (positions.from.y >= 1 && positions.from.x >= 1);
//   // end directions
//   const topLeftEnd = (positions.to.y <= 0 && positions.to.x <= 0);
//   const topRightEnd = (positions.to.y <= 0 && positions.to.x >= 1);
//   const bottomLeftEnd = (positions.to.y >= 1 && positions.to.x <= 0);
//   const bottomRightEnd = (positions.to.y >= 1 && positions.to.x >= 1);

//   let direction = null;
//   if (topLeftStart && bottomRightEnd) {
//     direction = 'to bottom right';
//   } else if (topRightStart && bottomLeftEnd) {
//     direction = 'to bottom left';
//   } else if (bottomLeftStart && topRightEnd) {
//     direction = 'to top right';
//   } else if (bottomRightStart && topLeftEnd) {
//     direction = 'to top left';
//   } else if (topStart) {
//     direction = 'to bottom';
//   } else if (bottomStart) {
//     direction = 'to top';
//   } else if (leftStart) {
//     direction = 'to right';
//   } else if (rightStart) {
//     direction = 'to left';
//   } else {
//     direction = 'to right';
//   }
//   // stops
//   gradient.stops.map((stop: any) => {
//     stops.push(`${stop.color} ${(stop.position * 100).toFixed(2)}%`);
//   });
//   // final gradient
//   const linearGradient = `linear-gradient(${direction}, ${stops.join()})`;
//   // return gradient
//   return {
//     background: linearGradient
//   };
// }

// NEED TYPES
// const createAngularGradient = (gradient: any) => {
//   const stops: any = [];
//   const firstStop = gradient.stops[0];
//   const lastStop = gradient.stops[gradient.stops.length - 1];
//   const midColor = chroma.mix(firstStop.color, lastStop.color, 0.5);
//   // add first stop
//   stops.push(`${midColor} 0turn`);
//   // add layer stops
//   gradient.stops.map((stop: any) => {
//     stops.push(`${stop.color} ${(stop.position).toFixed(2)}turn`);
//   });
//   // add last stop
//   stops.push(`${midColor} 1turn`);
//   // default sketch angular gradient starts at 3:00
//   // default css conic-gradient starts at 12:00
//   // add 0.25turn to translate properly
//   const angularGradient = `conic-gradient(from 0.25turn, ${stops.join()})`;
//   // return gradient
//   return {
//     background: angularGradient
//   };
// };

// NEED TYPES
// const createRadialGradient = (gradient: any, dims: any) => {
//   const stops: any = [];
//   // shape
//   const shape = gradient.aspectRatio === 0 ? 'circle' : 'ellipse';
//   // position
//   const position = {
//     start: {
//       x: dims.width * gradient.from.x.toFixed(2),
//       y: dims.height * gradient.from.y.toFixed(2)
//     },
//     end: {
//       x: dims.width * gradient.to.x.toFixed(2),
//       y: dims.height * gradient.to.y.toFixed(2)
//     }
//   }
//   // radius
//   let length1 = null;
//   if (position.end.y - position.start.y > position.end.x - position.start.x) {
//     length1 = position.end.y - position.start.y;
//   } else {
//     length1 = position.end.x - position.start.x;
//   }
//   // rotation
//   // length if ellipse
//   const length2 = length1 * gradient.aspectRatio;
//   // size
//   const size = shape === 'circle' ? `${length1}px` : `${length1}px ${length2}px`;
//   // stops
//   gradient.stops.map((stop: any) => {
//     stops.push(`${stop.color} ${(stop.position * 100).toFixed(2)}%`);
//   });
//   // final gradient
//   const radialGradient = `radial-gradient(${shape} ${size} at ${position.start.x}px ${position.start.y}px, ${stops.join()})`;
//   // return gradient
//   return {
//     background: radialGradient
//   };
// };

// NEED TYPES
// const createGradientFill = (gradient: any, dims: any) => {
//   switch(gradient.gradientType) {
//     case 'Linear':
//       return createLinearGradient(gradient);
//       break;
//     // does not support gradient rotation
//     case 'Radial':
//       return createRadialGradient(gradient, dims);
//       break;
//     // limited browser support for conic-gradients
//     case 'Angular':
//       return createAngularGradient(gradient);
//       break;
//     default:
//       return;
//   };
// }