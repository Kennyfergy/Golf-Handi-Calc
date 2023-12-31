import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import Rounds from "../Rounds/Rounds";
import AddRound from "../AddRound/AddRound";
import Courses from "../Courses/Courses";
import AddCourse from "../AddCourse/AddCourse";
import AdminPage from "../AdminPage/AdminPage";
import SettingsPage from "../SettingsPage/SettingsPage";

// import { Drawer, Button, List, ListItem, ListItemText } from "@material-ui";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows add rounds page else shows login page
            exact
            path="/addRound"
          >
            <AddRound />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows rounds page else shows LoginPage
            exact
            path="/rounds"
          >
            <Rounds />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows courses page else shows LoginPage
            exact
            path="/courses"
          >
            <Courses />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows add courses page else shows LoginPage
            exact
            path="/addCourse"
          >
            <AddCourse />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows settings page else shows LoginPage
            exact
            path="/settings"
          >
            <SettingsPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>
          {user.is_admin && (
            <ProtectedRoute
              // admin page only shows up for admin
              exact
              path="/admin"
            >
              <AdminPage />
            </ProtectedRoute>
          )}

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LoginPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
