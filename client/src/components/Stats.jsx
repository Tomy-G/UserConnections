import React from 'react'
import styled from "styled-components";


const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StatsBar = styled.div`
  background-color: #22577a;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  z-index: 1;
  //flex: 1;
  min-height: 100px;
  display: flex;
  align-items: center;
`;

const StatsHeader = styled.h1`
  color: white;
  margin-left: 15px;
`;

const StatsList = styled.div`
  background-color: #38a3a5;
  flex: 9;
  display: flex;
  flex-direction: column;
`;


const Stats = () => {
  return (
    <Container>
        <StatsBar>
            <StatsHeader>
                Some Stats
            </StatsHeader>
        </StatsBar>
        <StatsList/>
    </Container>
  )
}

export default Stats