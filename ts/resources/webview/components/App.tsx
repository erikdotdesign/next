import React from 'react';

interface AppProps {
}

interface AppState {
}

class App extends React.Component<AppProps, {}> {

  fileInput = React.createRef<HTMLInputElement>()

  componentDidMount() {

  }
  handleButtonClick = () => {
    return NSSavePanel.savePanel().runModal();
  }
  render() {
    return (
      <div>
        <button onClick={this.handleButtonClick}>click me</button>
      </div>
    );
  }
}

export default App;
