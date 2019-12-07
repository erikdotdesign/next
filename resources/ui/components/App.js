import React from 'react';
import { Artboard } from 'react-sketchapp';
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.handleButtonClick = () => {
        };
    }
    componentDidMount() {
        console.log(this.props.artboard);
    }
    render() {
        const { frame, background } = this.props.artboard;
        return (<Artboard style={{ width: frame.width, height: frame.height, backgroundColor: background.color }}>

      </Artboard>);
    }
}
export default App;
