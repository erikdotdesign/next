import React from 'react';
import Artboard from './Artboard';
import Layer from './Layer';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Selection from './Selection';
import Hover from './Hover';

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
  cancelSelection = () => {
    this.setState({
      selection: ''
    });
  }
  render() {
    return (
      <div className='c-app-wrap'>
        <div className='c-app'>
          <Sidebar appState={this.state} />
          <Canvas>
            <Artboard artboard={this.props.artboard}>
              {
                this.props.artboard.layers.map((layer: any, index: number) => (
                  <Layer
                    layer={layer}
                    key={index}
                    images={this.props.images}
                    setAppState={this.setAppState}
                    appState={this.state} />
                ))
              }
              {
                this.state.selection
                ? <Selection
                    layer={this.state.selection}
                    hover={this.state.hover}
                    artboard={this.props.artboard} />
                : null
              }
              {
                this.state.hover
                ? <Hover
                    layer={this.state.hover}
                    selection={this.state.selection}
                    artboard={this.props.artboard} />
                : null
              }
              <div
                className='c-app__escape'
                onClick={this.cancelSelection}
                onMouseOver={() => this.setState({hover: this.props.artboard})}
                onMouseOut={() => this.setState({hover: ''})} />
            </Artboard>
          </Canvas>
        </div>
      </div>
    );
  }
}

export default App;
