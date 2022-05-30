import React, { useEffect, useState } from 'react'
import Blockies from 'react-blockies'
import { logout } from '../utils'

const Profile = () => {
    const [user, setUser] = useState([])
    async function getData() {
        var user = await window.contract.getUser({
            accountId: window.accountId
        })
        setUser(user)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='profile-container'>
            <div className='profile-user-tile'>
                <Blockies seed={window.accountId} className="blockies" size={25} />
                <div style={{ display: 'flex',flex: 1, flexDirection: "column", gap: '10px 0' }}>
                    <div className='profile-user-name'>{user.name}</div>
                    <div className='profile-user-account'>{user.account}</div>
                </div>
                <div className='profile-logout' onClick={logout}>Logout</div>
            </div>
            <p className='profile-user-desc'>{user.description}</p>
            <span style={{ display: 'flex', gap: '0 10px', color: 'white' }}><div className='follow-text'>{`Followers ● ${user.follower?.length ?? 0}`}</div><div>○</div><div className='follow-text'>{`Following ● ${user.followings?.length ?? 0}`}</div></span>
        </div>
    )
}

export default Profile