import React from "react";
import PropTypes from "prop-types";

const IsQc = ({ isQC }) => {
  if (!isQC) return null;
  return (
    <div className="qc-mode-notifier">
      <p>QC Mode</p>
    </div>
  );
};

export default IsQc;

IsQc.propTypes = {
  isQC: PropTypes.bool.isRequired
};
