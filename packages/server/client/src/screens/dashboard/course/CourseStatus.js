import React from 'react';

const CourseStatus = ({ status }) => {
    const statusList = ['bestseller', 'new', 'hot', 'highest rated'];
    const checkStatus = statusList.includes(status) ? status : '';
    const addStatus = checkStatus.split(' ').join('-');
    return (
        <div className={`badge ${addStatus}`}>
            {status}
        </div>
    )
}

export default CourseStatus;
