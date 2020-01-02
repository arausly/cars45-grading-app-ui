import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

//client
import client from "./client/client";

//custom dependencies
import { isCenter, isAdmin } from "./config/token.config";

//custom components
import Menu from "./components/shared/Menu/menu.main";

//pages
import LoginPage from "./components/Auth/Login/login.main";
import CarSearchPage from "./components/CarSearch/carSearch.main";
import CarGrade from "./components/GradeCar/gradecar.main";

//contexts
import NotificationProvider from "./components/shared/Notifications/notification.main";

/** access control for only center operatives */
const CenterProtectedRoute = ({ children }) => {
  return (isCenter() && <>{children}</>) || <Redirect to="/login/center" />;
};

/** access control for only admin operatives */
const AdminProtectedRoute = ({ children }) => {
  return (isAdmin() && <>{children}</>) || <Redirect to="/login/admin" />;
};

export default () => {
  return (
    <ApolloProvider client={client}>
      <NotificationProvider>
        <Router>
          <Switch>
            <Route exact path="/login/:role?" component={LoginPage} />
            <CenterProtectedRoute>
              <Menu.CenterMenu />
              <Switch>
                <Route exact path="/" component={CarSearchPage} />
                <Route path="/grade" component={CarGrade} />
              </Switch>
            </CenterProtectedRoute>
            <AdminProtectedRoute>
              <Menu.AdminMenu />
              <Switch></Switch>
            </AdminProtectedRoute>
          </Switch>
        </Router>
      </NotificationProvider>
    </ApolloProvider>
  );
};
