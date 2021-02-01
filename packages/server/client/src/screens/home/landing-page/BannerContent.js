import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import bannerData from './bannerData.json';

function BannerContent({ account }) {
    return (
        <div className="banners pc-container">
            {
                bannerData.map(data => <div className={`banner ${data.direction} banner-${data.id}`}>
                    <div className="banner-image">
                        <LazyLoadImage src={data.image} alt={data.title} />
                    </div>
                    <div className="banner-content">
                        <div className="banner-title">
                            <h3>{data.title}</h3>
                        </div>
                        <div className="banner-description">
                            <ul className="pc-desc-list">
                                {data.list.map(lst => <li>{lst}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default BannerContent;