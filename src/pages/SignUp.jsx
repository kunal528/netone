import React, { useEffect } from 'react'
import { async } from 'regenerator-runtime'
import Logo from '../assets/Netone.png'
import { login, logout } from '../utils'

const SignUp = () => {
    const [state, setState] = React.useState({
        name: '',
        description: '',
        username: '',
    })


    const handleChange = (e) => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    async function handleRoute() {
        if (window.walletConnection.isSignedIn()) {
            const user = await window.contract.getUser({
                accountId: window.accountId
            })
            if (user) {
                window.history.pushState({}, '', '/')
                window.history.go()
            }
            else {
                const name = window.localStorage.getItem('name')
                const description = window.localStorage.getItem('description')
                const username = window.localStorage.getItem('username')
                var users = await window.contract.getUsers()
                if (name.trim().length === 0) {
                    alert('Please enter a valid name')
                    logout()
                }
                else if (username.trim().length === 0) {
                    alert('Please enter a valid username')
                    logout()
                }
                else if (users) {
                    if (users.map(e => e.username).includes(username)) {
                        alert('Username already exists')
                        logout()
                    }
                    else {
                        await window.contract.createAccount({
                            name: name,
                            description: description,
                            username: username
                        })
                        window.history.pushState({}, '', '/')
                        window.history.go()
                    }
                }
                else {
                    await window.contract.createAccount({
                        name: name,
                        description: description,
                        username: username
                    })
                    window.history.pushState({}, '', '/')
                    window.history.go()
                }
            }
        }
    }

    useEffect(() => {
        handleRoute()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        window.localStorage.setItem('username', state.username)
        window.localStorage.setItem('name', state.name)
        window.localStorage.setItem('description', state.description)
        login()

    }

    return (
        <div>
            <div className="context">
                <div className='content-dialog' style={{ height: '500px' }}>
                    <div className='dialog-content'>
                        <img src={Logo} height={70} />
                    </div>
                    <form className='dialog-action'>
                        <div>Create Account</div>
                        <input onChange={handleChange} placeholder='Name' name="name" className='login-input' />
                        <input onChange={handleChange} placeholder='Username' name="username" className='login-input' />
                        <textarea onChange={handleChange} placeholder='About Bio' name='description' className='login-textarea' />
                        <button className='dialog-button filled' onClick={handleSubmit}>Sign Up</button>
                    </form>
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

export default SignUp