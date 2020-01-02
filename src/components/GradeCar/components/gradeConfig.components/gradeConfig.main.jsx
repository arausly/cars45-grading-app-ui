import React, { useContext } from "react";

//context
import { CarGradeContext } from "../../gradecar.main";

//custom dependencies
import GradeConfig from "./gradeconfig.components";

const GradeConfigs = () => {
  const { gradeConfigs, selectedKey } = useContext(CarGradeContext);
  const gradeConditionsForSelectedKey = gradeConfigs.find(
    config => config.key === selectedKey
  ).conditions;
  return gradeConditionsForSelectedKey.map((config, index) => (
    <GradeConfig key={index} index={index} {...config} />
  ));
};

export default GradeConfigs;
