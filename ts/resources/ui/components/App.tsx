import React from 'react';
import Artboard from './Artboard';
import Sidebar from './Sidebar';
import Canvas from './Canvas';

interface AppProps {
  artboard: any;
  images?: any;
}

class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div className='c-app-wrap'>
        <div className='c-app'>
          <Sidebar />
          <Canvas>
            <Artboard artboard={this.props.artboard} images={this.props.images} />
          </Canvas>
        </div>
      </div>
    );
  }
}

export default App;
