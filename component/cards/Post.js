import { useContext } from "react";
import { UserContext } from "../../context";
import React from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import { useRouter } from "next/router";
import { imageUrl } from "../../functions";
import { Avatar } from "antd/dist/antd";
import Link from "next/link";

const Post = ({
  post,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  commentCount = 10,
  removeComment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  return (
    <>
      {post && post.postedBy && (
        <div className="shadow" key={post._id}>
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "100%" }}
          >
            <div className="card-header bg-transparent border-primary d-flex align-items-center col-12 gap-3 gap-sm-4">
              {/* <Avatar size={40}>{post.postedBy.name[0]}</Avatar> */}
              {<Avatar size={50} src={imageUrl(post.postedBy)} />}
              <div className="text-center">
                <span>{post.postedBy.name}</span>
              </div>
              <div className="text-center">
                <span>{moment(post.createdAt).fromNow()}</span>
              </div>
            </div>
            <div className="card-body">
              {post && post.content.length > 0
                ? renderHTML(post.content)
                : renderHTML("This Post Doesn't Have Content...")}
            </div>
            <div className="card-footer bg-transparent border-primary">
              <img
                className="w-100 h-100"
                src={post.image && post.image.url}
                alt={""}
              />
              <div className="row d-flex p-2">
                <div className="col-sm-6 col-12 p-0 d-flex justify-content-sm-start justify-content-evenly">
                  {state &&
                  state.user &&
                  post.likes &&
                  post.likes.includes(state.user._id) ? (
                    <i
                      onClick={() => {
                        handleUnlike(post._id);
                      }}
                      className="btn bi bi-heart-fill text-danger d-flex gap-md-2 gap-sm-1 gap-2 align-items-center"
                    >
                      {post.likes.length} Likes
                    </i>
                  ) : (
                    <i
                      onClick={() => {
                        handleLike(post._id);
                      }}
                      className="btn bi bi-heart d-flex gap-md-2 gap-sm-1 gap-2 align-items-center"
                    >
                      {post.likes.length} Likes
                    </i>
                  )}
                  <div className="d-flex">
                    <i
                      onClick={() => {
                        handleComment(post);
                      }}
                      className="btn bi bi-chat-text d-flex gap-md-2 gap-sm-1 gap-2 align-items-center text-danger"
                    >
                      {post.comments.length}
                    </i>
                    <Link
                      className="text-decoration-none text-danger d-flex align-items-center text-center"
                      href={`/post/${post._id}`}
                    >
                      Comments
                    </Link>
                  </div>
                </div>
                {state &&
                  state.user &&
                  state.user._id === post.postedBy._id && (
                    <div className="col-sm-6 col-12 p-0 d-flex justify-content-sm-end justify-content-evenly">
                      <i
                        onClick={() => router.push(`/user/post/${post._id}`)}
                        className="btn bi bi-pencil-fill text-danger d-flex gap-md-2 gap-sm-1 gap-2 align-items-center"
                      >
                        Edit Post
                      </i>
                      <i
                        onClick={() => handleDelete(post)}
                        className="btn bi bi-trash3-fill text-danger d-flex gap-md-2 gap-sm-1 gap-2 align-items-center"
                      >
                        Delete Post
                      </i>
                    </div>
                  )}
              </div>
              {/* {2 Comments for each post} */}
              {post.comments && post.comments.length > 0 && (
                <ol
                  className="list-group mb-3"
                  style={{ maxHeight: "155px", overflow: "scroll" }}
                >
                  {post.comments.slice(0, commentCount).map((c) => (
                    <li key={c._id} className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">
                            <Avatar
                              size={20}
                              className="mb-2 me-3"
                              src={imageUrl(c.postedBy)}
                            />
                            {c.postedBy.name}
                          </div>
                        </div>
                          <span className="d-flex align-items-center badge text-secondary">
                            {moment(c.created).fromNow()}
                            {state &&
                              state.user &&
                              state.user._id === c.postedBy._id && (
                                <div className="d-flex justify-content-center">
                                  <i
                                    onClick={() => removeComment(post._id, c)}
                                    className="btn bi bi-trash3-fill text-danger d-flex gap-2 align-items-center"
                                  />
                                </div>
                              )}
                          </span>
                      </div>
                      <div>{c.text}</div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
