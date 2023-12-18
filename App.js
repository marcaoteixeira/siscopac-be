//var bodyParser = require('body-parser')
var express = require("express")
var app = express()
var router = require("./router/routes")
var cors = require("cors")

app.use(cors());

app.set('view engine','ejs');
app.use(express.static('public'));
 
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
//app.use(bodyParser.json())

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use("/",router);

app.listen(8080,() => {
    console.log("Servidor rodando")
});