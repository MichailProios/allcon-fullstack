import { createServer } from "https";
import { readFileSync } from "fs";
const path = require("path");
const { createApp } = require("@remix-run/serve");
const { serverBuildDirectory } = require("./remix.config");

const buildPath = path.resolve(process.cwd(), serverBuildDirectory);

const app = createApp(buildPath);
const port = process.env.PORT;

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Remix App Server started at port ${port}`);
});

const httpsOptions = {
  key: readFileSync(`${process.cwd()}/security/key.pem`),
  cert: readFileSync(`${process.cwd()}/security/cert.pem`),
};

// ...
createServer(httpsOptions, app).listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
