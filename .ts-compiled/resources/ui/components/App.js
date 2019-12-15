import React from 'react';
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
        return (React.createElement("h1", null, "App New"));
    }
}
export default App;
