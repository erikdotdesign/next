import React from 'react';
import { textContainerStyles, textStyles } from '../../utils/textStyles';
class Text extends React.Component {
    render() {
        const paragraphs = this.props.layer.text.split(/\n/g);
        return (React.createElement("div", { onClick: this.props.onClick, onMouseOver: this.props.onMouseOver, onMouseOut: this.props.onMouseOut, className: 'c-layer c-layer--text', 
            // @ts-ignore
            style: textContainerStyles(this.props.layer) }, paragraphs.map((string, index) => (React.createElement("p", { key: index, className: 'c-layer__text', style: textStyles(this.props.layer, index === paragraphs.length - 1) }, string)))));
    }
}
export default Text;
