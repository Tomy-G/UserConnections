import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Users from "./components/Users";
import Connections from "./components/Connections";
import Stats from "./components/Stats";
import Axios from "axios";

const Home = styled.div`
  background-color: lightblue;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background-color: teal;
  border-radius: 10px;
  width: 70%;
  height: 80%;
  display: flex;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const App = () => {
  const [user, setUser] = useState("");

  const handleUser = (user) => {
    setUser(user);
  };

  //Reloads the user when a connection is added to him
  const reloadUsers = (id) => {
    setUser("");
    Axios.get("http://localhost:5000/api/user", {
      params: { id: id },
    }).then((response) => {
      setUser(response.data);
    });
  };

  return (
    <Home>
      <Container>
        <Users parentCallback={handleUser} rerender={user} />
        <Connections user={user} reloadUsers={reloadUsers} />
        <Stats />
      </Container>
    </Home>
  );
};

export default App;
