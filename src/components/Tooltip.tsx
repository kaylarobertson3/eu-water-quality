import React from "react";

const Tooltip = ({tooltipData}) => {
  return (
    <div>
      {!tooltipData ? (
        <p>Hover over a circle for more information</p>
      ) : (
        <div>
          <p>
            Country: {tooltipData.country} | 10 year change: {tooltipData.percentChange} | 2008 quality:{" "}
            {tooltipData.value2008} | 2018 quality: {tooltipData.value2018}
          </p>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
