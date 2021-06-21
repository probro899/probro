import { gql } from '@apollo/client';

export const GET_POPULAR = gql`
query {
  getPopular{
    blogs {
      id
      slug
      coverImage
      title
      timeStamp
      user {
        id
        slug
        firstName
        middleName
        lastName
      }
      blogLike {
        id
        user {
          id
          firstName
          lastName
        }
      }
    }
    users {
      id
      firstName
      lastName
      middleName
      slug
      type
      userDetail {
        id
        image
        address
        country
        headLine
        bio
      }
    }
  }
}
`;

export const GET_ARCHIVES = gql`
query($sessionId: String) {
  getArchive(sessionId: $sessionId) {
        id
        title
        content
        timeStamp
        coverImage
        slug
        noOfLikes
        noOfComments
    		userId
        bookmark {
          id
        }
        user {
          firstName
          lastName
          slug
          middleName
          id
        }
      }
    }
`;

export const DO_SEARCH = gql`
query ($keyword: String,$country: String, $industry: String, $skill: String, $sessionId: String) {
  doSearch(keyword: $keyword, country: $country, industry: $industry, skill: $skill, sessionId: $sessionId) {
   users {
        id
        slug
        firstName
        middleName
        lastName
        userDetail {
          id
          image
          country
          address
          headLine
        }
      }
  organizations {
    id
    address
    name
    email
    image
    slug
    phoneNo
    uId
  }
      popularUsers {
        id
        slug
        firstName
        middleName
        lastName
        userDetail {
          id
          image
          country
          address
          headLine
        }

      }
  }
}
`;

export const GET_BLOG = gql`
query ($blogSlug: String!, $userSlug: String!) {
  getBlog(blogSlug: $blogSlug, userSlug: $userSlug) {
    id
    slug
    title
    content
    coverImage
    timeStamp
  	user {
      id
      slug
      firstName
      middleName
      lastName
      userDetail {
        id
        image
      }
    }

    blogLike {
      id
      userId
      likeType
      user {
        firstName
        lastName
        slug
        id
      }
    }

    blogComment {
      id
      timeStamp
      comment
      userId
      user {
        id
        slug
        firstName
        lastName
        middleName
        userDetail {
          id
          image
        }
      }
    }

  }
}
`;

export const GET_USER = gql`
query ($userSlug: String!) {
  getUser(userSlug: $userSlug) {
    id
    slug
    firstName
    middleName
    lastName
    type
    userDetail {
      id
      coverImage
      coverImageX
      coverImagrY
      image
      address
      bio
    }
    userEducation {
      id
      degree
      address
      startTime
      endTime
    }

    userWorkExperience {
      id
      title
      summary
      remarks
      company
      startTime
      endTime
      currentWorking
    }
    userSkill {
      id
      skill
    }
    blogs {
      id
      slug
      title
      coverImage
      timeStamp
    }
    courses {
      id
      title
      createdAt
      logo
      rating {
        avgRating
        noOfRating
      }
      creator {
        id
        firstName
        middleName
        lastName
      }
    }
    popularMentors {
      id
    	firstName
      lastName
      middleName
      slug
      userDetail {
        image
        id
        country
        headLine
      }
    }
  }
}`;

export const GET_COURSE = gql`
  query($type: String) {
    getCourse(type: $type) {
    id
    createdBy
    title
    subTitle
    description
    skill
    createdAt
    updatedAt
    duration
    status
    level
    domain
    subDomain
    logo
    remarks
    priceDetails {
      id
      price
      discount
      currency
    }
    rating{
      avgRating
      noOfRating
    }
      creator {
        id
        firstName
        middleName
        lastName
        slug
        userDetail {
          id
          country
          image
        }
      }
    } 
}`;

export const GET_COURSE_DETAILS = gql`
query($courseId: Int, $sessionId: String) {
	getCourseDetails(courseId: $courseId, sessionId: $sessionId ) {
  id
  createdBy
  title
  subTitle
  description
  skill
  createdAt
  updatedAt
  duration
  status
  level
  domain
  subDomain
  logo
  remarks
  noOfCourseEnroll
  noOfLearnersOfThisCreator
  noOfCoursesByThisCreator
  priceDetails {
    id
    currency
    price
    discount
    createdAt
    updatedAt
    courseId
  }
  courseEnrollDetails {
    id
    userId
    courseId
    status
    createdAt
    updatedAt
  }
  reviews {
    id
    userId
    review
    noOfStar
    createdAt
    updatedAt
    userDetails {
      id
      firstName
      lastName
      middleName
      slug
      userDetail {
        type
        country
        image
      }
    }
   
  }
  rating{
    avgRating
    noOfRating
    oneStar
    twoStar
    threeStar
    fourStar
    fiveStar
  }
    creator {
      id
      firstName
      middleName
      lastName
      userDetail {
        id
      	country
        image
      }
    }
  courseSection {
    id
    courseId
    title
    objective
    createdAt
    updatedAt
    lectures {
      id
      sectionId
      title
      description
      duration
      createdAt
      updatedAt
      resources {
        id
        lecId
        createdAt
        name
        type
      }
    }
  }

  }
}
`;

export const GET_ORGANIZATION_DETAILS = gql`
query($orgId: String, $sessionId: String) {
	getOrganizationDetails(orgId: $orgId, sessionId: $sessionId) {
    id
  	uId
    name
    address
    email
    phoneNo
    image
    timeStamp
    headLine
    webSiteUrl
    status
    remarks
    joinStatus {
      id
      status
    }
    members {
      id
      userDetails {
        id
        firstName
        lastName
        middleName
        slug
        userDetail {
          id
          image
        }
      }
    }
    noOfMembers
  }
}
`;

export const GET_PACKAGE = gql`
query($sessionId: String, $orgId: Int) {
	getPackage(sessionId: $sessionId, orgId: $orgId) {
    id
    noOfClass
    descrition
    price
    timeStamp
    classType
    type
     isSubscribe {
        id
        oId
      	type
        remarks
        referenceCode
      timeStamp
      }
    packageDescription {
    id
    packageId
    oneToOneChat
    oneToOneCall
    groupChat
    groupCall
    screensharing
    callRecording
    noOfUserInclassRoom
    drawingBoard
    blogging
    reporting
    notificationOfAllClassActivity
    descrition
    projectManagementTool
    classType
    remarks
     
     
    }
  }
}
`;

export const GET_SUMMARY = gql`
query {
  getSummary {
   noOfCourses
   noOfReviews
   noOfMentors
 }
 }
`;

export const GET_OUR_PARTNER = gql`
query {
  getOurPartner {
   logo
 }
 }
`;

export const COURSE_SEARCH = gql`
query($keyword: String, $sessionId: String) {
  courseSearch(keyword: $keyword, sessionId: $sessionId) {
     id
    createdBy
    title
    subTitle
    description
    skill
    createdAt
    updatedAt
    duration
    status
    level
    domain
    subDomain
    logo
    remarks
    priceDetails {
      id
      price
      discount
      currency
    }
    rating{
      avgRating
      noOfRating
    }
      creator {
        id
        firstName
        middleName
        lastName
        slug
        userDetail {
          id
          country
          image
        }
      }
  }
}
`;

export const BLOG_SEARCH = gql`
query($keyword: String, $sessionId: String, $topic: String) {
  blogSearch(keyword: $keyword, sessionId: $sessionId, topic: $topic) {
    id
    title
    userId
    content
    coverImage
    slug
    timeStamp
    noOfLikes
    noOfComments
    bookmark {
      id
    }
    user {
      id
      slug
      firstName
      lastName
      middleName
    }
  }
}
`;
