import styled from "styled-components";
import { useEffect, useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { MemeOfTheDay } from "../components/MemeDaily";

export const Rewards = () => {
  //check if quest is checked as done
  //navigate from "get quest of the day" to "reward"
  //fetch random meme from api
  //prevent fetching new meme on refresh

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <PageWrapper>
      <ButtonClose onClick={handleClick}>X</ButtonClose>
      <h2>You are on fire today</h2>
      <p>Keep it up and don't forget to smile!</p>
      <MemeOfTheDay />
      <ButtonReward onClick={handleClick}>Back home</ButtonReward>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const ButtonClose = styled.button`
  padding: 4px;
  border: none;
  background-color: transparent;
  width: 44px;
  height: 44px;
  margin-top: 24px;

  font-size: 16px;
  font-weight: 400;
  color: var(--main-text-color);

  align-self: flex-end;

  &:hover {
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transform: scale(1.05);
    background-color: var(--light-purple);
  }

  &:active {
    border-radius: 12px;
    transform: scale(0.85);
    background-color: var(--accent-purple);
  }
`;

const ButtonReward = styled.button`
  display: inline-flex;
  height: 44px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  background-color: transparent;

  border-radius: 12px;
  border: 1px solid var(--medium-purple);

  /* Small shadow */
  box-shadow: 0 2px 2px 0 #dbdbdb;

  &:hover {
    font-weight: 500;
    background-color: var(--light-purple);
    transform: scale(1.05);
    transition: ease-in-out;
  }

  &:active {
    border: 1px solid var(--dark-purple);
    background-color: var(--accent-purple);
    transform: scale(0.85);
  }
`;

//Fetch a random meme from api
//Show it to user in the questOftheDay after it is checked DONE
//button Close
//Button hahaha

// TODO: Put content here + set up route
