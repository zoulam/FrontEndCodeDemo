import React, { useState, useEffect } from 'react'

export default function FunctionCompnent(props) {
    const [date, setDate] = useState(new Date());
    //   componentDidMount设置值 componentDidUpdate更新值 componentWillUnmount卸载值
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, []);
    return (
        <div>
            <h3> FunctionCompnent:{date.toLocaleTimeString()}</h3>
        </div>
    );
}
