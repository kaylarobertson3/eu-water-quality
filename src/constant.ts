export const QUALITY_LEVEL = {
  excellent: "4",
  good: "3",
  poor: "2",
  notClassified: "1",
  blank: "0",
};

export const KEY_TEXT = [
  {
    value: "excellent",
    text: "excellent quality",
  },
  {
    value: "good",
    text: "good or sufficient quality",
  },
  {
    value: "poor",
    text: "poor quality",
  },
  {
    value: "unknown",
    text: "no data / unclassified",
  },
];

export const getQualityText = param => {
  switch (param) {
    case 4:
      return "Excellent";
    case 3:
      return "Good or sufficient";
    case 2:
      return "Poor";
    case 1:
      return "Not Classified";
    default:
      return "No Data";
  }
};
