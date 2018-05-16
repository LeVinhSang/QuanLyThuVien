import React, {Component} from 'react';

export default class Timer extends Component {
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
            <label>Time: {this.state.seconds}</label>
        );
    }
}
