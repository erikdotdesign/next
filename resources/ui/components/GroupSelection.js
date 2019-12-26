import React from 'react';
import { createGroupSelectedStyles } from '../../utils/selectionStyles';
class GroupSelection extends React.Component {
    render() {
        const { layer } = this.props;
        return (React.createElement("div", { className: 'c-layer c-layer--selection', style: createGroupSelectedStyles(layer) }));
    }
}
export default GroupSelection;
