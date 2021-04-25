import React, { useState, useEffect } from 'react';
import { Button } from '../../../../common/utility-functions/Button/Button';
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { CgStack } from "react-icons/cg";
import Pagination from '../../../../common/Pagination';
import NoRecordFound from '../../../../common/NoRecordFound';

const RequestList = ({ requests }) => {
    const [checked, setChecked] = useState(false);

    //for pagination
    const [countPerPage] = useState(4);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const pageCount = Math.ceil(requests.length / countPerPage);

    useEffect(() => {
        setData(requests.slice(countPerPage * page - countPerPage, countPerPage * page));
    }, [page, countPerPage]);

    //for checkbox
    const toggleCheck = () => {
        setChecked(true);
    }

    return (
        <>
            <div className="pc-user-list">
                <table className="pc-user-list-table" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th>{<CgStack size={20} />}</th>
                            <th>Name </th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Request Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length ? data.map((user) => (
                                <tr>
                                    <td>
                                        <input type="checkbox" id={user.id} name={user.name} value={user.name} onChange={toggleCheck} />
                                    </td>
                                    <td>
                                        {user.name}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.requestDate}</td>
                                </tr>
                            )) : <tr>
                                <td colSpan="5">
                                    <NoRecordFound />
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>

            </div>
            {
                requests.length > 0 && <div className="pc-actions">
                    <div className="pc-req-action">
                        <Button
                            onClick={() => { }}
                            type="button"
                            buttonStyle="btn--primary--solid"
                            buttonSize="btn--small"
                            icon={<AiOutlineCheck size={20} />}
                            title="Accept"
                        />
                        <Button
                            onClick={() => { }}
                            type="button"
                            buttonStyle="btn--danger--solid"
                            buttonSize="btn--small"
                            title="Reject"
                            disabled={!checked}
                            icon={<AiOutlineClose size={20} />}
                        />
                    </div>
                    <Pagination
                        pageCount={pageCount}
                        page={page}
                        setPage={setPage}
                    />
                </div>
            }
        </>
    )
}

export default RequestList;
