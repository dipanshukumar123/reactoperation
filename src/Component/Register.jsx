import React, {useReducer} from "react";
import 'bootstrap-4-react';
import {toast, ToastContainer} from "react-toastify";
import { useNavigate,NavLink } from "react-router-dom";

const Register = () => {
    let navigate = useNavigate()
    const intial = 
    {
       name : "",
       email:"",
       password:""
    }
    const reducer = (state,action) => {
        switch (action.type)
        {
            case "Change":
            return {...state,[action.field]:action.payload};
            default:
                return state;
        }
    }

    const InputChange = (e) => {
        disptach({
            type:"Change",
            field:e.target.name,
            payload:e.target.value
        })
    }

    const [state,disptach] = useReducer(reducer,intial);

    const FormSubmit = (e) => {
      e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": state.name,
            "email": state.email,
            "password": state.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost/apitest/public/api/saveregister", requestOptions)
            .then((response) => {
                response.json().then((result)=>{
                    console.log(result)
                    toast(result.msg)
                    localStorage.setItem('api_token',result.api)
                    navigate('/login')
                })
            })
    }

    return(
        <>
            <ToastContainer/>
            <h1>Register Page</h1>
            <div>
               <form className="col-sm-6" onSubmit={FormSubmit}>
                   <div className="form-group">
                       <label htmlFor="email">Name:</label>
                       <input type="text" className="form-control" onChange={InputChange} name="name" value={state.name}/>
                   </div>
                   <div className="form-group">
                       <label htmlFor="email">Email address:</label>
                       <input type="email" className="form-control" onChange={InputChange} name="email" value={state.email}/>
                   </div>
                   <div className="form-group">
                       <label htmlFor="email">Password:</label>
                       <input type="password" className="form-control" onChange={InputChange} name="password" value={state.password}/>
                   </div>
                   <button type="submit" value="Submit">Submit</button>
                   Have account?<NavLink to="/login" > Click Here </NavLink> For Login
               </form>
            </div>
        </>
    )
}

export default Register;