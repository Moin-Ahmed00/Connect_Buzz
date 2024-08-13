import { UserProvider} from "../context/index"
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../component/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Nav />
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </UserProvider>
  );
}
export default MyApp;
