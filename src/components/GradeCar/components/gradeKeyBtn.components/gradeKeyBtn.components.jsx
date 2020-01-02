import React, { useContext } from "react";
import { MdDone } from "react-icons/md";

//context
import { CarGradeContext } from "../../gradecar.main";

const GradeBtnKey = ({ name }) => {
  const {
    setSelectedKey,
    selectedKey,
    checkedKeys,
    setCheckedKeys
  } = useContext(CarGradeContext);
  const btnClass =
    (selectedKey === name &&
      "gradeKeysButton gradeKeyActive gradeKeysButton") ||
    "gradeKeysButton gradeKeysButton";

  //accrues a list of checked gradeKeys
  const selectedGradeKey = () => {
    setCheckedKeys([...new Set([...checkedKeys, name])]);
  };

  return (
    <button
      type="button"
      className={btnClass}
      onClick={() => {
        setSelectedKey(name);
        selectedGradeKey();
      }}
    >
      {name}
      {checkedKeys.includes(name) && (
        <span>
          <MdDone />
        </span>
      )}
    </button>
  );
};

export default GradeBtnKey;
