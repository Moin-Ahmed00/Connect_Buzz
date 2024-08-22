import axios from "axios";
import PostPublic from "../../../component/cards/PostPublic";
import Head from "next/head";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  try {
    const { data } = await axios.get(`/post/${ctx.params._id}`);
    // console.log(data);
    return {
      props: {
        post: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        post: [],
      },
    };
  }
}

const SinglePost = ({ post }) => {
  const head = () => (
    <Head>
      <title>Connect Buzz - The ultimate social media platform.</title>
      <meta name="description" content={post.content} />
      <meta
        property="og:description"
        content="Connect with your friends and share your moments on Connect Buzz. The ultimate social media platform."
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Connect Buzz" />
      <meta property="og:image:secure_url" content={imageUrl(post)} />
      <meta
        property="og:url"
        content={`https://www.connectbuzz.com/post/view/${post._id}`}
      />
    </Head>
  );

  const imageUrl = (post) => {
    if (post.image) {
      return post.image.url;
    } else {
      return "/images/user.png";
    }
  };

  return (
    <div>
      {head()}
      <div className="homeCSS container-fluid">
        <h1 className="display-1 fw-bold text-center text-white pt-5">
          Connect Buzz
        </h1>
        <div className="row d-flex justify-content-center align-items-center px-md-5 px-sm-3 py-md-5 py-sm-3">
          <div className="col-xl-8 offset-xl-2 col-md-10 offset-md-1 col-sm-12 shadow-lg">
            <PostPublic key={post._id} post={post} />
          </div>
          <Link className="text-decoration-none" href="/">
            <i className="bi bi-arrow-return-left justify-content-center d-flex h3 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
