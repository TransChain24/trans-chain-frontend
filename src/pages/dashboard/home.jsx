import React from "react";
import { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

export function Home() {

  // const [visible, setVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [disUser, setDisUser] = useState(false);
  // let val="Display Users";
  return (
    <div className="mt-10 ">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 ">
        {statisticsCardsData.map(({ icon, value, ...rest }) => (
          <StatisticsCard
            key={value}
            // val = {value}
            onClick={() => {

              if (value === "Add Items") {
                setVisible(!visible);
              }
              if (value === "Display Users") {
                setDisUser(!disUser);
              }
              // for other cards
            }}
            {...rest}
            value={value}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })
            }
          // footer={
          //   <Typography className="font-normal text-blue-gray-600">
          //     <strong className={footer.color}>{footer.value}</strong>
          //     &nbsp;{footer.label}
          //   </Typography>
          // }
          />
        ))}
      </div>
      {/* Charts removed */}
      {/* <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div> */}
       
      {
        !disUser && visible ?
          <div className="">
            <div class="-mt-4 flex flex-col ">
              <div class="relative  sm:max-w-xl ">
                {/* <div
          class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div> */}
                <div class="relative px-4 py-2 bg-white shadow-lg sm:rounded-3xl sm:p-8">
                  <div class="max-w-md mx-auto">
                    <div>
                      <h1 class="text-2xl font-semibold -m-3">Add New Product</h1>
                    </div>
                    <div class="divide-y divide-gray-200">
                      <div class="py-6 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-5">
                        <div class="relative">
                          <input autocomplete="off" id="product_name" name="product_name" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Product Name" required />
                          <label for="product_name" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Product Name</label>
                        </div>
                        <div class="relative">
                          <input autocomplete="off" id="product_description" name="product_description" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Product Description" required />
                          <label for="product_description" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Product Description</label>
                        </div>
                        <div class="relative">
                          <input autocomplete="off" id="product_price" name="product_price" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Product Price" required />
                          <label for="product_price" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Product Price</label>
                        </div>
                        <div class="relative">
                          {/* <button class="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>     */}
                          {/* <button class="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none shadow-md">SIGN IN</button> */}
                          <Button variant="gradient" fullWidth className="mt-8">
                            ADD PRODUCT
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 flex items-center justify-between p-6"
                >
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-1">
                      Projects
                    </Typography>
                    <Typography
                      variant="small"
                      className="flex items-center gap-1 font-normal text-blue-gray-600"
                    >
                      <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                      <strong>30 done</strong> this month
                    </Typography>
                  </div>
                  <Menu placement="left-start">
                    <MenuHandler>
                      <IconButton size="sm" variant="text" color="blue-gray">
                        <EllipsisVerticalIcon
                          strokeWidth={3}
                          fill="currenColor"
                          className="h-6 w-6"
                        />
                      </IconButton>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem>Action</MenuItem>
                      <MenuItem>Another Action</MenuItem>
                      <MenuItem>Something else here</MenuItem>
                    </MenuList>
                  </Menu>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                  <table className="w-full min-w-[640px] table-auto">
                    <thead>
                      <tr>
                        {["companies", "members", "budget", "completion"].map(
                          (el) => (
                            <th
                              key={el}
                              className="border-b border-blue-gray-50 py-3 px-6 text-left"
                            >
                              <Typography
                                variant="small"
                                className="text-[11px] font-medium uppercase text-blue-gray-400"
                              >
                                {el}
                              </Typography>
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {projectsTableData.map(
                        ({ img, name, members, budget, completion }, key) => {
                          const className = `py-3 px-5 ${key === projectsTableData.length - 1
                              ? ""
                              : "border-b border-blue-gray-50"
                            }`;

                          return (
                            <tr key={name}>
                              <td className={className}>
                                <div className="flex items-center gap-4">
                                  <Avatar src={img} alt={name} size="sm" />
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold"
                                  >
                                    {name}
                                  </Typography>
                                </div>
                              </td>
                              <td className={className}>
                                {members.map(({ img, name }, key) => (
                                  <Tooltip key={name} content={name}>
                                    <Avatar
                                      src={img}
                                      alt={name}
                                      size="xs"
                                      variant="circular"
                                      className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                                        }`}
                                    />
                                  </Tooltip>
                                ))}
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  className="text-xs font-medium text-blue-gray-600"
                                >
                                  {budget}
                                </Typography>
                              </td>
                              <td className={className}>
                                <div className="w-10/12">
                                  <Typography
                                    variant="small"
                                    className="mb-1 block text-xs font-medium text-blue-gray-600"
                                  >
                                    {completion}%
                                  </Typography>
                                  <Progress
                                    value={completion}
                                    variant="gradient"
                                    color={completion === 100 ? "green" : "blue"}
                                    className="h-1"
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </CardBody>
              </Card> */}
            {/* <Card className="border border-blue-gray-100 shadow-sm">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-6"
                >
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Orders Overview
                  </Typography>
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal text-blue-gray-600"
                  >
                    <ArrowUpIcon
                      strokeWidth={3}
                      className="h-3.5 w-3.5 text-green-500"
                    />
                    <strong>24%</strong> this month
                  </Typography>
                </CardHeader>
                <CardBody className="pt-0">
                  {ordersOverviewData.map(
                    ({ icon, color, title, description }, key) => (
                      <div key={title} className="flex items-start gap-4 py-3">
                        <div
                          className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${key === ordersOverviewData.length - 1
                              ? "after:h-0"
                              : "after:h-4/6"
                            }`}
                        >
                          {React.createElement(icon, {
                            className: `!w-5 !h-5 ${color}`,
                          })}
                        </div>
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="block font-medium"
                          >
                            {title}
                          </Typography>
                          <Typography
                            as="span"
                            variant="small"
                            className="text-xs font-medium text-blue-gray-500"
                          >
                            {description}
                          </Typography>
                        </div>
                      </div>
                    )
                  )}
                </CardBody>
              </Card> */}

          </div>
          :
          <div></div>

      }  {
        !visible && disUser ?
          <div>disp users</div>
          :
          <div></div>
      }


    </div>
  );
}

export default Home;
