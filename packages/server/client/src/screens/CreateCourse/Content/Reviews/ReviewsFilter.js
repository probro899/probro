import React from 'react';

const ReviewsFilter = () => {
    return (
        <div className="filter-wrapper">
            <div className="data-length rating-filter">
                <label>
                    Rating:
                        <select className="custom-select-field">
                        <option value="All" selected>All</option>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>
                </label>
            </div>
            <div className="data-length sort-filter">
                <label>
                    Sort by:
                        <select className="custom-select-field">
                        <option value="newest" selected>Newest First</option>
                        <option value="oldest">Oldest First</option>

                    </select>
                </label>
            </div>
        </div>
    )
}

export default ReviewsFilter;
