import React from "react";
import { useContext } from "react";
import { Avatar, List } from "antd/dist/antd";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import { imageUrl } from "../../functions";
import Link from "next/link";

const People = ({ people, handleFollow, handleUnfollow }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      {/* <pre>{JSON.stringify(people, null, 10)}</pre> */}
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size={40} src={imageUrl(user)} />}
              title={
                <div className="d-flex justify-content-between">
                  <Link
                    className="text-decoration-none d-flex align-items-center text-dark"
                    href={`/user/${user.username}`}
                  >
                    {user.username}
                  </Link>
                  {state &&
                  state.user &&
                  state.user.following &&
                  state.user.following.includes(user._id) ? (
                    <span
                      onClick={() => handleUnfollow(user)}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Unfollow
                    </span>
                  ) : (
                    <span
                      onClick={() => handleFollow(user)}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Follow
                    </span>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default People;
