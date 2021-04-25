import React from 'react';
import { AiOutlineClose, AiOutlineInfoCircle, AiOutlineWarning,AiFillInfoCircle } from "react-icons/ai";
import { CgDanger } from 'react-icons/cg';

const Alert = ({ isOpen, onClose, title, status }) => {
    const alertStatus = [
        'success', 'warning', 'danger', 'info'
    ]

    const checkStatus = alertStatus.includes(status) ? status : 'info';

    const changeIcons = () => {
        switch (status) {
            case 'info':
            case 'success':
                return <AiOutlineInfoCircle size="30" className="info-icons" />
            case 'warning':
                return <AiOutlineWarning size="30" className="info-icons" />
            case 'danger':
                return <CgDanger size="30" className="info-icons" />
            default:
                return <AiFillInfoCircle size="30" className="info-icons" />
        }
    }

    return (
        <>
            <div className="alert-info-wrapper">
                {
                    isOpen && <div className={`alert alert-info ${checkStatus}`}>
                        <AiOutlineClose size="20" className="close-alert" onClick={onClose} />
                       <>
                       {
                           changeIcons()
                       }
                       </>
                        <div className="content">
                            <span>
                                {title}
                            </span>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Alert;
