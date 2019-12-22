import React from 'react';
import createLayerStyles from '../../utils/layerStyles';
class Layer extends React.Component {
    componentDidMount() {
        console.log(this.props.layer.style.fills[0]);
    }
    render() {
        const { layer, images } = this.props;
        return (React.createElement("div", { className: 'c-layer', style: createLayerStyles(layer, images) }));
    }
}
export default Layer;
