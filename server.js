const path = require("path");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const https = require("https");
const fs = require("fs");
const { createRequestHandler } = require("@remix-run/express");

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
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
