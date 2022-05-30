import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Netone.png'
import { login, logout } from '../utils'

const Login = () => {

    async function handleRoute() {
        if (window.walletConnection.isSignedIn()) {
            var user = await window.contract.getUser({
                accountId: window.accountId
            })
            console.log(user)
            if (user) {

                window.history.pushState({}, '', '/')
                window.history.go()
            }
            else {
                alert('Please create an account first')
                logout()
            }
        }
    }

    useEffect(() => {
        handleRoute()
    }, [])

    const handleLogin = async () => {
        login()
    }
    return (
        <div>
            <div className="context">
                <div className='content-dialog'>
                    <div className='dialog-content'>
                        <img src={Logo} height={70} />
                    </div>
                    <div className='dialog-action'>
                        <div className='dialog-button' onClick={handleLogin}>Login</div>
                        <Link to={'/signup'} style={{ textDecoration: "none" }} className='dialog-button filled'>Create Account</Link>
                    </div>
                </div>
            </div>
            <div className="area">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    )
}

export default Login