import React from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';

interface AppProps {
  artboard: any;
  images: any;
  svgs: any;
}

interface AppState {
  selection: any;
  hover: any;
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    selection: '',
    hover: ''
  }
  componentDidMount() {
    console.log(this.props.artboard.layers);
  }
  setAppState = (args: any) => {
    this.setState(args);
  }
  render() {
    return (
      <div className='c-app'>
        <Sidebar
          appState={this.state}
          images={this.props.images}
          svgs={this.props.svgs} />
        <Canvas
          {...this.props}
          appState={this.state}
          setAppState={this.setAppState} />
      </div>
    );
  }
}

export default App;
