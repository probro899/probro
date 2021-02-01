const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
  id: Int!
  email: String!
  firstName: String!
  lastName: String!
  middleName: String!
  type: String
  slug: String!
  userDetail: UserDetail
  userCarrierInterest: [UserCarrierInterest]!
  userSkill: [UserSkill]!
  userEducation: [UserEducation]!
  userWorkExperience: [UserWorkExperience]!
  blogs: [Blog]
}

type UserDetail {
  id: Int!
  userId: Int!
  phoneNumber: Int
  gender: String
  degree: String
  field: String
  image: String
  skill: String
  type: String
  experience: String
  userProduct: String
  onlinePortal: String
  bio: String
  address: String
  latitude: Int
  longitude: Int
  coverImage: String
  coverImageX: String
  coverImagrY: String
  coverEdit: String
  country: String
  thumbnail: String
  headLine: String
}

type UserCarrierInterest {
  id: Int!
  userId: Int!
  interest: String!
}

type UserPortal {
  id: Int!
  userId: Int!
  title: String
  attachment: String
  link: String
  description: String
}

type UserSkill {
  id: Int!
  userId: Int!
  skill: String!
  remark: String
}

type UserEducation {
  id: Int!
  userId: Int!
  address: String!
  degree: String!
  startTime: String!
  endTime: String!
  remarks: String
  currentStuding: String
}

type UserWorkExperience {
  id: Int!
  userId: Int!
  title: String!
  company: String!
  startTime: String!
  endTime: String!
  summary: String
  remarks: String
  currentWorking: String
}

type Blog {
  id: Int!
  userId: Int!
  user: User!
  timeStamp: String!
  saveStatus: String
  title: String
  content: String
  slug: String
  coverImage: String
  blogLike: [BlogLike]!
  blogComment: [BlogComment]!
  userDetail: [User]!
}

type BlogLike {
  id: Int!
  blogId: Int!
  userId: Int!
  user: User!
  likeType: String
  timeStamp: String!
}

type BlogComment{
  id: Int!
  userId: Int!
  user: User!
  comment: String
  timeStamp: String!
  blogId: Int!
}

type Popular {
  blogs: [Blog]!
  users: [User]!
  popularUsers: [User]!
}

type Archive {
  basedOnHistory: Popular!
  popularOnPc: Popular!
}

type Query {
 getUser(userSlug: String!): User!
 getBlog(blogSlug: String!, userSlug: String!): Blog!
 getPopular: Popular!
 getArchive(sessionId: String): Archive!
 doSearch(keyword: String, country: String, industry: String, skill: String, sessionId: String): Popular!
}
`);
