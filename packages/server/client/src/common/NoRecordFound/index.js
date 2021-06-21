import React from 'react';

const NoRecordFound = () => {
    return (
        <div className="no-record-found">
            <figure className="img-wrapper">
                <img src="/assets/graphics/paper.svg" alt="no record found" />
            </figure>
            <p className="no-record-title">No record(s) found</p>
        </div>
    )
}

export default NoRecordFound;
