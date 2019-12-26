import React from 'react';
import Artboard from './Artboard';
import Layers from './Layers';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Selection from './Selection';
import GroupSelection from './GroupSelection';
import Hover from './Hover';

interface AppProps {
  artboard: any;
  layers: any;
  images: any;
}

interface AppState {
  selection: any;
  hover: any;
  group: any;
}

const getExploadedLayers = (group: any) => {
  const groupFrame = group.frame;
  const newLayers = group.layers.map((layer: any) => {
    const layerFrame = layer.frame;
    const x = layerFrame.x + groupFrame.x;
    const y = layerFrame.y + groupFrame.y;
    return {...layer, frame: {...layerFrame, x, y}};
  });
  return newLayers;
};

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    selection: '',
    hover: '',
    group: ''
  }
  setAppState = (args: any) => {
    this.setState(args);
  }
  cancelSelection = () => {
    this.setState({
      selection: '',
      group: ''
    });
  }
  render() {
    return (
      <div className='c-app-wrap'>
        <div className='c-app'>
          <Sidebar appState={this.state} />
          <Canvas>
            <Artboard artboard={this.props.artboard}>
              <Layers
                layers={this.props.layers}
                setAppState={this.setAppState}
                appState={this.state}
                images={this.props.images} />
              {
                this.state.group
                ? <Layers
                    layers={getExploadedLayers(this.state.group)}
                    setAppState={this.setAppState}
                    appState={this.state}
                    images={this.props.images} />
                : null
              }
              {/* {
                this.state.group
                ? <GroupSelection layer={this.state.group} artboard={this.props.artboard} />
                : null
              } */}
              {
                this.state.selection
                ? <Selection layer={this.state.selection} artboard={this.props.artboard} />
                : null
              }
              {
                this.state.hover
                ? <Hover layer={this.state.hover} selection={this.state.selection} artboard={this.props.artboard} />
                : null
              }
              <div className='c-app__escape' onClick={this.cancelSelection} />
            </Artboard>
          </Canvas>
        </div>
      </div>
    );
  }
}

export default App;
