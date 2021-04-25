import React from 'react';

const About = () => {
    return (
        <div id="about" className="section-about-container">
            <h2 className="about-header">About this course</h2>
            <p className="course-views">82 recent views</p>
            <div className="course-description">
                <p className="course-description-content">
                    Machine learning is the science of getting computers to act without being explicitly programmed. In the past decade, machine learning has given us self-driving cars, practical speech recognition, effective web search, and a vastly improved understanding of the human genome. Machine learning is so pervasive today that you probably use it dozens of times a day without knowing it. Many researchers also think it is the best way to make progress towards human-level AI. In this class, you will learn about the most effective machine learning techniques, and gain..
            </p>
                <span className="show-more">
                    Show more
            </span>
            </div>
            <div className="skills-to-learn">
                <h3 className="skill-heading">skills you will gain</h3>
                <div className="skills-pills">
                    <span className="skill-pill">
                        Logistic Regression
                    </span>
                    <span className="skill-pill">
                        Artificial Neural Network
                    </span>
                    <span className="skill-pill">
                        Machine Learning (ML) Algorithms
                    </span>
                    <span className="skill-pill">
                        Machine Learning
                    </span>
                </div>
            </div>
        </div>
    )
}

export default About;
