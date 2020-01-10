import React from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Topbar from './Topbar';

interface AppProps {
  artboard: any;
  images: any;
  svgs: any;
}

interface AppState {
  selection: any;
  hover: any;
  zoom: number;
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    selection: '',
    hover: '',
    zoom: 1
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
        <Topbar
          appState={this.state}
          setAppState={this.setAppState} />
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
