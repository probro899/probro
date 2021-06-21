import React from 'react';
import PropTypes from 'prop-types';
import { HiCheck } from 'react-icons/hi';
import { IconContext } from 'react-icons';

const COLORS = {
    red: '#ef424c',
    blue: '#285bd4',
    green: '#219653',
    yellow: '#f3ac13',
};

const Tag = ({ color, tick, type, onClick, size }) => {
    return (
        <div onClick={onClick} style={{ backgroundColor: COLORS[color], height: size, width: type === 'flat' ? '100%' : size }} className={`pc-tag ${type === 'flat' ? 'flat-tag' : 'circle-tag'}`}>
            {
                tick && (
                    <IconContext.Provider value={{ color: '#fff', className: 'tag-icon' }}>
                        <HiCheck size={20} />
                    </IconContext.Provider>
                )
            }
        </div>
    )
}

Tag.defaultProps = {
    size: 30,
};

export default Tag;
