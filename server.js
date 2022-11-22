const path = require("path");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const https = require("https");
const fs = require("fs");
const { createRequestHandler } = require("@remix-run/express");
const { dirname } = require("path");

const BUILD_DIR = path.join(__dirname, "build");

const SECURITY_DIR = path.join(__dirname, "security");

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "1h" }));

app.use(morgan("tiny"));

app.all(
  "*",
  process.env.NODE_ENV === "development"
    ? (req, res, next) => {
        purgeRequireCache();

        return createRequestHandler({
          build: require(BUILD_DIR),
          mode: process.env.NODE_ENV,
        })(req, res, next);
      }
    : createRequestHandler({
        build: require(BUILD_DIR),
        mode: process.env.NODE_ENV,
      })
);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`HTTP server listening on port ${port}`);
});

const httpsOptions = {
  key: fs.readFileSync(`${SECURITY_DIR}/key.pem`),
  cert: fs.readFileSync(`${SECURITY_DIR}/cert.pem`),
};

https.createServer(httpsOptions, app).listen(443, () => {
  console.log("HTTPS server listening on port " + 443);
});

function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, but then you'll have to reconnect to databases/etc on each
  // change. We prefer the DX of this, so we've included it for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
