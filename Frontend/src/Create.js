import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
const Create = () => {


  const [userInfo, setuserInfo] = useState({
    file:[]
    
    });

    const handleInputChange = (event) => {
     setuserInfo({
       ...userInfo,
       file:event.target.files[0],
       
     })
    };
     


    const [title, setTitle] = useState('');
    const prevData = "prev data"
    const [body, setBody] = useState("");
    
    
    const [isPending , setIsPending] = useState(false);
    // const [textareaData , setTextareaData] = useState("");
    // setTextareaData("any");
    const history = useHistory();
    const config = {
      headers: { 
        "Content-Type": "multipart/form-data",
        "authorization": localStorage.getItem("token") },
    };

    
    // document.getElementById("textarea").defaultValue = "Fifth Avenue, New York City";


    const submitHandler = (e)=>{
        e.preventDefault();
        const formdata = new FormData(); 
        formdata.append('image', userInfo.file);
        formdata.append('blogTitle' , title);
        formdata.append('blogdes' , body)
    
        // axios.post("http://localhost:5000/uploadImage", formdata,{   
        //         headers: { "Content-Type": "multipart/form-data" } 
        // })
        console.log( localStorage.getItem("token"))
        axios.post('http://localhost:5000/blog' ,formdata ,config)
        .then((res)=>{
            console.log(res);
            setIsPending(false);
            history.push('/');
        }
        )
    }

    return ( 
        <div className="create">
            
      <form onSubmit={submitHandler}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea 
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <label className="text-white">Select Image :</label>
        <input type="file" className="form-control" name="image"  onChange={handleInputChange} />
        {/* <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select> */}
        {!isPending && <button>Add Blog</button>}
        {isPending && <button>Adding Blog...</button>}
      </form>
        </div>
     );
}
 
export default Create;