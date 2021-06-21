import React, { useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";

const Toaster = ({ isOpen, position, message, intent, onClose }) => {
	useEffect(() => {
		if (isOpen) {
			const timer = setTimeout(() => onClose(), 5000);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	const cssClasses = ['pc-toast', position, intent];
	if (!isOpen) {
		cssClasses.push('pc-hide-toast');
	} else {
		cssClasses.push('pc-show-toast');
	}

	return (
		<div className="pc-toast-container">
			<div className={cssClasses.join(' ')}>
				<span className="notification-title">{message}</span>
				<div className="close-btn" onClick={onClose}><AiOutlineClose /></div>
			</div>
		</div>
	)
}

export default Toaster;
