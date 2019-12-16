import React from 'react';
class Canvas extends React.Component {
    render() {
        return (React.createElement("div", { className: 'c-canvas' }, this.props.children));
    }
}
export default Canvas;
