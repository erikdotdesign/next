import chroma from 'chroma-js';
export const getImage = (images, id) => {
    return images.find((image) => image.id === id);
};
export const cssColor = (color) => {
    return chroma(color).css();
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
    if (opacity === 1) {
        return {};
    }
    else {
        return {
            opacity
        };
    }
};
export const createBorderRadius = (shapeType, points) => {
    switch (shapeType) {
        case 'Rectangle':
            const borderRadii = points.map((point) => {
                return `${point.cornerRadius}px`;
            });
            const uniformRadius = borderRadii.every((radius) => {
                return radius === borderRadii[0];
            });
            if (uniformRadius && borderRadii[0] !== '0px') {
                return {
                    borderRadius: borderRadii[0]
                };
            }
            else if (!uniformRadius) {
                return {
                    borderRadius: borderRadii.join(' ')
                };
            }
            else {
                return {};
            }
        case 'Oval':
            return {
                borderRadius: '100%'
            };
        default:
            return {};
    }
    ;
};
export const createBorder = (sketchBorder) => {
    const { thickness, position } = sketchBorder;
    const color = cssColor(sketchBorder.color);
    let border;
    switch (position) {
        case 'Outside':
            border = `0 0 0 ${thickness}px ${color}`;
            break;
        case 'Center':
            // webkit does not like half pixel values
            if (thickness % 2 == 0) {
                border = `0 0 0 ${thickness / 2}px ${color} inset, 0 0 0 ${thickness / 2}px ${color}`;
            }
            else {
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
    };
};
export const createBorders = (sketchBorders) => {
    const borders = sketchBorders.map((sketchBorder) => {
        if (sketchBorder.enabled) {
            const border = createBorder(sketchBorder);
            return border.boxShadow;
        }
    });
    if (borders.length > 0) {
        return {
            boxShadow: borders.join(', ')
        };
    }
    else {
        return {};
    }
};
export const createGaussianBlur = (blur) => {
    const { enabled, blurType, radius } = blur;
    if (enabled && blurType === 'Gaussian') {
        return {
            filter: `blur(${radius}px)`
        };
    }
    else {
        return {};
    }
};
export const createShadow = (sketchShadow, inset) => {
    const { x, y, blur, spread, color } = sketchShadow;
    const base = `${x}px ${y}px ${blur}px ${spread}px ${cssColor(color)}`;
    const shadow = inset ? `${base} inset` : base;
    return {
        boxShadow: shadow
    };
};
export const createShadows = (sketchShadows) => {
    const shadows = sketchShadows.map((sketchShadow) => {
        if (sketchShadow.enabled) {
            const shadow = createShadow(sketchShadow, false);
            return shadow.boxShadow;
        }
    });
    if (shadows.length > 0) {
        return {
            boxShadow: shadows.join(', ')
        };
    }
    else {
        return {};
    }
};
export const createInnerShadows = (sketchInnerShadows) => {
    const innerShadows = sketchInnerShadows.map((sketchInnerShadow) => {
        if (sketchInnerShadow.enabled) {
            const innerShadow = createShadow(sketchInnerShadow, true);
            return innerShadow.boxShadow;
        }
    });
    if (innerShadows.length > 0) {
        return {
            boxShadow: innerShadows.join(', ')
        };
    }
    else {
        return {};
    }
};
export const combineBordersAndShadows = (borders, shadows, innerShadows) => {
    const withBorders = borders.boxShadow ? borders.boxShadow : null;
    const withShadows = shadows.boxShadow ? shadows.boxShadow : null;
    const withInnerShadows = innerShadows.boxShadow ? innerShadows.boxShadow : null;
    const combined = [withBorders, withShadows, withInnerShadows];
    const filtered = combined.filter((item) => item !== null);
    if (filtered.length > 0) {
        return {
            boxShadow: filtered.join(', ')
        };
    }
    else {
        return {};
    }
};
export const createGradientFillImage = (images, id) => {
    const image = getImage(images, id);
    return {
        background: `url(${image.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };
};
const createColorFill = (color) => {
    return {
        background: cssColor(color)
    };
};
export const createPatternDisplay = (pattern) => {
    switch (pattern.patternType) {
        case 'Fill':
            return {
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center'
            };
        case 'Fit':
            return {
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
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
export const createPatternFill = (pattern, images) => {
    const image = getImage(images, pattern.image.id);
    const displayStyle = createPatternDisplay(pattern);
    return Object.assign({ background: `url(${image.src})` }, displayStyle);
};
// NEED TYPES
export const createBackground = (layer, images) => {
    const { style, id } = layer;
    // get fills that are enabled
    const hasActiveFills = style.fills.some((fill) => fill.enabled);
    // create background if there are active fills
    if (hasActiveFills) {
        // get all active fills
        const activeFills = style.fills.filter((fill) => fill.enabled);
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
export const createSVGFill = (layer) => {
    const { style } = layer;
    // get fills that are enabled
    const hasActiveFills = style.fills.some((fill) => fill.enabled);
    // create background if there are active fills
    if (hasActiveFills) {
        // get all active fills
        const activeFills = style.fills.filter((fill) => fill.enabled);
        // return active fill with highest index
        const topFill = activeFills[activeFills.length - 1];
        // return fill
        return cssColor(topFill.color);
    }
    else {
        return 'transparent';
    }
};
export const createSVGStrokeWidth = (layer) => {
    const { style } = layer;
    // get borders that are enabled
    const hasActiveBorders = style.borders.some((border) => border.enabled);
    // create border if there are active borders
    if (hasActiveBorders) {
        // get all active borders
        const activeBorders = style.borders.filter((border) => border.enabled);
        // return active border with highest index
        const topBorder = activeBorders[activeBorders.length - 1];
        // create stroke from border
        const { thickness } = topBorder;
        // return thickness
        return thickness;
    }
    else {
        return 0;
    }
};
export const createSVGStroke = (layer) => {
    const { style } = layer;
    // get borders that are enabled
    const hasActiveBorders = style.borders.some((border) => border.enabled);
    // create border if there are active borders
    if (hasActiveBorders) {
        // get all active borders
        const activeBorders = style.borders.filter((border) => border.enabled);
        // return active border with highest index
        const topBorder = activeBorders[activeBorders.length - 1];
        // return color
        return cssColor(topBorder.color);
    }
    else {
        return 'transparent';
    }
};
export const svgStrokeOffset = (layer) => {
    // get stroke
    const stroke = createSVGStrokeWidth(layer);
    // return offset
    return stroke / 2;
};
export const createSVGTransform = (layer) => {
    // get stroke offset
    const strokeOffset = svgStrokeOffset(layer);
    // return offset so stroke isnt cut off by viewbox
    return `translate(${strokeOffset}, ${strokeOffset})`;
};
export const createSVGWidth = (layer) => {
    // get frame
    const { frame } = layer;
    // get stroke offset
    const strokeOffset = svgStrokeOffset(layer);
    // return width plus double stroke offset
    return frame.width + strokeOffset * 2;
};
export const createSVGHeight = (layer) => {
    // get frame
    const { frame } = layer;
    // get stroke offset
    const strokeOffset = svgStrokeOffset(layer);
    // return height plus double stroke offset
    return frame.height + strokeOffset * 2;
};
export const createSVGViewbox = (layer) => {
    // get svg width
    const width = createSVGWidth(layer);
    // get svg height
    const height = createSVGHeight(layer);
    // return viewbox
    return `0 0 ${width} ${height}`;
};
export const createHorizontalFlip = (transform) => {
    if (transform && transform.flippedHorizontally) {
        return {
            transform: `scaleX(-1)`
        };
    }
    else {
        return {};
    }
};
export const createVerticalFlip = (transform) => {
    if (transform && transform.flippedVertically) {
        return {
            transform: `scaleY(-1)`
        };
    }
    else {
        return {};
    }
};
export const createRotation = (transform) => {
    if (transform && transform.rotation !== 0) {
        const scaleX = transform.flippedHorizontally ? -1 : 1;
        const scaleY = transform.flippedVertically ? -1 : 1;
        const rotation = transform.rotation * scaleX * scaleY;
        return {
            transform: `rotate(${rotation}deg)`
        };
    }
    else {
        return {};
    }
};
export const createTransform = (rotation, horizontalFlip, verticalFlip) => {
    const rotate = rotation.transform ? rotation.transform : null;
    const scaleX = horizontalFlip.transform ? horizontalFlip.transform : null;
    const scaleY = verticalFlip.transform ? verticalFlip.transform : null;
    const combined = [rotate, scaleX, scaleY];
    const filtered = combined.filter((item) => item !== null);
    if (filtered.length > 0) {
        return {
            transform: filtered.join(' ')
        };
    }
    else {
        return {};
    }
};
export const createBaseLayerStyles = (layer) => {
    const { frame } = layer;
    const position = createPosition(frame.x, frame.y);
    const width = createWidth(frame.width);
    const height = createHeight(frame.height);
    const rotation = createRotation(layer.transform);
    const horizontalFlip = createHorizontalFlip(layer.transform);
    const verticalFlip = createVerticalFlip(layer.transform);
    const transform = createTransform(rotation, horizontalFlip, verticalFlip);
    const gaussianBlur = createGaussianBlur(layer.style.blur);
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, width), height), position), transform), gaussianBlur);
};
export const createArtboardStyles = (artboard) => {
    const { frame, background } = artboard;
    const { color, enabled } = background;
    const width = createWidth(frame.width);
    const height = createHeight(frame.height);
    const bg = enabled ? createColorFill(color) : { background: 'transparent' };
    return Object.assign(Object.assign(Object.assign({}, width), height), bg);
};
export const createShapePathStyles = (layer, images) => {
    const { style, shapeType, points } = layer;
    const baseStyles = createBaseLayerStyles(layer);
    const borderRadius = createBorderRadius(shapeType, points);
    const opacity = createOpacity(style.opacity);
    const background = createBackground(layer, images);
    const borders = createBorders(style.borders);
    const shadows = createShadows(style.shadows);
    const innerShadows = createInnerShadows(style.innerShadows);
    const bordersAndShadows = combineBordersAndShadows(borders, shadows, innerShadows);
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, baseStyles), borderRadius), opacity), background), bordersAndShadows);
};
export const createShapeStyles = (layer) => {
    const baseStyles = createBaseLayerStyles(layer);
    const svgWidth = createSVGWidth(layer);
    const svgHeight = createSVGHeight(layer);
    const width = createWidth(svgWidth);
    const height = createHeight(svgHeight);
    return Object.assign(Object.assign(Object.assign({}, baseStyles), width), height);
};
export const createImageStyles = (layer, images) => {
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
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, baseStyles), baseImageBackground), opacity), background), bordersAndShadows);
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
