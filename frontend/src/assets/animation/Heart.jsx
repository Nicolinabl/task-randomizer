import Lottie from "lottie-react";
import pixelHeart from "./pixelHeart.json" with { type: "json" };
import styled from "styled-components";

export const HeartAnimation = () => {
  return (
    <Div style={{ width: 42, height: 42 }}>
      <Lottie animationData={pixelHeart} loop={true} autoPlay={true} />
    </Div>
  );
};

const Div = styled.div`
  border-radius: 12px;
  overflow: hidden;
`;
