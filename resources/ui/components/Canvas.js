import React from 'react';
class Canvas extends React.Component {
    render() {
        return (React.createElement("div", { className: 'c-canvas' },
            this.props.children,
            React.createElement("div", { className: 'c-canvas__escape', onClick: this.props.onClick, onMouseOver: this.props.onMouseOver })));
    }
}
export default Canvas;
