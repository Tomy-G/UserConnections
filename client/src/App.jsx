import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Users from "./components/Users"
import Connections from "./components/Connections"
import Stats from "./components/Stats"

const Home = styled.div`
  background-color: lightblue;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  //border: 1px solid black;
  background-color: teal;
  border-radius: 10px;
  width: 70%;
  height: 80%;
  display: flex;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const App = () => {
  const [userId, setUserId] = useState("");

  const handleUser = (user) => {
    setUserId(user);
  };

  return (
    <Home>
      <Container>
        <Users parentCallback={handleUser} />
        <Connections user={userId} />
        <Stats/>
      </Container>
    </Home>
  );
};

export default App;