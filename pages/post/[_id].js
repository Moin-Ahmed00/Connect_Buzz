import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import CommentForm from "../../component/forms/CommentForm";
import { Modal } from "antd/dist/antd";
import Post from "../../component/cards/Post";
import Link from "next/link";

const postComments = () => {
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const router = useRouter();
  const _id = router.query._id;

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
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
      fetchPost();
      toast.success("Comment deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (_id) => {
    try {
      const { data } = await axios.put("/like-post", { _id });
      // console.log("The liked post data from handleLike Function", data);
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async (_id) => {
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      // console.log("The unliked post data from the handleUnlike Function", data);
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = (post) => {
    setCurrentPost(post);
    setVisible(true);
    fetchPost();
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
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row bg-default-image">
        <div className="col d-flex align-items-center">
          <h1 className="text-light">Post</h1>
        </div>
      </div>
      <div className="container col-8 offset-2 mt-4">
        <Post
          post={post}
          commentCount={100}
          removeComment={removeComment}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
          handleComment={handleComment}
        />
      </div>
      <Link className="text-decoration-none" href="/user/dashboard">
        <i className="bi bi-arrow-return-left justify-content-center d-flex h3" />
      </Link>
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
  );
};

export default postComments;
