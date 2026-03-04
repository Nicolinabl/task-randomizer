//DiceBear open API for generating random mood-states avatars
import { createAvatar } from "@dicebear/core";
import { avataaarsNeutral } from "@dicebear/collection";

import { useEffect, useState, useMemo } from "react";

import styled from "styled-components";
import { useUserStore } from "../stores/useUserStore";
import { apiUrl } from "../../api";

export const Avatar = () => {
  const { user } = useUserStore();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!user?.accessToken) return;

    const fetchStreak = async () => {
      try {
        const response = await fetch(`${apiUrl}/streaks`, {
          headers: { Authorization: user.accessToken },
        });
        const data = await response.json();
        if (response.ok && data.success) setStreak(data.response);
      } catch (err) {
        console.error("Error fetching streak:", err);
      }
    };
    fetchStreak();
  }, [user?.accessToken]);

  const streakNumber = Number(streak) || 0;

  const avatarUrl = useMemo(() => {
    let moodVar = {};

    if (streakNumber === 0) {
      // return avatarRandom = sad
      moodVar = {
        eyebrows: [
          "angry",
          "angryNatural",
          "frownNatural",
          "sadConcerned",
          "sadConcernedNatural",
          "unibrowNatural",
          "upDown",
          "upDownNatural",
        ],
        eyes: [
          "closed",
          "cry",
          "eyeRoll",
          "side",
          "squint",
          "surprised",
          "xDizzy",
        ],
        mouth: [
          "concerned",
          "disbelief",
          "grimace",
          "sad",
          "screamOpen",
          "serious",
          "vomit",
        ],
      };
    } else if (streakNumber >= 1 && streakNumber <= 10) {
      //return avatarRandom = smiley
      moodVar = {
        eyebrows: [
          "unibrowNatural",
          "upDown",
          "upDownNatural",
          "flatNatural",
          "default",
          "defaultNatural",
        ],
        eyes: ["closed", "default", "winkWacky", "wink"],
        mouth: ["default", "twinkle"],
      };
    } else if (streakNumber > 10 && streakNumber < 100) {
      //return avatarRandom = happy
      moodVar = {
        eyebrows: [
          "unibrowNatural",
          "upDown",
          "upDownNatural",
          "flatNatural",
          "defaultNatural",
          "angry",
          "default",
          "raisedExcited",
          "raisedExcitedNatural",
        ],
        eyes: ["winkWacky", "wink", "happy", "squint", "surprised"],
        mouth: ["eating", "smile", "tongue"],
      };
    } else if (streakNumber >= 100) {
      //return avatarRandom = super happy
      moodVar = {
        eyebrows: [
          "upDownNatural",
          "frownNatural",
          "raisedExcited",
          "raisedExcitedNatural",
          "sadConcerned",
          "sadConcernedNatural",
          "unibrowNatural",
          "upDown",
        ],
        eyes: ["hearts", "eyeRoll"],
        mouth: ["eating", "smile", "tongue"],
      };
    } else {
      moodVar = {
        eyebrows: ["raisedExcited"],
        eyes: ["xDizzy"],
        mouth: ["serious"],
      };
    }
    //console.log(typeof streakNumber);

    const avatar = createAvatar(avataaarsNeutral, {
      seed: crypto.randomUUID(), //Math.random().toString(), //instead of Math.random() to ensure there are no problem when a lot of avatars generated at the same time, for scalability
      backgroundColor: [
        "f8d25c",
        "fd9841",
        "b6e3f4",
        "c0aede",
        "d1d4f9",
        "ffd5dc",
      ],
      randomizeIds: true, // - used for randomizing multiple avatars on the same page, needed at friends feed page
      ...moodVar,
    });

    return avatar.toDataUri();
  }, [streakNumber]);

  return (
    <AvatarWrapper>
      <AvatarImg src={avatarUrl} alt="Mood avatar depending on streak length" />
    </AvatarWrapper>
  );
};

// --------- Styles --------

const AvatarWrapper = styled.div`
  text-align: center;
  justify-content: center;
`;

const AvatarImg = styled.img`
  min-width: 128px;
  max-width: 30%;
  height: auto;
`;
