import React from 'react';
import { Artboard } from 'react-sketchapp';

interface AppProps {
  artboard: any;
}

interface AppState {

}

class App extends React.Component<AppProps, {}> {

  componentDidMount() {
    console.log(this.props.artboard);
  }
  handleButtonClick = () => {

  }
  render() {
    const { frame, background } = this.props.artboard;
    return (
      <Artboard
        style={{width: frame.width, height: frame.height, backgroundColor: background.color}}>

      </Artboard>
    );
  }
}

export default App;
