const mysql=require("mysql")
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Pernavan123/",
    database:"userInfo"
})

module.exports=connection


