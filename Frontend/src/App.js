import logo from './logo.svg';

import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';
import { BrowserRouter as Router ,Route , Switch } from 'react-router-dom';
import BlogDetails from './BlogDetails';
import SignUp from './SignUp';
import NavbarSignUp from './NavbarSignUp';
import Login from './Login';
import LoginNavBar from './LoginNavBar';
import AllUser from './AllUser';
import { Profiler } from 'react';
import Profile from './Profile';
import UserProfile from './UserProfile';
import UpdatePost from './UpdatePost';
import Search from './Search';
import UpdateUser from './UpdateUser';



const name = "Hi, Wellcome to our blog"


function App() {
  return (
    
    <Router>
      <div className="App">
        {/* <Navbar />
        <div className='content'> */}
          <Switch>
            <Route exact path="/">
              <Navbar/>
                <div className='content'> 
                  <Home/>
                </div>
            </Route>
            <Route exact path="/users">
              <Navbar/>
                <div className='content'> 
                  <AllUser/>
                </div>
            </Route>
            <Route path="/user/:id">
            <Navbar/>
                <div className='content'> 
                  <Profile/>
                </div>
            </Route>

            <Route path="/user-me">
            <Navbar/>
                <div className='content'> 
                  <UserProfile/>
                </div>
            </Route>

            <Route path="/updateProfile/:userName/:FullName/:password/:userID">
            <Navbar/>
                <div className='content'> 
                  <UpdateUser/>
                </div>
            </Route>

            <Route path="/createBlog">
            <Navbar/>
                <div className='content'> 
                  <Create/>
                </div>
              
            </Route>

            <Route path="/UpdateBlog/:blogdes/:blogTitle/:postNo">
            <Navbar/>
                <div className='content'> 
                  <UpdatePost/>
                </div>
              
            </Route>

            <Route path="/post/search">
            <Navbar/>
                <div className='content'> 
                  <Search/>
                </div>
              
            </Route>


            <Route path="/sign-up">
                <NavbarSignUp/>
                <div className='content'> 
                  
                  <SignUp/>
                </div>
              
            </Route>

            <Route path="/login">
            <LoginNavBar/>
                <div className='content'> 
                  <Login/>
                </div>
              
            </Route>
            <Route path="/blogs/:id">
            <Navbar/>
            
                <div className='content'> 
                <BlogDetails/>
                </div>
              
            </Route>
          </Switch>
        {/* </div> */}
      </div>
    </Router>
    
  );
}

export default App;
