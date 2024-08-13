import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../context";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const [state] = useContext(UserContext);

  useEffect(() => {
    if (state && state.token) getCurrentUser();
  }, [state && state.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/current-user");
      if (data.ok) setOk(true);
    } catch (error) {
      router.push("/login");
    }
  };

  process.browser &&
    state === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);

  return !ok ? (
    <div className="d-flex justify-content-center text-primary">
      <span
        className="spinner-border m-5 display-5"
        style={{ width: "6rem", height: "6rem" }}
      ></span>
    </div>
  ) : (
    <>{children}</>
  );
};

export default UserRoute;
