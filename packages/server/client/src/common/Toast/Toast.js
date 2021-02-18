import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from "react-icons/ai";

const Toast = ({onDismiss, message}) => {
    return (
        <>
        <div className="pc-toast-wrapper">
        <div className="close-btn" onClick={onDismiss}><AiOutlineClose /></div>
           <p className="notification-title">{message}</p>
        </div>
        </>
    )
}