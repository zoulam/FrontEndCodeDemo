import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
    const [editStatus, setEditStatus] = useState(false)
    const [value, setValue] = useState('')
    let enterPressed = useKeyPress(13)
    let escPressed = useKeyPress(27)
    const closeSearch = (editItem) => {
        // e.preventDefault();
        setEditStatus(false)
        setValue('')
        // 元素是新建文件，未命名关闭就是删除
        if (editItem.isNew) {
            onFileDelete(editItem.id)
        }
    }

    useEffect(() => {
        const newFile = files.find(file => file.isNew)
        console.log(newFile);
        if (newFile) {
            setEditStatus(newFile.id)
            setValue(newFile.title)
        }
    }, [files])
    useEffect(() => {
        const editItem = files.find(file => file.id === editStatus)
        if (enterPressed && editStatus && value.trim() !== '') {
            onSaveEdit(editItem.id, value, editItem.isNew)
            setEditStatus(false)
            setValue('')
        }
        if (escPressed && editStatus) {
            closeSearch(editItem);
        }
        // let handleInputEvent = (event) => {
        //     let { keyCode } = event;
        //     // enter
        //     if (keyCode === 13 && editStatus) {
        //         const editItem = files.find(file => file.id === editStatus)
        //         onSaveEdit(editItem.id,value)
        //         setEditStatus(false)
        //         setValue('')
        //         // esc
        //     } else if (keyCode === 27 && editStatus) {
        //         closeSearch(event);
        //     }
        // }
        // document.addEventListener('keyup', handleInputEvent);
        // return () => {
        //     document.removeEventListener('keyup', handleInputEvent);
        // }
    })

    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map((file) =>
                    // mx-0 去除两侧间隙
                    <li
                        className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
                        onClick={() => { onFileClick(file.id) }}

                    >
                        {/* 正常界面 */}
                        {((file.id !== editStatus) || !file.isNew) &&
                            <>
                                <span className="col-2">
                                    <FontAwesomeIcon
                                        icon={faMarkdown}
                                        size="lg"
                                    />
                                </span>
                                <span className="col-7">{file.title}</span>
                                <button
                                    type="button"
                                    className="icon-button col-1"
                                    onClick={() => { setValue(file.title); setEditStatus(file.id) }}
                                >
                                    <FontAwesomeIcon
                                        title="编辑"
                                        icon={faEdit}
                                        size="lg"
                                    />
                                </button>

                                <button
                                    type="button"
                                    className="icon-button col-1"
                                    onClick={() => { onFileDelete(file.id) }}
                                >
                                    <FontAwesomeIcon
                                        title="删除"
                                        icon={faTrash}
                                        size="lg"
                                    />
                                </button>
                            </>
                        }
                        {/* 被选中的文件 */}
                        {
                            ((file.id === editStatus) || file.isNew) &&
                            <>
                                <input
                                    className="form-control col-10"
                                    value={value}
                                    onChange={(e) => { setValue(e.target.value) }}
                                    placeholder="please input file name"
                                >
                                </input>
                                <button
                                    type="button"
                                    className="icon-button col-2"
                                    onClick={() => { closeSearch(file) }}
                                >
                                    <FontAwesomeIcon
                                        title="关闭"
                                        icon={faTimes}
                                        size="lg"
                                    />
                                </button>
                            </>
                        }
                    </li>
                )
            }
        </ul >
    )
}

// 类型检查
FileList.propTypes = {
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onFileDelete: PropTypes.func,
    onSaveEdit: PropTypes.func,
};

// // 默认值
// FileList.defaultProps = {
//     title:'my cloud note'
// }
export default FileList;