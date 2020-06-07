import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export const Button = ({ children, ...props }) => (
  <ButtonStyled {...props} >{children}</ButtonStyled>
);

const ButtonStyled = styled.button`
  background-color: ${({ backgroundColor }) => backgroundColor || "none"};
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  border: none;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  padding: 10px 20px;

  &:focus {
    outline: none;
  }
`;

Button.propTypes = {
  children: PropTypes.string.isRequired,
};