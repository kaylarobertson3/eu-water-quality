exports.onCreateWebpackConfig = ({actions, stage}) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-mapbox-gl/,
            use: ["null-loader"],
          },
        ],
      },
    });
  }
};
