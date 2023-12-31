/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard PRO React layouts

// Soft UI Dashboard PRO React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import SettingsIcon from "examples/Icons/Settings";
import Basket from "examples/Icons/Basket";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";

import Users from "layouts/views/users";
import Home from "layouts/views/home";
import Templates from "layouts/views/templates";
import UserDetail from "layouts/views/users/detail";
import QuestionsPage from "layouts/views/questions";

import { AiOutlineProject } from "react-icons/ai";
import { LiaElementor } from "react-icons/lia";


const routes = [
  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Casa",
    route: "/home",
    key: "home",
    noCollapse: true,
    component: <Home />,
    icon: <SpaceShip size='12px' />,
  },
  {
    type: "collapse",
    name: "Usuarios",
    route: "/users",
    key: "users",
    noCollapse: true,
    component: <Users />,
    icon: <Office size='12px' />,
    permissions: ["alumno"],
  },
  {
    key: "userDetail",
    route: "/users/:email", // Using a dynamic route parameter for user ID
    component: <UserDetail />,
  },
  {
    type: "collapse",
    name: "Preguntas",
    key: "questions",
    icon: <SettingsIcon size='12px' />,
    permissions: ["alumno"],
    collapse: [
      {
        name: "Desarrollo",
        key: "templates",
        route: "/questions/templates",
        component: <Templates />,
      },
      {
        name: "Alternativas",
        key: "multichoice",
        route: "/questions/multichoice",
        component: <QuestionsPage />,
      },
    ],
  },

  { type: "divider", key: "divider-0"},
  { type: "title", title: "Docs", key: "title-docs" },
  {
    type: "collapse",
    name: "Repository",
    key: "changelog",
    href: "https://github.com/Rodrigo-Vildosola/wavelearn_frontend",
    icon: <CreditCard size='12px' />,
    noCollapse: true,
  },
];

export default routes;
