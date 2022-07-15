import { Link } from "react-router-dom";
const UserList = ({users }) => {

    // const blogs = props.blogs;
    // const title = props.title;

    return ( 
        <div className="blog-list">
            <h2>All Users</h2>
        {users.map(user =>(
            
            <div className="preview" key={user.userID}>
                <Link to= {`/user/${user.userID}`}>
                    <img className="profile_list_img" src={`http://localhost:5000/images/${user.imageName}`} height="100px" width="100px" />
                    <h2>{user.FullName}</h2>
                    <p>user name : {user.userName}</p>
                    <p>Email : {user.email}</p>
                    {/* <button onClick={()=>clickHandler(blog.id)}>Delete</button> */}
                </Link>
                
            </div>
            
        ))}
        </div>
     );
}
 
export default UserList;