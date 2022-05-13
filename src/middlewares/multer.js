const { json } = require("body-parser");

const multer = require("multer");
const path = require("path");

//let imageURL = "http://localhost:8080/assets/postImage/";
let imageURL1 = "http://localhost:8080/assets/profileImage/";

let FileName = "";
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const FilePath = path.join(__dirname, "../assets/profileImage");
    cb(null, FilePath);
  },
  filename: (req, file, cb) => {
    console.log("done");
    FileName = Date.now() + "-" + file.originalname;
    req.img = { image: imageURL1 + FileName };
    cb(null, FileName);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
