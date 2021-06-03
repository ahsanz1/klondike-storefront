const { buildDescriptors } = require("./combineDescriptors");
const { createSiteMap } = require("./createSiteMap");
const { upload } = require("./uploadAWS");

module.exports = {
  buildDescriptors,
  createSiteMap,
  upload,
};
