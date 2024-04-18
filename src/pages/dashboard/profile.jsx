import {
  Card,
  CardBody,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import axios from "axios";

export function Profile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL_AUTH = "http://localhost:3000/common/auth/"; 

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`${API_URL_AUTH}/profile?id=${id}`);
      console.log(response);
      return response.data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const id = localStorage.getItem("id"); 
        console.log(id);
        const result = await fetchData(id);
        console.log(result);
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Error fetching data');
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

  return (
    <Card className="mt-8 lg:mx-4 border border-blue-gray-100">
      <CardBody className="p-4">
        <div className="flex items-center gap-6">
          {/* <Avatar
            src="/img/bruce-mars.jpeg"
            alt="bruce-mars"
            size="xl"
            variant="rounded"
            className="rounded-lg shadow-lg shadow-blue-gray-500/40"
          /> */}
          <div>
            <Typography variant="h5" color="blue-gray" className="mb-1">
              {data.userName}
            </Typography>
            <Typography variant="small" className="font-small text-blue-gray-500 -mt-1 ml-1">
              {data.role}
            </Typography>
          </div>
        </div>
        <div className="gird-cols-1 mt-8 grid gap-4 lg:grid-cols-2">
          <div>
            <div className="flex justify-between items-center">
              <Typography variant="small" className="font-semibold text-blue-gray-500">
                Username:
              </Typography>
              {/* <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" /> */}
            </div>
            <Typography variant="small" className="text-blue-gray-600">
              {data.userName}
            </Typography>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <Typography variant="small" className="font-semibold text-blue-gray-500">
                Email:
              </Typography>
              {/* <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" /> */}
            </div>
            <Typography variant="small" className="text-blue-gray-600">
              {data.emailID}
            </Typography>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <Typography variant="small" className="font-semibold text-blue-gray-500">
                Role:
              </Typography>
              {/* <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" /> */}
            </div>
            <Typography variant="small" className="text-blue-gray-600">
              {data.role}
            </Typography>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <Typography variant="small" className="font-semibold text-blue-gray-500">
                Organization Name:
              </Typography>
              {/* <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" /> */}
            </div>
            <Typography variant="small" className="text-blue-gray-600">
              {data.organizationName}
            </Typography>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <Typography variant="small" className="font-semibold text-blue-gray-500">
                GST Number:
              </Typography>
              {/* <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" /> */}
            </div>
            <Typography variant="small" className="text-blue-gray-600">
              {data.GSTIN}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default Profile;
