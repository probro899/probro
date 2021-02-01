import React from 'react'
import SearchElement from '../component/search/SearchElement';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./animation.json";

function MainBanner() {
    return (
        <>
            <div className="pc-main-banner-container pc-container">
                <div className="pc-banner-row">
                    <div className="pc-banner-col pc-col-left">
                        <SearchElement />
                    </div>
                    <div className="pc-banner-col pc-col-right">
                        <figure className="pc-banner-image">
                            <Lottie animationData={groovyWalkAnimation} />;
                        </figure>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainBanner
