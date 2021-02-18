import React from 'react'

const PopularBlogWrapper = ({ blogs, title }) => {
    return (
        <div className="popular-blog-wrapper">
            <p class="ar-right-top">{title}</p>
            <div className="popular-blog-container">
                {blogs}
            </div>
        </div>
    )
}

export default PopularBlogWrapper
