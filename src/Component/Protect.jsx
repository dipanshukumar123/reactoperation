import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Protect = (props) => {
    let AllSet = props.Component;
    let navigate = useNavigate();

useEffect(()=>{
    let login = localStorage.getItem('api_token');
    if (!login)
    {
        navigate('/login')
    }
    // else{
    //     navigate('/all')
    // }
},[])
  return(
      <>
          <AllSet/>
      </>
  )
}
export default Protect;