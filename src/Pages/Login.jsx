import React, { useRef } from "react";
import classes from '../Component/Layout/MyForm.module.css';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MainContext from "../Store/Main";

function Login()
{
    const passcodeInputRef = useRef("");
    let navigate = useNavigate();
    const context = useContext(MainContext);

    const submitHandler = async(e) =>
    {
        e.preventDefault();
        const passcodeValue = passcodeInputRef.current.value;
        if (passcodeValue === '123456')
        {
            context.setLoggedIn(true);
            navigate("/home");
        }
        else
        {
            alert('Incorrect password.')
        };
    }

    return (
        <div className={classes.loginform_container}>
            <form onSubmit={submitHandler}>
                <h1>Admin access</h1>
                <div className={classes.input_group}>
                    <label htmlFor="signDate">Enter password</label>
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