const path = require("path");
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["images.unsplash.com", "join-here.s3.ap-northeast-2.amazonaws.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: '@import "styles/_mixins.scss"; @import "styles/_variables.scss";',
  },
};
