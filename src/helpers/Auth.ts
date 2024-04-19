import * as jwt from "jsonwebtoken";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token: any) => {
  localStorage.setItem("token", token);
};

export const validateUser = () => {
  try {
    const token = getToken();
    const decoded = jwt.verify(token!, "us-harshwardhanmore");
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

export const deleteToken = () => {
  localStorage.removeItem("token");
};
