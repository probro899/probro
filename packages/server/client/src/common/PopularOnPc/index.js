import React, { Component } from 'react'
import PopularBlog from './PopularBlog';
import PopularUser from './PopularUser';
import PopularBlogWrapper from './PopularBlogWrapper';
import PopularUserWrapper from './PopularUserWrapper';
export const PopularOnPc = ({ data }) => {
    const blogs = data.blogData.map((obj, index) => <PopularBlog obj={obj} key={index} />);
    const users = data.userData.map((obj, index) => <PopularUser obj={obj} key={index} />);
    console.log(blogs);

    return (
        <div className="ar-right">
            <div className="popular-on-pc">
                <PopularBlogWrapper blogs={blogs} title="popular on pc" />
                <PopularUserWrapper users={users} title="popular mentors" />
            </div>
        </div>
    )
}

