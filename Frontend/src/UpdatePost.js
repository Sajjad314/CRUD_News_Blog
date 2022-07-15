import { useState } from "react";
import { useHistory , useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import useFetch from "./useFetch";
import userEvent from "@testing-library/user-event";
const UpdatePost = () => {
    
    const {blogdes , blogTitle , postNo} = useParams();
    // const{data:blogs , error , isPending1 , clickHandler} = useFetch('http://localhost:5000/post/'+id);


    
    // const [prevDataBody , setprevDataBody] = useState('')
    // const [prevDataTitle , setprevDataTitle] = useState('');
    
    const [title, setTitle] = useState(blogTitle);
    const [body, setBody] = useState(blogdes);
    const [author, setAuthor] = useState('mario');
    
    const [isPending , setIsPending] = useState(false);
    // const [textareaData , setTextareaData] = useState("");
    // setTextareaData("any");
    const history = useHistory();
    const config = {
      headers: { "authorization": localStorage.getItem("token") },
    };

    
    // document.getElementById("textarea").defaultValue = "Fifth Avenue, New York City";


    const submitHandler = (e)=>{
        e.preventDefault();
        

        
        setIsPending(true);
        const bodyyyy = {
      
          blogTitle:title,
          blogdes:body,
          postNo:postNo
        }
        console.log( localStorage.getItem("token"))
        axios.put('http://localhost:5000/update' , bodyyyy,config)
        .then((res)=>{
            console.log(res);
            setIsPending(false);
            history.push('/');
        }
        )
    }
    
    
    return ( 
        <div className="create">
           
        <form onSubmit={submitHandler}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea 
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        
        {!isPending && <button className="blogButton">Update</button>}
        {isPending && <button className="blogButton">Updating...</button>}
      </form>

        

        </div>
     );
}
 
export default UpdatePost;