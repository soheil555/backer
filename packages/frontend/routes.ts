import { IconType } from "react-icons";
import { MdHome } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";

export interface Route {
  name: string;
  path?: string;
  category?: string;
  icon?: IconType;
  views?: Route[];
}

export const dashboardRoutes: Route[] = [
  {
    path: "/dashboard",
    name: "Home",
    icon: MdHome,
  },
  {
    name: "SUPPORTER PAGES",
    category: "supporter",
    views: [
      {
        path: "/dashboard/supporter/support",
        name: "Support",
        icon: FaHandshake,
      },
    ],
  },
  {
    name: "CREATOR PAGES",
    category: "creator",
    views: [
      {
        path: "/dashboard/creator/subscription-plans",
        name: "Subscription Plans",
        icon: FaDatabase,
      },
    ],
  },
];
