import React from "react";
import styled from "styled-components";
import { COLOR } from "@src/theme";

const ErrorWrap = styled.h4`
  color: ${COLOR.errorDarkRed};
  background: ${COLOR.errorLightRed};
  font-weight: 600;
  font-size: 16px;
  padding: 10px 10px;
`;

const Error = ({ children }) => {
  return <ErrorWrap>{children}</ErrorWrap>;
};

export default Error;
