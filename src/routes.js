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

import Clients from "layouts/pages/clients";
import FormatsPage from "layouts/pages/formats";
import Users from "layouts/pages/users";
import ProjectsPage from "layouts/pages/projects";
<<<<<<< HEAD
import RecordsPage from "layouts/pages/records";
=======
import ElementsPage from "layouts/pages/elements";

import { AiOutlineProject } from "react-icons/ai";
import { LiaElementor } from "react-icons/lia";
>>>>>>> master

/*
collapse: [
      {
        name: "Clientes",
        key: "default",
        route: "/clients/clients",
        component: <Clients />,
      },
      {
        name: "Automotive",
        key: "automotive",
        route: "/dashboards/automotive",
        component: <Automotive />,
      },
      {
        name: "Smart Home",
        key: "smart-home",
        route: "/dashboards/smart-home",
        component: <SmartHome />,
      },
      {
        name: "Virtual Reality",
        key: "virtual-reality",
        collapse: [
          {
            name: "VR Default",
            key: "vr-default",
            route: "/dashboards/virtual-reality/default",
            component: <VRDefault />,
          },
          {
            name: "VR Info",
            key: "vr-info",
            route: "/dashboards/virtual-reality/info",
            component: <VRInfo />,
          },
        ],
      },
      { name: "CRM", key: "crm", route: "/dashboards/crm", component: <CRM /> },
    ],
*/

const routes = [
  {
    type: "collapse",
    name: "Usuarios",
    route: "/users",
    key: "users",
    noCollapse: true,
    component: <Users />,
    icon: <Office size='12px' />,
    permissions: ["administrador"],
  },
  {
    type: "collapse",
    name: "Clientes",
    route: "/clients/clients",
    key: "clients",
    noCollapse: true,
    component: <Clients />,
    icon: <Shop size='12px' />,
    permissions: ["administrador", "tipo1", "tipo2"],
  },
  {
    type: "collapse",
    name: "Formatos",
    noCollapse: true,
    icon: <Shop size='12px' />,
    key: "client-formats-tipo3",
    route: "/formats/user",
    component: <FormatsPage />,
    permissions: ["tipo3"],
  },
  {
    key: "client-formats",
    route: "/clients/:uuid/formats",
    component: <FormatsPage />,
  },
  {
    key: "client-format-projects",
    route: "/clients/formats/:uuid/projects",
    component: <ProjectsPage />,
  },
  {
    name: "Proyectos",
    key: "projects",
    route: "/projects",
    type: "collapse",
    noCollapse: true,
    icon: <AiOutlineProject size='12px' />,
    component: <ProjectsPage />,
  },
  {
    name: "Fichas",
    key: "records",
    route: "/records",
    type: "collapse",
    noCollapse: true,
    icon: <Basket size="12px"  />,
    component: <RecordsPage />,
  },
  {
    name: "Elementos",
    key: "elements",
    route: "/elements",
    type: "collapse",
    noCollapse: true,
    icon: <LiaElementor size='12px' />,
    component: <ElementsPage />,
  },

  {
    type: "collapse",
    name: "Change Log",
    key: "changelog",
    href: "https://github.com/creativetimofficial/ct-soft-ui-dashboard-pro-react/blob/main/CHANGELOG.md",
    icon: <CreditCard size='12px' />,
    noCollapse: true,
  },
];

export default routes;
