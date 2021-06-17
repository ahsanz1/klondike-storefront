const fs = require("fs");
const path = require("path");
const compressing = require("compressing");
/**
 * Explores recursively a directory and returns all the filepaths and folderpaths in the callback.
 *
 * @see http://stackoverflow.com/a/5827895/4241030
 * @param {String} dir
 * @param {Function} done
 */
function filewalker(dir, done) {
  let results = [];

  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          //   results.push(file);
          filewalker(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);

          if (!--pending) done(null, results);
        }
      });
    });
  });
}

filewalker("./client/dist", function (err, data) {
  if (err) {
    throw err;
  }
  data.forEach((row) => {
    let ext = path.extname(row);
    if (ext) {
      let file_name = String(row).replace(`${ext}`, `.gz${ext}`);
      compressing.gzip
        .compressFile(row, file_name)
        .then(() => {
          const html = fs.readFileSync(
            path.resolve(__dirname, "client/dist/index.html"),
            "utf8"
          );
          let newhtml = html.split('chunk.css"').join('chunk.gz.css"');
          newhtml = newhtml.split('chunk.js"').join('chunk.gz.js"');
          fs.writeFileSync(
            path.resolve(__dirname, "client/dist/index.html"),
            newhtml,
            { encoding: "utf8", flag: "w" }
          );
        })
        .catch(console.log);
    }
  });
});
