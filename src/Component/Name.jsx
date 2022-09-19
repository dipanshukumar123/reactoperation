import React from "react";
import {useLocation, useParams} from "react-router-dom";

const Name = () => {
    const {fname} = useParams();
    const location = useLocation();

    return(<>
        <h1>Welcome,to the {fname} Name Page</h1>
        <div>
            your loction : {location.pathname}
        </div>
        {location.pathname === `/name/dipanshu` ? (<button onClick={()=>alert("you are right path")}>click</button>) : null}
    </>)
}
export default Name;