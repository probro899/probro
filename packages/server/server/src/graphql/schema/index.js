const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Brand {
  id: ID!
  sid: Int!
  stypeId: Int!
  userId: Int!
  brandName: String!
  brandImageUrl: String!
}


type Varient {
  id: Int!
  modelId: Int!
  sid: Int!
  stypeId: Int!
  sbId: Int!
  userId: Int!
  name: String!
  onRoadPrice: Int
  exShowRoomPrice: Int
  fuelType: String
  bodyType: String
  offerImage: String
  offerMessage: String
  offer: Int
}

type Model {
    id: Int!
    sid: Int!
    stypeId: Int!
    sbId: Int!
    userId: Int!
    name: String!
    image: String!
    timeStamp: Int!
    slug: String!
    category: String!
    publish: Int!
    varients: [Varient]
}

type DiscountOffer {
    id: ID!
    variantId: Int!
    userId: Int!
    image: String
    message: String
    priceDiscount: Int!
    status: Int
}

type Videos {
    id: ID
    userId: Int!
    header: String
    videoId: String
    url: String
    image: String
}

type News {
    id: ID!
    userId: Int!
    header: String
    timeStamp: Int!
    content: String
    image: String
    slug: String
    publish: Int!
    deleteStatus: Int!
    remarks: Int
}

type BrandModelFile {
    id: ID!
    modelId: Int!
    userId: Int!
    image: String!
    contentType: String!
    fileType: String!
    timeStamp: Int!
}

type BikeVarientTyresBrakes {
    id: ID!
    varientId: Int!
    tyreSize: String
    tyreType: String
    wheelSize: String
    wheelsType: String
    frontBrake: String
    rearBrake: String
    frontBrakeDiameter: String
    rearBrakeDiameter: String
    radialTyre: String
}

type BikeVarientElectricals {
  id: ID!
  varientId: Int!
  headlight: String
  tailLight: String
  turnSignalLamp: String
  batteryType: String
  batteryCapacity: String
}

type BikeVarientDimensionCapacity {
  id: ID!
  varientId: Int!
  length: Int
  width: Int
  height: Int
  fuelCapacity: Int
  fuelReserve: Int
  saddleHeight: Int
  groundClearance: Int
  wheelbase: Int
  kerbWeight: Int
  loadCapacity: Int
}

type BikeVarientChassisSuspension {
  id: ID!
  varientId: Int!
  chassis: String
  bodyType: String
  frontSuspension: String
  rearSuspension: String
  bodyGraphics: String
}

type BikeVarientMileagePerformance {
  id: ID!
  varientId: Int
  ARAIMileage: Int
  maxSpeed: Int
  Acceleration: String
}

type BikeVarientFeatursSafety {
  id: ID!
  varientId: Int
  ABS: Int
  brakingType: String
  i3stechnology: Int
  speedometer: String
  odometer: String
  fuelGauge: String
  console: String
  passSwitch: Int
  additionalFeatures: String
  passengerFootrest: Int
}

type BikeVarientEngineTransmission {
  id: ID!
  varientId: Int
  engineType: String
  displacement: String
  maxPower: String
  maxTorque: String
  noOofCylinders: String
  coolingSystem: String
  driveType: String
  starting: String
  fuelSupply: String
  clutch: String
  ignition: String
  transmission: String
  gearBox: String
  compressionRatio: String
}

type BikeVarientKeyFeaturs {
  id: ID!
  varientId: Int!
  ABS: Int
  brakingType: String
  speedometer: String
  odometer: String
  fuelGauge: Int
}

type BikeVarientKeySpecification {
  id: ID!
  varientId: Int!
  mileage: Int
  engineType: String
  displacement: Int
  noOfCylinders: Int
  maxPower: String
  maxTorque: String
  frontBrake: String
  rearBrake: String
  fuelCapacity: String
  bodyType: String
}

type BikeVarientOverview {
  id: ID!
  varientId: Int!
  engine: Int
  power: Int
  torque: Int
  mileage: Int
  brakes: String
  tyreType: String
}

type CarVarientEntertainmentCommunication {
  id: ID!
  varientId: Int!
  DVDPlayer: Int
  audioSystemRemoteControl: Int
  integrated2DINAudio: Int
  USBAuxiliaryinput: Int
  bluetoothConnectivity: Int
  touchScreen: Int
  connectivity: String
}

type CarVarientSafty {
  id: ID!
  varientId: Int!
  antiLockBrakingSystem: Int
  centralLocking: Int
  antiTheftAlarm: Int
  noOfAirbags: Int
}

type CarVarientExterior {
  id: ID!
  varientId: Int!
  adjustableHeadlights: Int
  fogLightsFront: Int
  fogLightsRear: Int
  exteriorRearViewMirror: Int
  wheelCovers: Int
  alloyWheelSize: Int
  roofCarrier: Int
  outsideRearViewMirrorTurnIndicators: Int
}

type CarVarientInterior {
  id: ID!
  varientId: Int!
  tachometer: Int
  electronicMultiTripmeter: Int
  digitalClock: Int
  cigaretteLighter: Int
  digitalOdometer: Int
  heightAdjustableDriverSeat: Int
}

