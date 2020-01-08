import React from 'react';
import { textContainerStyles, textStyles, paragraphSpacing } from '../styles/textStyles';
const Text = (props) => {
    const paragraphs = props.layer.text.split(/\n/g);
    const { layer, onClick, onMouseOver, onMouseOut } = props;
    return (React.createElement("div", { onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut, className: 'c-layer c-layer--text', style: textContainerStyles(layer) }, paragraphs.map((string, index) => (React.createElement("p", { key: index, className: 'c-layer__text', style: Object.assign(Object.assign({}, textStyles(layer)), paragraphSpacing(layer, index === paragraphs.length - 1)) }, string.length === 0
        ? React.createElement("span", null, "\u00A0")
        : string)))));
};
export default Text;
