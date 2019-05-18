const express = require("express"),
    app = express(),
    server = require("http").Server(app),
    expressRoutes = require("./appRoutes.js"),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    yock = require("./yockojack.js");

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressRoutes);




server.listen(8080, () => {
    console.log("listening")
    yock.demoData();
});
