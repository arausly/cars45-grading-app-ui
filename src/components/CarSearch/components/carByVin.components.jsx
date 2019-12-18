import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Button } from "reactstrap";

//custom dependencies
import { CustomLoader } from "../../shared";

//graphql
import { getACarByVin, getCarGrade } from "../carSearch.graphql";

const CarByVin = ({ notifyFailure, vin }) => {
  const { data, loading, error } = useQuery(getACarByVin, {
    variables: {
      vin
    }
  });

  let car = (data && data.car) || null;

  /** has to be an empty string because the api expects a string to search for lotNumber */
  const gradeQuery = useQuery(getCarGrade, {
    variables: {
      lotNumber: (car && car.lotNumber) || " "
    }
  });

  if (loading || gradeQuery.loading) return <CustomLoader />;
  if (error || gradeQuery.error) {
    console.log("gradeError", gradeQuery.error, error);
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

export default CarByVin;
