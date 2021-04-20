import styled, { css } from "styled-components";
import { colors } from "../../shared/colors";

type Props = {
  color: "green" | "red";
  checked?: boolean;
};

const StyledRadio = styled.div<Props>`
  width: 100%;

  label {
    width: 100%;
    display: flex;
    background-color: ${colors.light["1"]};
    border-radius: 10px;
    border: 1px solid ${colors.dark["4"]};
    padding: 10px 20px;
    cursor: pointer;
    transition: all ease-in-out 0.2s;
    gap: 20px;
    align-items: center;

    :before {
      content: "";
      height: 15px;
      width: 15px;
      border: 2px solid ${colors.dark["2"]};
      border-radius: 50%;
      display: inline-block;
      transition: all ease-in-out 0.2s;
    }
  }

  input {
    display: none;
  }

  input:checked + label {
    background-color: ${colors.primary["1"]};
    color: white;
  }

  ${(props) =>
    props.checked === true &&
    css`
      label {
        background-color: ${colors.green["3"]};
        color: ${colors.green["1"]};
        border: 1px solid ${colors.green["1"]};
        :before {
          border: 2px solid ${colors.green["1"]};
        }
      }
    `}

  ${(props) =>
    css`
      input:checked {
        + label {
          background-color: ${colors[props.color]["3"]};
          color: ${colors[props.color]["1"]};
          border: 1px solid ${colors[props.color]["1"]};
        }
        + label:before {
          border: 2px solid ${colors[props.color]["1"]};
        }
      }
    `}
`;

export default StyledRadio;
