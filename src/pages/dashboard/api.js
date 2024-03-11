// export const jsonData = [
//     {
//       companyName: "Company A",
//       description: "Description A",
//       productName: "Product 1",
//       productId: "001",
//     },
//     {
//       companyName: "Company B",
//       description: "Description B",
//       productName: "Product 2",
//       productId: "002",
//     },
//     // Add more items as needed
//   ];

// import axios from "axios";

// const API_URL = "http://localhost:3000"; // Replace with your backend server's API URL

// export const fetchData = async (role) => {
//   try {
//     const response = await axios.get(`${API_URL}/common/display?role=${role}`);
//     return response.data; // Return the fetched data
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // Rethrow the error to handle it in the component
//   }
// };



import axios from "axios";

const API_URL = "http://localhost:3000/common/display/"; // Replace with your backend server's API URL

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}display?role=retailer`); // Make a GET request to fetch data
    console.log(response);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};
// import React, { useState, useEffect } from 'react';
// import { fetchData } from './api'; // Replace with the correct path to your API file

// const DisplayData = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchDataFromAPI = async () => {
//       try {
//         const result = await fetchData(); // Call your fetchData function
//         setData(result.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchDataFromAPI();
//   }, []);

//   return (
//     <div>
//       <h1>Data Display</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>User Name</th>
//             <th>Email ID</th>
//             <th>Password</th>
//             <th>Organization Name</th>
//             <th>GSTIN</th>
//             <th>Role</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item._id}>
//               <td>{item.userName}</td>
//               <td>{item.emailID}</td>
//               <td>{item.password}</td>
//               <td>{item.organizationName}</td>
//               <td>{item.GSTIN}</td>
//               <td>{item.role}</td>
//               <td>{item.createdAt}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DisplayData;