import React from "react";
import {useState , useEffect} from "react";
import axios from "axios";

const useFetch=(url) =>{

    const [data , setBlogs] = useState(null);
    const [isPending , setIsPending] = useState(true);
    const [error , setError] = useState(null);
    const config = {
        headers: { "authorization": localStorage.getItem("token") },
      };

    

    useEffect(()=>{
        setTimeout(()=>{
            axios.get(url , config)
            .then(res=>{
                // if(res.statusText != "OK"){
                //     console.log(res.statusText);
                //     throw Error('could not fetch the desired data');
                // }

                // return res.json();
                setBlogs(res.data);
               
                setIsPending(false);
            })
            // .then(data=>{
            //     setBlogs(data);
            //     console.log(data);
            //     setIsPending(false);
            // })
            // .catch(err=>{
            //     setError(err.message);
            //     setIsPending(false);
            // })
        },1000);

        return ()=>console.log("Clean Up");
        
    } , [url]);

    const clickHandler = (id)=>{
        const newBlogs = data.filter((blog)=>blog.id !== id);
        setBlogs(newBlogs);
  }

    return {data , isPending ,error , clickHandler};

}

export default useFetch;