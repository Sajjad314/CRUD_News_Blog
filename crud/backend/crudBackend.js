//dependency
const mysql = require('mysql2');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { use } = require('express/lib/application');
var cors = require('cors');
require('dotenv').config();
const app = express();
const path = require('path');
const multer = require('multer');
const { request } = require('http');




const storage = multer.diskStorage({
    destination: (requests , file , cb) => {
        cb(null,'Images')
    },
    filename: (requests , file  , cb) =>{
        console.log(file)
        cb(null , Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({storage : storage});

app.use(cors({ origin: "*", }))
app.use(express.json())

// Create the connection pool. The pool-specific settings are the defaults
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.user,
  port:process.env.portNo,
  password:process.env.password,
  database: process.env.dbName,
  
});

connection.connect((error)=>{
    if(error)
        console.log(error);
    else
        console.log("connected");
});




app.use('/images', express.static('images'));



//---------------------------------------------All API-----------------------------//

//-----------login to profile-------------
app.post('/login',(req, res)=>{
    
    const {userName , password} = req.body;
    console.log(password);
    
    let sql= "Select * from userinfo where userName = ?";
    
   connection.query(sql,[userName], (err, rows, fields) =>{
       if(err || rows[0] == null){
        res.json({auth:false , message:"Login Unsuccessfull!!"})
        
       }
       else{
        
       const pass = rows[0].password;
       bcrypt.compare(password , pass ,(err , result)=>{
        if(result){
    
            const user = { id : rows[0].userID}
             const accessToken = jwt.sign(user , process.env.secretToken);
                res.json({auth:true , token: accessToken})
            }
            else{
             res.json({auth:false , message:"Login Unsuccessfull\nInvalid User name or Password!!"})
            }

       });
       }
       
        
        
    })
})


//-----------Sign-in to profile-------------
app.post('/sign-up',upload.single("image"),async(req, res)=>{
    let hashedPass;
    const imageName = req.file.filename;
    const { userName , FullName , email , password} = req.body;
        const hash = await bcrypt.hash(password,10)
        let sql= "INSERT INTO userinfo( userName , fullName , email , password , imageName)\
           VALUES ( ?, ?, ?, ? , ?)";
           console.log(hash);
           
         connection.query(sql,[ userName , FullName , email ,hash , imageName ], (err, rows, fields) =>{
             if(err){
                 res.json({flag:false , message:"sign up unsuccessfull !!!\nUser Name already exist"})
                 console.log(err.message);
             }
             else{
               res.json({flag:true , message:'SignUp Successfull'});
             }
          })  
       
    
    
})



//-----------Show all users-------------
 app.get('/users',authorizatin,(req, res)=>{
    connection.query("SELECT userID , userName , FullName , email ,imageName FROM userinfo", (err, rows, fields) =>{
        res.send(rows);
     })
 });


 //-----------Show individual user-------------
 app.get('/user/:userID',authorizatin,(req, res)=>{
     console.log(req.params.userID)
    connection.query("SELECT userID , userName , FullName , email , imageName FROM userinfo WHERE userID = ?",[req.params.userID], (err, rows, fields) =>{
        res.send(rows);
     })
 })

 

//-----------Show my profile-------------
app.get('/user-me',authorizatin,(req, res)=>{
    console.log(req.user.id)
    connection.query("SELECT * FROM userinfo WHERE userID = ?",[req.user.id], (err, rows, fields) =>{
        res.send(rows);
     })
 })


 //-----------Show all posts-------------
app.get('/posts',authorizatin, (req , res)=>{

    sql = "SELECT postNo ,  blogTitle , blogtable.imageName ,  FullName as Author, blogdes \
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


 //----- ------update profile-------------
app.put('/users' ,authorizatin ,async(req,res)=>{
    console.log("inside update")
    const {userName , FullName , password} = req.body;
    const {id:userID}=req.user;
    let temp = null;
    let sql = null;
        sql = "Update userinfo set userName = ? , FullName = ? ,  password = ? where userID = ?";
        const hash = await bcrypt.hash(password,10)
        console.log(password , hash)
        temp = hash;
        connection.query(sql,[userName , FullName , hash,userID],(err , rows , fields)=>{

            if(err){
                res.send("An error occurd!!!\nCheck your request again.")
            }
            else{
                res.send("You have successfully updated your profile!!!!")
            }
        })

})


//-----------Show specific users post-------------
 app.get('/posts/:userName',authorizatin, (req , res)=>{
     
    connection.query("SELECT blogTitle , blogdes FROM blogtable , userinfo where userinfo.userID=blogtable.userID and userName=?",[req.params.userName], (err, rows, fields) =>{
       if(rows == 0){
            res.send("Unknown username ... Please check again");
       }
       else{
            res.send(rows);
       }
     })
 })

 //-----------Show specific post-------------
 app.get('/post/:id', authorizatin,(req , res)=>{
     
    connection.query("SELECT blogTitle , blogdes , blogtable.imageName ,  FullName as Author FROM blogtable , userinfo where userinfo.userID=blogtable.userID and postNo=?",[req.params.id], (err, rows, fields) =>{
       if(rows == 0){
            res.send("Unknown username ... Please check again");
       }
       else{
            res.send(rows);
       }
     })
 })

 
//-----------create a new blog-------------
app.post('/blog',authorizatin,upload.single("image"), (req , res)=>{
    const imageName = req.file.filename;
    const { blogTitle , blogdes} = req.body;
    const {id:userID}=req.user;
    // const userID = 10;
    console.log(userID);
     
     let sql= "INSERT INTO blogtable(userID ,blogTitle , blogdes , imageName)\
      VALUES (?, ?, ? , ?)";
      
      
    connection.query(sql,[userID ,blogTitle , blogdes , imageName], (err, rows, fields) =>{
        if(err){
            res.send("Error occured!!!")
        }
        else{
        res.send('You have successfully created the blog!!');
        }
     })
 })



//-----------update a new post-------------
app.put('/update' ,authorizatin, (req,res)=>{
    const {blogTitle , blogdes , postNo} = req.body;
    const {id:userID}=req.user;

    if(blogTitle == undefined){
        let sql = "UPDATE blogtable SET blogdes = ? WHERE userID = ? and postNo=?";
        
        connection.query(sql , [blogdes , userID , postNo] , (err , rows , fields)=>
        {   
            if(err){
                 res.send("error")
            }else{
            res.send("Update successfull if")
            }
            
        })
    }
    else if(blogdes == undefined){
        let sql = "UPDATE blogtable SET blogTitle = ? WHERE userID = ? and postNo=?";

        connection.query(sql , [blogTitle , userID , postNo] , (err , rows , fields)=>
        {
            if(err){
                res.send(err)
            }else{

            res.send("Update successfull else")
            }
        })
    }
    else{
        let sql = "UPDATE blogtable SET blogTitle = ? , blogdes = ? WHERE userID = ? and postNo=?";

        connection.query(sql , [blogTitle,blogdes , userID , postNo] , (err , rows , fields)=>
        {
            if(err){
                res.send(err)
            }else{
            res.send("Update successfull last else")
            }
        })
    }
 })


 //-----------search post-------------
 app.post('/search',authorizatin,(req,res)=>{
     const {FullName , blogTitle} = req.body;
     let sql = null;
     let temp = null;
     console.log(FullName)
     console.log(blogTitle)
     if(FullName != ""){
        temp = FullName;
         sql = `Select blogTitle , FullName as Author , blogdes , blogtable.imageName \
         from blogtable, userinfo where blogtable.userID = userinfo.userID and FullName Like  "%${temp}%"`;
         
     }

     else{
        temp = blogTitle;
        sql = `Select blogTitle , FullName as Author , blogdes ,blogtable.imageName \
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
 app.delete('/deletePost/:postNo',authorizatin,(req, res)=>{

    const postNo = req.params.postNo;
    const {id:userID}=req.user;
    
    
    connection.query("DELETE FROM blogtable WHERE userID = ? and postNo = ?",[userID , postNo], (err, rows, fields) =>{
        
        if(err){
            
            res.json(err);
        }
        else{
        res.send('Deleted Successfull');
        }
     })
 })


 

 //-----------For unrecognized url-------------
 app.use((req,res)=>{
     res.send("URL doesn't exist");
 })



//-----------authentication for token-------------
function authorizatin(req , res ,next){
    
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    //console.log(user.name)
    jwt.verify( token , process.env.secretToken , (err,user) =>{
        if(err) return res.sendStatus(403)
        req.user = user
        console.log("dhukse")
        next()
    })

}


 app.listen(5000);
