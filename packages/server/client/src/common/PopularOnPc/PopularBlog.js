import React from 'react'
import { Link } from 'react-router-dom';

const PopularBlog = ({ obj }) => {
    const { image, name, author, date } = obj;
    return (
        <div className="popular-blog">
            <div className="ar-i-img" style={{ background: `url(${image})` }} />
            <div className="ar-i-detail">
                <Link to="#">
                    {author}
                </Link>

                <Link to="#" className="blog-title">
                    {name}
                </Link>
                <div className="blog-author">
                    {' '}

                    <div>
                        <small className="pc-date">
                            {date}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopularBlog
