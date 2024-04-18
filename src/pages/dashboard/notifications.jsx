import React from "react";
import { useState, useEffect } from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { manufacturerdistributorCardsData, RetailerCardsData } from "@/data";
import { StatisticsCard } from "@/widgets/cards";
import axios from "axios";

// console.log(role);
export function Notifications() {
  
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id");
  const [activeCard, setActiveCard] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch pending requests
  const fetchPendingRequests = async () => {
    try {
      const userId = localStorage.getItem("id");
      const response = await axios.get(`http://localhost:3000/common/request/pending-requests/${userId}`);
      setPendingRequests(response.data.data); // Update state with pending requests
    } catch (error) {
      console.error('Error fetching pending requests:', error);
      setError(error.message || 'Error fetching pending requests');
    }
  };

  // Function to fetch accepted requests
  const fetchAcceptedRequests = async () => {
    try {
      const userId = localStorage.getItem("id");
      const response = await axios.get(`http://localhost:3000/common/request/accepted-requests/${userId}`);
      setAcceptedRequests(response.data.data); // Update state with accepted requests
    } catch (error) {
      console.error('Error fetching accepted requests:', error);
      setError(error.message || 'Error fetching accepted requests');
    }
  };

  useEffect(() => {
    fetchPendingRequests(); // Fetch pending requests when component mounts
    fetchAcceptedRequests(); // Fetch accepted requests when component mounts
  }, []);

  const toggleDisplay = (value) => {
    setActiveCard(activeCard === value ? null : value);
  };

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
      
      {activeCard === "Pending Request" && (
        <div>

          <Typography variant="h6">Pending Request List:</Typography>
          <table className="w-full min-w-[640px] table-auto bg-white shadow-md rounded-lg overflow-hidden my-6">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product ID</th>
                <th className="py-3 px-6 text-left">Sender ID</th>
                {/* <th className="py-3 px-6 text-left">Organization</th>
                <th className="py-3 px-6 text-left">GSTIN</th> */}
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Status</th>
              
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {pendingRequests.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{item.productID}</td>
                  <td className="py-3 px-6 text-left">{item.senderID}</td>
                  {/* <td className="py-3 px-6 text-left">{item.organizationName}</td>
                  <td className="py-3 px-6 text-left">{item.GSTIN}</td> */}
                  <td className="py-3 px-6 text-left">{item.quantity}</td>
                  <td className="py-3 px-6 text-left">{item.status}</td>
                  {/* <td className="py-3 px-6 text-left">{item.productId}</td> */}
                  {/* <td className="py-3 px-6 text-left">
                    <Button onClick={() => handleOrderDialog(item)} className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                      View Details
                    </Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeCard === "Approved Request" && (
        <div>
          <Typography variant="h6">Approved Request List:</Typography>
          <table className="w-full min-w-[640px] table-auto bg-white shadow-md rounded-lg overflow-hidden my-6">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product ID</th>
                <th className="py-3 px-6 text-left">Sender ID</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {acceptedRequests.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{item.productID}</td>
                  <td className="py-3 px-6 text-left">{item.senderID}</td>
                  <td className="py-3 px-6 text-left">{item.quantity}</td>
                  <td className="py-3 px-6 text-left">{item.status}</td>
                  {/* <td className="py-3 px-6 text-left">
                    <Button onClick={() => handleOrderDialog(item)} className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                      View Details
                    </Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  )
}

export default Notifications;
