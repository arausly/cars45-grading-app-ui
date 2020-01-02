import React, { useContext } from "react";

//context
import { CarGradeContext } from "../gradecar.main";

//custom components
import GradeBtnKeys from "./gradeKeyBtn.components/gradeKey.main";
import GradeConfigs from "./gradeConfig.components/gradeConfig.main";

//utils
import { dictateColorSetting } from "../gradecar.utils";

const DesktopScreen = () => {
  const { selectedKey, sectionConfig } = useContext(CarGradeContext);
  const sectionOverallGrade =
    (sectionConfig[selectedKey] && sectionConfig[selectedKey].grade) || "A";
  return (
    <div className="gradeMain">
      <div className="gradeKeys">
        <div
          className="btn-group-vertical"
          role="group"
          aria-label="grade keys buttons"
        >
          <GradeBtnKeys />
        </div>
      </div>
      <div className="gradeValues">
        <div className="gradeValuesHeading">
          <h1>{selectedKey}</h1>
          <div>
            <button
              className={dictateColorSetting(sectionOverallGrade)}
              type="button"
            >
              {sectionOverallGrade}
            </button>
            <p>Section Score</p>
          </div>
        </div>
        <div className="gradeChecklist">
          <GradeConfigs />
        </div>
      </div>
    </div>
  );
};

export default DesktopScreen;
