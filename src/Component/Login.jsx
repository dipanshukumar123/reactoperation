import React, { useEffect, useReducer } from "react";
import { toast, ToastContainer } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    

    const intial = {
        email: "",
        password: ""
    }

    const redu = (state, action) => {
        switch (action.type) {
            case "Change Login":
                return { ...state, [action.field]: action.payload }
        }

    }

    const [state, dispatch] = useReducer(redu, intial);

    const InputLogin = (e) => {
        dispatch({
            type: "Change Login",
            field: e.target.name,
            payload: e.target.value
        })
    }
    const check = localStorage.getItem('api_token')
    // console.log(check);
    const FormLogin = async (e) => {
        e.preventDefault();
    
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": state.email,
            "password": state.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        if(check == true)
        {
            // console.log("HII");
            const fetchs = await fetch("http://localhost/apitest/public/api/savelogin", requestOptions);

            const response = await fetchs.json();

            const result = await response;

            if (result.status == "success") {
                toast(result.msg);
                navigate('/all')
            } else {
                toast(result.msg);
            }
        }else{
            const fetchs = await fetch("http://localhost/apitest/public/api/savelogin", requestOptions);

            const response = await fetchs.json();

            const result = await response;

            if (result.status == "success") {
                toast(result.msg);
                localStorage.setItem('api_token',result.api_token);
                navigate('/all')
            } else {
                toast(result.msg);
            }
            // console.log("Hello");
        }
    }
    
    return (
        <>
            <ToastContainer />
            <h1>Login Page</h1>
            <div>
                <form className="col-sm-6" onSubmit={FormLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" onChange={InputLogin} name="email" value={state.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Password:</label>
                        <input type="password" className="form-control" onChange={InputLogin} name="password" value={state.password} />
                    </div>
                    <div>
                       <button type="submit" value="Submit">Submit</button>
                       Don't have account?<NavLink to="/register" >Click Here</NavLink>For Register.
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;