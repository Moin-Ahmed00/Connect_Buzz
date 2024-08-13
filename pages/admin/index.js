import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import AdminRoute from "../../component/routes/AdminRoute";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import renderHTML from "react-render-html";

const Admin = () => {
  const [state, setState] = useContext(UserContext);

  // Posts
  const [posts, setPosts] = useState([]);

  //Router
  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
    }
  }, [state && state.token]);

  const newsFeed = async (req, res) => {
    try {
      const { data } = await axios.get(`/posts`);
      //   console.log("user Posts", data);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Do you wanna delete this post...");
      if (!answer) return;
      const { data } = await axios.delete(`/admin/delete-post/${post._id}`);
      toast.error("Post deleted successfully");
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  const imageURL = (post) => {
    if (post && post.image && post.image.url) {
      return post.image.url;
    } else {
      return "/images/ConnectBuzz.jpeg";
    }
  };

  return (
    <AdminRoute>
      <div className="container-fluid">
        <div className="row bg-default-image">
          <div className="col d-flex align-items-center">
            <h1 className="text-light">Admin</h1>
          </div>
        </div>
        <div className="row py-5">
          <div className="col-6 offset-3">
            {posts &&
              posts.map((post) => (
                // console.log(post)
                <div
                  className="d-flex justify-content-between p-4 my-4 shadow"
                  key={post._id}
                >
                  <div>
                    PostedBy<b> {post.postedBy.name}</b> <br/> <br/>
                    {renderHTML(post.content)}
                    <img
                      src={imageURL(post)}
                      alt="Post Image"
                      width="100%"
                      heigth="100%"
                    ></img>
                  </div>
                  <div>
                    <span>
                      <i
                        onClick={() => {
                          handleDelete(post);
                        }}
                        className="btn bi bi-trash text-danger"
                      ></i>
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default Admin;
