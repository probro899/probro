import React from 'react';

export default (props) => {
    const { onClick, backdropOpacity } = props;
    return (
        <div className="pc-drawer-overlay" style={{ opacity: backdropOpacity }} onClick={onClick} />
    )
}
