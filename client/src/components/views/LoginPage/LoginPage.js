import React, { useState } from 'react'

function LoginPage() {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const onEmailHahdler = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordHahdler = (e) => {
        setPassword(e.target.value)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display:'flex', flexDirection: 'column'}}
                  onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHahdler}></input>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHahdler}></input>         
                <br />
                <button>Login</button>       
            </form>
        </div>
    )
}

export default LoginPage
