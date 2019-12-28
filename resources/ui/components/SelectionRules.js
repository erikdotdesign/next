import React from 'react';
import { createRuleTStyles, createRuleTBDimStyles, createRuleRStyles, createRuleRLDimStyles, createRuleBStyles, createRuleLStyles } from '../../utils/selectionStyles';
class SelectionRules extends React.Component {
    render() {
        const { layer, hover, artboard } = this.props;
        return (React.createElement("div", { className: 'c-selection__rules' },
            // Top rule
            layer.frame.y > hover.frame.y
                ? React.createElement("div", { className: 'c-selection__rule c-selection__rule--t', style: createRuleTStyles(layer, hover) },
                    React.createElement("div", { className: 'c-selection__dim', style: createRuleTBDimStyles(layer, artboard) }, 
                    // check if selection top origin is below hover bottom origin
                    layer.frame.y > hover.frame.y + hover.frame.height
                        // if so, display px from selection top to hover bottom
                        ? `${layer.frame.y - (hover.frame.y + hover.frame.height)}px`
                        // else, display px from selection top to hover top
                        : `${layer.frame.y - hover.frame.y}px`))
                : null,
            // Right rule
            layer.frame.x + layer.frame.width < hover.frame.x + hover.frame.width
                ? React.createElement("div", { className: 'c-selection__rule c-selection__rule--r', style: createRuleRStyles(layer, hover) },
                    React.createElement("div", { className: 'c-selection__dim', style: createRuleRLDimStyles(layer, artboard) }, 
                    // check if selection right origin is right hover left origin
                    layer.frame.x + layer.frame.width > hover.frame.x
                        // if so, display px from selection right to hover right
                        ? `${(hover.frame.x + hover.frame.width) - (layer.frame.x + layer.frame.width)}px`
                        // else, display px from selection right to hover left
                        : `${hover.frame.x - (layer.frame.x + layer.frame.width)}px`))
                : null,
            // Bottom rule
            layer.frame.y + layer.frame.height < hover.frame.y + hover.frame.height
                ? React.createElement("div", { className: 'c-selection__rule c-selection__rule--b', style: createRuleBStyles(layer, hover) },
                    React.createElement("div", { className: 'c-selection__dim', style: createRuleTBDimStyles(layer, artboard) }, 
                    // check if selection bottom origin is below hover top origin
                    layer.frame.y + layer.frame.height > hover.frame.y
                        // if so, display px from selection bottom to hover bottom
                        ? `${(hover.frame.y + hover.frame.height) - (layer.frame.y + layer.frame.height)}px`
                        // else, display px from selection bottom to hover top
                        : `${hover.frame.y - (layer.frame.y + layer.frame.height)}px`))
                : null,
            // Left rule
            layer.frame.x > hover.frame.x
                ? React.createElement("div", { className: 'c-selection__rule c-selection__rule--l', style: createRuleLStyles(layer, hover) },
                    React.createElement("div", { className: 'c-selection__dim', style: createRuleRLDimStyles(layer, artboard) }, 
                    // check if selection left origin is right hover right origin
                    layer.frame.x > hover.frame.x + hover.frame.width
                        // if so, display px from selection left to hover right
                        ? `${layer.frame.x - (hover.frame.x + hover.frame.width)}px`
                        // else, display px from selection left to hover left
                        : `${layer.frame.x - hover.frame.x}px`))
                : null));
    }
}
export default SelectionRules;
