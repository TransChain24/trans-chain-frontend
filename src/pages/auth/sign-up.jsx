import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";


export function SignUp() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [oName, setOName] = useState();
  const [GSTIN, setGSTIN] = useState();
  const [role, setRole] = useState();

  const register = async () => {
    try {
      const data = await axios.post("http://localhost:3000/common/auth/register", {
        userName: userName,
        emailID: email,
        password: password,
        organizationName: oName,
        GSTIN: GSTIN,
        role: role
      });

      if (data.data.status == true) {
        navigate("/dashborad/home");
        navigate("/dashboard/home",{state:{role:data.data.role}});
        localStorage.setItem("role",data.data.role);
        localStorage.setItem("id",data.data._id);
        console.log(data);
      } else {
        console.log("error");
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setUserName('');
  }

  return (
    <section className="m-8 flex flex-1 items-center justify-center">
      <div className="w-full shadow-2xl rounded-[50px] lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-2">Register here</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-3">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Username*
            </Typography>
            <Input
              size="lg"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="username"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email*
            </Typography>
            <Input
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password*
            </Typography>
            <Input
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Organization name*
            </Typography>
            <Input
              size="lg"
              onChange={(e) => setOName(e.target.value)}
              placeholder="organization name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              GSTIN*
            </Typography>
            <Input
              size="lg"
              onChange={(e) => setGSTIN(e.target.value)}
              placeholder="GSTIN"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Role*
            </Typography>
            <Tabs value="app">
              <TabsHeader>
                <Tab value="manufacturer" onClick={() => setRole("manufacturer")}>
                  {/* <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" /> */}
                  manufacturer
                </Tab>
                <Tab value="distributor" onClick={() => setRole("distributor")}>
                  {/* <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" /> */}
                  distributor
                </Tab>
                <Tab value="retailer" onClick={() => { setRole("retailer") }}>
                  {/* <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" /> */}
                  retailer
                </Tab>
              </TabsHeader>
            </Tabs>
          </div>

          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button onClick={register} className="mt-6" fullWidth>
            Register Now
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign-in</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;