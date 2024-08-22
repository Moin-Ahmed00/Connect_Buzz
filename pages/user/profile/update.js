import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Avatar } from "antd/dist/antd";
import Link from "next/link";
import AuthForm from "../../../component/forms/AuthForm";
import { UserContext } from "../../../context";
import { useRouter } from "next/router";

const UpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  // Use Effect for grabing the logged in users details
  useEffect(() => {
    if (state && state.user) {
      // console.log(state.user)
      setUsername(state.user.username);
      setAbout(state.user.about);
      setName(state.user.name);
      setEmail(state.user.email);
      setImage(state.user.image);
    }
  }, [state && state.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(`/profile-update`, {
        username,
        about,
        name,
        email,
        password,
        secret,
        image,
      });
      // console.log("Updated data of the profile", data)
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // Update local storage, Update user, Keep token
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));
        // Set state
        setState({ ...state, user: data });
        setOk(true);
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    // console.log(...formData);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      // console.log("Uploaded Image =>", data)
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row bg-default-image">
        <div className="col d-flex align-items-center">
          <h1 className="text-light">Profile</h1>
        </div>
      </div>

      <div className="row shadow-lg py-5">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-12 shadow p-3">
          <label className="d-flex justify-content-center">
            {image && image.url ? (
              <Avatar size={55} src={image.url} className="m-1 shadow" />
            ) : uploading ? (
              <div className="spinner-border text-primary" role="status"></div>
            ) : (
              <i className="btn bi bi-camera2 h4 p-1"></i>
            )}
            <input
              onChange={handleImage}
              type="file"
              accept="images/*"
              hidden
            />
          </label>
          <AuthForm
            profileUpdate={true}
            handleSubmit={handleSubmit}
            username={username}
            setUsername={setUsername}
            about={about}
            setAbout={setAbout}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
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
            <p>Your Profile has been successfully Updated.</p>
            <Link href="/user/dashboard" className="btn btn-primary btn-sm">
              Dashboard
            </Link>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
