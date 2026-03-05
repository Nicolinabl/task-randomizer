import styled from "styled-components";
import { CheckboxEmpty } from "../icons/CheckboxEmpty";
import { CheckboxChecked } from "../icons/CheckboxChecked";

export const Checkbox = ({ checked, onChange }) => {
  return (
    <Label>
      <HiddenInput type="checkbox" checked={checked} onChange={onChange} />
      <StyledBox>{checked ? <CheckboxChecked /> : <CheckboxEmpty />}</StyledBox>
    </Label>
  );
};

const Label = styled.label`
  display: inline-flex;
  cursor: pointer;
  position: relative;
  align-items: center;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledBox = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease;

  ${Label}:hover & {
    transform: scale(1.1);
    border-radius: 4px;
    background-color: var(--light-purple);
  }

  &:active {
    transform: scale(0.85);
  }
`;
