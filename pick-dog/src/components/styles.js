import styled, {keyframes} from 'styled-components';


export const GaleryContent = styled.div`
    width: 600px;
    margin: 16px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;
export const Img = styled.img`
    height: 240px;
    flex-basis: 50%;
    cursor: ${({selectable}) => (selectable ? 'pointer' : null)}
`;

export const Nav = styled.nav`
    display: flex;
    justify-content: center;
`;


const ring = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Loading = styled.div`
    display: inline-block;
    width: 40px;
    height: 40px;

    &::after {
        content: " ";
        display: block;
        width: 32px;
        height: 32px;
        margin: 4px;
        border-radius: 50%;
        border: 6px solid #fff;
        border-color: #cecece transparent #cecece transparent;
        animation: ${ring} 1.2s linear infinite;
    }
`;

export const ButtonContainer = styled(Nav).attrs(() => ({as: 'div'}))``;