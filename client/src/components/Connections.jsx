import { Avatar } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Axios from "axios";
import Modal from "react-modal";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import "../styles/loader.css";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ConnectionBar = styled.div`
  background-color: #003459;
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
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const ConnectionList = styled.div`
  background-color: #007ea7;
  flex: 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

const ConnectionInfo = styled.div`
  margin-top: 10px;
  min-height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const ConnectionName = styled.p`
  color: black;
  font-size: 20px;
  font-weight: 600;
  margin-left: 15px;
`;

const AddButton = styled.button`
  margin-right: 15px;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  font-weight:1000 ;
  background-color: white;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    backgroundColor: "#007ea7",
    width: "25vw",
    height: "25vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  overlay: { zIndex: 1000 },
};

Modal.setAppElement(document.getElementById("root"));

const Connections = ({ user, reloadUsers }) => {
  var nameList = [];
  const [names, setNames] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);

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
            setNames(nameList);
          });
        });
    nameList = [];
  }, [user]);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/users").then((response) => {
      setUserList(response.data);
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

  function newConnection(us) {
    const user2 = JSON.parse(us);
    if (user && !names.includes(user2.name)) {
      try {

           Axios.put(
            "http://localhost:5000/api/update-user?user1=" +
              user._id +
              "&user2=" +
              user2._id
          ).then((response) => {
            Axios.post("http://localhost:5000/api/add-connection", {
              user1: user._id,
              user2: user2._id,
            })
              .then(
                Axios.put(
                  "http://localhost:5000/api/update-user?user1=" +
                    user2._id +
                    "&user2=" +
                    user._id
                )
              )
              .then(reloadUsers(user._id));
          });
      } catch (error) {
        console.error(error.response);
      }
    }
    closeModal();
  }


  return (
    <Container>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 style={{marginBottom : "25px", fontSize:"35px"}}>Add Connection</h2>
        <form>
          <select
            defaultValue=""
            onChange={(event) => newConnection(event.target.value)}
          >
            <option value="" disabled selected>
              {" "}
              SELECT A USER TO CONNECT WITH
            </option>
            {userList.map((item) => {
              return (
                item.name != user.name && (
                  <option value={JSON.stringify(item)}>{item.name}</option>
                )
              );
            })}
          </select>
        </form>
      </Modal>
      <ConnectionBar>
      
        <ConnectionsHeader>
        <ConnectWithoutContactIcon style={{
              color: "white",
              fontSize: 30,
              marginRight: "5px",
            }}/>
          {!user ? "Select a user" : "Connections of " + user.name}
        </ConnectionsHeader>
        {user && <AddButton onClick={openModal}>ADD CONNECTION</AddButton>}
      </ConnectionBar>
      <ConnectionList style={{justifyContent: !user ? "center" : "start"}}>
        {!user ? (
          <div className="loader"></div>
        ) : (
          names.map((val, key) => {
            return (
              <ConnectionInfo>
                <ConnectionName>{val}</ConnectionName>
              </ConnectionInfo>
            );
          })
        )}
      </ConnectionList>
    </Container>
  );
};

export default Connections;
