import React from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { manufacturerdistributorCardsData, RetailerCardsData } from "@/data";
import { StatisticsCard } from "@/widgets/cards";


const role = localStorage.getItem("role");
const id = localStorage.getItem("id");
// console.log(role);
export function Notifications() {
  return (
    <div className="mt-10 ">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 ">
        {role === "manufacturer" || role === "distributor" ? (
          manufacturerdistributorCardsData.map(({ icon, value, ...rest }) => (
            <StatisticsCard
              key={value}
              // val = {value}
              onClick={() => toggleDisplay(value)}
              {...rest}
              value={value}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
            />
          ))
        ) : (
          RetailerCardsData.map(({ icon, value, ...rest }) => (
            <StatisticsCard
              key={value}
              // val = {value}
              onClick={() => toggleDisplay(value)}
              {...rest}
              value={value}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Notifications;
