import React, { useState } from 'react'
import axios from 'axios'

export const AuthenticationContext = React.createContext({
    authenticated: false,
    login: () => { }, 
    logout: () => {}
})

const AuthenticationContextProvider = (props) => {
    const [authenticated, setAuthenticated] = useState(false)

    const loginHandler = (id,password,setAuth,history) => {
        axios.post('http://localhost:8000/users/login',{
            "email":id,
            "password":password
        },{headers:{'Access-Control-Allow-Origin': '*'}}).then((res) => {
            setAuthenticated(true)
            setAuth(true)
            history.push('/browse')
        })
        .catch((error) => {
            setAuth(false)
            window.alert("Login Failed");
        })
    }

    const logoutHandler = () => {
        setAuthenticated(false)
    }

    return (
        <AuthenticationContext.Provider value={{
            authenticated: authenticated, login: loginHandler, 
            logout: logoutHandler
        }}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContextProvider 