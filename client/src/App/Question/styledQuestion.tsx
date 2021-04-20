import React from "react";
import styled from "styled-components";
import { colors } from "../../shared/colors";
import { Body1, Body2 } from "../../shared/typography";

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 30px;
`;

const StyledQuestionBody = styled.div`
  padding: 30px 20px;
  width: 100%;
  border-radius: 10px;
  background-color: ${colors.light["1"]};
  border: 1px solid ${colors.primary["3"]};
`;

const StyledQuestionHeading = styled.div`
  padding: 10px 30px;
  border-radius: 10px;
  position: absolute;
  background-color: ${colors.light["1"]};
  border: 1px solid ${colors.primary["3"]};
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

type Props = {
  heading: string;
  body: string;
};

const StyledQuestion: React.FC<Props> = ({ heading, body }) => {
  return (
    <StyledContainer>
      <StyledQuestionHeading>
        <Body2 dangerouslySetInnerHTML={{__html: heading}}/>
      </StyledQuestionHeading>
      <StyledQuestionBody>
        <Body1 dangerouslySetInnerHTML={{__html: body}}/>
      </StyledQuestionBody>
    </StyledContainer>
  );
};

export default StyledQuestion;
