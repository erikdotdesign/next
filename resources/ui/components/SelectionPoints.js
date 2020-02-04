import React from 'react';
const SelectionPoints = (props) => {
    const scale = 1 / props.zoom;
    const origin = 50 * props.zoom;
    return (React.createElement("div", { className: 'c-selection__points' },
        React.createElement("div", { className: 'c-selection__point c-selection__point--tl', style: {
                transform: `scale(${scale}) translate(-${origin}%, -${origin}%)`
            } }),
        React.createElement("div", { className: 'c-selection__point c-selection__point--tc', style: {
                transform: `scale(${scale}) translate(-${origin}%, -${origin}%)`
            } }),
        React.createElement("div", { className: 'c-selection__point c-selection__point--tr', style: {
                transform: `scale(${scale}) translate(${origin}%, -${origin}%)`
            } }),
        React.createElement("div", { className: 'c-selection__point c-selection__point--lc', style: {
                transform: `scale(${scale}) translate(-${origin}%, -${origin}%)`
            } }),
        React.createElement("div", { className: 'c-selection__point c-selection__point--rc', style: {
                transform: `scale(${scale}) translate(${origin}%, -${origin}%)`
            } }),
        React.createElement("div", { className: 'c-selection__point c-selection__point--bl', style: {
                transform: `scale(${scale}) translate(-${origin}%, ${origin}%)`
            } }),
        React.createElement("div", { className: 'c-selection__point c-selection__point--bc', style: {
                transform: `scale(${scale}) translate(-${origin}%, ${origin}%)`
            } }),
        React.createElement("div", { className: 'c-selection__point c-selection__point--br', style: {
                transform: `scale(${scale}) translate(${origin}%, ${origin}%)`
            } })));
};
export default SelectionPoints;
