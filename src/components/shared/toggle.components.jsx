import React, { useEffect } from "react";
import PropTypes from "prop-types";

const ToggleSwitch = ({
  uniqueId,
  onChangeHandler,
  checkedCondition,
  disabledCondition,
  defaultChecked,
  name
}) => {
  useEffect(() => {}, [checkedCondition]);
  return (
    <>
      <input
        onChange={e => onChangeHandler(e)}
        id={`cars45-switch-check-${uniqueId}`}
        type="checkbox"
        className="hidden"
        checked={checkedCondition}
        defaultChecked={defaultChecked}
        disabled={disabledCondition}
        name={name}
      />
      <label
        htmlFor={`cars45-switch-check-${uniqueId}`}
        className="cars45-switch-box"
      >
        <label
          htmlFor={`cars45-switch-check-${uniqueId}`}
          className="cars45-switch"
        />
      </label>
    </>
  );
};

export default ToggleSwitch;

ToggleSwitch.propTypes = {
  // uniqueId: PropTypes.number.isRequired | PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  checkedCondition: PropTypes.bool,
  disabledCondition: PropTypes.bool,
  name: PropTypes.string
};
