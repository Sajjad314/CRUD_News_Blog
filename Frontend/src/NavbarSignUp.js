import { Link } from "react-router-dom";

const NavbarSignUp = () => {
    return ( 
        <nav className="navbar">
            <img src={require('./image/bunny.png')} alt="" height="50px" width="50px" />
            
            <Link to="/"><h1>Our Blog</h1></Link>
            <div className="links">
                <Link to="/login">Log In</Link>
                
            </div>

        </nav>
     );
}
 
export default NavbarSignUp
