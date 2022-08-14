import { useState } from "react";
import axios from "axios";

import { useHistory , useParams } from "react-router-dom/cjs/react-router-dom.min";
const UpdateUser = () => {

    const {userName , FullName , password , userID } = useParams();
    console.log( userID);

    const [Username, setuserName] = useState(userName);
    const [Fullname, setFullName] = useState(FullName);
    
    const [Password , setPassword] = useState(password);
    const [isPending , setIsPending] = useState(false);
    const history = useHistory();
    // const [userInfo, setuserInfo] = useState({
    //   file:[]
      
    //   });
  
    //   const handleInputChange = (event) => {
    //    setuserInfo({
    //      ...userInfo,
    //      file:event.target.files[0],
         
    //    })
    //   };

    const config = {
        headers: { "authorization": localStorage.getItem("token") },
      };

    const submitHandler = (e)=>{
        e.preventDefault();
        const bodyyyy = {
      
            userName:Username,
            FullName:Fullname,
            password:Password
          }

        

        setIsPending(true);

        axios.put('http://localhost:5000/users',bodyyyy , config)
        .then((response)=>{
            console.log(response);
            setIsPending(false);
            history.push('/user-me');
        }
        ).catch((error)=>{
          console.log(error)
        })
    }

    return ( 
            <div className="sign-up">
    <form onSubmit={submitHandler}>
        <label>User Name:</label>
        <input 
          type="text" 
          required 
          value={Username}
          onChange={(e) => setuserName(e.target.value)}
        />

        <label>Full Name:</label>
        <input 
          type="text" 
          required 
          value={Fullname}
          onChange={(e) => setFullName(e.target.value)}
        />

        {/* <label>Email:</label>
        <input 
          type="text" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}

        <label>Password:</label>
        <input 
          type="password" 
          required 
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* <label className="text-white">Select Image for profile:</label>
        <input type="file" className="form-control" name="image"  onChange={handleInputChange} /> */}

        
        {!isPending && <button>Update</button>}
        {isPending && <button>Signing Up...</button>}
      </form>
            </div>
     );
}
 
export default UpdateUser;