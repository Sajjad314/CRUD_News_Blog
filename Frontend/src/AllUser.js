import React from "react";
import {useState , useEffect} from "react";

import useFetch from "./useFetch";
import UserList from "./UserList";
const AllUser = () => {

    const {data:users , isPending , error , clickHandler}  = useFetch("http://localhost:5000/users")


    return ( 
        <div className="userList">

                {isPending && <div> <p>Loading...</p></div>}
                {error && <div>{error}</div>}
                {users && <UserList users={users} />}
                {/* <BlogList blogs = {blogs.filter((blog)=>blog.author == 'mario')} title='Marios Blog'/> */}

                {/* <button onClick={()=>setState("luigi")}>Click Me</button>
                <p>{name}</p> */}
            </div>
     );
}
 
export default AllUser;