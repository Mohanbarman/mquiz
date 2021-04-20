import styled from 'styled-components';
import { colors } from './colors';
import dropdownIcon from '../assets/icons/dropdown.svg';


export const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
`

export const Select = styled.select`
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 400;
    background-color: ${colors.light['1']};
    border: 2px solid ${colors.dark['4']};
    color: ${colors.dark['1']};
    outline: none;
    transition: all ease-in-out .2s;

    /* Remove default styling (arrow) */
    appearance: none;
    --webkit-appearance: none;
    --moz-appearance: none;

    background-image: url('${dropdownIcon}');
    background-repeat: no-repeat;
    background-position: right 10px top 50%;

    :hover, :focus {
        border: 2px solid ${colors.dark['3']};
    }
`