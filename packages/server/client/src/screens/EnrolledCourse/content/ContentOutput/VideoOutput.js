import React from 'react';

export default ({ video }) => {
    return (
        <div className="video-output-section">
            <iframe
                src={`https://player.vimeo.com/video/${video.url}`} 
                title="My video" webkitallowfullscreen mozallowfullscreen allowfullscreen
            />
        </div>
    )
}
 