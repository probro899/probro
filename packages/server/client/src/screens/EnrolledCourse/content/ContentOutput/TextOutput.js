import React from 'react';

export default ({ lecture }) => {
    return (
        <div
            className="lecture-viewer-content"
            dangerouslySetInnerHTML={{ __html: lecture.description }}
        />
    )
}

