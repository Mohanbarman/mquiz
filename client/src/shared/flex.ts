import styled, { css } from 'styled-components';

type FlexProps = {
    align?: string;
    justify?: string;
    gap?: string;
    direction?: string;
}

export const Flex = styled.div<FlexProps>`
    display: flex;
    flex-direction: column;

    ${(props: any) => props.align && css`align-items: ${props.align};`}
    ${(props: any) => props.justify && css`justify-content: ${props.justify};`}
    ${(props: any) => props.gap && css`gap: ${props.gap};`}
    ${(props: any) => props.direction && css`flex-direction: ${props.direction};`}
`