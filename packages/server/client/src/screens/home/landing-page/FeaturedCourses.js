import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COURSE } from '../../../queries';

import SectionHeader from '../../dashboard/course/SectionHeader';
import CourseCard from '../../dashboard/course/CourseCard';
import { Spinner } from '../../../common';

const FeaturedCourses = () => {
    const { data, loading } = useQuery(GET_COURSE, { type: "featured" });
    if (loading || data.getCourse.length < 1) return <Spinner />;
    return (
        <div className="featured-course pc-container">
            <SectionHeader title="Featured courses" link='/courses' />
            <div className="courses-container">
                {data.getCourse.map((course) => <CourseCard publicListing key={course.id} course={course} />)}
            </div>
        </div>
    )
}

export default FeaturedCourses;
