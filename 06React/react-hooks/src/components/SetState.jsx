import React, { Component } from 'react'

export default class SetState extends Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
        }
    }
    componentDidMount() {
        document.getElementById('test').addEventListener('click', this.setCounter)
    }
    changeValue = (v) => {
        // this.setState({
        //     counter: this.state.counter + v
        // },()=>{
        //     // callback 就是在state更新后执行的
        //     console.log('counter', this.state.counter);
        // });
        this.setState(state => {
            return {
                counter: state.counter + v
            }
        })
    };

    setCounter = () => {
        // 实现同步
        // setTimeout(() => {
        //     this.changeValue(1);
        // })
        this.changeValue(1);
        this.changeValue(2);
    };
    render() {
        return (
            <div>
                <span>setState test</span>
                <button onClick={this.setCounter}>{this.state.counter}</button>
                <button onClick={this.setCounter} id="test">原生事件：{this.state.counter}</button>
            </div>
        )
    }
}
