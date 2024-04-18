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

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oName, setOName] = useState("");
  const [GSTIN, setGSTIN] = useState("");
  const [role, setRole] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!userName.trim()) {
      errors.userName = "Username is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }
    if (!oName.trim()) {
      errors.oName = "Organization name is required";
    }
    if (!GSTIN.trim()) {
      errors.GSTIN = "GSTIN is required";
    } else if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]\d{1}[A-Z]\d{1}$/.test(GSTIN)) {
      errors.GSTIN = "GSTIN is invalid";
    }
    if (!role) {
      errors.role = "Role is required";
    }
    if (!agreeTerms) {
      errors.agreeTerms = "Please agree to the terms and conditions";
    }
    return errors;
  };
  

  const register = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const data = await axios.post("http://localhost:3000/common/auth/register", {
          userName,
          emailID: email,
          password,
          organizationName: oName,
          GSTIN,
          role
        });

        if (data.data.status === true) {
          navigate("/auth/sign-in");
          localStorage.setItem("role", data.data.role);
          localStorage.setItem("id", data.data.id);
          console.log(data);
        } else {
          alert("Invalid Email or Password!!");
          console.log("error");
        }

        console.log(data);
      } catch (error) {
        console.log(error);
      }
      setUserName("");
    } else {
      setErrors(errors);
    }
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
              Username
            </Typography>
            <Input
              size="lg"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.userName && <Typography variant="small" color="red">{errors.userName}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email*
            </Typography>
            <Input
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@gmail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.email && <Typography variant="small" color="red">{errors.email}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password*
            </Typography>
            <Input
            type="password"
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.password && <Typography variant="small" color="red">{errors.password}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Organization name*
            </Typography>
            <Input
              size="lg"
              onChange={(e) => setOName(e.target.value)}
              placeholder="Organization Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.oName && <Typography variant="small" color="red">{errors.oName}</Typography>}
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
            {errors.GSTIN && <Typography variant="small" color="red">{errors.GSTIN}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Role
            </Typography>
            <Tabs value={role}>
              <TabsHeader>
                {/* <Tab value="manufacturer" onClick={() => setRole("manufacturer")}>
                  manufacturer
                </Tab> */}
                <Tab value="distributor" onClick={() => setRole("distributor")}>
                  distributor
                </Tab>
                <Tab value="retailer" onClick={() => setRole("retailer")}>
                  retailer
                </Tab>
              </TabsHeader>
            </Tabs>
            {errors.role && <Typography variant="small" color="red">{errors.role}</Typography>}
          </div>

          <Checkbox
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
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
          {errors.agreeTerms && <Typography variant="small" color="red">{errors.agreeTerms}</Typography>}
          <Button onClick={register} className="mt-6" fullWidth>
            Register Now
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign-in</Link>
          </Typography>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Are You A Customer?
            <Link to="/auth/CustomerPage" className="text-gray-900 ml-1">Customer</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
