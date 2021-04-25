import React, { useState, useEffect } from 'react';
import { AiOutlineBarChart } from "react-icons/ai";
import { GoChevronDown } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { Tooltip } from '../../../../common/Form/Tooltip';
import Popup from '../../../../common/Form/Popup';
import Pagination from '../../../../common/Pagination';
import NoRecordFound from '../../../../common/NoRecordFound';

const ClassList = ({ classes }) => {
    const [isOpen, setIsOpen] = useState(false);

    //for pagination
    const [countPerPage] = useState(4);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const pageCount = Math.ceil(classes.length / countPerPage);

    useEffect(() => {
        setData(classes.slice(countPerPage * page - countPerPage, countPerPage * page));
    }, [page, countPerPage]);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const sortNames = () => {
        console.log('sort');
    }
    return (
        <>
            <div className="pc-user-list">
                <table className="pc-user-list-table" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Name {<GoChevronDown size="20" onClick={sortNames} />} </th>
                            <th>Members</th>
                            <th>Started Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.length ? classes.map((cls) => (
                                <tr>
                                    <td>
                                        {cls.name}
                                    </td>
                                    <td>{cls.members}</td>
                                    <td>{cls.startedDate}</td>
                                    <td>
                                        <div className="pc-action-pill">
                                            <Tooltip content="report">
                                                <span className="pc-action-icon">{<AiOutlineBarChart size={25} onClick={togglePopup} />}</span>
                                            </Tooltip>
                                            <Tooltip content="members">
                                                <span className="pc-action-icon">{<FaUsers size={25} />}</span>
                                            </Tooltip>
                                        </div>
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
                <Popup isOpen={isOpen} onClose={togglePopup}>
                    report here
            </Popup>
            </div>
            {
                classes.length > 0 && <div className="list-pagination">
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

export default ClassList;