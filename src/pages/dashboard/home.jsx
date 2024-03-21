import React from "react";
import { useState, useEffect } from "react";
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
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // DialogActions,
} from "@material-tailwind/react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";


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
// import { Data } from "./jsonData.js"; 
// import { fetchData } from "./api";
// import DisplayData from './DisplayData';
import axios from "axios";
import getData from "../auth/sign-in";

const API_URL = "http://localhost:3000/common/display/"; // Replace with your backend server's API URL

const fetchData = async (role) => {
  try {
    const response = await axios.get(`${API_URL}/display?role=${role}`);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};
export function Home() {

  // const [visible, setVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const role = 'distributor'; // or retailer
    const fetchDataFromAPI = async () => {
      try {
        const result = await fetchData(role);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromAPI();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // const role = "retailer"; // Or "distributor"
  // fetchData(role)
  //   .then(data => {
  //     console.log("Fetched data:", data);
  //     // Do something with the fetched data
  //   })
  //   .catch(error => {
  //     console.error("Error fetching data:", error);
  //     // Handle error
  //   });
  
  
  const handleOpenDialog = (item) => {
    setSelectedItem(item); // Set the selected item
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  const toggleDisplay = (value) => {
    setActiveCard(activeCard === value ? null : value);
  };
  
  return (
    <div className="mt-10 ">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 ">
        {statisticsCardsData.map(({ icon, value, ...rest }) => (
          <StatisticsCard
            key={value}
            // val = {value}
            onClick={() => toggleDisplay(value)}
            {...rest}
            value={value}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })
            }
          />
        ))}
      </div>
      
      {activeCard === "Add Items" && <div className="">
          <div class="-mt-4 flex flex-col ">
	<div class="relative  sm:max-w-xl ">
		
		<div class="relative px-4 py-2 bg-white shadow-lg sm:rounded-3xl sm:p-8">
			<div class="max-w-md mx-auto">
				<div>
					<h1 class="text-2xl font-semibold -m-3">Add New Product</h1>
				</div>
				<div class="divide-y divide-gray-200">
					<div class="py-6 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-5">
						<div class="relative my-3">
							<input autocomplete="off" id="product_name" name="product_name" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 my-3" placeholder="Product Name" required/>
							<label for="product_name" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Product Name</label>
						</div>
						<div class="relative">
							<input autocomplete="off" id="product_description" name="product_description" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 my-3" placeholder="Product Description" required/>
							<label for="product_description" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Product Description</label>
						</div>
            <div class="relative">
							<input autocomplete="off" id="product_price" name="product_price" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 my-3" placeholder="Product Price" required/>
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
        </div>}
      {activeCard === "Display Users" && (
        <div>
        <Typography variant="h6">Items List:</Typography>
        <table className="w-full min-w-[640px] table-auto bg-white shadow-md rounded-lg overflow-hidden my-6">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Organization Name</th>
              <th className="py-3 px-6 text-left">GSTIN</th>
              <th className="py-3 px-6 text-left">Role</th>
              {/* <th className="py-3 px-6 text-left">Product ID</th> */}
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{item.organizationName}</td>
                <td className="py-3 px-6 text-left">{item.GSTIN}</td>
                <td className="py-3 px-6 text-left">{item.role}</td>
                {/* <td className="py-3 px-6 text-left">{item.productId}</td> */}
                <td className="py-3 px-6 text-left">
                  <Button onClick={() => handleOpenDialog(item)} className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}


<Dialog open={openDialog} onClose={handleCloseDialog}>
  
  {selectedItem && (
    <>
      <DialogTitle>{selectedItem.productName}</DialogTitle>
      <DialogContent>
        <Typography>Product ID: {selectedItem.productId}</Typography>
        {/* Add more fields as needed */}
        <TextField
          label="Quantity"
          variant="outlined"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            width: "100%", 
          
          }}
          // Add any necessary props and event handlers here
        />
      </DialogContent>
      <DialogActions>
      <Button color="primary" className="mr-auto bg-gray-900 hover:bg-gray-700 text-white font-bold rounded">
          Order
        </Button>
        <Button onClick={handleCloseDialog} color="primary" className="bg-gray-900 hover:bg-gray-700 text-white font-bold rounded">
          Close
        </Button>
      </DialogActions>
    </>
  )}
</Dialog>


    </div>
  );
}

export default Home;
