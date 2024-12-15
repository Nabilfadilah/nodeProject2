const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const bycrypt = require('bcrypt'); //npm install bcrypt
const db = require('./db');
 
const app = express()
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
// sesuaikan dengan route frontend
app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
}));
 
// base route
app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
// route post user
app.post("/api/adduser", async (req, res) => {
  const sql ="INSERT INTO users (name,email,username,password) VALUES (?, ?, ?, ?)";
 
  const hashedPassword =  await bycrypt.hash(req.body.password, 10);
 
  const values = [req.body.name, req.body.email, req.body.username, hashedPassword];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "New User added successfully" });
  });
});
 
// route get user
app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});
 
// route get user by id
app.get("/api/getuser/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM users WHERE id= ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});
 
// route put user
app.put("/api/edit/:id", async (req, res) => {
  const id = req.params.id;
  const sql ="UPDATE users SET name=?, email=?, username=? WHERE id=?";
   
  const values = [
    req.body.name,
    req.body.email,
    req.body.username,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "User updated successfully" });
  });
});
 
// route delete user
app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM users WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "User successfully Deleted" });
  });
});
 
app.listen(3001, () => {console.log('Server started on port 3001')});