import { LibraryQuestCard } from "./cards/LibraryQuestCard";
import { useEffect, useState } from "react";
import { useQuestStore } from "../stores/useQuestStore";
import styled from "styled-components";
//import questLibrary from "../library.json";
import HeartIcon from "../icons/HeartIcon";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export const QuestLibrary = () => {
  const { fetchLibraryQuests, libraryQuests, duplicateQuest, createQuest } =
    useQuestStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchLibraryQuests();
  }, []);

  const handleAdd = async (quest) => {
    const result = await duplicateQuest(quest);

    if (result?.success) {
      toast.success("Quest is added to your list!");
    }
    if (result?.error) {
      toast.error(result?.error || "Oops, couldn't add quest to your list");
    }
  };

  return (
    <Container>
      <HeadingContainer>
        <HeartIcon />
        <h2>Add from quest library:</h2>
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "Hide" : "Show"}
        </Button>
      </HeadingContainer>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {libraryQuests.map((quest) => (
              <LibraryQuestCard
                key={quest._id}
                id={quest._id}
                message={quest.message}
                timeNeeded={quest.timeNeeded}
                category={quest.category}
                onAdd={() => handleAdd(quest._id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px 0;
  align-items: center;
  width: 100%;
`;

const HeadingContainer = styled.div`
  display: flex;
  height: 64px;
  padding: 0 16px;
  gap: 8px;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 8px;
  width: 100%;
  align-self: stretch;
  border-radius: 12px;
  background: var(--main-white);
  justify-content: space-between;
`;

const Button = styled.button`
  display: inline-flex;
  height: 44px;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid #6d48fe;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background-color: var(--main-white);

  /* Small shadow */
  box-shadow: 0 1px 1px 0 #dbdbdb;

  &:hover {
    background: var(--light-purple);
  }

  &:active {
    background: var(--accent-purple);
  }
`;
