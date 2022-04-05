const bodyParser = require('body-parser');
const express=require("express")
const route=express.Router()
route.use(bodyParser.urlencoded({ extended: true }))
const db=require("../route/user_db")



route.get("/",(req,res)=>{
    


    return res.sendFile(__dirname.slice(0,-5) +"views/login.html")
    
})


route.get("/createpost", (req,res)=>{
    db.query("Select * from communities;",function(error,results,fields){
        if (error){
            throw error
        }
        else{
            comm=results
            return res.render(__dirname.slice(0,-5) +"views/post.ejs",{name:username,c:results})
        }
    })
    
})
route.get("/login.html",(req,res)=>{


    return res.redirect("/")
    
    
})

route.get("/userprofile",(req,res)=>{
    db.query('Select * from posts where username="'+username+'" order by post_id desc;',function(error,results,fields){
        if (error){
            return res.render("upp.ejs",{posts:[],name:username})
        }
        else{
            return res.render("upp.ejs",{posts:results,name:username})

        }
    })
    


})
route.post("/refresh",(req,res)=>{
    comm=req.body.comm
    if(comm==1){
        res.redirect("/home")
    }
    
    db.query("Select * from communities;",function(error,results,fields){
        if (error){
            throw error
        }
        else{
            commune=results
        }
    })

    db.query("Select * from posts where comm_id="+comm+" order by post_id desc;",function(error,results,fields){
        if(error){
            throw error
        }
        else{
            return res.render(__dirname.slice(0,-5) +"views/index.ejs",{name:username,posts:results,c:commune})

        }
    })


})

route.post("/post",(req,res)=>{
    title=req.body.title
    text=req.body.description
    likes=0
    community=req.body.comm
   
    //ADD DB.QUERY()
    db.query('INSERT INTO posts(username,post_title,post,comm_id,likes) VALUES("'+username+'","'+title+'","'+text+'",'+community+','+likes+');',function(error, results, fields) {
        // If there is an issue with the query, output the erro
        if (error){
            throw error
        }
    })
    res.redirect("/home")
})
route.get("/logout",(req,res)=>{
    return res.redirect("/")
})

route.get("/createcommunity", (req,res)=>{
    return res.render(__dirname.slice(0,-5) +"views/create_comm.ejs",{name:username})
})
route.post("/createcomm",(req,res)=>{
    commname=req.body.title
    db.query('Insert into communities (comm_name) values("'+commname+'");',function(error,results,fields){
        if (error){
            throw error
        }
        else{
            res.redirect("/home")
        }
    })
})
route.get("/home", async(req,res)=>{
    db.query("Select * from communities;",function(error,results,fields){
        if (error){
            throw error
        }
        else{
            comm=results
        }
    })
    db.query("Select * from posts order by post_id desc;", function (error, results, fields) {
        if (error) {
            throw error;
        }
        else {
            post = results;
            return res.render(__dirname.slice(0,-5) +"views/index.ejs",{name:username,posts:results,c:comm})
        }
    })
    
    
})

route.post('/login',(req,res)=>{
    username=req.body.username
    password=req.body.password
    if(username && password){
        db.query('SELECT * FROM users WHERE userName = "'+username+'" AND password = "'+password+'"', function(error, results, fields) {
                // If there is an issue with the query, output the erro
                if (error){
                    throw error
                }
                // If the account exists
        if (results.length > 0) {
                    // Authenticate the user
            req.session.loggedin = true;
            req.session.username = username;
                    // Redirect to home page
            res.redirect('/home');
        } 
        else {
            res.send('Incorrect Username and/or Password!')
        }			
            })
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
})

route.post("/signup",(req,res)=>{    
    username=req.body.username
    email=req.body.email
    password=req.body.password
    pass2=req.body.password2
    if(password.localeCompare(pass2)!=0){
        return res.send("Incorrect Password")
    }
    else if (username && password){
        db.query('insert into users(userName,email,password) values("'+username+'","'+email+'","'+password+'")',function(error,results,fields){
            if(error){
                throw error
            }

        })
    }
        return res.redirect("/")

})

route.get("/signup.html",(req,res)=>{


    return res.sendFile(__dirname.slice(0,-5) +"views/signup.html")
    
})

module.exports=route