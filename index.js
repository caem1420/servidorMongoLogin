var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('images'));
require("./get/routesGet")(app)
require("./post/routesPost")(app)

app.listen(3000)
