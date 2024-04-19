import React, { useState, useEffect } from 'react';
import { Typography, Input, Button } from '@material-tailwind/react';
import { Link, Navigate } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'

export function Otp() {
  const [OTP, setOTP] = useState('');
  const [result, setResult] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state.data;
  console.log(data);
  const sendOtpFunction = async () => {
    try {
        const otpSent = await axios.get(`http://localhost:3000/common/otp/sendOtp/${data.email}`);
        console.log(otpSent);
        if(otpSent != "Otp error.."){
            setResult(true);
        }
    } catch (error) {
        console.error('Error while sending otp:', error);
        setError(error.message || 'Error while sending otp');
    }
};
  useEffect(() => {
    
    sendOtpFunction();
  },[]);

  const handleSubmit = async () => {
    try {
      if(result){
        const otpNo = await axios.get(`http://localhost:3000/common/otp/verifyOtp/${data.email}/${OTP}`);
        console.log(otpNo);
        if (otpNo.data.status == true){
          try {
              const data2 = await axios.post("http://localhost:3000/common/auth/register", {
                  userName: data.userName,
                  emailID: data.email,
                  password: data.password,
                  organizationName: data.oName,
                  GSTIN: data.GSTIN,
                  role: data.role
              });
              if (data2.data.status === true) {
                  navigate("/auth/sign-in");
                  localStorage.setItem("role", data2.data.role);
                  localStorage.setItem("id", data2.data.id);
                  console.log(data2);
                  console.log(localStorage.getItem("id"));
                } else {
                  alert("Invalid email or password");
                }
          } catch (error) {
              console.log(error);
          }
        }else{
          console.log("Otp unverified..");
        }
      }
    }catch (error) {
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
            Enter OTP
          </Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            {/* <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Serial Number
            </Typography> */}
            <Input
              size="lg"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="Enter One Time Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button onClick={handleSubmit} className="mt-6" fullWidth>
            Submit
          </Button>
  
          {/* <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
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
          </Typography> */}
        </form>
      </div>
    </section>
  );  
}

export default Otp;