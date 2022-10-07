import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BarChartIcon from "@mui/icons-material/BarChart";
import Axios from "axios";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StatsBar = styled.div`
  background-color: #00171f;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  z-index: 1;
  //flex: 1;
  min-height: 100px;
  display: flex;
  align-items: center;
`;

const StatsHeader = styled.h1`
  color: white;
  margin-left: 5px;
`;

const StatsList = styled.div`
  background-color: #003459;
  flex: 9;
  display: flex;
  flex-direction: column;
`;

const StatData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  margin-bottom: 30px;
  margin-top: 15px;
  margin-left: 15px;

`;

const StatTitle = styled.h2`
  color: #00a8e8;
`;

const Stat = styled.h2`
  color: white;
  font-size: 12px;
`;

const Stats = () => {


  const [oldestUser1, setOldestUser1] = useState("");
  const [oldestUser2, setOldestUser2] = useState("");

  const [newestUser1, setNewestUser1] = useState("");
  const [newestUser2, setNewestUser2] = useState("");

  const [less, setLess] = useState("");

  const [more, setMore] = useState("");

  useEffect(() => {
    try {
      Axios.get("http://localhost:5000/api/oldest").then((res) => {
        setOldestUser1(res.data[0].user1);
        setOldestUser2(res.data[0].user2);

      });
      Axios.get("http://localhost:5000/api/newest").then((res) => {

        setNewestUser1(res.data[0].user1);
        setNewestUser2(res.data[0].user2);

      });
      Axios.get("http://localhost:5000/api/lessconnections").then((res) => {
        setLess(res.data[0].name);
        
      });
      Axios.get("http://localhost:5000/api/moreconnections").then((res) => {
        setMore(res.data[0].name);
        
      });
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <Container>
      <StatsBar>
        <BarChartIcon
          style={{
            color: "white",
            fontSize: 30,
            marginLeft: "15px",
          }}
        />
        <StatsHeader>Some Stats</StatsHeader>
      </StatsBar>
      <StatsList>
        <StatData>
          <StatTitle>Oldest Connection:</StatTitle>
          <Stat>User1:{oldestUser1} User2:{oldestUser2}</Stat>
        </StatData>
        <StatData>
          <StatTitle>Newest Connection:</StatTitle>
          <Stat>User1:{newestUser1} User2:{newestUser2}</Stat>
        </StatData>
        <StatData>
          <StatTitle>More Connections:</StatTitle>
          <Stat>{more}</Stat>
        </StatData>
      </StatsList>
    </Container>
  );
};

export default Stats;
