import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Button } from "reactstrap";

//custom dependencies
import { CustomLoader } from "../../shared";

//graphql
import { getCarByLotNo, getCarGrade } from "../carSearch.graphql";

const CarByLotNo = ({ notifyFailure, lotNumber }) => {
  const { data, loading, error } = useQuery(getCarByLotNo, {
    variables: {
      lotNumber
    }
  });

  let car = (data && data.car) || null;

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
          >
            Grade
          </Button>
        ))}
    </>
  );
};

export default CarByLotNo;
