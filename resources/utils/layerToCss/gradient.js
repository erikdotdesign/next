import chroma from 'chroma-js';
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
const createRadialGradient = (gradient) => {
    const stops = [];
    let size = null;
    // add layer stops
    gradient.stops.map((stop) => {
        stops.push(`${stop.color} ${(stop.position * 100).toFixed(2)}%`);
    });
    // set radial gradient size
    if (gradient.aspectRatio !== 0) {
        size = `${(gradient.aspectRatio * 100).toFixed(2)}% ${(gradient.to.y * 100).toFixed(2)}%`;
    }
    else {
        size = `100% ${(gradient.to.y * 100).toFixed(2)}%`;
    }
    // set radial gradient position
    const position = `${(gradient.from.x * 100).toFixed(2)}% ${(gradient.from.y * 100).toFixed(2)}%`;
    // set gradient
    const radialGradient = `radial-gradient(${size} at ${position}, ${stops.join()})`;
    // return gradient
    return {
        background: radialGradient
    };
};
const createGradientBg = (gradient) => {
    switch (gradient.gradientType) {
        case 'Linear':
            break;
        // does not support gradient rotation
        case 'Radial':
            createRadialGradient(gradient);
            break;
        // limited browser support for conic-gradients
        case 'Angular':
            createAngularGradient(gradient);
            break;
    }
    ;
};
export default createGradientBg;
