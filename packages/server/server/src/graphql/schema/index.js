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
  courses: [Course]
  popularMentors: [User]!
}

type UserDetail {
  id: Int
  userId: Int
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
  noOfLikes: Int
  blogComment: [BlogComment]!
  noOfComments: Int
  userDetail: [User]!
  bookmark: BlogBookmark
}

type BlogBookmark {
  id: Int
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
  organizations: [Organization!]
  popularUsers: [User]!
}

type Archive {
  basedOnHistory: Popular!
  popularOnPc: Popular!
}

type Course {
  id: Int!
  createdBy: Int!
  creator: User
  title: String
  subTitle: String
  description: String
  skill: String
  createdAt: String
  updatedAt: String
  duration: Int
  status: String
  level: String
  domain: String
  subDomain: String
  logo: String
  remarks: String
  rating: Rating
  courseSection: [Section]
  reviews: [Review]
  courseEnrollDetails: CourseEnroll
  priceDetails: CoursePrice
  noOfCourseEnroll: Int
  courseCompleteHistory: [CourseCompleteHistory]
  noOfLearnersOfThisCreator: Int
  noOfCoursesByThisCreator: Int
}

type CourseEnroll {
  id: Int!
  userId: Int!
  courseId: Int!
  status: String
  createdAt: String
  updatedAt: String
  remarks: String
}

type CoursePrice {
  id: Int!
  courseId: Int!
  price: Int
  discount: Int
  currency: String
  createdAt: String
  updatedAt: String
}

type CourseCompleteHistory {
  id: Int!
  courseId: Int!
  userId: Int!
  lectureId: Int!
  createdAt: String
  updatedAt: String
  status: String
  remarks: String
  note: String
}

type Rating {
  avgRating: String
  noOfRating: String
  oneStar: Int
  twoStar: Int
  threeStar: Int
  fourStar: Int
  fiveStar: Int
}

type Review {
  id: Int!
  courseId: Int
  mentorId: Int
  noOfStar: String
  review: String
  userId: Int
  userDetails: User
  type: String
  createdAt: String
  updatedAt: String
}

type Section {
  id: Int!
  courseId: Int!
  title: String
  objective: String
  duration: String
  createdAt: String
  updatedAt: String
  remarks: String
  lectures: [Lecture]
}

type Lecture {
  id: Int!
  sectionId: Int!
  title: String
  description: String
  duration: Int
  createdAt: String
  updatedAt: String
  remarks: String
  resources: [Resource]
}

type Resource {
  id: Int!
  lecId: Int
  type: String
  name: String
  createdAt: String
}

type Organization {
  id: Int!
  uId: Int!
  name: String
  address: String
  email: String
  phoneNo: String
  image: String
  timeStamp: String
  headLine: String
  webSiteUrl: String
  status: String
  remarks: String
  members: [OrganizationMember]
  noOfMembers: Int
  joinStatus: OrganizationMember
  slug: String
}

type OrganizationMember {
  id: Int!
  uId: Int!
  oId: Int!
  type: String
  noOfClass: Int
  userDetails: User
  status: String
  remarks: String
  timeStamp: String
  email: String
}

type Package {
  id: Int!
  noOfClass: Int
  price: Int
  descrition: String
  type: String
  classType: String
  timeStamp: String
  isSubscribe: SellPackage
  packageDescription: PackageDescription
}

type PackageDescription {
  id: Int!
  packageId: Int!
  oneToOneChat: Int
  oneToOneCall: Int
  groupChat: Int
  groupCall: Int
  screensharing: Int
  callRecording: Int
  noOfUserInclassRoom: Int
  drawingBoard: Int
  blogging: Int
  reporting: Int
  notificationOfAllClassActivity: Int
  descrition: String
  projectManagementTool: Int
  classType: String

  remarks: String
}

type SellPackage {
  id: Int!
  oId: Int
  uId: Int
  packageId: Int!
  type: String
  timeStamp: String
  referenceCode: String
  remarks: String
}

type Summary {
  noOfCourses: Int
  noOfMentors: Int
  noOfReviews: Int
}

type OurPartner {
  logo: String
}

type Query {
 getUser(userSlug: String!): User!
 getBlog(blogSlug: String!, userSlug: String!): Blog!
 getPopular: Popular!
 getArchive(sessionId: String): [Blog!]
 doSearch(keyword: String, country: String, industry: String, skill: String, sessionId: String): Popular!
 getCourse(type: String): [Course!]
 getCourseDetails(courseId: Int, sessionId: String): Course!
 getOrganizationDetails(orgId: String, sessionId: String): Organization!
 getPackage(sessionId: String, orgId: Int): [Package]!
 getSummary: Summary!
 getOurPartner: [OurPartner]!
 courseSearch(keyword: String, topic: String, sessionId: String): [Course!]
 blogSearch(keyword: String, topic: String, sessionId: String): [Blog!]
}
`);
