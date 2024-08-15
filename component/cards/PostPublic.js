import { useContext, useEffect } from "react";
import { UserContext } from "../../context";
import React from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import { useRouter } from "next/router";
import { imageUrl } from "../../functions";
import { Avatar } from "antd/dist/antd";

const PostPublic = ({ post, commentCount = 10 }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  useEffect(()=>{
    post && post.postedBy
  },[post && post.postedBy])

  return (
    <div>
      {post && post.postedBy && (
        <div key={post._id}>
          <div
            className="card border-success mb-3"
            style={{ maxWidth: "100%" }}
          >
            <div className="card-header bg-transparent border-success d-flex align-items-center">
              {/* <Avatar size={40}>{post.postedBy.name[0]}</Avatar> */}
              {<Avatar size={55} src={imageUrl(post.postedBy)} />}
              <span className="m-3">{post.postedBy.name}</span>
              <span>{moment(post.createdAt).fromNow()}</span>
            </div>
            <div className="card-body text-success">
              {renderHTML(post.content)}
            </div>
            <div className="card-footer bg-transparent border-success">
              <img
                className="w-100 h-100"
                src={post.image && post.image.url}
                alt={""}
              />
              <div className="row d-flex p-2">
                <div className="col-6 p-0 d-flex gap-3">
                  {state &&
                  state.user &&
                  post.likes &&
                  post.likes.includes(state.user._id) ? (
                    <i className="bi bi-heart-fill text-danger d-flex gap-2 align-items-center">
                      {post.likes.length} Like
                    </i>
                  ) : (
                    <i className="bi bi-heart d-flex gap-2 align-items-center">
                      {post.likes.length} Like
                    </i>
                  )}
                  <i className="bi bi-chat-text d-flex gap-2 align-items-center">
                    {post.comments.length} Comment
                  </i>
                </div>
              </div>
              {/* {2 Comments for each post} */}
              {post.comments && post.comments.length > 0 && (
                <ol
                  className="list-group mb-3"
                  style={{ maxHeight: "155px", overflow: "scroll" }}
                >
                  {post.comments.slice(0, commentCount).map((c) => (
                    <li
                      key={c._id}
                      className="list-group-item d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">
                          <Avatar
                            size={20}
                            className="mb-2 me-3"
                            src={imageUrl(c.postedBy)}
                          />
                          {c.postedBy.name}
                        </div>
                        {c.text}
                      </div>
                      <span className="badge text-secondary rounded-pill">
                        {moment(c.created).fromNow()}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPublic;
