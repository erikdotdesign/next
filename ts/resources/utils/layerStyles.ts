export const getImage = (images: any, id: any) => {
  return images.find((image: any) => {
    return image.id === id;
  });
};

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
  return {
    opacity
  }
};

export const createBorderRadius = (shapeType: any, points: any) => {
  switch(shapeType) {
    case 'Rectangle':
      const borderRadius: any = [];
      points.forEach((point: any, index: number) => {
        if (index <= 3) {
          borderRadius.push(`${point.cornerRadius}px`);
        }
      });
      return { borderRadius: borderRadius.join(' ') }
    case 'Oval':
      return { borderRadius: '100%' }
    default:
      return { borderRadius: 0 }
  };
};

export const createBorder = (sketchBorder: any) => {
  const { thickness, color, position } = sketchBorder;
  let border;
  switch(position) {
    case 'Outside':
      border = `0 0 0 ${thickness}px ${color}`;
      break;
    case 'Center':
      border = `0 0 0 ${thickness / 2}px ${color} inset, 0 0 0 ${thickness / 2}px ${color}`;
      break;
    case 'Inside':
      border = `0 0 0 ${thickness}px ${color} inset`;
      break;
    default:
      border = `0 0 0 ${thickness / 2}px ${color} inset, 0 0 0 ${thickness / 2}px ${color}`;
  }
  return {
    boxShadow: border
  }
};

// NEED TYPES
export const createBorders = (sketchBorders: any) => {
  const borders = sketchBorders.map((sketchBorder: any) => {
    if (sketchBorder.enabled) {
      const border = createBorder(sketchBorder);
      return border.boxShadow;
    }
  });
  if (borders.length > 0) {
    return {
      boxShadow: borders.join()
    }
  } else {
    return {};
  }
};

