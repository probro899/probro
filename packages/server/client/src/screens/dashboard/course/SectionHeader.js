import React from 'react';
import { Link } from 'react-router-dom';

const SectionHeader = ({ title, link }) => {
    return (
        <div className="section-heading">
            <h2 className="enrolled-title">{title}</h2>
            {
                link && <Link to={link}>See More</Link>
            }
        </div>
    )
}

export default SectionHeader;
