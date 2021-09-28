const { json } = require("express");
const express = require("express");
const axios = require("axios");
const { createSiteMap } = require("./modules");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const { OG, APP_TITLE } = require("./site-configs")

const DEFAULT_INITIAL_PARAMS = {
  ...OG
};

const GET_X_SITE_CONTEXT = () => {
  return JSON.stringify({
    date: new Date().toJSON(),
    channel: 12,
    account: process.env.REACT_APP_ACCOUNT,
    stage: process.env.REACT_APP_STAGE,
  });
};

router.get("/", async function (req, res, next) {
  const metatags = DEFAULT_INITIAL_PARAMS;
  next(metatags);
});

router.get("/category/:categoryName/:pid", async function (req, res, next) {
  console.log("request",req);
  let { pid } = req.params;
  console.log("request parms",req.params);
  let metatags = {
    ...DEFAULT_INITIAL_PARAMS,
  };
  try {
    var axios = require("axios");

    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_DOMAIN}/api-item/item/product/${pid}`,
      headers: {
        "x-site-context": GET_X_SITE_CONTEXT(),
      },
    };
    console.log("Axios call",config);
    let product_data = await axios(config);
    console.log("Axios call Result",product_data);
    if (product_data.data) {
      let product = null;
      if (product_data.data.product) {
        if (product_data.data.product.sku == pid) {
          product = product_data.data.product;
        } else {
          if (product_data.data.items && product_data.data.items.length > 0) {
            let product_filtered = product_data.data.items.filter(
              (item) => item.sku == pid
            );
            if (product_filtered && product_filtered.length > 0) {
              product = product_filtered[0];
            }
          }
        }
      }
      if (product) {
        product.attributes.map((attribute) => {
          if (attribute.name == "meta image") {
            metatags["OG_IMAGE"] =
              attribute.value && attribute.value != ""
                ? attribute.value
                : metatags["OG_IMAGE"];
          }
          if (attribute.name == "meta description") {
            metatags["OG_DESCRIPTION"] =
              attribute.value && attribute.value != ""
                ? attribute.value
                : metatags["OG_DESCRIPTION"];
          }
          if (attribute.name == "meta title") {
            metatags["OG_TITLE"] =
              attribute.value && attribute.value != ""
                ? attribute.value
                : metatags["OG_TITLE"];
          }
        });
      } else {
        metatags = {
          ...DEFAULT_INITIAL_PARAMS,
          OG_TITLE: `${APP_TITLE} | ${pid}`,
        };
      }
    }
  } catch (error) {
    console.log("error DATA -> ", error);
    metatags = {
      ...DEFAULT_INITIAL_PARAMS,
      OG_TITLE: `${APP_TITLE} | ${pid}`,
    };
  } finally {
    console.log("metatags DATA -> ", metatags);

    next(metatags);
  }
});

router.get("/category/:categoryName", async function (req, res, next) {
  console.log("request",req);
  let metatags = {
    ...DEFAULT_INITIAL_PARAMS,
    OG_TITLE: `${APP_TITLE} | Product metadata`,
  };
  try {
    let { categoryName } = req.params;
    console.log("request parms",req.params);
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_DOMAIN}/api-xpm/global-component/live`,
      headers: {
        "Content-Type": "application/json",
        "x-site-context": GET_X_SITE_CONTEXT(),
      },
    };
    console.log("Axios call",config);
    let header_data = await axios(config);
    console.log("Axios call Result",header_data);
    if (header_data.data) {
      if (header_data.data.length > 0) {
        let header = header_data.data.filter(
          (component) => component.id == "Header"
        );
        if (header && header.length > 0) {
          header = header[0];

          if (
            header.params.inlineLinks &&
            header.params.inlineLinks.length > 0
          ) {
            let inline_line = header.params.inlineLinks.filter(
              (link) => link.url == `/category/${categoryName}`
            );
            console.log("HEADR FILTER -> ", inline_line);
            if (inline_line && inline_line.length > 0) {
              metatags["OG_TITLE"] =
                inline_line[0].metaTitle && inline_line[0].metaTitle != ""
                  ? inline_line[0].metaTitle
                  : metatags["OG_TITLE"];
              metatags["OG_DESCRIPTION"] =
                inline_line[0].metaDescription &&
                inline_line[0].metaDescription != ""
                  ? inline_line[0].metaDescription
                  : metatags["OG_DESCRIPTION"];
            }
          }
        }
      }
    }
    console.log("metatags -> ", metatags);
  } catch (error) {
    console.log("error -> ", error);
    metatags = {
      ...DEFAULT_INITIAL_PARAMS,
      OG_TITLE: `${APP_TITLE} | Category metadata`,
    };
  } finally {
    next(metatags);
  }
});
router.get("/sitemap.xml", async function (req, res, next) {
  try {
    console.log("here");
    let indexFileContent = await new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "../client/public", "sitemap.xml"),
        "utf-8",
        (err, data) => {
          if (err) return reject(err);
          console.log("error",err);
          return resolve(data);
        }
      );
    });
    console.log(" call Result",indexFileContent);
    res.send(indexFileContent);
  } catch (err) {
    console.log(err);
    res.send("");
  }
});

router.get("/sitemapGenerate", async function (req, res, next) {
  try {
    console.log("here");
    createSiteMap(
      process.env.REACT_APP_ALGOLIA_APP_ID,
      process.env.REACT_APP_ALGOLIA_API_KEY,
      process.env.REACT_APP_ALGOLIA_SEARCH_INDEX
    );
    res.send("OK");
  } catch (err) {
    res.send("FAILED");
  }
});

router.get("*", async function (req, res, next) {
  console.log("Any params", req.params);
  const metatags = {
    ...DEFAULT_INITIAL_PARAMS,
  };
  console.log("metatags Result",metatags);
  next(metatags);
});

module.exports = router;
