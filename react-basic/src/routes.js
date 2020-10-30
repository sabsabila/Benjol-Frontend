/*
  Kalo nambah route disini ya, caranya gini :
    1. Import component2nya
    2. Masukin ke array APP_ROUTE, private itu berarti routenya cuman bisa diliat kalo udah login,
       restricted itu berarti routenya gak bisa diliat kalo udah login (Misal kalo aku masuk 
        halaman login padal udah login)
*/

import Login from "pages/Login";
import Home from "pages/Home";
import Dashboard from "pages/Dashboard";
import Bengkel from "pages/Bengkel";
import Services from "pages/Services";
import AboutUs from "pages/AboutUs";
import OurPartnerts from "pages/OurPartnerts";

export const APP_ROUTE = [
  {
    name: "Login",
    path: "/login",
    exact: true,
    component: Login,
    restricted: true,
  },
  {
    name: "Home",
    path: "/",
    exact: true,
    component: Home,
    restricted: false,
  },

  {
    name: "Dashboard",
    path: "/dashboard",
    exact: true,
    component: Dashboard,
    private: true,
  },
  {
    name: "Bengkel",
    path: "/bengkel",
    exact: true,
    component: Bengkel,
  },
  {
    name: "Services",
    path: "/services",
    exact: true,
    component: Services,
    restricted: false,
  },

  {
    name: "AboutUs",
    path: "/aboutus",
    exact: true,
    component: AboutUs,
    restricted: false,
  },

  {
    name: "OurPartnerts",
    path: "/ourpartnerts",
    exact: true,
    component: OurPartnerts,
    restricted: false,
  },
];
