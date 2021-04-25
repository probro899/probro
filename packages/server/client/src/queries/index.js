import { gql } from '@apollo/client';

export const GET_POPULAR = gql`
query {
  getPopular{
    blogs {
      id
      slug
      coverImage
      title
      user {
        id
        slug
        firstName
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
      }
    }
  }
}
`;

export const GET_ARCHIVES = gql`
query($sessionId: String) {
  getArchive(sessionId: $sessionId) {
    basedOnHistory {
      blogs {
        id
        title
        content
        timeStamp
        coverImage
        slug
        user {
          firstName
          lastName
          slug
          middleName
          id
          userDetail {
            id
            image
            address
            country
            headLine
          }
        }
        blogLike {
          id
          likeType
          user {
            id
            slug
            firstName
          }
        }
        blogComment {
          id
          user {
            id
            slug
            firstName
          }
        }
      }
    }
    popularOnPc {

       blogs {
        id
        title
        content
        timeStamp
        coverImage
        slug
        user {
          id
          firstName
          lastName
          slug
          middleName
          userDetail {
            id
            image
            address
            country
            headLine
          }
        }

        blogLike {
          id
          user {
            id
            slug
            firstName
          }
        }

        blogComment {
          id
          user {
            id
            slug
            firstName
          }
        }
      }

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
          country
          headLine
        }

      }
    }
  }
}
`;

export const DO_SEARCH = gql`
query ($keyword: String,$country: String, $industry: String, $skill: String, $sessionId: String) {
  doSearch(keyword: $keyword, country: $country, industry: $industry, skill: $skill, sessionId: $sessionId) {
     blogs {
        id
        title
        content
        timeStamp
        coverImage
        slug
        user {
          firstName
          lastName
          slug
          middleName
          id
          userDetail {
            id
            image
            country
            address
            headLine
          }
        }
        blogLike {
          id
          user {
            id
            slug
            firstName
          }
        }
        blogComment {
          id
          user {
            id
            slug
            firstName
          }
        }
      }
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
query($courseId: Int) {
	getCourseDetails(couseId: $courseId) {
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
      title
      description
      duration
      createdAt
      updatedAt
    }
  }

  }
}
`;