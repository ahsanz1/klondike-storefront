const { upload } = require("./server/modules");

if (process.env.NODE_ENV == "production") {
  require("dotenv").config({ path: "./client/.env.prod" });
} else if (process.env.NODE_ENV == "uat") {
  require("dotenv").config({ path: "./client/.env.uat" });
} else if (process.env.NODE_ENV == "qa") {
  require("dotenv").config({ path: "./client/.env.qa" });
} else {
  require("dotenv").config({ path: "./client/.env.dev" });
}

upload();
