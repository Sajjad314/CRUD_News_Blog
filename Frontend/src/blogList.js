import { Link } from "react-router-dom";
const BlogList = ({blogs , title , clickHandler}) => {
    // console.log(blogs)
    // const imgpath = `http://localhost:5000/images/${blogs.imageName}`;
    // const blogs = props.blogs;
    // const title = props.title;
console.log(blogs[0].postNo)
    return ( 
        <div className="blog-list">
            <h2>{title}</h2>
        {blogs.map(blog =>(
            
            <div className="preview" key={blog.postNo}>
                <Link to= {`/blogs/${blog.postNo}`}>
                    
                        <img className="blog_list_img" src={`http://localhost:5000/images/${blog.imageName}`} alt="Image is missing" height="310px"  width="500px"/><br/>
                    
                    <h2>{blog.blogTitle}</h2>
                    <p>Written by {blog.Author}</p>
                    {/* <button onClick={()=>clickHandler(blog.id)}>Delete</button> */}
                </Link>
                
            </div>
            
        ))}
        </div>
     );
}
 
export default BlogList;