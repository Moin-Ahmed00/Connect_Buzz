import { useContext } from "react";
import { UserContext } from "../../context";
import React from "react";
import { useRouter } from "next/router";
import Post from "../../component/cards/Post";

const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleComment={handleComment}
          />
        ))}
    </>
  );
};

export default PostList;
