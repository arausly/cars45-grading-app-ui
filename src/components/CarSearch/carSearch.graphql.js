import gql from "graphql-tag";

const carFragment = gql`
  fragment carFields on Car {
    carUUID
    lotNumber
    year
    make
    model
    vin
  }
`;

export const getCarByLotNo = gql`
  query getACarByLotNumber($lotNumber: String!) {
    car: getCarByLotNoFCG(lotNumber: $lotNumber) {
      ...carFields
    }
  }
  ${carFragment}
`;

export const getACarByVin = gql`
  query getCarByVin($vin: String!) {
    car: getCarByVinFCG(vin: $vin) {
      ...carFields
    }
  }
  ${carFragment}
`;

export const getCarGrade = gql`
  query getACarGrade($lotNumber: String!) {
    grade: getACarGrade(lotNumber: $lotNumber) {
      overallScore
      overallCarGrade
      id
      lotNumber
      carId {
        carUUID
      }
      grader
      cmsGradeId
      performedByQc
      car
    }
  }
`;
