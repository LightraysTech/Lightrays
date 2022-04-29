import React, { ChangeEvent, useState } from "react";

const LoginForm = () => {
    interface User {firstName: string,lastName: string,email: string}

    const userObj: User = {firstName: "", lastName: "", email: ""}
    const [user, setUser] = useState(userObj);
    const [inputPlaceholder, setInputPlaceholder] = useState(userObj);

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Eingeloggt als " + user.firstName + " " + user.lastName);

        setInputPlaceholder({...user});
        console.log(user);
    }

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder={inputPlaceholder.firstName} onChange={inputChange}/><br/>
            <input type="text" name="lastName" placeholder={inputPlaceholder.lastName} onChange={inputChange}/><br/>
            <input type="email" name="email" placeholder={inputPlaceholder.email} onChange={inputChange}/><br/>

            <button type="submit">Submit</button>

            <div> {user.firstName} </div>
        </form>
    );
}

export default LoginForm;