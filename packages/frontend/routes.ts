import { IconType } from "react-icons";
import { MdHome, MdPerson } from "react-icons/md";

export interface Route {
  name: string;
  path: string;
  icon: IconType;
}

export const dashboardRoutes: Route[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: MdHome,
  },
];
