import React from 'react';
import OverViewCard from './OverViewCard';

const OverView = (props) => {
    console.log("overview props", props);
    
    return (
        <div className="pc-org-overview">
            <h3 className="pc-overview-title">Overview</h3>
            <div className="pc-overview-cards">
                <OverViewCard title="Number of total classes" number="10" />
                <OverViewCard title="Active classes" number="05" />
                <OverViewCard title="Remaining classes" number="05" />
            </div>
        </div>
    )
}

export default OverView;
