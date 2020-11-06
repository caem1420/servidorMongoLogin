var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var fs = require("fs")
module.exports = function(app){

    app.get("/tienda", (req, res) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("pruebaLogin");
            dbo.collection("tienda").find({}).toArray((err, result) => {
                if (err) throw err;
                //console.log(result);
                res.send(JSON.stringify(result))
                db.close();
            });
        });
    })
    
    app.get("/getProducto", (req, res)=>{
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("pruebaLogin");
            //if (req.body && Object(req.body) && req.body.email && req.body.rol && req.body.rol == "admin") {
                dbo.collection("tienda").find({"_id": new mongo.ObjectID(req.query.id)}).toArray(function (err, result) {
                  res.send(result)
                  db.close();
                })
            //}
        })
    })
}