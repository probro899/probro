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
      userDetail {
        id
        image
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
