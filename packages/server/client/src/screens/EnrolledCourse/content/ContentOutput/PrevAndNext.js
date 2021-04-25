import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button } from '../../../../common/utility-functions/Button/Button';

const PrevAndNext = () => {
    return (
        <div className="prev-and-next-container">
            <div className="prev-and-next--wrapper">
                <div className="prev-and-next-link-container">
                    <div className="prev-btn">
                        <Button
                            onClick={() => { }}
                            type="button"
                            buttonStyle="btn-drawing-icon"
                            buttonSize="btn--small"
                            icon={<FaChevronLeft size={20} />}
                        />
                    </div>
                </div>
                <div className="prev-and-next-link-container">
                    <div className="next-btn">
                        <Button
                            onClick={() => { }}
                            type="button"
                            buttonStyle="btn-drawing-icon"
                            buttonSize="btn--small"
                            icon={<FaChevronRight size={20} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrevAndNext;
