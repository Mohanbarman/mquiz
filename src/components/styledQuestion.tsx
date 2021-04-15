import React from 'react';
import styled from 'styled-components';


const StyledContainer = styled.div`
`
const StyledQuestion = styled.div`
    padding: 20px;
    position: relative;
    border-radius: 10px;
`

type Props = {
    question: string;
    heading: string;
}

const QuestionItem: React.FC<Props> = ({question, heading}) => {
    return (
        <StyledContainer>
            <StyledQuestion>
                {question}
            </StyledQuestion>
        </StyledContainer>
    )
}

export default QuestionItem;