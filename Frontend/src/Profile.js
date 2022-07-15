import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import BlogList from "./blogList";

const Profile = () => {

    const {id} = useParams();
    console.log(id);
    const{data:users , error , isPending , clickHandler} = useFetch('http://localhost:5000/user/'+id);
    const{data:blogs , error:error1 , isPending:isPending1 , clickHandler:clickHandler1} = useFetch('http://localhost:5000/posts');
    const history = useHistory();

    return ( 
        <div className="user-profile">

            <div className="userInfo">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {users && <div className="preview" key={users[0].userID}>
                
                    <img src={`http://localhost:5000/images/${users[0].imageName}`}  height="350px" width="500px"/>
                    <h2>{users[0].FullName}</h2>
                    <p>user name : {users[0].userName}</p>
                    <p>Email : {users[0].email}</p>
                    {/* <button onClick={()=>clickHandler(blog.id)}>Delete</button> */}
                
                
            </div>
            
            
            
            
            }
            </div>

            <div className="usersBlog">
                {blogs && <BlogList blogs={blogs.filter((blog)=> blog.Author === users[0].FullName)} title ="Timeline : " clickHandler = {clickHandler}/> }
            </div>
            
        </div>
        
     );
}
 
export default Profile;
