import React from 'react'

const stats = [
    {
        imageUrl: '/assets/graphics/online-course.svg',
        value: '100+',
        title: 'Classes'
    },
    {
        imageUrl: '/assets/graphics/rating.svg',
        value: '100+',
        title: 'Reviews'
    },
    {
        imageUrl: '/assets/graphics/online.svg',
        value: '10+',
        title: 'Mentors'
    }
]

function OurStats() {
    return (
        <div className="pc-stat-wrapper">
            <div className="pc-stat-container pc-container">
                <div className="pc-stat-row pc-row">
                    {
                        stats && stats.map((stat, idx) => (
                            <div key={`stat-${idx}`} className="pc-stat-col pc-col">
                                <div className="pc-no-mentors pc-stat-wrap">
                                    <div className="count-num">
                                        <img src={stat.imageUrl} alt={stat.value} className="stats-img" />
                                        <h2 className="stats-value">{stat.value}</h2>
                                    </div>
                                    <p className="stats-subtitle">{stat.title}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default OurStats
