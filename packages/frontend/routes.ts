import { IconType } from "react-icons";
import { MdHome } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";

export interface Route {
  name: string;
  path: string;
  icon: IconType;
}

export const dashboardRoutes: Route[] = [
  {
    path: "/dashboard",
    name: "Home",
    icon: MdHome,
  },
  {
    path: "/dashboard/support",
    name: "Support",
    icon: FaHandshake,
  },
];
