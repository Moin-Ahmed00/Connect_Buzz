import { useContext, useState, useEffect } from "react";
import { Avatar, List } from "antd/dist/antd";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import Link from "next/link";

const Follower = () => {
  // User context state
  const [state, setState] = useContext(UserContext);
  const [people, setPeople] = useState([]);

  // Router
  const router = useRouter();

  // Use Effect to execute states
  useEffect(() => {
    if (state && state.token) {
      fetchFollowers();
    }
  }, [state && state.token]);

  const fetchFollowers = async () => {
    try {
      const { data } = await axios.get("/user-follower");
      //   console.log("The followers lsit of user", data);
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

  return (
    <div className="container col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-12 offset-0 my-5 py-3 shadow">
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
                  <span>
                    <b>{user.name}</b>
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

export default Follower;
