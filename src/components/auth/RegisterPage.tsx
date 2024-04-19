"use client";

import { Check, ChevronRight, LogIn, X } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const BACKEND_URI = "http://localhost:3000/api"

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

// const checkUppercase = (password: string) => {
//   for (const i of password) {
//     if (i === i.toUpperCase()) {
//       return true;
//     }
//   }
//   return false;
// };

// const checkLowercase = (password: string) => {
//   for (const i of password) {
//     if (i === i.toLowerCase()) {
//       return true;
//     }
//   }
//   return false;
// };

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

const RegisterPage = () => {
  const router = useRouter();

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const [registerForm, setRegisterForm] = useState(initialValues);

  const redirectToLoginPage = () => {
    router.push("/login");
  };

  const handleSubmit = () => {
    if (
      validateEmail(registerForm?.email) &&
      validatePassword(registerForm?.password)
    ) {
      submitForm();
    } else {
      console.log("Please enter a valid email or password");
    }
  };

  const submitForm = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/register`,
        registerForm
      );
      console.log("response : ", response);
      if (response?.status == 200 && response?.data.error === false) {
        router.push("/login");
        toast.success(response?.data?.message);
      } else {
        console.log(response?.data?.message);
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full space-y-10 bg-light px-10 py-10 rounded-xl">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold">Register Here</h2>
        <p className="px-5 text-sm text-gray-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure a alias
          rerum, aliquam consequuntur nostrum.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="w-full flex flex-col items-start gap-y-1">
          <label htmlFor="firstname" className="text-xs font-semibold">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            className="w-full border rounded-lg px-3 py-2.5 text-sm text-gray-600 focus:border-primary"
            value={registerForm.firstname}
            onChange={(e) => {
              setRegisterForm({ ...registerForm, firstname: e.target.value });
            }}
          />
        </div>
        <div className="w-full flex flex-col items-start gap-y-1">
          <label htmlFor="lastname" className="text-xs font-semibold">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            className="w-full border rounded-lg px-3 py-2.5 text-sm text-gray-600 focus:border-primary"
            value={registerForm.lastname}
            onChange={(e) => {
              setRegisterForm({ ...registerForm, lastname: e.target.value });
            }}
          />
        </div>
        <div className="col-span-2 w-full flex flex-col items-start gap-y-1">
          <label htmlFor="email" className="text-xs font-semibold">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="email"
            className="w-full border rounded-lg px-3 py-2.5 text-sm text-gray-600 focus:border-primary"
            value={registerForm.email}
            onChange={(e) => {
              setRegisterForm({ ...registerForm, email: e.target.value });
            }}
          />
          {registerForm.email != "" && !validateEmail(registerForm.email) && (
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
            value={registerForm.password}
            onChange={(e) => {
              setRegisterForm({ ...registerForm, password: e.target.value });
            }}
          />
          {registerForm.password != "" &&
            !validatePassword(registerForm.password) && (
              <div className="text-xs ml-1">
                <p className="flex items-center text-gray-400">
                  {checkLength(registerForm.password) ? (
                    <Check color="green" size={14} strokeWidth={3} />
                  ) : (
                    <X color="red" size={14} strokeWidth={3} />
                  )}
                  &nbsp;Length between 8 to 14
                </p>
                <p className="flex items-center text-gray-400">
                  {checkUppercase(registerForm.password) ? (
                    <Check color="green" size={14} strokeWidth={3} />
                  ) : (
                    <X color="red" size={14} strokeWidth={3} />
                  )}
                  &nbsp;At Least one upper case
                </p>
                <p className="flex items-center text-gray-400">
                  {checkLowercase(registerForm.password) ? (
                    <Check color="green" size={14} strokeWidth={3} />
                  ) : (
                    <X color="red" size={14} strokeWidth={3} />
                  )}
                  &nbsp;At Least one lower case
                </p>
                <p className="flex items-center text-gray-400">
                  {checkNumber(registerForm.password) ? (
                    <Check color="green" size={14} strokeWidth={3} />
                  ) : (
                    <X color="red" size={14} strokeWidth={3} />
                  )}
                  &nbsp;At Least one integer
                </p>
                <p className="flex items-center text-gray-400">
                  {checkSpecialCharacter(registerForm.password) ? (
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
        <button className="py-2 text-sm text-primary font-light flex items-center justify-center">
          Need Help?&nbsp;
          {/* <ChevronRight size={16} color="white" /> */}
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-full px-6 py-2.5 text-xs font-semibold bg-primary text-light flex items-center justify-center"
        >
          Register&nbsp;
          <LogIn size={14} color="white" />
        </button>
        <button
          className="py-2 text-sm font-light text-primary flex items-center justify-center"
          onClick={redirectToLoginPage}
        >
          Login&nbsp;
          <ChevronRight size={14} color="#f1b143" />
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
