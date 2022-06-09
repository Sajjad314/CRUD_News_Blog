// get the client

const mysql = require('mysql2');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { use } = require('express/lib/application');
require('dotenv').config();
const app = express();


app.use(express.json())

// Create the connection pool. The pool-specific settings are the defaults
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'3141592654+sazzad@',
  database: 'crudedb',
  
});

connection.connect((error)=>{
    if(error)
        console.log(error);
    else
        console.log("connected");
});


//-----------login to profile-------------
app.post('/login',(req, res)=>{
    
    const {userName , password} = req.body;
    
    let sql= "Select * from userinfo where userName = ?";
    // const userr = req.body.userID;
    // const user = { : userr};

    //  console.log(user.name);
   connection.query(sql,[userName], (err, rows, fields) =>{
       if(err){
           res.send("login unsuccessfull")
       }
       else{
       const pass = rows[0].password;
       bcrypt.compare(password , pass ,(err , result)=>{
        if(result){
    
            const user = { id : rows[0].userID}
            console.log(user)
         //    console.log(user);
            
             const accessToken = jwt.sign(user , process.env.secretToken);
                res.send(accessToken)
            }
            else{
             res.send("Login Unsuccessfull!!")
            }

       });
       }
       
        
        
    })
})


//-----------Sign-in to profile-------------
app.post('/sign-up',async(req, res)=>{
    let hashedPass;
    const { userID ,userName , fullName , email , password} = req.body;
        const hash = await bcrypt.hash(password,10)
        let sql= "INSERT INTO userinfo(userID, userName , fullName , email , password)\
           VALUES (?, ?, ?, ?, ?)";
           console.log(hash);
           
         connection.query(sql,[userID , userName , fullName , email ,hash ], (err, rows, fields) =>{
             if(err){
                 res.send("sign up unsuccessfull !!!\nuserName , email and password must be unique and non empty")
             }
             else{
               res.send('SignUp Successfull');
             }
          })  
       
    
    
})



app.use(authorizatin)


//-----------Show all users-------------
 app.get('/users',(req, res)=>{
    connection.query("SELECT userID , userName , FullName , email FROM userinfo", (err, rows, fields) =>{
        res.send(rows);
     })
 });


 //-----------Show individual user-------------
 app.get('/user/:userID',(req, res)=>{
     console.log(req.params.userID)
    connection.query("SELECT userID , userName , FullName , email FROM userinfo WHERE userID = ?",[req.params.userID], (err, rows, fields) =>{
        res.send(rows);
     })
 })

//  app.delete('/user/:userID',(req, res)=>{
//     connection.query("DELETE FROM userinfo WHERE userID = ?",[req.params.userID], (err, rows, fields) =>{
//         res.send('Deleted Successfull');
//      })
//  })

 

//-----------Show my profile-------------
app.get('/user/me',(req, res)=>{
    console.log(req.user.id)
    connection.query("SELECT userID , userName , FullName , email FROM userinfo WHERE userID = ?",[req.user.id], (err, rows, fields) =>{
        res.send(rows);
     })
 })


 //-----------Show all posts-------------
app.get('/posts', (req , res)=>{

    sql = "SELECT postNo ,  blogTitle , FullName as Author, blogdes \
     FROM blogtable , userinfo where blogtable.userID = userinfo.userID"
    connection.query(sql, (err, rows, fields) =>{
        if(err){
            res.send("Request is not valid");
        }
        else{
        res.send(rows);
        }
     })
 })


 //-----------update profile-------------
app.put('/users' , async(req,res)=>{

    const {userName , FullName , password} = req.body;
    const {id:userID}=req.user;
    let temp = null;
    let sql = null;
    
    if(userName != undefined){
        sql = "Update userinfo set userName = ? where userID = ?";
        temp = userName;
    }
    else if(FullName != undefined){
        sql = "Update userinfo set FullName = ? where userID = ?";
        temp = FullName;
    }
    else{
        sql = "Update userinfo set password = ? where userID = ?";
        const hash = await bcrypt.hash(password,10)
        console.log(password , hash)
        temp = hash;

    }

    connection.query(sql,[temp,userID],(err , rows , fields)=>{

        if(err){
            res.send("An error occurd!!!\nCheck your request again.")
        }
        else{
            res.send("You have successfully updated your profile!!!!")
        }
    })

})


