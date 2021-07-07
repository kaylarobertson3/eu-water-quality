import styledBreakpoint from "@humblebee/styled-components-breakpoint";

export const COLOR = {
  black: "#000000",
  darkGray: "#636363",
  lightGray: "#c7c7c7",
  white: "#FFFFFF",
  excellent: "#58bf30",
  good: "#ffb027",
  poor: "#e3481d",
  unknown: "#858383",
  orange: "#fea34b",
  teal: "#12798d",
  errorDarkRed: "#c41414",
  errorLightRed: "#d3111123",
};

export const BREAKPOINT = styledBreakpoint({
  xxs: 0,
  xs: 320,
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
});

export const TYPE_MOBILE = {
  h1: "38px",
  h2: "30px",
  h3: "19px",
  h4: "16px",
  p: "16px",
};

export const TYPE_DESKTOP = {
  h1: "75px",
  h2: "57px",
  h3: "27px",
  h4: "19px",
  p: "19px",
};
