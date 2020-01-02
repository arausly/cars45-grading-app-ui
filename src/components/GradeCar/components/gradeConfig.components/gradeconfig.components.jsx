import React, { useState, useContext } from "react";

import CustomToggleSwitch from "../../../shared/toggle.components";
import { CarGradeContext } from "../../gradecar.main";

const GradeConfig = ({ SectionMaxGrade, parsedCheckList, Checklist }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const {
    handleSelectionAndDeselection,
    selectedKey,
    sectionConfig
  } = useContext(CarGradeContext);

  const checklistIsChecked =
    (sectionConfig[selectedKey] &&
      sectionConfig[selectedKey].conditions.has(Checklist)) ||
    false;
  return (
    <div>
      <label>
        <div className="checklist-box">
          <span id="Tooltip">{parsedCheckList}</span>
          <CustomToggleSwitch
            uniqueId={Checklist}
            onChangeHandler={e => {
              handleSelectionAndDeselection(
                e.target.checked,
                SectionMaxGrade,
                selectedKey,
                Checklist
              );
            }}
            checkedCondition={checklistIsChecked}
          />
        </div>
      </label>
    </div>
  );
};

export default GradeConfig;
