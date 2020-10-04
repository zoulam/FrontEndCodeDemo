import  { useState, useEffect } from 'react'

const useMousePosition = () => {
    const [position, setPostion] = useState({ x: 0, y: 0 });
    useEffect(() => {
        let updateMouse = (e) => {
            setPostion({ x: e.clientX, y: e.clientY })
        }
        document.addEventListener('mousemove', updateMouse)
        // 组件移除时做的事情
        return () => {
            document.removeEventListener('mousemove', updateMouse)
        }
    })
    return position;
}

export default useMousePosition;