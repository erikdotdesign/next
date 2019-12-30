import React from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';

interface AppProps {
  artboard: any;
  images: any;
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
  setAppState = (args: any) => {
    this.setState(args);
  }
  render() {
    return (
      <div className='c-app-wrap'>
        <div className='c-app'>
          <Sidebar
            appState={this.state}
            images={this.props.images} />
          <Canvas
            {...this.props}
            appState={this.state}
            setAppState={this.setAppState} />
        </div>
      </div>
    );
  }
}

export default App;
