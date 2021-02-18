import React from 'react'

const PopularUserWrapper = ({ users, title }) => {
    return (
        <div className="popular-user-wrapper">
            <p className="users-head">{title}</p>
            <div className="popular-user-container">
                {users}
            </div>
        </div>
    )
}

export default PopularUserWrapper
