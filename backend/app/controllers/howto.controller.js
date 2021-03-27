const db = require('../models');
const Howto = db.howtos;

exports.create = (req, res) => {

  //validate request
  if (!req.body.name) {
    res.status(400).send({ message: "content can not be empty!" })
  }

  //create a howto record
  const howto = new Howto({
    link: req.body.link,
    name: req.body.name,
    img: req.body.img,
    published: req.body.published,
    related: req.body.related,
    created_by: req.body.created_by,
    totalTime: req.body.totaltime,
    description: req.body.description,
    content: req.body.content,
    comment: req.body.comment,
  })

  howto
    .save(howto)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the howto."
      })
    }).send
}

//  get all students or student
exports.findAll = (req, res) => {
  const link = req.query.link;
  var condition = link ? { link: { $regex: new RegExp(link), $options: "i" } } : {};

  Howto.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
};