type CarVarientComfortConvenience {
  id: ID!
  varientId: Int!
  powerSteering: Int
  powerWindowsFront: Int
  powerWindowsRear: Int
  airConditioner: Int
  heater: Int
  adjustableSteering: Int
}

type CarVarientDimentionCapacity {
id: ID!
varientId: Int!
length: Int
width: Int
height: Int
bootSpace: Int
seatingCapacity: Int
groundClearanceUnladen: Int
wheelBase: Int
frontTread: Int
rearTread: Int
rearHeadroom: Int
frontHeadroo: String
frontLegroo: String
rearShoulderroom: Int
noOfDoors: Int
}

type CarVarientSuspensionSteeringBreak {
  id: ID!
  varientId: Int!
  frontSuspension: String
  rearSuspension: String
  shockAbsorbersType: String
  steeringType: String
  steeringColumn: String
  steeringGearType: String
  turningRadius: Int
  frontBrakeType: String
  rearBrakeType: String
}

type CarVarientFuelPerformance {
  id: ID!
  varientId: Int!
  fuelType: String
  mileage: String
  fuelTankCapacity: Int
  topSpeed: Int
}

type CarVarientEngineTransmission {
  id: ID!
  varientId: Int!
  engineType: String
  displacement: String
  maxPower: String
  maxTorque: String
  noOfcylinder: Int
  valvesPerCylinder: Int
  valveConfiguration: String
  fuelSupplySystem: String
  turboCharge: String
  superCharge: String
  transmissionType: String
  gearBox: String
  driveType: String
}

type CarVarientKeyFeatures {
  id: ID!
  varientId: Int!
  powerSteering: Int
  powerWindowsFront: Int
  antiLockBrakingSystem: Int
  airConditioner: Int
  driverAirbag: Int passengerAirba: Int
  automaticClimateControl: Int
  fogLightsFront: Int
  alloyWheels: Int
}

type CarVarientKeySpecification {
  id: ID!
  varientId: Int!
  ARAIMileage: String
  fuelType: String
  displacement: Int
  maxPower: String
  maxTorque: String
  seatingCapacity: Int
  transmissionTYpe: String
  bootSpace: Int
  fuelTankCapacity: Int
  bodyType: String
  serviceCost: Int
}

type CarVarientOverview {
  id: ID!
  varientId: Int!
  mileage: String
  engine: String
  BHP: String
  transmission: String
  seats: Int
  serviceCost: Int
}

type ServiceCenterEnquiry {
  id: ID!
  serviceCenterId: Int!
  name: String
  email: String
  phoneNo: Int
  address: String
  message: String
}

type DealerEnquiry {
  id: ID!
  dealerId: Int!
  name: String
  email: String
  phoneNo: Int
  address: String
  message: String
}

type SellVehicle {
  id: ID!
  stypeId: Int!
  sbId: Int!
  vehicleName: String
  kmsDriven: String
  ownerShip: String
  city: String
  expectedPrice: Int
  ownerName: String
  ownerEmail: String
  ownerPhoneNo: Int
  image1: String
  image2: String
  image3: String
  image4: String
  image5: String
  customerType: String
  makeYear: String
  vehicleType: String
  brand: String
  model: String
  variant: String
  displacement: String
  taxClearance: String
  registrationNo: String
  province: String
  sold: Int
  publish: Int
  color: String
  fuelType: String
  remarks: String
}

type ServiceCenter {
  id: ID!
  sbId: Int!
  stypeId: Int!
  sid: Int!
  userId: Int!
  name: String!
  city: String!
  image: String
  phoneNo: String
  description: String
  latitude: Int
  logitude: Int
  province: String
  type: String
  email: String
}

type Dealer {
  id: ID!
  sId: Int!
  stypeId: Int!
  sbId: Int!
  userId: Int!
  name: String!
  city: String!
  image: String
  phoneNo: String
  description: String
  latitude: Int
  logitude: Int
  province: String
  type: String
  email: String
}

type UserEnquiry {
  id: ID!
  pId: Int!
  name: String!
  email: String
  phoneNo: String
  address: String
  markStatus: String
  latitude: String
  longitude: String
  markedbyUserId: Int
  message: String
  type: String
}

type ServiceTypeBrandProductDetails {
  id: ID!
  sid: Int!
  stypeId: Int!
  sbId: Int!
  userId: Int!
  name: String!
  price: Int!
  displacement: String
  power: String
  torque: String
  fueltankCapacity: String
  tyre: String
  groundClearance: String
  battery: String
  availableColor: String
  image: String
  markPopular: Int
  markNew: Int
  offer: Int
  mileage: String
  bodyType: String
  fuelType: String
}

type ServiceTypeBrand {
  id: ID!
  sid: Int!
  stypeId: Int!
  userId: Int!
  brandName: String!
  brandImageUrl: String!
}

type Service {
  id: ID!
  type: String!
  userId: Int!
  timeStamp: Int!
  name: String!
}

type User {
  id: ID!
  userName: String!
  password: String!
  name: String!
  type: String!
  plainPassword: String
  deleteStatus: Int
}

type Query {
 getBrandList: [Brand!]!
 getModelList: [Model!]!
 getVarientList: [Varient!]!
}
`);
