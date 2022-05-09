import { IconType } from "react-icons";
import { MdHome, MdPerson } from "react-icons/md";

import Dashboard from "./components/dashboard";
import Profile from "./components/profile";

export interface Route {
  name: string;
  path: string;
  icon: IconType;
  component: () => JSX.Element;
}

export const dashboardRoutes: Route[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: MdHome,
    component: Dashboard,
  },
  {
    path: "/dashboard/profile",
    name: "Profile",
    icon: MdPerson,
    component: Profile,
  },
];
