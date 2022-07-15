import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const SignUp = () => {

    const [userName, setuserName] = useState('');
    const [FullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('')
    const [isPending , setIsPending] = useState(false);
    const history = useHistory();
    const [userInfo, setuserInfo] = useState({
      file:[]
      
      });
  
      const handleInputChange = (event) => {
       setuserInfo({
         ...userInfo,
         file:event.target.files[0],
         
       })
      };


    const submitHandler = (e)=>{
        e.preventDefault();
        const formdata = new FormData(); 
        formdata.append('image', userInfo.file);
        formdata.append('userName' , userName);
        formdata.append('FullName' , FullName);
        formdata.append('email' , email);
        formdata.append('password' , password);

        

        setIsPending(true);

        axios.post('http://localhost:5000/sign-up',formdata)
        .then((response)=>{
            console.log(response);
            setIsPending(false);
            history.push('/login');
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
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        />

        <label>Full Name:</label>
        <input 
          type="text" 
          required 
          value={FullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label>Email:</label>
        <input 
          type="text" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input 
          type="text" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="text-white">Select Image for profile:</label>
        <input type="file" className="form-control" name="image"  onChange={handleInputChange} />

        
        {!isPending && <button>Sign Up</button>}
        {isPending && <button>Signing Up...</button>}
      </form>
            </div>
     );
}
 
export default SignUp;