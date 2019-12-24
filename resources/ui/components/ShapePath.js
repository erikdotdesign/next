import React from 'react';
import { createShapePathStyles } from '../../utils/layerStyles';
class ShapePath extends React.Component {
    render() {
        return (React.createElement("div", { className: 'c-layer c-layer--shape-path', 
            // @ts-ignore
            style: createShapePathStyles(this.props.layer) }));
    }
}
export default ShapePath;
