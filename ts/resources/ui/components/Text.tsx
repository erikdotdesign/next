import React from 'react';
import { textContainerStyles, textStyles } from '../../utils/textStyles';

interface TextProps {
  layer: any;
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

class Text extends React.Component<TextProps, {}> {
  render() {
    const paragraphs = this.props.layer.text.split(/\n/g);
    return (
      <div
        onClick={this.props.onClick}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        className='c-layer c-layer--text'
        // @ts-ignore
        style={textContainerStyles(this.props.layer)}>
        {
          paragraphs.map((string: string, index: number) => (
            <p
              key={index}
              className='c-layer__text'
              style={textStyles(this.props.layer, index === paragraphs.length - 1)}>
              {string}
            </p>
          ))
        }
      </div>
    );
  }
}

export default Text;
