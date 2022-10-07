import { Avatar } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Axios from "axios";
import Modal from "react-modal";
import "../styles/loader.css"

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
  justify-content: space-between;
`;

const ConnectionsHeader = styled.h1`
  color: white;
  margin-left: 15px;
`;

const ConnectionList = styled.div`
  background-color: #80ed99;
  flex: 9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ConnectionInfo = styled.div`
  min-height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const ConnectionName = styled.p`
  color: black;
  font-size: 20px;
  font-weight: 400;
  margin-left: 15px;
`;

const AddButton = styled.button`
  margin-right: 15px;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: { zIndex: 1000 },
};

Modal.setAppElement(document.getElementById("root"));

const Connections = ({ user }) => {
  var nameList = [];
  const [names, setNames] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  let subtitle;

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setNames([]);

    user.connections == [] || !user.connections
      ? (nameList = [])
      : user.connections.map((ele) => {
          Axios.get("http://localhost:5000/api/user", {
            params: { id: ele },
          }).then((response) => {
            nameList = [...nameList, response.data.name];
            console.log("sellena" + nameList);
            setNames(nameList);
          });
        });
    nameList = [];
  }, [user]);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/users").then((response) => {
      setUserList(response.data);
      console.log(response.data);
    });
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  console.log(userList);

  return (
    <Container>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <button onClick={closeModal}>close</button> */}
        <form>
          <select defaultValue="">
            <option value="" disabled selected>
              {" "}
              SELECT A USER TO CONNECT WITH
            </option>
            {userList.map((item) => {
              return (
                item.name != user.name && (
                  <option value={item.name}>{item.name}</option>
                )
              );
            })}
          </select>
        </form>
      </Modal>
      <ConnectionBar>
        <ConnectionsHeader>
          {!user ? "Select a user" : "Connections of " + user.name}
        </ConnectionsHeader>
        {user && <AddButton onClick={openModal}>ADD CONNECTION</AddButton>}
      </ConnectionBar>
      <ConnectionList>
        { !user ? <div className="loader"></div> :
        
        names.map((val, key) => {
          return (
            <ConnectionInfo>
              <ConnectionName>{val}</ConnectionName>
            </ConnectionInfo>
          );
        })}
      </ConnectionList>
    </Container>
  );
};

export default Connections;
