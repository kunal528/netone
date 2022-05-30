import React from 'react'
import Blockies from 'react-blockies'

const UserTile = ({ user }) => {

    return (
        <div className='user-tile'>
            <Blockies seed={user.account} className="blockies" />
            <div>
                <div className='user-name'>{user.name}</div>
                <div className='user-account'>{user.username}</div>
            </div>
        </div>
    )
}

export default UserTile