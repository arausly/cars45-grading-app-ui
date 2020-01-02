import gql from "graphql-tag";

const typedefs = gql`
  extend type GradeCondition {
    parsedCheckList: String!
  }

  input FetchedCarInput {
    lotNumber: String
    carUUID: String
    vin: String
    make: String
    model: String
    year: String
  }

  input GradeResultInput {
    allFactors: [String!]!
    allKeys: [String!]!
  }

  extend type Query {
    getFetchedCar: Car!
  }
`;

export default typedefs;
