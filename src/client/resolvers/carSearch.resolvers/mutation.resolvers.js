//queries
import {
  getCarByLotNo,
  getACarByVin
} from "../../../components/CarSearch/carSearch.graphql";

export const addFetchedCar = (_root, { type, car }, { cache }) => {
  if (type === "lot") {
    cache.writeQuery({ query: getCarByLotNo, data: car });
    return car;
  }
  cache.writeQuery({ query: getACarByVin, data: car });
  return car;
};
