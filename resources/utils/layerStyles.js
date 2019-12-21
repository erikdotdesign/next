import chroma from 'chroma-js';
const createLayerDims = (frame) => {
    return {
        transform: `translateX(${frame.x}px) translateY(${frame.y}px)`,
        width: frame.width,
        height: frame.height,
    };
};
const getImage = (images, id) => {
    return images.find((image) => {
        if (image.id === id) {
            return image;
        }
    });
};
const createLinearGradient = (gradient) => {
    const stops = [];
    const positions = {
        from: {
            x: Math.round(Number(gradient.from.x.toFixed(1)) * 2) / 2,
            y: Math.round(Number(gradient.from.y.toFixed(1)) * 2) / 2
        },
        to: {
            x: Math.round(Number(gradient.to.x.toFixed(1)) * 2) / 2,
            y: Math.round(Number(gradient.to.y.toFixed(1)) * 2) / 2
        }
    };
    // start directions
    const topStart = (positions.from.y <= 0 && positions.from.x === 0.5);
    const bottomStart = (positions.from.y >= 1 && positions.from.x === 0.5);
    const leftStart = (positions.from.y === 0.5 && positions.from.x <= 0);
    const rightStart = (positions.from.y === 0.5 && positions.from.x >= 1);
    const topLeftStart = (positions.from.y <= 0 && positions.from.x <= 0);
    const topRightStart = (positions.from.y <= 0 && positions.from.x >= 1);
    const bottomLeftStart = (positions.from.y >= 1 && positions.from.x === 0);
    const bottomRightStart = (positions.from.y >= 1 && positions.from.x >= 1);
    // end directions
    const topLeftEnd = (positions.to.y <= 0 && positions.to.x <= 0);
    const topRightEnd = (positions.to.y <= 0 && positions.to.x >= 1);
    const bottomLeftEnd = (positions.to.y >= 1 && positions.to.x <= 0);
    const bottomRightEnd = (positions.to.y >= 1 && positions.to.x >= 1);
    let direction = null;
    if (topLeftStart && bottomRightEnd) {
        direction = 'to bottom right';
    }
    else if (topRightStart && bottomLeftEnd) {
        direction = 'to bottom left';
    }
    else if (bottomLeftStart && topRightEnd) {
        direction = 'to top right';
    }
    else if (bottomRightStart && topLeftEnd) {
        direction = 'to top left';
    }
    else if (topStart) {
        direction = 'to bottom';
    }
    else if (bottomStart) {
        direction = 'to top';
    }
    else if (leftStart) {
        direction = 'to right';
    }
    else if (rightStart) {
        direction = 'to left';
    }
    else {
        direction = 'to right';
    }
    // stops
    gradient.stops.map((stop) => {
        stops.push(`${stop.color} ${(stop.position * 100).toFixed(2)}%`);
    });
    // final gradient
    const linearGradient = `linear-gradient(${direction}, ${stops.join()})`;
    // return gradient
    return {
        background: linearGradient
    };
};
const createAngularGradient = (gradient) => {
    const stops = [];
    const firstStop = gradient.stops[0];
    const lastStop = gradient.stops[gradient.stops.length - 1];
    const midColor = chroma.mix(firstStop.color, lastStop.color, 0.5);
    // add first stop
    stops.push(`${midColor} 0turn`);
    // add layer stops
    gradient.stops.map((stop) => {
        stops.push(`${stop.color} ${(stop.position).toFixed(2)}turn`);
    });
    // add last stop
    stops.push(`${midColor} 1turn`);
    // default sketch angular gradient starts at 3:00
    // default css conic-gradient starts at 12:00
    // add 0.25turn to translate properly
    const angularGradient = `conic-gradient(from 0.25turn, ${stops.join()})`;
    // return gradient
    return {
        background: angularGradient
    };
};
const createRadialGradient = (gradient, dims) => {
    const stops = [];
    // shape
    const shape = gradient.aspectRatio === 0 ? 'circle' : 'ellipse';
    // position
    const position = {
        start: {
            x: dims.width * gradient.from.x.toFixed(2),
            y: dims.height * gradient.from.y.toFixed(2)
        },
        end: {
            x: dims.width * gradient.to.x.toFixed(2),
            y: dims.height * gradient.to.y.toFixed(2)
        }
    };
    // radius
    let length1 = null;
    if (position.end.y - position.start.y > position.end.x - position.start.x) {
        length1 = position.end.y - position.start.y;
    }
    else {
        length1 = position.end.x - position.start.x;
    }
    // rotation
    // length if ellipse
    const length2 = length1 * gradient.aspectRatio;
    // size
    const size = shape === 'circle' ? `${length1}px` : `${length1}px ${length2}px`;
    // stops
    gradient.stops.map((stop) => {
        stops.push(`${stop.color} ${(stop.position * 100).toFixed(2)}%`);
    });
    // final gradient
    const radialGradient = `radial-gradient(${shape} ${size} at ${position.start.x}px ${position.start.y}px, ${stops.join()})`;
    // return gradient
    return {
        background: radialGradient
    };
};
const createGradientFill = (gradient, dims) => {
    switch (gradient.gradientType) {
        case 'Linear':
            return createLinearGradient(gradient);
            break;
        // does not support gradient rotation
        case 'Radial':
            return createRadialGradient(gradient, dims);
            break;
        // limited browser support for conic-gradients
        case 'Angular':
            return createAngularGradient(gradient);
            break;
        default:
            return;
    }
    ;
};
const createColorFill = (color) => {
    return {
        background: color
    };
};
const createPatternDisplay = (pattern) => {
    switch (pattern.patternType) {
        case 'Fill':
            return {
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            };
            break;
        case 'Fit':
            return {
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
            };
            break;
        case 'Stretch':
            return {
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
            };
            break;
        case 'Tile':
            return {
                backgroundRepeat: 'repeat'
            };
            break;
    }
    ;
};
const createPatternFill = (pattern, images) => {
    const fillImageId = pattern.image.id;
    const image = getImage(images, fillImageId);
    const displayStyle = createPatternDisplay(pattern);
    return Object.assign({ background: `url(${image.url})` }, displayStyle);
};
const createLayerFill = (fill, images, dims) => {
    switch (fill.fillType) {
        case 'Color':
            return createColorFill(fill.color);
            break;
        case 'Gradient':
            return createGradientFill(fill.gradient, dims);
            break;
        case 'Pattern':
            return createPatternFill(fill.pattern, images);
            break;
    }
    ;
};
const createLayerStyles = (layer, images) => {
    const dims = createLayerDims(layer.frame);
    const fill = createLayerFill(layer.style.fills[0], images, dims);
    return Object.assign(Object.assign({}, dims), fill);
};
export default createLayerStyles;
