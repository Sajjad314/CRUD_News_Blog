import { Link } from "react-router-dom";

const LoginNavBar = () => {
    return ( 
        <nav className="navbar">
            <img src={require('./image/bunny.png')} alt="" height="50px" width="50px" />
            
            <Link to="/"><h1>Our Blog</h1></Link>
            <div className="links">
                <Link to="/sign-up">Sign Up</Link>
                
            </div>

        </nav>
     );
}
 
export default LoginNavBar;