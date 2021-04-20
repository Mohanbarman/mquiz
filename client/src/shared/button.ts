import styled, { css } from 'styled-components';
import { colors } from './colors';

type ButtonProps = {
    width?: string;
    variant?: "outlined" | "contained";
}

const Button = styled.button<ButtonProps>`
    font-family: 'poppins';
    font-weight: 500;
    color: white;
    text-transform: uppercase;
    padding: 10px 30px;
    background-color: ${colors.primary['1']};
    cursor: pointer;
    text-align: center;
    border-radius: 10px;
    transition: all ease-in-out .2s;
    border: 2px solid ${colors.primary['2']};

    :hover {
        background-color: ${colors.primary['2']};
        transform: scale(.95);
    }

    ${(props) => props.width && css`width: ${props.width}`};
    ${(props) => props.variant === "outlined" && css`
        background-color: white;
        color: ${colors.primary['1']};
        border: 2px solid ${colors.primary['1']};
        :hover {
            background-color: white;
        }
    `}
`

export default Button;