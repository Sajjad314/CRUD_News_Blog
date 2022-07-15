import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import BlogList from "./blogList";
const Search = () => {

    const [key , setKey] = useState("");
    const [author , setAuthor] = useState("");
    const [isPending , setIsPending] = useState(true);
    const [blogs , setBlogs] = useState(null);
    const config = {
        headers: { 
          
          "authorization": localStorage.getItem("token") },
      };

    const submitHandler = (e) =>{
        e.preventDefault();
        // const formdata = new FormData(); 
        
        // formdata.append('blogTitle' , key);
        // formdata.append('FullName' , author);

    
        console.log(config)
        const body = {
            blogTitle : key ,
            FullName:author
        }
        
        axios.post('http://localhost:5000/search' ,body ,config)
        .then((res)=>{
            
            console.log(res);
            setBlogs(res.data);
            setIsPending(false);
           
        }
        )

    }
    return ( 
        <div className="create">
            
      <form onSubmit={submitHandler}>
      <label>Author's Name:</label>
        <input 
          type="text" 
          
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>Blog title:</label>
        <input 
          type="text" 
          
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />

        {<button>Search</button>}
                
      </form>
      <br />
      <br />
      <div>
      {blogs && <BlogList blogs={blogs} title ="Results"/> }
      </div>
        </div>
        
     );


}

export default Search;