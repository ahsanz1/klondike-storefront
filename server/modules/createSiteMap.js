const path = require("path");
const glob = require("glob");
const fs = require("fs");
const axios = require("axios");

const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");
const algoliasearch = require("algoliasearch");

// console.log("KEYS -> ", process.env);
let ALGOLIA_CLIENT = null;
let INDEX = null;
if (process.env.NODE_ENV == "production") {
  require("dotenv").config({ path: "./client/.env.prod" });
} else if (process.env.NODE_ENV == "uat") {
  require("dotenv").config({ path: "./client/.env.uat" });
} else if (process.env.NODE_ENV == "qa") {
  require("dotenv").config({ path: "./client/.env.qa" });
} else {
  require("dotenv").config({ path: "./client/.env.dev" });
}
const search = async (page) => {
  try {
    let response = await INDEX.search("25th anniversary", {
      restrictSearchableAttributes: ["Category"],
      hitsPerPage: 100,
      page,
    });
    return response;
  } catch (err) {
    console.log("ALGOLIA SEARCH INDEX ERROR ->", err);
    return null;
  }
};
const GET_X_SITE_CONTEXT = () => {
  return JSON.stringify({
    date: new Date().toJSON(),
    channel: 12,
    account: process.env.REACT_APP_ACCOUNT,
    stage: process.env.REACT_APP_STAGE,
  });
};
const category = async () => {
  try {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_DOMAIN}/api-xpm/global-component/live`,
      headers: {
        "Content-Type": "application/json",
        "x-site-context": GET_X_SITE_CONTEXT(),
      },
    };

    let header_data = await axios(config);
    if (header_data.data) {
      if (header_data.data.length > 0) {
        let header = header_data.data.filter(
          (component) => component.id == "Header"
        );
        if (header && header.length > 0) {
          header = header[0];
          if (
            header && header.params && 
            header.params.inlineLinks &&
            header.params.inlineLinks.length > 0
          ) {
            // console.log("Header -> ", header?.params?.inlineLinks);
            let arrToSend = [];
            header.params.inlineLinks.map((link) => {
              arrToSend.push({
                url: `${link.url}`,
                changefreq: "daily",
                priority: 1,
              });
            });
            return arrToSend;
          } else {
            return [];
          }
        }
      }
    }
  } catch (error) {
    console.log("error -> ", error);

    return [];
  }
};
exports.createSiteMap = async (
  REACT_APP_ALGOLIA_APP_ID,
  REACT_APP_ALGOLIA_API_KEY,
  REACT_APP_ALGOLIA_SEARCH_INDEX
) => {
  try {
    ALGOLIA_CLIENT = algoliasearch(
      REACT_APP_ALGOLIA_APP_ID,
      REACT_APP_ALGOLIA_API_KEY
    );
    INDEX = ALGOLIA_CLIENT.initIndex(
      REACT_APP_ALGOLIA_SEARCH_INDEX
    );
    console.log("started sitemap");
    const root = path.resolve(__dirname, "../../client/public");
    console.log("started sitemap", root);
    let totalPages = -1;
    let arrayToMap = [];
    for (let index = 0; index != totalPages; index++) {
      let response = await search(index);
      // console.log("RESP -> ", response);
      totalPages = response.nbPages;
      response.hits &&
        response.hits.length > 0 &&
        response.hits.map((hit) => {
          arrayToMap.push({
            url: `/${hit.Category}/${hit.sku}`,
            changefreq: "daily",
            priority: 0.5,
          });
        });
    }
    // search(1).then(console.log);
    let arrayForTest = await category();
    arrayToMap = arrayToMap.concat(arrayForTest);
    const stream = new SitemapStream({ hostname: "https://juicycouture.com" });
    streamToPromise(Readable.from(arrayToMap).pipe(stream)).then((data) => {
      fs.writeFile("client/public/sitemap.xml", data.toString(), function (
        err
      ) {
        if (err) throw err;
      });
    });

    // console.log("ended sitemap");
  } catch (err) {
    // console.log(err);
  }
};
