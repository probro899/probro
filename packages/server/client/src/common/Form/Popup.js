import React from 'react';
import { AiOutlineClose } from "react-icons/ai";

class Popup extends React.Component {
    state = {};

    componentDidMount() {
        this.changeBodyOverflow();
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (!prevProps.isOpen && this.props.isOpen) {
            this.props.onOpening && this.props.onOpening();
        }
        if (prevProps.isOpen !== this.props.isOpen) {
            this.changeBodyOverflow();
        }
        return null;
    }

    changeBodyOverflow = () => {
        const { isOpen } = this.props;
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }

    render() {
        const { isOpen, onClose, children, width, icon, title, className } = this.props;
        if (!isOpen) return null;
        return (
            <div className="popup-container">
                <div className="popup-overlay" onClick={onClose}></div>
                <div className="pop-main-wrapper">
                    <div className={`popup-wrapper ${className}`} style={{ maxWidth: width }}>
                        <div className="close-btn" onClick={onClose}><AiOutlineClose /></div>
                        <div className="pc-popup-header">
                            <span className="pc-popup-icon">{icon}</span>
                            <h4 className="pc-popup-title">{title}</h4>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}

Popup.defaultProps = {
    width: '500px',
};

export default Popup;

