"use strict";

var
  React = require("react"),
  Router = require("react-router"),
  DefaultRoute = Router.DefaultRoute,
  Route = Router.Route,
  NotFoundRoute = Router.NotFoundRoute,
  Redirect = Router.Redirect;

var routes = (
  <Route name="app" path="/" handler={require("./components/app")}>
    <DefaultRoute handler={require("./components/homePage")}/>
    <Route name="authors" handler={require("./components/authors/authorPage")}/>
    <Route name="addAuthor" path="author" handler={require("./components/authors/manageAuthorPage")}/>
    <Route name="about" handler={require("./components/about/aboutPage")}/>
    <NotFoundRoute handler={require("./components/notFoundPage")}/>
    <Redirect from="about-us" to="about"/>
    <Redirect from="about/*" to="about"/>
  </Route>
);

module.exports = routes;