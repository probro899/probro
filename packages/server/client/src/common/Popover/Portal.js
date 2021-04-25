import { useEffect } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
    const mount = document.body;
    const el = document.createElement("div");
    el.classList.add("pc-portal");

    useEffect(() => {
        mount.appendChild(el);
        return () => mount.removeChild(el);
    }, [el, mount]);

    return createPortal(children, el)
};

export default Portal;
