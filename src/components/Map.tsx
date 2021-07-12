import React from "react";
import styled from "styled-components";
import {Popup, ZoomControl, RotationControl} from "react-mapbox-gl";
import {QUALITY_LEVEL, getQualityText} from "@src/constant";
import MapLayer from "@src/components/MapLayer";
import {COLOR, BREAKPOINT} from "@src/theme";

const ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

let mapboxgl;
let ReactMapboxGl = {};

if (typeof window !== `undefined`) {
  mapboxgl = require("mapbox-gl");
  ReactMapboxGl = require("react-mapbox-gl");
} else {
  ReactMapboxGl.Map = () => {
    return class Mock extends React.Component {
      constructor() {
        super({});
      }
      render() {
        return <div />;
      }
    };
  };
}

const Mapbox = ReactMapboxGl.Map({
  accessToken: ACCESS_TOKEN,
  minZoom: 5,
  maxZoom: 14,
  scrollZoom: false,
});

const MapWrap = styled.div`
  height: 70vh;
  width: 100%;
  .mapboxgl-map {
    height: 70vh;
  }

  ${BREAKPOINT.m`
    height: 100vh;
    .mapboxgl-map {
      height: 100vh;
    }
  `}
`;

const PopupText = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin: 0.7rem 0;
  h4 {
    margin: 2px 0 15px 0;
    font-size: 16px;
    font-weight: 300;
  }
  p {
    margin: 2px 0;
    font-size: 14px;
    font-weight: 300;
  }
`;

const TooltipRating = styled.span`
  background: ${props => props.color};
  opacity: 0.4;
  padding: 3px 5px;
`;

const TooltipLink = styled.a`
  margin: 2px 0 0 0;
  text-decoration: none;
  color: black;
  font-size: 14px;
  font-weight: 300;
  color: ${COLOR.darkGray};
  border-bottom: 0.5px solid ${COLOR.darkGray};
  :hover {
    opacity: 0.7;
  }
`;

interface MapProps {
  centerLongLat: any;
  nearbyLakes: any;
}

interface MapState {
  popupOpen: boolean;
  popupData: any;
}

class MapContainer extends React.Component<MapProps, MapState> {
  constructor(props) {
    super(props);
    this.state = {popupOpen: false, popupData: null};
  }

  render() {
    const {nearbyLakes, centerLongLat} = this.props;
    const {popupOpen, popupData} = this.state;

    const qualityLevel2018 = {
      excellent: [],
      good: [],
      poor: [],
      notClassified: [],
      blank: [],
    };

    if (nearbyLakes) {
      nearbyLakes.map((d, i) => {
        if (d["2018"] == QUALITY_LEVEL.excellent) {
          qualityLevel2018.excellent.push(d);
        } else if (d["2018"] == QUALITY_LEVEL.good) {
          qualityLevel2018.good.push(d);
        } else if (d["2018"] == QUALITY_LEVEL.poor) {
          qualityLevel2018.poor.push(d);
        } else if (d["2018"] == QUALITY_LEVEL.notClassified) {
          qualityLevel2018.notClassified.push(d);
        } else qualityLevel2018.blank.push(d);
      });
    }

    const openPopup = d => {
      this.setState({popupOpen: true, popupData: d});
    };

    const closePopup = () => {
      this.setState({popupOpen: false});
    };

    const tooltipRecentYears = [2014, 2015, 2016, 2017, 2018];

    const getColor = quality => {
      if (quality == QUALITY_LEVEL.excellent) {
        return COLOR.excellent;
      } else if (quality == QUALITY_LEVEL.good) {
        return COLOR.good;
      } else if (quality == QUALITY_LEVEL.poor) {
        return COLOR.poor;
      } else return COLOR.unknown;
    };

    return (
      <MapWrap>
        <Mapbox
          onClick={() => (popupOpen ? closePopup() : null)}
          style="mapbox://styles/kaylarobertson3/cjzzrfj380atx1cqlc7zm920q?optimize=true"
          containerStyle={{
            height: "100%",
          }}
          center={centerLongLat}
          zoom={[8]}
        >
          <ZoomControl />
          <RotationControl />
          {nearbyLakes &&
            Object.keys(qualityLevel2018).map(function(key, index) {
              const qualityGroup = key;
              if (qualityLevel2018[key].length > 0) {
                return (
                  <MapLayer
                    key={`map-layer-${index}`}
                    qualityGroup={qualityGroup}
                    array={qualityLevel2018[key]}
                    layerType="circle"
                    onClick={openPopup}
                  />
                );
              }
            })}
          {popupOpen && popupData && (
            <Popup
              style={{padding: 0, minWidth: "100px", maxWidth: "200px"}}
              coordinates={[popupData.long, popupData.lat]}
            >
              {popupData && (
                <PopupText>
                  <h4 style={{textTransform: "capitalize"}}>{popupData["name"].toLowerCase()}</h4>
                  <p style={{marginBottom: "5px"}}>Recent water quality</p>
                  {tooltipRecentYears.reverse().map(year => {
                    return (
                      <p>
                        {year}:{" "}
                        <TooltipRating color={getColor(popupData[year])}>
                          {getQualityText(popupData[year])}
                        </TooltipRating>
                      </p>
                    );
                  })}
                  <TooltipLink href={popupData["url"]}>More information</TooltipLink>
                </PopupText>
              )}
            </Popup>
          )}
        </Mapbox>
      </MapWrap>
    );
  }
}

export default MapContainer;