export const createShadow = (sketchShadow: any, inset: boolean) => {
  const { x, y, blur, spread, color } = sketchShadow;
  const base = `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  const shadow = inset ? `${base} inset` : base;

  return {
    boxShadow: shadow
  }
};

// NEED TYPES
// export const createShadows = (sketchShadows: any, sketchInnerShadows: any) => {
//   const shadowsMap: string[] = [];
//   sketchShadows.forEach((sketchShadow: any) => {
//     if (sketchShadow.enabled) {
//       const shadow = createShadow(sketchShadow, false);
//       shadowsMap.push(shadow.boxShadow);
//     }
//   });
//   sketchInnerShadows.forEach((sketchInnerShadow: any) => {
//     if (sketchInnerShadow.enabled) {
//       const innerShadow = createShadow(sketchInnerShadow, true);
//       shadowsMap.push(innerShadow.boxShadow);
//     }
//   });
//   if (shadowsMap.length > 0) {
//     return {
//       boxShadow: shadowsMap.join()
//     }
//   } else {
//     return {};
//   }
// };

export const createShadows = (sketchShadows: any) => {
  const shadows = sketchShadows.map((sketchShadow: any) => {
    if (sketchShadow.enabled) {
      const shadow = createShadow(sketchShadow, false);
      return shadow.boxShadow;
    }
  });
  if (shadows.length > 0) {
    return {
      boxShadow: shadows.join()
    }
  } else {
    return {};
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
      boxShadow: innerShadows.join()
    }
  } else {
    return {};
  }
}

// export const createBordersAndShadows = (borders: any, shadows: any, innerShadows: any) => {
//   let combined;
//   // generate shadows
//   const shadowsMap = createShadows(shadows, innerShadows);
//   // generate borders
//   const bordersMap = createBorders(borders);
//   // define combined
//   if (shadowsMap.boxShadow && bordersMap.boxShadow) {
//     combined = `${bordersMap.boxShadow}, ${shadowsMap.boxShadow}`;
//   } else if (shadowsMap.boxShadow) {
//     combined = shadowsMap.boxShadow;
//   } else if (bordersMap.boxShadow) {
//     combined = bordersMap.boxShadow;
//   } else {
//     combined = null;
//   }
//   if (combined) {

//   } else {
//     return {};
//   }
// };

export const combineBordersAndShadows = (borders: any, shadows: any, innerShadows: any) => {
  const withBorders = borders.boxShadow ? `${borders.boxShadow},` : '';
  const withShadows = shadows.boxShadow ? `${shadows.boxShadow},` : '';
  const withInnerShadows = innerShadows.boxShadow ? `${innerShadows.boxShadow}` : '';

  return {
    boxShadow: `${withBorders} ${withShadows} ${withInnerShadows}`
  }
};

export const createGradientFillImage = (images: any, id: any) => {
  const image = getImage(images, id);
  return {
    background: `url(${image.url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }
};

// NEED TYPES
const createColorFill = (color: any) => {
  return {
    background: color
  };
};

// NEED TYPES
export const createPatternDisplay = (pattern: any) => {
  switch(pattern.patternType) {
    case 'Fill':
      return {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }
    case 'Fit':
      return {
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
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

// NEED TYPES
export const createPatternFill = (pattern: any, images: any) => {
  const id = pattern.image.id;
  const image = getImage(images, id);
  const displayStyle = createPatternDisplay(pattern);

  return {
    background: `url(${image.url})`,
    ...displayStyle
  }
};

// NEED TYPES
export const createBackground = (fills: any, images: any, id: any) => {
  // get fills that are enabled
  const hasActiveFills = fills.some((fill: any) => fill.enabled);
  // create background if there are active fills
  if (hasActiveFills) {
    // get all active fills
    const activeFills = fills.filter((fill: any) => fill.enabled);
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
    return {};
  }
};

export const createVisibility = (hidden: boolean) => {
  if (hidden) {
    return { visibility: 'hidden' };
  } else {
    return { visibility: 'visible' };
  }
};

export const createRotation = (transform: any) => {
  if (transform) {
    const scaleX = transform.flippedHorizontally ? -1 : 1;
    const scaleY = transform.flippedVertically ? -1 : 1;
    const rotation = transform.rotation * scaleX * scaleY;
    return {
      transform: `rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`
    }
  } else {
    return {};
  }
};

export const createBaseLayerStyles = (layer: any) => {
  const { frame, hidden, transform } = layer;
  const visibility = createVisibility(hidden);
  const position = createPosition(frame.x, frame.y);
  const width = createWidth(frame.width);
  const height = createHeight(frame.height);
  const rotation = createRotation(transform);

  return {
    ...visibility,
    ...position,
    ...width,
    ...height,
    ...rotation
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

// NEED TYPES
export const createShapePathStyles = (layer: any, images: any) => {
  const { style, shapeType, points } = layer;
  const baseStyles = createBaseLayerStyles(layer);
  const borderRadius = createBorderRadius(shapeType, points);
  const opacity = createOpacity(style.opacity);
  const background = createBackground(style.fills, images, layer.id);
  const borders = createBorders(style.borders);
  const shadows = createShadows(style.shadows);
  const innerShadows = createInnerShadows(style.innerShadows);
  const bordersAndShadows = combineBordersAndShadows(borders, shadows, innerShadows);

  return {
    ...baseStyles,
    ...borderRadius,
    ...opacity,
    ...background,
    ...bordersAndShadows
  }
};

// NEED TYPES
export const createImageStyles = (layer: any, images: any) => {
  const { style } = layer;
  const baseStyles = createBaseLayerStyles(layer);
  const opacity = createOpacity(style.opacity);
  const background = createBackground(style.fills, images, style.id);
  const borders = createBorders(style.borders);
  const shadows = createShadows(style.shadows);
  const innerShadows = createInnerShadows(style.innerShadows);
  const bordersAndShadows = combineBordersAndShadows(borders, shadows, innerShadows);

  const baseImage = getImage(images, layer.image.id);
  const baseImageBackground = {
    background: `url(${baseImage.url})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return {
    ...baseStyles,
    ...baseImageBackground,
    ...opacity,
    ...background,
    ...bordersAndShadows
  }
};

export const createGroupStyles = (layer: any) => {
  const { style } = layer;
  const baseStyles = createBaseLayerStyles(layer);
  const opacity = createOpacity(style.opacity);

  return {
    ...baseStyles,
    ...opacity
  }
};



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