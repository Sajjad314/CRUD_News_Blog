import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import BlogList from "./blogList";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import BlogListUpdateDelete from "./BlogListUpdateDelete";

const UserProfile = () => {
    

    const [ FullName , setFullname] = useState("");
    const [ userName , setUserName] = useState("");
    const [ email , setEmail] = useState("");
    const [ isOk , setIsOk] = useState(false);
    const history = useHistory();

    const handleClick = () =>{
        history.push("/createBlog");
    }

    

    const{data:blogs , error:error1 , isPending:isPending1 , clickHandler:clickHandler1} = useFetch('http://localhost:5000/posts');

    const config = {
        headers: { "authorization": localStorage.getItem("token") },
      };

    const clickHandler = (id)=>{
        console.log(id);
    axios.delete('http://localhost:5000/deletePost/'+id , config)
    .then((res)=>{
        console.log(res)
        history.push("/user-me")
    })
  }

  

    axios.get('http://localhost:5000/user-me',{
        headers:{
            "authorization" : localStorage.getItem("token")
           
        }
    })

            .then(res=>{
                setEmail(res.data[0].email);
                setFullname(res.data[0].FullName);
                setUserName(res.data[0].userName);
                setIsOk(true);
                
            })
   
    

    return ( 
        <div className="user-profile">
            
            <div className="userInfo">
            {isOk && <div className="preview"  >
                
                    <img src={require('./image/man.png')} />
                    <h2>{FullName}</h2>
                    <p>user name : {userName}</p>
                    <p>Email : {email}</p>
                    
                
                
            </div>
            
            
            
            
            }
            </div>

            <div className="usersBlog">
                
                {blogs && <BlogListUpdateDelete blogs={blogs.filter((blog)=> blog.Author === FullName)} title ="Timeline : " clickHandler = {clickHandler}/> }
                <button className="newBlogButton" onClick={handleClick}>+ New Blog</button>
            </div>
            
        </div>
        
     );
}
 
export default UserProfile;
