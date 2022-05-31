import React from 'react'
import { MdClose } from 'react-icons/md'
import UserTile from '../components/UserTile'

const FollowDialog = ({ users, title, onHide }) => {
    return (
        <div className='dialog-overlay'>
            <div className='dialog' style={{ width: '400px' }}>
                <div className='dialog-title-section'>
                    <div className='dialog-title'>{title}</div>
                    <MdClose onClick={onHide} style={{ cursor: 'pointer' }} />
                </div>
                <div className='post-comment-content'>
                    {
                        users.length === 0 ? <div style={{color: 'white', padding: '1rem'}}>No users to show</div> :
                            users.map((user, index) => {
                                return <UserTile user={user} key={index} />
                            })
                    }
                </div>
            </div>
        </div>
    )
}

export default FollowDialog