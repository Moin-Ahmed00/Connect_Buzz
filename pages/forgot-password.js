import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd/dist/antd";
import Link from "next/link";
import ForgotPasswordForm from "../component/forms/ForgotPasswordForm";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const [state] = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/forgot-password`, {
        email,
        newPassword,
        secret,
      });

      if (data.success) {
        toast.success(data.success);
        router.push("/login");
        setLoading(false);
      }

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setEmail("");
        setNewPassword("");
        setSecret("");
        setOk(data.ok);
        setLoading(false);
      }
      // console.log("Response data of the forgot password from", data)
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    setOk(false);
  }, []);

  if (state && state.token) router.push("/login");
  return (
    <div className="container-fluid">
      <div className="row bg-default-image">
        <div className="col d-flex align-items-center">
          <h1 className="text-light">Forgot Password</h1>
        </div>
      </div>

      <div className="row shadow-lg py-5">
        <div className="col-6 offset-3 border shadow p-3">
          <ForgotPasswordForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Modal
            title="Congratulations"
            open={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>Your password has been successfully reset.</p>
            <Link href="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          </Modal>
        </div>
      </div>
      <div className="row py-3">
        <div className="col text-center">
          Already a user <Link href="/login">login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
