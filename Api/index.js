let express = require("express");
let db = require("../db");
let mongoose = require("mongoose");
let api = express();
let axios = require("axios");

api.use(async(req, res, next) => {
    req.database = db;
    next();
});
let config = require("../config.json");
api.post("/github/generate/url", async(req, res) => {
    let stateDB = await db.CreateState(req.body.callback);

    return res.status(200).send({
        message: "Generated",
        url: `https://ouath.openauth.cf/github/?state=${stateDB.state}`,
    });
});
api.get("/github/generate/url", async(req, res) => {
    let stateDB = await db.CreateState(req.query.callback);

    return res.status(200).send({
        message: "Generated",
        url: `https://ouath.openauth.cf/github/?state=${stateDB.state}`,
    });
});

api.get("/", async(req, res) => {
    res.redirect(`https://openauth.cf`);
});


api.listen(3003)

mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
