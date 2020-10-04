import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';

const BottomBtn = ({text, colorClass, icon, onBtnClick}) => {
    return (
        <button
            type="button"
            className={`btn btn-block no-block no-border ${colorClass}`}
            onClick={onBtnClick}
        >
        {/* mr-2 margin-right:2px */}
            <FontAwesomeIcon
                className="mr-2"
                icon={icon}
                size="lg"
            />
            {text}
        </button>
    )
}

BottomBtn.propTypes = {
    text: PropTypes.string,
    colorClass: PropTypes.string,
    icon: PropTypes.object.isRequired,
    onBtnClick: PropTypes.func
}

BottomBtn.default = {
    text: '新建'
}
export default BottomBtn