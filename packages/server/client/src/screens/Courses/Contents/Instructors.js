import React from 'react';
import TopInstructorBadge from '../components/TopInstructorBadge';
import { BsFillPeopleFill } from "react-icons/bs";
import { GoBook } from "react-icons/go";
import { getName } from '../../../common/utility-functions';
import Card from '../../../common/Card';
import { RoundPicture } from '../../../components';
import { ENDPOINT } from '../../../config';

const Instructors = ({ creator }) => {
    const imgUrl = creator.userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(creator.id, 10)}/profile/${creator.userDetail.image}` : '/assets/graphics/user.svg';
    return (
        <div className="instructor-container" id="instructors">
            <h2 className="instructor-heading">Instructor</h2>
            <Card>
                <div className="instructor-details">
                    <figure className="img-wrapper">
                        <RoundPicture imgUrl={imgUrl} />
                    </figure>
                    <div className="detail-content">
                        <div className="name-badge">
                            <h3 className="instructor-name">{getName(creator)}</h3>
                            <TopInstructorBadge title="top instructor" content="top instructor" />
                        </div>
                        <span className="instructor-title">Instructor</span>
                        {creator.userDetail.headLine && <div className="instructor-department">{creator.userDetail.headLine}</div>}
                        <div className="instructor-expertise">
                            <div className="learners-count">
                                <BsFillPeopleFill size={15} />
                                <span><strong>4,847,539</strong> Learners</span>
                            </div>
                            <div className="courses-count">
                                <GoBook size={15} />
                                <span><strong>16</strong> Courses</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Instructors;
