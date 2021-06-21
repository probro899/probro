import React, { useState, useEffect } from 'react';
import DashboardNavigation from './DashboardNavigation';
import Overview from './Overview';
import Description from './Description';
import ContentContainer from './ContentContainer';

const getCurrentComponent = (componentName, course, lecture, courseNavigator) => {
    switch (componentName) {
        case 'overview':
            return <Overview course={course} />;
        case 'description':
            return <Description lecture={lecture} />;
        case 'courseContent':
            return <div className="mobile-syllabus">{courseNavigator}</div>;
        default:
            return null;
    }
}

const ContentDashboard = ({ course, lecture, courseNavigator }) => {
    const [current, setCurrent] = useState('overview');

    useEffect(() => setCurrent('overview'), [lecture.id]);
    const currentComponent = getCurrentComponent(current, course, lecture, courseNavigator);
    return (
        <>
          <DashboardNavigation
            current={current}
            courseNavigator={courseNavigator}
            lecture={lecture}
            setCurrent={setCurrent}
          />
          <ContentContainer >{currentComponent}</ContentContainer>
        </>
    )
}

export default ContentDashboard;
