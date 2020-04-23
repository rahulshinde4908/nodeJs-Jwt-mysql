const authJwt = require('../middleware/authJwt');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/profile')
  },
  filename: function (req, file, cb) {
    const fileArray = file.originalname.split('.');
    const fileExtension = fileArray[fileArray.length - 1];
    cb(null, Date.now() + '.' + fileExtension)
  }
})

var upload = multer({ storage: storage })

module.exports = app => {
    const users = require("../controllers/user.controller.js");
    // Create a new user
    app.post("/api/users", users.create);
  
    // Retrieve all users
    app.get("/getAll", users.findAll);
  
    // Retrieve a single user with userId
    app.get("/api/user", [authJwt.verifyToken], users.findOne);
  
    // Update a user with userId
    app.put("/api/update", [authJwt.verifyToken], users.update);
  
    // Delete a user with userId
    app.delete("/deleteUser", [authJwt.verifyToken], users.delete);
  
    // Login user
    app.post("/api/users/login", users.login);

    // Update user password
    app.put("/api/updatePassword",  [authJwt.verifyToken],users.updatePassword);

    app.post("/api/uploadImage",upload.single('avatar'),[authJwt.verifyToken], users.uploadImage);
  };
  