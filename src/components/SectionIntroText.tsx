import React from "react";
import styled from "styled-components";
import {COLOR} from "@src/theme";
import {TYPE_DESKTOP, TYPE_MOBILE} from "@src/theme";

const TextWrapper = styled.div`
  max-width: 100vw;
  background: ${COLOR.white};
`;

const Title = styled.h1`
  margin: 0 0 1.5rem 0;
  font-size: 38px;
  font-weight: 400;
  line-height: 1.2;

  @media only screen and (max-width: 600px) {
    font-size: 28px;
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled.p`
  font-size: ${TYPE_DESKTOP.p};
  line-height: 1.4;
  padding: 0 0 2rem 0;

  @media only screen and (max-width: 600px) {
    font-size: ${TYPE_MOBILE.p};
  }

  a {
    text-decoration: underline;
    color: black;
    :hover {
      opacity: 0.7;
    }
  }
`;

const SectionIntroText = () => {
  return (
    <TextWrapper>
      <Title>Where not to swim in the European Union</Title>
      <Subtitle>
        The EU Bathing Waters Directive requires member states to monitor its beaches and freshwater bathing sites for
        microbiological pollution.
        <br />
        <br />
        Bathing must be permanently prohibited, or permanent advice against bathing must be put in place at sites that
        have a 'poor' classification for 5 consecutive years. In 2018, this was the case for 57 bathing sites. Is it
        safe to swim in your local water?
        <br />
        <br />
        Data retrieved from the{" "}
        <a href="https://www.eea.europa.eu/data-and-maps/data/bathing-water-directive-status-of-bathing-water-11">
          European Environment Agency
        </a>{" "}
        in 2019. For more information, visit the{" "}
        <a href="https://www.eea.europa.eu/themes/water/europes-seas-and-coasts/assessments/state-of-bathing-water/bathing-water-directives">
          EU Bathing Waters Directive.
        </a>
      </Subtitle>
    </TextWrapper>
  );
};

export default SectionIntroText;
