import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const Login = () => {
    const [userName, setuserName] = useState('');
    const [password , setPassword] = useState('')
    const [isPending , setIsPending] = useState(false);
    const history = useHistory();


    const submitHandler = (e)=>{
        e.preventDefault();
        const userInfo = {userName , password};

        axios.post('http://localhost:5000/login',{
            
            userName:userName,
            password:password
            
        })
        .then((response)=>{
            //
            setIsPending(false);
            if(response.data.auth){
                history.push('/')
                localStorage.setItem('token',"Bearer "+response.data.token);
                console.log(response.data);
            }
            else{
                alert(response.data.message);
            }
           // history.push('/login');
        }
        ).catch((error)=>{
          console.log(error)
        })
    }

    return ( 
        <div className="login">
            <form onSubmit={submitHandler}>
                <label>User Name:</label>
                <input 
                    type="text" 
                    required 
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)}
                    />
                    <label>Password:</label>
                <input 
                    type="text" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

        
                {!isPending && <button>Login</button>}
                {isPending && <button>Logging In...</button>}
            </form>
            
        </div>
     );
}
 
export default Login;