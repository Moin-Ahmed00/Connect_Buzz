import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import axios from "axios";
import PostPublic from "../component/cards/PostPublic";
import Head from "next/head";
import Link from "next/link";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection: true,
});

const index = ({ posts }) => {
  const [state, setState] = useContext(UserContext);
  const [newsFeed, setNewsFeed] = useState([]);

  useEffect(() => {
    socket.on("new-post", (newPost) => {
      setNewsFeed([newPost, ...posts]);
    });
  }, []);

  const head = () => (
    <Head>
      <title>Connect Buzz - The ultimate social media platform.</title>
      <meta
        name="description"
        content="Connect with your friends and share your moments on Connect Buzz. The ultimate social media platform."
      />
      <meta
        property="og:description"
        content="Connect with your friends and share your moments on Connect Buzz. The ultimate social media platform."
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Connect Buzz" />
      <meta
        property="og:image:secure_url"
        content="https://www.connectbuzz.com/images/register.jpg"
      />
      <meta property="og:url" content="https://www.connectbuzz.com" />
    </Head>
  );

  const collection = newsFeed.length > 0 ? newsFeed : posts;

  return (
    <>
      {head()}
      <div className="homeCSS container-fluid">
        <h1 className="display-1 fw-bold text-center text-white pt-5">
          Connect Buzz
        </h1>
        <div className="row px-5 py-5">
          {collection &&
            collection.map((post) => (
              <div key={post._id} className="col-8 offset-2">
                <Link
                  className="text-decoration-none"
                  href={`/post/viewPost/${post._id}`}
                >
                  <PostPublic key={post._id} post={post} />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const { data } = await axios.get("/posts");
    // console.log(data);
    return {
      props: {
        posts: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        posts: [],
      },
    };
  }
}

export default index;