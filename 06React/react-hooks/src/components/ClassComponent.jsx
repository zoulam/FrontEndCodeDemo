import React, { Component } from 'react'

export default class ClassComponent extends Component {
    constructor(props) {
        super();
        // 状态
        this.state = {
            time: new Date()
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                time: new Date()
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        const { time } = this.state;
        return (
            <div>
                <p>ClassComponent:{time.toLocaleTimeString()}</p>
            </div>
        )
    }
}
