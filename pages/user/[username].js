import { useContext, useState, useEffect } from "react";
import { Avatar } from "antd/dist/antd";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import moment from "moment";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

const Username = () => {
  // User context state
  const [state, setState] = useContext(UserContext);
  const [user, setUser] = useState({});

  // Router
  const router = useRouter();

  // Use Effect to execute states
  useEffect(() => {
    if (router.query.username) {
      fetchUser();
    }
  }, [router.query.username]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.username}`);
      // console.log("The following lsit of user", data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const imageUrl = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/avatar.png";
    }
  };

  return (
    <div className="container-fluid d-flex pt-5 justify-content-center">
      <div className="col-md-8 offset-md-2 p-3">
        <div className="card shadow col-md-8 offset-md-2" style={{ width: "40rem" }}>
          <img src={imageUrl(user)} className="card-img-top" alt={user.name} />
          <div className="card-body">
            <h5 className="card-title text-center">{user.name}</h5>
            <p className="card-text text-center">{user.about}</p>
            <p className="text-end text-secondary">
              Joined {moment(user.createdAt).fromNow()}
            </p>
          </div>
          <div className="card-footer bg-transparent border-primary justify-content-between d-flex">
            <span className="btn btn-sm">
              {user.followers && user.followers.length} Followers
            </span>
            <span className="btn btn-sm">
              {user.following && user.following.length} Following
            </span>
          </div>
        </div>
          <Link className="text-decoration-none" href="/user/dashboard">
            <i className="bi bi-arrow-return-left justify-content-center d-flex h3 mt-4" />
          </Link>
      </div>
    </div>
  );
};

export default Username;
