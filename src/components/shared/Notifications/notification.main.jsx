import React, { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//custom dependencies
import Notifier from "./notification.components/notification.components";

const toastConfig = {
  position: "top-right",
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const _notifySuccess = (message = "Success!", autoClose = 5000) =>
    toast(
      ({ closeToast }) => (
        <Notifier
          closeToast={closeToast}
          message={message}
          autoClose={5000}
          notifierType="success"
        />
      ),
      { autoClose }
    );
  const _notifyFailure = (
    message = "Something went wrong. Please try again!",
    autoClose = 5000
  ) =>
    toast(
      ({ closeToast }) => (
        <Notifier
          closeToast={closeToast}
          message={message}
          autoClose={autoClose}
          notifierType="failure"
        />
      ),
      { autoClose }
    );

  return (
    <NotificationContext.Provider
      value={{
        notifySuccess: _notifySuccess,
        notifyFailure: _notifyFailure
      }}
    >
      <ToastContainer {...toastConfig} />
      {children}
    </NotificationContext.Provider>
  );
};

export const withNotifier = Component => {
  const NotifyWrapper = props => {
    const { notifySuccess, notifyFailure } = useContext(NotificationContext);
    return (
      <Component
        {...props}
        notifySuccess={notifySuccess}
        notifyFailure={notifyFailure}
      />
    );
  };
  return NotifyWrapper;
};

export default NotificationProvider;
