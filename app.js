var express = require("express")
var bodyParser = require("body-parser")

var app = express()

app.use(express.static(__dirname + "/"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(request,response){
	response.sendFile("/counter.html",{root:"./"})
})

var port = 3000

app.listen(port,function(){
	console.log("The server is listening on port", port)
})