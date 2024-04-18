import React, { useState } from 'react';
import { Typography, Input, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function CustomerPage() {
  const [serialNumber, setSerialNumber] = useState('');
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      // if (window.location.hostname === 'localhost') {
      //   console.log("Event ignored due to environment being localhost");
      //   return;
      // }

      const response = await axios.post('http://localhost:3000/common/checkSerialNumber/checkSerialNumber', { serialNumber:serialNumber});
      console.log(response);
      const data = await response.data;
      if (data.status) {
        setResult(data.data);
        setError('');
      } else {
        setResult([]);
        setError(data.message);
      }
    } catch (error) {
      console.error('Error fetching serial number data:', error);
      setResult([]);
      setError('Internal Server Error. Please try again later.');
    }
  };

  return (
    <section className="m-8 flex flex-1 items-center justify-center">
      <div className="w-full shadow-2xl rounded-[50px] pt-16 pb-16 lg:w-3/5 mt-24 text-center">
        <div>
          <Typography variant="h2" className="font-bold mb-4">
            Enter Serial Number
          </Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            {/* <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Serial Number
            </Typography> */}
            <Input
              size="lg"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="Enter serial number"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button onClick={handleSubmit} className="mt-6" fullWidth>
            Submit
          </Button>
  
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            {error && <div className="text-red-500">{error}</div>}
            {result.length > 0 && (
              <table className="w-full min-w-[640px] table-auto bg-white shadow-md rounded-lg overflow-hidden my-6">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Role</th>
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Organization Name</th>
                    <th className="py-3 px-6 text-left">GSTIN</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {result.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{item.role}</td>
                      <td className="py-3 px-6 text-left">{item.ID}</td>
                      <td className="py-3 px-6 text-left">{item.OrganizationName}</td>
                      <td className="py-3 px-6 text-left">{item.GSTIN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Typography>
        </form>
      </div>
    </section>
  );  
}

export default CustomerPage;