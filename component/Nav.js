import { useContext } from "react";
import { UserContext } from "../context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };
  return (
    <nav className="nav bg-primary justify-content-around">
      <Link
        className={`nav-link text-white ${current === "/" && "active"}`}
        href="/"
      >
        Home
      </Link>
      {state !== null ? (
        <>
          <div className="dropdown">
            <button
              className="btn text-white dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {state && state.user && state.user.name}
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link
                  className={`text-dark nav-link ${
                    current === "/user/dashboard" && "active"
                  }`}
                  href="/user/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className={`text-dark nav-link ${
                    current === "/user/profile/update" && "active"
                  }`}
                  href="/user/profile/update"
                >
                  Profile
                </Link>
              </li>
              {state && state.user && state.user.role === "Admin" && (
                <li>
                  <Link
                    className={`text-dark nav-link ${current === "/admin" && "active"}`}
                    href="/admin"
                  >
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <Link onClick={logout} className="text-dark nav-link" href="/login">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <Link
            className={`nav-link text-light ${
              current === "/login" && "active"
            }`}
            href="/login"
          >
            Login
          </Link>
          <Link
            className={`nav-link text-light ${
              current === "/register" && "active"
            }`}
            href="/register"
          >
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
