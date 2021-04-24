import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  tr:nth-child(even) {
    background-color: #eaeaea;
  }
  th,
  td {
    text-align: left;
    padding: 0 10px;
  }
`;

const StyledTh = styled.th`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: rgba(63, 61, 86, 0.67);
  padding-bottom: 10px;
`;

const StyledTd = styled.td`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 2.5rem;

  color: #3f3d56;
`;

const StyledHeader = styled.tr`
  border-bottom: 1px solid black;
`;

type Props = {
  headers: string[];
  body: (string | number)[][];
};

const Table: React.FC<Props> = (props) => {
  return (
    <StyledTable>
      <StyledHeader>
        {props.headers.map((i) => (
          <StyledTh>{i}</StyledTh>
        ))}
      </StyledHeader>
      {props.body.map((i) => (
        <tr>
          {i.map((j) => (
            <StyledTd>{j}</StyledTd>
          ))}
        </tr>
      ))}
    </StyledTable>
  );
};

export default Table;
