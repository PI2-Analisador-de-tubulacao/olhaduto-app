import styled from 'styled-components';

export const NavButtonWrapper = styled.div`
  height: auto;
  margin-bottom: 24px;
`;

export const NavButtonDiv = styled.div`
  background-color: #c4c4c4;
  width: ${(props) => props.buttonRadius}px;
  height: ${(props) => props.buttonRadius}px;
  border-radius: ${(props) => props.buttonRadius / 2}px;
  position: relative;
`;

export const NavLabelDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c4c4c4;
  width: ${(props) => props.buttonRadius}px;
  height: 40px;
  border-radius: 20px;
  margin-bottom: 12px;
`;
