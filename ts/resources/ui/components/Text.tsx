import React from 'react';
import { textContainerStyles, textStyles, paragraphSpacing, lineBreakStyles } from '../../utils/textStyles';

interface TextProps {
  layer: any;
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

class Text extends React.Component<TextProps, {}> {
  render() {
    const paragraphs = this.props.layer.text.split(/\n/g);
    const { layer, onClick, onMouseOver, onMouseOut } = this.props;
    return (
      <div
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        className='c-layer c-layer--text'
        // @ts-ignore
        style={textContainerStyles(layer)}>
        {
          paragraphs.map((string: string, index: number) => (
            <p
              key={index}
              className='c-layer__text'
              // @ts-ignore
              style={{
                ...textStyles(layer),
                ...paragraphSpacing(layer, index === paragraphs.length - 1)
              }}>
              {
                string.length === 0
                ? <span>&nbsp;</span>
                : string
              }
            </p>
          ))
        }
      </div>
    );
  }
}

export default Text;
