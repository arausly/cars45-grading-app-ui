import { cache } from "../client";

import { getFetchedCar, addFetchedCar } from "./carSearch.resolvers/index";

const resolvers = {
  Query: {
    getFetchedCar
  },
  Mutation: {
    addFetchedCar
  },
  GradeCondition: {
    parsedCheckList({ Checklist }) {
      return Checklist.replace(/\./gi, " ");
    }
  }
};

export default resolvers;
