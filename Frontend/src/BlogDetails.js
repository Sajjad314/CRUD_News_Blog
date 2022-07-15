import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";

const BlogDetails = () => {

    const {id} = useParams();
    console.log("insidedet "+id)
    const{data:blogs , error , isPending , clickHandler} = useFetch('http://localhost:5000/post/'+id);
    const history = useHistory();

    console.log(blogs);

    const handleClick =()=>{
        fetch('http://localhost:8000/blogs/'+id , {
        method:'DELETE'
    })
    .then(()=>{
        history.push('/')
    })
    }
    let imgpath = "";
    if(blogs){
     imgpath  = `http://localhost:5000/images/${blogs[0].imageName}`;
    console.log(imgpath)
    }
    

    return ( 
        <div className="blog-body">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blogs && (
                <article>
                    <h2>{blogs[0].blogTitle}</h2>
                    <h4>Written by {blogs[0].Author}</h4>
                    <img src={imgpath} alt="image not found" height="400px" width="600px"/>
                    <p>{blogs[0].blogdes}</p>
                    
                </article>
            )}
        </div>

     );
}
 
export default BlogDetails;