import React, {useState} from "react";
import styled from "styled-components";
import {COLOR, BREAKPOINT} from "@src/theme";
import axiosCall from "@src/utils/axiosCall";
import getNearbyLakes from "@src/utils/getNearbyLakes";
import SectionIntroText from "@components/SectionIntroText";
import Search from "@components/Search";
import MapContainer from "@components/Map";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {KEY_TEXT} from "@src/constant";

const API_KEY = process.env.API_KEY;
const BERLIN_COORDS = [13.405, 52.52];
const DEFAULT_DISTANCE_PARAM = 50;

const SectionOne = styled.section`
  display: flex;
  flex-direction: column;

  ${BREAKPOINT.m`
    flex-direction: row;
    height: 100vh;
  `};

  .MuiAccordion-root.Mui-expanded {
    margin: 0;
  }
`;

const FilterByCityWrap = styled.div`
  overflow: scroll;
  padding: 2rem 1rem 0 1rem;
  flex: 1 0 auto;
  z-index: 4;
  background: ${COLOR.white};
  max-width: 100vw;

  ${BREAKPOINT.m`
    width: 400px;
    padding: 2rem 2rem 0 2rem;
`}

  p {
    margin: 0;
  }
`;

const KeyRow = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0;
  p {
    padding-left: 0.5rem;
  }
`;

const StyledAccordion = styled(Accordion)`
  border-radius: 4px;

  .MuiAccordionDetails-root {
    display: flex;
    flex-direction: column;
    padding: 0 24px 24px 24px;

    p {
      font-size: 95%;
      line-height: 1.6;
    }
  }

  .Mui-expanded {
    margin: 0;
  }
`;

const AccordionTitle = styled.h4`
  font-weight: lighter;
  margin: 0;
  padding-left: 16px;
`;

const FilterByCity = () => {
  const [cityInputVal, setCityInputVal] = useState("");
  const [centerLongLat, setCenterLongLat] = useState([13.405, 52.52]);
  const [nearbyLakes, setNearbyLakes] = useState(null);
  const [counts2018, setCounts2018] = useState([]);
  const [errorMsg, setErrorMsg] = useState<string>(null);
  const [expandedPanel, setExpandedPanel] = useState<string>(null);

  const handleChange = (panel: string) => {
    setExpandedPanel(expandedPanel === panel ? null : panel);
  };

  const handleReset = e => {
    e.preventDefault();
    setCityInputVal("");
    setNearbyLakes(null);
    setCounts2018(null);
    setErrorMsg(null);
    setExpandedPanel(null);
    setCenterLongLat(BERLIN_COORDS);
  };

  function filterCity(cityInputVal) {
    const API_URL = `https://eu1.locationiq.com/v1/search.php?key=${API_KEY}&q=${cityInputVal}&format=json`;

    axiosCall(API_URL)
      .then(resp => {
        if (resp.status === 200 && resp.data[0].lat && resp.data[0].lon) {
          const longLat = [resp.data[0].lon, resp.data[0].lat];
          const nearbyLakes = getNearbyLakes(longLat, DEFAULT_DISTANCE_PARAM)[0];
          const counts2018 = getNearbyLakes(longLat, DEFAULT_DISTANCE_PARAM)[1];

          if (nearbyLakes.length >= 1) {
            setCenterLongLat(longLat);
            setNearbyLakes(nearbyLakes);
            setCounts2018(counts2018);
            setErrorMsg(null);
          } else {
            setErrorMsg(
              "Error: Please limit search to cities in the European Union. Tip: include city and country for more accurate results.",
            );
          }
        } else {
          setErrorMsg(`Error: city not found. Try again.`);
          setNearbyLakes(null);
          setCounts2018(null);
        }
      })
      .catch(error => {
        setNearbyLakes(null);
        setCounts2018(counts2018);
        setErrorMsg(`${error}`);
      });
  }

  return (
    <SectionOne>
      <FilterByCityWrap>
        <SectionIntroText />
        <Search
          handleChange={value => setCityInputVal(value)}
          cityInputVal={cityInputVal}
          handleSearch={value => filterCity(value)}
          errorMsg={errorMsg}
          handleReset={handleReset}
        />
        <StyledAccordion
          style={{marginBottom: "1rem"}}
          expanded={expandedPanel === "panel2"}
          onChange={() => handleChange("panel2")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
            <AccordionTitle>Key</AccordionTitle>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {KEY_TEXT.map((key, i) => {
                return (
                  <KeyRow key={`key-${i}`}>
                    <svg aria-hidden height="12px" width="12px">
                      <circle style={{opacity: 0.5}} r={6} cx="6" cy="6" fill={COLOR[key.value]}></circle>
                    </svg>
                    <p>{key.text}</p>
                  </KeyRow>
                );
              })}
            </div>
          </AccordionDetails>
        </StyledAccordion>
      </FilterByCityWrap>
      <MapContainer nearbyLakes={nearbyLakes} centerLongLat={centerLongLat} />
    </SectionOne>
  );
};

export default FilterByCity;
