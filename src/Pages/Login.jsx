import React, { useRef, useState } from "react";
import classes from '../Component/Layout/MyForm.module.css';
import { useNavigate } from "react-router-dom";

function Login({ loginCheck })
{
    const passcodeInputRef = useRef("");
    let navigate = useNavigate();
    const [error, setError] = useState("");

    const submitHandler = async(event) =>
    {
        event.preventDefault();
        const passcodeValue = passcodeInputRef.current.value;
        if (passcodeValue === '123456')
        {
            loginCheck();
            navigate("/home");
        }
        else
        {
            setError("Incorrect password.");
            console.log(error);
        };
    }

    return (
        <div className={classes.loginform_container}>
            <form onSubmit={submitHandler}>
                <h1>Admin access</h1>
                <div className={classes.input_group}>
                    <label htmlFor="signDate">Enter password</label>
                    <p class="error">{error}</p>
                    <input type="password" name="passcode" id="passcode" required ref={passcodeInputRef}/>
                </div>
                <div className={classes.submit_group}>
                    <input type="submit" name="submit" id="submit" value="Login" required />
                </div>
            </form>
        </div>
    )
}

export default Login;