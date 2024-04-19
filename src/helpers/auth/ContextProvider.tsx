// import { createContext, useState } from "react";
// export const AuthContext = createContext();

// export const ProvideAuth = ({ children }: any) => {
//   const getSession = () => {
//     return JSON.parse(localStorage.getItem("session") || "");
//   };

//   /**
//    * setToken from localstorage
//    */

//   const setSessionInLocalStorage = (token: any) => {
//     localStorage.setItem("session", JSON.stringify(token));
//     return true;
//   };

//   const auth = getSession();
//   const [session, setSession] = useState(auth || "");
//   const setAuth = (token: any) => {
//     setSession(token);
//     setSessionInLocalStorage(token);
//   };
//   const { user, token } = session;
//   return (
//     <AuthContext.Provider value={{ user, token, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import * as jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export const Authenticate = ({ children }: any) => {
  const getSession = () => {
    return JSON.parse(localStorage.getItem("session") || "");
  };

  const setSession = (token: any) => {
    localStorage.setItem("session", JSON.stringify(token));
    return true;
  };

  const validateUser = () => {
    try {
      const token = getSession();
      const decoded = jwt.verify(token, "us-harshwardhanmore");
      return decoded;
    } catch (ex: any) {
      if (ex.name === "TokenExpiredError") {
        console.log("Access denied. Token expired");
        //   return res.status(401).json({ message: "Access denied. Token expired." });
      } else if (ex.name === "JsonWebTokenError") {
        //   return res.status(401).json({ message: "Access denied. Invalid token." });

        console.log("Access denied. Token expired");
      } else {
        // return res.status(500).json({ message: "Internal server error." });

        console.log("Internal server error");
      }
    }
  };

  if (validateUser()) {
    redirect("/");
  } else {
    redirect("/login");
  }

  return <div>{children}</div>;
};
