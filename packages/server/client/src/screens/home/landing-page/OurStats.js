import React from 'react'

function OurStats() {
    return (
        <div className="pc-stat-wrapper">
            <div className="pc-stat-container pc-container">
                <div className="pc-stat-row pc-row">
                    <div className="pc-stat-col pc-col">
                        <div className="pc-no-mentors pc-stat-wrap">
                            <h3>No of Mentors: <span>20+</span></h3>
                        </div>
                    </div>
                    <div className="pc-stat-col pc-col">
                        <div className="pc-no-stars pc-stat-wrap">
                            <h3>100+ <img src="/assets/graphics/Stars_sharp.svg" alt="stars" /> reviews.</h3>
                        </div>
                    </div>
                    <div className="pc-stat-col pc-col">
                        <div className="pc-no-mentors pc-stat-wrap">
                            <h3>No of courses: <span>40+</span></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurStats
