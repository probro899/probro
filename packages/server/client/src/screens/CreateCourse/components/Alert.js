import React from 'react';
import { AiOutlineClose, AiFillInfoCircle } from "react-icons/ai";

const Alert = ({ isOpen, onClose }) => {
    return (
        <>
            <div className="alert-info-wrapper">
                {
                    isOpen && <div className="alert alert-info">
                        <AiOutlineClose size="20" className="close-alert" onClick={onClose} />
                        <AiFillInfoCircle size="30" className="info-icons" />
                        <div className="content">
                            <span>
                                Due to increased volume of new courses being submitted for review, the Quality Review Process may take up to 6 days. In order to avoid any additional delays.
                            </span>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Alert;
