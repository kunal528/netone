import React, { useState } from 'react'
import Logo from '../assets/Netone.png'
import { login, logout } from '../utils'
import Blockies from 'react-blockies'
import { Link } from 'react-router-dom'
import CreatePost from '../pages/CreatePost'

const Navbar = ({onPost}) => {

    const [user, setUser] = useState(null)
    const [show, setShow] = React.useState(false)

    return (
        <div className='navbar-container'>
            <div className='navbar-brand'>
                <img src={Logo} height={50} />
            </div>
            {window.walletConnection.isSignedIn() && <div className='create-post-button' onClick={() => { setShow(true) }}>Create Post</div>}
            {!window.walletConnection.isSignedIn() ? <Link to="/login" style={{ textDecoration: 'none' }}><div className='navbar-login-button' onClick={() => {
            }}>{'Login'}</div></Link> : <Link to={'profile'} style={{ textDecoration: 'none' }}><div className='navbar-user'>
                <Blockies seed={window.accountId} className='blockies' />
                <div>{window.accountId}</div>
            </div></Link>}
            {show && <CreatePost onPost={onPost} onHide={() => { setShow(false) }} />}
        </div>
    )
}

export default Navbar