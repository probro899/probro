import React, { useState, useEffect } from 'react';
import Popup from '../../../../common/Form/Popup';
import ChangeRole from './ChangeRole';
import { BsPerson } from "react-icons/bs";
import { Tooltip } from '../../../../common/Form/Tooltip';
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { sort } from '../helperFunctions/sort';
import NoRecordFound from '../../../../common/NoRecordFound';

const UserList = ({ users }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [asc, setAsc] = useState(true);

    useEffect(() => {
        sort(users, asc);
    }, [asc])

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const sortNames = () => {
        setAsc(!asc);
    }

    return (
        <div className="pc-user-list">
            <table className="pc-user-list-table" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>Name {asc ? <GoChevronDown size="20" onClick={sortNames} /> : <GoChevronUp size="20" onClick={sortNames} />} </th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length ? users.map((user) => (
                            <tr>
                                <td>
                                    <span onClick={togglePopup} className="pc-click-name">
                                        {user.name}
                                    </span>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Tooltip content={`${user.status === 'active' ? 'active' : 'inactive'}`}>
                                        <span className={`${user.status === 'active' ? 'active' : 'inactive'} pc-status`}>
                                        </span>
                                    </Tooltip>
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
            <Popup isOpen={isOpen} onClose={togglePopup} title="Change Role of Bikal" icon={<BsPerson size={20} />}>
                <ChangeRole />
            </Popup>
        </div>
    )
}

export default UserList;
