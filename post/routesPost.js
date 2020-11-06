var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var fs = require("fs")
module.exports = function(app){
    app.post("/login", (req, res) => {
        console.log(req.body)
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("pruebaLogin");
            if (req.body && Object(req.body)) {
                dbo.collection("login").find({ "email": req.body.email }).toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    if(result.length == 0){
                        res.send({"response": "error - email no exixste en bd"})
                    }else{
                        if(result[0]["password"] == req.body.password){
                            res.send({"response": "ok", "role": result[0]["role"], "email": result[0]["email"]})
                        }else{
                            res.send({"response": "error - email no coincide con pass"})
                        }
                    }
                    db.close();
                });
            }
        });
    })
    app.post("/getUsers", (req, res) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("pruebaLogin");
            if (req.body && Object(req.body) && req.body.rol == "admin") {
                dbo.collection("login").find({}).toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.send(result)
                    db.close();
                });
            }
        });
    })
    
    app.post("/getUserInfo", (req, res) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            console.log(req.body)
            var dbo = db.db("pruebaLogin");
            if (req.body && Object(req.body) && req.body.rol == "admin" && req.body.emailBusqueda) {
                dbo.collection("login").find({"email": req.body.emailBusqueda}).toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.send(result)
                    db.close();
                });
            }
        });
    })

    app.post("/ingresardatos", (req, res) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("pruebaLogin");
            if (req.body && Object(req.body)) {
                dbo.collection("tienda").insertOne(req.data, (err, respuestadb) => {
                    if (err) throw err;
                    console.log("1 document inserted");
                    res.send(respuestadb)
                    db.close();
                });
            }
        });
    })

    app.post("/updateProducto", (req, res) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("pruebaLogin");
            if (req.body && Object(req.body)) {
                // dbo.collection("tienda").insertOne(req.data, (err, respuestadb) => {
                //     if (err) throw err;
                //     console.log("1 document inserted");
                //     res.send(respuestadb)
                //     db.close();
                // });
                dbo.collection("tienda").updateOne({"_id": mongo.ObjectId(req.body.id)}, {$set:{"name": req.body.name, "description": req.body.description,
            "precio": req.body.precio, "image": req.body.image}}, function(err, resp) {
                    if (err) throw err;
                    console.log("1 document updated");
                    res.send({"resutl": "ok"})
                    db.close();
                  });
                console.log(mongo.ObjectId(req.body.id))
            }
        });
    })
}