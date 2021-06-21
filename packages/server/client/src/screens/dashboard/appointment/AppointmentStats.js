import React from 'react'

const AppointmentStats = ({ title, count }) => {
    return (
        <div className="stats-container">
            <div className="stats-card">
                <h5 className="stats-number">{count}</h5>
                <p className="stats-title">{title}</p>
            </div>
        </div>
    )
}

export default AppointmentStats
