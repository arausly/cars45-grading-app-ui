import React, { useContext } from "react";

//context
import { CarGradeContext } from "../../gradecar.main";

//custom components
import GradeKeyBtn from "./gradeKeyBtn.components";

const GradeKeys = () => {
  const { gradeKeys } = useContext(CarGradeContext);
  return gradeKeys.map((name, index) => (
    <GradeKeyBtn key={index} name={name} />
  ));
};

export default GradeKeys;
