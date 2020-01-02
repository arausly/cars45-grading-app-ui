import React, { useContext, useState, useEffect, createRef } from "react";
import { MdDone } from "react-icons/md";

//context
import { CarGradeContext } from "../gradecar.main";

//components
import CustomToggleSwitch from "../../shared/toggle.components";

//css
import "../../../scss/shared.components.styles/_gradecarmobile.scss";

const MobileGrade = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [conditionsPerKey, setConditionsPerKey] = useState([]);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const {
    selectedKey,
    gradeKeys,
    gradeConfigs,
    setCheckedKeys,
    checkedKeys,
    setSelectedKey,
    sectionConfig,
    handleSelectionAndDeselection
  } = useContext(CarGradeContext);
  //get conditions per key
  const gradeConditionsForSelectedKey = gradeKey => {
    return (
      gradeConfigs.find(config => config.key === gradeKey).conditions || []
    );
  };
  //accrues a list of checked gradeKeys
  const selectedGradeKey = name => {
    setCheckedKeys([...new Set([...checkedKeys, name])]);
  };

  const checklistIsChecked = Checklist =>
    (sectionConfig[selectedKey] &&
      sectionConfig[selectedKey].conditions.has(Checklist)) ||
    false;

  return (
    <>
      {gradeKeys.map((gradeKey, index) => {
        return (
          <details
            key={index}
            className="mobile_gradecar"
            onClick={() => {
              setSelectedKey(gradeKey);
              selectedGradeKey(gradeKey);
            }}
          >
            <summary>
              <p>{gradeKey}</p>
              {checkedKeys.includes(gradeKey) && <MdDone />}
            </summary>
            <ol>
              {gradeConditionsForSelectedKey(gradeKey).map(
                (
                  {
                    TransposedCheckList,
                    parsedCheckList,
                    Description,
                    Checklist,
                    SectionMaxGrade
                  },
                  index
                ) => (
                  <div key={index}>
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
                          checkedCondition={checklistIsChecked(Checklist)}
                        />
                      </div>
                    </label>
                  </div>
                )
              )}
            </ol>
          </details>
        );
      })}
    </>
  );
};

export default MobileGrade;
