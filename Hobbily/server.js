//Libraries and Shit
const express=require("express")
const app=express()
const session=require("express-session")
const mysql=require("mysql")
const bodyParser = require('body-parser');
//const bodyparser=require("body-parser")
const staticpath=__dirname+"/views"


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))




app.use(express.static(staticpath))
app.set('view engine', 'ejs')
app.use("/",require(__dirname+"/route/router.js"))
app.listen(3000)
