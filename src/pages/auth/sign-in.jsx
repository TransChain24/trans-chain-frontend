import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email";
    }
    if (!password.trim()) {
      errors.password = "Please enter your password";
    }
    if (!agreeTerms) {
      errors.agreeTerms = "Please agree to the Terms and Conditions";
    }
    return errors;
  };

  const handleSignIn = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const data = await axios.post("http://localhost:3000/common/auth/login", {
          emailID: email,
          password: password,
        });
        if (data.data.status === true) {
          navigate("/dashboard/home");
          localStorage.setItem("role", data.data.role);
          localStorage.setItem("id", data.data.id);
          console.log(data);
          console.log(localStorage.getItem("id"));
        } else {
          alert("Invalid email or password");
        }
      } catch (error) {
        console.log(error);
        alert("An error occurred while signing in");
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <section className="m-8 flex flex-1 items-center justify-center">
      <div className="w-full shadow-2xl rounded-[50px] pt-16 pb-16 lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Sign In
          </Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
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
              Password
            </Typography>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
              placeholder=""
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.password && <Typography variant="small" color="red">{errors.password}</Typography>}
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
          <Button onClick={handleSignIn} className="mt-6" fullWidth>
            Sign In
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
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

export default SignIn;
