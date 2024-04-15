import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useState } from "react";

export function StatisticsCard({ color, icon, value, onClick}) {

  const [visible, setVisible] = useState(false);
  const [disUser, setDisUser] = useState(false);

  return (
    
    <Card onClick={onClick} className="border border-blue-gray-100 shadow-sm p-3 w-56 -my-6">
      <CardHeader
        variant="gradient"
        color={color}
        floated={false}
        shadow={false}
        className="absolute grid h-12 w-12 place-items-center"
      >
        {icon}
      </CardHeader>
      <CardBody className="text-left">
        <Typography variant="h4" color="blue-gray" className="mx-14 -my-5">
          {value}
        </Typography>
        {/* <Typography variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography> */}
      </CardBody>
      {/* {footer && (
        <CardFooter className=" border-blue-gray-50 p-2">
          {footer}
        </CardFooter>
      )} */}
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
