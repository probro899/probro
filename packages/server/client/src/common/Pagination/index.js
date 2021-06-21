import React from 'react';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Button } from '../../common/utility-functions/Button/Button';

function Pagination(props) {
    const range = [];
    const limitPages = 10;
    for (let i = 1; i <= props.pageCount; i++) range.push(i);

    return (
        <div className="pc-pagination-container">
            {props.pageCount < limitPages ?
                <ul className="pc-pagination">
                    <li className="page-item disabled">
                        <Button
                            onClick={() => props.setPage(props.page - 1)}
                            type="button"
                            buttonStyle="btn--primary--outline"
                            buttonSize="btn--small"
                            icon={<FiChevronLeft size={20} />}
                            disabled={props.page === 1}
                        />
                    </li>
                    {
                        range.map((i, idx) =>
                            <li className="page-item" key={idx}>
                                <Button
                                    onClick={() => props.setPage(i)}
                                    type="button"
                                    buttonStyle={props.page === i ? "btn--primary--solid" : "btn--primary--outline"}
                                    buttonSize="btn--small"
                                    title={String(i)}
                                />
                            </li>)
                    }
                    <li className="page-item">
                        <Button
                            onClick={() => props.setPage(props.page + 1)}
                            type="button"
                            buttonStyle="btn--primary--outline"
                            buttonSize="btn--small"
                            icon={<FiChevronRight size={20} />}
                            disabled={props.page === props.pageCount}
                        />
                    </li>
                </ul> : null
            }
        </div>
    );
}

export default Pagination;