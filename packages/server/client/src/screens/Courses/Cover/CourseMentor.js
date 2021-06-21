import React from 'react';
import TopInstructorBadge from '../components/TopInstructorBadge';
import { getName } from '../../../common/utility-functions';
import { RoundPicture } from '../../../components';
import { ENDPOINT } from '../../../config';

const CourseMentor = ({ creator }) => {
    const imgUrl = creator.userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(creator.id, 10)}/profile/${creator.userDetail.image}` : '/assets/graphics/user.svg';

    return (
        <div className="pc-course-mentor">
            <figure className="mentor-img-wrapper">
                <RoundPicture  imgUrl={imgUrl} />
            </figure>
            <p className="mentor-name">{getName(creator)}</p>
            <TopInstructorBadge title="top instructor" content="top instructor" />
        </div>
    )
}

export default CourseMentor;
