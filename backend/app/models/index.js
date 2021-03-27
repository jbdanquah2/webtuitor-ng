const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.howtos = require("./howto.model.js")(mongoose);
// db.coachs = require("./coach.model.js")(mongoose);
module.exports = db;
