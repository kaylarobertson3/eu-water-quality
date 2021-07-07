import * as data from "@src/data/compiled-data.json";
export default (longLat, queryDistance) => {
  const matchingLakes = [];
  const counts2018Arr = [];

  data.default.forEach(d => {
    const distanceFromInputCity = calcDistance(d.lat, d.long, longLat[1], longLat[0]);
    if (distanceFromInputCity <= Number(queryDistance)) {
      matchingLakes.push(d);
      counts2018Arr.push(d["2018"]);
    }
  });

  let counts2018 = {};
  counts2018Arr.forEach(el => (counts2018[el] = 1 + (counts2018[el] || 0)));
  return [matchingLakes, counts2018];
};

function calcDistance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
