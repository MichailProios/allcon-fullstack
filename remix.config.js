/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  serverDependenciesToBundle: [
    // "@formkit/auto-animate",
    // "@formkit/auto-animate/react",
    "swiper",
    "swiper/react",
    "ssr-window",
    "dom7",
  ],
};
