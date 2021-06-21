import React, { useState, useRef, useEffect } from "react";
import Chevron from "./Chevron";

const Accordion = ({ expandAll, content, title, idx }) => {
  const ref = useRef(null);
  const [expand, setExpand] = useState(false);
  const toggleAccordion = () => setExpand(!expand);

  useEffect(() => {
    setExpand(expandAll);
  }, [expandAll]);

  return (
    <div className="accordion-section">
      <button className={`accordion ${expand && 'active'}`} onClick={toggleAccordion}>
        <h3 className="accordion-title ellipsis ellipsis--secondary">Chapter {idx} - {title}</h3>
        <Chevron className={`accordion-icon ${expand && 'rotate'}`} width={10} fill={"#777"} />
      </button>
      <div
        ref={ref}
        style={{ maxHeight: `${expand ? ref.current.scrollHeight : 0}px` }}
        className="accordion-content"
      >
        <div className="accordion-content">{content}</div>
      </div>
    </div>
  );
}

export default Accordion;
