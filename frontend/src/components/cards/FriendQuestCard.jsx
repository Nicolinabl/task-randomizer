import styled from "styled-components";
import { useState, useEffect } from "react";

export const FriendQuestCard = () => {
  return (
    <MainWrapper>
      <h4>Friends name</h4>
      <div>Friends avatar</div>
      <div>
        <p>Friends quest</p>
        <p>Category</p>
        <p>TimeNeeded</p>
        <p>DoneAt Date</p>
      </div>{" "}
      <div>
        <div>Kudos: N</div>
        <div>Give kudos</div>
      </div>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  margin: 4px;
  padding: 12px 12px;
  border-radius: 12px;
`;
