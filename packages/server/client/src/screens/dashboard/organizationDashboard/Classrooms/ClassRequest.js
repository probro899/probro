import React, { useState, useEffect } from 'react';
import { Button } from '../../../../common/utility-functions/Button/Button';
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { CgStack } from "react-icons/cg";
import NoRecordFound from '../../../../common/NoRecordFound';


const ClassRequest = ({ requests }) => {
    return (
        <div className="pc-user-list">
            <table className="pc-user-list-table" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>Name </th>
                        <th>Classname</th>
                        <th>Request Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        requests.length ? requests.map((user) => (
                            <tr>
                                <td>
                                    {user.name}
                                </td>
                                <td>{user.classname}</td>
                                <td>{user.requestDate}</td>
                                <td>
                                    <div className="pc-req-action">
                                        <Button
                                            onClick={() => { }}
                                            type="button"
                                            buttonStyle="btn--success--outline"
                                            buttonSize="btn--small"
                                            icon={<AiOutlineCheck size={20} />}
                                        />
                                        <Button
                                            onClick={() => { }}
                                            type="button"
                                            buttonStyle="btn--danger--outline"
                                            buttonSize="btn--small"
                                            icon={<AiOutlineClose size={20} />}
                                        />
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
        </div>
    )
}

export default ClassRequest;
