import * as jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode"; // import dependency

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

export const getSession = () => {
  const token = getToken();
  if (token) {
    try {
      // Decode the token
      // const decodedToken = jwt_decode(token);

      // const decodedToken = jwt.verify(token!, "us-harshwardhanmore");
      const decodedToken = jwtDecode(token);

      // Access user ID from the decoded token payload
      // const userId = decodedToken.user.id;

      // console.log("User ID : ", decodedToken);
      return decodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    console.error("Authentication token not found in local storage.");
  }
};

export const checkSessionExpired = () => {
  const token = getToken();
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);

      const sessionStartDate = new Date(decodedToken?.date);
      const currentTime = new Date();

      // Calculate the difference in milliseconds between the session start date and the current time
      const timeDifference = currentTime.getTime() - sessionStartDate.getTime();

      // Convert milliseconds to hours
      const hoursDifference = timeDifference / (1000 * 60 * 60);

      // If the difference is greater than 1 hour, return true indicating session expiration
      return hoursDifference > 1;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    console.error("Authentication token not found in local storage.");
  }
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};
