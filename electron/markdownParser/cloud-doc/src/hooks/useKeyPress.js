import { useState, useEffect } from 'react';

// 匹配用户按键与输入的按键参数是否相同
const useKeyPress = (targetKeyCode) => {
    const [keyPressed, setKeyPressed] = useState(false);
    const keyDownHandler = ({ keyCode }) => {
        if (keyCode === targetKeyCode) {
            setKeyPressed(true);
        }
    }
    const keyUpHandler = ({ keyCode }) => {
        if (keyCode === targetKeyCode) {
            setKeyPressed(false);
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        }
    },[])
    return keyPressed;
}

export default useKeyPress;