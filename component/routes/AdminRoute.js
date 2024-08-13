import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../context";

const AdminRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const [state] = useContext(UserContext);

  useEffect(() => {
    if (state && state.token) getCurrentAdmin();
  }, [state && state.token]);

  const getCurrentAdmin = async () => {
    try {
      const { data } = await axios.get("/current-admin");
      if (data.ok) setOk(true);
    } catch (error) {
      router.push("/");
    }
  };

  process.browser &&
    state === null &&
    setTimeout(() => {
      getCurrentAdmin();
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

export default AdminRoute;
