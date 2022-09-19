import React from "react";

const Error = () => {
    const error = {
        textAlign:"center",
        textDecoration:"underline",marginTop:130
    }
    const p ={
        textTransform:"uppercase",
        textAlign:"center",color:"red",fontSize:40
    }
    return(<>
        <h1 style={error}>404 Error Page</h1>
        <p style={p}>Page not found!!</p>
    </>)
}
export default Error;