const sql = require("./db.js");
var bcrypt = require("bcryptjs");

// constructor
const user = function(user) {
  this.email = user.email;
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.userName = user.userName;
  this.password = user.password;
  this.mobile = user.mobile;
  this.city = user.city;
  this.age = user.age;
  this.dateOfBirth = user.dateOfBirth
};

user.create = (newuser, result) => {
  sql.query("INSERT INTO users SET ?", newuser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newuser });
    result(null, {user:{ id: res.insertId, ...newuser }});
  });
};

user.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, {user:{
          firstName: res[0].firstname,
          lastName: res[0].lastname,
          userName: res[0].userName,
          age: res[0].age,
          city: res[0].city,
          mobile: res[0].mobile,
          email: res[0].email,
          profileURL: `http://localhost:3000/public/profile/${res[0].image}`,
          dateOfBirth: res[0].dateOfBirth
      }});
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

user.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

user.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET email = ?, firstname = ?, lastname = ?, dateOfBirth = ?, userName = ?, age = ?, mobile = ?, city = ?  WHERE id = ?",
    [user.email, user.firstName,user.lastName,user.dateOfBirth, user.userName,user.age,user.mobile,user.city, id],
    (err, res) => {
      if (err) {
        console.log("err= r: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, {user:{ id: id, ...user }});
    }
  );
};

user.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};


user.findByEmail = (email, result) => {
  sql.query("SELECT * FROM users where email = ?", email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

user.updatePassword = (req, result) => {
  sql.query(`SELECT password FROM users WHERE id = ${req.id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    if (res.length) {
      
      var passwordIsValid = bcrypt.compareSync(
        req.oldPassword,
        res[0].password
      );

      if (!passwordIsValid) {
        result(null, { message: "Old Password Invalid !" });
        return;
      }else{
        sql.query(
          "UPDATE users SET password = ?  WHERE id = ?",
          [req.password, req.id],
          (err, res) => {
            console.log("error: ", err,'res', res);
            if (err) {
              result(null, err);
              return;
            }
            result(null, { message: 'Password updated successfully!' });
            return;
          }
        );
      }
    }
  });
};

user.updateImagePath = (id, user, result) => {
  console.log('id', id, 'image', user);
  
  sql.query(
    "UPDATE users SET image = ?  WHERE id = ?",
    [user, id],
    (err, res) => {
      console.log('err', err, 'res', res);
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Image updated: ", { id: id, ...user });
      result(null, {user:{profileUrl: `http://localhost:3000/public/profile/${user}`}});
    }
  );
};


module.exports = user;