import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";

// const role = 'distributor';

const manufacturerCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    //title: "jklj fhfhff kjfkjf fjhasjf  jlkj",
    value: "Add Items",
    // footer: {
    //   color: "text-green-500",
    //   // value: "3.7%",
    //   // label: "Add what you sell",
    // },
  }
];

const distributorRetailerCardsData = [
  {
    color: "gray",
    icon: UsersIcon,
    //title: "Today's Users",
    value: "Display Users",
    // footer: {
    //   color: "text-green-500",
    //   value: "+3%",
    //   label: "than last month",
    // },
  }
];

    // {
    //   color: "gray",
    //   icon: UserPlusIcon,
    //   title: "New Clients",
    //   value: "3,462",
    //   footer: {
    //     color: "text-red-500",
    //     value: "-2%",
    //     label: "than yesterday",
    //   },
    // },
  // {
  //   color: "gray",
  //   icon: ChartBarIcon,
  //   title: "Sales",
  //   value: "$103,430",
  //   footer: {
  //     color: "text-green-500",
  //     value: "+5%",
  //     label: "than yesterday",
  //   },
  // },

// export statisticsCardsData;

export  {manufacturerCardsData,distributorRetailerCardsData};
