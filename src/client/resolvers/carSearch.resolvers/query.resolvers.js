//queries
import {
  getCarByLotNo,
  getACarByVin
} from "../../../components/CarSearch/carSearch.graphql";

export const getFetchedCar = (_root, args, { cache }, info) => {
  try {
    const { car: carByLot } = cache.readQuery({ query: getCarByLotNo });
    return carByLot;
  } catch (err) {}

  try {
    const { car: carByVin } = cache.readQuery({ query: getACarByVin });
    return carByVin;
  } catch (err) {}
};
