import { Link } from "react-router-dom";

const logout = ()=>{
    localStorage.clear();
}

const Navbar = () => {
    return (
        <nav className="navbar">
            <img src={require('./image/bunny.png')} alt="" height="50px" width="50px" />
            
            <Link to="/"><h1>Our Blog</h1></Link>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/user-me">Profile</Link>
                <Link to ="/users">Friends</Link>
                <Link to="/post/search">Search</Link>
                {/* <Link to="/sign-up">Sign Up</Link> */}
                <Link  to="/login" onClick={logout}>Log Out</Link>
                
            </div>

        </nav>
      );
}
 
export default Navbar;
