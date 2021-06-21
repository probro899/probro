import React, { useState, useEffect } from 'react';
import { BsStarFill } from "react-icons/bs";
import StarDisplay from './StarDisplay';


const StarRating = (props) => {
    const { name, onChange, noOfStar } = props;
    const [hover, setHover] = useState(0);
    const stars = [1,2,3,4,5];

    useEffect(() => {
        setHover(noOfStar);
    }, [noOfStar]);

    return (
        <div className="pc-star-rating">
            <p className="star-label">How did we do?</p>
            {stars.map((star, idx) => {
                return (
                    <button
                        type="button"
                        key={`star-${idx}`}
                        className={idx + 1 <= (hover || noOfStar) ? "active" : "inactive"}
                        onClick={() => onChange(name, idx + 1)}
                        onMouseEnter={() => setHover(idx + 1)}
                        onMouseLeave={() => setHover(noOfStar)}
                    >
                        <BsStarFill size={25} className="star" />
                    </button>
                );
            })}
        </div>
    );
};
;

export default StarRating;
export { StarDisplay };
