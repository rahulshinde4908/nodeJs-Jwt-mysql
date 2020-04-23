const authJwt = require('../middleware/authJwt');
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

  };