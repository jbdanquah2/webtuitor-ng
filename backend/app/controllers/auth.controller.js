const {nanoid} = require('nanoid')
const db = require('../models');
const Auth = db.auth;

exports.create = (req, res) => {
  //validate request
  if (!req.body.email) {
    res.status(400).send({ message: "content can not be empty!" })
  }
  //create a howto record
  const auth = new Auth({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })

  auth.save(auth)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
      })
    }).send
}

//  get all students or student
exports.checkLogin = (req, res) => {
  // var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

  Auth.find({email: req.params.email, password: req.params.password})
    .then(data => {
      if (!data.length){
        res.status(404).send({ message: `user not found!` });
      }
      else { 
        data[0].token = nanoid(48);
        res.send({
        token: nanoid(48),
        profile: data});
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Login details is incorrect!"
      });
    });
};