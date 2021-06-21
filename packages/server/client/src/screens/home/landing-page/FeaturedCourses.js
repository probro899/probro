import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COURSE } from '../../../queries';
import CourseCard from '../../dashboard/course/CourseCard';
import { Spinner } from '../../../common';
import SectionHeader from './SectionHeader';

const FeaturedCourses = () => {
  const { data, loading } = useQuery(GET_COURSE, { type: "featured" });
  if (loading) return <Spinner />;
  if (data.getCourse.length < 1) return null;
  return (
    <div className="featured-course pc-container">
      <SectionHeader
        heading="Most Popular Courses"
        subheading="Choose from the most popular"
        buttonTitle="View All"
        showButton
        link="/courses"
      />
      <div className="courses-container">
        {data.getCourse.map((course) => <CourseCard publicListing key={`cor-${course.id}`} course={course} />)}
      </div>
    </div>
  )
}

export default FeaturedCourses;
