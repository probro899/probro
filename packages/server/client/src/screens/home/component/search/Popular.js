import React from 'react';
import PopularUser from '../../../blog/archive/PopularUser';

export default ({ data, database, account }) => {
  const users = data.map((obj, index) => {
    const con = account.user && Object.values(database.UserConnection.byId).find(o => obj.id === o.user.user.id);
    return <PopularUser connected={con} obj={obj} key={index} />;
  });
  return (
    <div className="popular-on-pc">
      <div className="users-head">Popular on PC</div>
      <div className="popular-user-wrapper">
        {users}
      </div>
    </div>
  );
};
