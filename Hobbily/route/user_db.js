const mysql=require("mysql")
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Enter Your Password for mysql here",
    database:"userInfo"
})

module.exports=connection


