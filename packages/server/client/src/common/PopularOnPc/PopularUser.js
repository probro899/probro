import React from 'react';
import { Link } from 'react-router-dom';
import { MdMyLocation } from 'react-icons/md';
import { BsPersonCheck, BsPersonPlus } from "react-icons/bs";
import { RoundPicture } from '../../components';
import { Button } from '../../common/utility-functions/Button/Button';

const PopularUser = ({ obj }) => {
    const { name, country, connected, image } = obj;
    return (
        <>
            <div className="popular-user">
                <div className="user-image">
                    <RoundPicture imgUrl={`${image}`} />
                </div>
                <div className="user-detail">
                    <div className="name">
                        <Link to="#">
                            {name}
                        </Link>
                    </div>
                    <div style={{ opacity: 0.8, marginBottom: 3, display: 'flex', alignItems: 'center' }}>
                        <MdMyLocation />
                        {' '}
                        <span style={{ fontSize: 12, marginLeft: 2 }}>
                            {' '}
                            {country}
                        </span>
                    </div>
                    <div className='user-bio'>

                    </div>
                </div>
                <div className="follow-mentor-btn">
                    <Link to="#" className="followMentorBtn">
                        <Button
                            type="button"
                            buttonStyle={connected ? "btn--success--outline" : "btn--primary--outline"}
                            buttonSize="btn--small"
                            icon={connected ? <BsPersonCheck /> : <BsPersonPlus />}
                        />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default PopularUser;
