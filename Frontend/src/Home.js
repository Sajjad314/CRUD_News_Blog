import React from "react";
import {useState , useEffect} from "react";
import BlogList from "./blogList";
import useFetch from "./useFetch";
const Home = () => {

    const {data:blogs , isPending , error , clickHandler}  = useFetch("http://localhost:5000/posts")

    const [name , setState]=useState("mario");
    
    

   

    return ( 
        
            <div className="home">

                {isPending && <div> <p>Loading...</p></div>}
                {error && <div>{error}</div>}
                {blogs && <BlogList blogs={blogs} title ="All Blogs" clickHandler = {clickHandler}/> }
                {/* <BlogList blogs = {blogs.filter((blog)=>blog.author == 'mario')} title='Marios Blog'/> */}

                {/* <button onClick={()=>setState("luigi")}>Click Me</button>
                <p>{name}</p> */}
            </div>
      
     );
}
 
export default Home;