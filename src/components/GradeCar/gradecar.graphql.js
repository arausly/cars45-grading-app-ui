import gql from "graphql-tag";

//borrowed fragment
import { carFragment } from "../CarSearch/carSearch.graphql";

export const getGradeConfig = gql`
  query getAllGradeConfigs {
    configs: gradeConfigs {
      key
      conditions {
        TransposedCheckList
        Description
        SectionMaxGrade
        CarMaxGrade
        RepairAdvisory
        Checklist
        parsedCheckList @client
      }
    }
  }
`;

export const getFetchedCar = gql`
  query getCarFromCache {
    car: getFetchedCar @client {
      ...carFields
    }
  }
  ${carFragment}
`;

export const addGradeResult = gql`
  mutation addGradeResult($gradeResult: GradeResultInput!) {
    addGradeResult(gradeResult: $gradeResult) @client
  }
`;

export const saveCar = gql`
  mutation createNewCar($input: NewCarInput!) {
    createNewCar(input: $input) {
      id
      make
      model
      year
    }
  }
`;

export const saveCarGrade = gql`
  mutation createCarGrade($input: createCarGradeInput!) {
    createCarGrade(input: $input) {
      id
      cmsGradeId
    }
  }
`;

export const saveCarGradeOnCMS = gql`
  mutation saveGradeToCMS($cmsGradeId: String, $input: updateToCMSInput!) {
    saveGradeToCMS(cmsGradeId: $cmsGradeId, input: $input)
  }
`;
