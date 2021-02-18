import React, {useState} from 'react'
import { AiOutlineClose } from "react-icons/ai";
import Backdrop from './Backdrop';

const Drawer = (props) => {
  const { isOpen, title, onClose, children, width, position, hasBackdrop, backdropOpacity } = props;
  const [close, setClose] = useState(false);

  const onDrawerClose = () => {
    setClose(true);
    setTimeout(() => {
      onClose();
      setClose(false);
    }, 500);
  }

  let cssClasses = ['pc-drawer-container']
  if (close) {
    cssClasses.push(position === "right"? "hide-drawer-right" : "hide-drawer-left");
    cssClasses.push(position === "right"? "drawer-slide-left-close" : "drawer-slide-right-close");
  } else {
    cssClasses.push(position === "right" ? 'drawer-right' :'drawer-left');
    cssClasses.push(position === "right" ? 'drawer-slide-left' : 'drawer-slide-right');
  }
  if (!isOpen) return null;
  return (
    <div className="pc-overlay-container">
      {hasBackdrop && <Backdrop backdropOpacity={backdropOpacity} onClick={onDrawerClose.bind(this)} />}
      <div className={cssClasses.join(' ')} style={{ width:width }}>
        <div className="pc-drawer-header-wrapper">
          <h4 className="pc-drawer-header">{title}</h4>
          <div className="close-btn" onClick={onDrawerClose.bind(this)}><AiOutlineClose /></div>
        </div>
        {children}
      </div>
    </div>
  )
}

Drawer.defaultProps = {
  width: '360px',
  position:'right',
  animation:'right',
  hasBackdrop:false
};

export default Drawer
