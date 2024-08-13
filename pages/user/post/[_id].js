import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import UserRoute from "../../../component/routes/UserRoute";
import CreatePostForm from "../../../component/forms/CreatePostForm";
import { toast } from "react-toastify";

const EditPost = () => {
  //Posts State
  const [post, setPost] = useState({});

  //State
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  //Router
  const router = useRouter();
  const _id = router.query._id;
  //   console.log(_id)

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
      setContent(data.content);
      setImage(data.image);
    } catch (error) {
      console.log(error);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/update-post/${_id}`, {
        content,
        image,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Post updated successfully");
        router.push("/user/dashboard");
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
      //   console.log("Uploaded Image =>", data)
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
    <UserRoute>
      <div className="container-fluid">
        <div className="row bg-default-image">
          <div className="col d-flex align-items-center">
            <h1 className="text-light">News Feed</h1>
          </div>
        </div>
        <div className="row py-5 d-flex">
          <div className="col-8 offset-2">
            <CreatePostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              image={image}
              uploading={uploading}
            />
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default EditPost;
