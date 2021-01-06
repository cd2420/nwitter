import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fBase";
import React, { useState } from "react";

const Auth = () => {
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
    const onSocialClick = async(event) => {
        const {target : {name},} = event;
        let provider;
        if(name ==="google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();

        } else if(name ==="github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }



    return (
    <div>
       <AuthForm />
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github">Continue with Github</button>
        </div>
    </div>
    );
}
export default Auth;