import { useContext, useState, useEffect } from "react";
import { Avatar, List } from "antd/dist/antd";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

const Following = () => {
  // User context state
  const [state, setState] = useContext(UserContext);
  const [people, setPeople] = useState([]);

  // Router
  const router = useRouter();

  // Use Effect to execute states
  useEffect(() => {
    if (state && state.token) {
      fetchFollowing();
    }
  }, [state && state.token]);

  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get("/user-following");
      // console.log("The following lsit of user", data);
      setPeople(data);
    } catch (error) {
      console.log(error);
    }
  };

  const imageUrl = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/avatar-1.png";
    }
  };

  const handleUnfollow = async (user) => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: user._id });
      console.log("User Unfollowed", data);
      // Set the updated information in the local storage
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      // Update context
      setState({ ...state, user: data });
      //Update people state
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      // Toast notification
      toast.error(`Unfollowed ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="row col-6 offset-3 my-5 py-3 shadow">
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size={40} src={imageUrl(user)} />}
              title={
                <div className="d-flex justify-content-between">
                  {user.username}
                  <span
                    onClick={() => handleUnfollow(user)}
                    className="btn text-danger"
                  >
                    Unfollow
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <Link className="text-decoration-none" href="/user/dashboard">
        <i className="bi bi-arrow-return-left justify-content-center d-flex h3" />
      </Link>
    </div>
  );
};

export default Following;
