import React from "react";

const User = ({ size }) => {
  if (size == "small") {
    return (
      <span>
        {<img src="/user2.png" alt="" className="h-5 aspect-square" />}
      </span>
    );
  } else if (size == "medium") {
    return (
      <span>
        {<img src="/user2.png" alt="" className="h-10 aspect-square" />}
      </span>
    );
  } else if (size == "large") {
    return (
      <span>
        {<img src="/user2.png" alt="" className="h-14 aspect-square" />}
      </span>
    );
  }
};

export default User;
