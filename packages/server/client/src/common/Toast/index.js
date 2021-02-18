import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from "react-icons/ai";
const Toaster = ({position, onDismiss, message, intent,timeOut}) => {
    const [close, onClose] = useState(false);
    const onToastClose = () => {
        onClose(true)
         setTimeout(() => {
           onDismiss();
           onClose(false)
         }, 500);
       }
       useEffect(() => {
        let timer = setTimeout(onToastClose, timeOut);
         return () => {
             clearTimeout(timer);
         }
     }, [])
       const cssClasses = ['pc-toast', position, intent];
       if(close){
           cssClasses.push('pc-close-toast');
           cssClasses.push('pc-hide-toast');
       }
       else{
           cssClasses.push('pc-show-toaster');
       }

    return (
        <>
            <div className="pc-toast-container">
                <div className={cssClasses.join(' ')}>
                    <span className="notification-title">{message}</span>
                    <div className="close-btn" onClick={onToastClose}><AiOutlineClose /></div>
                </div>
            </div>

        </>
    )
}
export default Toaster;