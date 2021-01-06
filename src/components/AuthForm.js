import { authService } from "fBase";
import React, { useState } from "react";

const AuthForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccout, setNewAccout] = useState(true);
    const [error,setError] = useState("");
    
    const onchange = (event) => {
        const {target: {name,value}} = event;
        if(name === "email") {
            setEmail(value);
        } else if(name ==="password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccout){
                // create account
                data = await authService.createUserWithEmailAndPassword(
                    email,password
                );
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(
                    email,password
                );
            }
            console.log(data);
        } catch(error){
            setError(error.message);
        }
       
        
    };

    const toggleAccount = () => {
        setNewAccout((prev) => {return !prev});
    }

    return (
    <>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" required value={email} onChange={onchange}/>
            <input name="password" type="password" placeholder="password" required value={password} onChange={onchange} />
            <input type="submit" value={newAccout ? "Create Account" : "Log In" }/>
        </form>
        {error}
        <span onClick={toggleAccount}>{newAccout ? "Log in" : "Create Account"}</span>
    </>
    );
}

export default AuthForm;