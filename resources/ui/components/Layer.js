import React from 'react';
import Group from './Group';
import Image from './Image';
import Shape from './Shape';
import ShapePath from './ShapePath';
import Text from './Text';
import Slice from './Slice';
class Layer extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = () => {
            if (this.props.layer.type === 'Group') {
                this.props.setAppState({
                    selection: this.props.layer,
                    group: this.props.layer
                });
            }
            else {
                this.props.setAppState({
                    selection: this.props.layer
                });
            }
        };
        // onDoubleClick = () => {
        //   this.props.setAppState({
        //     group: this.props.layer
        //   });
        // }
        this.onMouseOver = () => {
            this.props.setAppState({
                hover: this.props.layer
            });
        };
        this.onMouseOut = () => {
            this.props.setAppState({
                hover: ''
            });
        };
    }
    render() {
        switch (this.props.layer.type) {
            case 'Group':
                return React.createElement(Group, Object.assign({ onClick: this.onClick, 
                    //onDoubleClick={this.onDoubleClick}
                    onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut }, this.props));
            case 'Image':
                return React.createElement(Image, Object.assign({}, this.props));
            case 'ShapePath':
                return React.createElement(ShapePath, Object.assign({}, this.props, { onClick: this.onClick, onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut }));
            case 'Text':
                return React.createElement(Text, Object.assign({}, this.props));
            case 'Shape':
                return React.createElement(Shape, Object.assign({}, this.props));
            case 'Slice':
                return React.createElement(Slice, Object.assign({}, this.props));
            default:
                return React.createElement("div", { className: 'c-layer' });
        }
    }
}
export default Layer;
