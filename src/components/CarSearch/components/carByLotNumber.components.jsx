import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

//custom dependencies
import { CustomLoader } from "../../shared";

//custom handlers
import { setItem } from "../../../handlers/storage.handler";

//graphql
import {
  getCarByLotNo,
  getCarGrade,
  addFetchedCar
} from "../carSearch.graphql";

const CarByLotNo = ({ notifyFailure, lotNumber, history }) => {
  const { data, loading, error } = useQuery(getCarByLotNo, {
    variables: {
      lotNumber
    }
  });

  let car = (data && data.car) || null;

  /** write fetched data to cache for local state management */
  const [writeToCache] = useMutation(addFetchedCar, {
    variables: {
      type: "lot",
      car: data
    }
  });

  /** has to be an empty string because the api expects a string to search for lotNumber */
  const gradeQuery = useQuery(getCarGrade, {
    variables: {
      lotNumber
    }
  });

  if (loading || gradeQuery.loading) return <CustomLoader />;
  if (error || gradeQuery.error) {
    notifyFailure("Failed to get car");
  }

  return (
    <>
      {car && (
        <div className="text-center">
          <p className="car_found-text">
            {car.make} {car.model}/{car.year}
          </p>
        </div>
      )}
      {!car && (
        <div className="text-center">
          <p className="car_found-text car_notfound-text">Car Doesn't Exist</p>
        </div>
      )}
      {(car && gradeQuery.data.grade && (
        <Button className="dashboard-btn cars45-btn primary btn--animated">
          View Grade
        </Button>
      )) ||
        (car && (
          <Button
            type="button"
            className="dashboard-btn cars45-btn primary btn--animated"
            onClick={() => {
              writeToCache();
              history.push("/grade");
              setItem("car", data);
            }}
          >
            Grade
          </Button>
        ))}
    </>
  );
};

export default withRouter(CarByLotNo);
