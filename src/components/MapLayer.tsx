import React from "react";
import {Layer, Feature} from "react-mapbox-gl";
import {COLOR} from "@src/theme.ts";

interface MapLayerProps {
  layerType: string;
  array: any;
  qualityGroup: any;
  onClick: any;
}

const MapLayer = ({layerType, array, qualityGroup, onClick}: MapLayerProps) => {
  const color = () => {
    if (qualityGroup == "excellent") {
      return COLOR.excellent;
    } else if (qualityGroup == "good") {
      return COLOR.good;
    } else if (qualityGroup == "poor") {
      return COLOR.poor;
    } else return COLOR.unknown;
  };

  return (
    <Layer
      type={layerType}
      iconAllowOverlap={true}
      paint={{
        "circle-radius": 10,
        "circle-color": color(),
        "circle-opacity": 0.4,
      }}
    >
      {array.map((d, i) => {
        return (
          <Feature
            key={`map-feature-${i}`}
            onClick={e => {
              onClick(d);
            }}
            coordinates={[d.long, d.lat]}
          ></Feature>
        );
      })}
    </Layer>
  );
};

export default MapLayer;
