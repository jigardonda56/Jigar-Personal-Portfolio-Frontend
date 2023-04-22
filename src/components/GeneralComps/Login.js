import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {

    const [loginDetails, setLoginDetails] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const submitClick = async (e) => {
        e.preventDefault();
        console.log("login clicked");

        const response = await fetch("https://jigar-donda-backend.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: loginDetails.email, password: loginDetails.password })
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            //save the auth token  and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/profile");
        }
        else {
            console.log("Wrong id password");
        }
    }

    const onChange = (e) => {
        //will set text from textbox to state
        setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={submitClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={loginDetails.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={loginDetails.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
