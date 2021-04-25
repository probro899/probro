import React, { useState, useEffect } from 'react';
import { GoChevronDown } from "react-icons/go";
import { Button } from '../../../../common/utility-functions/Button/Button';
import Popover from '../../../../common/Form/Popover';
import Pagination from '../../../../common/Pagination';
import NoRecordFound from '../../../../common/NoRecordFound';
import { FiMoreHorizontal } from 'react-icons/fi';

const DeleteButtonContainer = ({ callback }) => {
  return (
    <div className="pc-del-btn">
      <Button
        onClick={callback}
        type="button"
        buttonStyle="btn--danger--solid"
        buttonSize="btn--small"
        title="Remove"
      />
    </div>
  );
};

const MembersList = ({ users }) => {

  // for pagination
  const [countPerPage] = useState(4);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const pageCount = Math.ceil(users.length / countPerPage);

  useEffect(() => {
    setData(users.slice(countPerPage * page - countPerPage, countPerPage * page));
  }, [page, countPerPage]);

  const sortNames = () => {
    console.log('sort');
  };

  return (
    <>
      <div className="pc-user-list">
        <table className="pc-user-list-table" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th>Name {<GoChevronDown size="20" onClick={sortNames} />} </th>
              <th>Email</th>
              <th>Joined Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.length ? users.map((user) => (
                <tr>
                  <td>
                    {user.name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.doj}</td>
                  <td>
                    <Popover
                      content={<DeleteButtonContainer callback={() => { }} />}
                      vPosition="top"
                      hPosition="left"
                      xAlign="right"
                      yAlign="top"
                    >
                      <div className="add-user-btn"  >
                        <div className="pc-rm-btn">
                          <FiMoreHorizontal size={20} color="#1d4354" />
                        </div>
                      </div>
                    </Popover>
                  </td>
                </tr>
              )) : <tr>
                <td colSpan="4">
                  <NoRecordFound />
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      {
        users.length > 0 && <div className="list-pagination">
          <Pagination
            pageCount={pageCount}
            page={page}
            setPage={setPage}
          />
        </div>
      }
    </>
  );
};

export default MembersList;
