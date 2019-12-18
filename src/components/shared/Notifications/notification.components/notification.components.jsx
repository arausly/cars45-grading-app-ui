import React from "react";
import { MdDone, MdClose } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import PropTypes from "prop-types";

const Notifier = ({ closeToast, message, notifierType }) => {
  const isSuccessType = notifierType === "success";
  return (
    <div className={`cars45-notify-${notifierType}`}>
      <span></span>
      <div className={`cars45-notify-${notifierType}__content`}>
        <div
          className={`cars45-notify-${notifierType}__content-marker flex-center`}
        >
          <span className="flex-center">
            {(isSuccessType && <MdDone />) || <MdClose />}
          </span>
        </div>
        <div className={`cars45-notify-${notifierType}__content-msg`}>
          <p>{(isSuccessType && "Success Message") || "Error Message"}</p>
          <p>{message}</p>
        </div>
        <div className={`cars45-notify-${notifierType}__content-close`}>
          <IoIosClose onClick={() => closeToast()} />
        </div>
      </div>
    </div>
  );
};

export default Notifier;

Notifier.propTypes = {
  message: PropTypes.string.isRequired,
  closeToast: PropTypes.func.isRequired,
  autoClose: PropTypes.number.isRequired
};
