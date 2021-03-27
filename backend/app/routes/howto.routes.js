module.exports = app => {
    const howtos = require('../controllers/howto.controller');
    const router = require('express').Router();

//  create howto
    router.post("/", howtos.create);

// // get all students
    router.get("/", howtos.findAll);

    app.use('/api/howtos', router);
}