//-----------Show specific users post-------------
 app.get('/posts/:userName', (req , res)=>{
     
    connection.query("SELECT blogTitle , blogdes FROM blogtable , userinfo where userinfo.userID=blogtable.userID and userName=?",[req.params.userName], (err, rows, fields) =>{
       if(rows == 0){
            res.send("Unknown username ... Please check again");
       }
       else{
            res.send(rows);
       }
     })
 })

 
//-----------lcreate a new blog-------------
app.post('/blog', (req , res)=>{
     
    const { blogTitle , blogdes} = req.body;
    const {id:userID}=req.user;
    console.log(userID);
     
     let sql= "INSERT INTO blogtable(userID ,blogTitle , blogdes)\
      VALUES (?, ?, ?)";
      
      
    connection.query(sql,[userID ,blogTitle , blogdes], (err, rows, fields) =>{
        if(err){
            res.send("Error occured!!!")
        }
        else{
        res.send('You have successfully created the blog!!');
        }
     })
 })



//-----------update a new post-------------
app.put('/update' , (req,res)=>{
    const {blogTitle , blogdes , postNo} = req.body;
    const {id:userID}=req.user;
    
    if(blogTitle == undefined){
        let sql = "UPDATE blogtable SET blogdes = ? WHERE userID = ? and postNo=?";
        
        connection.query(sql , [blogdes , userID , postNo] , (err , rows , fields)=>
        {   
            
            res.send("Update successfull")
            
        })
    }
    else if(blogdes == undefined){
        let sql = "UPDATE blogtable SET blogTitle = ? WHERE userID = ? and postNo=?";

        connection.query(sql , [blogTitle , userID , postNo] , (err , rows , fields)=>
        {
            res.send("Update successfull")
        })
    }
    else{
        let sql = "UPDATE blogtable SET blogTitle = ? , blogdes = ? WHERE userID = ? and postNo=?";

        connection.query(sql , [blogTitle,blogdes , userID , postNo] , (err , rows , fields)=>
        {
            res.send("Update successfull")
        })
    }
 })


 //-----------search post-------------
 app.get('/post/search',(req,res)=>{
     const {FullName , blogTitle} = req.body;
     let sql = null;
     let temp = null;
     if(FullName != undefined){
        temp = FullName;
         sql = `Select blogTitle , FullName as Author , blogdes \
         from blogtable, userinfo where blogtable.userID = userinfo.userID and FullName Like  "%${temp}%"`;
         
     }

     else{
        temp = blogTitle;
        sql = `Select blogTitle , FullName as Author , blogdes \
        from blogtable, userinfo where blogtable.userID = userinfo.userID and blogTitle like "%${temp}%"`;
       
        console.log(temp)
     } 

     connection.query(sql  ,(err , rows , fields)=>{
         if(err){
            res.send("An error occurd!!!\nCheck your request again.")
        
        }
        else{
            res.send(rows);
        }
     })
 })



 //-----------delete apost-------------
 app.delete('/deletePost/:postNo',(req, res)=>{

    const postNo = req.params.postNo;
    const {id:userID}=req.user;
    console.log(userID)
    console.log(postNo)
    connection.query("DELETE FROM blogtable WHERE userID = ? and postNo = ?",[userID , postNo], (err, rows, fields) =>{
        res.send('Deleted Successfull');
     })
 })




 //-----------For unrecognized url-------------
 app.use((req,res)=>{
     res.send("URL doesn't exist");
 })



//-----------authentication for token-------------
function authorizatin(req , res ,next){
    //console.log("anythong")
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    //console.log(user.name)
    jwt.verify( token , process.env.secretToken , (err,user) =>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })

}


 app.listen(5000);