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
import {manufacturerCardsData, distributorRetailerCardsData} from "@/data";
// import distributorRetailerCardsData from "@/data";
import { useLocation } from "react-router-dom";

import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";

import axios  from "axios";
export function Home() {

  const [visible, setVisible] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrganization, setExpandedOrganization] = useState(null);

  const location = useLocation();
  const { role } = location.state;

  const API_URL = "http://localhost:3000/common/display/"; // Replace with your backend server's API URL
  const API_URL_PRODUCT = "http://localhost:3000/common/product/"; // Replace with your backend server's API URL

  const fetchData = async (userRole) => {
    try {
      const response = await axios.get(`${API_URL}/display?role=${userRole}`);
      return response.data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL_PRODUCT}/getAllProduct`);
      return response.data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
       
        // const role = "distributor";
        const result = await fetchData(role);
        console.log(result);
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Error fetching data');
      }
    };

    const fetchProductAPI = async () => {
      try{
        const result1 = await fetchProduct();
        console.log(result1);
        setProduct(result1.data);
        setLoading(false);
      } catch(error){
        console.error('Error fetching product:', error);
        setError(error.message || 'Error fetching product');
      }
    };

    fetchDataFromAPI();
    fetchProductAPI();
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
  
  const productsData = [
    {
      ownerId: 1,
      products: [
        { productId: 1, productName: "Product 1", description: "Description for Product 1" },
        { productId: 2, productName: "Product 2", description: "Description for Product 2" },
        // Add more products for owner ID 1 if needed
      ]
    },
    {
      ownerId: 2,
      products: [
        { productId: 3, productName: "Product 3", description: "Description for Product 3" },
        { productId: 4, productName: "Product 4", description: "Description for Product 4" },
        // Add more products for owner ID 2 if needed
      ]
    },
    // Add more owner IDs and associated products as needed
  ];

  
  const handleOpenDialog = (item) => {
    setSelectedItem(item); // Set the selected item
    setExpandedOrganization(item); 
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
      {role === "manufacturer" ? (
    manufacturerCardsData.map(({ icon, value, ...rest }) => (
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
    distributorRetailerCardsData.map(({ icon, value, ...rest }) => (
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
      
      {/* {activeCard === "Add Items" && role === "manufacturer" && <div className=""> */}
      {activeCard === "Add Items" && <div className="">
          <div class="-mt-4 flex flex-col">
	<div class="relative  sm:max-w-xl my-4">
		
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
              <Button variant="gradient" fullWidth className="-my-1">
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
      {activeCard === "Display Users" && role === "distributor" && (
        <div>
        
        <Typography variant="h6">Product List:</Typography>
        <table className="w-full min-w-[640px] table-auto bg-white shadow-md rounded-lg overflow-hidden my-6">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Product ID</th>
              <th className="py-3 px-6 text-left">Product Name</th>
              <th className="py-3 px-6 text-left">Product Description</th>
              {/* <th className="py-3 px-6 text-left">Product ID</th> */}
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* {data.map((item, index) => ( */}
            {/* {data.map((item, index) => ( */}
            {product.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                {/* <td className="py-3 px-6 text-left">{item.organizationName}</td>
                <td className="py-3 px-6 text-left">{item.GSTIN}</td>
                <td className="py-3 px-6 text-left">{item.role}</td> */}
                <td className="py-3 px-6 text-left">{item.productID}</td>
                <td className="py-3 px-6 text-left">{item.productName}</td>
                <td className="py-3 px-6 text-left">{item.productDescription}</td>
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

{activeCard === "Display Users" && role === "retailer" && (
  <div>
    <Typography variant="h6">Items List:</Typography>
    <table className="w-full min-w-[640px] table-auto bg-white shadow-md rounded-lg overflow-hidden my-6">
      <thead>
        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">Organization Name</th>
          <th className="py-3 px-6 text-left">GSTIN</th>
          <th className="py-3 px-6 text-left">Role</th>
          <th className="py-3 px-6 text-left">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left" onClick={() => handleOrganizationClick(item.organizationName)}>
                {item.organizationName}
              </td>
              <td className="py-3 px-6 text-left">{item.GSTIN}</td>
              <td className="py-3 px-6 text-left">{item.role}</td>
              <td className="py-3 px-6 text-left">
                <Button onClick={() => handleOpenDialog(item)} className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  View Details
                </Button>
              </td>
            </tr>
            {expandedOrganization === item.organizationName && (
              <tr>
                <td colSpan="4">
                  <table className="w-full min-w-[640px] table-auto bg-white shadow-md rounded-lg overflow-hidden my-6">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Product ID</th>
                        <th className="py-3 px-6 text-left">Product Name</th>
                        <th className="py-3 px-6 text-left">Product Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.products.map((product, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="py-3 px-6 text-left">{product.productId}</td>
                          <td className="py-3 px-6 text-left">{product.productName}</td>
                          <td className="py-3 px-6 text-left">{product.productDescription}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
)}

{role === "retailer" &&
<Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg">
  <>
    {expandedOrganization && (
      <>
        <DialogTitle>{expandedOrganization.organizationName}</DialogTitle>
        <DialogContent className="w-150">
          {productsData.map((owner) => {
            // if (owner.ownerId === "1") {
            
            // if (product === expandedOrganization.ownerId) {
            // if (owner.ownerId === expandedOrganization.ownerId) {
            // if (owner.ownerId === expandedOrganization.ownerId) {
              return "1" && owner.products.length > 0 ? (
                <React.Fragment>
                  <Typography variant="h6">Products List:</Typography>
                  <table className="w-full min-w-[640px] table-auto bg-white shadow-md rounded-lg overflow-hidden my-6">
                    {/* Table header */}
                    <thead>
                      {/* Table header row */}
                      <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Product ID</th>
                        <th className="py-3 px-6 text-left">Product Name</th>
                        <th className="py-3 px-6 text-left">Description</th>
                        <th className="py-3 px-6 text-left">Action</th>
                        {/* Add any other columns you need */}
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-gray-600 text-sm font-light">
                      {/* Iterate over the products */}
                      {owner.products.map((product, index) => (
                        // Table row for each product
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                          {/* Product ID */}
                          <td className="py-3 px-6 text-left">{product.productId}</td>
                          {/* Product Name */}
                          <td className="py-3 px-6 text-left">{product.productName}</td>
                          {/* Product Description */}
                          <td className="py-3 px-6 text-left">{product.description}</td>
                          {/* Add any other columns you need */}
                          <td className="py-1.5 px-6 text-left">{<Button color="primary" className=" bg-gray-900 hover:bg-gray-700 text-white font-bold rounded">
          Order
        </Button>
}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </React.Fragment>
              ) : (
                <Typography>No products found for this organization.</Typography>
              );
            // }
            return null;
          })}
        </DialogContent>
        {/* Dialog actions */}
        <DialogActions>
          {/* Close button */}
          <Button onClick={handleCloseDialog} color="primary" className="ml-auto mr-auto w-56 bg-gray-900 hover:bg-gray-700 text-white font-bold rounded">
            Close
          </Button>
        </DialogActions>
      </>
    )}
  </>
</Dialog>
}

{ role === "distributor" &&

<Dialog open={openDialog} onClose={handleCloseDialog}>
  
  {selectedItem && (
    <>
      <DialogTitle>{selectedItem.productName}</DialogTitle>
      <DialogContent>
        <Typography><b>Product ID :</b> {selectedItem.productID}</Typography>
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
      <Button onClick={handleCloseDialog} color="primary" className=   " mr-auto bg-gray-900 hover:bg-gray-700 text-white font-bold rounded">
          Close
        </Button>
      <Button color="primary" className=" bg-gray-900 hover:bg-gray-700 text-white font-bold rounded">
          Order
        </Button>
        
      </DialogActions>
    </>
  )}
</Dialog>
}

    </div>
  );
}

export default Home;
