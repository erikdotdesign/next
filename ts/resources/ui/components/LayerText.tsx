import React from 'react';
import { textContainerStyles, textStyles, paragraphSpacing } from '../styles/textStyles';

interface LayerTextProps {
  layer: srm.Text;
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

const LayerText = (props: LayerTextProps) => {
  const paragraphs = props.layer.text.split(/\n/g);
  const { layer, onClick, onMouseOver, onMouseOut } = props;
  return (
    <div
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className='c-layer c-layer--text'
      style={textContainerStyles(layer)}>
      {
        paragraphs.map((string: string, index: number) => (
          <p
            key={index}
            className='c-layer__text'
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

export default LayerText;
