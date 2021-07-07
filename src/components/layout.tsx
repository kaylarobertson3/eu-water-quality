import React from "react";
import "@src/app.css";
import styled from "styled-components";
import {COLOR, BREAKPOINT} from "@src/theme";

const Site = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  ${BREAKPOINT.m`
    padding: 2rem 2rem 1rem 2rem;
  `}
  a {
    color: ${COLOR.black};
  }
`;

const Text = styled.p`
  align-self: flex-start;
  font-size: 15px;
  margin: 0;
`;

const Layout = ({children}) => {
  return (
    <Site>
      <Main>{children}</Main>
      <Footer>
        <Text>
          Kayla Robertson | Created during the academy program at <a href="http://sapera.com/">Sapera</a>
        </Text>
      </Footer>
    </Site>
  );
};

export default Layout;
