import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleChanged = (e) => {
    setUsername(e.target.value);
  };

  const checkSubmit = (e) => {
    // if press enter
    if (e.keyCode === 13) navigate(`/users/${username}/repos`);
  };

  return (
    <div onKeyDown={checkSubmit}>
      <h2>Home page!</h2>
      <div>Input username</div>
      <input value={username} onChange={handleChanged}></input>
      <Link to={`/users/${username}/repos`}>Submit</Link>
    </div>
  );
};

export default Home;
