const express = require("express");
const path = require("path");
const app = express();
const unless = require("express-unless");
const fs = require("fs");
const getInitialPropsRouter = require("./server/getInitialProps.routes");
const port = process.env.PORT || 8080;
const router = express.Router();

// (function() {
if (process.env.NODE_ENV == "production") {
  require("dotenv").config({ path: "./client/.env.prod" });
} else if (process.env.NODE_ENV == "uat") {
  require("dotenv").config({ path: "./client/.env.uat" });
} else if (process.env.NODE_ENV == "qa") {
  require("dotenv").config({ path: "./client/.env.qa" });
} else {
  require("dotenv").config({ path: "./client/.env.dev" });
}

const URL = process.env.URL || "";
// etag for cache
const staticSettings = {
  etag: true,
};

const Static = express.static(
  path.join(__dirname, "client/dist"),
  staticSettings
);

Static.unless = unless;

app.use(
  Static.unless((req) => {
    return req.path === "/";
  })
);

// buildDescriptors();

app.use("/", getInitialPropsRouter);

// Accept any route
app.use(async function (metadata, req, res, next) {
  let indexFileContent = await new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, "client/dist", "index.html"),
      "utf-8",
      (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });

  // Save file content in cache so you do not have to do SSR on every request
  indexFileContent = indexFileContent.replace(/\$OG_TITLE/g, metadata.OG_TITLE);
  indexFileContent = indexFileContent.replace(
    /\$OG_DESCRIPTION/g,
    metadata.OG_DESCRIPTION
  );
  indexFileContent = indexFileContent.replace(/\$OG_IMAGE/g, metadata.OG_IMAGE);
  indexFileContent = indexFileContent.replace(
    /\$SD_INITIAL_PROPS/g,
    JSON.stringify(metadata)
  );

  indexFileContent = indexFileContent.replace(/\%PUBLIC_URL\%/g, URL);

  res.send(indexFileContent);
});
app.listen(port, function () {
  console.log(`🚀 Server running on env ->`, process.env.NODE_ENV);
  console.log(`🚀 Server running on port ${port}`);
});
