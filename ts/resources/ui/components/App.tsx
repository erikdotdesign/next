import React from 'react';

interface AppProps {
  artboard: any;
}

class App extends React.Component<AppProps, {}> {

  componentDidMount() {
    console.log(this.props.artboard);
  }
  handleButtonClick = () => {

  }
  render() {
    return (
      <h1>App</h1>
    );
  }
}

export default App;
