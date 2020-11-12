import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'

function LoginPage(props) {
    const dispatch = useDispatch();
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
        let body = {
            email: Email,
            password: Password
        };
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    props.history.push('/');
                } else {
                    alert(response.payload.message)
                }
            })
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
