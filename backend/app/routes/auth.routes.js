module.exports = app => {
    const auth = require('../controllers/auth.controller');
    const router = require('express').Router();

//  create howto
    router.post("/create", auth.create);

// // get all students
    router.get("/login/:email/:password", auth.checkLogin);

    app.use('/api/auth', router);
}