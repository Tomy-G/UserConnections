import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import Axios from "axios";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const UserBar = styled.div`
  background-color: #22577a;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  z-index: 1;
  //flex: 1;
  min-height: 100px;
  display: flex;
  align-items: center;
`;

const UserHeader = styled.h1`
  color: white;
  margin-left: 5px;
`;

const SearchBar = styled.div`
  min-height: 80px;
  background-color: #38a3a5;
  display: flex;
  align-items: center;
`;

const SearchText = styled.h2`
  color: white;
  margin-left: 25px;
  font-weight: 400;
`;

const SearchIconBlock = styled.div`
  background-color: #80ed99;
  margin-left: 15px;
  display: flex;
  align-items: center;
  border-radius: 5px;
`;

const SearchBox = styled.input`
  margin-left: 15px;
  padding: 10px;
  border: none;
  border-left: 1px solid black;
  outline: none;
  font-weight: 500;
`;

const UserList = styled.div`
  background-color: #38a3a5;
  flex: 9;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const UserInfo = styled.div`
  min-height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: #22577a;
    //transform: scale(1.1);
  }
`;

const UserName = styled.p`
  color: white;
  font-size: 20px;
  font-weight: 300;
  margin-left: 15px;
`;

const Users = (props) => {
  const [userList, setUserList] = useState([]);
  const [searchText, setSearchText] = useState("a");

  useEffect(() => {
    console.log("SE ESTA EJECUTANDOo");
    Axios.get("http://localhost:5000/api/users").then((response) => {
      setUserList(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <Container>
      <UserBar>
        <PersonIcon
          style={{ color: "white", fontSize: 30, marginLeft: "15px" }}
        />
        <UserHeader>User List</UserHeader>
      </UserBar>
      <SearchBar>
        <SearchText>Find a user</SearchText>
        <SearchIconBlock>
          <SearchIcon
            style={{
              color: "black",
              marginLeft: "10px",
            }}
          />
          <SearchBox
            // type="text"
            onChange={(event) => {
              setSearchText(event.target.value.toLowerCase());
            }}
          />
        </SearchIconBlock>
      </SearchBar>
      <UserList>
        {Object.prototype.toString.call(userList) ===
          "[object Array]" &&
          userList.map((val, key) => {
            return (
              <UserInfo
              
              onClick={event => props.parentCallback(val)}
              
              >
                <Avatar
                  style={{
                    color: "black",
                    marginLeft: "15px",
                    backgroundColor: "#80ED99",
                  }}
                >
                  {Array.from(val.name)[0]}
                </Avatar>
                <UserName>{val.name}</UserName>
              </UserInfo>
            );
          })}
      </UserList>
    </Container>
  );
};

export default Users;
