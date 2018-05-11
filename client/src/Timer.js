import React from 'react';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { seconds: new Date().toLocaleString() };
    }

    tick() {
        this.setState(() => ({
            seconds: new Date().toLocaleString()
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                Time: {this.state.seconds}
            </div>
        );
    }
}
