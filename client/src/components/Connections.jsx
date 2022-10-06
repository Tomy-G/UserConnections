import React from 'react'
import styled from "styled-components";
//import "../styles/loader.css"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ConnectionBar = styled.div`
  background-color: #38a3a5;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  z-index: 1;
  //flex: 1;
  min-height: 100px;
  display: flex;
  align-items: center;
`;

const ConnectionsHeader = styled.h1`
  color: white;
  margin-left: 15px;
`;

const ConnectionList = styled.div`
  background-color: #80ED99;
  flex: 9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Connections = () => {
  return (
    <Container>
        <ConnectionBar>
            <ConnectionsHeader>
                Select a user
            </ConnectionsHeader>
        </ConnectionBar>
        <ConnectionList>
            <div className='loader'></div>
        </ConnectionList>
    </Container>
  )
}

export default Connections