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
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrganization, setExpandedOrganization] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [quantity, setQuantity] = useState();
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [distributors, setDistributorList] = useState([]);
  const [productsData, setDistributorProduct] = useState([]); // inventory products data
  const [requestProduct,setRequestProduct] = useState({
    productID:"",
    senderID:"",
    receiverID:"",
    quantity: 0,
    sendTo:"",
  });

  const location = useLocation();
  // const { role } = location.state;
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");

  const API_URL_DISPLAY = "http://localhost:3000/common/display/"; // Replace with your backend server's API URL
  const API_URL_PRODUCT = "http://localhost:3000/common/product/"; // Replace with your backend server's API URL
  const API_URL_REQUEST = "http://localhost:3000/common/request/";

  const fetchData = async (userRole) => {
    try {
      const response = await axios.get(`${API_URL_DISPLAY}/display?role=${userRole}`);
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

  const getDisFromInventory = async () => {
    try {
      const response = await axios.get(`${API_URL_DISPLAY}/getUserDetailsFromInventory/distributor`);
      return response.data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching distributor list:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  const getDistributorProducts = async (ownerId) => {
    try{
      const response = await axios.get(`${API_URL_PRODUCT}/getOwnerProducts/${ownerId}`);
      return response.data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching distributor list:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  }
   const handleOrder = async () => {
    try {
      console.log(requestProduct);
      // console.log(quantity)
      if (!quantity || isNaN(quantity) || parseInt(quantity) <= 0) {
        alert('Please enter a valid quantity.');
        return;
      }
      setRequestProduct({...requestProduct, quantity: parseInt(quantity)});
      const response = await axios.post(`${API_URL_REQUEST}request`, requestProduct);
      
      if (response.data && response.data.status === true) {

        alert('Order placed successfully!');
        setQuantity('');
      } else {
        alert('Failed to place the order. Please try again later.');
      }
    } catch (error) {
      console.error('Error placing the order:', error);
      alert('An error occurred while placing the order. Please try again later.');
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

    const inventoryDistributors = async () => {
      try{
        const res = await getDisFromInventory();
        console.log(res);
        setDistributorList(res.userDetails);
        setLoading(false);
      } catch(error){
        console.error('Error fetching distributors from inventory:', error);
        setError(error.message || 'Error fetching distributor list');
      }
    };

    fetchDataFromAPI();
    fetchProductAPI();
    inventoryDistributors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  const handleOpenDialog = (item) => {
    setSelectedItem(item); // Set the selected item
    setExpandedOrganization(item); 
    setOpenDialog(true); // Open the dialog
  };

  const handleOpenDialogForRetailer = async (item,ownerId) => {
    setSelectedItem(item); // Set the selected item
    setExpandedOrganization(item); 
    setOpenDialog(true); // Open the dialog

    try{ // it will call the api for getting products of ownerID has in
      const result = await getDistributorProducts(ownerId);
      console.log(result);
      setDistributorProduct(result.products);
      setLoading(false);
    }catch(error){
      console.error('Eror fetching products of distributors:', error);
      setError(error.message || 'Error fetching products of distributor');
    }

    setRequestProduct({ ...requestProduct,
      receiverID : ownerId,
      sendTo : item.role,
      senderID : id
    })

    
  };

  const handleOrderDialog = (item) => {
    setOpenOrderDialog(true);
    setSelectedItem(item);
    setRequestProduct({ ...requestProduct,
      productID : item.productID
    })
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
    setOpenOrderDialog(false);
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
        </div>
      }
      {activeCard === "Show Items" && <div className="">
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
        </div>
      }
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
                  <Button onClick={() => handleOrderDialog(item)} className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

{activeCard === "Display Users" && role === "retailer" && distributors && distributors.length > 0 && (
  <div>
    <Typography variant="h6">Items List:</Typography>
    <table className="w-full min-w-[640px] table-auto bg-white shadow-md rounded-lg overflow-hidden my-6">
      {/* Table header */}
      <thead>
        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">Organization Name</th>
          <th className="py-3 px-6 text-left">Owner Name</th>
          <th className="py-3 px-6 text-left">GSTIN</th>
          <th className="py-3 px-6 text-left">Role</th>
          <th className="py-3 px-6 text-left">Actions</th>
        </tr>
      </thead>
      {/* Table body */}
      <tbody className="text-gray-600 text-sm font-light">
        {distributors.map((item, index) => (
          <React.Fragment key={index}>
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">
                {item.organizationName}
              </td>
              <td className="py-3 px-6 text-left">{item.userName}</td>
              <td className="py-3 px-6 text-left">{item.GSTIN}</td>
              <td className="py-3 px-6 text-left">{item.role}</td>
              <td className="py-3 px-6 text-left">
                <Button onClick={() => handleOpenDialogForRetailer(item,item._id)} className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  View Details
                </Button>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
)}


{role === "retailer" && (
  <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg">
    <>
      {expandedOrganization && (
        <>
          <DialogTitle>{expandedOrganization.organizationName}</DialogTitle>
          <DialogContent className="w-150">
            {productsData && productsData.length > 0 ? (
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
                    {productsData.map((product, index) => (
                      // Table row for each product
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                        {/* Product ID */}
                        <td className="py-3 px-6 text-left">{product.productID}</td>
                        {/* Product Name */}
                        <td className="py-3 px-6 text-left">{product.productName}</td>
                        {/* Product Description */}
                        <td className="py-3 px-6 text-left">{product.productDescription}</td>
                        {/* Add any other columns you need */}
                        <td className="py-1.5 px-6 text-left">
                          <Button onClick={() => handleOrderDialog(product)} color="primary" className=" bg-gray-900 hover:bg-gray-700 text-white font-bold rounded">
                            Order
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </React.Fragment>
            ) : (
              <Typography>No products found for this organization.</Typography>
            )}
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
)}


{ (role === "distributor" || role === "retailer")&&

<Dialog open={openOrderDialog} onClose={handleCloseDialog}>
  
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
          onChange={(e) => setQuantity(e.target.value)}
          // Value should be controlled by state
          value={quantity}
        />
      </DialogContent>
      <DialogActions>
      <Button onClick={handleCloseDialog} color="primary" className=" mr-auto bg-gray-900 hover:bg-gray-700 text-white font-bold rounded">
          Close
        </Button>
      <Button onClick={handleOrder} color="primary" className=" bg-gray-900 hover:bg-gray-700 text-white font-bold rounded">
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
