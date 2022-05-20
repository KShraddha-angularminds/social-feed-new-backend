const { json } = require("body-parser");

const multer = require("multer");
const path = require("path");

// let imageURL = "http://localhost:8080/assets/postImage/";
// let imageURL1 = "http://localhost:8080/assets/profileImage/";

let FileName = "";
let FileName1 = "";
let imgArr = [];
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const FilePath = path.join(__dirname, "../assets/profileImage");
    cb(null, FilePath);
  },
  filename: (req, file, cb) => {
    FileName = Date.now() + "-" + file.originalname;
    // req.img = { image: imageURL1 + FileName };
    req.img = { image: FileName };

    cb(null, FileName);
  },
});
const upload = multer({ storage: storage });

//post multer

var storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    const FilePath = path.join(__dirname, "../assets/postImage");

    cb(null, FilePath);
  },
  filename: (req, file, cb) => {
    console.log(file);
    FileName1 = Date.now() + "-" + file.originalname;
    // req.img = FileName1;

    // imgArr.push(FileName1);
    // req.img = { image: imageURL1 + FileName };
    // req.img = imgArr;
    cb(null, FileName1);
  },
});
const uploadPost = multer({ storage: storage1 });
module.exports = {
  upload,
  uploadPost,
};
