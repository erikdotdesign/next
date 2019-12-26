export const getImage = (images, id) => {
    return images.find((image) => {
        return image.id === id;
    });
};
export const createPosition = (x, y) => {
    return {
        left: `${x}px`,
        top: `${y}px`
    };
};
export const createWidth = (width) => {
    return {
        width: `${width}px`
    };
};
export const createHeight = (height) => {
    return {
        height: `${height}px`
    };
};
export const createOpacity = (opacity) => {
    return {
        opacity
    };
};
export const createBorderRadius = (shapeType, points) => {
    switch (shapeType) {
        case 'Rectangle':
            const borderRadius = [];
            points.forEach((point, index) => {
                if (index <= 3) {
                    borderRadius.push(`${point.cornerRadius}px`);
                }
            });
            return { borderRadius: borderRadius.join(' ') };
        case 'Oval':
            return { borderRadius: '100%' };
        default:
            return { borderRadius: 0 };
    }
    ;
};
export const createBorder = (border) => {
    const { thickness, color, position } = border;
    switch (position) {
        case 'Outside':
            return `0 0 0 ${thickness}px ${color}`;
        case 'Center':
            return `0 0 0 ${thickness / 2}px ${color} inset, 0 0 0 ${thickness / 2}px ${color}`;
        case 'Inside':
            return `0 0 0 ${thickness}px ${color} inset`;
        default:
            return `0 0 0 ${thickness / 2}px ${color} inset, 0 0 0 ${thickness / 2}px ${color}`;
    }
};
// NEED TYPES
export const createBorders = (borders) => {
    const bordersMap = [];
    borders.forEach((border) => {
        if (border.enabled) {
            bordersMap.unshift(createBorder(border));
        }
    });
    return bordersMap;
};
export const createShadow = (shadow, inset) => {
    const { x, y, blur, spread, color } = shadow;
    if (inset) {
        return `${x}px ${y}px ${blur}px ${spread}px ${color} inset`;
    }
    else {
        return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
    }
};
// NEED TYPES
export const createShadows = (shadows, innerShadows) => {
    const shadowsMap = [];
    shadows.forEach((shadow) => {
        if (shadow.enabled) {
            shadowsMap.push(createShadow(shadow, false));
        }
    });
    innerShadows.forEach((shadow) => {
        if (shadow.enabled) {
            shadowsMap.push(createShadow(shadow, true));
        }
    });
    return shadowsMap;
};
export const createBordersAndShadows = (borders, shadows, innerShadows) => {
    let combined = null;
    // generate shadows
    const shadowsMap = createShadows(shadows, innerShadows);
    // generate borders
    const bordersMap = createBorders(borders);
    // define combined
    if (shadowsMap.length > 0 && bordersMap.length > 0) {
        combined = `${bordersMap.join()}, ${shadowsMap.join()}`;
    }
    else if (shadowsMap.length > 0) {
        combined = shadowsMap.join();
    }
    else if (bordersMap.length > 0) {
        combined = bordersMap.join();
    }
    else {
        combined = 'none';
    }
    return {
        boxShadow: combined
    };
};
export const createGradientFillImage = (images, id) => {
    const image = getImage(images, id);
    return {
        background: `url(${image.url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };
};
// NEED TYPES
const createColorFill = (color) => {
    return {
        background: color
    };
};
// NEED TYPES
export const createPatternDisplay = (pattern) => {
    switch (pattern.patternType) {
        case 'Fill':
            return {
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            };
        case 'Fit':
            return {
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
            };
        case 'Stretch':
            return {
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
            };
        case 'Tile':
            return {
                backgroundRepeat: 'repeat'
            };
        default:
            return {
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            };
    }
    ;
};
// NEED TYPES
export const createPatternFill = (pattern, images) => {
    const id = pattern.image.id;
    const image = getImage(images, id);
    const displayStyle = createPatternDisplay(pattern);
    return Object.assign({ background: `url(${image.url})` }, displayStyle);
};
// NEED TYPES
export const createBackground = (fills, images, id) => {
    // get fills that are enabled
    const hasActiveFills = fills.some((fill) => fill.enabled);
    // create background if there are active fills
    if (hasActiveFills) {
        // get all active fills
        const activeFills = fills.filter((fill) => fill.enabled);
        // return active fill with highest index
        const topFill = activeFills[activeFills.length - 1];
        // create background by fillType
        switch (topFill.fillType) {
            case 'Color':
                return createColorFill(topFill.color);
            case 'Gradient':
                return createGradientFillImage(images, id);
            case 'Pattern':
                return createPatternFill(topFill.pattern, images);
        }
        ;
    }
    else {
        return {};
    }
};
export const createVisibility = (hidden) => {
    if (hidden) {
        return { visibility: 'hidden' };
    }
    else {
        return { visibility: 'visible' };
    }
};
export const createRotation = (transform) => {
    const scaleX = transform.flippedHorizontally ? -1 : 1;
    const scaleY = transform.flippedVertically ? -1 : 1;
    const rotation = transform.rotation * scaleX * scaleY;
    return {
        transform: `rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`
    };
};
export const createBaseLayerStyles = (layer) => {
    const { frame, hidden, transform } = layer;
    const visibility = createVisibility(hidden);
    const position = createPosition(frame.x, frame.y);
    const width = createWidth(frame.width);
    const height = createHeight(frame.height);
    const rotation = createRotation(transform);
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, visibility), position), width), height), rotation);
};
export const createArtboardStyles = (artboard) => {
    const { frame, background } = artboard;
    const { color, enabled } = background;
    const width = createWidth(frame.width);
    const height = createHeight(frame.height);
    const bg = enabled ? createColorFill(color) : { background: 'transparent' };
    return Object.assign(Object.assign(Object.assign({}, width), height), bg);
};
// NEED TYPES
export const createShapePathStyles = (layer, images) => {
    const { style, shapeType, points } = layer;
    const baseStyles = createBaseLayerStyles(layer);
    const borderRadius = createBorderRadius(shapeType, points);
    const opacity = createOpacity(style.opacity);
    const background = createBackground(style.fills, images, style.id);
    const bordersAndShadows = createBordersAndShadows(style.borders, style.shadows, style.innerShadows);
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, baseStyles), borderRadius), opacity), background), bordersAndShadows);
};
// NEED TYPES
export const createImageStyles = (layer, images) => {
    const { style } = layer;
    const baseStyles = createBaseLayerStyles(layer);
    const opacity = createOpacity(style.opacity);
    const background = createBackground(style.fills, images, style.id);
    const bordersAndShadows = createBordersAndShadows(style.borders, style.shadows, style.innerShadows);
    const baseImage = getImage(images, layer.image.id);
    const baseImageBackground = {
        background: `url(${baseImage.url})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    };
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, baseStyles), baseImageBackground), opacity), background), bordersAndShadows);
};
export const createGroupStyles = (layer) => {
    const { style } = layer;
    const baseStyles = createBaseLayerStyles(layer);
    const opacity = createOpacity(style.opacity);
    return Object.assign(Object.assign({}, baseStyles), opacity);
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
