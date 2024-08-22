import React from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Avatar } from "antd/dist/antd";

const CreatePostForm = ({
  content,
  setContent,
  postSubmit,
  handleImage,
  image,
  uploading,
}) => {
  return (
    <div className="card shadow">
      <div className="card-body">
        <form className="form-group">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(e) => {
              setContent(e);
            }}
            className="form-control"
            placeholder="Select Bold, Italic or Underline for better text."
          />
        </form>
      </div>
      <div className="card-footer d-flex justify-content-between text-muted">
        <button
          className="btn btn-primary btn-sm"
          onClick={postSubmit}
          disabled={!content}
        >
          Post
        </button>
        <label>
          {image && image.url ? (
            <Avatar size={40} src={image.url} className="m-1" />
          ) : uploading ? (
            <div className="spinner-border text-primary" role="status"></div>
          ) : (
            <i className="btn bi bi-camera2 btn-lg p-1"></i>
          )}
          <input onChange={handleImage} type="file" accept="images/*" hidden />
        </label>
      </div>
    </div>
  );
};

export default CreatePostForm;
