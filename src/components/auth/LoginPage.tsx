"use client";

import { Check, ChevronRight, LogIn, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setToken } from "@/helpers/Auth";
import { useAuth } from "@/helpers/Authorize";
import { toast } from "react-hot-toast";

const BACKEND_URI = "http://localhost:9000/api";

const validateEmail = (email: string) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const validatePassword = (password: string) => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
  return re.test(password.toString());
};

function checkUppercase(password: string) {
  var pattern = /[A-Z]/; // This regex pattern matches any uppercase letter
  return pattern.test(password);
}

function checkLowercase(password: string) {
  var pattern = /[a-z]/; // This regex pattern matches any lowercase letter
  return pattern.test(password);
}

const checkNumber = (password: string) => {
  var pattern = /[0-9]/; // This regex pattern matches any digit between 0 and 9
  return pattern.test(password);
};
const checkSpecialCharacter = (password: string) => {
  var pattern = /[^a-zA-Z0-9\s]/; // This regex pattern matches any digit between 0 and 9
  return pattern.test(password);
};
const checkLength = (password: string) => {
  return password.length >= 8 && password.length <= 14;
};

const LoginPage = () => {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const [loginForm, setLoginForm] = useState(initialValues);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  const redirectToRegisterPage = () => {
    router.push("/register");
  };

  const handleSubmit = async () => {
    if (
      validateEmail(loginForm?.email) &&
      validatePassword(loginForm?.password)
    ) {
      await submitForm();
    } else {
      console.log("Please enter a valid email or password");
    }
  };

  const submitForm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/auth/login",
        loginForm
      );
      if (response.status == 200 && response?.data.error == false) {
        const token = response?.data?.data?.token;
        console.log(token);
        setToken(token); // Store token in local storage
        setIsAuthenticated(true);
        toast.success(response?.data?.message);
        router.push("/"); // Redirect to home page after successful login
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-10 bg-light px-5 sm:px-10 py-10 rounded-xl">
      <div className="text-center space-y-1">
        <div className="flex items-center gap-x-1 w-full justify-center">
          <img src="/appendix-star.png" alt="" className="h-8" />
          <h2 className="text-2xl font-semibold">Login Here</h2>
        </div>
        <p className="px-2.5 sm:px-5 text-xs sm:text-sm text-gray-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure a alias
          rerum, aliquam consequuntur nostrum.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="col-span-2 w-full flex flex-col items-start gap-y-1">
          <label htmlFor="email" className="text-xs font-semibold">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="email"
            className="w-full border rounded-lg px-3 py-2.5 text-sm text-gray-600 focus:border-primary"
            value={loginForm.email}
            onChange={(e) => {
              setLoginForm({ ...loginForm, email: e.target.value });
            }}
          />
          {loginForm.email != "" && !validateEmail(loginForm.email) && (
            <span className="text-red-500 text-xs ml-1">Invalid Email</span>
          )}
        </div>
        <div className="col-span-2 w-full flex flex-col items-start gap-y-1">
          <label htmlFor="password" className="text-xs font-semibold">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="password"
            className="w-full border rounded-lg px-3 py-2.5 text-sm text-gray-600 focus:border-primary"
            value={loginForm.password}
            onChange={(e) => {
              setLoginForm({ ...loginForm, password: e.target.value });
            }}
          />
          {loginForm.password != "" &&
            !validatePassword(loginForm.password) && (
              <div className="text-xs ml-1">
                <p className="flex items-center text-gray-400">
                  {checkLength(loginForm.password) ? (
                    <Check color="green" size={14} strokeWidth={3} />
                  ) : (
                    <X color="red" size={14} strokeWidth={3} />
                  )}
                  &nbsp;Length between 8 to 14
                </p>
                <p className="flex items-center text-gray-400">
                  {checkUppercase(loginForm.password) ? (
                    <Check color="green" size={14} strokeWidth={3} />
                  ) : (
                    <X color="red" size={14} strokeWidth={3} />
                  )}
                  &nbsp;At Least one upper case
                </p>
                <p className="flex items-center text-gray-400">
                  {checkLowercase(loginForm.password) ? (
                    <Check color="green" size={14} strokeWidth={3} />
                  ) : (
                    <X color="red" size={14} strokeWidth={3} />
                  )}
                  &nbsp;At Least one lower case
                </p>
                <p className="flex items-center text-gray-400">
                  {checkNumber(loginForm.password) ? (
                    <Check color="green" size={14} strokeWidth={3} />
                  ) : (
                    <X color="red" size={14} strokeWidth={3} />
                  )}
                  &nbsp;At Least one integer
                </p>
                <p className="flex items-center text-gray-400">
                  {checkSpecialCharacter(loginForm.password) ? (
                    <Check color="green" size={14} strokeWidth={3} />
                  ) : (
                    <X color="red" size={14} strokeWidth={3} />
                  )}
                  &nbsp;At Least one special character
                </p>
              </div>
            )}
        </div>
      </div>
      <div className="w-full flex justify-between items-center gap-y-1">
        <button className="py-2 text-xs sm:text-sm text-primary font-light flex items-center justify-center">
          Need Help?&nbsp;
          {/* <ChevronRight size={16} color="white" /> */}
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-full px-4 sm:px-6 py-2.5 text-xs font-semibold bg-primary text-light flex items-center justify-center"
        >
          Login&nbsp;
          <LogIn size={14} color="white" />
        </button>
        <button
          className="py-2 text-xs sm:text-sm font-light text-primary flex items-center justify-center"
          onClick={redirectToRegisterPage}
        >
          Register&nbsp;
          <ChevronRight size={14} color="#f1b143" />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
