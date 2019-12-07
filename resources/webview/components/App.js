import React from 'react';
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.fileInput = React.createRef();
        this.handleButtonClick = () => {
            return NSSavePanel.savePanel().runModal();
        };
    }
    componentDidMount() {
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("button", { onClick: this.handleButtonClick }, "click me")));
    }
}
export default App;
