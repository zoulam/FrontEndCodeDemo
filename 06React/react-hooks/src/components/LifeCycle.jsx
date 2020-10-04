import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class LifeCycle extends Component {
    static defaultProps = {
        msg: 'zoulam'
    }
    static propTypes = {
        msg: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = { counter: 0 }
        console.log('constructor');
    }
    // componentWillUnmount() {
    //     console.log('componentWillUnmount');
    // }

    componentDidMount() {
        console.log('componentDidMount');
    }

    shouldComponentUpdate(nextProps, nextSate) {
        const { counter } = nextSate;
        console.log('shouldComponentUpdate', nextSate, this.state);
        // return false 时不会重新渲染
        return counter !== 3;
    }

    // componentWillUpdate() {
    //     console.log('componentWillUpdate');
    // }
    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps');
        return null;
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    change = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    render() {
        console.log('render', this.props);
        const { counter } = this.state
        return (
            <div>
                <h3>LifeCycle</h3>
                <p>{counter}</p>
                <button onClick={this.change}>change counter</button>
                {counter % 2 && <Child count={counter} />}
            </div>
        )
    }
}

class Child extends Component {
    // 初次渲染不执行，只有在已挂载的组件接收新的props的时候才执行
    // componentWillReceiveProps(nextProps) {
    //     console.log('componentWillReceiveProps', nextProps);
    // }
    getSnapshotBeforeUpdate() { }
    // 卸载
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    render() {
        console.log('children render');
        const count = this.props;
        return (
            <div>
                <h3>children </h3>
                <span>{count}</span>
            </div>
        )
    }
}
