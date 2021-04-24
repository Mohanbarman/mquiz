import React from "react";
import styled from "styled-components";
import { Label } from "./typography";

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

const StyledInput = styled.input`
  padding: 10px 20px;
  border: 2px solid #E3E3E8;
  padding: 10px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 400;
  background-color: #fbfbff;
  transition: all ease-in-out .2s;

  outline: none;

  :focus {
      border-color: #B4B3BE;
  }
`;

type Props = {
  label?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  error: string;
  placeholder: string;
};

const TextInput: React.FC<Props> = (props) => {
  return (
    <StyledInputContainer>
      <Label>Enter your name</Label>
      <StyledInput
        placeholder={props.placeholder}
        type="text"
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
      <p>{props.error}</p>
    </StyledInputContainer>
  );
};

export default TextInput;
