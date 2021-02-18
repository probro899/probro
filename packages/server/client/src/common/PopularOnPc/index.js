import React, { Component } from 'react'
import PopularBlog from './PopularBlog';
import PopularUser from './PopularUser';

export const PopularOnPc = ({ maintitle, secondTitle, data }) => {
    const blogs = data.blogData.map((obj, index) => <PopularBlog obj={obj} key={index} />);
    const users = data.userData.map((obj, index) => <PopularUser obj={obj} key={index} />);
    return (
        <div className="ar-right">
            <p class="ar-right-top">{maintitle}</p>
            <div className="popular-on-pc">
                <div className="popular-blog-wrapper">
                    {blogs}
                </div>
                <div className="users-head">{secondTitle}</div>
                <div className="popular-user-wrapper">
                    {users}
                </div>
            </div>
        </div>
    )
}

