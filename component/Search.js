import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../context";
import axios from "axios";
import People from "../component/cards/People";
import { toast } from "react-toastify";

const Search = () => {
  const [state, setState] = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const searchUser = async (e) => {
    e.preventDefault();
    // console.log(`Search ${query} from the db`);
    try {
      const { data } = await axios.get(`/search-user/${query}`);
      //   console.log("User search response from the db", data);
      if (data.length === 0) {
        toast.error("No user Found");
      } else {
        setResult(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (user) => {
    // console.log("This is the user that we want to follow", user)
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
      //   console.log(data)
      // Saving the data in the local storage
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      // Set the state of the user context
      setState({ ...state, user: data });
      // Setting the people state based on the following
      let filtered = result.filter((p) => p._id !== user._id);
      setResult(filtered);
      // Toast for successfully follow the people
      toast.success(`Following ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async (user) => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: user._id });
      // Set the updated information in the local storage
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      // Update context
      setState({ ...state, user: data });
      //Update people state
      let filtered = result.filter((p) => p._id !== user._id);
      setResult(filtered);
      // Toast notification
      toast.error(`Unfollowed ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid w-100">
        <form
          className="d-flex justify-content-around"
          role="search"
          onSubmit={searchUser}
        >
          <input
            className="form-control me-2"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value), setResult([]);
            }}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-secondary" type="submit">
            Search
          </button>
        </form>
      </div>
      {result &&
        result.map((r) => (
          <People
            key={r._id}
            people={result}
            handleFollow={handleFollow}
            handleUnfollow={handleUnfollow}
          />
        ))}
    </>
  );
};

export default Search;
