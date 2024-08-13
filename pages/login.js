import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import AuthForm from "../component/forms/AuthForm";
import { useRouter } from "next/router";
import { UserContext } from "../context";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [state, setState] = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // Update context
        setState({
          user: data.user,
          token: data.token,
        });
        // save in local storage
        window.localStorage.setItem("auth", JSON.stringify(data));
        router.push("/user/dashboard");
      }
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  if (state && state.token) router.push("/user/dashboard");
  return (
    <div className="container-fluid">
      <div className="row bg-default-image">
        <div className="col d-flex align-items-center">
          <h1 className="text-light">Login</h1>
        </div>
      </div>

      <div className="row shadow-lg py-5">
        <div className="col-6 offset-3 border shadow p-3">
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            page="login"
          />
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          Not Yet <Link href="/register">Registered</Link>
        </div>
        <div className="col text-center">
          <Link className="text-danger" href="/forgot-password">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default login;