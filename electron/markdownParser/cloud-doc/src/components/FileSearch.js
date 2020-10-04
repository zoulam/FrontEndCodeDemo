import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress'

let FileSearch = ({ title, onFileSearch }) => {
    let [inputActive, setInputActive] = useState(false);
    let [value, setValue] = useState('');
    const enterPressed = useKeyPress(13);
    const escPressed = useKeyPress(27);
    // useRef记录不同生命周期的值（共用）
    let node = useRef(null);
    // 封装复用的关闭查找栏
    const closeSearch = () => {
        // event.preventDefault();
        setInputActive(false);
        setValue('');
        // 恢复初始的文件列表
        onFileSearch('');
    }

    // 输入框添加快捷键
    useEffect(() => {
        if (enterPressed && inputActive) {
            onFileSearch(value)
        }
        if (escPressed && inputActive) {
            closeSearch();
        }
        // let handleInputEvent = (event) => {
        //     let { keyCode } = event;
        //     // enter
        //     if (keyCode === 13 && inputActive) {
        //         onFileSearch(value)
        //         // esc
        //     } else if (keyCode === 27 && inputActive) {
        //         closeSearch(event);
        //     }
        // }
        // document.addEventListener('keyup', handleInputEvent);
        // return () => {
        //     document.removeEventListener('keyup', handleInputEvent);
        // }
    })

    // 输入框高亮
    useEffect(() => {
        if (inputActive) {
            node.current.focus();
        }
    }, [inputActive])

    return (
        // mb-0 去除间隙（margin-bottom:0px）
        <div className="search-item alert alert-primary d-flex justify-content-between d-flex align-items-center mb-0 ">
            {!inputActive &&
                <>
                    <span>{title}</span>
                    <button
                        type="button"
                        className="icon-button"
                        onClick={() => { setInputActive(true) }}
                    >
                        <FontAwesomeIcon
                            title="搜素"
                            icon={faSearch}
                            size="lg"
                        />
                    </button>
                </>
            }
            {inputActive &&
                <>
                    <input
                        className="form-control"
                        value={value}
                        ref={node}
                        onChange={(e) => { setValue(e.target.value) }}
                    >
                    </input>
                    <button
                        type="button"
                        className="icon-button"
                        onClick={closeSearch}
                    >
                        <FontAwesomeIcon
                            title="关闭"
                            icon={faTimes}
                            size="lg"
                        />
                    </button>
                </>
            }
        </div >
    )
}


// 类型检查
FileSearch.propTypes = {
    title: PropTypes.string,
    onFileSearch: PropTypes.func.isRequired,
};

// 默认值
FileSearch.defaultProps = {
    title: 'my cloud note'
}

export default FileSearch