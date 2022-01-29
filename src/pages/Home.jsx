import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState("");

  const handleChanged = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div>
      <h2>Home page!</h2>
      <div>Input username</div>
      <input value={username} onChange={handleChanged}></input>
      <Link to={`/users/${username}/repos`}>Submit</Link>
    </div>
  );
};

export default Home;
