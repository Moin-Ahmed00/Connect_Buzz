import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../component/routes/UserRoute";
import CreatePostForm from "../../component/forms/CreatePostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../component/cards/PostList";
import People from "../../component/cards/People";
import Link from "next/link";
import { Modal, Pagination } from "antd/dist/antd";
import CommentForm from "../../component/forms/CommentForm";
import Search from "../../component/Search";
import io from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKETIO,
  { path: "/socket.io" },
  {
    reconnection: true,
  }
);

const dashboard = () => {
  const [state, setState] = useContext(UserContext);

  // State
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  // Posts
  const [posts, setPosts] = useState([]);

  // People
  const [people, setPeople] = useState([]);

  //Comments
  const [comment, setComment] = useState("");

  // Comments modal visibility
  const [visible, setVisible] = useState(false);

  // Comments on which post
  const [currentPost, setCurrentPost] = useState({});

  // Getting the total numbers of post for pagination
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);

  //Router
  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
      findPeople();
    }
  }, [state && state.token, page]);

  useEffect(() => {
    if (state && state.token) {
      total();
    }
  }, [state && state.token, page]);

  const handlePageChange = (value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const total = async () => {
    try {
      const { data } = await axios.get("/total-posts");
      setTotalPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const newsFeed = async (req, res) => {
    try {
      const { data } = await axios.get(`/news-feed/${page}`);
      // console.log("user Posts", data);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const findPeople = async () => {
    try {
      const { data } = await axios.get("/find-people");
      // console.log("data of people from backend", data)
      setPeople(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("Post - ", content);
    try {
      const { data } = await axios.post("/create-post", { content, image });
      // console.log("Create post data", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        newsFeed();
        toast.success("Post created successfully");
        setContent("");
        setImage({});
        socket.emit("new-post", data);
      }
    } catch (error) {
      console.log(error);
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

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Do you wanna delete this post...");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post deleted successfully");
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (user) => {
    // console.log("This is the user that we want to follow", user)
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
      // console.log(data)
      // Saving the data in the local storage
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      // Set the state of the user context
      setState({ ...state, user: data });
      // Setting the people state based on the following
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      // Render the post in the news feed
      newsFeed();
      // Toast for successfully follow the people
      toast.success(`Following ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (_id) => {
    try {
      const { data } = await axios.put("/like-post", { _id });
      // console.log("The liked post data from handleLike Function", data);
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async (_id) => {
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      // console.log("The unliked post data from the handleUnlike Function", data);
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = (post) => {
    setCurrentPost(post);
    setVisible(true);
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/add-comment", {
        comment,
        postId: currentPost._id,
      });
      // console.log("Comment", data);
      setComment("");
      setVisible(false);
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  const removeComment = async (postId, comment) => {
    try {
      // console.log("remove Comment", postId, comment);
      const { data } = axios.put("/remove-comment", {
        comment,
        postId,
      });
      newsFeed();
      toast.success("Comment deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row bg-default-image">
          <div className="d-flex align-items-center">
            <h1 className="text-light">News Feed</h1>
          </div>
        </div>
        <div className="row py-5 d-flex">
          <div className="col-md-4 offset-md-0 col-sm-10 offset-sm-1 col-12 offset-0">
            <Search /> <br />
            {/* <pre>{JSON.stringify(people, null, 4)}</pre> */}
            <div className="d-flex justify-content-around w-100 pb-4">
              {state && state.user && state.user.followers && (
                <Link
                  className="text-decoration-none h5 text-primary"
                  href={"/user/followers"}
                >
                  {state.user.followers.length} Followers
                </Link>
              )}
              {state && state.user && state.user.following && (
                <Link
                  className="text-decoration-none h5 text-primary"
                  href={"/user/following"}
                >
                  {state.user.following.length} Following
                </Link>
              )}
            </div>
            <div className="d-none d-sm-block">
              <People people={people} handleFollow={handleFollow} />
            </div>
          </div>
          <div className="col-md-8 offset-md-0 col-sm-10 offset-sm-1 col-12 offset-0">
            {page < 2 && (
              <CreatePostForm
                content={content}
                setContent={setContent}
                postSubmit={postSubmit}
                handleImage={handleImage}
                image={image}
                uploading={uploading}
              />
            )}
            <br />
            <PostList
              posts={posts}
              handleDelete={handleDelete}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              handleComment={handleComment}
              removeComment={removeComment}
            />
            {/* {totalPosts} */}
            <Pagination
              current={page}
              onChange={handlePageChange}
              total={totalPosts}
              pageSize={3}
            />
          </div>
        </div>
        <Modal
          open={visible}
          onCancel={() => setVisible(false)}
          title="Comment"
          footer={null}
        >
          <CommentForm
            comment={comment}
            setComment={setComment}
            addComment={addComment}
          />
        </Modal>
      </div>
    </UserRoute>
  );
};

export default dashboard;
