import React from 'react';
import PopularUser from './PopularUser';
import PopularBlog from './PopularBlog';

export default ({ data, account, database }) => {
  const blogs = data.blogs.map((obj, index) => <PopularBlog obj={obj} key={index} />);
  const users = data.users.map((obj, index) => {
    const con = account.user && Object.values(database.UserConnection.byId).find(o => obj.id === o.user.user.id);
    return <PopularUser connected={con} obj={obj} key={index} />;
  });
  return (
    <div className="popular-on-pc">
      <div className="popular-blog-wrapper">
        {blogs}
      </div>
      <div className="users-head">Popular Mentors</div>
      <div className="popular-user-wrapper">
        {users}
      </div>
    </div>
  );
};
