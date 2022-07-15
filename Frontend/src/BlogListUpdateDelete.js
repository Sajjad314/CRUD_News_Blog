import { Link } from "react-router-dom";
const BlogListUpdateDelete = ({blogs , title , clickHandler }) => {

    // const blogs = props.blogs;
    // const title = props.title;

    return ( 
        <div className="blog-list">
            <h2>{title}</h2>
        {blogs.map(blog =>(
            
            <div className="preview" key={blog.postNo}>
                <Link to= {`/blogs/${blog.postNo}`}>
                <img className="blog_list_img" src={`http://localhost:5000/images/${blog.imageName}`} alt="Image is missing" height="310px"  width="500px"/><br/>
                    <h2>{blog.blogTitle}</h2>
                    <p>Written by {blog.Author}</p>
                    </Link>
                     <Link to = {`/UpdateBlog/${blog.blogdes}/${blog.blogTitle}/${blog.postNo}`}>
                    <button className="blogButton">Update</button>
                    </Link>
                    <button className="blogButton" onClick={()=>clickHandler(blog.postNo)}>Delete</button>
                
                
            </div>
            
        ))}
        </div>
     );
}
 
export default BlogListUpdateDelete;