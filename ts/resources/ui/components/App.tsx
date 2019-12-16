import React from 'react';
import Artboard from './Artboard';
import Sidebar from './Sidebar';
import Canvas from './Canvas';

interface AppProps {
  artboard: any;
}

class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div className='c-app-wrap'>
        <div className='c-app'>
          <Sidebar />
          <Canvas>
            <Artboard artboard={this.props.artboard} />
          </Canvas>
        </div>
      </div>
    );
  }
}

export default App;
