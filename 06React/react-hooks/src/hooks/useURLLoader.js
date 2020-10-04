import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useURLLoader = (url) => {
    let [data,setData] = useState(null);
    // 模块需要添加错误处理
    let [loading, setLoading] = useState(false)
        useEffect(() => {
        setLoading(true)
        axios.get(url).then(value => {
            console.log(value);
            setData(value.data.message)
            setLoading(false)
        });
        // 第二个参数加入空数组就不用一直执行,意思是监听fetch变化，发生变化才执行
    }, [url]);
    return [data,loading]
}

export default useURLLoader;