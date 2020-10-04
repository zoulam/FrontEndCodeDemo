import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './TabList.scss'

const TabList = ({ files, activeId, unsaveIds, onTabClick, oncloseTab }) => {
    return (
        <ul className="nav nav-pills tablist-components">
            {
                files.map((file) => {
                    const unsaveItem = unsaveIds.includes(file.id)
                    const fileClassName = classNames({
                        'nav-link': true,
                        'active': file.id === activeId,
                        'withUnsaved':unsaveItem
                    })
                    return (
                        <li className="nav-item" key={file.id}>
                            <a href="#"
                                // className="nav-link"
                                className={fileClassName}
                                onClick={(e) => { e.preventDefault(); onTabClick(file.id) }}
                            >
                                {file.title}
                                <span
                                    // stopPropagation 阻止冒泡
                                    onClick={(e) => { e.stopPropagation(); oncloseTab(file.id) }}
                                    className="ml-2  close-icon"
                                >
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                    />
                                </span>
                                 {/* 未保存添加小圆点 */}
                                {unsaveItem &&
                                    <span
                                    className="unsaved-icon rounded-circle ml-2"
                                    >
                                    </span>
                                }
                            </a>
                        </li>
                    )
                }
                )
            }
        </ul>
    )
}

FileList.propTypes = {
    files: PropTypes.array,
    activeId: PropTypes.string,
    unsaveIds: PropTypes.array,
    onTabClick: PropTypes.func,
    oncloseTab: PropTypes.func
};

FileList.defaultProps = {
    unsaveIds: []
}
export default TabList